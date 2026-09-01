import React, { useRef, useEffect } from 'react';
import { Category } from '../../types';

interface CategoryNavProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Auto-scroll the active tab into view horizontally
    if (containerRef.current) {
      const activeBtn = containerRef.current.querySelector(
        `[data-category-id="${activeCategoryId}"]`
      ) as HTMLElement | null;
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [activeCategoryId]);

  return (
    <div
      ref={containerRef}
      className="flex gap-2 overflow-x-auto no-scrollbar px-margin-mobile py-1"
    >
      {categories.map((cat) => {
        const isActive = cat.id === activeCategoryId;
        return (
          <button
            key={cat.id}
            data-category-id={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all active:scale-95 ${
              isActive
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white border border-[#eae7e7] text-on-surface-variant hover:text-primary hover:bg-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
