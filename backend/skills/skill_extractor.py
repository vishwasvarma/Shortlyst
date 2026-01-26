import json

def load_skills():
    with open("skills/skill_ontology.json") as f:
        return json.load(f)

def extract_skills(text, ontology):
    return [s for s, keys in ontology.items() if any(k in text for k in keys)]
