from dataclasses import dataclass

@dataclass
class PlannerTask:
    task_name: str
    scheduled_date: str
    assigned_to: str
