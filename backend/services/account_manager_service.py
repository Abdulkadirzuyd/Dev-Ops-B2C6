from database import db
from models.account_manager_model import AccountManager

def create_account_manager(data):
    query = """
        INSERT INTO account_managers (name, email, phone_number)
        VALUES (%s, %s, %s)
    """
    cursor = db.cursor()
    cursor.execute(query, (data.name, data.email, data.phone_number))
    db.commit()
    data.id = cursor.lastrowid
    return data  # je retourneert nu een AccountManager met ID

def fetch_all_account_managers():
    query = "SELECT * FROM account_managers"
    cursor = db.cursor(dictionary=True)
    cursor.execute(query)
    results = cursor.fetchall()

    # Maak er AccountManager-objecten van
    managers = [AccountManager(**row) for row in results]
    return managers
