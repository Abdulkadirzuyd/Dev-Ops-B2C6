from flask import Blueprint, request, jsonify
from services.supplier_service import validate_supplier, simulate_forward_supplier, fetch_all_suppliers
from models.supplier import Supplier

supplier_bp = Blueprint("supplier", __name__)

@supplier_bp.route("/supplier", methods=["POST"])
def add_supplier():
    data = request.json
    is_valid, message = validate_supplier(data)

    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    simulate_forward_supplier(data)
    return jsonify({"status": "accepted", "message": "Supplier toegevoegd"}), 200

@supplier_bp.route("/supplier", methods=["GET"])
def get_suppliers():
    suppliers = fetch_all_suppliers()
    return jsonify([supplier.__dict__ for supplier in suppliers]), 200

@supplier_bp.route("/supplier/<int:supplier_id>", methods=["PUT"])
def update_supplier(supplier_id):
    data = request.json
    is_valid, message = validate_supplier(data)

    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    print(f"Simulatie: supplier {supplier_id} geüpdatet:")
    print(data)

    return jsonify({"status": "accepted", "message": f"Supplier {supplier_id} geüpdatet"}), 200

@supplier_bp.route("/supplier/<int:supplier_id>", methods=["DELETE"])
def delete_supplier(supplier_id):
    print(f"Simulatie: supplier {supplier_id} verwijderd")

    return jsonify({"status": "accepted", "message": f"Supplier {supplier_id} verwijderd"}), 200
