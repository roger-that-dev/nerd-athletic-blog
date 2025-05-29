import os
from jinja2 import Environment, FileSystemLoader
from config import BlogConfig
from utils import format_date


def render_index(posts, template_path, output_path, config: BlogConfig = None):
    env = Environment(loader=FileSystemLoader(os.path.dirname(template_path)))
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
        html = template.render(
            posts=posts_for_template, blog_name=config["blog_name"]
        )
    except Exception as e:
        raise RuntimeError(f"Failed to render index template: {str(e)}")

    try:
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(html)
    except IOError as e:
        raise RuntimeError(
            f"Failed to write index file to {output_path}: {str(e)}"
        )

    print(f"Rendered index page to {output_path}")


if __name__ == "__main__":
    # Example usage: import collect_posts from main and call render_index
    from main import collect_posts

    posts = collect_posts("posts")
    render_index(posts, "templates/index.tmpl", "web/index.html")
