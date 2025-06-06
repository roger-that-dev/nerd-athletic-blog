import os
import shutil
import markdown
from jinja2 import Environment, FileSystemLoader
from slugify import slugify
from inline_footnotes_plugin import InlineFootnotesExtension
from l2m4m import LaTeX2MathMLExtension
from config import BlogConfig
from mdx_emdash import EmDashExtension
from utils import format_date, extract_image_filenames, extract_script_filenames


def slugify_title(title):
    return slugify(title)


def copy_asset(asset_name, post_dir, out_dir, post_path, asset_type="Image"):
    """Copy an asset file from source to destination directory.

    Args:
        asset_name: Name of the asset file
        post_dir: Source directory containing the asset
        out_dir: Destination directory for the asset
        post_path: Path to the post file (for error messages)
        asset_type: Type of asset (for error messages)
    """
    asset_path = os.path.join(post_dir, asset_name)
    out_asset_path = os.path.join(out_dir, os.path.basename(asset_name))
    if os.path.exists(asset_path):
        shutil.copy2(asset_path, out_asset_path)
    else:
        print(
            f"WARNING: {asset_type} '{asset_name}' not \
                found for post '{post_path}'"
        )


def render_post(
    post, post_template_path, web_root="web", config: BlogConfig = None
):
    """Render a single Post object to HTML using a Jinja2 template."""
    post_dir = os.path.dirname(post.source_path)

    # Remove leading slash and trailing slash from URL
    url_path = post.url.strip("/")
    out_dir = os.path.join(web_root, url_path)
    os.makedirs(out_dir, exist_ok=True)

    # Create index.html file
    out_path = os.path.join(out_dir, "index.html")

    # Handle front matter image if it exists
    if post.image:
        copy_asset(
            post.image,
            post_dir,
            out_dir,
            post.source_path,
            "Front matter image",
        )

    # Handle images in content:
    for img_name in extract_image_filenames(post.content):
        copy_asset(img_name, post_dir, out_dir, post.source_path, "Image")

    # Handle JavaScript files:
    for script_name in extract_script_filenames(post.content):
        copy_asset(script_name, post_dir, out_dir, post.source_path, "Script")

    # Convert markdown to HTML with code highlighting and custom side notes.
    md = markdown.Markdown(
        extensions=[
            "extra",
            "codehilite",
            "fenced_code",
            InlineFootnotesExtension(),
            "markdown_captions",
            LaTeX2MathMLExtension(),
            EmDashExtension(),
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
        blog_name=config["blog_name"],
    )

    # Write output HTML
    try:
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)
    except IOError as e:
        print(f"ERROR: Failed to write output file {out_path}: {str(e)}")
        raise

    print(f"Successfully rendered {post.source_path} -> {out_path}")
