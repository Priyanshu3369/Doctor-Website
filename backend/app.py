from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

from auth import auth_bp
from dashboard import dashboard_bp
from doctor import doctor_bp
from doctor_slots import slots_bp

load_dotenv()

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

jwt = JWTManager(app)


CORS(app, origins=["http://localhost:5173"])

client = MongoClient(os.getenv('MONGO_URI'))
db = client['healthcare_db']

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "OK", "message": "Backend is working!"}), 200

app.register_blueprint(auth_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(doctor_bp)
app.register_blueprint(slots_bp)

if __name__ == '__main__':
    app.run(debug=True)
