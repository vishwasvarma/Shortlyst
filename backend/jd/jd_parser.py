def parse_jd(jd_text, skill_ontology):
    text = jd_text.lower()

    required_keywords = ["must", "required", "mandatory"]
    preferred_keywords = ["preferred", "good to have", "optional"]

    required_skills = set()
    preferred_skills = set()
    role_keywords = set()

    for skill in skill_ontology:
        skill_l = skill.lower()

        if skill_l in text:
            # Check nearby context
            for word in required_keywords:
                if word in text:
                    required_skills.add(skill_l)

            for word in preferred_keywords:
                if word in text:
                    preferred_skills.add(skill_l)

            # Default fallback
            if skill_l not in required_skills and skill_l not in preferred_skills:
                preferred_skills.add(skill_l)

    # Role keyword detection (simple & safe)
    role_map = {
        "machine learning": "ML",
        "deep learning": "ML",
        "backend": "Backend",
        "flask": "Backend",
        "django": "Backend",
        "react": "Web",
        "frontend": "Web",
        "computer vision": "CV"
    }

    for k, v in role_map.items():
        if k in text:
            role_keywords.add(v)

    return {
        "required_skills": list(required_skills),
        "preferred_skills": list(preferred_skills - required_skills),
        "role_keywords": list(role_keywords)
    }
