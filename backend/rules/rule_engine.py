def evaluate(jd_skills, resume_skills):
    match = set(jd_skills) & set(resume_skills)
    score = int(len(match) / max(len(jd_skills), 1) * 100)
    return score, list(match)
