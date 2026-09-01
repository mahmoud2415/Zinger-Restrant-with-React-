import React from 'react';
import { CartItem } from '../../types';
import { getProductImage } from '../../data/menuData';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (delta: number) => void;
  onRemove: () => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const imgSrc = item.item.image || getProductImage(item.item);

  return (
    <div className="bg-white border border-[#eae7e7] p-3.5 rounded-2xl flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow text-right">
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f5ebe8] flex-shrink-0">
        <img
          src={imgSrc}
          alt={item.item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'assets/placeholder.webp';
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-black text-[#1c1b1b] line-clamp-1">
            {item.item.name}
          </h4>
          <button
            type="button"
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
            aria-label="حذف الصنف"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>

        {/* Options tags */}
        <div className="flex flex-wrap gap-1 mt-1 mb-2">
          {item.selectedSize?.name && (
            <span className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-md font-bold">
              {item.selectedSize.name}
            </span>
          )}
          {item.spiceLevel && (
            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-md font-bold">
              {item.spiceLevel}
            </span>
          )}
          {item.selectedExtras.map((e, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded-md font-bold"
            >
              +{e.name}
            </span>
          ))}
        </div>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between mt-1">
          <div className="text-primary font-black text-sm font-numeric">
            {item.totalPrice} ج.م
          </div>

          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2 py-1">
            <button
              type="button"
              onClick={() => onUpdateQuantity(-1)}
              className="w-5 h-5 flex items-center justify-center text-primary font-bold text-sm hover:bg-white rounded transition-colors"
            >
              -
            </button>
            <span className="text-xs font-black font-numeric text-[#1c1b1b] w-4 text-center">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(1)}
              className="w-5 h-5 flex items-center justify-center text-green-600 font-bold text-sm hover:bg-white rounded transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
