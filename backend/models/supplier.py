from extensions import db

class Supplier(db.Model):
    __tablename__ = 'suppliers'

    id = db.Column(db.Integer, primary_key=True)
    supplier_name = db.Column(db.String(255), nullable=False)
    contact_email = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(50), nullable=False)

