import { Deal } from '../types';
import { MenuItem } from '../types';

export function getDealImage(deal: Deal, menuItems: MenuItem[] = []): string {
  if (deal.coverType === 'product' && deal.sourceProductId) {
    return menuItems.find((item) => item.id === deal.sourceProductId)?.image || deal.image;
  }
  return deal.image;
}

export const initialDeals: Deal[] = [];
