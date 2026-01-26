import os

# ------------------------
# Flask Configuration
# ------------------------

SECRET_KEY = os.environ.get("SECRET_KEY", "shortlysr_secret_key")

DEBUG = True

# ------------------------
# File Paths
# ------------------------

DATA_DIR = "data"

USERS_FILE = os.path.join(DATA_DIR, "users.json")
JOBS_FILE = os.path.join(DATA_DIR, "jobs.json")
RESULTS_FILE = os.path.join(DATA_DIR, "results.json")

# ------------------------
# Upload Settings
# ------------------------

UPLOAD_FOLDER = "uploads"

ALLOWED_EXTENSIONS = {"pdf", "docx", "txt"}

# ------------------------
# AI (Optional / Later)
# ------------------------

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
