import os
import shutil
import markdown
from jinja2 import Environment, FileSystemLoader
from utils import format_date
from config import BlogConfig


def render_static_page(
    page, template_path, web_root="web", config: BlogConfig = None
):
    """Render a single static page to HTML using a Jinja2 template."""
    page_dir = os.path.dirname(page.source_path)

    # Remove leading slash and trailing slash from URL
    url_path = page.url.strip("/")
    out_dir = os.path.join(web_root, url_path)
    os.makedirs(out_dir, exist_ok=True)

    # Create index.html file
    out_path = os.path.join(out_dir, "index.html")

    # Copy all files from post directory to output directory,
    # except markdown files. We can embed any type of file, e.g.
    # non-image content / misc files we want to serve via the website.
    for file in os.listdir(page_dir):
        if not file.endswith(".md"):
            src_path = os.path.join(page_dir, file)
            dst_path = os.path.join(out_dir, file)
            if os.path.isfile(src_path):
                shutil.copy2(src_path, dst_path)

    # Convert markdown to HTML
    md = markdown.Markdown(
        extensions=[
            "extra",
        ]
    )

    # Convert markdown to HTML. Print error and reraise.
    try:
        html_content = md.convert(page.content)
    except Exception as e:
        print(f"ERROR: Error during markdown conversion: {str(e)}")
        raise

    # Set up Jinja2 environment and render template
    env = Environment(loader=FileSystemLoader(os.path.dirname(template_path)))
    env.filters["format_date"] = format_date
    template = env.get_template(os.path.basename(template_path))
    html = template.render(
        title=page.title,
        date=page.date,
        excerpt=page.excerpt,
        content=html_content,
        blog_name=config["blog_name"],
    )

    # Write output HTML
    try:
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)
    except IOError as e:
        print(f"ERROR: Failed to write output file {out_path}: {str(e)}")
        raise

    print(f"Successfully rendered {page.source_path} -> {out_path}")
