import React from 'react';
import { Branch } from '../../types';

interface BranchCardProps {
  branch: Branch;
  onSelect: (branchId: string) => void;
  onShowAddress: (branch: Branch) => void;
}

export const BranchCard: React.FC<BranchCardProps> = ({ branch, onSelect, onShowAddress }) => {
  return (
    <div
      className="branch-card rounded-2xl overflow-hidden flex items-center justify-between p-4 cursor-pointer transition-all duration-300 hover:scale-[1.01]"
      onClick={() => onSelect(branch.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(branch.id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`فتح منيو ${branch.name}`}
    >
      <div className="flex-1 text-right pl-4">
        <h3 className="text-lg font-black mb-2 text-[#1c1b1b]">{branch.name}</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(branch.id);
            }}
            className="px-5 py-2 bg-gradient-to-l from-[#ad2b00] to-[#d73a05] text-white text-xs font-bold rounded-xl shadow-md hover:scale-[1.03] active:scale-95 transition-all"
          >
            المنيو
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onShowAddress(branch);
            }}
            className="branch-address-btn px-5 py-2 border text-xs font-bold rounded-xl active:scale-95 transition-all"
          >
            العنوان
          </button>
        </div>
      </div>
      
      {/* Mascot illustration */}
      <div className="w-16 h-16 bg-gradient-to-br from-[#d73a05] to-[#ad2b00] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
        <svg
          viewBox="0 0 64 64"
          className="w-10 h-10 text-white"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 10C32 10 38 18 38 28C38 32 36 35 32 35C28 35 26 32 26 28C26 18 32 10 32 10Z"
            fill="white"
          />
          <circle cx="32" cy="22" r="3" fill="#ad2b00" />
          <path d="M26 30L20 34C22 36 25 36 26 34V30Z" fill="#ffe16d" />
          <path d="M38 30L44 34C42 36 39 36 38 34V30Z" fill="#ffe16d" />
          <path
            d="M32 35C34 38 32 43 32 43C32 43 30 38 32 35Z"
            fill="#ffe16d"
          />
        </svg>
      </div>
    </div>
  );
};
