from flask import Blueprint, request, jsonify
from services.customers_service import (
    validate_customer,
    simulate_forward_customer,
    fetch_all_customers,
    update_customer_in_db,
    delete_customer_from_db
)
from models.customers import Customer

customers_bp = Blueprint("customers", __name__)

@customers_bp.route("/customers", methods=["POST"])
def add_customer():
    data = request.json
    is_valid, message = validate_customer(data)
    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    customer = simulate_forward_customer(data)
    return jsonify({"status": "accepted", "id": customer.id}), 201

@customers_bp.route("/customers", methods=["GET"])
def get_customers():
    customers = fetch_all_customers()
    return jsonify([{
        "id": c.id,
        "name": c.name,
        "email": c.email,
        "phone_number": c.phone_number
    } for c in customers]), 200

@customers_bp.route("/customers/<int:customer_id>", methods=["PUT"])
def update_customer(customer_id):
    data = request.json
    is_valid, message = validate_customer(data)
    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    updated = update_customer_in_db(customer_id, data)
    if updated:
        return jsonify({"status": "accepted", "message": f"Customer {customer_id} geüpdatet"}), 200
    else:
        return jsonify({"status": "not found"}), 404

@customers_bp.route("/customers/<int:customer_id>", methods=["DELETE"])
def delete_customer(customer_id):
    deleted = delete_customer_from_db(customer_id)
    if deleted:
        return jsonify({"status": "deleted", "message": f"Customer {customer_id} verwijderd"}), 200
    else:
        return jsonify({"status": "not found"}), 404