from flask import Blueprint, request, jsonify
from services.inventory_service import (
    validate_inventory_item, 
    simulate_forward_inventory_item, 
    fetch_all_inventory_items,
    update_inventory_item,
    delete_inventory_item
)

inventory_bp = Blueprint("inventory", __name__)

@inventory_bp.route("/inventory", methods=["POST"])
def add_inventory_item():
    data = request.json
    is_valid, message = validate_inventory_item(data)
    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    item = simulate_forward_inventory_item(data)
    return jsonify({"status": "accepted", "message": "Inventory item toegevoegd", "id": item.id}), 200

@inventory_bp.route("/inventory", methods=["GET"])
def get_inventory_items():
    items = fetch_all_inventory_items()
    # Gebruik to_dict() om serialiseren correct te doen
    return jsonify([{
        "id": item.id,
        "red": item.red,
        "blue": item.blue,
        "grey": item.grey
    } for item in items]), 200

@inventory_bp.route("/inventory/<int:item_id>", methods=["PUT"])
def put_inventory_item(item_id):
    data = request.json
    is_valid, message = validate_inventory_item(data)
    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    item = update_inventory_item(item_id, data)
    if not item:
        return jsonify({"status": "not_found", "reason": "Item niet gevonden"}), 404

    return jsonify({"status": "accepted", "message": f"Inventory item {item_id} geüpdatet"}), 200

@inventory_bp.route("/inventory/<int:item_id>", methods=["DELETE"])
def delete_inventory_route(item_id):
    success = delete_inventory_item(item_id)
    if success:
        return jsonify({"status": "accepted", "message": f"Inventory item {item_id} verwijderd"}), 200
    return jsonify({"status": "not_found", "reason": "Item niet gevonden"}), 404
