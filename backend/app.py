from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import json, os, csv, tempfile

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

os.makedirs(DATA_DIR, exist_ok=True)

JOBS_FILE = os.path.join(DATA_DIR, "jobs.json")
RESULTS_FILE = os.path.join(DATA_DIR, "results.json")

app = Flask(__name__)
CORS(app)
SKILLS = load_skills()

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in {"pdf","docx","txt"}

# ---------------- JD INPUT ----------------
@app.route("/api/jobs", methods=["POST"])
def api_save_job():
    jd_text = ""

    if "jd_file" in request.files:
        f = request.files["jd_file"]
        if f.filename.endswith(".pdf"):
            jd_text = extract_pdf_text(f)
        elif f.filename.endswith(".docx"):
            jd_text = extract_docx_text(f)
    else:
        jd_text = request.form.get("jd_text","").strip()

    structured = parse_jd(jd_text, SKILLS)

    with open(JOBS_FILE,"w") as f:
        json.dump({"structured": structured}, f, indent=2)

    return {"success": True}

# ---------------- ANALYZE ----------------
@app.route("/api/analyze", methods=["POST"])
def api_analyze():
    if not os.path.exists(JOBS_FILE):
        return jsonify({"error": "JD not found"}), 400

    with open(JOBS_FILE) as f:
        jd = json.load(f)["structured"]

    jd_skills = jd.get("required_skills",[]) + jd.get("preferred_skills",[])
    files = request.files.getlist("resumes")
    github_links = request.form.getlist("github_links")

    results = []

    for i, file in enumerate(files):
        if not allowed_file(file.filename):
            continue

        if file.filename.endswith(".pdf"):
            text = extract_pdf_text(file)
        elif file.filename.endswith(".docx"):
            text = extract_docx_text(file)
        else:
            text = file.read().decode("utf-8","ignore")

        resume_clean = clean_text(text)
        resume_skills = extract_skills(resume_clean, SKILLS)
        github = github_links[i] if i < len(github_links) and github_links[i] else None

        rules = apply_rules(jd_skills, resume_skills, github)
        decision = classify(rules)
        ai = analyze_resume(jd_skills, resume_skills, rules["final_score"], github)

        results.append({
            "filename": file.filename,
            "decision": decision,
            "final_score": rules["final_score"],
            "rules": rules,
            "github": github,
            "ai": ai
        })

    with open(RESULTS_FILE,"w") as f:
        json.dump(results, f, indent=2)

    return {"results": results}

# ---------------- CSV EXPORT ----------------
@app.route("/api/export", methods=["GET"])
def export_csv():
    if not os.path.exists(RESULTS_FILE):
        return jsonify({"error": "No results file found"}), 400

    with open(RESULTS_FILE) as f:
        results = json.load(f)

    if not results:
        return jsonify({"error": "Results are empty"}), 400

    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".csv")

    with open(tmp.name, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([
            "filename",
            "decision",
            "final_score",
            "mandatory_status",
            "mandatory_evidence",
            "github",
            "ai_strengths",
            "ai_red_flags"
        ])

        for r in results:
            writer.writerow([
                r["filename"],
                r["decision"],
                r["final_score"],
                r["rules"]["mandatory_skills"]["status"],
                r["rules"]["mandatory_skills"]["evidence"],
                r["github"] or "N/A",
                "; ".join(r["ai"]["strengths"]),
                "; ".join(r["ai"]["red_flags"])
            ])

    return send_file(
        tmp.name,
        as_attachment=True,
        download_name="resume_screening_results.csv",
        mimetype="text/csv"
    )
# ---------------- HUMAN DECISION OVERRIDE ----------------
@app.route("/api/decision/<int:index>", methods=["POST"])
def api_update_decision(index):
    if not os.path.exists(RESULTS_FILE):
        return jsonify({"error": "Results not found"}), 400

    with open(RESULTS_FILE) as f:
        results = json.load(f)

    if index < 0 or index >= len(results):
        return jsonify({"error": "Invalid candidate index"}), 400

    data = request.json
    decision = data.get("decision")

    if decision not in ["Shortlisted", "Rejected"]:
        return jsonify({"error": "Invalid decision"}), 400

    # ✅ ONLY override decision (score + rules unchanged)
    results[index]["decision"] = decision

    with open(RESULTS_FILE, "w") as f:
        json.dump(results, f, indent=2)

    return jsonify({"success": True, "decision": decision})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
