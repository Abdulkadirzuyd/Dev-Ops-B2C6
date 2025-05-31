from models.customers import Customer

def validate_customer(data):
    required = ["name", "email", "phone_number"]
    for field in required:
        if field not in data:
            return False, f"'{field}' ontbreekt"

    return True, "Geldig"

def simulate_forward_customer(data):
    print("Simulatie: customer toegevoegd:")
    print(data)
    return True

def fetch_all_customers():
    # Voorbeeld data → later koppelen aan database
    example_customer = Customer(
        name="John Doe",
        email="john@example.com",
        phone_number="123456789"
    )
    return [example_customer]
