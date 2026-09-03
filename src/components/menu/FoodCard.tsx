import React from 'react';
import { MenuItem } from '../../types';
import { Plus, Flame, Sparkles, Share2, EyeOff } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

import { shareContent } from '../../utils/share';

interface FoodCardProps {
  item: MenuItem;
  onOpenCustomizer: (item: MenuItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onOpenCustomizer }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleCardClick = () => {
    onOpenCustomizer(item);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.isAvailable) return;

    if ((item.sizes && item.sizes.length > 0) || item.allowSpice) {
      onOpenCustomizer(item);
    } else {
      addToCart(item, undefined, undefined, 1);
      showToast(`تمت إضافة ${item.nameAr} إلى السلة! 🔥`);
    }
  };

  const handleShareItem = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareTitle = `${item.nameEn} | ${item.nameAr} من مطعم زينجر`;
    const shareText = `شوف وجبة ${item.nameAr} من مطعم زينجر بسعر ${item.basePrice} ج.م فقط! 🔥`;
    const shareUrl = `${window.location.origin}${window.location.pathname}#/product/${item.id}`;

    const result = await shareContent({
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    });

    if (result === 'copied') {
      showToast(`تم نسخ رابط وجبة ${item.nameAr} لمشاركتها! 🔥`);
    }
  };

  return (
    <div
      id={`item-${item.id}`}
      onClick={handleCardClick}
      className={`group relative rounded-2xl bg-zinger-card border border-zinger-border hover:border-zinger-yellow/50 transition-all duration-300 overflow-hidden flex flex-col justify-between food-card-shadow cursor-pointer select-none ${
        !item.isAvailable ? 'opacity-60 grayscale-[0.4]' : ''
      }`}
    >
      {/* Top Image & Badges */}
      <div className="relative aspect-[16/11] w-full bg-zinc-950 overflow-hidden">
        <img
          src={item.image}
          alt={item.nameAr}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10">
          {item.badge ? (
            <span className="px-2 py-0.5 rounded-full bg-zinger-yellow text-black font-heading font-black text-[10px] tracking-wider uppercase shadow-glow-yellow-sm flex items-center gap-1">
              {item.badge === 'HOT' && <Flame className="w-3 h-3 fill-black text-black" />}
              {item.badge === 'BESTSELLER' && <Sparkles className="w-3 h-3 text-black" />}
              {item.badge}
            </span>
          ) : (
            <span />
          )}

          {/* Share Button */}
          <button
            onClick={handleShareItem}
            title="Share Meal"
            className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/15 text-zinc-200 hover:text-zinger-yellow transition-all active:scale-90"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Out of Stock Overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center gap-1 text-center p-2 z-10">
            <EyeOff className="w-6 h-6 text-zinger-red" />
            <span className="text-xs font-heading font-black text-zinger-red uppercase tracking-wider">
              OUT OF STOCK
            </span>
            <span className="text-[11px] text-zinc-300 font-cairo">غير متوفر حالياً</span>
          </div>
        )}
      </div>

      {/* Content & Details */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Title: Arabic Only in Strong Font */}
          <h3 className="font-cairo font-black text-sm sm:text-base text-white line-clamp-1">
            {item.nameAr}
          </h3>
        </div>

        {/* Bottom Price & Action */}
        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-zinc-800/80 mt-auto">
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="font-heading font-black text-lg sm:text-xl text-zinger-yellow">
              {item.basePrice}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-zinc-400 font-cairo">ج.م</span>
          </div>

          {/* Action Button: Plus Icon only */}
          {item.isAvailable && (
            <button
              onClick={handleQuickAdd}
              title="Add / Customize Meal"
              className="w-8 h-8 rounded-full bg-zinger-yellow hover:bg-zinger-yellowHover text-black flex items-center justify-center shadow-glow-yellow-sm active:scale-90 transition-all font-black shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
