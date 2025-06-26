from models.planner import PlannerTask
from extensions import db

def validate_planner_task(data):
    required = ["task_name", "scheduled_date", "assigned_to"]
    for field in required:
        if field not in data:
            return False, f"'{field}' ontbreekt"
    return True, "Geldig"

def simulate_forward_planner_task(data):
    task = PlannerTask(
        task_name=data["task_name"],
        scheduled_date=data["scheduled_date"],
        assigned_to=data["assigned_to"]
    )
    db.session.add(task)
    db.session.commit()
    return task

def fetch_all_planner_tasks():
    return PlannerTask.query.all()

def update_planner_task(task_id, data):
    task = PlannerTask.query.get(task_id)
    if task:
        task.task_name = data["task_name"]
        task.scheduled_date = data["scheduled_date"]
        task.assigned_to = data["assigned_to"]
        db.session.commit()
        return task
    return None

def delete_planner_task(task_id):
    task = PlannerTask.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return True
    return False

