# services/order_service.py

from models.order import Order
from extensions import db

def validate_order(data):
    required = ["product_name", "quantity", "created_at", "id"]
    for field in required:
        if field not in data:
            return False, f"'{field}' ontbreekt"

    if data["product_name"] not in ["A", "B", "C"]:
        return False, "Ongeldig product type (alleen A, B of C)"

    try:
        qty = int(data["quantity"])
        if qty < 1 or qty > 3:
            return False, "Aantal moet tussen 1 en 3 liggen"
    except ValueError:
        return False, "Aantal moet een getal zijn"

    return True, "Geldig"

def simulate_forward_order(data):
    new_order = Order(
        id=data["id"],
        product_name=data["product_name"],
        quantity=data["quantity"],
        created_at=data["created_at"],
    )
    db.session.add(new_order)
    db.session.commit()
    return new_order

def fetch_all_orders():
    return Order.query.all()

def update_order(order_id, data):
    order = Order.query.get(order_id)
    if order:
        order.product_type = data["product_name"]
        order.quantity = data["quantity"]
        order.created_at = data["created_at"]
        db.session.commit()
        return order
    return None

def delete_order(order_id):
    order = Order.query.get(order_id)
    if order:
        db.session.delete(order)
        db.session.commit()
        return True
    return False

def update_approval_status(order_id, approved: bool):
    order = Order.query.get(order_id)
    if order:
        order.goedgekeurd = approved
        db.session.commit()
        return True
    return False
    
def update_order_status(order_id, new_status):
    order = Order.query.get(order_id)
    if order:
        order.order_status = new_status
        db.session.commit()
        return True
    return False
