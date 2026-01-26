from flask import Flask, request, jsonify
from auth import authenticate

app = Flask(__name__)

@app.post("/login")
def login():
    data = request.json
    if authenticate(data["username"], data["password"]):
        return jsonify({"success": True})
    return jsonify({"success": False}), 401

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
