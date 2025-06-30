from extensions import db

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(10), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(50), default='in_behandeling')
    created_at = db.Column(db.String(20), nullable=False)

    def update_status(self, status):
        self.order_status = status

    def is_valid(self):
        return self.product_type in ["A", "B", "C"] and 1 <= self.quantity <= 3

    def calculate_delivery_score(self):
        # voorbeeld: leverdatum = op tijd = score 100, anders 50
        return 100 if self.goedgekeurd else 50
