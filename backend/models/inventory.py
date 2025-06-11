from extensions import db

class InventoryItem(db.Model):
    __tablename__ = "inventory"

    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(255), nullable=False)
    quantity_in_stock = db.Column(db.Integer, nullable=False)
    minimum_required = db.Column(db.Integer, nullable=False)



