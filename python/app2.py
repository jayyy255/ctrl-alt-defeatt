import cv2
import numpy as np
import pickle
import mediapipe as mp
from flask import Flask, jsonify
from flask_socketio import SocketIO, emit
import json

# Initialize Flask app and SocketIO
app = Flask(__name__)

# Allow connections from React frontend (localhost:5271 or the correct port)
socketio = SocketIO(app, cors_allowed_origins=["http://localhost:5271", "http://127.0.0.1:5271"])

# Load the trained model
try:
    model_dict = pickle.load(open('./model.p', 'rb'))
    model = model_dict.get('model')
    if model is None:
        raise ValueError("Model not found in 'model.p'")
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"🚫 Error loading the model: {e}")
    model = None

# Initialize MediaPipe Hand detection
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

# Labels dictionary (Updated as required)
labels_dict = {
    26: 'Hello',
    27: 'Done',
    28: 'Thank You',
    29: 'I Love you',
    30: 'Sorry',
    31: 'Please',
    32: 'You are welcome.'
}

# Handle incoming video frames (now expects a JSON object with 'img' and 'ans')
@socketio.on('video_frame')
def handle_video_frame(data):
    try:
        # Decode the JSON data
        image_data = data['img']  # Image in base64
        answer = data['ans']  # Provided answer from frontend

        # Decode the base64 image
        np_frame = np.frombuffer(image_data, dtype=np.uint8)
        frame = cv2.imdecode(np_frame, cv2.IMREAD_COLOR)

        if frame is None:
            print("🚫 Failed to decode frame")
            return

        # Process the frame
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(frame_rgb)

        predicted_character = "No hand detected"
        confidence = 0.0

        # If hands are detected
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                data_aux, x_, y_ = [], [], []

                for landmark in hand_landmarks.landmark:
                    x_.append(landmark.x)
                    y_.append(landmark.y)

                for landmark in hand_landmarks.landmark:
                    data_aux.append(landmark.x - min(x_))
                    data_aux.append(landmark.y - min(y_))

                # Make prediction
                if model:
                    prediction = model.predict([np.asarray(data_aux)])
                    prediction_proba = model.predict_proba([np.asarray(data_aux)])
                    confidence = max(prediction_proba[0])
                    predicted_character = labels_dict.get(int(prediction[0]), "Unknown")

        # Compare the predicted character with the provided answer
        is_match = (predicted_character == answer)

        # Emit prediction result and comparison to the frontend
        emit('prediction', {
            'prediction': predicted_character,
            'confidence': round(confidence, 2),
            'match': is_match  # Return whether the prediction matches the provided answer
        })

    except Exception as e:
        print(f"🚫 Error processing frame: {e}")
        emit('prediction', {'error': str(e)})

# Handle SocketIO connection and disconnection events
@socketio.on('connect')
def handle_connect():
    print("✅ Client connected")

@socketio.on('disconnect')
def handle_disconnect():
    print("❌ Client disconnected")

# Run the app
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000, debug=True)
