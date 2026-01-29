from flask import Flask, request
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
# API ROUTES (USED BY REACT)
# -----------------------

@app.route("/api/jobs", methods=["POST"])
def api_save_job():
    data = request.get_json()
    jd_text = data.get("jd", "").strip()

    if not jd_text:
        return {"error": "Job description is empty"}, 400

    with open(JOBS_FILE, "w") as f:
        json.dump({"jd": jd_text}, f, indent=2)

    return {"success": True}


@app.route("/api/analyze", methods=["POST"])
def api_analyze_resume():
    if not os.path.exists(JOBS_FILE):
        return {"error": "Job description not found"}, 400

    with open(JOBS_FILE) as f:
        jd = json.load(f).get("jd", "")

    files = request.files.getlist("resumes")
    if not files:
        return {"error": "No resumes uploaded"}, 400

    jd_clean = clean_text(jd)
    jd_skills = extract_skills(jd_clean, SKILLS)

    results = []

    for file in files:
        if not allowed_file(file.filename):
            continue

        if file.filename.endswith(".pdf"):
            text = extract_pdf_text(file)
        elif file.filename.endswith(".docx"):
            text = extract_docx_text(file)
        else:
            text = file.read().decode("utf-8", errors="ignore")

        resume_clean = clean_text(text)
        resume_skills = extract_skills(resume_clean, SKILLS)

        rules = apply_rules(jd_skills, resume_skills)
        decision = classify(rules["score"])
        ai_insights = analyze_resume(jd_skills, resume_skills, rules["score"])

        result = {
            "filename": file.filename,
            "score": rules["score"],
            "decision": decision,
            "matched": rules["matched"],
            "missing": rules["missing"],
            "ai": ai_insights
        }

        results.append(result)

    # Save all results
    if not os.path.exists(RESULTS_FILE):
        with open(RESULTS_FILE, "w") as f:
            json.dump([], f)

    with open(RESULTS_FILE, "r+") as f:
        data = json.load(f)
        data.extend(results)
        f.seek(0)
        json.dump(data, f, indent=2)

    return {"results": results}


# -----------------------
# Run App
# -----------------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
