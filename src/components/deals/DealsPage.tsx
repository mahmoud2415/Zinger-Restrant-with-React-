import React from 'react';
import { ArrowLeft, Share2, Tag } from 'lucide-react';
import { Deal, MenuItem } from '../../types';
import { getDealImage } from '../../data/dealsData';
import { shareContent } from '../../utils/share';
import { useToast } from '../../context/ToastContext';

interface DealsPageProps {
  deals: Deal[];
  menuItems: MenuItem[];
  onBack: () => void;
  onSelectDeal: (deal: Deal) => void;
}

export const DealsPage: React.FC<DealsPageProps> = ({
  deals,
  menuItems,
  onBack,
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
          <button onClick={onBack} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinger-card border border-zinc-700 text-xs font-cairo font-bold">
            <ArrowLeft className="w-4 h-4" />
            العودة للقائمة
          </button>
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-zinger-yellow" />
            <h1 className="font-cairo font-black text-lg">عروض زينجر</h1>
          </div>
          <button onClick={handleShare} title="مشاركة العروض" className="p-2.5 rounded-full bg-zinger-card border border-zinc-700 text-zinger-yellow">
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
                      {deal.titleEn && <p className="font-heading text-xs text-zinc-500 mt-1">{deal.titleEn}</p>}
                    </div>
                    <span className="font-heading font-black text-xl text-zinger-yellow whitespace-nowrap">{deal.price} ج.م</span>
                  </div>
                  {deal.descAr && <p className="font-cairo text-xs leading-relaxed text-zinc-300 mt-3">{deal.descAr}</p>}
                  {deal.badge && <span className="inline-block mt-3 px-2.5 py-1 rounded-full bg-zinger-yellow text-black text-[10px] font-heading font-black">{deal.badge}</span>}
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
