import os
import re
from PIL import Image, ImageDraw, ImageFont

if os.path.exists("pitzzaa.jpeg"):
    BASE_IMAGE_PATH = "pitzzaa.jpeg"
elif os.path.exists("covers photo/pizzaa.jpeg"):
    BASE_IMAGE_PATH = "covers photo/pizzaa.jpeg"
else:
    BASE_IMAGE_PATH = "public/covers_raw/pizza.jpeg"

print(f"Using base pizza image from: {BASE_IMAGE_PATH}")

OUTPUT_DIR = "/home/mahmoud2415/Documents/work/Zinger-Restrant-with-React/public/menu_items/pizza"
MENU_FILE = "/home/mahmoud2415/Documents/work/Zinger-Restrant-with-React/src/data/initialMenu.ts"
FONT_PATH = "/usr/share/fonts/truetype/noto/NotoKufiArabic-Bold.ttf"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# 35 Pizzas defined in initialMenu.ts
PIZZAS = [
    ("pizza-margherita", "بيتزا مارجريتا"),
    ("pizza-julienne-veggies", "بيتزا خضروات جوليان"),
    ("pizza-mushroom", "بيتزا مشروم"),
    ("pizza-mix-cheese", "بيتزا مكس جبن"),
    ("pizza-quattro-formaggi", "بيتزا كواترو فورماج"),
    ("pizza-crunchy-turkey", "بيتزا كرانشي رومي مدخن"),
    ("pizza-chicken-bbq", "بيتزا تشيكن باربيكيو"),
    ("pizza-chicken-texas", "بيتزا تشيكن تكساس"),
    ("pizza-shish-bbq", "بيتزا شيش باربيكيو"),
    ("pizza-chicken-ranch", "بيتزا تشيكن رانش"),
    ("pizza-grilled-breasts", "بيتزا صدور جريل"),
    ("pizza-supreme-chicken", "بيتزا سوبر سوبريم فراخ"),
    ("pizza-supreme-meat", "بيتزا سوبر سوبريم لحوم"),
    ("pizza-mix-chicken", "بيتزا مكس فراخ"),
    ("pizza-minced-meat", "بيتزا مفروم"),
    ("pizza-sausage", "بيتزا سوسيس"),
    ("pizza-deep-ranch", "بيتزا ديب رانش"),
    ("pizza-zinger", "بيتزا زينجر"),
    ("pizza-mexican-chicken", "بيتزا فراخ مكسيكي"),
    ("pizza-fajita", "بيتزا فاهيتا"),
    ("pizza-charcoal-shish", "بيتزا شيش فحم"),
    ("pizza-pepperoni", "بيتزا بيبروني"),
    ("pizza-chicken-jalapeno", "بيتزا تشيكن هالبينو"),
    ("pizza-chicken-bacon", "بيتزا تشيكن بيكون"),
    ("pizza-tuna", "بيتزا تونة"),
    ("pizza-pastrami", "بيتزا بسطرمة"),
    ("pizza-shrimp", "بيتزا جمبري"),
    ("pizza-sea-ranch", "بيتزا سي رانش"),
    ("pizza-four-seasons", "بيتزا فور سيزون"),
    ("pizza-beef-bacon", "بيتزا بيف بيكون"),
    ("pizza-nashville", "بيتزا ناشفيل"),
    ("pizza-meter", "بيتزا متر زينجر"),
    ("pizza-pastrami-kiri", "بيتزا بسطرمة كيري"),
    ("pizza-oriental-sausage-kiri", "بيتزا سجق كيري"),
    ("pizza-seafood", "بيتزا سي فوود"),
]

def generate_images():
    base_img = Image.open(BASE_IMAGE_PATH).convert("RGBA")
    W, H = base_img.size

    for item_id, title in PIZZAS:
        img = base_img.copy()
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)

        # Dynamic font sizing based on title length and image dimensions
        base_size = int(W * 0.072)  # ~64px for 896 width
        if len(title) > 23:
            font_size = int(base_size * 0.78)
        elif len(title) > 17:
            font_size = int(base_size * 0.88)
        else:
            font_size = base_size

        font = ImageFont.truetype(FONT_PATH, font_size)

        bbox = draw.textbbox((0, 0), title, font=font, direction="rtl", language="ar")
        text_w = bbox[2] - bbox[0]
        text_h = bbox[3] - bbox[1]

        pos_x = (W - text_w) // 2
        pos_y = int(H * 0.065)

        # Multi-layer soft drop shadow
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

        # Main text with crisp dark outline for high contrast
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

        final_img = Image.alpha_composite(img, overlay).convert("RGB")
        out_path = os.path.join(OUTPUT_DIR, f"{item_id}.jpeg")
        final_img.save(out_path, quality=95)
        print(f"Generated: {out_path} -> '{title}'")

def update_menu_ts():
    with open(MENU_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # Fix any typo
    content = content.replace("بيتزا تشيكن هالبينوش", "بيتزا تشيكن هالبينو")

    # Update each pizza's image property
    for item_id, _ in PIZZAS:
        new_img_path = f"/menu_items/pizza/{item_id}.jpeg"
        item_pattern = rf'(id:\s*"{item_id}",[\s\S]*?image:\s*")[^"]+(")'
        content = re.sub(item_pattern, rf'\g<1>{new_img_path}\g<2>', content)

    with open(MENU_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated initialMenu.ts with new pizza images.")

if __name__ == "__main__":
    generate_images()
    update_menu_ts()
