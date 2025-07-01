from extensions import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    customer_id = db.Column(db.Integer, nullable=False)
    product_name = db.Column(db.String(10), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(50), default='in_behandeling')  # je zou dit ook een ENUM kunnen maken
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    picklist_id = db.Column(db.String(50), nullable=True)
    production_line = db.Column(db.String(50), nullable=True)

    def update_status(self, status):
        self.status = status

    def is_valid(self):
        return self.product_name in ["A", "B", "C"] and 1 <= self.quantity <= 3

    def to_dict(self):
        return {
            "id": self.id,
            "customer_id": self.customer_id,
            "product_name": self.product_name,
            "quantity": self.quantity,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "picklist_id": self.picklist_id,
            "production_line": self.production_line
        }
