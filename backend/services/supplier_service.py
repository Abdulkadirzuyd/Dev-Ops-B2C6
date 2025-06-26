from models.supplier import Supplier
from extensions import db

def validate_supplier(data):
    required = ["supplier_name", "contact_email", "phone_number"]
    for field in required:
        if field not in data:
            return False, f"'{field}' ontbreekt"
    return True, "Geldig"

def simulate_forward_supplier(data):
    supplier = Supplier(
        supplier_name=data["supplier_name"],
        contact_email=data["contact_email"],
        phone_number=data["phone_number"]
    )
    db.session.add(supplier)
    db.session.commit()
    return supplier

def fetch_all_suppliers():
    return Supplier.query.all()

