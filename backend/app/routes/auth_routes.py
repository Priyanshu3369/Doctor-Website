from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app.models.user import find_user_by_email, insert_user

import traceback

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print("Incoming data:", data)

        required_fields = ['email', 'password', 'role']
        if not all(field in data for field in required_fields):
            return jsonify({"msg": "Missing fields"}), 400

        if find_user_by_email(data['email']):
            return jsonify({"msg": "User already exists"}), 409

        hashed_pw = generate_password_hash(data['password'])
        user_data = {
            "email": data['email'],
            "password": hashed_pw,
            "role": data['role'],
            "is_verified": False if data['role'] == 'doctor' else True
        }

        insert_user(user_data)
        return jsonify({"msg": "User registered successfully"}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"msg": "Internal server error"}), 500



@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = find_user_by_email(data['email'])
    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({"msg": "Invalid credentials"}), 401

    if user['role'] == 'doctor' and not user.get('is_verified', False):
        return jsonify({"msg": "Doctor not verified yet"}), 403

    access_token = create_access_token(identity={
        "email": user['email'],
        "role": user['role']
    })
    return jsonify(access_token=access_token), 200
