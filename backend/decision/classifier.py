def classify(rules):
    if rules["mandatory_skills"]["status"] == "fail":
        return "Rejected"

    score = rules["final_score"]

    if score >= 75:
        return "Shortlisted"
    elif score >= 50:
        return "Review Later"
    else:
        return "Rejected"
