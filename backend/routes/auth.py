from flask import Blueprint, request, jsonify
from services.user_service import register_user, login_user
from models.user_model import User
from extensions import db


auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    try:
        user = register_user(data["username"], data["email"], data["password"])
        return jsonify({"status": "success", "user": user.email}), 201
    except ValueError as ve:
        return jsonify({"status": "error", "message": str(ve)}), 400

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    print("Login data ontvangen:", data)
    success, user = login_user(data["email"], data["password"])
    if success:
        return jsonify({"message": "Login succesvol", "user_id": user.id})
    else:
        return jsonify({"message": "Ongeldige login"}), 401

@auth_bp.route("/delete_user", methods=["DELETE"])
def delete_user():
    data = request.json
    email = data.get("email")

    user = User.query.filter_by(email=email).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"status": "success", "message": f"Gebruiker {email} verwijderd"}), 200
    else:
        return jsonify({"status": "error", "message": "Gebruiker niet gevonden"}), 404
