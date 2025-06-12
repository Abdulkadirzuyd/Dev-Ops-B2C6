from models.inventory import InventoryItem
from extensions import db

def validate_inventory_item(data):
    required = ["product_name", "quantity_in_stock", "minimum_required"]
    for field in required:
        if field not in data:
            return False, f"'{field}' ontbreekt"
    return True, "Geldig"

def simulate_forward_inventory_item(data):
    item = InventoryItem(
    product_name=data["product_name"],
    quantity_in_stock=data["quantity_in_stock"],
    minimum_required=data["minimum_required"]
)

    db.session.add(item)
    db.session.commit()
    return item

def fetch_all_inventory_items():
    return InventoryItem.query.all()

def update_inventory_item(item_id, data):
    item = InventoryItem.query.get(item_id)
    if item:
        item.product_name = data["product_name"]
        item.quantity = data["quantity"]
        item.location = data["location"]
        db.session.commit()
        return item
    return None

def delete_inventory_item(item_id):
    item = InventoryItem.query.get(item_id)
    if item:
        db.session.delete(item)
        db.session.commit()
        return True
    return False
