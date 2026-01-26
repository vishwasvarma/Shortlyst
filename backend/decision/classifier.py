def classify(score):
    if score >= 70: return "Shortlisted"
    if score >= 40: return "Review Later"
    return "Rejected"
