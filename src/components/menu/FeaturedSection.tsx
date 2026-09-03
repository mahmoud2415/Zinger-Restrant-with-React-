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
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-5 bg-zinger-yellow rounded-full inline-block shadow-glow-yellow-sm" />
          <h2 className="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-tight flex items-center gap-1.5">
            BESTSELLERS & HOT PICKS
            <Flame className="w-4 h-4 text-zinger-red fill-zinger-red" />
          </h2>
          <span className="text-xs sm:text-sm font-cairo text-zinger-yellow font-bold">
            (الأكثر طلباً)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
