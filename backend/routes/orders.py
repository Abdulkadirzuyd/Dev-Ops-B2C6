from flask import Blueprint, request, jsonify
from services.order_service import (
    simulate_forward_order,
    fetch_all_orders,
    update_order,
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
            "customer_id": order.customer_id,
            "product_name": order.product_name,
            "quantity": order.quantity,
            "created_at": order.created_at,
            "status": order.status,
            "picklist": order.picklist,
            "production_line": order.production_line
        })
    return jsonify(result), 200

@order_bp.route("/orders/<int:order_id>", methods=["PUT"])
def update_order_route(order_id):
    data = request.get_json()
    print("Ontvangen data:", data)  # Debug

    # Valideer status als die aanwezig is
    status = data.get("status")
    if status and status not in ["goedgekeurd", "doorgestuurd", "in_behandeling", "afgewezen"]:
        return jsonify({"success": False, "reason": "Geen geldige status"}), 400

    updated_order = update_order(order_id, data)

    if updated_order:
        return jsonify({
            "id": updated_order.id,
            "customer_id": updated_order.customer_id,
            "product_name": updated_order.product_name,
            "quantity": updated_order.quantity,
            "created_at": updated_order.created_at,
            "status": updated_order.status,
            "picklist": updated_order.picklist,
            "production_line": updated_order.production_line,
        }), 200
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

    required_fields = ["customer_id", "product_name", "quantity"]
    missing = [f for f in required_fields if f not in data]

    if missing:
        return jsonify({"success": False, "reason": f"Missing fields: {', '.join(missing)}"}), 400

    try:
        new_order = simulate_forward_order(data)
        return jsonify({
            "success": True,
            "order_id": new_order.id
        }), 201
    except Exception as e:
        print(f"Fout bij opslaan order: {e}")
        return jsonify({"success": False, "reason": str(e)}), 500
