import React from 'react';
import { Flame, Phone, MapPin, Clock, Share2, MessageSquare } from 'lucide-react';
import { branches } from '../../data/branches';
import { useToast } from '../../context/ToastContext';
import { shareContent } from '../../utils/share';

export const Footer: React.FC = () => {
  const { showToast } = useToast();

  const handleShare = async () => {
    const result = await shareContent({
      title: 'مطعم زينجر | ZINGER Restaurant',
      text: 'تصفح منيو مطعم زينجر واطلب أشهى برجر، كريب، بيتزا، وباستا أونلاين عبر واتساب! 🔥',
      url: window.location.href,
    });

    if (result === 'copied') {
      showToast('تم نسخ رابط موقع مطعم زينجر بنجاح! شاركه الآن 🔥');
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 pt-12 pb-16 px-4 text-center select-none">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* 1. Brand Logo & Tagline */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-zinger-bg border-2 border-zinger-yellow shadow-glow-yellow-sm">
            <span className="font-heading font-black text-3xl text-zinger-yellow italic tracking-tighter">
              Z
            </span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-zinger-green rounded-full border-2 border-zinc-950 animate-pulse" />
          </div>

          <div className="space-y-1">
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-wider">
              ZINGER
            </h2>
            <p className="font-cairo font-bold text-sm text-zinger-yellow flex items-center justify-center gap-1.5">
              <Flame className="w-4 h-4 fill-zinger-yellow text-zinger-yellow" />
              <span>مطعم زينجر • أصل الطعم والكرانشي المقرمش</span>
            </p>
          </div>

          <p className="text-xs text-zinc-400 font-cairo max-w-lg mx-auto leading-relaxed">
            نقدم لكم أشهى وأجود ساندوتشات البرجر الفاخر، الكريب، البيتزا الإيطالي، الباستا، وتش رول، والوجبات الغرقانة جبنة مع أسرع خدمة توصيل بفروعنا في فاقوس، أبو كبير، والإسماعيلية.
          </p>
        </div>

        {/* 2. Branches Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-zinger-yellow" />
            <h3 className="font-cairo font-black text-sm text-zinc-300">
              فروع مطعم زينجر وأرقام الدليفري
            </h3>
            <span className="w-2 h-2 rounded-full bg-zinger-yellow" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-right">
            {branches.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinger-yellow/50 transition-all flex flex-col justify-between gap-3 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-cairo font-black text-sm text-white block">
                      {b.name}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-zinger-green" />
                  </div>

                  <p className="text-[11px] text-zinc-400 font-cairo flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{b.address}</span>
                  </p>
                </div>

                {/* Call & WhatsApp Quick Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/60">
                  <a
                    href={`tel:${b.phone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono font-bold text-xs transition-all active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5 text-zinger-yellow" />
                    <span>{b.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/2${b.whatsapp}?text=${encodeURIComponent('السلام عليكم، حابب استفسر عن الطلب من فرع ' + b.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-[#25D366] transition-all active:scale-95"
                    title="محادثة واتساب"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Working Hours & Social */}
        <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto text-xs text-zinc-400 font-cairo">
          <div className="flex items-center gap-2 bg-zinc-900/60 px-4 py-2 rounded-full border border-zinc-800">
            <Clock className="w-4 h-4 text-zinger-yellow" />
            <span>متاحون لخدمتكم يومياً من 11:00 صباحاً حتى 2:00 بعد منتصف الليل</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Share Site */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinger-yellow transition-all active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة الموقع</span>
            </button>

            {/* Official Facebook Link */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white hover:text-zinger-yellow transition-all flex items-center justify-center"
              title="Official Facebook Page"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* 4. Copyright */}
        <div className="pt-2 border-t border-zinc-900/60 text-[11px] text-zinc-600 font-mono">
          <p>© {new Date().getFullYear()} ZINGER RESTAURANT. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};
