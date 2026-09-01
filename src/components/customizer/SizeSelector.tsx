import React from 'react';
import { SizeOption } from '../../types';

interface SizeSelectorProps {
  sizes: SizeOption[];
  selectedSize: SizeOption | null;
  onSelectSize: (size: SizeOption) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
}) => {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="text-right">
      <label className="block text-sm font-bold mb-3 text-[#1c1b1b]">الحجم</label>
      <div className={`grid ${sizes.length > 1 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1'} gap-3`}>
        {sizes.map((size, idx) => {
          const isSelected = selectedSize?.name === size.name;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-primary text-white border-primary shadow-md scale-[1.02]'
                  : 'bg-white border-[#e4beb4] text-[#1c1b1b] hover:border-primary'
              }`}
            >
              <span className="text-xs font-bold">{size.name}</span>
              <span className={`text-sm font-black font-numeric mt-1 ${isSelected ? 'text-white' : 'text-primary'}`}>
                {size.price} ج.م
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
