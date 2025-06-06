"""Utility functions for the blog generator.

This module provides helper functions for date formatting and image extraction
from markdown content.
"""

from datetime import date, datetime
from typing import List, Union
import re


def format_date(value: Union[date, datetime, str]) -> str:
    """Format a date or datetime object into a human-readable string.

    Args:
        value: A date, datetime, or string to format. If it's a date or
               datetime, it will be formatted as "Day Month, Year" (e.g.,
               "1 January, 2024"). If it's a string, it will be returned
               as is.

    Returns:
        str: The formatted date string.
    """
    if isinstance(value, (date, datetime)):
        return value.strftime("%-d %B, %Y")
    return str(value)


def extract_image_filenames(md_content: str) -> List[str]:
    """Extract all local image filenames from markdown image tags.

    This function finds all image references in markdown content and returns
    only those that reference local files (not URLs).

    Args:
        md_content: The markdown content to search for images.

    Returns:
        List[str]: A list of local image filenames found in the markdown.
                  URLs (starting with http/https) are excluded.

    Example:
        >>> content = '![alt](image.jpg "caption") ![alt](https://example.com/'
        ... 'image.png)'
        >>> extract_image_filenames(content)
        ['image.jpg']
    """
    # Matches ![alt](filename) or ![alt](filename "caption")
    pattern = r'!\[[^\]]*\]\(([^)"\s]+)(?:\s+"[^"]*")?\)'
    matches = re.findall(pattern, md_content)

    # Only return local images (not http/https)
    return [
        m
        for m in matches
        if not m.startswith("http") and not m.startswith("https")
    ]


def extract_script_filenames(md_content: str) -> List[str]:
    """Extract all local JavaScript filenames from script tags in markdown content.

    This function finds all script references in markdown content and returns
    only those that reference local files (not URLs).

    Args:
        md_content: The markdown content to search for script tags.

    Returns:
        List[str]: A list of local JavaScript filenames found in the markdown.
                  URLs (starting with http/https) are excluded.

    Example:
        >>> content = '<script src="script.js"></script> <script src="https://example.com/script.js"></script>'
        >>> extract_script_filenames(content)
        ['script.js']
    """
    # Matches <script src="filename.js"></script>
    pattern = r'<script\s+src="([^"]+)"[^>]*></script>'
    matches = re.findall(pattern, md_content)

    # Only return local scripts (not http/https)
    return [
        m
        for m in matches
        if not m.startswith("http") and not m.startswith("https")
    ]
