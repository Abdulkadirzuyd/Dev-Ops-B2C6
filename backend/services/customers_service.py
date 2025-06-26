from models.customers import Customer
from extensions import db

def validate_customer(data):
    required = ["name", "email", "phone_number"]
    for field in required:
        if field not in data:
            return False, f"'{field}' ontbreekt"
    return True, "Geldig"

def simulate_forward_customer(data):
    customer = Customer(
        name=data["name"],
        email=data["email"],
        phone_number=data["phone_number"]
    )
    db.session.add(customer)
    db.session.commit()
    return customer

def fetch_all_customers():
    return Customer.query.all()

def update_customer_in_db(customer_id, data):
    customer = Customer.query.get(customer_id)
    if customer:
        customer.name = data["name"]
        customer.email = data["email"]
        customer.phone_number = data["phone_number"]
        db.session.commit()
        return customer
    return None

def delete_customer_from_db(customer_id):
    customer = Customer.query.get(customer_id)
    if customer:
        db.session.delete(customer)
        db.session.commit()
        return True
    return False

