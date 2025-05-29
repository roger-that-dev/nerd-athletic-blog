from typing import TypedDict
import yaml
from pathlib import Path


class BlogConfig(TypedDict):
    """Type definition for blog configuration."""

    blog_name: str


def load_config() -> BlogConfig:
    """Load the blog configuration from config.yaml.

    Returns:
        BlogConfig: A dictionary containing the blog configuration.

    Raises:
        FileNotFoundError: If config.yaml is not found.
        ValueError: If required fields are missing from the config.
    """
    config_path = Path("config.yaml")
    if not config_path.exists():
        raise FileNotFoundError(
            "config.yaml not found. Please create it with your blog settings."
        )

    with open(config_path, "r") as f:
        config = yaml.safe_load(f)

    # Validate required fields
    if "blog_name" not in config:
        raise ValueError("config.yaml must contain a 'blog_name' field")

    return config
