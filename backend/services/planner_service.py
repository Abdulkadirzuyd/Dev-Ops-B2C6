from models.planner import PlannerTask

def validate_planner_task(data):
    required = ["task_name", "scheduled_date", "assigned_to"]
    for field in required:
        if field not in data:
            return False, f"'{field}' ontbreekt"

    return True, "Geldig"

def simulate_forward_planner_task(data):
    print("Simulatie: planner task toegevoegd:")
    print(data)
    return True

def fetch_all_planner_tasks():
    # Voorbeeld data → later koppelen aan database
    example_task = PlannerTask(
        task_name="Assemble laptop",
        scheduled_date="2025-06-01",
        assigned_to="Technician A"
    )
    return [example_task]
