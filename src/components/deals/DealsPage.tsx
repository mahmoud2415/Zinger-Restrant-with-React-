import React from 'react';
import { Home, Share2, Tag } from 'lucide-react';
import { Deal, MenuItem } from '../../types';
import { getDealImage } from '../../data/dealsData';
import { shareContent } from '../../utils/share';
import { useToast } from '../../context/ToastContext';

interface DealsPageProps {
  deals: Deal[];
  menuItems: MenuItem[];
  onBack: () => void;
  onHome: () => void;
  onSelectDeal: (deal: Deal) => void;
}

export const DealsPage: React.FC<DealsPageProps> = ({
  deals,
  menuItems,
  onHome,
  onSelectDeal,
}) => {
  const { showToast } = useToast();
  const activeDeals = deals.filter((deal) => deal.isActive);

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/deals`;
    const result = await shareContent({
      title: 'عروض مطعم زينجر',
      text: 'شوف أحدث عروض مطعم زينجر واطلب عرضك المفضل الآن 🔥',
      url,
    });
    if (result === 'copied') showToast('تم نسخ رابط العروض بنجاح! شاركه الآن 🔥');
  };

  return (
    <div className="min-h-screen bg-zinger-bg text-white pb-16" dir="rtl">
      <header className="sticky top-0 z-40 bg-zinger-bg/95 backdrop-blur-xl border-b border-zinger-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <button
            onClick={onHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinger-card hover:bg-zinc-800 border border-zinc-700 text-xs font-cairo font-bold text-white transition-all active:scale-95 shadow-sm"
          >
            <Home className="w-4 h-4 text-zinger-yellow" />
            <span>الرئيسية</span>
          </button>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-zinger-yellow" />
            <h1 className="font-cairo font-black text-base sm:text-lg">عروض زينجر</h1>
          </div>
          <button onClick={handleShare} title="مشاركة العروض" className="p-2 rounded-xl bg-zinger-card hover:bg-zinc-800 border border-zinc-700 text-zinger-yellow transition-all active:scale-95">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-7">
          <h2 className="font-cairo font-black text-2xl sm:text-3xl text-white">اختار عرضك المفضل</h2>
          <p className="font-cairo text-sm text-zinc-400 mt-2">عروض مميزة وأسعار خاصة لفترة محدودة</p>
        </div>
        {activeDeals.length === 0 ? (
          <p className="text-center font-cairo text-zinc-400 py-16">لا توجد عروض متاحة حالياً.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {activeDeals.map((deal) => (
              <button key={deal.id} onClick={() => onSelectDeal(deal)} className="text-right rounded-3xl overflow-hidden bg-zinger-card border border-zinc-800 hover:border-zinger-yellow/60 transition-all group">
                <div className="aspect-[16/9] overflow-hidden bg-black">
                  <img src={getDealImage(deal, menuItems)} alt={deal.titleAr} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-cairo font-black text-base text-white">{deal.titleAr}</h3>
                      {deal.descAr && <p className="font-cairo text-xs leading-relaxed text-zinc-400 mt-1.5 line-clamp-2">{deal.descAr}</p>}
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <span className="font-heading font-black text-xl text-zinger-yellow whitespace-nowrap">{deal.price} ج.م</span>
                      {deal.originalPrice && deal.originalPrice > deal.price && (
                        <span className="text-[11px] font-mono text-zinc-500 line-through">{deal.originalPrice} ج.م</span>
                      )}
                    </div>
                  </div>
                  {deal.badge && (
                    <div className="mt-3">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-zinger-yellow text-black text-[10px] font-cairo font-black">
                        {deal.badge}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
