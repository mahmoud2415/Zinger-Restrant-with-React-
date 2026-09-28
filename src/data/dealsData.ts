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
    descAr: "قطعة برجر لحم مشوي + قرص موزاريلا تكساس مقلي + صوص جبنة سايح + بطاطس",
    badge: "عرض خاص 🔥",
    price: 180,
    originalPrice: 220,
    image: "/menu_items/burgers/extra_mile.jpeg",
    showInBanner: true,
    allowSpice: true,
    isActive: true,
  },
  {
    id: "deal-1790125747130",
    titleAr: "عرض كريب ديناميت",
    descAr: "كريب سوبر كرانشي دجاج مع صوص الرانش والموتزاريلا الغنية + بطاطس",
    badge: "توفير كريب ⭐",
    price: 140,
    originalPrice: 175,
    image: "/menu_items/crepes/crepe-super-crunchy.jpeg",
    showInBanner: true,
    allowSpice: true,
    isActive: true,
  },
  {
    id: "deal-1790125820929",
    titleAr: "عرض نجرسكو",
    descAr: "طاجن مكرونة نجرسكو دجاج فريش مع الوايت صوص والموتزاريلا المحمرة",
    badge: "عرض طاجن",
    price: 175,
    originalPrice: 210,
    image: "/menu_items/pasta/pasta-supreme-chicken.jpeg",
    showInBanner: true,
    allowSpice: false,
    isActive: true,
  },
  {
    id: "deal-1790125928522",
    titleAr: "عرض بيتزا سوبر سوبريم",
    descAr: "بيتزا سوبريم حجم كبير غرقانة موتزاريلا ولحوم وخضار طازج",
    badge: "عرض التوفير",
    price: 190,
    originalPrice: 230,
    image: "/menu_items/pizza/pizza-supreme-meat.jpeg",
    showInBanner: true,
    allowSpice: false,
    isActive: true,
  },
];
