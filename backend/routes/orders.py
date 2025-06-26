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
    data = request.json
    new_id = max(order["id"] for order in orders) + 1 if orders else 1
    new_order = {
        "id": new_id,
        "orderNummer": f"ORD{str(new_id).zfill(3)}",
        "hoeveelheid": data.get("hoeveelheid", 0),
        "productType": data.get("productType", "Onbekend"),
        "besteldatum": data.get("besteldatum", "2025-06-26"),
        "goedgekeurd": False,
        "doorgestuurd": False
    }
    orders.append(new_order)
    return jsonify(new_order), 201

