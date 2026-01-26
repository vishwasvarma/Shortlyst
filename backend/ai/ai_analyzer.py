"""
AI Analyzer module

Purpose:
- Provide explainable insights about resume vs JD match
- NOT make the final decision
- Help humans understand WHY a candidate was shortlisted/rejected
"""

def analyze_resume(jd_skills, resume_skills, score):
    """
    Returns human-readable insights based on matching.
    """

    strengths = list(set(jd_skills) & set(resume_skills))
    gaps = list(set(jd_skills) - set(resume_skills))

    explanation = {}

    if score >= 70:
        explanation["summary"] = (
            "The candidate is a strong match for the role. "
            "Most of the required skills mentioned in the job description are present in the resume."
        )
    elif score >= 40:
        explanation["summary"] = (
            "The candidate partially matches the role. "
            "Some important skills are present, but there are gaps that need review."
        )
    else:
        explanation["summary"] = (
            "The candidate does not sufficiently match the job requirements. "
            "Several key skills from the job description are missing."
        )

    explanation["strengths"] = strengths
    explanation["missing_skills"] = gaps

    return explanation
