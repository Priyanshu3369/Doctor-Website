from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

admin_bp = Blueprint('admin_bp', __name__)

client = MongoClient(os.getenv('MONGO_URI'))
db = client['healthcare_db']
users_collection = db['users']

@admin_bp.route('/api/admin/doctors', methods=['GET'])
@jwt_required()
def list_doctors():
    claims = get_jwt()
    if claims['role'] != 'admin':
        return jsonify({"error": "Unauthorized"}), 403

    doctors = list(users_collection.find({"role": "doctor"}))
    for doc in doctors:
        doc['_id'] = str(doc['_id'])
    return jsonify(doctors), 200


@admin_bp.route('/api/admin/verify/<email>', methods=['PUT'])
@jwt_required()
def verify_doctor(email):
    claims = get_jwt()
    if claims['role'] != 'admin':
        return jsonify({"error": "Unauthorized"}), 403

    data = request.json
    is_verified = data.get('is_verified')

    users_collection.update_one(
        {"email": email, "role": "doctor"},
        {"$set": {"is_verified": is_verified}}
    )

    return jsonify({"message": f"Doctor {'verified' if is_verified else 'unverified'} successfully."}), 200
