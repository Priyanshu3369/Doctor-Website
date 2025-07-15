from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load env variables
load_dotenv()

app = Flask(__name__)

# Config
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

# JWT
jwt = JWTManager(app)

# MongoDB
client = MongoClient(os.getenv('MONGO_URI'))
db = client.get_database()

# Test API route
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "OK", "message": "Backend is working!"}), 200

if __name__ == '__main__':
    app.run(debug=True)

