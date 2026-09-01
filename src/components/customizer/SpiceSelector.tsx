import React from 'react';

interface SpiceSelectorProps {
  spiceLevel: string;
  onChangeSpice: (level: string) => void;
}

export const SpiceSelector: React.FC<SpiceSelectorProps> = ({
  spiceLevel,
  onChangeSpice,
}) => {
  return (
    <div className="text-right">
      <label className="text-sm font-bold flex items-center gap-2 mb-3 text-[#1c1b1b]">
        <span
          className="material-symbols-outlined text-primary"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          local_fire_department
        </span>
        <span>مستوى الشطة</span>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChangeSpice('عادي')}
          className={`py-3 rounded-xl border text-sm font-bold transition-all ${
            spiceLevel === 'عادي'
              ? 'bg-primary text-white border-primary shadow-sm'
              : 'bg-white border-gray-200 text-[#1c1b1b] hover:border-primary'
          }`}
        >
          عادي
        </button>
        <button
          type="button"
          onClick={() => onChangeSpice('حار 🔥')}
          className={`py-3 rounded-xl border text-sm font-bold transition-all ${
            spiceLevel === 'حار 🔥'
              ? 'bg-primary text-white border-primary shadow-sm'
              : 'bg-white border-gray-200 text-[#1c1b1b] hover:border-primary'
          }`}
        >
          حار 🔥
        </button>
      </div>
    </div>
  );
};
