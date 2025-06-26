from extensions import db

class PlannerTask(db.Model):
    __tablename__ = 'planner_tasks'

    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(255), nullable=False)
    scheduled_date = db.Column(db.String(50), nullable=False)
    assigned_to = db.Column(db.String(100), nullable=False)

