import cv2
import tensorflow as tf
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS  # Add CORS support
import numpy as np

# Load the trained model
new_model = tf.keras.models.load_model('model.h5')

# Initialize Flask app and API
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests
api = Api(app)

# Map prediction output to readable labels
num_val = {i: i + 1 for i in range(9)}
list_abc = [chr(x) for x in range(65, 91)]
for i, char in enumerate(list_abc):
    num_val[i + 9] = char

# Prediction endpoint
class PredictSign(Resource):
    def post(self):
        try:
            print("📸 Received request.")
            
            # Check if file is provided
            if 'file' not in request.files:
                print("❌ No file provided.")
                return jsonify({'error': 'No file provided'}), 400

            file = request.files['file']
            if file.filename == '':
                print("⚠️ Empty file name.")
                return jsonify({'error': 'Empty file name'}), 400

            # Read and decode the image
            img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
            if img is None:
                print("🚫 Invalid image format.")
                return jsonify({'error': 'Invalid image format'}), 400

            # Preprocess image for prediction
            img224 = cv2.resize(img, (224, 224))
            img224 = img224 / 255.0
            img224 = np.expand_dims(img224, axis=0)

            # Predict using the model
            prediction_index = np.argmax(new_model.predict(img224), axis=1)[0]
            prediction = num_val.get(prediction_index, 'Unknown')

            print(f"✅ Prediction: {prediction}")
            return jsonify({'prediction': str(prediction)})

        except Exception as e:
            print(f"❌ Error: {str(e)}")
            return jsonify({'error': str(e)}), 500


# Add endpoint
api.add_resource(PredictSign, '/')

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, threaded=True)
