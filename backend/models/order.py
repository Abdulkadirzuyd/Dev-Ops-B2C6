from dataclasses import dataclass

@dataclass
class Order:
    product_type: str
    quantity: int
    order_date: str
    signature: str
