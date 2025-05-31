from dataclasses import dataclass

@dataclass
class AccountManager:
    id: int = None
    name: str = ""
    email: str = ""
    phone_number: str = ""
