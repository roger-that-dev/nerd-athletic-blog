#!/usr/bin/env python3
import os
import sys
from datetime import datetime
from slugify import slugify
import argparse


def create_post_skeleton(post_name, author="Roger Willis"):
    """Create a new post skeleton with the given name and author."""
    # Create slug from post name
    slug = slugify(post_name)
    post_dir = os.path.join("posts", slug)

    # Check if directory already exists
    if os.path.exists(post_dir):
        print(f"Error: Post directory '{post_dir}' already exists")
        sys.exit(1)

    # Create post directory
    os.makedirs(post_dir)

    # Create post file with frontmatter
    post_file = os.path.join(post_dir, f"{slug}.md")
    today = datetime.now().strftime("%Y-%m-%d")

    frontmatter = f"""---
date: {today}
author: {author}
tags: []
title: {post_name}
excerpt:
---

"""
    with open(post_file, "w", encoding="utf-8") as f:
        f.write(frontmatter)

    print(f"Created new post skeleton at {post_file}")


def main():
    parser = argparse.ArgumentParser(description="Create a new post skeleton")
    parser.add_argument("post_name", help="Name of the post")
    parser.add_argument(
        "--author",
        default="Roger Willis",
        help="Author of the post (default: Roger Willis)",
    )

    args = parser.parse_args()
    create_post_skeleton(args.post_name, args.author)


if __name__ == "__main__":
    main()
