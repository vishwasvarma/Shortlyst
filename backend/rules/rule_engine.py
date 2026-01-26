def apply_rules(jd_skills, resume_skills):
    matched = list(set(jd_skills) & set(resume_skills))
    missing = list(set(jd_skills) - set(resume_skills))
    score = int(len(matched) / max(len(jd_skills), 1) * 100)
    return {"matched": matched, "missing": missing, "score": score}
