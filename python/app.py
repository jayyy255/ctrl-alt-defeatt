import cv2
import numpy as np
import pickle
import mediapipe as mp
from flask import Flask, jsonify
from flask_socketio import SocketIO, emit

# Initialize Flask app and SocketIO
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

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

# Labels dictionary
labels_dict = {i: chr(65 + i) for i in range(26)}  # A-Z
char_arr = []

# Handle incoming video frames
@socketio.on('video_frame')
def handle_video_frame(data):
    try:
        # Decode the base64 frame
        np_frame = np.frombuffer(data, dtype=np.uint8)
        frame = cv2.imdecode(np_frame, cv2.IMREAD_COLOR)

        if frame is None:
            print("🚫 Failed to decode frame")
            return

        # Process the frame
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(frame_rgb)

        predicted_character = "No hand detected"
        confidence = 0.0

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                data_aux, x_, y_ = [], [], []

                for landmark in hand_landmarks.landmark:
                    x_.append(landmark.x)
                    y_.append(landmark.y)

                for landmark in hand_landmarks.landmark:
                    data_aux.append(landmark.x - min(x_))
                    data_aux.append(landmark.y - min(y_))

                # Predict
                if model:
                    prediction = model.predict([np.asarray(data_aux)])
                    prediction_proba = model.predict_proba([np.asarray(data_aux)])
                    confidence = max(prediction_proba[0])
                    predicted_character = labels_dict.get(int(prediction[0]), "Unknown")
                    char_arr.append(predicted_character)

        # Emit prediction result
        emit('prediction', {'prediction': predicted_character, 'confidence': round(confidence, 2)})

    except Exception as e:
        print(f"🚫 Error processing frame: {e}")

# Run the app
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
