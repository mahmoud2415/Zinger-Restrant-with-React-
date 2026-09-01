import React from 'react';
import { useBranch } from '../../context/BranchContext';

export const BranchInfoModal: React.FC = () => {
  const { branchInfoModalBranch, closeBranchInfoModal } = useBranch();

  if (!branchInfoModalBranch) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80 z-[200] backdrop-blur-md transition-opacity duration-300"
        onClick={closeBranchInfoModal}
      />
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-[#1c1b1b] border border-white/10 rounded-3xl p-6 z-[210] text-white text-right shadow-2xl animate-fade-in-up">
        <h4 className="text-xl font-black mb-4 text-center text-[#ffe16d]">
          {branchInfoModalBranch.name}
        </h4>
        <div className="space-y-4 text-sm leading-relaxed">
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
            <p className="font-bold text-[#ffe16d] mb-1">📍 العنوان:</p>
            <p className="text-gray-300 text-xs leading-relaxed mb-4">
              {branchInfoModalBranch.address}
            </p>

            <p className="text-[#ffe16d] text-xs font-bold mb-2">📞 أرقام التواصل:</p>
            <ul className="text-gray-300 text-xs space-y-2">
              <li className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                <span>الاتصال المباشر:</span>
                <a
                  href={`tel:${branchInfoModalBranch.phone}`}
                  className="font-numeric text-[#ffe16d] font-bold hover:underline"
                >
                  {branchInfoModalBranch.phone}
                </a>
              </li>
              <li className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                <span>واتساب الطلبات:</span>
                <a
                  href={`https://wa.me/${branchInfoModalBranch.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-numeric text-green-400 font-bold hover:underline"
                >
                  {branchInfoModalBranch.whatsapp}
                </a>
              </li>
            </ul>

            {branchInfoModalBranch.mapLink && (
              <div className="mt-4 text-center">
                <a
                  href={branchInfoModalBranch.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#ffe16d] underline hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-xs">location_on</span>
                  فتح الموقع في خرائط Google
                </a>
              </div>
            )}
          </div>
        </div>
        <button
          type="button"
          className="w-full mt-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold rounded-xl active:scale-[0.98] transition-all"
          onClick={closeBranchInfoModal}
        >
          إغلاق
        </button>
      </div>
    </>
  );
};
