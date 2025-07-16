from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
import os

load_dotenv()

patient_bp = Blueprint('patient_bp', __name__)

client = MongoClient(os.getenv('MONGO_URI'))
db = client['healthcare_db']
slots_collection = db['slots']

@patient_bp.route('/api/patient/slots', methods=['GET'])
@jwt_required()
def get_available_slots():
    claims = get_jwt()
    if claims['role'] != 'patient':
        return jsonify({"error": "Unauthorized"}), 403

    slots = list(slots_collection.find({"is_booked": False}))
    for slot in slots:
        slot['_id'] = str(slot['_id'])
    return jsonify(slots), 200


@patient_bp.route('/api/patient/book', methods=['POST'])
@jwt_required()
def book_slot():
    claims = get_jwt()
    if claims['role'] != 'patient':
        return jsonify({"error": "Unauthorized"}), 403

    data = request.json
    slot_id = data.get('slot_id')
    patient_email = get_jwt_identity()

    if not slot_id:
        return jsonify({"error": "Missing slot ID"}), 400

    slot = slots_collection.find_one({"_id": ObjectId(slot_id)})

    if not slot or slot['is_booked']:
        return jsonify({"error": "Slot unavailable"}), 400

    slots_collection.update_one(
        {"_id": ObjectId(slot_id)},
        {"$set": {
            "is_booked": True,
            "patient_email": patient_email
        }}
    )

    return jsonify({"message": "Appointment booked successfully"}), 200
