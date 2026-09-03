import React, { useState, useEffect } from 'react';
import { MenuItem, SizeOption } from '../../types';
import { X, Plus, Minus, Flame, Share2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface BottomSheetCustomizerProps {
  item: MenuItem | null;
  onClose: () => void;
}

const SPICE_LEVELS = [
  { id: 'عادي (Mild)', labelEn: 'MILD', labelAr: 'عادي (بدون شطة)', icon: null },
  { id: 'سبايسي (Spicy 🔥)', labelEn: 'SPICY 🔥', labelAr: 'سبايسي حار', icon: '🔥' },
  { id: 'حار نار (Fiery 🔥🔥)', labelEn: 'FIERY 🔥🔥', labelAr: 'حار نار إكسترا', icon: '🔥🔥' },
];

export const BottomSheetCustomizer: React.FC<BottomSheetCustomizerProps> = ({
  item,
  onClose,
}) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>(undefined);
  const [selectedSpice, setSelectedSpice] = useState<string>('عادي (Mild)');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (item) {
      if (item.sizes && item.sizes.length > 0) {
        setSelectedSize(item.sizes[0]);
      } else {
        setSelectedSize(undefined);
      }
      setSelectedSpice('عادي (Mild)');
      setQuantity(1);
    }
  }, [item]);

  if (!item) return null;

  const currentUnitPrice = selectedSize ? selectedSize.price : item.basePrice;
  const currentTotalPrice = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(item, selectedSize, item.allowSpice ? selectedSpice : undefined, quantity);
    showToast(`تمت إضافة ${item.nameAr} إلى السلة! 🔥`);
    onClose();
  };

  const handleShare = async () => {
    const shareTitle = `${item.nameEn} | ${item.nameAr} من مطعم زنجر`;
    const shareText = `شوف وجبة ${item.nameAr} من مطعم زنجر بسعر ${currentUnitPrice} ج.م!`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // cancelled
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      showToast(`تم نسخ الرابط للمشاركة بنجاح!`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Sheet Content */}
      <div className="relative w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-zinger-surface border border-zinger-border border-b-0 sm:border-b shadow-2xl z-10 max-h-[90vh] flex flex-col overflow-hidden animate-slide-up">
        {/* Pull Indicator for Mobile */}
        <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mt-3 mb-1 sm:hidden shrink-0" />

        {/* Header with image */}
        <div className="relative h-44 sm:h-52 w-full bg-zinc-950 shrink-0">
          <img
            src={item.image}
            alt={item.nameAr}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinger-surface via-zinger-surface/30 to-transparent" />

          {/* Close & Share buttons */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/10 backdrop-blur-md transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-black/70 hover:bg-black text-zinger-yellow border border-white/10 backdrop-blur-md transition-all active:scale-95"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Title on image bottom */}
          <div className="absolute bottom-3 right-4 left-4">
            <h2 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
              {item.nameEn}
            </h2>
            <h3 className="font-cairo font-bold text-base text-zinger-yellow">
              {item.nameAr}
            </h3>
          </div>
        </div>

        {/* Body scrollable options */}
        <div className="p-4 overflow-y-auto space-y-5 custom-scrollbar">
          {item.descAr && (
            <p className="text-xs sm:text-sm text-zinc-300 font-cairo leading-relaxed bg-zinger-card p-3 rounded-xl border border-zinc-800">
              {item.descAr}
            </p>
          )}

          {/* 1. Size Options (If Available) */}
          {item.sizes && item.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="font-heading font-black text-xs sm:text-sm text-white uppercase tracking-wider">
                  SELECT SIZE / الحجم
                </label>
                <span className="text-[11px] font-bold text-zinger-yellow font-cairo">مطلوب</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.sizes.map((size) => {
                  const isSelected = selectedSize?.nameEn === size.nameEn;
                  return (
                    <button
                      key={size.nameEn}
                      onClick={() => setSelectedSize(size)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-right transition-all duration-200 ${
                        isSelected
                          ? 'bg-zinc-800 border-zinger-yellow text-white shadow-glow-yellow-sm'
                          : 'bg-zinger-card border-zinc-800 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-zinger-yellow bg-zinger-yellow' : 'border-zinc-600'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </div>
                        <div>
                          <span className="font-heading font-bold text-xs uppercase block">
                            {size.nameEn}
                          </span>
                          <span className="font-cairo text-xs text-zinc-400 block">
                            {size.nameAr}
                          </span>
                        </div>
                      </div>

                      <span className="font-heading font-black text-sm text-zinger-yellow">
                        {size.price} ج.م
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Spice Level (If Allowed) */}
          {item.allowSpice && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="font-heading font-black text-xs sm:text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-zinger-red" />
                  SPICE LEVEL / درجة الشطة
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {SPICE_LEVELS.map((spice) => {
                  const isSelected = selectedSpice === spice.id;
                  return (
                    <button
                      key={spice.id}
                      onClick={() => setSelectedSpice(spice.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-zinc-800 border-zinger-yellow text-white shadow-glow-yellow-sm'
                          : 'bg-zinger-card border-zinc-800 hover:border-zinc-700 text-zinc-400'
                      }`}
                    >
                      <span className="font-heading font-bold text-xs uppercase block">
                        {spice.labelEn}
                      </span>
                      <span className="font-cairo text-[11px] block mt-0.5">
                        {spice.labelAr}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
            <span className="font-heading font-bold text-xs uppercase text-zinc-300">
              QUANTITY / الكمية
            </span>

            <div className="flex items-center gap-3 bg-zinger-card border border-zinc-700 rounded-xl p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white active:scale-90"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-heading font-black text-base w-6 text-center text-zinger-yellow">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white active:scale-90"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Action Button */}
        <div className="p-4 bg-zinger-surface border-t border-zinger-border pb-safe">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-zinger-yellow hover:bg-zinger-yellowHover text-black font-heading font-black text-sm uppercase tracking-wider transition-all shadow-glow-yellow active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>ADD TO CART</span>
            </div>
            <span className="font-heading font-black text-base">
              {currentTotalPrice} ج.م
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
