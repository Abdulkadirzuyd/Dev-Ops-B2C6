from flask import Blueprint, request, jsonify
from services.order_service import validate_order, simulate_forward_order
from models.order import Order
from services.order_service import fetch_all_orders

order_bp = Blueprint("orders", __name__)

@order_bp.route("/orders", methods=["POST"])
def handle_order():
    data = request.json
    is_valid, message = validate_order(data)

    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    simulate_forward_order(data)
    return jsonify({"status": "accepted", "message": "Order doorgestuurd naar planning"}), 200

from services.order_service import fetch_all_orders

@order_bp.route("/orders", methods=["GET"])
def get_orders():
    orders = fetch_all_orders()
    return jsonify([order.__dict__ for order in orders]), 200

@order_bp.route("/orders/<int:order_id>", methods=["PUT"])
def update_order(order_id):
    data = request.json
    is_valid, message = validate_order(data)

    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    print(f"Simulatie: order {order_id} geüpdatet:")
    print(data)

    return jsonify({"status": "accepted", "message": f"Order {order_id} geüpdatet"}), 200

@order_bp.route("/orders/<int:order_id>", methods=["DELETE"])
def delete_order(order_id):
    print(f"Simulatie: order {order_id} verwijderd")

    return jsonify({"status": "accepted", "message": f"Order {order_id} verwijderd"}), 200

