from flask import Blueprint, request, jsonify
from services.planner_service import (
    validate_planner_task,
    simulate_forward_planner_task,
    fetch_all_planner_tasks
)
from models.planner import PlannerTask
from flask import Blueprint, request, jsonify
from models.order import Order
from extensions import db


planner_bp = Blueprint("planner", __name__)

@planner_bp.route("/planner", methods=["POST"])
def add_planner_task():
    data = request.json
    is_valid, message = validate_planner_task(data)

    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    simulate_forward_planner_task(data)
    return jsonify({"status": "accepted", "message": "Planner task toegevoegd"}), 200

@planner_bp.route("/planner", methods=["GET"])
def get_planner_tasks():
    tasks = fetch_all_planner_tasks()
    return jsonify([task.__dict__ for task in tasks]), 200

@planner_bp.route("/planner/<int:task_id>", methods=["PUT"])
def update_planner_task(task_id):
    data = request.json
    is_valid, message = validate_planner_task(data)

    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    print(f"Simulatie: planner task {task_id} geüpdatet:")
    print(data)

    return jsonify({"status": "accepted", "message": f"Planner task {task_id} geüpdatet"}), 200

@planner_bp.route("/planner/<int:task_id>", methods=["DELETE"])
def delete_planner_task(task_id):
    print(f"Simulatie: planner task {task_id} verwijderd")

    return jsonify({"status": "accepted", "message": f"Planner task {task_id} verwijderd"}), 200


@planner_bp.route("/orders", methods=["GET"])
def get_all_orders_for_planner():
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders]), 200


@planner_bp.route("/orders/<int:order_id>", methods=["PUT"])
def update_order_from_planner(order_id):
    data = request.get_json()
    order = Order.query.get(order_id)

    if not order:
        return jsonify({"success": False, "reason": "Order niet gevonden"}), 404

    # Alleen dingen die de planner mag aanpassen
    order.status = data.get("status", order.status)
    order.picklist = data.get("picklist", order.picklist)
    order.production_line = data.get("production_line", order.production_line)

    db.session.commit()
    return jsonify({"success": True, "order": order.to_dict()}), 200


@planner_bp.route("/planner/orders", methods=["GET"])
def get_orders_for_planner():
    orders = Order.query.all()
    result = []
    for order in orders:
        result.append({
            "id": order.id,
            "customer_id": order.customer_id,
            "product_name": order.product_name,
            "quantity": order.quantity,
            "status": order.status,
            "created_at": order.created_at,
            "picklist": order.picklist,
            "production_line": order.production_line

        })
    return jsonify(result), 200

@planner_bp.route("/planner/orders/<int:order_id>", methods=["PUT"])
def update_order_planner(order_id):
    data = request.get_json()
    order = Order.query.get(order_id)

    if not order:
        return jsonify({"success": False, "message": "Order niet gevonden"}), 404

    # Alleen piklijst en productielijn mogen hier aangepast worden
    order.picklist_id = data.get("picklist_id", order.picklist_id)
    order.production_line = data.get("production_line", order.production_line)


    db.session.commit()
    return jsonify({"success": True, "message": "Order bijgewerkt"}), 200