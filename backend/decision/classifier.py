"""
Classifier logic for candidate decision.

Rules enforced:
1. If ANY mandatory skill is missing → Rejected (hard rule)
2. Only if all mandatory skills are present:
   - score >= 95 → Shortlisted
   - score >= 80 → Review Later
   - else → Rejected
"""

def classify(rules):
    """
    Parameters:
    rules (dict): {
        "mandatory_skills": {
            "status": "pass" | "fail",
            "missing": [list of missing skills]
        },
        "final_score": int or float
    }

    Returns:
    str: "Shortlisted" | "Review Later" | "Rejected"
    """

    if rules.get("mandatory_skills", {}).get("status") == "fail":
        return "Rejected"

    score = rules.get("final_score", 0)

    if score >= 95:
        return "Shortlisted"
    elif score >= 80:
        return "Review Later"
    else:
        return "Rejected"
