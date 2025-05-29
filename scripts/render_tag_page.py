import os
from jinja2 import Environment, FileSystemLoader
from slugify import slugify
from utils import format_date


def render_tag_page(tag, posts, template_path, output_path):
    """Render a tag page listing all posts with that tag."""
    env = Environment(loader=FileSystemLoader(os.path.dirname(template_path)))
    env.filters["slugify"] = slugify
    env.filters["format_date"] = format_date

    # Transform posts into template-friendly format
    posts_for_template = [
        {
            **post.__dict__,
            "image_url": (
                f"{post.url.rstrip('/')}/{post.image}" if post.image else None
            ),
        }
        for post in posts
    ]

    # Render template and write output
    template = env.get_template(os.path.basename(template_path))
    try:
        html = template.render(posts=posts_for_template, tag=tag)
    except Exception as e:
        raise RuntimeError(f"Failed to render tag template: {str(e)}")

    try:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(html)
    except IOError as e:
        raise RuntimeError(
            f"Failed to write tag page to {output_path}: {str(e)}"
        )

    print(f"Rendered tag page for '{tag}' to {output_path}")


if __name__ == "__main__":
    # Example usage: import collect_posts from main and call render_tag_page
    from main import collect_markdown_files, Post

    posts = collect_markdown_files("posts", Post)
    tag = "running"
    tag_posts = [p for p in posts if tag in p.tags]
    render_tag_page(
        tag,
        tag_posts,
        "templates/tag.tmpl",
        f"web/tag/{slugify(tag)}/index.html",
    )
