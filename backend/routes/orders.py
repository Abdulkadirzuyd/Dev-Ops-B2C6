from flask import Blueprint, request, jsonify
from services.order_service import validate_order, simulate_forward_order

order_bp = Blueprint("orders", __name__)

@order_bp.route("/order", methods=["POST"])
def handle_order():
    data = request.json
    is_valid, message = validate_order(data)

    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    simulate_forward_order(data)
    return jsonify({"status": "accepted", "message": "Order doorgestuurd naar planning"}), 200
