import json
import os

USERS_FILE = os.path.join("data", "users.json")

def authenticate(username: str, password: str) -> bool:
    """
    Check if username and password are valid.
    """
    if not username or not password:
        return False

    if not os.path.exists(USERS_FILE):
        return False

    with open(USERS_FILE, "r") as f:
        users = json.load(f)

    return users.get(username) == password
