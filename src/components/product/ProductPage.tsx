import React, { useState } from 'react';
import { MenuItem, SizeOption } from '../../types';
import { 
  ArrowLeft, 
  Share2, 
  Flame, 
  Sparkles, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  EyeOff 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { shareContent } from '../../utils/share';

interface ProductPageProps {
  item: MenuItem;
  onBack: () => void;
}

const SPICE_LEVELS = [
  { id: 'عادي (Mild)', labelEn: 'MILD', labelAr: 'عادي (بدون شطة)' },
  { id: 'سبايسي (Spicy 🔥)', labelEn: 'SPICY 🔥', labelAr: 'سبايسي حار' },
  { id: 'حار نار (Fiery 🔥🔥)', labelEn: 'FIERY 🔥🔥', labelAr: 'حار نار إكسترا' },
];

export const ProductPage: React.FC<ProductPageProps> = ({
  item,
  onBack,
}) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>(
    item.sizes && item.sizes.length > 0 ? item.sizes[0] : undefined
  );
  const [selectedSpice, setSelectedSpice] = useState<string>('عادي (Mild)');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const unitPrice = selectedSize ? selectedSize.price : item.basePrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (!item.isAvailable) return;
    addToCart(item, selectedSize, item.allowSpice ? selectedSpice : undefined, quantity);
    setAddedAnimation(true);
    showToast(`تمت إضافة ${item.nameAr} إلى السلة! 🔥`);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleShare = async () => {
    const shareTitle = `${item.nameEn} | ${item.nameAr} من مطعم زينجر`;
    const shareText = `شوف وجبة ${item.nameAr} من مطعم زينجر بسعر ${unitPrice} ج.م فقط! اطلبها أونلاين:`;
    const shareUrl = `${window.location.origin}${window.location.pathname}#/product/${item.id}`;

    const result = await shareContent({
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    });

    if (result === 'copied') {
      showToast('تم نسخ رابط الوجبة بنجاح! شاركه الآن 🔥');
    }
  };

  return (
    <div className="min-h-screen bg-zinger-bg text-white pb-28 animate-fade-in">
      {/* Top Floating Action Bar */}
      <div className="sticky top-0 z-40 bg-zinger-bg/95 backdrop-blur-xl border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinger-card hover:bg-zinc-800 border border-zinc-700 text-xs font-heading font-bold text-white transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO MENU</span>
        </button>

        <span className="font-heading font-bold text-xs uppercase text-zinc-400">
          {item.category}
        </span>

        <button
          onClick={handleShare}
          className="p-2 rounded-xl bg-zinger-card hover:bg-zinc-800 border border-zinc-700 text-zinger-yellow transition-all active:scale-95"
          title="Share Meal"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Product Container */}
      <div className="max-w-4xl mx-auto px-4 py-4 space-y-6">
        {/* Large Product Hero Image */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-card-dark">
          <img
            src={item.image}
            alt={item.nameAr}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80';
            }}
          />

          {/* Badges on Image */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            {item.badge ? (
              <span className="px-3 py-1 rounded-full bg-zinger-yellow text-black font-heading font-black text-xs uppercase shadow-glow-yellow flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {item.badge}
              </span>
            ) : (
              <span />
            )}

            {!item.isAvailable && (
              <span className="px-3 py-1 rounded-full bg-zinger-red text-white font-heading font-black text-xs uppercase">
                OUT OF STOCK
              </span>
            )}
          </div>
        </div>

        {/* Product Details Header */}
        <div className="bg-zinger-card p-5 sm:p-6 rounded-3xl border border-zinc-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                {item.nameEn}
              </h1>
              <h2 className="font-cairo font-bold text-lg sm:text-xl text-zinger-yellow">
                {item.nameAr}
              </h2>
            </div>

            <div className="flex items-baseline gap-1.5 self-start sm:self-auto">
              <span className="font-heading font-black text-3xl text-zinger-yellow">
                {unitPrice}
              </span>
              <span className="font-cairo font-bold text-sm text-zinc-400">جنيه مصري</span>
            </div>
          </div>

          {/* Description */}
          {item.descAr && (
            <div className="pt-2 border-t border-zinc-800">
              <p className="text-xs sm:text-sm text-zinc-300 font-cairo leading-relaxed">
                {item.descAr}
              </p>
            </div>
          )}
        </div>

        {/* 1. Size & Weight Options */}
        {item.sizes && item.sizes.length > 0 && (
          <div className="bg-zinger-card p-5 rounded-3xl border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-black text-sm text-white uppercase tracking-wider">
                CHOOSE SIZE / اختر الحجم والوزن
              </h3>
              <span className="text-xs font-cairo font-bold text-zinger-yellow">مطلوب</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {item.sizes.map((size) => {
                const isSelected = selectedSize?.nameEn === size.nameEn;
                return (
                  <button
                    key={size.nameEn}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-zinc-800 border-zinger-yellow text-white shadow-glow-yellow-sm scale-[1.01]'
                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <span className="font-heading font-black text-xs uppercase block text-white">
                        {size.nameEn}
                      </span>
                      <span className="font-cairo text-xs text-zinc-400 block">
                        {size.nameAr}
                      </span>
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

        {/* 2. Spice Level Selector */}
        {item.allowSpice && (
          <div className="bg-zinger-card p-5 rounded-3xl border border-zinc-800 space-y-3">
            <h3 className="font-heading font-black text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-zinger-red" />
              SPICE LEVEL / درجة الشطة
            </h3>

            <div className="grid grid-cols-3 gap-2.5">
              {SPICE_LEVELS.map((spice) => {
                const isSelected = selectedSpice === spice.id;
                return (
                  <button
                    key={spice.id}
                    type="button"
                    onClick={() => setSelectedSpice(spice.id)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-zinc-800 border-zinger-yellow text-white shadow-glow-yellow-sm'
                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <span className="font-heading font-bold text-xs uppercase block">
                      {spice.labelEn}
                    </span>
                    <span className="font-cairo text-[11px] block text-zinc-400 mt-0.5">
                      {spice.labelAr}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Quantity Selector */}
        <div className="bg-zinger-card p-4 rounded-2xl border border-zinc-800 flex items-center justify-between">
          <span className="font-heading font-bold text-xs uppercase text-zinc-300">
            QUANTITY / الكمية
          </span>

          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-xl p-1">
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

        {/* 4. Compact Centered Order Button (Inline at bottom of scroll) */}
        <div className="flex justify-center pt-3 pb-10">
          {item.isAvailable ? (
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-glow-yellow active:scale-95 w-full max-w-sm ${
                addedAnimation
                  ? 'bg-zinger-green text-black'
                  : 'bg-zinger-yellow hover:bg-zinger-yellowHover text-black'
              }`}
            >
              {addedAnimation ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              <span>{addedAnimation ? 'ADDED TO CART!' : `ADD TO CART (${totalPrice} EGP)`}</span>
            </button>
          ) : (
            <div className="py-2.5 px-5 rounded-full bg-zinc-900 border border-zinc-800 text-center flex items-center justify-center gap-2 text-zinc-500 font-heading font-bold text-xs max-w-sm w-full">
              <EyeOff className="w-4 h-4" />
              <span>OUT OF STOCK</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
