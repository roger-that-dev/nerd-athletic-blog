from PIL import Image, ImageDraw, ImageFont
import os


def generate_favicon(initials: str) -> None:
    """Generate a favicon with the given initials.

    Args:
        initials: A string containing the initials to display in the favicon.
                 Only the first two characters will be used and converted to
                 uppercase.

    Returns:
        None: The function saves the favicon file but doesn't return anything.
    """
    # Create a 32x32 image with a blue background
    size = 32
    img = Image.new("RGBA", (size, size), (0, 120, 255, 255))
    draw = ImageDraw.Draw(img)

    # Try to load Silkscreen font, fall back to default if not available
    try:
        font = ImageFont.truetype("Silkscreen-Regular.ttf", 20)
    except OSError:
        # Fallback to default font
        font = ImageFont.load_default()

    # Takes first two letters of initials only
    text = initials[:2].upper()
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]

    # Center the text
    x = (size - text_width) // 2
    y = (size - text_height) // 2

    # Draw the text
    draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)

    # Create static directory if it doesn't exist
    os.makedirs("static", exist_ok=True)

    # Save as ICO file
    img.save("web/favicon.ico", format="ICO")
    print("Favicon generated successfully!")


if __name__ == "__main__":
    generate_favicon("AB")
