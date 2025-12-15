def get_changes(old_obj: dict, new_obj: dict) -> dict:
    changes = {}
    for key, value in new_obj.items():
        if old_obj[key] != value:
            changes[key] = value
    return changes
