from flask import Flask, render_template, request
from flask_cors import CORS
import json
import os

from cleaners.text_cleaner import clean_text
from parsers.pdf_parser import extract_pdf_text
from parsers.docx_parser import extract_docx_text
from skills.skill_extractor import load_skills, extract_skills
from rules.rule_engine import apply_rules
from decision.classifier import classify
from ai.ai_analyzer import analyze_resume

# -----------------------
# App & Config
# -----------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

JOBS_FILE = os.path.join(DATA_DIR, "jobs.json")
RESULTS_FILE = os.path.join(DATA_DIR, "results.json")

ALLOWED_EXTENSIONS = {"pdf", "docx", "txt"}

app = Flask(__name__)
CORS(app)

SKILLS = load_skills()

# -----------------------
# Helpers
# -----------------------

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# -----------------------
# Routes
# -----------------------

@app.route("/")
def dashboard():
    return render_template("dashboard.html")

@app.route("/jobs", methods=["GET", "POST"])
def jobs():
    if request.method == "POST":
        jd_text = request.form.get("jd", "").strip()
        with open(JOBS_FILE, "w") as f:
            json.dump({"jd": jd_text}, f, indent=2)

    return render_template("jobs.html")

@app.route("/upload", methods=["GET", "POST"])
def upload():
    result = None

    if not os.path.exists(JOBS_FILE):
        return render_template("upload.html", error="Please add a Job Description first.")

    with open(JOBS_FILE) as f:
        jd = json.load(f).get("jd", "")

    if not jd:
        return render_template("upload.html", error="Job Description is empty.")

    if request.method == "POST":
        file = request.files.get("resume")

        if not file or not allowed_file(file.filename):
            return render_template("upload.html", error="Invalid file type.")

        if file.filename.endswith(".pdf"):
            text = extract_pdf_text(file)
        elif file.filename.endswith(".docx"):
            text = extract_docx_text(file)
        else:
            text = file.read().decode("utf-8", errors="ignore")

        jd_clean = clean_text(jd)
        resume_clean = clean_text(text)

        jd_skills = extract_skills(jd_clean, SKILLS)
        resume_skills = extract_skills(resume_clean, SKILLS)

        rules = apply_rules(jd_skills, resume_skills)
        decision = classify(rules["score"])
        ai_insights = analyze_resume(jd_skills, resume_skills, rules["score"])

        result = {
            "matched": rules["matched"],
            "missing": rules["missing"],
            "score": rules["score"],
            "decision": decision,
            "ai": ai_insights
        }

        with open(RESULTS_FILE, "r+") as f:
            data = json.load(f)
            data.append(result)
            f.seek(0)
            json.dump(data, f, indent=2)

    return render_template("upload.html", result=result)

@app.route("/results")
def results():
    with open(RESULTS_FILE) as f:
        data = json.load(f)

    return render_template("results.html", results=data)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
