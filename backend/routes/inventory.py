from flask import Blueprint, request, jsonify
from services.inventory_service import validate_inventory_item, simulate_forward_inventory_item, fetch_all_inventory_items
from models.inventory import InventoryItem

inventory_bp = Blueprint("inventory", __name__)

@inventory_bp.route("/inventory", methods=["POST"])
def add_inventory_item():
    data = request.json
    is_valid, message = validate_inventory_item(data)

    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    simulate_forward_inventory_item(data)
    return jsonify({"status": "accepted", "message": "Inventory item toegevoegd"}), 200

@inventory_bp.route("/inventory", methods=["GET"])
def get_inventory_items():
    items = fetch_all_inventory_items()
    return jsonify([item.__dict__ for item in items]), 200

@inventory_bp.route("/inventory/<int:item_id>", methods=["PUT"])
def update_inventory_item(item_id):
    data = request.json
    is_valid, message = validate_inventory_item(data)

    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    print(f"Simulatie: inventory item {item_id} geüpdatet:")
    print(data)

    return jsonify({"status": "accepted", "message": f"Inventory item {item_id} geüpdatet"}), 200

@inventory_bp.route("/inventory/<int:item_id>", methods=["DELETE"])
def delete_inventory_item(item_id):
    print(f"Simulatie: inventory item {item_id} verwijderd")

    return jsonify({"status": "accepted", "message": f"Inventory item {item_id} verwijderd"}), 200
