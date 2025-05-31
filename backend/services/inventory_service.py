from models.inventory import InventoryItem

def validate_inventory_item(data):
    required = ["product_name", "quantity", "location"]
    for field in required:
        if field not in data:
            return False, f"'{field}' ontbreekt"

    return True, "Geldig"

def simulate_forward_inventory_item(data):
    print("Simulatie: inventory item toegevoegd:")
    print(data)
    return True

def fetch_all_inventory_items():
    # Voorbeeld data → later koppelen aan database
    example_item = InventoryItem(
        product_name="Laptop",
        quantity=10,
        location="Warehouse A"
    )
    return [example_item]
