from models.supplier import Supplier

def validate_supplier(data):
    required = ["supplier_name", "contact_email", "phone_number"]
    for field in required:
        if field not in data:
            return False, f"'{field}' ontbreekt"

    return True, "Geldig"

def simulate_forward_supplier(data):
    print("Simulatie: supplier toegevoegd:")
    print(data)
    return True

def fetch_all_suppliers():
    # Voorbeeld data → later koppelen aan database
    example_supplier = Supplier(
        supplier_name="Tech Supplies Inc.",
        contact_email="supplier@example.com",
        phone_number="123456789"
    )
    return [example_supplier]
