import { MenuItem } from "../types";
import { normalizeForImageMatching } from "../utils/arabic";

const productImageBasePath = "assets/menu/";
const productImagePrefix = "zinger-menu-";
const fallbackProductImage = "assets/placeholder.webp";
const crepeFallbackImage =
  "menu_items/كريب سوبر كرانشي (زنجر)/WhatsApp Image 2026-08-02 at 12.10.21 AM.jpeg";
const pizzaFallbackImages = [
  "menu_items/بيتزا مارجريتا/WhatsApp Image 2026-08-02 at 12.10.02 AM.jpeg",
  "menu_items/بيتزا مكس جبن/WhatsApp Image 2026-08-02 at 12.10.38 AM.jpeg",
  "menu_items/بيتزا تشيكن باربيكيو/WhatsApp Image 2026-08-02 at 12.11.02 AM.jpeg",
  "menu_items/بيتزا تشيكن رانش/WhatsApp Image 2026-08-02 at 12.11.25 AM (1).jpeg",
  "menu_items/بيتزا بيبيروني/WhatsApp Image 2026-08-02 at 12.11.40 AM.jpeg",
];
const burgerFallbackImages = [
  "menu_items/كلاسيك بيف برجر/WhatsApp Image 2026-08-02 at 1.58.49 AM.jpeg",
  "menu_items/إكسترا مايل/WhatsApp Image 2026-08-02 at 1.51.11 AM.jpeg",
];
const pastaFallbackImage = "assets/pasta-clean.jpg";
const rollsFallbackImage = "menu_items/وش رول/unnamed.jpg";
const hawawshiFallbackImage = "menu_items/حووشي.jpg";
const meltedCheeseFallbackImage = "menu_items/غرقانة جبنه.jpg";
const extrasFallbackImages = {
  fries:
    "menu_items/الإضافات/sfda.jpg",
  cheddarFries:
    "https://loremflickr.com/900/700/french-fries,cheese?lock=802",
  onionRings:
    "menu_items/الإضافات/unnafdsaasfmed.jpg",
  mozzarella:
    "menu_items/الإضافات/sdfs.jpg",
  ranch:
    "menu_items/الإضافات/df.jpg",
  barbecue:
    "menu_items/الإضافات/dsfa.jpg",
  texas:
    "menu_items/الإضافات/unnamdsed.jpg",
  pepsiCan:
    "menu_items/الإضافات/unnamed.jpg",
  pepsiBottle:
    "menu_items/الإضافات/unnamedd.jpg",
  smallWater:
    "menu_items/الإضافات/unnadfdfmed.jpg",
  largeWater:
    "menu_items/الإضافات/unnamexxzd.jpg",
};

function buildProductImage(number: number): string {
  return `${productImageBasePath}${productImagePrefix}${String(number).padStart(3, "0")}.webp`;
}

function buildProductImages(start: number, end: number): string[] {
  return Array.from({ length: end - start + 1 }, (_, index) =>
    buildProductImage(start + index),
  );
}

const imagesByCategory = {
  burgers: buildProductImages(1, 12),
  crepes: buildProductImages(13, 42),
  pizza: buildProductImages(43, 60),
  pasta: buildProductImages(61, 72),
  rolls: buildProductImages(73, 80),
  hawawshi: buildProductImages(81, 88),
  melted_cheese: buildProductImages(89, 96),
};

const allProductImages = Object.values(imagesByCategory).flat();

// Transcribed Menu Data
const menuData: MenuItem[] = [
  // === BURGERS ===
  {
    id: 101,
    section: "burgers",
    name: "كلاسيك بيف برجر",
    image:
      "assets/menu_items/كلاسيك بيف برجر/WhatsApp Image 2026-08-02 at 1.58.49 AM.webp",
    images: [
      "assets/menu_items/كلاسيك بيف برجر/WhatsApp Image 2026-08-02 at 1.58.49 AM.webp",
    ],
    desc: "قطعة برجر + صوص تكساس + صوص رانش + كابوتشا + طماطم + خيار مخلل",
    sizes: [
      { name: "سنجل (200جم)", price: 180 },
      { name: "دبل (400جم)", price: 235 },
      { name: "تربل (600جم)", price: 365 },
    ],
  },
  {
    id: 102,
    section: "burgers",
    name: "برجر هالبينو",
    image:
      "assets/menu/zinger-menu-005.webp",
    desc: "قطعة برجر + هالبينو + صوص تكساس + صوص رانش + كابوتشا + طماطم + خيار مخلل",
    sizes: [
      { name: "سنجل (200جم)", price: 180 },
      { name: "دبل (400جم)", price: 235 },
      { name: "تربل (600جم)", price: 365 },
    ],
  },
  {
    id: 103,
    image:
      "assets/menu_items/إكسترا مايل/WhatsApp Image 2026-08-02 at 1.51.11 AM.webp",
    images: [
      "assets/menu_items/إكسترا مايل/WhatsApp Image 2026-08-02 at 1.51.11 AM.webp",
    ],
    section: "burgers",
    name: "إكسترا مايل",
    desc: "قطعة برجر + موزاريلا تكساس + صوص جبنة + كابوتشا + طماطم + خيار مخلل",
    sizes: [
      { name: "سنجل (200جم)", price: 180 },
      { name: "دبل (400جم)", price: 235 },
      { name: "تربل (600جم)", price: 365 },
    ],
  },
  {
    id: 104,
    section: "burgers",
    name: "سوبر نايت برجر",
    image:
      "assets/menu/zinger-menu-010.webp",
    desc: "قطعة برجر + شرائح شيدر + بيف بيكون + بصل مكرمل + مشوي + كابوتشا + طماطم + خيار مخلل",
    sizes: [
      { name: "سنجل (200جم)", price: 180 },
      { name: "دبل (400جم)", price: 235 },
      { name: "تربل (600جم)", price: 365 },
    ],
  },
  {
    id: 105,
    section: "burgers",
    name: "برجر تشيز فري",
    image:
      "assets/menu/zinger-menu-009.webp",
    desc: "قطعة بيف + كوردن بلو تشيكن + بيف بيكون + تركي مدخن + صوص رانش + صوص شيدر مدخن + كابوتشا + طماطم + خيار مخلل",
    price: 340,
    sizes: [{ name: "تربل (600جم)", price: 340 }],
  },
  {
    id: 106,
    section: "burgers",
    name: "برجر كوردن بلو",
    image:
      "assets/menu/zinger-menu-011.webp",
    desc: "قطعة بيف + كوردن بلو تشيكن + بيف بيكون + تركي مدخن + صوص رانش + صوص شيدر مدخن + كابوتشا + طماطم + خيار مخلل",
    sizes: [
      { name: "سنجل (200جم)", price: 160 },
      { name: "دبل (400جم)", price: 210 },
    ],
  },

  // === CREPES ===
  {
    id: 201,
    section: "crepes",
    name: "كريب مشكل جبن",
    image:
      "assets/menu/zinger-menu-027.webp",
    desc: "ميكس أجبان زنجر الخاصة",
    sizes: [
      { name: "M", price: 100 },
      { name: "L", price: 120 },
      { name: "XL", price: 140 },
      { name: "رول", price: 155 },
    ],
  },
  {
    id: 202,
    image:
      "assets/menu_items/كريب بانية - تشيكن كرسبي/WhatsApp Image 2026-08-02 at 12.11.14 AM (1).webp",
    images: [
      "assets/menu_items/كريب بانية - تشيكن كرسبي/WhatsApp Image 2026-08-02 at 12.11.14 AM (1).webp",
      "assets/menu_items/كريب بانية - تشيكن كرسبي/WhatsApp Image 2026-08-02 at 12.11.14 AM.webp",
      "assets/menu_items/كريب بانية - تشيكن كرسبي/WhatsApp Image 2026-08-02 at 12.11.15 AM (1).webp",
      "assets/menu_items/كريب بانية - تشيكن كرسبي/WhatsApp Image 2026-08-02 at 12.11.15 AM (2).webp",
      "assets/menu_items/كريب بانية - تشيكن كرسبي/WhatsApp Image 2026-08-02 at 12.11.15 AM.webp",
    ],
    section: "crepes",
    name: "كريب بانية / تشيكن كرسبي",
    desc: "قطع بانيه مقرمش",
    sizes: [
      { name: "M", price: 80 },
      { name: "L", price: 95 },
      { name: "XL", price: 115 },
      { name: "رول", price: 130 },
    ],
  },
  {
    id: 203,
    section: "crepes",
    name: "كريب كرسبي ناجتس",
    image:
      "assets/menu/zinger-menu-012.webp",
    desc: "قطع ناجتس دجاج ذهبية",
    sizes: [
      { name: "M", price: 95 },
      { name: "L", price: 105 },
      { name: "XL", price: 125 },
      { name: "رول", price: 135 },
    ],
  },
  {
    id: 204,
    image:
      "assets/menu_items/كريب سوبر كرانشي (زنجر)/WhatsApp Image 2026-08-02 at 12.10.21 AM (1).webp",
    images: [
      "assets/menu_items/كريب سوبر كرانشي (زنجر)/WhatsApp Image 2026-08-02 at 12.10.21 AM (1).webp",
      "assets/menu_items/كريب سوبر كرانشي (زنجر)/WhatsApp Image 2026-08-02 at 12.10.21 AM.webp",
      "assets/menu_items/كريب سوبر كرانشي (زنجر)/WhatsApp Image 2026-08-02 at 12.10.22 AM.webp",
    ],
    section: "crepes",
    name: "كريب سوبر كرانشي (زنجر)",
    desc: "صدور الدجاج الحارة المقرمشة",
    sizes: [
      { name: "M", price: 140 },
      { name: "L", price: 155 },
      { name: "XL", price: 170 },
      { name: "رول", price: 185 },
    ],
  },
  {
    id: 205,
    section: "crepes",
    name: "كريب زنجر سوبريم",
    image:
      "assets/menu/zinger-menu-014.webp",
    desc: "زنجر مقرمش مع تركي مدخن وصوصات",
    sizes: [
      { name: "M", price: 145 },
      { name: "L", price: 155 },
      { name: "XL", price: 175 },
      { name: "رول", price: 185 },
    ],
  },
  {
    id: 206,
    section: "crepes",
    name: "كريب تشيكن باربيكيو",
    image:
      "assets/menu/zinger-menu-015.webp",
    desc: "دجاج مقرمش مع صوص الباربيكيو المميز",
    sizes: [
      { name: "M", price: 145 },
      { name: "L", price: 155 },
      { name: "XL", price: 175 },
      { name: "رول", price: 185 },
    ],
  },
  {
    id: 207,
    image:
      "assets/menu_items/كريب تشيكن رانش/WhatsApp Image 2026-08-02 at 12.08.57 AM (1).webp",
    images: [
      "assets/menu_items/كريب تشيكن رانش/WhatsApp Image 2026-08-02 at 12.08.57 AM (1).webp",
      "assets/menu_items/كريب تشيكن رانش/WhatsApp Image 2026-08-02 at 12.08.57 AM (2).webp",
    ],
    section: "crepes",
    name: "كريب تشيكن رانش",
    desc: "صدور دجاج كرسبي مع صوص الرانش الغني",
    sizes: [
      { name: "M", price: 145 },
      { name: "L", price: 155 },
      { name: "XL", price: 175 },
      { name: "رول", price: 185 },
    ],
  },
  {
    id: 208,
    section: "crepes",
    name: "كريب تشيكن هالبينو",
    image:
      "assets/menu/zinger-menu-020.webp",
    desc: "دجاج كرسبي مع شرائح هالبينو وصوص حار",
    sizes: [
      { name: "M", price: 145 },
      { name: "L", price: 160 },
      { name: "XL", price: 180 },
      { name: "رول", price: 185 },
    ],
  },
  {
    id: 209,
    section: "crepes",
    name: "كريب شيش فحم",
    image:
      "assets/menu/zinger-menu-019.webp",
    desc: "شيش طاووق مشوي على الفحم متبل",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 175 },
      { name: "XL", price: 185 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 210,
    section: "crepes",
    name: "كريب فاهيتا دجاج",
    image:
      "assets/menu/zinger-menu-059.webp",
    desc: "فاهيتا دجاج جريل مع فلفل وبصل وبهارات",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 175 },
      { name: "XL", price: 185 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 211,
    image:
      "assets/menu_items/كريب مكس فراخ/WhatsApp Image 2026-08-02 at 12.09.18 AM.webp",
    images: [
      "assets/menu_items/كريب مكس فراخ/WhatsApp Image 2026-08-02 at 12.09.18 AM.webp",
      "assets/menu_items/كريب مكس فراخ/WhatsApp Image 2026-08-02 at 12.09.19 AM (1).webp",
      "assets/menu_items/كريب مكس فراخ/WhatsApp Image 2026-08-02 at 12.09.19 AM (2).webp",
      "assets/menu_items/كريب مكس فراخ/WhatsApp Image 2026-08-02 at 12.09.19 AM (3).webp",
      "assets/menu_items/كريب مكس فراخ/WhatsApp Image 2026-08-02 at 12.09.19 AM.webp",
    ],
    section: "crepes",
    name: "كريب مكس فراخ",
    desc: "ميكس صدور وشيش طاووق وكرسبي",
    sizes: [
      { name: "M", price: 150 },
      { name: "L", price: 165 },
      { name: "XL", price: 185 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 212,
    section: "crepes",
    name: "كريب مكس لحوم",
    image:
      "assets/menu/zinger-menu-056.webp",
    desc: "ميكس برجر لحم وسجق وهوت دوج",
    sizes: [
      { name: "M", price: 150 },
      { name: "L", price: 165 },
      { name: "XL", price: 185 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 213,
    section: "crepes",
    name: "كريب مكس مشكل",
    image:
      "assets/menu/zinger-menu-054.webp",
    desc: "ميكس لحوم ودجاج متبل معاً",
    sizes: [
      { name: "M", price: 155 },
      { name: "L", price: 170 },
      { name: "XL", price: 185 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 214,
    section: "crepes",
    name: "كريب شيش ع زنجر",
    image:
      "assets/menu/zinger-menu-061.webp",
    desc: "شيش طاووق مشوي مع قطع زنجر حارة",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 175 },
      { name: "XL", price: 185 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 215,
    section: "crepes",
    name: "كريب زنجر سبيشيال",
    image:
      "assets/menu/zinger-menu-055.webp",
    desc: "زنجر حار مضاعف مع إضافات السعادة",
    sizes: [
      { name: "XL", price: 190 },
      { name: "رول", price: 205 },
    ],
  },
  {
    id: 216,
    section: "crepes",
    name: "كريب تشيكن بيكون",
    image:
      "assets/menu/zinger-menu-060.webp",
    desc: "كرسبي مع بيف بيكون وصوص جبنة",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 175 },
      { name: "XL", price: 190 },
      { name: "رول", price: 205 },
    ],
  },
  {
    id: 217,
    section: "crepes",
    name: "كريب شيش على سوسيس",
    image:
      "assets/menu/zinger-menu-063.webp",
    desc: "شيش مشوي مع قطع سوسيس",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 175 },
      { name: "XL", price: 180 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 218,
    section: "crepes",
    name: "كريب زنجر ع بانية",
    image:
      "assets/menu/zinger-menu-062.webp",
    desc: "ميكس زنجر حار وبانيه كلاسيك",
    sizes: [
      { name: "M", price: 140 },
      { name: "L", price: 155 },
      { name: "XL", price: 170 },
      { name: "رول", price: 185 },
    ],
  },
  {
    id: 219,
    section: "crepes",
    name: "كريب زنجر ع سوسيس",
    image:
      "assets/menu/zinger-menu-064.webp",
    desc: "زنجر حار مع هوت دوج جريل",
    sizes: [
      { name: "M", price: 150 },
      { name: "L", price: 165 },
      { name: "XL", price: 180 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 220,
    section: "crepes",
    name: "كريب زنجر ع بطاطس",
    desc: "زنجر حار مقرمش مع بطاطس بوم فريت",
    sizes: [
      { name: "M", price: 155 },
      { name: "L", price: 170 },
      { name: "XL", price: 180 },
      { name: "رول", price: 185 },
    ],
  },
  {
    id: 221,
    section: "crepes",
    name: "كريب سوسيس ع بانية",
    desc: "هوت دوج مع بانيه مقرمش",
    sizes: [
      { name: "M", price: 140 },
      { name: "L", price: 155 },
      { name: "XL", price: 170 },
      { name: "رول", price: 185 },
    ],
  },
  {
    id: 222,
    section: "crepes",
    name: "كريب بانية ع كفتة",
    desc: "بانيه مع كفتة مشوية على الفحم",
    sizes: [
      { name: "M", price: 120 },
      { name: "L", price: 135 },
      { name: "XL", price: 140 },
      { name: "رول", price: 155 },
    ],
  },
  {
    id: 223,
    section: "crepes",
    name: "كريب بانية ع بطاطس",
    desc: "بانيه مقرمش اقتصادي مع بطاطس",
    sizes: [
      { name: "M", price: 115 },
      { name: "L", price: 125 },
      { name: "XL", price: 135 },
      { name: "رول", price: 145 },
    ],
  },
  {
    id: 224,
    section: "crepes",
    name: "كريب برجر",
    desc: "برجر لحم بلدي مشوي",
    sizes: [
      { name: "M", price: 110 },
      { name: "L", price: 120 },
      { name: "XL", price: 135 },
      { name: "رول", price: 145 },
    ],
  },
  {
    id: 225,
    section: "crepes",
    name: "كريب سجق",
    desc: "سجق بلدي متبل جريل",
    sizes: [
      { name: "M", price: 110 },
      { name: "L", price: 120 },
      { name: "XL", price: 135 },
      { name: "رول", price: 145 },
    ],
  },
  {
    id: 226,
    section: "crepes",
    name: "كريب سوسيس",
    desc: "هوت دوج مقطع صوصات شرقية",
    sizes: [
      { name: "M", price: 110 },
      { name: "L", price: 120 },
      { name: "XL", price: 135 },
      { name: "رول", price: 145 },
    ],
  },
  {
    id: 227,
    section: "crepes",
    name: "كريب جمبري كرسبي",
    desc: "جمبري جامبو مقرمش لعشاق السي فود",
    sizes: [{ name: "XL", price: 230 }],
  },
  {
    id: 228,
    section: "crepes",
    name: "كريب كوردون بلو",
    desc: "رول دجاج محشو جبن وتركي مقلي",
    sizes: [
      { name: "M", price: 150 },
      { name: "L", price: 165 },
      { name: "XL", price: 185 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 229,
    section: "crepes",
    name: "كريب كوردون بلو ع استربس",
    desc: "كوردون بلو غني مع قطع استربس كرسبي",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 175 },
      { name: "XL", price: 185 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 230,
    section: "crepes",
    name: "كريب كوردون بلو ع شيش",
    desc: "كوردون بلو مع شيش طاووق جريل",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 175 },
      { name: "XL", price: 185 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 231,
    section: "crepes",
    name: "كريب استربس",
    desc: "أصابع صدور دجاج مقرمشة حارة أو عادي",
    sizes: [
      { name: "M", price: 140 },
      { name: "L", price: 155 },
      { name: "XL", price: 170 },
      { name: "رول", price: 185 },
    ],
  },
  {
    id: 232,
    section: "crepes",
    name: "كريب بطاطس بوم فريت",
    desc: "بطاطس ذهبية مقرمشة غرقانة جبن",
    sizes: [
      { name: "M", price: 85 },
      { name: "L", price: 95 },
      { name: "XL", price: 115 },
      { name: "رول", price: 135 },
    ],
  },
  {
    id: 233,
    section: "crepes",
    name: "كريب تشيكن ناتشل",
    desc: "كرسبي مع خضروات وصوص رانش شيدر",
    sizes: [
      { name: "M", price: 155 },
      { name: "L", price: 170 },
      { name: "XL", price: 185 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 234,
    section: "crepes",
    name: "كريب السعادة",
    desc: "صوص تكساس + مكس جبن + برجر + سوسيس",
    sizes: [
      { name: "M", price: 195 },
      { name: "L", price: 215 },
      { name: "XL", price: 225 },
      { name: "رول", price: 235 },
    ],
  },
  {
    id: 235,
    section: "crepes",
    name: "كريب ديناميت",
    desc: "صوص رانش + مكس جبن + بيبروني + استربس + شيش فحم",
    sizes: [
      { name: "M", price: 170 },
      { name: "L", price: 185 },
      { name: "XL", price: 205 },
      { name: "رول", price: 215 },
    ],
  },
  {
    id: 236,
    section: "crepes",
    name: "كريب نايتس",
    desc: "شيدر صوص + فرايد تشيكن + استربس + رومي مدخن",
    sizes: [
      { name: "M", price: 165 },
      { name: "L", price: 175 },
      { name: "XL", price: 185 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 237,
    section: "crepes",
    name: "كريب جولي",
    desc: "صوص رانش + بانية + استربس + كوردون بلو",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 175 },
      { name: "XL", price: 185 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 238,
    section: "crepes",
    name: "كريب ديفيلز",
    desc: "صوص باربيكيو + صدور جريل + فاهيتا فراخ + شيش فحم",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 180 },
      { name: "XL", price: 190 },
      { name: "رول", price: 200 },
    ],
  },
  {
    id: 239,
    section: "crepes",
    name: "كريب منستر",
    desc: "تكساس + برجر + بانية + هوت دوج + شيش فحم",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 175 },
      { name: "XL", price: 185 },
      { name: "رول", price: 195 },
    ],
  },
  {
    id: 240,
    section: "crepes",
    name: "كريب فانتازي",
    desc: "صوص باربيكيو + برجر بلدي + كفتة فحم + شيش فحم",
    sizes: [
      { name: "M", price: 185 },
      { name: "L", price: 205 },
      { name: "XL", price: 215 },
      { name: "رول", price: 235 },
    ],
  },

  // === PIZZA ===
  {
    id: 301,
    image:
      "assets/menu_items/بيتزا مارجريتا/WhatsApp Image 2026-08-02 at 12.10.02 AM.webp",
    images: [
      "assets/menu_items/بيتزا مارجريتا/WhatsApp Image 2026-08-02 at 12.10.02 AM.webp",
    ],
    section: "pizza",
    name: "بيتزا مارجريتا",
    desc: "صوص بيتزا، موزاريلا، ريحان وزعتر",
    sizes: [
      { name: "M", price: 130 },
      { name: "L", price: 160 },
      { name: "XL", price: 190 },
    ],
  },
  {
    id: 302,
    section: "pizza",
    name: "بيتزا خضروات جوليان",
    desc: "مشروم، فلفل ألوان، زيتون، طماطم وموزاريلا",
    sizes: [
      { name: "M", price: 130 },
      { name: "L", price: 160 },
      { name: "XL", price: 190 },
    ],
  },
  {
    id: 303,
    section: "pizza",
    name: "بيتزا مشروم",
    desc: "مشروم فريش، صوص طماطم وموزاريلا",
    sizes: [
      { name: "M", price: 130 },
      { name: "L", price: 160 },
      { name: "XL", price: 190 },
    ],
  },
  {
    id: 304,
    image:
      "assets/menu_items/بيتزا مكس جبن/WhatsApp Image 2026-08-02 at 12.10.38 AM.webp",
    images: [
      "assets/menu_items/بيتزا مكس جبن/WhatsApp Image 2026-08-02 at 12.10.38 AM.webp",
      "assets/menu_items/بيتزا مكس جبن/WhatsApp Image 2026-08-02 at 12.10.39 AM.webp",
    ],
    section: "pizza",
    name: "بيتزا مكس جبن",
    desc: "شيدر، رومي، كيري وموزاريلا غنية",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 185 },
      { name: "XL", price: 215 },
    ],
  },
  {
    id: 305,
    section: "pizza",
    name: "بيتزا كواترو فورماج",
    desc: "أربعة أنواع أجبان فاخرة بخلطة إيطالية",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 190 },
      { name: "XL", price: 220 },
    ],
  },
  {
    id: 306,
    section: "pizza",
    name: "بيتزا كرانشي رومي مدخن",
    desc: "قطع كرسبي مع شرائح رومي مدخن شيدر",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 190 },
      { name: "XL", price: 220 },
    ],
  },
  {
    id: 307,
    image:
      "assets/menu_items/بيتزا تشيكن باربيكيو/WhatsApp Image 2026-08-02 at 12.11.02 AM (1).webp",
    images: [
      "assets/menu_items/بيتزا تشيكن باربيكيو/WhatsApp Image 2026-08-02 at 12.11.02 AM (1).webp",
      "assets/menu_items/بيتزا تشيكن باربيكيو/WhatsApp Image 2026-08-02 at 12.11.02 AM.webp",
    ],
    section: "pizza",
    name: "بيتزا تشيكن باربيكيو",
    desc: "قطع دجاج متبلة بصوص الباربيكيو الغني",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 190 },
      { name: "XL", price: 220 },
    ],
  },
  {
    id: 308,
    section: "pizza",
    name: "بيتزا تشيكن تكساس",
    desc: "دجاج متبل مع صوص تكساس هالبينو",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 190 },
      { name: "XL", price: 220 },
    ],
  },
  {
    id: 309,
    section: "pizza",
    name: "بيتزا شيش باربيكيو",
    desc: "شيش طاووق مع صوص الباربيكيو وموزاريلا",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 190 },
      { name: "XL", price: 220 },
    ],
  },
  {
    id: 310,
    section: "pizza",
    name: "بيتزا تشيكن رانش",
    image:
      "assets/menu_items/بيتزا تشيكن رانش/WhatsApp Image 2026-08-02 at 12.11.25 AM (1).webp",
    images: [
      "assets/menu_items/بيتزا تشيكن رانش/WhatsApp Image 2026-08-02 at 12.11.25 AM (1).webp",
      "assets/menu_items/بيتزا تشيكن رانش/WhatsApp Image 2026-08-02 at 12.11.26 AM (1).webp",
      "assets/menu_items/بيتزا تشيكن رانش/WhatsApp Image 2026-08-02 at 12.11.26 AM (2).webp",
      "assets/menu_items/بيتزا تشيكن رانش/WhatsApp Image 2026-08-02 at 12.11.26 AM (3).webp",
      "assets/menu_items/بيتزا تشيكن رانش/WhatsApp Image 2026-08-02 at 12.11.26 AM.webp",
    ],
    desc: "صدور دجاج كرسبي مع صوص الرانش المفضل",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 190 },
      { name: "XL", price: 220 },
    ],
  },
  {
    id: 311,
    section: "pizza",
    name: "بيتزا صدور جريل",
    desc: "صدور دجاج مشوية على الجريل صحية وموزاريلا",
    sizes: [
      { name: "M", price: 165 },
      { name: "L", price: 195 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 312,
    section: "pizza",
    name: "بيتزا سوبر سوبريم فراخ",
    desc: "قطع دجاج، خضار فريش، زيتون، وموزاريلا زيادة",
    sizes: [
      { name: "M", price: 165 },
      { name: "L", price: 195 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 313,
    section: "pizza",
    name: "بيتزا سوبر سوبريم لحوم",
    desc: "لحم مفروم، بيبيروني، سجق، خضار وزيتون وموزاريلا",
    sizes: [
      { name: "M", price: 165 },
      { name: "L", price: 195 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 314,
    section: "pizza",
    name: "بيتزا مكس فراخ",
    desc: "مزيج من قطع الشيش والكرسبي والصدور الجريل",
    sizes: [
      { name: "M", price: 165 },
      { name: "L", price: 195 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 315,
    section: "pizza",
    name: "بيتزا مفروم",
    desc: "لحم مفروم متبل بخلطة شرقية وموزاريلا",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 190 },
      { name: "XL", price: 220 },
    ],
  },
  {
    id: 316,
    section: "pizza",
    name: "بيتزا سوسيس",
    desc: "هوت دوج مقطع خضروات وموزاريلا",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 190 },
      { name: "XL", price: 220 },
    ],
  },
  {
    id: 317,
    section: "pizza",
    name: "بيتزا ديب رانش",
    desc: "حواف محشوة أجبان مع صوص رانش على الوجه ودجاج",
    sizes: [
      { name: "M", price: 165 },
      { name: "L", price: 195 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 318,
    section: "pizza",
    name: "بيتزا زنجر",
    desc: "قطع زنجر حارة كرسبي مع صوص هالبينو وجبنة",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 190 },
      { name: "XL", price: 220 },
    ],
  },
  {
    id: 319,
    section: "pizza",
    name: "بيتزا فراخ مكسيكي",
    desc: "دجاج، فلفل حار، بهارات مكسيكية حارة ولذيذة",
    sizes: [
      { name: "M", price: 165 },
      { name: "L", price: 195 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 320,
    section: "pizza",
    name: "بيتزا فاهيتا",
    desc: "فاهيتا دجاج جريل خضروات بصل فلفل زيتون وجبنة",
    sizes: [
      { name: "M", price: 165 },
      { name: "L", price: 195 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 321,
    section: "pizza",
    name: "بيتزا شيش فحم",
    desc: "قطع شيش مشوي فحم بنكهة الشواء المدخنة",
    sizes: [
      { name: "M", price: 165 },
      { name: "L", price: 195 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 322,
    image:
      "assets/menu_items/بيتزا بيبيروني/WhatsApp Image 2026-08-02 at 12.11.40 AM.webp",
    images: [
      "assets/menu_items/بيتزا بيبيروني/WhatsApp Image 2026-08-02 at 12.11.40 AM.webp",
      "assets/menu_items/بيتزا بيبيروني/WhatsApp Image 2026-08-02 at 12.11.41 AM.webp",
    ],
    section: "pizza",
    name: "بيتزا بيبيروني",
    desc: "قطع بيبيروني لحم فاخرة غرقانة موزاريلا",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 190 },
      { name: "XL", price: 220 },
    ],
  },
  {
    id: 323,
    section: "pizza",
    name: "بيتزا تشيكن هالبينوش",
    desc: "دجاج مع شرائح هالبينو حار وصوص شيدر",
    sizes: [
      { name: "M", price: 165 },
      { name: "L", price: 195 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 324,
    section: "pizza",
    name: "بيتزا تشيكن بيكون",
    desc: "دجاج كرسبي مع بيف بيكون وصوص رانش شيدر",
    sizes: [
      { name: "M", price: 165 },
      { name: "L", price: 195 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 325,
    section: "pizza",
    name: "بيتزا تونة",
    desc: "قطع تونة فاخرة، بصل، فلفل ألوان وزيتون وجبنة",
    sizes: [
      { name: "M", price: 185 },
      { name: "L", price: 205 },
      { name: "XL", price: 245 },
    ],
  },
  {
    id: 326,
    section: "pizza",
    name: "بيتزا بسطرمة",
    desc: "بسطرمة بلدي مع موزاريلا وزيتون أخضر",
    sizes: [
      { name: "M", price: 195 },
      { name: "L", price: 225 },
      { name: "XL", price: 255 },
    ],
  },
  {
    id: 327,
    section: "pizza",
    name: "بيتزا جمبري",
    desc: "جمبري كرسبي أو جريل متبل وموزاريلا فصوص",
    sizes: [
      { name: "M", price: 195 },
      { name: "L", price: 225 },
      { name: "XL", price: 255 },
    ],
  },
  {
    id: 328,
    section: "pizza",
    name: "بيتزا سي رانش",
    desc: "جمبري، سبيط مع صوص رانش وجبنة موزاريلا",
    sizes: [
      { name: "M", price: 205 },
      { name: "L", price: 235 },
      { name: "XL", price: 265 },
    ],
  },
  {
    id: 329,
    section: "pizza",
    name: "بيتزا فور سيزون",
    desc: "أربعة أقسام (لحوم، دجاج، أجبان، خضروات) في بيتزا واحدة",
    sizes: [
      { name: "M", price: 205 },
      { name: "L", price: 235 },
      { name: "XL", price: 265 },
    ],
  },
  {
    id: 330,
    section: "pizza",
    name: "بيتزا بيف بيكون",
    desc: "شرائح بيف بيكون مدخن وموزاريلا وتكساس",
    sizes: [
      { name: "M", price: 180 },
      { name: "L", price: 220 },
      { name: "XL", price: 230 },
    ],
  },
  {
    id: 331,
    section: "pizza",
    name: "بيتزا ناشفيل",
    desc: "دجاج كرسبي مغطى بصوص ناشفيل الحار وشيدر",
    sizes: [
      { name: "M", price: 170 },
      { name: "L", price: 200 },
      { name: "XL", price: 230 },
    ],
  },
  {
    id: 332,
    section: "pizza",
    name: "بيتزا متر زرقاء",
    desc: "بيتزا عملاقة بطول متر تناسب اللمات والعائلات",
    sizes: [{ name: "XL", price: 550 }],
  },
  {
    id: 333,
    section: "pizza",
    name: "بيتزا بسطرمة كيري",
    desc: "بسطرمة بلدي غنية بقطع جبنة كيري وموزاريلا",
    sizes: [
      { name: "M", price: 190 },
      { name: "L", price: 220 },
      { name: "XL", price: 270 },
    ],
  },
  {
    id: 334,
    section: "pizza",
    name: "بيتزا سجق كيري",
    desc: "سجق بلدي مع قطع كيري كريمي وموزاريلا",
    sizes: [
      { name: "M", price: 170 },
      { name: "L", price: 200 },
      { name: "XL", price: 240 },
    ],
  },
  {
    id: 335,
    section: "pizza",
    name: "بيتزا سي فوود",
    desc: "جمبري وسبيط وتونة مع بهارات سي فود",
    sizes: [{ name: "L", price: 240 }],
  },

  // === PASTA ===
  {
    id: 401,
    section: "pasta",
    name: "باستا مكس جبن",
    desc: "مكرونة فرن غرقانة بصوص الأجبان الأربعة والموزاريلا",
    sizes: [
      { name: "M", price: 165 },
      { name: "L", price: 195 },
      { name: "XL", price: 215 },
    ],
  },
  {
    id: 402,
    section: "pasta",
    name: "باستا كرانشي رومي مدخن",
    desc: "مكرونة بقطع الدجاج كرسبي ورومي مدخن وشيدر",
    sizes: [
      { name: "M", price: 175 },
      { name: "L", price: 205 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 403,
    section: "pasta",
    name: "باستا تشيكن فريش",
    desc: "مكرونة بصدور دجاج طازجة مشوية وصوص أبيض",
    sizes: [
      { name: "M", price: 175 },
      { name: "L", price: 205 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 404,
    section: "pasta",
    name: "باستا تشيكن رانش",
    desc: "قطع كرسبي مع صوص رانش غني وموزاريلا سايحة",
    sizes: [
      { name: "M", price: 175 },
      { name: "L", price: 205 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 405,
    section: "pasta",
    name: "باستا تشيكن باربيكيو",
    desc: "صدور دجاج بصوص الباربيكيو المميز وجبنة موزاريلا",
    sizes: [
      { name: "M", price: 175 },
      { name: "L", price: 205 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 406,
    section: "pasta",
    name: "باستا تشيكن تكساس",
    desc: "قطع دجاج كرسبي مع صوص تكساس هالبينو شيدر",
    sizes: [
      { name: "M", price: 175 },
      { name: "L", price: 205 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 407,
    section: "pasta",
    name: "باستا شيش فحم",
    desc: "مكرونة بقطع شيش طاووق مشوي على الفحم ونكهة مدخنة",
    sizes: [
      { name: "M", price: 175 },
      { name: "L", price: 205 },
      { name: "XL", price: 235 },
    ],
  },
  {
    id: 408,
    section: "pasta",
    name: "باستا مكس فراخ",
    desc: "ميكس صدور دجاج كرسبي وشيش جريل مع صوصات",
    sizes: [
      { name: "M", price: 175 },
      { name: "L", price: 205 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 409,
    section: "pasta",
    name: "باستا سوبر سوبريم فراخ",
    desc: "دجاج، زيتون، فلفل ألوان، صوص أبيض وموزاريلا مغطاة",
    sizes: [
      { name: "M", price: 175 },
      { name: "L", price: 205 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 410,
    section: "pasta",
    name: "باستا سوبر سوبريم لحوم",
    desc: "لحم مفروم، بيبيروني، هوت دوج متبل وجبن فرن",
    sizes: [
      { name: "M", price: 175 },
      { name: "L", price: 205 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 411,
    section: "pasta",
    name: "باستا فاهيتا",
    desc: "مكرونة بفاهيتا دجاج جريل خضار وصوصات مكسيكية",
    sizes: [
      { name: "M", price: 175 },
      { name: "L", price: 205 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 412,
    section: "pasta",
    name: "باستا تشيكن هالبينو",
    desc: "دجاج حار كرسبي مع قطع هالبينو شطة وصوص شيدر فرن",
    sizes: [
      { name: "M", price: 175 },
      { name: "L", price: 205 },
      { name: "XL", price: 225 },
    ],
  },
  {
    id: 413,
    section: "pasta",
    name: "باستا جمبري",
    desc: "مكرونة بجمبري جريل فصوص بصوص الكريمة الفاخرة",
    sizes: [
      { name: "M", price: 195 },
      { name: "L", price: 225 },
      { name: "XL", price: 255 },
    ],
  },

  // === SANDWICH ROLLS ===
  {
    id: 501,
    section: "rolls",
    name: "رول تشيكن تركي مدخن",
    desc: "رول ساندوتش زنجر مع تركي مدخن وموزاريلا",
    price: 180,
  },
  {
    id: 502,
    section: "rolls",
    name: "رول تشيكن رانش مدخن",
    desc: "رول دجاج كرسبي مع صوص رانش غني مدخن",
    price: 180,
  },
  {
    id: 503,
    section: "rolls",
    name: "رول شيش طاووق",
    desc: "رول محشو بقطع شيش جريل خضروات ثومية",
    price: 180,
  },
  {
    id: 504,
    section: "rolls",
    name: "رول زنجر حار",
    desc: "رول محشو بزنجر حار جداً وهالبينو وشيدر صوص",
    price: 180,
  },
  {
    id: 505,
    section: "rolls",
    name: "رول ميكس فراخ",
    desc: "رول غني بمزيج من أنواع الفراخ كرسبي وشيش",
    price: 190,
  },

  // === ITALIAN HAWAWSHI ===
  {
    id: 601,
    section: "hawawshi",
    name: "حواوشي كرانشي تركي مدخن",
    desc: "حواوشي إيطالي بعجينة مميزة وكرسبي وتركي",
    sizes: [
      { name: "M", price: 170 },
      { name: "L", price: 200 },
      { name: "XL", price: 230 },
    ],
  },
  {
    id: 602,
    section: "hawawshi",
    name: "حواوشي تشيكن رانش",
    desc: "عجينة إيطالية مخبوزة محشوة دجاج وصوص رانش جبن",
    sizes: [
      { name: "M", price: 170 },
      { name: "L", price: 200 },
      { name: "XL", price: 230 },
    ],
  },
  {
    id: 603,
    section: "hawawshi",
    name: "حواوشي مكس فراخ",
    desc: "حشوة كرسبي وشيش طاووق وجبن موزاريلا بالفرن",
    sizes: [
      { name: "M", price: 170 },
      { name: "L", price: 200 },
      { name: "XL", price: 230 },
    ],
  },
  {
    id: 604,
    section: "hawawshi",
    name: "حواوشي مفروم بلدي",
    desc: "لحم مفروم بلدي متبل على الطريقة الإيطالية بالجبنة",
    sizes: [
      { name: "M", price: 170 },
      { name: "L", price: 200 },
      { name: "XL", price: 230 },
    ],
  },

  // === MELTED CHEESE ===
  {
    id: 701,
    section: "melted_cheese",
    name: "غرقانة جبنة بطاطس",
    desc: "بطاطس مقلية غرقانة بصوص الجبنة الشيدر السايحة والموزاريلا",
    sizes: [
      { name: "M", price: 130 },
      { name: "L", price: 155 },
    ],
  },
  {
    id: 702,
    section: "melted_cheese",
    name: "غرقانة جبنة استربس",
    desc: "قطع استربس كرسبي غرقانة بصوص الشيدر والجبن السايحة",
    sizes: [
      { name: "M", price: 155 },
      { name: "L", price: 175 },
    ],
  },
  {
    id: 703,
    section: "melted_cheese",
    name: "غرقانة جبنة شيش طاووق",
    desc: "قطع شيش مشوية غارقة بالكامل في صوص الجبن الساخن",
    sizes: [
      { name: "M", price: 170 },
      { name: "L", price: 185 },
    ],
  },
  {
    id: 704,
    section: "melted_cheese",
    name: "غرقانة جبنة سوسيس",
    desc: "هوت دوج مقطع غرقان صوص شيدر سايح وموزاريلا بالفرن",
    sizes: [
      { name: "M", price: 130 },
      { name: "L", price: 155 },
    ],
  },
  {
    id: 705,
    section: "melted_cheese",
    name: "غرقانة جبنة تشيكن هالبينو",
    desc: "صدور دجاج كرسبي حارة مع هالبينو وغارقة بصوص الجبن",
    sizes: [
      { name: "M", price: 160 },
      { name: "L", price: 175 },
    ],
  },
  {
    id: 706,
    section: "melted_cheese",
    name: "غرقانة جبنة سوسيس ع شيش",
    desc: "ميكس هوت دوج وشيش مشوي غارقان في الجبنة السايحة",
    sizes: [
      { name: "M", price: 170 },
      { name: "L", price: 185 },
    ],
  },
  {
    id: 707,
    section: "melted_cheese",
    name: "غرقانة جبنة زنجر ع شيش",
    desc: "زنجر حار جداً وشيش طاووق مع فيضان صوص شيدر سايح",
    sizes: [
      { name: "M", price: 175 },
      { name: "L", price: 195 },
    ],
  },
  {
    id: 708,
    section: "melted_cheese",
    name: "غرقانة جبنة مكس لحوم",
    desc: "برجر وهوت دوج وسجق غارقة بالكامل بصوص الجبن الساخن",
    sizes: [
      { name: "M", price: 175 },
      { name: "L", price: 195 },
    ],
  },

  // === EXTRAS (الإضافات زي ما هي في المنيو الورقي) ===
  {
    id: 801,
    section: "extras",
    name: "باكت بطاطس",
    desc: "بطاطس مقلية مقرمشة",
    sizes: [
      { name: "صغير", price: 30 },
      { name: "وسط", price: 50 },
      { name: "كبير", price: 70 },
    ],
  },
  {
    id: 802,
    section: "extras",
    name: "باكت بطاطس شيدر",
    image:  extrasFallbackImages.fries,
    images: [
      extrasFallbackImages.fries,
    ],
    desc: "بطاطس مقلية بصوص الشيدر",
    sizes: [
      { name: "صغير", price: 75 },
      { name: "كبير", price: 95 },
    ],
  },
  {
    id: 803,
    section: "extras",
    name: "حلقات بصل",
    desc: "أونيون رينجز مقرمش",
    sizes: [
      { name: "صغير", price: 70 },
      { name: "كبير", price: 90 },
    ],
  },
  {
    id: 804,
    section: "extras",
    name: "موتزريلا ستيكس",
    desc: "أصابع موتزريلا مقلية",
    price: 60,
  },
  {
    id: 805,
    section: "extras",
    name: "صوص رانش",
    desc: "علبة صوص رانش",
    price: 30,
  },
  {
    id: 806,
    section: "extras",
    name: "صوص باربيكيو",
    desc: "علبة صوص باربيكيو",
    price: 30,
  },
  {
    id: 807,
    section: "extras",
    name: "صوص تكساسي",
    desc: "علبة صوص تكساسي",
    price: 30,
  },
  {
    id: 808,
    section: "extras",
    name: "بيبسي كانز",
    desc: "مشروب غازي مثلج",
    price: 20,
  },
  {
    id: 809,
    section: "extras",
    name: "بيبسي لتر",
    desc: "زجاجة 1 لتر",
    price: 40,
  },
  {
    id: 810,
    section: "extras",
    name: "مياه صغيرة",
    desc: "زجاجة مياه صغيرة",
    price: 10,
  },
  {
    id: 811,
    section: "extras",
    name: "مياه كبيرة",
    desc: "زجاجة مياه كبيرة",
    price: 20,
  },
];

// الإضافات المتاحة جوه الصنف — منقولة زي ما هي من قسم "الإضافات" في المنيو الورقي




export function getSectionItemIndex(item: MenuItem): number {
  return menuData
    .filter((menuItem) => menuItem.section === item.section)
    .findIndex((menuItem) => menuItem.id === item.id);
}

export function getProductImage(item: MenuItem): string {
  if (
    item.section === "crepes" &&
    (!item.image || item.image.startsWith(productImageBasePath))
  ) {
    return crepeFallbackImage;
  }

  if (item.section === "pizza" && !item.image) {
    const index = getSectionItemIndex(item);
    return pizzaFallbackImages[index % pizzaFallbackImages.length];
  }

  if (item.section === "burgers" && item.image?.startsWith(productImageBasePath)) {
    const index = getSectionItemIndex(item);
    return burgerFallbackImages[index % burgerFallbackImages.length];
  }

  if (item.section === "pasta") return pastaFallbackImage;

  if (item.section === "rolls") return rollsFallbackImage;

  if (item.section === "hawawshi") return hawawshiFallbackImage;

  if (item.section === "melted_cheese") return meltedCheeseFallbackImage;

  if (item.section === "extras" && !item.image) {
    if (item.name.includes("شيدر")) return extrasFallbackImages.cheddarFries;
    if (item.name.includes("بطاطس")) return extrasFallbackImages.fries;
    if (item.name.includes("بصل")) return extrasFallbackImages.onionRings;
    if (item.name.includes("موتزريلا")) return extrasFallbackImages.mozzarella;
    if (item.name.includes("رانش")) return extrasFallbackImages.ranch;
    if (item.name.includes("باربيكيو")) return extrasFallbackImages.barbecue;
    if (item.name.includes("تكساسي")) return extrasFallbackImages.texas;
    if (item.name.includes("كانز")) return extrasFallbackImages.pepsiCan;
    if (item.name.includes("لتر")) return extrasFallbackImages.pepsiBottle;
    if (item.name.includes("صغيرة")) return extrasFallbackImages.smallWater;
    return extrasFallbackImages.largeWater;
  }

  if (item.image && item.image !== fallbackProductImage) return item.image;

  const searchableName = normalizeForImageMatching(
    `${item.section} ${item.name} ${item.desc || ""}`
  );
  const matchingImage = allProductImages.find((imagePath) => {
    const fileName = decodeURIComponent(imagePath.split("/").pop() || "");
    const normalizedFileName = normalizeForImageMatching(fileName);
    return (
      normalizedFileName.length > 4 &&
      searchableName.includes(normalizedFileName)
    );
  });

  if (matchingImage) return matchingImage;

  const list = imagesByCategory[item.section as keyof typeof imagesByCategory];
  if (!list || list.length === 0) return fallbackProductImage;

  const index = getSectionItemIndex(item);
  return list[Math.max(index, 0) % list.length];
}

export function getItemImages(item: MenuItem): string[] {
  if (item.images && item.images.length > 0) {
    return item.images;
  }
  if (item.image) {
    return [item.image];
  }
  const fallback = getProductImage(item);
  return fallback ? [fallback] : [];
}

export { menuData };
