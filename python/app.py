import cv2
import tensorflow as tf
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import numpy as np

# Load your model, scaler, and encoder
new_model = tf.keras.models.load_model('model.h5')

# creating the Flask app
app = Flask(__name__)
# creating an API object
api = Api(app)

# Endpoint for predictions
class PredictSign(Resource):
    def post(self):
        try:
            file = request.files['file']
            img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
            img224 = cv2.resize(img , (224,224))
            img224 = img224 / 255.0
            img224 = np.expand_dims(img224, axis=0)
            ans = np.argmax((new_model.predict(img224)))
            num_val = dict()
            for i in range(0,9):
                num_val[i] = i+1 
            list_abc = [chr(x) for x in range(65,91)]
            for i, char in enumerate(list_abc):
                num_val[i + 9] = char
            # Return the result
            return jsonify({'prediction': str(num_val[ans])})
        
        except Exception as e:
            return jsonify({'error': str(e)})

# adding the defined resource along with its corresponding url
api.add_resource(PredictSign, '/')

# driver function
if __name__ == '__main__':
    app.run(debug=True)



