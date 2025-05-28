from flask import Flask
from routes.orders import order_bp

app = Flask(__name__)
app.register_blueprint(order_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)