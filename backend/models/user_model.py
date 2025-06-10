from extensions import db

class User(db.Model):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}  # ← voorkomt dubbele definitie

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
