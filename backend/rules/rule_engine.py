def apply_rules(jd_skills, resume_skills, github_url=None):
    rules = {}

    # -------------------------------------------------
    # NORMALIZE SKILLS (VERY IMPORTANT)
    # -------------------------------------------------
    jd_skills_l = [s.lower().strip() for s in jd_skills]
    resume_skills_l = [s.lower().strip() for s in resume_skills]

    # -------------------------------------------------
    # Mandatory skills rule
    # -------------------------------------------------
    missing = [s for s in jd_skills_l if s not in resume_skills_l]

    if missing:
        rules["mandatory_skills"] = {
            "status": "fail",
            "missing": missing,
            "evidence": f"Missing mandatory skills: {', '.join(missing)}"
        }
    else:
        rules["mandatory_skills"] = {
            "status": "pass",
            "missing": [],
            "evidence": "All mandatory skills present"
        }

    # -------------------------------------------------
    # Skill overlap
    # -------------------------------------------------
    matched = [s for s in resume_skills_l if s in jd_skills_l]

    overlap_score = int(
        (len(matched) / max(len(jd_skills_l), 1)) * 100
    )

    rules["skill_overlap"] = {
        "status": "pass" if overlap_score >= 40 else "fail",
        "score": overlap_score,
        "matched": matched,
        "evidence": f"{len(matched)} out of {len(jd_skills_l)} JD skills matched"
    }

    # -------------------------------------------------
    # GitHub presence rule
    # -------------------------------------------------
    if github_url:
        rules["github"] = {
            "status": "pass",
            "evidence": "GitHub profile provided"
        }
        github_bonus = 10
    else:
        rules["github"] = {
            "status": "not_specified",
            "evidence": "No GitHub profile provided"
        }
        github_bonus = 0

    # -------------------------------------------------
    # Final score calculation
    # -------------------------------------------------
    base_score = overlap_score
    final_score = min(100, base_score + github_bonus)

    # Mandatory skill penalty (score cap)
    if rules["mandatory_skills"]["status"] == "fail":
        final_score = min(final_score, 40)

    rules["final_score"] = final_score

    return rules
