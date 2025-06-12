from models.user_model import User
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db

def register_user(username, email, password):
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise ValueError("Gebruiker met dit e-mailadres bestaat al.")
    hashed_pw = generate_password_hash(password)
    user = User(username=username, email=email, password=hashed_pw)
    db.session.add(user)
    db.session.commit()
    return user

def login_user(email, password):
    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        return True, user
    return False, None
