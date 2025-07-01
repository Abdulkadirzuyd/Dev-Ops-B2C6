from models.order import Order
from extensions import db
from datetime import datetime, timezone

# Maak nieuwe order aan (Word gebruikt op klant simulatie pagina)
def simulate_forward_order(data):
    created_at = data.get("created_at") or datetime.now(timezone.utc).isoformat()
    new_order = Order(
        customer_id=data["customer_id"],
        product_name=data["product_name"],
        quantity=data["quantity"],
        created_at=created_at,
        status=data.get("status") or "in_behandeling"
    )
    db.session.add(new_order)
    db.session.commit()
    return new_order

# Haal alle orders op
def fetch_all_orders():
    return Order.query.all()

# Update bestaande order met flexibele velden
def update_order(order_id, data):
    order = Order.query.get(order_id)
    if order:
        # Update alleen als veld in data zit, anders behoud oud veld
        order.product_name = data.get("product_name", order.product_name)
        order.quantity = data.get("quantity", order.quantity)
        order.created_at = data.get("created_at", order.created_at)
        order.status = data.get("status", order.status)
        order.picklist = data.get("picklist", order.picklist)
        order.production_line = data.get("production_line", order.production_line)
        db.session.commit()
        return order
    return None

# Verwijder order
def delete_order(order_id):
    order = Order.query.get(order_id)
    if order:
        db.session.delete(order)
        db.session.commit()
        return True
    return False

# Status van een order aanpassen
def update_order_status(order_id, new_status):
    order = Order.query.get(order_id)
    if order:
        order.status = new_status
        db.session.commit()
        return True
    return False
