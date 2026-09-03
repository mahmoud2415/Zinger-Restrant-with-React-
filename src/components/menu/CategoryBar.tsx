import React from 'react';
import { Category } from '../../types';
import { 
  Sparkles, 
  Beef, 
  Drumstick, 
  Utensils, 
  Pizza, 
  ChefHat, 
  Layers, 
  Flame, 
  Zap, 
  PackagePlus, 
  Layers2 
} from 'lucide-react';

interface CategoryBarProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-4 h-4" />,
  Beef: <Beef className="w-4 h-4" />,
  Drumstick: <Drumstick className="w-4 h-4" />,
  Utensils: <Utensils className="w-4 h-4" />,
  Pizza: <Pizza className="w-4 h-4" />,
  ChefHat: <ChefHat className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  PackagePlus: <PackagePlus className="w-4 h-4" />,
};

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <nav className="sticky top-[61px] z-30 bg-zinger-bg/95 backdrop-blur-xl border-b border-zinger-border py-2.5 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
        {/* All Items Button */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            activeCategory === 'all'
              ? 'bg-zinger-yellow text-black shadow-glow-yellow-sm scale-[1.02]'
              : 'bg-zinger-card text-zinc-300 hover:text-white hover:bg-zinger-cardHover border border-zinger-border'
          }`}
        >
          <Layers2 className="w-4 h-4" />
          <span>ALL MENU</span>
        </button>

        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const icon = iconMap[cat.icon] || <Utensils className="w-4 h-4" />;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? 'bg-zinger-yellow text-black shadow-glow-yellow-sm scale-[1.02]'
                  : 'bg-zinger-card text-zinc-300 hover:text-white hover:bg-zinger-cardHover border border-zinger-border'
              }`}
            >
              <span className={isActive ? 'text-black' : 'text-zinger-yellow'}>
                {icon}
              </span>
              <span>{cat.nameEn}</span>
              <span className={`text-[11px] font-cairo ${isActive ? 'text-black/80' : 'text-zinc-500'}`}>
                ({cat.nameAr})
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
