from extensions import db

class InventoryItem(db.Model):
    __tablename__ = "inventory"

    id = db.Column(db.Integer, primary_key=True)
    red = db.Column(db.Integer, nullable=False)
    blue = db.Column(db.Integer, nullable=False)
    grey = db.Column(db.Integer, nullable=False)



