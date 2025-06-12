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

    order = simulate_forward_order(data)
    return jsonify({"status": "accepted", "order_id": order.id}), 201

@order_bp.route("/orders", methods=["GET"])
def get_orders():
    orders = fetch_all_orders()
    return jsonify([{
        "id": o.id,
        "klantnaam": o.klantnaam,
        "product_type": o.product_type,
        "quantity": o.quantity,
        "order_status": o.order_status,
        "order_date": o.order_date,
        "signature": o.signature,
        "goedgekeurd": o.goedgekeurd
    } for o in orders]), 200

@order_bp.route("/orders/<int:order_id>", methods=["PUT"])
def update_order_route(order_id):
    data = request.json
    is_valid, message = validate_order(data)
    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    updated = update_order(order_id, data)
    if updated:
        return jsonify({"status": "accepted", "message": f"Order {order_id} bijgewerkt"}), 200
    else:
        return jsonify({"status": "not found"}), 404

@order_bp.route("/orders/<int:order_id>/approve", methods=["PUT"])
def approve_order_route(order_id):
    updated = update_approval_status(order_id, True)
    if updated:
        return jsonify({"status": "approved", "order_id": order_id}), 200
    else:
        return jsonify({"status": "not found"}), 404

@order_bp.route("/orders/<int:order_id>/reject", methods=["PUT"])
def reject_order_route(order_id):
    updated = update_approval_status(order_id, False)
    if updated:
        return jsonify({"status": "rejected", "order_id": order_id}), 200
    else:
        return jsonify({"status": "not found"}), 404

@order_bp.route("/orders/<int:order_id>/status", methods=["PUT"])
def update_order_status_route(order_id):
    data = request.json
    new_status = data.get("order_status")

    if not new_status:
        return jsonify({"error": "order_status ontbreekt"}), 400

    updated = update_order_status(order_id, new_status)
    if updated:
        return jsonify({"status": "updated", "order_status": new_status}), 200
    else:
        return jsonify({"status": "not found"}), 404

@order_bp.route("/orders/<int:order_id>", methods=["DELETE"])
def delete_order_route(order_id):
    deleted = delete_order(order_id)
    if deleted:
        return jsonify({"status": "deleted", "message": f"Order {order_id} verwijderd"}), 200
    else:
        return jsonify({"status": "not found"}), 404
