import React from 'react';
import { useBranch } from '../../context/BranchContext';

export const Footer: React.FC = () => {
  const { branches, openBranchInfoModal } = useBranch();

  return (
    <footer className="bg-[#1A1A1A] text-white py-16 px-margin-mobile text-right">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-black text-white mb-4">
            مطعم زنجر | ZINGER
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
            طعم زنجر المميز بنكهته وقرمشته الفريدة. نقدم لعملائنا برجر، كريب،
            بيتزا، وباستا بأجود المكونات الطازجة.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#ffe16d] mb-4 uppercase">
            فروعنا وعناويننا
          </h3>
          <ul className="space-y-3">
            {branches.map((b) => (
              <li key={b.id} className="text-xs text-gray-300">
                <button
                  type="button"
                  onClick={() => openBranchInfoModal(b)}
                  className="font-bold text-white hover:text-primary transition-colors flex items-center gap-1 text-right"
                >
                  <span className="material-symbols-outlined text-xs text-primary">
                    location_on
                  </span>
                  <span>{b.name}</span>
                </button>
                <p className="text-[11px] text-gray-400 pr-4 mt-0.5">{b.address}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#ffe16d] mb-4">روابط سريعة</h3>
          <ul className="space-y-2 text-xs text-gray-400">
            <li>
              <a href="#menu-section" className="hover:text-[#ffe16d] transition-colors">
                تصفح أقسام المنيو
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/201034456624"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ffe16d] transition-colors"
              >
                تواصل معنا عبر واتساب
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-container-max mx-auto border-t border-white/5 mt-10 pt-6 text-center text-[10px] text-gray-500 font-numeric">
        © 2026 مطعم زنجر. All rights reserved.
      </div>
    </footer>
  );
};
