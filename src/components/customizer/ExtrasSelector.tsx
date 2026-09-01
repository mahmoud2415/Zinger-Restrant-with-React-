import React from 'react';
import { ExtraOption } from '../../types';

interface ExtrasSelectorProps {
  extras: ExtraOption[];
  selectedExtras: ExtraOption[];
  onToggleExtra: (extra: ExtraOption) => void;
}

export const ExtrasSelector: React.FC<ExtrasSelectorProps> = ({
  extras,
  selectedExtras,
  onToggleExtra,
}) => {
  if (!extras || extras.length === 0) return null;

  return (
    <div className="text-right">
      <label className="block text-sm font-bold mb-3 text-[#1c1b1b]">الإضافات</label>
      <div className="space-y-2.5">
        {extras.map((extra, idx) => {
          const isSelected = selectedExtras.some((e) => e.name === extra.name);
          return (
            <label
              key={idx}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-primary/5 border-primary text-primary font-bold'
                  : 'bg-white border-[#eae7e7] text-[#1c1b1b] hover:border-primary'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleExtra(extra)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300 accent-primary cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-bold">{extra.name}</span>
              </div>
              <span className="text-xs font-black font-numeric text-primary">
                +{extra.price} ج.م
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
