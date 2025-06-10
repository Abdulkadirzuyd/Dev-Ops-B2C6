from dataclasses import dataclass

@dataclass
class Order:
    id: int  
    product_type: str
    quantity: int
    order_date: str
    signature: str
