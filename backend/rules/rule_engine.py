def apply_rules(jd_skills, resume_skills, github_link=None, education=None):
    rules = {}

    # -----------------------
    # Rule 1: Mandatory skills
    # -----------------------
    missing_mandatory = [s for s in jd_skills if s not in resume_skills]

    rules["mandatory_skills"] = {
        "status": "pass" if not missing_mandatory else "fail",
        "missing": missing_mandatory,
        "evidence": (
            "All mandatory skills present"
            if not missing_mandatory
            else f"Missing mandatory skills: {', '.join(missing_mandatory)}"
        )
    }

    # -----------------------
    # Rule 2: Skill overlap
    # -----------------------
    matched = list(set(jd_skills) & set(resume_skills))
    overlap_score = int((len(matched) / len(jd_skills)) * 100) if jd_skills else 0

    rules["skill_overlap"] = {
        "status": "pass" if overlap_score >= 60 else "fail",
        "score": overlap_score,
        "matched": matched,
        "evidence": f"{len(matched)} out of {len(jd_skills)} JD skills matched"
    }

    # -----------------------
    # Rule 3: GitHub presence
    # -----------------------
    rules["github"] = {
        "status": "pass" if github_link else "not_specified",
        "evidence": "GitHub link provided" if github_link else "No GitHub link provided"
    }

    # -----------------------
    # Rule 4: Education
    # -----------------------
    rules["education"] = {
        "status": "not_specified",
        "evidence": "Education requirement not enforced"
    }

    # -----------------------
    # Final score (weighted)
    # -----------------------
    final_score = overlap_score
    if rules["mandatory_skills"]["status"] == "fail":
        final_score = min(final_score, 40)

    rules["final_score"] = final_score

    return rules
