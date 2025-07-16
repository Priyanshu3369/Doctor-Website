from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

slots_bp = Blueprint('slots_bp', __name__)

client = MongoClient(os.getenv('MONGO_URI'))
db = client['healthcare_db']
slots_collection = db['slots']

@slots_bp.route('/api/doctor/slots', methods=['POST'])
@jwt_required()
def create_slot():
    email = get_jwt_identity()
    claims = get_jwt()
    if claims['role'] != 'doctor':
        return jsonify({"error": "Unauthorized"}), 403

    data = request.json
    date = data.get('date')
    time = data.get('time')

    if not date or not time:
        return jsonify({"error": "Missing date or time"}), 400

    slot = {
        "doctor_email": email,
        "date": date,
        "time": time,
        "is_booked": False
    }

    slots_collection.insert_one(slot)

    return jsonify({"message": "Slot created successfully"}), 201


@slots_bp.route('/api/doctor/slots', methods=['GET'])
@jwt_required()
def get_slots():
    email = get_jwt_identity()
    claims = get_jwt()
    if claims['role'] != 'doctor':
        return jsonify({"error": "Unauthorized"}), 403

    slots = list(slots_collection.find({"doctor_email": email}))
    for slot in slots:
        slot['_id'] = str(slot['_id'])  # make ObjectId JSON serializable

    return jsonify(slots), 200
