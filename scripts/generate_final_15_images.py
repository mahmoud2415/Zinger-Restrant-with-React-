import os
import re
from PIL import Image, ImageDraw, ImageFont

FONT_PATH = "/usr/share/fonts/truetype/noto/NotoKufiArabic-Bold.ttf"
MENU_FILE = "/home/mahmoud2415/Documents/work/Zinger-Restrant-with-React/src/data/initialMenu.ts"

EXTRAS_CONFIG = {
    "base_image": "public/covers_raw/extras.jpeg" if os.path.exists("public/covers_raw/extras.jpeg") else "covers photo/extra.jpeg",
    "output_dir": "/home/mahmoud2415/Documents/work/Zinger-Restrant-with-React/public/menu_items/extras",
    "items": [
        ("extra-fries", "باكت بطاطس فارم فريتس"),
        ("extra-cheddar-fries", "باكت بطاطس شيدر"),
        ("extra-mozzarella-sticks", "موتزاريلا ستيكس"),
        ("extra-onion-rings", "حلقات بصل مقرمشة"),
        ("extra-sauces", "صوصات إضافية"),
        ("extra-pepsi", "بيبسي مثلج"),
        ("extra-water", "مياه معدنية"),
    ]
}

CRISPY_REMAINING_CONFIG = {
    "output_dir": "/home/mahmoud2415/Documents/work/Zinger-Restrant-with-React/public/menu_items/crispy_chicken",
    "fries_items": [
        ("fries-chicken-plain", "فرايز تشيكن"),
        ("fries-chicken-cheddar", "فرايز تشيكن شيدر"),
        ("fries-chicken-big-tasty", "فرايز تشيكن بيج تايستي"),
        ("fries-chicken-bbq", "فرايز تشيكن باربيكيو"),
        ("fries-chicken-pieces", "فرايز تشيكن سوبريم"),
    ],
    "bomb_items": [
        ("bomb-shish-charcoal", "قنبلة شيش فحم"),
        ("bomb-mix-chicken", "قنبلة ميكس فراخ"),
        ("bomb-baladi-burger", "قنبلة برجر بلدي"),
    ]
}

def render_text_on_image(base_img_path, title, out_path):
    base_img = Image.open(base_img_path).convert("RGBA")
    W, H = base_img.size
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    base_size = int(W * 0.072) if W < H else int(H * 0.088)
    if len(title) > 23:
        font_size = int(base_size * 0.78)
    elif len(title) > 17:
        font_size = int(base_size * 0.88)
    else:
        font_size = base_size

    font = ImageFont.truetype(FONT_PATH, font_size)
    bbox = draw.textbbox((0, 0), title, font=font, direction="rtl", language="ar")
    text_w = bbox[2] - bbox[0]
    pos_x = (W - text_w) // 2
    pos_y = int(H * 0.065)

    shadow_color = (0, 0, 0, 180)
    for offset_x, offset_y in [(0, 4), (0, 7), (2, 5), (-2, 5)]:
        draw.text(
            (pos_x + offset_x, pos_y + offset_y),
            title,
            font=font,
            fill=shadow_color,
            direction="rtl",
            language="ar",
            stroke_width=max(2, int(font_size * 0.04)),
            stroke_fill=(0, 0, 0, 140),
        )

    stroke_w = max(3, int(font_size * 0.045))
    draw.text(
        (pos_x, pos_y),
        title,
        font=font,
        fill=(255, 255, 255, 255),
        direction="rtl",
        language="ar",
        stroke_width=stroke_w,
        stroke_fill=(20, 15, 5, 240),
    )

    final_img = Image.alpha_composite(base_img, overlay).convert("RGB")
    final_img.save(out_path, quality=95)
    print(f"Generated: {out_path} -> '{title}'")

def generate_all():
    # 1. Extras (7 items)
    os.makedirs(EXTRAS_CONFIG["output_dir"], exist_ok=True)
    for item_id, title in EXTRAS_CONFIG["items"]:
        out_path = os.path.join(EXTRAS_CONFIG["output_dir"], f"{item_id}.jpeg")
        render_text_on_image(EXTRAS_CONFIG["base_image"], title, out_path)

    # 2. Fries (5 items) using extras/fries base or chicken base
    fries_base = EXTRAS_CONFIG["base_image"]
    for item_id, title in CRISPY_REMAINING_CONFIG["fries_items"]:
        out_path = os.path.join(CRISPY_REMAINING_CONFIG["output_dir"], f"{item_id}.jpeg")
        render_text_on_image(fries_base, title, out_path)

    # 3. Bombs (3 items) using bomb base
    bomb_base = "public/menu_items/crispy_chicken/bomb_chicken_turkey.jpeg" if os.path.exists("public/menu_items/crispy_chicken/bomb_chicken_turkey.jpeg") else "covers photo/ساندوتشات كرانشي.jpeg"
    for item_id, title in CRISPY_REMAINING_CONFIG["bomb_items"]:
        out_path = os.path.join(CRISPY_REMAINING_CONFIG["output_dir"], f"{item_id}.jpeg")
        render_text_on_image(bomb_base, title, out_path)

def update_menu_ts():
    with open(MENU_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # Update extras
    for item_id, _ in EXTRAS_CONFIG["items"]:
        new_path = f"/menu_items/extras/{item_id}.jpeg"
        pattern = rf'(id:\s*"{item_id}",[\s\S]*?image:\s*")[^"]+(")'
        content = re.sub(pattern, rf'\g<1>{new_path}\g<2>', content)

    # Update fries & bombs
    for item_id, _ in CRISPY_REMAINING_CONFIG["fries_items"] + CRISPY_REMAINING_CONFIG["bomb_items"]:
        new_path = f"/menu_items/crispy_chicken/{item_id}.jpeg"
        pattern = rf'(id:\s*"{item_id}",[\s\S]*?image:\s*")[^"]+(")'
        content = re.sub(pattern, rf'\g<1>{new_path}\g<2>', content)

    with open(MENU_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated initialMenu.ts with final 15 image paths.")

if __name__ == "__main__":
    generate_all()
    update_menu_ts()
