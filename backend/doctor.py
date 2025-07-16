from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

doctor_bp = Blueprint('doctor_bp', __name__)

client = MongoClient(os.getenv('MONGO_URI'))
db = client['healthcare_db']
collection = db['users']

@doctor_bp.route('/api/doctor/profile', methods=['GET'])
@jwt_required()
def get_profile():
    email = get_jwt_identity()
    claims = get_jwt()
    if claims['role'] != 'doctor':
        return jsonify({"error": "Unauthorized"}), 403

    doctor = collection.find_one({'email': email})
    if not doctor:
        return jsonify({"error": "Doctor not found"}), 404

    profile = {
        "name": doctor['name'],
        "email": doctor['email'],
        "specialization": doctor.get('specialization', ''),
        "bio": doctor.get('bio', ''),
        "is_verified": doctor.get('is_verified', False)
    }
    return jsonify(profile), 200

@doctor_bp.route('/api/doctor/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    email = get_jwt_identity()
    claims = get_jwt()
    if claims['role'] != 'doctor':
        return jsonify({"error": "Unauthorized"}), 403

    data = request.json
    specialization = data.get('specialization', '')
    bio = data.get('bio', '')

    collection.update_one(
        {'email': email},
        {'$set': {
            'specialization': specialization,
            'bio': bio
        }}
    )

    return jsonify({"message": "Profile updated successfully"}), 200
