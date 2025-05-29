"""A Markdown extension for handling inline footnotes with sidenotes.

This module provides a custom Markdown extension that converts footnotes into
inline sidenotes. It supports both desktop and mobile layouts, with footnotes
appearing as sidenotes on desktop and inline notes on mobile.

Example usage:
    ```markdown
    Here's a sentence with a footnote[^1].

    [^1]: This is the footnote text.
    ```

    Will be rendered as:
    - Desktop: Footnote appears as a sidenote
    - Mobile: Footnote appears inline after the reference
"""

from typing import Dict, List, Match, Any
import re
from markdown.extensions import Extension
from markdown.inlinepatterns import Pattern
from markdown.preprocessors import Preprocessor
import xml.etree.ElementTree as etree


class FootnoteCollector(Preprocessor):
    """Collects and processes footnotes from the markdown text.

    This preprocessor:
    1. Collects all footnotes defined in the text
    2. Removes the footnotes section
    3. Removes horizontal rules at the end
    4. Removes individual footnote definitions
    """

    def __init__(self, extension: "InlineFootnotesExtension") -> None:
        """Initialize the footnote collector.

        Args:
            extension: The parent extension instance that holds the footnotes
                      dictionary.
        """
        self.extension = extension

    def run(self, text: str | List[str]) -> List[str]:
        """Process the markdown text to collect and remove footnotes.

        Args:
            text: The markdown text to process, either as a string or list of
                 lines.

        Returns:
            List[str]: The processed text with footnotes removed, split into
                      lines.
        """
        if isinstance(text, list):
            text = "\n".join(text)

        # 1. Collect all footnotes
        footnote_pattern = r"\[\^(\d+)\]:\s*(.*?)(?=\n\[\^|\Z)"
        for match in re.finditer(footnote_pattern, text, re.DOTALL):
            footnote_id = match.group(1)
            footnote_text = match.group(2).strip()
            self.extension.footnotes[footnote_id] = footnote_text

        # 2. Remove the footnotes section (## Footnotes and everything after)
        text = re.sub(r"\n## Footnotes.*$", "", text, flags=re.DOTALL)

        # 3. Remove a horizontal rule and whitespace at the end
        # (must be last non-whitespace)
        text = re.sub(r"(\n\s*)*(\n(-{3,}|\*{3,}|_{3,})\s*)+\Z", "", text)

        # 4. Remove individual footnote definitions
        text = re.sub(
            r"\n\[\^\d+\]:.*?(?=\n\[\^|\Z)", "", text, flags=re.DOTALL
        )

        return text.split("\n")


class InlineFootnotesPattern(Pattern):
    """Pattern for matching and converting footnote references to HTML."""

    def __init__(
        self, pattern: str, extension: "InlineFootnotesExtension"
    ) -> None:
        """Initialize the footnote pattern matcher.

        Args:
            pattern: The regex pattern to match footnote references.
            extension: The parent extension instance.
        """
        super().__init__(pattern)
        self.extension = extension

    def handleMatch(self, m: Match[str]) -> etree.Element:
        """Convert a footnote reference to HTML elements.

        Args:
            m: The regex match object containing the footnote reference.

        Returns:
            etree.Element: A span element containing the footnote reference
                          and its associated sidenote.
        """
        footnote_id = m.group(2)
        footnote_text = self.extension.footnotes.get(footnote_id, "")

        sup = etree.Element(
            "sup", {"class": "sidenote-ref", "data-note": footnote_id}
        )
        sup.text = footnote_id

        sidenote = etree.Element("span", {"class": "sidenote"})
        sidenote_num = etree.SubElement(
            sidenote, "span", {"class": "sidenote-num"}
        )
        sidenote_num.text = footnote_id
        sidenote_num.tail = footnote_text

        mobile = etree.Element("span", {"class": "mobile-note"})
        mobile.text = footnote_text

        group = etree.Element("span")
        group.append(sup)
        group.append(sidenote)
        group.append(mobile)

        return group


class InlineFootnotesExtension(Extension):
    """Markdown extension for handling inline footnotes with sidenotes."""

    def __init__(self, **kwargs: Any) -> None:
        """Initialize the extension.

        Args:
            **kwargs: Additional keyword arguments passed to the parent class.
        """
        super().__init__(**kwargs)
        self.footnotes: Dict[str, str] = {}

    def extendMarkdown(self, md: Any) -> None:
        """Register the extension's processors with the markdown instance.

        Args:
            md: The markdown instance to extend.
        """
        md.preprocessors.register(
            FootnoteCollector(self), "footnote_collector", 25
        )
        ref_pattern = r"\[\^(\d+)\]"
        md.inlinePatterns.register(
            InlineFootnotesPattern(ref_pattern, self), "footnote", 175
        )
