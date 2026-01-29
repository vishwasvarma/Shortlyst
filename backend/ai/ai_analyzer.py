def analyze_resume(jd_skills, resume_skills, score):
    strengths = []
    red_flags = []
    jd_mapped_projects = []

    # Strengths (JD‑aligned)
    for skill in jd_skills:
        if skill in resume_skills:
            strengths.append(f"Strong alignment in {skill} as required by JD")

    # Red flags (JD‑missing)
    for skill in jd_skills:
        if skill not in resume_skills:
            red_flags.append(f"Missing {skill} which is required in the JD")

    # JD‑mapped projects (heuristic for now)
    for skill in resume_skills:
        if skill in jd_skills:
            jd_mapped_projects.append(
                f"Candidate experience involving {skill} aligns with JD requirement"
            )

    # Fallbacks (important)
    if not strengths:
        strengths.append("Limited alignment with JD requirements")

    if not red_flags:
        red_flags.append("No major red flags relative to JD")

    return {
        "strengths": strengths,
        "red_flags": red_flags,
        "jd_mapped_projects": jd_mapped_projects,
        "summary": f"Overall JD match score is {score}%"
    }
