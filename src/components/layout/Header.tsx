import React from 'react';
import { useBranch } from '../../context/BranchContext';

export const Header: React.FC = () => {
  const { selectedBranch, changeBranch } = useBranch();

  return (
    <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm flex items-center justify-between px-margin-mobile h-16 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <h1 className="font-display-lg-mobile text-lg text-primary tracking-tighter font-black">
          مطعم زنجر
        </h1>
        {selectedBranch && (
          <div className="flex items-center bg-gray-100 text-xs px-2.5 py-1 rounded-full text-[#1c1b1b] font-bold">
            <span className="material-symbols-outlined text-xs ml-1 text-primary">
              store
            </span>
            <span>{selectedBranch.name}</span>
            <button
              type="button"
              onClick={changeBranch}
              className="mr-2 text-primary font-bold hover:underline flex items-center text-[10px]"
            >
              لتغيير الفرع دوس هنا
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
