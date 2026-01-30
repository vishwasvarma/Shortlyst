def classify(rules):
    if rules["mandatory_skills"]["status"] == "fail":
        return "Rejected"

    score = rules["final_score"]

    if score >= 95:
        return "Shortlisted"
    elif score >= 80:
        return "Review Later"
    else:
        return "Rejected"
