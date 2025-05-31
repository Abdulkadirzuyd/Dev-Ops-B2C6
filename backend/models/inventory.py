from dataclasses import dataclass

@dataclass
class InventoryItem:
    product_name: str
    quantity: int
    location: str
