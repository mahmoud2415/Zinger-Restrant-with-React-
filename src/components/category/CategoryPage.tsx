import React from 'react';
import { Category, MenuItem } from '../../types';
import { Home, Tag } from 'lucide-react';
import { FoodCard } from '../menu/FoodCard';

interface CategoryPageProps {
  category: Category;
  categories: Category[];
  items: MenuItem[];
  onBack: () => void;
  onHome: () => void;
  onOpenDeals: () => void;
  onSelectCategory: (catId: string) => void;
  onOpenProduct: (item: MenuItem) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  categories,
  items,
  onHome,
  onOpenDeals,
  onSelectCategory,
  onOpenProduct,
}) => {
  return (
    <div className="min-h-screen bg-zinger-bg text-white pb-28 animate-fade-in" dir="rtl">
      {/* Top Header */}
      <div className="sticky top-0 z-40 bg-zinger-bg/95 backdrop-blur-xl border-b border-zinc-800 px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinger-card hover:bg-zinc-800 border border-zinc-700 text-xs font-cairo font-bold text-white transition-all active:scale-95 shadow-sm"
          >
            <Home className="w-4 h-4 text-zinger-yellow" />
            <span>الرئيسية</span>
          </button>

          <button
            onClick={onOpenDeals}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinger-card hover:bg-zinc-800 border border-zinc-700 text-xs font-cairo font-bold text-zinger-yellow transition-all active:scale-95 shadow-sm"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>العروض</span>
          </button>
        </div>

        <div className="text-left">
          <h2 className="font-cairo font-black text-sm sm:text-base text-zinger-yellow">
            {category.nameAr}
          </h2>
        </div>
      </div>

      {/* Category Horizontal Quick Switcher */}
      <div className="px-4 py-3 border-b border-zinc-900 bg-zinc-950/60 overflow-x-auto no-scrollbar flex items-center gap-2">
        {categories
          .filter((c) => c.id !== 'deals')
          .map((c) => {
            const isCurrent = c.id === category.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCategory(c.id)}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-cairo font-bold transition-all ${
                  isCurrent
                    ? 'bg-zinger-yellow text-black shadow-glow-yellow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {c.nameAr}
              </button>
            );
          })}
      </div>

      {/* Category Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div>
            <h1 className="font-cairo font-black text-xl sm:text-2xl text-white">
              {category.nameAr}
            </h1>
            <p className="font-cairo text-xs sm:text-sm text-zinc-400">
              قائمة وجبات {category.nameAr} من مطعم زينجر
            </p>
          </div>

          <span className="text-xs font-cairo font-bold text-zinc-400">
            {items.length} أصناف
          </span>
        </div>

        {/* Grid of Food Items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onOpenCustomizer={(it) => onOpenProduct(it)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
