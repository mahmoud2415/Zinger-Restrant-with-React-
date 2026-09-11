import os
import re
from PIL import Image, ImageDraw, ImageFont

# Check user's Stitch generated image first
if os.path.exists("كريب.jpeg"):
    BASE_IMAGE_PATH = "كريب.jpeg"
elif os.path.exists("public/covers_raw/crepes.jpeg"):
    BASE_IMAGE_PATH = "public/covers_raw/crepes.jpeg"
else:
    BASE_IMAGE_PATH = "covers photo/creap.jpeg"

print(f"Using base crepe image from: {BASE_IMAGE_PATH}")

OUTPUT_DIR = "/home/mahmoud2415/Documents/work/Zinger-Restrant-with-React/public/menu_items/crepes"
MENU_FILE = "/home/mahmoud2415/Documents/work/Zinger-Restrant-with-React/src/data/initialMenu.ts"
FONT_PATH = "/usr/share/fonts/truetype/noto/NotoKufiArabic-Bold.ttf"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# 40 Crepes defined in initialMenu.ts
CREPES = [
    ("crepe-mix-cheese", "كريب مشكل جبن"),
    ("crepe-pane-crispy", "كريب بانية / تشيكن كرسبي"),
    ("crepe-crispy-nuggets", "كريب كرسبي ناجتس"),
    ("crepe-super-crunchy", "كريب سوبر كرانشي (زنجر)"),
    ("crepe-zinger-supreme", "كريب زنجر سوبريم"),
    ("crepe-chicken-bbq", "كريب تشيكن باربيكيو"),
    ("crepe-chicken-ranch", "كريب تشيكن رانش"),
    ("crepe-chicken-jalapeno", "كريب تشيكن هالبينو"),
    ("crepe-shish-charcoal", "كريب شيش فحم"),
    ("crepe-fajita", "كريب فاهيتا"),
    ("crepe-mix-chicken", "كريب مكس فراخ"),
    ("crepe-mix-meat", "كريب مكس لحوم"),
    ("crepe-mix-all", "كريب مكس مشكل"),
    ("crepe-shish-zinger", "كريب شيش ع زنجر"),
    ("crepe-zinger-special", "كريب زنجر سبيشيال"),
    ("crepe-chicken-bacon", "كريب تشيكن بيكون"),
    ("crepe-shish-sausage", "كريب شيش على سوسيس"),
    ("crepe-zinger-pane", "كريب زنجر ع بانية"),
    ("crepe-zinger-sausage", "كريب زنجر ع سوسيس"),
    ("crepe-zinger-fries", "كريب زنجر ع بطاطس"),
    ("crepe-sausage-pane", "كريب سوسيس ع بانية"),
    ("crepe-pane-kofta", "كريب بانية ع كفتة"),
    ("crepe-pane-fries", "كريب بانية ع بطاطس"),
    ("crepe-burger", "كريب برجر"),
    ("crepe-oriental-sausage", "كريب سجق"),
    ("crepe-sausage", "كريب سوسيس"),
    ("crepe-crispy-shrimp", "كريب جمبري كرسبي"),
    ("crepe-cordon-bleu", "كريب كوردون بلو"),
    ("crepe-cordon-bleu-strips", "كريب كوردون بلو ع استربس"),
    ("crepe-cordon-bleu-shish", "كريب كوردون بلو ع شيش"),
    ("crepe-strips", "كريب استربس"),
    ("crepe-fries", "كريب بطاطس"),
    ("crepe-chicken-nacho", "كريب تشيكن ناتشل"),
    ("crepe-happiness", "كريب السعادة"),
    ("crepe-dynamite", "كريب ديناميت"),
    ("crepe-knights", "كريب نايتس"),
    ("crepe-jolly", "كريب جولي"),
    ("crepe-devils", "كريب ديفيلز"),
    ("crepe-monster", "كريب منستر"),
    ("crepe-fantasy", "كريب فانتازي"),
]

def generate_images():
    base_img = Image.open(BASE_IMAGE_PATH).convert("RGBA")
    W, H = base_img.size

    for item_id, title in CREPES:
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

    # Update each crepe's image property
    for item_id, _ in CREPES:
        new_img_path = f"/menu_items/crepes/{item_id}.jpeg"
        item_pattern = rf'(id:\s*"{item_id}",[\s\S]*?image:\s*")[^"]+(")'
        content = re.sub(item_pattern, rf'\g<1>{new_img_path}\g<2>', content)

    with open(MENU_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated initialMenu.ts with new crepe images.")

if __name__ == "__main__":
    generate_images()
    update_menu_ts()
