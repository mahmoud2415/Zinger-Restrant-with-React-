import React from 'react';
import { Deal } from '../../types';
import { Sparkles, ArrowLeft, Tag } from 'lucide-react';

interface DealsShowcaseCardProps {
  deals: Deal[];
  onOpenDeals: () => void;
}

export const DealsShowcaseCard: React.FC<DealsShowcaseCardProps> = ({
  deals,
  onOpenDeals,
}) => {
  const activeDeals = deals.filter((d) => d.isActive);
  const dealsCount = activeDeals.length;

  return (
    <div
      onClick={onOpenDeals}
      className="group relative w-full overflow-hidden rounded-3xl bg-gradient-to-l from-zinc-950 via-zinc-900 to-black border border-amber-500/30 hover:border-zinger-yellow transition-all duration-300 shadow-lg hover:shadow-glow-yellow-sm cursor-pointer select-none active:scale-[0.99] p-4 sm:p-5"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-amber-500/20 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left/Right Text Info (Arabic RTL) */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-zinger-yellow shrink-0 group-hover:scale-110 group-hover:bg-zinger-yellow group-hover:text-black transition-all duration-300 shadow-inner">
            <Tag className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-cairo font-black text-base sm:text-lg text-white group-hover:text-zinger-yellow transition-colors flex items-center gap-1.5">
                <span>عروض وتوفير زينجر</span>
                <Sparkles className="w-4 h-4 text-zinger-yellow fill-zinger-yellow animate-pulse" />
              </h3>

              {dealsCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-cairo font-bold text-[11px]">
                  {dealsCount} {dealsCount === 1 ? 'عرض متوفر' : 'عروض حصرية'}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 font-cairo line-clamp-1">
              أفضل الوجبات المجمعة بخصومات وتوفير حقيقي، اطلب الآن بأقوى سعر
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t border-zinc-800/80 sm:border-t-0">
          <span className="sm:hidden text-xs text-zinc-500 font-cairo font-semibold">
            اضغط للتصفح
          </span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinger-yellow text-black font-cairo font-black text-xs sm:text-sm group-hover:bg-yellow-400 transition-all shadow-glow-yellow-sm group-hover:translate-x-[-2px]">
            <span>عرض كل العروض</span>
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
      </div>
    </div>
  );
};
