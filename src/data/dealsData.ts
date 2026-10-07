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
    image: "https://res.cloudinary.com/ugjfjtt8/image/upload/v1791375380/zinger_deals/df8momdhbonq7fergq9f.jpg",
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
    image: "https://res.cloudinary.com/ugjfjtt8/image/upload/v1791375381/zinger_deals/uoxtwvsqqn6h7jvicaps.jpg",
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
    image: "https://res.cloudinary.com/ugjfjtt8/image/upload/v1791375382/zinger_deals/ozeqenpusxwx9lcuualg.jpg",
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
    image: "https://res.cloudinary.com/ugjfjtt8/image/upload/v1791375384/zinger_deals/ogqjacagqylehyj6558x.jpg",
    coverType: "custom",
    showInBanner: true,
    isActive: true,
  },
];
