from pygments.formatters import HtmlFormatter


def generate_syntax_styles():
    """Generate CSS styles for syntax highlighting using Pygments."""
    # Generate CSS using the default style
    # codehilite uses .codehilite class instead of .highlight
    formatter = HtmlFormatter(style="default", cssclass="codehilite")
    css = formatter.get_style_defs()

    # Write CSS to file
    with open("css/syntax.css", "w") as f:
        f.write(css)


if __name__ == "__main__":
    generate_syntax_styles()
