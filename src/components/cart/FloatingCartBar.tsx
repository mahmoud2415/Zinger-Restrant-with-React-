import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const FloatingCartBar: React.FC = () => {
  const { totalItemsCount, totalPrice, setIsCartOpen } = useCart();

  if (totalItemsCount === 0) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-4 right-4 z-40 max-w-lg mx-auto pb-safe">
      <button
        onClick={() => setIsCartOpen(true)}
        className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-zinger-yellow hover:bg-zinger-yellowHover text-black font-heading font-black shadow-glow-yellow transition-all duration-300 active:scale-[0.98] border border-black/10"
      >
        {/* Left: Item Counter */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-black text-zinger-yellow font-black text-sm">
            {totalItemsCount}
          </div>
          <div className="text-right">
            <span className="text-xs uppercase tracking-wider block font-black">
              VIEW CART
            </span>
            <span className="text-[11px] font-cairo font-bold opacity-80 block">
              عرض السلة والطلب
            </span>
          </div>
        </div>

        {/* Right: Total Price & Arrow */}
        <div className="flex items-center gap-2">
          <span className="font-heading font-black text-base sm:text-lg">
            {totalPrice} ج.م
          </span>
          <div className="w-7 h-7 rounded-lg bg-black/10 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-black" />
          </div>
        </div>
      </button>
    </div>
  );
};
