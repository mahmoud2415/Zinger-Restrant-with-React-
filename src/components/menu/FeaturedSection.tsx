import React from 'react';
import { MenuItem } from '../../types';
import { Flame } from 'lucide-react';
import { FoodCard } from './FoodCard';

interface FeaturedSectionProps {
  items: MenuItem[];
  onOpenProduct: (item: MenuItem) => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  items,
  onOpenProduct,
}) => {
  // Filter only items with badges (Bestsellers / Hot / Chef Pick)
  const featured = items
    .filter((i) => i.badge && i.category !== 'extras')
    .slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className="space-y-3.5">
      <div className="flex items-center justify-center border-b border-zinc-800 pb-2.5">
        <h2 className="font-cairo font-black text-xl sm:text-2xl text-zinger-red flex items-center justify-center gap-2">
          <Flame className="w-5 h-5 text-zinger-red fill-zinger-red" />
          <span>الأكثر طلباً</span>
          <Flame className="w-5 h-5 text-zinger-red fill-zinger-red" />
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {featured.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            onOpenCustomizer={(it) => onOpenProduct(it)}
          />
        ))}
      </div>
    </section>
  );
};
