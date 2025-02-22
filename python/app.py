import cv2
import numpy as np
import pickle
import mediapipe as mp
from flask import Flask, jsonify, request
from flask_restful import Resource, Api

# Initialize Flask app and API
app = Flask(__name__)
api = Api(app)

# Load the trained model
try:
    model_dict = pickle.load(open('./model.p', 'rb'))
    model = model_dict.get('model')
    if model is None:
        raise ValueError("Model not found in 'model.p'")
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading the model: {e}")
    model = None

# Initialize MediaPipe Hand detection
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

# Labels dictionary
labels_dict = {
    0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J',
    10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S',
    19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z'
}

char_arr = []

class PredictSign(Resource):
    def post(self):
        try:
            # Open webcam (default camera)
            cap = cv2.VideoCapture(0)  # 0 is default for the primary webcam

            if not cap.isOpened():
                return jsonify({'error': 'Could not open webcam'})

            # Capture one frame
            ret, frame = cap.read()

            if not ret or frame is None:
                cap.release()
                return jsonify({'error': 'Failed to capture image from webcam'})

            # Show the captured frame (before processing)
            cv2.imshow("Captured Frame", frame)
            cv2.waitKey(1)  # wait for 1 ms so the window can update, feel free to adjust

            # After displaying, release the camera
            cap.release()

            # Process the frame
            H, W, _ = frame.shape
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = hands.process(frame_rgb)

            # Default response if no hands detected
            predicted_character = "No hand detected"
            confidence = 0.0

            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    x_, y_, data_aux = [], [], []

                    for landmark in hand_landmarks.landmark:
                        x_.append(landmark.x)
                        y_.append(landmark.y)

                    for landmark in hand_landmarks.landmark:
                        data_aux.append(landmark.x - min(x_))
                        data_aux.append(landmark.y - min(y_))

                    # Model prediction
                    if model:
                        try:
                            prediction = model.predict([np.asarray(data_aux)])
                            prediction_proba = model.predict_proba([np.asarray(data_aux)])
                            confidence = max(prediction_proba[0])
                            predicted_character = labels_dict.get(int(prediction[0]), "Unknown")
                            char_arr.append(predicted_character)
                        except Exception as e:
                            print(f"Prediction error: {e}")

            # Close the window showing the captured frame
            cv2.destroyAllWindows()

            return jsonify({'prediction': str(predicted_character)})

        except Exception as e:
            return jsonify({'error': str(e)})

# Add API resource
api.add_resource(PredictSign, '/')

if __name__ == '__main__':
    app.run(debug=True)
