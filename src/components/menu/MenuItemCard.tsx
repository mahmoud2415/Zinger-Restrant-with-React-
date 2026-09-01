import React, { useState } from 'react';
import { MenuItem } from '../../types';
import { getProductImage } from '../../data/menuData';
import { useModal } from '../../context/ModalContext';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { openCustomizer } = useModal();
  const [imgSrc, setImgSrc] = useState<string>(() => getProductImage(item));

  // Determine starting price
  const hasMultipleSizes = item.sizes && item.sizes.length > 1;
  const startingPrice = item.sizes && item.sizes.length > 0
    ? Math.min(...item.sizes.map((s) => s.price))
    : (item.price || 0);

  return (
    <div className="menu-product-card rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 bg-white border border-[#eae7e7] shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image container */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#f5ebe8] mb-3">
        <img
          src={imgSrc}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          onError={() => setImgSrc('assets/placeholder.webp')}
        />
        {startingPrice > 0 && (
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-[#ffe16d] text-[11px] font-bold px-2 py-0.5 rounded-full font-numeric">
            {startingPrice} ج.م
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between text-right">
        <div>
          <h3 className="text-base font-black text-[#1c1b1b] mb-1 line-clamp-1">
            {item.name}
          </h3>
          {item.desc && (
            <p className="text-xs text-[#5b4039] leading-relaxed line-clamp-2 mb-3">
              {item.desc}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#f4ebe8]">
          <div className="text-primary font-black text-sm font-numeric">
            {hasMultipleSizes ? `يبدأ من ${startingPrice} ج.م` : `${startingPrice} ج.م`}
          </div>
          <button
            type="button"
            onClick={() => openCustomizer(item)}
            className="px-3.5 py-1.5 bg-primary text-white text-xs font-bold rounded-xl shadow hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1"
          >
            <span>اطلب</span>
            <span className="material-symbols-outlined text-xs">add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
