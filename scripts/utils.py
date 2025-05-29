from datetime import date, datetime
import re


def format_date(value):
    if isinstance(value, (date, datetime)):
        return value.strftime("%-d %B, %Y")
    return str(value)


def extract_image_filenames(md_content):
    """Extract all image filenames from markdown image tags."""

    # Matches ![alt](filename) or ![alt](filename "caption")
    pattern = r'!\[[^\]]*\]\(([^)"\s]+)(?:\s+"[^"]*")?\)'
    matches = re.findall(pattern, md_content)

    # Only return local images (not http/https)
    return [
        m
        for m in matches
        if not m.startswith("http") and not m.startswith("https")
    ]
