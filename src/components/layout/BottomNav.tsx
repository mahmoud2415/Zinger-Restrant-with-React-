import React from 'react';
import { useCart } from '../../context/CartContext';
import { useBranch } from '../../context/BranchContext';

export const BottomNav: React.FC = () => {
  const { totalItemCount, toggleCart } = useCart();
  const { selectedBranch, openBranchInfoModal } = useBranch();

  return (
    <nav className="fixed bottom-0 w-full z-50 rounded-t-3xl bg-white border-t border-gray-100 shadow-[0_-4px_25px_rgba(0,0,0,0.2)] flex justify-around items-center h-20 pb-safe px-4 transition-colors duration-300">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex flex-col items-center justify-center text-primary"
      >
        <span className="material-symbols-outlined">home</span>
        <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
      </button>

      <button
        type="button"
        className="relative flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        onClick={toggleCart}
      >
        <span className="material-symbols-outlined">shopping_cart</span>
        <span
          className={`absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-numeric transition-transform duration-300 ${
            totalItemCount > 0 ? 'scale-100' : 'scale-0'
          }`}
        >
          {totalItemCount}
        </span>
        <span className="text-[10px] mt-1">السلة</span>
      </button>

      {selectedBranch && (
        <a
          href={`tel:${selectedBranch.phone}`}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">phone</span>
          <span className="text-[10px] mt-1">اتصال</span>
        </a>
      )}

      {selectedBranch && (
        <button
          type="button"
          onClick={() => openBranchInfoModal(selectedBranch)}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">location_on</span>
          <span className="text-[10px] mt-1">المطعم</span>
        </button>
      )}
    </nav>
  );
};
