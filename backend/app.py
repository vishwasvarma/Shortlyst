from flask import Flask, request, send_file
from flask_cors import CORS
import json
import os
import csv
import tempfile

from jd.jd_parser import parse_jd
from cleaners.text_cleaner import clean_text
from parsers.pdf_parser import extract_pdf_text
from parsers.docx_parser import extract_docx_text
from skills.skill_extractor import load_skills, extract_skills
from rules.rule_engine import apply_rules
from decision.classifier import classify
from ai.ai_analyzer import analyze_resume

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

JOBS_FILE = os.path.join(DATA_DIR, "jobs.json")
RESULTS_FILE = os.path.join(DATA_DIR, "results.json")

app = Flask(__name__)
CORS(app)

SKILLS = load_skills()

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in {"pdf", "docx", "txt"}

# ---------------- JD INPUT ----------------
@app.route("/api/jobs", methods=["POST"])
def api_save_job():
    jd_text = ""

    if "jd_file" in request.files:
        file = request.files["jd_file"]
        if file.filename.lower().endswith(".pdf"):
            jd_text = extract_pdf_text(file)
        elif file.filename.lower().endswith(".docx"):
            jd_text = extract_docx_text(file)
    else:
        jd_text = request.form.get("jd_text", "").strip()

    structured_jd = parse_jd(jd_text, SKILLS)

    with open(JOBS_FILE, "w") as f:
        json.dump({"structured": structured_jd}, f, indent=2)

    return {"success": True}

# ---------------- RESUME ANALYSIS ----------------
@app.route("/api/analyze", methods=["POST"])
def api_analyze_resume():
    with open(JOBS_FILE) as f:
        structured_jd = json.load(f)["structured"]

    jd_skills = structured_jd.get("required_skills", []) + structured_jd.get(
        "preferred_skills", []
    )

    files = request.files.getlist("resumes")
    github_links = request.form.getlist("github_links")

    results = []

    for idx, file in enumerate(files):
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

        github_url = github_links[idx] if idx < len(github_links) and github_links[idx] else None

        rules = apply_rules(jd_skills, resume_skills, github_url)
        decision = classify(rules)

        ai = analyze_resume(jd_skills, resume_skills, rules["final_score"], github_url)

        results.append({
            "filename": file.filename,
            "decision": decision,
            "final_score": rules["final_score"],
            "mandatory_status": rules["mandatory_skills"]["status"],
            "mandatory_evidence": rules["mandatory_skills"]["evidence"],
            "github": github_url or "N/A",
            "ai_strengths": "; ".join(ai["strengths"]),
            "ai_red_flags": "; ".join(ai["red_flags"])
        })

    with open(RESULTS_FILE, "w") as f:
        json.dump(results, f, indent=2)

    return {"results": results}

# ---------------- CSV EXPORT ----------------
@app.route("/api/export", methods=["GET"])
def export_csv():
    if not os.path.exists(RESULTS_FILE):
        return {"error": "No results to export"}, 400

    with open(RESULTS_FILE) as f:
        results = json.load(f)

    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".csv")

    with open(tmp.name, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=results[0].keys())
        writer.writeheader()
        for row in results:
            writer.writerow(row)

    return send_file(
        tmp.name,
        as_attachment=True,
        download_name="resume_screening_results.csv",
        mimetype="text/csv"
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
