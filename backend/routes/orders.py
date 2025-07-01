from flask import Blueprint, request, jsonify
from services.order_service import (
    simulate_forward_order,
    fetch_all_orders,
    update_order_status,
    delete_order
)

order_bp = Blueprint("orders", __name__)

@order_bp.route("/orders", methods=["GET"])
def get_orders():
    orders = fetch_all_orders()
    result = []
    for order in orders:
        result.append({
            "id": order.id,
            "product_name": order.product_name,
            "quantity": order.quantity,
            "created_at": order.created_at,
            "status": order.status
        })
    return jsonify(result), 200

@order_bp.route("/orders/<int:order_id>", methods=["PUT"])
def update_order(order_id):
    data = request.get_json()
    print("Ontvangen data:", data)  # DEBUG: logt binnenkomende data

    status = data.get("status")

    if status not in ["goedgekeurd", "doorgestuurd"]:
        return jsonify({"success": False, "reason": "Geen geldige status"}), 400

    success = update_order_status(order_id, status)

    if success:
        return jsonify({"success": True}), 200
    else:
        return jsonify({"success": False, "reason": "Order niet gevonden"}), 404


@order_bp.route("/orders/<int:order_id>", methods=["DELETE"])
def delete_order_route(order_id):
    success = delete_order(order_id)
    if success:
        return jsonify({"status": "deleted", "order_id": order_id}), 200
    return jsonify({"status": "not found"}), 404

@order_bp.route("/orders", methods=["POST"])
def create_order():
    data = request.get_json()

    if not data.get("id") or not data.get("product_name") or not data.get("quantity") or not data.get("created_at"):
        return jsonify({"success": False, "reason": "Missing required fields"}), 400

    try:
        new_order = simulate_forward_order(data)
        return jsonify({
            "success": True,
            "order_id": new_order.id
        }), 201
    except Exception as e:
        print(f"Fout bij opslaan order: {e}")
        return jsonify({"success": False, "reason": str(e)}), 500
