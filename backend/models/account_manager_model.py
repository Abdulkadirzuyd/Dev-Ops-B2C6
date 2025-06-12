from extensions import db

class AccountManager(db.Model):
    __tablename__ = 'account_managers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.String(50), nullable=False)
