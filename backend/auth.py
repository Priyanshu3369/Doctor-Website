from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

auth_bp = Blueprint('auth_bp', __name__)

client = MongoClient(os.getenv('MONGO_URI'))
db = client['healthcare_db']

@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    if not name or not email or not password or not role:
        return jsonify({'error': 'Missing fields'}), 400

    if role not in ['patient', 'doctor', 'admin']:
        return jsonify({'error': 'Invalid role'}), 400

    collection = db['users']
    if collection.find_one({'email': email}):
        return jsonify({'error': 'Email already exists'}), 400

    hashed_password = generate_password_hash(password)

    collection.insert_one({
        'name': name,
        'email': email,
        'password': hashed_password,
        'role': role,
        'is_verified': False
    })

    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing fields'}), 400

    collection = db['users']
    user = collection.find_one({'email': email})

    if not user or not check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid credentials'}), 401

    access_token = create_access_token(
        identity=user['email'],
        additional_claims={"role": user['role']}
    )

    return jsonify({
        'token': access_token,
        'role': user['role'],
        'name': user['name']
    }), 200
