import cv2
import tensorflow as tf
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import numpy as np

# Load your model
new_model = tf.keras.models.load_model('model.h5')

# Create the Flask app
app = Flask(__name__)
api = Api(app)

# Endpoint for predictions
class PredictSign(Resource):
    def post(self):
        try:
            # Ensure image file is received
            if 'file' not in request.files:
                return jsonify({'error': 'No file provided'}), 400

            file = request.files['file']
            if file.filename == '':
                return jsonify({'error': 'Empty file name'}), 400

            # Read the image directly from the buffer
            img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
            if img is None:
                return jsonify({'error': 'Invalid image format'}), 400

            # Preprocess the image for the model
            img224 = cv2.resize(img, (224, 224))
            img224 = img224 / 255.0
            img224 = np.expand_dims(img224, axis=0)

            # Predict using the model
            ans = np.argmax(new_model.predict(img224), axis=1)[0]

            # Map prediction to label
            num_val = {i: i + 1 for i in range(9)}
            list_abc = [chr(x) for x in range(65, 91)]
            for i, char in enumerate(list_abc):
                num_val[i + 9] = char

            # Return the result
            prediction = num_val.get(ans, 'Unknown')
            return jsonify({'prediction': str(prediction)})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

# Add the endpoint to the API
api.add_resource(PredictSign, '/')

# Run the app
if __name__ == '__main__':
    app.run(debug=True, threaded=True)
