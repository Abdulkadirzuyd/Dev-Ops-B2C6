from models.inventory import InventoryItem
from extensions import db

def validate_inventory_item(data):
    required = ["red", "blue", "grey"]
    for field in required:
        if field not in data:
            return False, f"'{field}' ontbreekt"
        if not isinstance(data[field], int) or data[field] < 0:
            return False, f"'{field}' moet een positief geheel getal zijn"
    return True, "Geldig"

def simulate_forward_inventory_item(data):
    item = InventoryItem(
        red=data["red"],
        blue=data["blue"],
        grey=data["grey"]
    )
    db.session.add(item)
    db.session.commit()
    return item

def fetch_all_inventory_items():
    return InventoryItem.query.all()

def update_inventory_item(item_id, data):
    item = InventoryItem.query.get(item_id)
    if item:
        item.red = data.get("red", item.red)
        item.blue = data.get("blue", item.blue)
        item.grey = data.get("grey", item.grey)
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
