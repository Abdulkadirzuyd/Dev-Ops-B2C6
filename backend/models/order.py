from extensions import db

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    klantnaam = db.Column(db.String(100), nullable=False) 
    product_type = db.Column(db.String(10), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    order_status = db.Column(db.String(50), default='in_behandeling')
    order_date = db.Column(db.String(20), nullable=False)
    signature = db.Column(db.String(100), nullable=False)
    goedgekeurd = db.Column(db.Boolean, default=False)

    def update_status(self, status):
        self.order_status = status

    def is_valid(self):
        return self.product_type in ["A", "B", "C"] and 1 <= self.quantity <= 3

    def calculate_delivery_score(self):
        # voorbeeld: leverdatum = op tijd = score 100, anders 50
        return 100 if self.goedgekeurd else 50
