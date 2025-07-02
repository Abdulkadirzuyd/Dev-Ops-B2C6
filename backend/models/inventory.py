from extensions import db

class InventoryItem(db.Model):
    __tablename__ = "inventory"

    id = db.Column(db.Integer, primary_key=True)
    red = db.Column(db.Integer, nullable=False)
    blue = db.Column(db.Integer, nullable=False)
    grey = db.Column(db.Integer, nullable=False)

    order_id = db.Column(db.Integer, nullable=True)
    quantity = db.Column(db.Integer, nullable=True)
    order_type = db.Column(db.String(50), nullable=True)
    production_line = db.Column(db.String(50), nullable=True)
