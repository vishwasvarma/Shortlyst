# Shortlyst — JD‑Aware Resume Screening System

A web‑based application that screens resumes against a given Job Description (JD) and automatically classifies candidates as **Shortlisted**, **Review Later**, or **Rejected** based on skill matching and predefined rules.

This project helps recruiters and evaluators quickly identify suitable candidates using **JD‑aware, rule‑based resume analysis** with clear and explainable results.

---

##  Project Overview

Shortlyst allows users to:
- Add a Job Description (text or file)
- Upload multiple resumes
- Analyze resumes against mandatory and preferred skills
- Automatically classify candidates
- View results with scores, strengths, and red flags

The system is designed for:
- Hackathons
- Academic projects
- Resume screening demos
- Learning and experimentation

---

##  Key Features

### Job Description Processing
- Paste JD text or upload JD file
- Extracts relevant skills from the JD
- Identifies mandatory and preferred skills

### Resume Analysis
- Upload multiple resumes (PDF / DOCX)
- Optional GitHub or portfolio links
- Skill matching against the JD
- Mandatory skill enforcement

### Decision Classification
- **Shortlisted**
- **Review Later**
- **Rejected**
- Deterministic, rule‑based decisions

### Results & Dashboard
- Resume match score
- Strengths and missing skills
- Dashboard summary
- Results persist during navigation

### User Interface
- Clean and responsive UI
- Step‑by‑step workflow
- Clear empty states
- No‑results handling

---

##  How the System Works

1. User adds a Job Description  
2. System extracts required skills  
3. User uploads resumes  
4. Resumes are parsed and analyzed  
5. Skills are matched against the JD  
6. Scores are calculated  
7. Candidates are classified and displayed  

---

##  Technology Stack

### Backend
- Python
- Flask

### Frontend
- React
- JavaScript
- HTML
- CSS

### Analysis
- Skill extraction using keyword + synonym mapping
- Rule‑based scoring and classification

### Version Control
- Git
- GitHub

---

##  Installation and Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- Python 3.9 or higher
- Git

---

## Future Enhancements

- Resume ranking based on overall match score  
- Skill weight customization for different job roles  
- Handling skill negations (e.g., “no React”, “not familiar with SQL”)  
- LLM‑assisted skill extraction and explanation generation  
- Support for additional resume formats  
- User authentication and role‑based access  
- Resume analysis history and analytics dashboard  
- Semantic skill matching for improved accuracy  


