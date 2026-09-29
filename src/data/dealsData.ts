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
    id: "deal-1790125529271",
    titleAr: "عرض برجر إكسترا مايل",
    descAr: " ساندوتش برجر إكسترا مايل + بطاطس مقلية",
    badge: "عرض خاص",
    price: 150,
    image: "/covers/real_deal_deal-1790125529271.jpeg",
    coverType: "custom",
    showInBanner: true,
    isActive: true,
  },
  {
    id: "deal-1790125747130",
    titleAr: "عرض كريب ديناميت",
    descAr: " كريب ديناميت + بطاطس + كانز بيبسي",
    badge: "عرض خاص",
    price: 150,
    image: "/covers/real_deal_deal-1790125747130.jpeg",
    coverType: "custom",
    showInBanner: true,
    isActive: true,
  },
  {
    id: "deal-1790125820929",
    titleAr: "عرض نجرسكو",
    descAr: "نجرسكو ميديم (طاجن مكرونة بصوص الوايت صوص وجبن موتزاريلا محمرة)",
    badge: "عرض خاص",
    price: 100,
    image: "/covers/real_deal_deal-1790125820929.jpeg",
    coverType: "custom",
    showInBanner: true,
    isActive: true,
  },
  {
    id: "deal-1790125928522",
    titleAr: "عرض بيتزا سوبر سوبريم",
    descAr: " بيتزا سوبر سوبريم + بطاطس + كانز بيبسي",
    badge: "عرض خاص",
    price: 160,
    image: "/covers/real_deal_deal-1790125928522.jpeg",
    coverType: "custom",
    showInBanner: true,
    isActive: true,
  },
];
