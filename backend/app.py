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
from dotenv import load_dotenv
from sqlalchemy.exc import OperationalError
import os
import time

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/": {"origins": ""}}, supports_credentials=True)

    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:password1234@172.201.187.117:3306/simulatie_db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        for _ in range(10):
            try:
                db.create_all()
                break
            except OperationalError:
                print("⚠️ Wachten tot database klaar is...")
                time.sleep(3)

    
    # Register blueprints with url_prefixes
    app.register_blueprint(order_bp, url_prefix="/api/orders")
    app.register_blueprint(account_manager_bp, url_prefix="/api/account_manager")
    app.register_blueprint(customers_bp, url_prefix="/api/customers")
    app.register_blueprint(inventory_bp, url_prefix="/api/inventory")
    app.register_blueprint(planner_bp, url_prefix="/api/planner")
    app.register_blueprint(supplier_bp, url_prefix="/api/suppliers")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")


    return app

 
 
app = create_app()
 
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
