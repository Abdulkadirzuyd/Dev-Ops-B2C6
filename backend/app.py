from flask import Flask
from flask_cors import CORS
from extensions import db
from routes.orders import order_bp
from routes.account_manager_routes import account_manager_bp
from routes.customers import customers_bp
from routes.inventory import inventory_bp
from routes.planner import planner_bp
from routes.supplier import supplier_bp
from routes.auth import auth_bp
from models.user_model import User
import os

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Zet hier de juiste connectiestring hardcoded:
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:password1234@172.201.187.117:3306/simulatie_db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()


    # Register blueprints
    app.register_blueprint(order_bp)
    app.register_blueprint(account_manager_bp)
    app.register_blueprint(customers_bp)
    app.register_blueprint(inventory_bp)
    app.register_blueprint(planner_bp)
    app.register_blueprint(supplier_bp)
    app.register_blueprint(auth_bp)

    return app  


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
