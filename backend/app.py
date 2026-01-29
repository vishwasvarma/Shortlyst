from flask import Flask, request
from flask_cors import CORS
from jd.jd_parser import parse_jd

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
# API ROUTES
# -----------------------

@app.route("/api/jobs", methods=["POST"])
def api_save_job():
    data = request.get_json()
    jd_text = data.get("jd", "").strip()

    if not jd_text:
        return {"error": "Job description is empty"}, 400

    structured_jd = parse_jd(jd_text, SKILLS)

    with open(JOBS_FILE, "w") as f:
        json.dump(
            {
                "raw_jd": jd_text,
                "structured": structured_jd
            },
            f,
            indent=2
        )

    return {"success": True, "structured_jd": structured_jd}


@app.route("/api/analyze", methods=["POST"])
def api_analyze_resume():
    if not os.path.exists(JOBS_FILE):
        return {"error": "Job description not found"}, 400

    # ✅ READ JD CORRECTLY
    with open(JOBS_FILE) as f:
        jd_data = json.load(f)

    raw_jd = jd_data.get("raw_jd", "")
    structured_jd = jd_data.get("structured", {})

    required_skills = structured_jd.get("required_skills", [])
    preferred_skills = structured_jd.get("preferred_skills", [])

    if not required_skills and not preferred_skills:
        return {"error": "No skills found in Job Description"}, 400

    files = request.files.getlist("resumes")
    if not files:
        return {"error": "No resumes uploaded"}, 400

    results = []

    for file in files:
        if not allowed_file(file.filename):
            continue

        # -------- Extract resume text --------
        if file.filename.endswith(".pdf"):
            text = extract_pdf_text(file)
        elif file.filename.endswith(".docx"):
            text = extract_docx_text(file)
        else:
            text = file.read().decode("utf-8", errors="ignore")

        resume_clean = clean_text(text)
        resume_skills = extract_skills(resume_clean, SKILLS)

        # -------- Rule Engine (JD‑driven) --------
        rules = apply_rules(required_skills + preferred_skills, resume_skills)
        decision = classify(rules["score"])

        # -------- AI Analysis (JD‑conditioned) --------
        ai_insights = analyze_resume(
            required_skills + preferred_skills,
            resume_skills,
            rules["score"]
        )

        result = {
            "filename": file.filename,
            "score": rules["score"],
            "decision": decision,
            "matched": rules["matched"],
            "missing": rules["missing"],
            "required_skills": required_skills,
            "preferred_skills": preferred_skills,
            "ai": ai_insights
        }

        results.append(result)

    # -------- Save results (overwrite per batch) --------
    with open(RESULTS_FILE, "w") as f:
        json.dump(results, f, indent=2)

    return {"results": results}


# -----------------------
# Run App
# -----------------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
