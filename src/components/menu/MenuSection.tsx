import React from 'react';
import { Category, MenuItem } from '../../types';
import { MenuItemCard } from './MenuItemCard';

interface MenuSectionProps {
  category: Category;
  items: MenuItem[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({ category, items }) => {
  if (items.length === 0) return null;

  return (
    <section id={`section-${category.id}`} className="menu-section px-margin-mobile mt-8">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#e4beb4]/50">
        <span className="material-symbols-outlined text-primary text-2xl">
          {category.icon}
        </span>
        <h2 className="text-xl font-black text-[#1c1b1b]">{category.name}</h2>
        <span className="text-xs text-gray-400 mr-auto font-numeric">
          ({items.length} صنف)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
