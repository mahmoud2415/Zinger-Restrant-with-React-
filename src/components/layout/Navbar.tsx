import React from 'react';
import { Search, Shield, Flame, Share2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenAdmin,
}) => {
  const { showToast } = useToast();

  const handleShareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'مطعم زنجر | Zinger Cafe & Restaurant',
          text: 'تصفح منيو زنجر واطلب أشهى برجر وكريب وبيتزا أونلاين بضغطة زر!',
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('تم نسخ رابط موقع مطعم زنجر بنجاح! 🔥');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-zinger-bg/95 backdrop-blur-xl border-b border-zinger-border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-zinger-bg border-2 border-zinger-yellow shadow-glow-yellow-sm shrink-0">
            <span className="font-heading font-black text-2xl text-zinger-yellow italic tracking-tighter">
              Z
            </span>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-zinger-green rounded-full border-2 border-zinger-bg animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-heading font-black text-xl tracking-tight text-white uppercase">
                ZINGER
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinger-yellow text-black tracking-wider uppercase">
                GOURMET
              </span>
            </div>
            <p className="text-[11px] text-zinger-muted font-cairo font-medium flex items-center gap-1">
              <span>مطعم وكافيه زنجر</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinger-yellow flex items-center gap-0.5">
                <Flame className="w-3 h-3 fill-zinger-yellow text-zinger-yellow" />
                أصلي وطازة
              </span>
            </p>
          </div>
        </div>

        {/* Quick Search & Actions */}
        <div className="flex items-center gap-2">
          {/* Search Input on larger screens */}
          <div className="relative hidden sm:block w-52 md:w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinger-muted" />
            <input
              type="text"
              placeholder="Search burgers, crepes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-9 py-1.5 rounded-full bg-zinger-card border border-zinger-border focus:border-zinger-yellow text-xs text-white placeholder-zinger-muted outline-none transition-all"
            />
          </div>

          {/* Share App Button */}
          <button
            onClick={handleShareApp}
            title="Share Website"
            className="p-2.5 rounded-full bg-zinger-card hover:bg-zinger-cardHover border border-zinger-border text-zinger-yellow transition-all"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Admin Portal Button */}
          <button
            onClick={onOpenAdmin}
            title="Admin Dashboard"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinger-card hover:bg-zinger-cardHover border border-zinger-border hover:border-zinger-yellow/40 text-xs text-zinger-muted hover:text-white transition-all font-heading font-semibold"
          >
            <Shield className="w-3.5 h-3.5 text-zinger-yellow" />
            <span className="hidden md:inline">ADMIN</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="sm:hidden px-4 pb-2.5">
        <div className="relative w-full">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinger-muted" />
          <input
            type="text"
            placeholder="ابحث عن وجبة، برجر، كريب، بيتزا..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-10 py-2 rounded-xl bg-zinger-card border border-zinger-border focus:border-zinger-yellow text-sm text-white placeholder-zinc-500 outline-none transition-all"
          />
        </div>
      </div>
    </header>
  );
};
