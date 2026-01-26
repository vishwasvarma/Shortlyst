import re

def extract_and_clean_text(text: str) -> str:
    """
    Takes raw text (JD or Resume) and returns cleaned text.
    """

    if not text:
        return ""
    text = text.lower()

    text = text.replace("\n", " ")
    text = text.replace("\t", " ")

    text = re.sub(r"[^a-z0-9+.# ]", " ", text)


    text = re.sub(r"\s+", " ", text)


    return text.strip()
