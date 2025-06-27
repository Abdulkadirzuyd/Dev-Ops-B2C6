from flask import Blueprint, request, jsonify
from services.order_service import validate_order, simulate_forward_order
from models.order import Order
from services.order_service import fetch_all_orders

order_bp = Blueprint("orders", __name__)

# Dummy orders
orders = [
    {
        "id": 1,
        "orderNummer": "ORD001",
        "hoeveelheid": 10,
        "productType": "Blok A",
        "besteldatum": "2025-06-25",
        "goedgekeurd": False,
        "doorgestuurd": False
    },
    {
        "id": 2,
        "orderNummer": "ORD002",
        "hoeveelheid": 5,
        "productType": "Blok B",
        "besteldatum": "2025-06-24",
        "goedgekeurd": True,
        "doorgestuurd": False
    }
]

@order_bp.route("/orders", methods=["GET"])
def get_orders():
    return jsonify(orders), 200

@order_bp.route("/orders/<int:order_id>", methods=["PUT"])
def update_order(order_id):
    data = request.json
    for index, order in enumerate(orders):
        if order["id"] == order_id:
            orders[index].update(data)
            return jsonify({"status": "updated"}), 200
    return jsonify({"status": "not found"}), 404

@order_bp.route("/orders/<int:order_id>", methods=["DELETE"])
def delete_order(order_id):
    global orders
    updated_orders = [order for order in orders if order["id"] != order_id]
    if len(updated_orders) != len(orders):
        orders[:] = updated_orders
        return jsonify({"status": "deleted", "order_id": order_id}), 200
    return jsonify({"status": "not found"}), 404

@order_bp.route("/orders", methods=["POST"])
def create_order():
    data = request.get_json()

    is_valid, message = validate_order(data)
    if not is_valid:
        return jsonify({"success": False, "reason": message}), 400

    try:
        new_order = simulate_forward_order(data)
        return jsonify({
            "success": True,
            "order_id": new_order.id
        }), 201
    except Exception as e:
        print(f"Fout bij opslaan order: {e}")
        return jsonify({"success": False, "reason": str(e)}), 500



