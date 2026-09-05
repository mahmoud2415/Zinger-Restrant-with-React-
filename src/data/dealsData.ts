import { Deal } from '../types';
import { MenuItem } from '../types';

export function getDealImage(deal: Deal, menuItems: MenuItem[] = []): string {
  if (deal.coverType === 'product' && deal.sourceProductId) {
    return menuItems.find((item) => item.id === deal.sourceProductId)?.image || deal.image;
  }
  return deal.image;
}

export const initialDeals: Deal[] = [
  {
    id: "deal-1",
    titleEn: "MEGA ZINGER CRUNCH COMBO",
    titleAr: "عرض ميجا زنجر كومبو الأسطوري",
    descAr: "ساندوتش زنجر دبل سوبر كرانشي + بطاطس مقلية + كانز بيبسي مثلج + صوص شيدر سايح",
    badge: "SAVE 25%",
    price: 165,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&auto=format&fit=crop&q=80",
    code: "ZINGER25",
    isActive: true,
  },
  {
    id: "deal-2",
    titleEn: "TRIPLE SMASH BURGER BOX",
    titleAr: "بوكس التوفير تريبل بيف برجر",
    descAr: "3 ساندوتشات برجر لحم بلدي مشوي عالفحم مع صوص سموكي شيدر وخيار مخلل + لتر بيبسي",
    badge: "BESTSELLER ⭐",
    price: 290,
    originalPrice: 370,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&auto=format&fit=crop&q=80",
    code: "SMASH3",
    isActive: true,
  },
  {
    id: "deal-3",
    titleEn: "SUPREME CREPE & PIZZA DUO",
    titleAr: "عرض دويتو الكريب والبيتزا",
    descAr: "1 كريب سوبر كرانشي دجاج + 1 بيتزا تشيكن باربيكيو وسط + 2 كانز بيبسي",
    badge: "HOT OFFER 🔥",
    price: 240,
    originalPrice: 310,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&auto=format&fit=crop&q=80",
    code: "DUO30",
    isActive: true,
  },
];
