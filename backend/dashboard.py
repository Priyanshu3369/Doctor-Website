from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

dashboard_bp = Blueprint('dashboard_bp', __name__)

@dashboard_bp.route('/api/dashboard/patient', methods=['GET'])
@jwt_required()
def patient_dashboard():
    email = get_jwt_identity()
    claims = get_jwt()
    if claims['role'] != 'patient':
        return jsonify({"error": "Unauthorized"}), 403

    return jsonify({
        "message": f"Welcome Patient: {email}",
        "data": {
            "appointments": [],
            "profile_complete": True
        }
    }), 200

@dashboard_bp.route('/api/dashboard/doctor', methods=['GET'])
@jwt_required()
def doctor_dashboard():
    email = get_jwt_identity()
    claims = get_jwt()
    if claims['role'] != 'doctor':
        return jsonify({"error": "Unauthorized"}), 403

    return jsonify({
        "message": f"Welcome Doctor: {email}",
        "data": {
            "appointments": [],
            "profile_complete": False
        }
    }), 200
