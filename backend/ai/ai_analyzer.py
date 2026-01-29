def analyze_resume(jd_skills, resume_skills, score, github_url=None):
    strengths = []
    red_flags = []
    jd_mapped_projects = []

    for skill in jd_skills:
        if skill in resume_skills:
            strengths.append(f"Strong alignment in {skill} as required by the JD")
        else:
            red_flags.append(f"Missing {skill} which is required in the JD")

    if github_url:
        strengths.append("GitHub profile provided, indicating proof of work")
        jd_mapped_projects.append(
            "Public repositories can be reviewed for JD‑relevant projects"
        )
    else:
        red_flags.append("No GitHub/portfolio link provided for skill validation")

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
