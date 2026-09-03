import React from 'react';
import { Category, MenuItem } from '../../types';
import { ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
  menuItems: MenuItem[];
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  menuItems,
  onSelectCategory,
}) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-5 bg-zinger-yellow rounded-full inline-block shadow-glow-yellow-sm" />
          <h2 className="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-tight">
            MENU CATEGORIES
          </h2>
        </div>
      </div>

      {/* Grid of Visual Category Covers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {categories
          .filter((cat) => cat.id !== 'deals')
          .map((cat) => {
            const count = menuItems.filter((i) => i.category === cat.id).length;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative aspect-[16/9] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-zinc-950 border border-zinger-border hover:border-zinger-yellow/70 transition-all duration-300 shadow-card-dark cursor-pointer select-none active:scale-[0.98]"
            >
              {/* Category Cover Image */}
              <img
                src={cat.coverImage}
                alt={cat.nameAr}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80';
                }}
              />

              {/* Items Counter Badge (Top Right) */}
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono font-bold text-white uppercase">
                  {count} ITEMS
                </span>
              </div>

              {/* Content (Bottom) */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between gap-2">
                <div className="bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/10">
                  <h3 className="font-cairo font-black text-sm sm:text-base text-white group-hover:text-zinger-yellow transition-colors line-clamp-1">
                    {cat.nameAr}
                  </h3>
                </div>

                <div className="w-8 h-8 rounded-xl bg-zinger-yellow text-black flex items-center justify-center shrink-0 shadow-glow-yellow-sm group-hover:scale-105 transition-all">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
