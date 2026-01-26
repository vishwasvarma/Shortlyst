from flask import Flask, render_template, request
from cleaners.cleaner import extract_and_clean_text

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    jd_text = ""
    resume_text = ""

    clean_jd = ""
    clean_resume = ""

    if request.method == "POST":
        jd_text = request.form.get("jd", "")
        resume_text = request.form.get("resume", "")

        clean_jd = extract_and_clean_text(jd_text)
        clean_resume = extract_and_clean_text(resume_text)

    return render_template(
        "index.html",
        clean_jd=clean_jd,
        clean_resume=clean_resume
    )

if __name__ == "__main__":
    app.run(debug=True)
