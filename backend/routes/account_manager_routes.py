from flask import Blueprint, request, jsonify
from services import account_manager_service
from models.account_manager_model import AccountManager

account_manager_bp = Blueprint('account_manager', __name__)


@account_manager_bp.route('/account_managers/<int:manager_id>/approve_order/<int:order_id>', methods=['POST'])
def approve_order(manager_id, order_id):
    try:
        result = account_manager_service.approve_order(manager_id, order_id)
        return jsonify(result)
    except Exception as e:
        print("Fout bij goedkeuren:", e)
        return jsonify({"error": "Database fout"}), 500

@account_manager_bp.route('/account_managers/<int:manager_id>/reject_order/<int:order_id>', methods=['POST'])
def reject_order(manager_id, order_id):
    try:
        result = account_manager_service.reject_order(manager_id, order_id)
        return jsonify(result)
    except Exception as e:
        print("Fout bij afwijzen:", e)
        return jsonify({"error": "Database fout"}), 500

