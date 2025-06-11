from flask import Blueprint, request, jsonify
from services.planner_service import (
    validate_planner_task,
    simulate_forward_planner_task,
    fetch_all_planner_tasks
)
from models.planner import PlannerTask

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
