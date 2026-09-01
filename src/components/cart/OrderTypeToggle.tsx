import React from 'react';
import { OrderType } from '../../types';

interface OrderTypeToggleProps {
  orderType: OrderType;
  onSelectOrderType: (type: OrderType) => void;
}

export const OrderTypeToggle: React.FC<OrderTypeToggleProps> = ({
  orderType,
  onSelectOrderType,
}) => {
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-2xl p-1 flex gap-1">
      <button
        type="button"
        onClick={() => onSelectOrderType('delivery')}
        className={`flex-1 py-2.5 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 ${
          orderType === 'delivery'
            ? 'bg-primary text-white font-black shadow-md'
            : 'text-[#5b4039] hover:text-[#1c1b1b]'
        }`}
      >
        <span className="material-symbols-outlined text-base">motorcycle</span>
        <span>توصيل</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectOrderType('pickup')}
        className={`flex-1 py-2.5 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 ${
          orderType === 'pickup'
            ? 'bg-primary text-white font-black shadow-md'
            : 'text-[#5b4039] hover:text-[#1c1b1b]'
        }`}
      >
        <span className="material-symbols-outlined text-base">store</span>
        <span>استلام من المطعم بنفسي</span>
      </button>
    </div>
  );
};
