from flask import Blueprint, request, jsonify
from services.customers_service import validate_customer, simulate_forward_customer, fetch_all_customers
from models.customers import Customer

customers_bp = Blueprint("customers", __name__)

@customers_bp.route("/customers", methods=["POST"])
def add_customer():
    data = request.json
    is_valid, message = validate_customer(data)

    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    simulate_forward_customer(data)
    return jsonify({"status": "accepted", "message": "Customer toegevoegd"}), 200

@customers_bp.route("/customers", methods=["GET"])
def get_customers():
    customers = fetch_all_customers()
    return jsonify([customer.__dict__ for customer in customers]), 200

@customers_bp.route("/customers/<int:customer_id>", methods=["PUT"])
def update_customer(customer_id):
    data = request.json
    is_valid, message = validate_customer(data)

    if not is_valid:
        return jsonify({"status": "rejected", "reason": message}), 400

    print(f"Simulatie: customer {customer_id} geüpdatet:")
    print(data)

    return jsonify({"status": "accepted", "message": f"Customer {customer_id} geüpdatet"}), 200

@customers_bp.route("/customers/<int:customer_id>", methods=["DELETE"])
def delete_customer(customer_id):
    print(f"Simulatie: customer {customer_id} verwijderd")

    return jsonify({"status": "accepted", "message": f"Customer {customer_id} verwijderd"}), 200
