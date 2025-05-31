from flask import Blueprint, request, jsonify
from services import account_manager_service
from models.account_manager_model import AccountManager

account_manager_bp = Blueprint('account_manager', __name__)

@account_manager_bp.route('/account_managers', methods=['POST'])
def add_account_manager():
    try:
        json_data = request.json
        manager = AccountManager(**json_data)
        created = account_manager_service.create_account_manager(manager)
        return jsonify(created.__dict__), 201
    except Exception as e:
        print("Fout bij toevoegen:", e)
        return jsonify({"error": "Database fout"}), 500

@account_manager_bp.route('/account_managers', methods=['GET'])
def get_account_managers():
    try:
        managers = account_manager_service.fetch_all_account_managers()
        return jsonify([m.__dict__ for m in managers])
    except Exception as e:
        print("Fout bij ophalen:", e)
        return jsonify({"error": "Database fout"}), 500
