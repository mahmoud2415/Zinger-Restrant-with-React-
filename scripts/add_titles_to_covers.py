import os
from PIL import Image, ImageDraw, ImageFont

COVERS_DIR = "/home/mahmoud2415/Documents/work/Zinger-Restrant-with-React/public/covers"
BACKUP_DIR = "/home/mahmoud2415/Documents/work/Zinger-Restrant-with-React/public/covers_raw"

os.makedirs(BACKUP_DIR, exist_ok=True)

CATEGORIES = [
    ("burgers.jpeg", "برجر لحم"),
    ("crispy_chicken.jpeg", "ساندوتشات كرانشي"),
    ("crepes.jpeg", "كريب زينجر"),
    ("pizza.jpeg", "بيتزا إيطالي"),
    ("pasta.jpeg", "طواجن باستا"),
    ("rolls.jpeg", "وتش رول"),
    ("hawawshi.jpeg", "حواوشي إيطالي"),
    ("melted_cheese.jpeg", "غرقانة جبنة"),
    ("extras.jpeg", "الإضافات والصوصات"),
]

FONT_PATH = "/usr/share/fonts/truetype/noto/NotoKufiArabic-Bold.ttf"

def process_cover(filename, title):
    backup_path = os.path.join(BACKUP_DIR, filename)
    img_path = os.path.join(COVERS_DIR, filename)
    if not os.path.exists(backup_path):
        if os.path.exists(img_path):
            img_raw = Image.open(img_path)
            img_raw.save(backup_path)
        else:
            print(f"Skipping {filename}, not found.")
            return

    img = Image.open(backup_path).convert("RGBA")
    W, H = img.size

    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Larger, bolder font size (approx 8.5% of image height)
    font_size = max(52, int(H * 0.088))
    font = ImageFont.truetype(FONT_PATH, font_size)

    bbox = draw.textbbox((0, 0), title, font=font, direction="rtl", language="ar")
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]

    pos_x = (W - text_w) // 2
    pos_y = int(H * 0.075)

    # Multi-layer soft drop shadow
    shadow_color = (0, 0, 0, 160)
    for offset_x, offset_y in [(0, 4), (0, 6), (2, 5), (-2, 5)]:
        draw.text(
            (pos_x + offset_x, pos_y + offset_y),
            title,
            font=font,
            fill=shadow_color,
            direction="rtl",
            language="ar",
            stroke_width=max(2, int(font_size * 0.04)),
            stroke_fill=(0, 0, 0, 120),
        )

    # Main text with crisp dark outline for maximum pop
    stroke_w = max(3, int(font_size * 0.045))
    draw.text(
        (pos_x, pos_y),
        title,
        font=font,
        fill=(255, 255, 255, 255),
        direction="rtl",
        language="ar",
        stroke_width=stroke_w,
        stroke_fill=(20, 15, 5, 230),
    )

    final_img = Image.alpha_composite(img, overlay).convert("RGB")
    final_img.save(img_path, quality=96)
    print(f"Updated {filename} -> '{title}'")

if __name__ == "__main__":
    for filename, title in CATEGORIES:
        process_cover(filename, title)
