import json

USERS_FILE = "data/users.json"

def authenticate(username, password):
    with open(USERS_FILE) as f:
        users = json.load(f)
    return users.get(username) == password
