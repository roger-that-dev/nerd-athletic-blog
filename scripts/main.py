import math
import os
import re
import shutil
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, date
from slugify import slugify
from render_post import render_post
from render_index import render_index
from render_tag_page import render_tag_page
from render_static_page import render_static_page
import frontmatter
from generate_syntax_styles import generate_syntax_styles
from generate_favicon import generate_favicon
from utils import extract_image_filenames
from config import load_config


@dataclass
class Content:
    title: str
    date: datetime
    url: str
    excerpt: str
    source_path: str
    content: str

    @classmethod
    def from_markdown(cls, file_path, meta, content):
        raise NotImplementedError("Subclasses must implement this method")


@dataclass
class Post(Content):
    tags: list
    author: str
    slug: str
    reading_time: str
    image: str
    image_alt: str

    @classmethod
    def from_markdown(cls, file_path, meta, content):
        title = meta.get("title", "Untitled")
        date_val = get_date(meta)
        slug = get_slug(title)

        return cls(
            title=title,
            date=date_val,
            excerpt=meta.get("excerpt", ""),
            source_path=file_path,
            content=content,
            tags=get_tags(meta),
            author=meta.get("author", ""),
            slug=slug,
            reading_time=get_reading_time(content),
            image=get_image(content, file_path),
            image_alt=meta.get("image_alt", ""),
            url=(
                f"/post/{date_val.strftime('%Y')}/"
                f"{date_val.strftime('%m')}/"
                f"{date_val.strftime('%d')}/"
                f"{slug}/"
            ),
        )


@dataclass
class StaticPage(Content):
    @classmethod
    def from_markdown(cls, file_path, meta, content):
        title = meta.get("title", "Untitled")
        date_val = get_date(meta)

        return cls(
            title=title,
            date=date_val,
            excerpt=meta.get("excerpt", ""),
            url=meta.get("url", ""),
            source_path=file_path,
            content=content,
        )


def get_date(meta):
    date_str = meta.get("date")
    if not date_str:
        raise ValueError("Date is required in front matter")
    if isinstance(date_str, datetime):
        return date_str
    elif isinstance(date_str, date):
        return datetime(date_str.year, date_str.month, date_str.day)
    elif isinstance(date_str, str):
        return datetime.strptime(date_str, "%Y-%m-%d")
    else:
        raise ValueError("Unrecognized date format in front matter")


def get_tags(meta):
    tags_val = meta.get("tags", [])
    if not isinstance(tags_val, list):
        raise ValueError("Tags must be a list in front matter")
    return [str(t).strip() for t in tags_val if str(t).strip()]


def get_slug(title):
    return slugify(title)


def get_reading_time(content):
    # Average adult reading speed is 238 words per minute
    # Source:
    # https://www.sciencedirect.com/science/article/abs/pii/S0749596X19300786
    WORDS_PER_MINUTE = 238

    # Count words, excluding common markdown syntax
    words = len(re.findall(r"\w+", content))

    # Round up to nearest minute, minimum 1 minute
    minutes = max(1, math.ceil(words / WORDS_PER_MINUTE))

    return str(minutes)


def get_image(content, post_path):
    """Return the first valid image filename found in the content."""
    post_dir = os.path.dirname(post_path)
    return next(
        (
            img
            for img in extract_image_filenames(content)
            if os.path.exists(os.path.join(post_dir, img))
        ),
        None,
    )


def parse_markdown_file(file_path, content_class):
    post = frontmatter.load(file_path)
    return content_class.from_markdown(file_path, post.metadata, post.content)


def collect_markdown_files(directory, content_class):
    paths = [
        os.path.join(root, file)
        for root, _, files in os.walk(directory)
        for file in files
        if file.endswith(".md")
    ]
    contents = [parse_markdown_file(path, content_class) for path in paths]
    contents.sort(key=lambda c: c.date, reverse=True)
    return contents


def copy_static_assets(*asset_dirs):
    for asset_dir in asset_dirs:
        src = os.path.join(os.getcwd(), asset_dir)
        dst = os.path.join("web", asset_dir)
        if os.path.exists(src):
            shutil.copytree(src, dst, dirs_exist_ok=True)
            print(f"Copied {asset_dir} to {dst}")
        else:
            print(f"WARNING: {asset_dir} directory not found in project root.")


def build_tag_mapping(posts):
    tags_to_posts = defaultdict(list)
    for post in posts:
        for tag in post.tags:
            tags_to_posts[tag].append(post)
    return dict(tags_to_posts)


def main():
    # Load blog configuration
    config = load_config()

    generate_syntax_styles()

    # Copy static assets
    copy_static_assets("css", "js")

    # Collect and render posts
    posts = collect_markdown_files("posts", Post)
    for post in posts:
        render_post(post, "templates/post.tmpl", web_root="web", config=config)

    # Render index
    render_index(
        posts,
        "templates/index.tmpl",
        output_path="web/index.html",
        config=config,
    )

    # Render tag pages
    tags_to_posts = build_tag_mapping(posts)
    for tag, tag_posts in tags_to_posts.items():
        render_tag_page(
            tag,
            tag_posts,
            "templates/tag.tmpl",
            output_path=f"web/tag/{slugify(tag)}/index.html",
            config=config,
        )

    # Collect and render static pages
    static_pages = collect_markdown_files("static", StaticPage)
    for page in static_pages:
        render_static_page(
            page, "templates/static.tmpl", web_root="web", config=config
        )

    generate_favicon("ABC")


if __name__ == "__main__":
    main()
