import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="px-margin-mobile mt-5">
      <div className="hero-card relative overflow-hidden rounded-[30px] p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="order-2 md:order-1 text-center md:text-right flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-1.5 bg-[#ad2b00]/10 border border-[#ad2b00]/25 text-[#ad2b00] px-3.5 py-1.5 rounded-full text-[11px] font-bold mb-3 shadow-sm select-none">
              <span className="material-symbols-outlined text-xs animate-pulse">
                local_fire_department
              </span>
              <span>الأكثر طلباً في المنطقة 🔥</span>
            </div>
            <p className="text-[11px] font-black tracking-[0.2em] text-[#b12d00] mb-2 uppercase">
              طعم جديد في كل لقمة
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1c1b1b] leading-tight">
              اكتشف أشهر الوجبات من مطعم زنجر
            </h2>
            <p className="mt-3 text-sm sm:text-[15px] leading-8 text-[#5b4039] max-w-lg">
              من البيتزا والكريب والباستا إلى البرجر اللذيذ، كل شيء مصمم لتقديم تجربة
              طعام مريحة ومميزة.
            </p>
            <div className="mt-6 flex justify-center w-full">
              <a
                href="#menu-section"
                className="hero-action-btn inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-black text-white shadow-lg"
              >
                تصفح المنيو
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2 animate-float">
            <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-[24px] border border-[#e4beb4] bg-[#fff7f4] p-1 shadow-md">
              <img
                src="menu_items/كلاسيك بيف برجر/WhatsApp Image 2026-08-02 at 1.58.49 AM.jpeg"
                alt="برجر من مطعم زنجر"
                className="hero-image h-56 sm:h-64 w-full rounded-[18px] object-cover"
                loading="lazy"
              />
              <img
                src="menu_items/كريب سوبر كرانشي (زنجر)/WhatsApp Image 2026-08-02 at 12.10.21 AM.jpeg"
                alt="كريب سوبر كرانشي من مطعم زنجر"
                className="hero-image h-56 sm:h-64 w-full rounded-[18px] object-cover"
                loading="lazy"
              />
              <img
                src="menu_items/بيتزا مكس جبن/WhatsApp Image 2026-08-02 at 12.10.38 AM.jpeg"
                alt="بيتزا مكس جبن من مطعم زنجر"
                className="hero-image h-56 sm:h-64 w-full rounded-[18px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section title */}
      <div id="menu-section" className="mt-4 text-right">
        <h2 className="text-lg font-black text-[#1c1b1b]">
          منيو <span className="text-primary">مطعم زنجر</span>
        </h2>
      </div>
    </section>
  );
};
