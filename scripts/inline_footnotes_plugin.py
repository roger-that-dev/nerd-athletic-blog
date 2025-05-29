import re
from markdown.extensions import Extension
from markdown.inlinepatterns import Pattern
from markdown.preprocessors import Preprocessor
import xml.etree.ElementTree as etree


class FootnoteCollector(Preprocessor):
    def __init__(self, extension):
        self.extension = extension

    def run(self, text):
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
    def __init__(self, pattern, extension):
        super().__init__(pattern)
        self.extension = extension

    def handleMatch(self, m):
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
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.footnotes = {}

    def extendMarkdown(self, md):
        md.preprocessors.register(
            FootnoteCollector(self), "footnote_collector", 25
        )
        ref_pattern = r"\[\^(\d+)\]"
        md.inlinePatterns.register(
            InlineFootnotesPattern(ref_pattern, self), "footnote", 175
        )
