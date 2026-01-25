# Shortlyst
Shortlyst JD-based resume screening web app that combines simple rules and AI insights to help shortlist candidates more fairly and efficiently.
Shortlyst is a web app that helps screen resumes based on a specific Job Description (JD).

Most resume screening tools use the same rules for every role, which often leads to bad shortlists or unfair rejections. Shortlyst fixes this by checking each resume only against what the job actually needs.

The app lets a user upload a Job Description and candidate resumes. It reads the text, finds the important skills mentioned in the JD, and compares them with the skills found in each resume. Basic rules are applied first, such as checking for required skills, overall skill match, education details, and whether the candidate has a GitHub or portfolio link.

To go beyond simple matching, Shortlyst also uses AI to explain the fit. The AI looks at the resume in the context of the JD and points out strengths, missing areas, and projects that are relevant to the job. The AI is used to give helpful insights, not to make the final decision.

Based on these checks, each candidate is marked as:

Shortlisted – good match for the role

Rejected – clear mismatch

Review Later – partial or unclear match

Only the “Review Later” profiles need human review, which saves time and effort.

Shortlyst is built using Python and Streamlit and focuses on being clear, fair, and easy to understand. The goal is to make resume screening smarter while still keeping humans in control.
