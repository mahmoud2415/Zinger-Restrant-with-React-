import React from 'react';
import { MenuItem } from '../../types';
import { Plus, Flame, Sparkles, Share2 } from 'lucide-react';
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

    if ((item.sizes && item.sizes.length > 0) || item.allowSpice) {
      onOpenCustomizer(item);
    } else {
      addToCart(item, undefined, undefined, 1);
      showToast(`تمت إضافة ${item.nameAr} إلى السلة! 🔥`);
    }
  };

  const handleShareItem = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareTitle = `${item.nameAr} من مطعم زينجر`;
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
      className="group relative rounded-2xl bg-zinger-card border border-zinger-border hover:border-zinger-yellow/50 transition-all duration-300 overflow-hidden flex flex-row items-stretch p-3 gap-3.5 food-card-shadow cursor-pointer select-none"
    >
      {/* 1. Right Side: Image & Badges & Share (first child in RTL = right) */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 aspect-square rounded-xl bg-zinc-950 overflow-hidden shrink-0 self-center">
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

        {/* Badge Overlay */}
        {item.badge && (
          <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-zinger-yellow text-black font-heading font-black text-[9px] tracking-wider uppercase shadow-glow-yellow-sm flex items-center gap-0.5 z-10">
            {item.badge === 'HOT' && <Flame className="w-2.5 h-2.5 fill-black text-black" />}
            {item.badge === 'BESTSELLER' && <Sparkles className="w-2.5 h-2.5 text-black" />}
            {item.badge}
          </span>
        )}

        {/* Share Button */}
        <button
          onClick={handleShareItem}
          title="مشاركة الوجبة"
          className="absolute bottom-1.5 left-1.5 p-1.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/15 text-zinc-200 hover:text-zinger-yellow transition-all active:scale-90 z-10"
        >
          <Share2 className="w-3 h-3" />
        </button>
      </div>

      {/* 2. Left Side: Meal Details, Description, Price & Actions */}
      <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
        <div>
          {/* Item Title */}
          <h3 className="font-cairo font-black text-sm sm:text-base text-white line-clamp-1 leading-snug group-hover:text-zinger-yellow transition-colors">
            {item.nameAr}
          </h3>

          {/* Item Ingredients / Description */}
          {item.descAr && (
            <p className="text-xs text-zinc-400 font-cairo line-clamp-2 leading-relaxed mt-1">
              {item.descAr}
            </p>
          )}
        </div>

        {/* Bottom Price & Action */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-800/60 mt-2">
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="font-heading font-black text-base sm:text-lg text-zinger-yellow">
              {item.basePrice}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-zinc-400 font-cairo">ج.م</span>
          </div>

          {/* Action Button: Plus Icon */}
          <button
            onClick={handleQuickAdd}
            title="إضافة / تخصيص الوجبة"
            className="w-8 h-8 rounded-full bg-zinger-yellow hover:bg-zinger-yellowHover text-black flex items-center justify-center shadow-glow-yellow-sm active:scale-90 transition-all font-black shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
