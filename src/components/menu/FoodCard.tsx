import React from 'react';
import { MenuItem } from '../../types';
import { Plus, Flame, Sparkles, Share2, EyeOff } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface FoodCardProps {
  item: MenuItem;
  onOpenCustomizer: (item: MenuItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onOpenCustomizer }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleQuickAddOrCustomize = () => {
    if (!item.isAvailable) return;

    // If item has sizes or allows spice, open customizer
    if ((item.sizes && item.sizes.length > 0) || item.allowSpice) {
      onOpenCustomizer(item);
    } else {
      // Direct quick add for single items (e.g., drinks, sauces, simple meals)
      addToCart(item, undefined, undefined, 1);
      showToast(`تمت إضافة ${item.nameAr} إلى السلة! 🔥`);
    }
  };

  const handleShareItem = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareTitle = `${item.nameEn} | ${item.nameAr} من مطعم زنجر`;
    const shareText = `شوف وجبة ${item.nameAr} من مطعم زنجر بسعر ${item.basePrice} ج.م فقط! اطلبها الآن:`;
    const shareUrl = `${window.location.origin}${window.location.pathname}#item-${item.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      showToast(`تم نسخ رابط وجبة ${item.nameAr} لمشاركتها! 🔥`);
    }
  };

  const hasSizesOrSpice = (item.sizes && item.sizes.length > 0) || item.allowSpice;

  return (
    <div
      id={`item-${item.id}`}
      className={`group relative rounded-2xl bg-zinger-card border border-zinger-border hover:border-zinger-yellow/50 transition-all duration-300 overflow-hidden flex flex-col justify-between food-card-shadow ${
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
            // Fallback placeholder image
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinger-card via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center gap-1 text-center p-2">
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
          {/* Titles */}
          <h3 className="font-heading font-black text-sm sm:text-base text-white uppercase tracking-tight line-clamp-1 mb-0.5">
            {item.nameEn}
          </h3>
          <h4 className="font-cairo font-bold text-xs sm:text-sm text-zinger-yellow line-clamp-1 mb-1.5">
            {item.nameAr}
          </h4>

          {/* Description */}
          {item.descAr && (
            <p className="text-[11px] sm:text-xs text-zinc-400 font-cairo line-clamp-2 leading-relaxed">
              {item.descAr}
            </p>
          )}
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

          {/* Action Button */}
          {item.isAvailable && (
            <button
              onClick={handleQuickAddOrCustomize}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all active:scale-95 ${
                hasSizesOrSpice
                  ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinger-yellow'
                  : 'bg-zinger-yellow hover:bg-zinger-yellowHover text-black shadow-glow-yellow-sm'
              }`}
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>{hasSizesOrSpice ? 'CUSTOMIZE' : 'ADD'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
