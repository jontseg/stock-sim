from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from models import *  # Import your module where the model is defined

app = Flask(__name__)
CORS(app)

# Load your trained PyTorch model
model = load_model()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Receive data from React
    input_tensor = torch.tensor(data['input'], dtype=torch.float32)  # Convert input to float tensor
    
    with torch.no_grad():
        output = model(input_tensor)
        
    prediction = output.tolist()  # Convert output to a list for JSON serialization
    return jsonify({'prediction': prediction})
if __name__ == '__main__':
    app.run(debug=True)
