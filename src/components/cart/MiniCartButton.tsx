import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const MiniCartButton: React.FC = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();

  if (totalItemsCount === 0) return null;

  return (
    <div className="fixed bottom-6 right-5 z-40 pb-safe animate-bounce-subtle">
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-zinger-yellow hover:bg-zinger-yellowHover text-black shadow-glow-yellow border-2 border-black/20 active:scale-90 transition-all duration-300"
        title="سلة الطلبات"
      >
        {/* Cart Icon */}
        <ShoppingCart className="w-6 h-6 stroke-[2.5]" />

        {/* Counter Badge on Top-Right */}
        <span className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1 rounded-full bg-zinger-red text-white font-mono font-black text-xs flex items-center justify-center border-2 border-zinger-bg shadow-md">
          {totalItemsCount}
        </span>
      </button>
    </div>
  );
};
