import React from 'react';
import { Category, MenuItem } from '../../types';
import { ArrowLeft } from 'lucide-react';
import { FoodCard } from '../menu/FoodCard';

interface CategoryPageProps {
  category: Category;
  categories: Category[];
  items: MenuItem[];
  onBack: () => void;
  onSelectCategory: (catId: string) => void;
  onOpenProduct: (item: MenuItem) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  categories,
  items,
  onBack,
  onSelectCategory,
  onOpenProduct,
}) => {
  return (
    <div className="min-h-screen bg-zinger-bg text-white pb-28 animate-fade-in">
      {/* Top Header */}
      <div className="sticky top-0 z-40 bg-zinger-bg/95 backdrop-blur-xl border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              onBack();
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinger-card hover:bg-zinc-800 border border-zinc-700 text-xs font-heading font-bold text-white transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ALL MENU</span>
        </button>

        <div className="text-right">
          <h2 className="font-heading font-black text-sm text-white uppercase tracking-tight">
            {category.nameEn}
          </h2>
          <span className="font-cairo text-xs text-zinger-yellow font-bold">
            {category.nameAr}
          </span>
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
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-heading font-bold uppercase transition-all ${
                  isCurrent
                    ? 'bg-zinger-yellow text-black shadow-glow-yellow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {c.nameEn}
              </button>
            );
          })}
      </div>

      {/* Category Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div>
            <h1 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
              {category.nameEn}
            </h1>
            <p className="font-cairo text-xs sm:text-sm text-zinc-400">
              قائمة وجبات {category.nameAr} من مطعم زينجر
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-zinc-500">
            {items.length} ITEMS
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
