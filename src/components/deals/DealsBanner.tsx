import React from 'react';
import { Deal } from '../../types';
import { ShoppingBag, Flame, Copy, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface DealsBannerProps {
  deals: Deal[];
}

export const DealsBanner: React.FC<DealsBannerProps> = ({ deals }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const activeDeals = deals.filter((d) => d.isActive);

  if (activeDeals.length === 0) return null;

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`تم نسخ كود الخصم: ${code} 🎉`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleOrderDeal = (deal: Deal) => {
    // Convert deal to a cart item
    addToCart(
      {
        id: deal.id,
        category: 'deals',
        nameEn: deal.titleEn,
        nameAr: deal.titleAr,
        descAr: deal.descAr,
        basePrice: deal.price,
        image: deal.image,
        isAvailable: true,
        badge: 'HOT',
      },
      undefined,
      undefined,
      1
    );
    showToast(`تمت إضافة ${deal.titleAr} إلى السلة! 🔥`);
  };

  return (
    <section className="py-4 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-zinger-yellow/10 border border-zinger-yellow/30 text-zinger-yellow">
            <Flame className="w-5 h-5 fill-zinger-yellow" />
          </div>
          <div>
            <h2 className="font-heading font-black text-lg text-white uppercase tracking-tight flex items-center gap-1.5">
              EXCLUSIVE DEALS
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinger-yellow text-black font-bold">
                LIMITED
              </span>
            </h2>
            <p className="text-xs text-zinger-muted font-cairo">
              أقوى عروض وبوكسات التوفير من مطعم زنجر
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
        {activeDeals.map((deal) => (
          <div
            key={deal.id}
            className="snap-start shrink-0 w-[88vw] sm:w-[420px] md:w-[460px] rounded-2xl bg-gradient-to-br from-zinc-900 via-zinger-card to-zinc-900 border border-zinger-border hover:border-zinger-yellow/50 transition-all p-4 relative overflow-hidden shadow-card-dark flex flex-col justify-between"
          >
            {/* Background Glow */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-zinger-yellow/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full bg-zinger-yellow text-black font-heading font-extrabold text-[11px] tracking-wider uppercase shadow-glow-yellow-sm">
                  {deal.badge || 'HOT DEAL'}
                </span>

                {deal.code && (
                  <button
                    onClick={(e) => handleCopyCode(deal.code!, e)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinger-yellow text-xs text-zinger-yellow font-mono transition-all"
                  >
                    {copiedCode === deal.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-zinger-green" />
                        <span className="text-zinger-green">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{deal.code}</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Title & Desc */}
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-1">
                {deal.titleEn}
              </h3>
              <h4 className="font-cairo font-bold text-sm text-zinger-yellow mb-1.5">
                {deal.titleAr}
              </h4>
              <p className="text-xs text-zinc-400 font-cairo line-clamp-2 mb-4 leading-relaxed">
                {deal.descAr}
              </p>
            </div>

            {/* Bottom Row: Price & Action */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-black text-2xl text-zinger-yellow">
                  {deal.price}
                </span>
                <span className="text-xs font-bold text-zinger-muted font-cairo">ج.م</span>
                {deal.originalPrice && (
                  <span className="text-xs text-zinc-500 line-through">
                    {deal.originalPrice} ج.م
                  </span>
                )}
              </div>

              <button
                onClick={() => handleOrderDeal(deal)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinger-yellow hover:bg-zinger-yellowHover text-black font-heading font-black text-xs uppercase tracking-wider transition-all shadow-glow-yellow-sm active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ORDER DEAL</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
