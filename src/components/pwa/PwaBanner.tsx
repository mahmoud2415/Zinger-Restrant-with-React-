import React from 'react';
import { usePwaInstall } from '../../hooks/usePwaInstall';

export const PwaBanner: React.FC = () => {
  const { isBannerVisible, isIosDevice, triggerInstall, dismissBanner } = usePwaInstall();

  if (!isBannerVisible) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-[55] bg-white border border-primary/20 rounded-2xl p-4 flex items-center justify-between shadow-2xl transition-all duration-500 max-w-md mx-auto animate-fade-in-up">
      <div className="flex items-center gap-3 text-right">
        <span className="material-symbols-outlined text-3xl text-primary animate-pulse">
          install_mobile
        </span>
        <div>
          <h4 className="text-xs font-bold text-[#1c1b1b]">
            {isIosDevice ? 'ثبت التطبيق على الآيفون! 🍏' : 'ثبت تطبيق زنجر على تليفونك! 📲'}
          </h4>
          <p className="text-[10px] text-on-surface-variant mt-0.5">
            {isIosDevice ? (
              <span>
                اضغط على زر المشاركة{' '}
                <span className="material-symbols-outlined text-xs align-middle">ios_share</span>{' '}
                ثم اختر <strong>إضافة للشاشة الرئيسية</strong>.
              </span>
            ) : (
              'لطلب أسرع وتصفح أسهل في أي وقت بدون متصفح.'
            )}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {!isIosDevice && (
          <button
            type="button"
            onClick={triggerInstall}
            className="px-4 py-2 bg-primary text-white font-black text-xs rounded-xl active:scale-95 transition-transform shadow-md hover:bg-primary-container"
          >
            تثبيت
          </button>
        )}
        <button
          type="button"
          onClick={dismissBanner}
          className="w-8 h-8 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-gray-200 active:scale-90 transition-transform"
          aria-label="إغلاق التنبيه"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  );
};
