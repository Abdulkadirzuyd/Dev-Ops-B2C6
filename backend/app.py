from flask import Flask
from routes.orders import order_bp
from routes.account_manager_routes import account_manager_bp
from database import db
from routes.customers import customers_bp
from routes.inventory import inventory_bp
from routes.planner import planner_bp
from routes.supplier import supplier_bp

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:jouwwachtwoord@localhost/simulatie_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(order_bp)
app.register_blueprint(account_manager_bp)
app.register_blueprint(customers_bp)
app.register_blueprint(inventory_bp)
app.register_blueprint(planner_bp)
app.register_blueprint(supplier_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

