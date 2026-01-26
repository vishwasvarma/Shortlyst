
import re

def clean_text(text: str) -> str:
    if not text:
        return ""
    #lowercases the text
    text = text.lower()

    # replace the new line and tabs with space
    text = text.replace("\n", " ").replace("\t", " ")

    #remove the syombols
    text = re.sub(r"[^a-z0-9+.# ]", " ", text)


    text = re.sub(r"\s+", " ", text)

    return text.strip()
