from flask import Flask
from .config import Config
from .extensions import mongo, jwt, cors
from .routes.auth_routes import auth_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, origins=["http://localhost:5173"], supports_credentials=True)  # ✅ FIXED

    mongo.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    return app