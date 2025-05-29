import os
import shutil
import markdown
from jinja2 import Environment, FileSystemLoader
from slugify import slugify
from inline_footnotes_plugin import InlineFootnotesExtension
from utils import format_date, extract_image_filenames


def slugify_title(title):
    return slugify(title)


def render_post(post, post_template_path, web_root="web"):
    """Render a single Post object to HTML using a Jinja2 template."""
    post_dir = os.path.dirname(post.source_path)

    # Remove leading slash and trailing slash from URL
    url_path = post.url.strip("/")
    out_dir = os.path.join(web_root, url_path)
    os.makedirs(out_dir, exist_ok=True)

    # Create index.html file
    out_path = os.path.join(out_dir, "index.html")

    # Handle images:
    # Extract image filenames, copy them to output, warn if missing.
    for img_name in extract_image_filenames(post.content):
        img_path = os.path.join(post_dir, img_name)
        out_img_path = os.path.join(out_dir, os.path.basename(img_name))
        if os.path.exists(img_path):
            shutil.copy2(img_path, out_img_path)
        else:
            print(
                f"WARNING: Image '{img_name}' not \
                    found for post '{post.source_path}'"
            )

    # Convert markdown to HTML with code highlighting and custom side notes.
    md = markdown.Markdown(
        extensions=[
            "extra",
            "codehilite",
            "fenced_code",
            InlineFootnotesExtension(),
            "markdown_captions",
        ]
    )

    # Convert markdown to HTML. Print error and reraise.
    try:
        html_content = md.convert(post.content)
    except Exception as e:
        print(f"ERROR: Error during markdown conversion: {str(e)}")
        raise

    # Set up Jinja2 environment and render template
    env = Environment(
        loader=FileSystemLoader(os.path.dirname(post_template_path))
    )
    env.filters["slugify"] = slugify
    env.filters["format_date"] = format_date
    template = env.get_template(os.path.basename(post_template_path))
    html = template.render(
        title=post.title,
        date=post.date,
        author=post.author,
        excerpt=post.excerpt,
        tags=post.tags,
        content=html_content,
        reading_time=post.reading_time,
    )

    # Write output HTML
    try:
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)
    except IOError as e:
        print(f"ERROR: Failed to write output file {out_path}: {str(e)}")
        raise

    print(f"Successfully rendered {post.source_path} -> {out_path}")
