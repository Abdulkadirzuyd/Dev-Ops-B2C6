from models.order import Order

def validate_order(data):
    required = ["product_type", "quantity", "order_date", "signature"]
    for field in required:
        if field not in data:
            return False, f"'{field}' ontbreekt"

    if data["product_type"] not in ["A", "B", "C"]:
        return False, "Ongeldig product type (alleen A, B of C)"

    try:
        qty = int(data["quantity"])
        if qty < 1 or qty > 3:
            return False, "Aantal moet tussen 1 en 3 liggen"
    except ValueError:
        return False, "Aantal moet een getal zijn"

    return True, "Geldig"

def simulate_forward_order(data):
    # Hier zou je de order normaal aan planning doorgeven
    print("Simulatie: order doorgestuurd naar planning:")
    print(data)
    return True
