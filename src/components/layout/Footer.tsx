import React from 'react';
import { useBranch } from '../../context/BranchContext';

export const Footer: React.FC = () => {
  const { selectedBranch, changeBranch, openBranchInfoModal } = useBranch();

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
            الفرع النشط
          </h3>
          {selectedBranch && (
            <>
              <a
                href={selectedBranch.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block group mb-3"
              >
                <p className="text-xs text-gray-300 font-bold mb-1 group-hover:text-primary transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-primary">
                    location_on
                  </span>
                  <span>{selectedBranch.address}</span>
                </p>
                <span className="text-[10px] text-gray-500 underline group-hover:text-primary transition-colors">
                  افتح في خرائط جوجل 🗺️
                </span>
              </a>
              <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-2">
                <span className="material-symbols-outlined text-xs text-primary">
                  phone
                </span>
                <span>
                  رقم التوصيل:{' '}
                  <a
                    href={`tel:${selectedBranch.phone}`}
                    className="font-numeric text-gray-300 hover:underline"
                  >
                    {selectedBranch.phone}
                  </a>
                </span>
              </p>
            </>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#ffe16d] mb-4">روابط سريعة</h3>
          <ul className="space-y-2 text-xs text-gray-400">
            <li>
              <button
                type="button"
                onClick={changeBranch}
                className="hover:text-[#ffe16d] transition-colors"
              >
                تغيير الفرع المختـار
              </button>
            </li>
            {selectedBranch && (
              <li>
                <button
                  type="button"
                  onClick={() => openBranchInfoModal(selectedBranch)}
                  className="hover:text-[#ffe16d] transition-colors"
                >
                  تفاصيل الفرع الحالي
                </button>
              </li>
            )}
            <li>
              <a href="#menu-section" className="hover:text-[#ffe16d] transition-colors">
                تصفح أقسام المنيو
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
