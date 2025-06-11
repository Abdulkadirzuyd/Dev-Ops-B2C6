from database import db
from models.account_manager_model import AccountManager

def approve_order(manager_id, order_id):
    query = """
        UPDATE orders
        SET order_status = 'goedgekeurd', goedgekeurd = 1
        WHERE id = %s
    """
    cursor = db.cursor()
    cursor.execute(query, (order_id,))
    db.commit()
    return {"order_id": order_id, "status": "goedgekeurd", "approved_by": manager_id}

def reject_order(manager_id, order_id):
    query = """
        UPDATE orders
        SET order_status = 'afgewezen', goedgekeurd = 0
        WHERE id = %s
    """
    cursor = db.cursor()
    cursor.execute(query, (order_id,))
    db.commit()
    return {"order_id": order_id, "status": "afgewezen", "rejected_by": manager_id}

