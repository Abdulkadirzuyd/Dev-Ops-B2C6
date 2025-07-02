from models.inventory import InventoryItem
from extensions import db

def validate_inventory_item(data):
    required = ["red", "blue", "grey"]
    for field in required:
        if field not in data:
            return False, f"'{field}' ontbreekt"
        if not isinstance(data[field], int) or data[field] < 0:
            return False, f"'{field}' moet een positief geheel getal zijn"
    
    # Optioneel: extra validatie op nieuwe velden
    if "quantity" in data:
        if not isinstance(data["quantity"], int) or data["quantity"] < 0:
            return False, "'quantity' moet een positief geheel getal zijn"
    
    # order_id en type kunnen optioneel zijn, maar check type als aanwezig
    if "order_id" in data and not isinstance(data["order_id"], str):
        return False, "'order_id' moet een string zijn"
    if "order_type" in data and not isinstance(data["order_type"], str):
        return False, "'order_type' moet een string zijn"

    return True, "Geldig"

def simulate_forward_inventory_item(data):
    item = InventoryItem(
        red=data["red"],
        blue=data["blue"],
        grey=data["grey"],
        order_id=data.get("order_id"),
        quantity=data.get("quantity"),
        order_type=data.get("order_type"),
        production_line=data.get("production_line")
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
        item.order_id = data.get("order_id", item.order_id)
        item.quantity = data.get("quantity", item.quantity)
        item.order_type = data.get("order_type", item.order_type)
        item.production_line = data.get("production_line", item.production_line)
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
