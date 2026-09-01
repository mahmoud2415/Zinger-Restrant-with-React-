import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm flex items-center justify-between px-margin-mobile h-16 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <h1 className="font-display-lg-mobile text-lg text-primary tracking-tighter font-black">
          مطعم زنجر
        </h1>
      </div>
    </header>
  );
};
