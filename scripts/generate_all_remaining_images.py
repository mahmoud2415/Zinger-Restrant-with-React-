import os
import re
from PIL import Image, ImageDraw, ImageFont

FONT_PATH = "/usr/share/fonts/truetype/noto/NotoKufiArabic-Bold.ttf"
MENU_FILE = "/home/mahmoud2415/Documents/work/Zinger-Restrant-with-React/src/data/initialMenu.ts"

CONFIG = {
    "pasta": {
        "base_image": "طواجن باستا.jpeg",
        "output_dir": "/home/mahmoud2415/Documents/work/Zinger-Restrant-with-React/public/menu_items/pasta",
        "items": [
            ("pasta-mix-cheese", "طاجن مكس جبن"),
            ("pasta-crunchy-turkey", "طاجن كرانشي رومي مدخن"),
            ("pasta-fresh-chicken", "طاجن تشيكن فريش"),
            ("pasta-chicken-ranch", "طاجن تشيكن رانش"),
            ("pasta-chicken-bbq", "طاجن تشيكن باربيكيو"),
            ("pasta-chicken-texas", "طاجن تشيكن تكساس"),
            ("pasta-shish-charcoal", "طاجن شيش فحم"),
            ("pasta-mix-chicken", "طاجن مكس فراخ"),
            ("pasta-supreme-chicken", "طاجن سوبر سوبريم فراخ"),
            ("pasta-supreme-meat", "طاجن سوبر سوبريم لحوم"),
            ("pasta-fajita", "طاجن فاهيتا"),
            ("pasta-chicken-jalapeno", "طاجن تشيكن هالبينو"),
            ("pasta-shrimp", "طاجن جمبري"),
            ("penne-minced-meat", "بنا مفروم مكرونة"),
            ("penne-sausage", "بنا سوسيس مكرونة"),
            ("penne-crunchy", "بنا كرانشي مكرونة"),
            ("penne-shish", "بنا شيش مكرونة"),
            ("penne-alfredo", "بنا ألفريدو دجاج"),
            ("penne-shrimp", "بنا شيرمب جمبري"),
            ("penne-mix-chicken", "بنا مكس فراخ"),
        ]
    },
    "rolls": {
        "base_image": "ساندوتش ورل .jpeg",
        "output_dir": "/home/mahmoud2415/Documents/work/Zinger-Restrant-with-React/public/menu_items/rolls",
        "items": [
            ("roll-chicken-turkey", "وش رول تشيكن تركي مدخن"),
            ("roll-chicken-ranch", "وش رول تشيكن رانش مدخن"),
            ("roll-shish", "وش رول شيش"),
            ("roll-zinger", "وش رول زنجر"),
            ("roll-mix-chicken", "وش رول ميكس فراخ"),
        ]
    },
    "hawawshi": {
        "base_image": "حواوشي.jpeg",
        "output_dir": "/home/mahmoud2415/Documents/work/Zinger-Restrant-with-React/public/menu_items/hawawshi",
        "items": [
            ("hawawshi-crunchy-turkey", "حواوشي إيطالي كرانشي تركي"),
            ("hawawshi-chicken-ranch", "حواوشي إيطالي تشيكن رانش"),
            ("hawawshi-mix-chicken", "حواوشي إيطالي مكس فراخ"),
            ("hawawshi-minced-meat", "حواوشي إيطالي مفروم"),
        ]
    },
    "melted_cheese": {
        "base_image": "غرقانة جبنة.jpeg",
        "output_dir": "/home/mahmoud2415/Documents/work/Zinger-Restrant-with-React/public/menu_items/melted_cheese",
        "items": [
            ("cheese-pan-fries", "طاسة بطاطس غرقانة جبنة"),
            ("cheese-pan-strips", "طاسة استربس غرقانة جبنة"),
            ("cheese-pan-shish", "طاسة شيش غرقانة جبنة"),
            ("cheese-pan-sausage", "طاسة سوسيس غرقانة جبنة"),
            ("cheese-pan-chicken-jalapeno", "طاسة تشيكن هالبينو"),
            ("cheese-pan-sausage-shish", "طاسة سوسيس ع شيش"),
            ("cheese-pan-zinger-shish", "طاسة زينجر ع شيش"),
            ("cheese-pan-mix-meat", "طاسة مكس لحوم"),
        ]
    }
}

def generate_category_images():
    for cat_name, cat_data in CONFIG.items():
        base_path = cat_data["base_image"]
        out_dir = cat_data["output_dir"]
        os.makedirs(out_dir, exist_ok=True)

        if not os.path.exists(base_path):
            print(f"ERROR: Base image {base_path} not found!")
            continue

        base_img = Image.open(base_path).convert("RGBA")
        W, H = base_img.size

        for item_id, title in cat_data["items"]:
            img = base_img.copy()
            overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            draw = ImageDraw.Draw(overlay)

            # Dynamic font sizing based on length
            base_size = int(W * 0.072)
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

            # Main text with crisp dark outline
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
            out_path = os.path.join(out_dir, f"{item_id}.jpeg")
            final_img.save(out_path, quality=95)
            print(f"Generated [{cat_name}]: {out_path} -> '{title}'")

def update_menu_ts():
    with open(MENU_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    for cat_name, cat_data in CONFIG.items():
        for item_id, _ in cat_data["items"]:
            new_img_path = f"/menu_items/{cat_name}/{item_id}.jpeg"
            item_pattern = rf'(id:\s*"{item_id}",[\s\S]*?image:\s*")[^"]+(")'
            content = re.sub(item_pattern, rf'\g<1>{new_img_path}\g<2>', content)

    with open(MENU_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated initialMenu.ts with all 37 images.")

if __name__ == "__main__":
    generate_category_images()
    update_menu_ts()
