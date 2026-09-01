import React from 'react';
import { useBranch } from '../../context/BranchContext';
import { BranchCard } from './BranchCard';

export const BranchLanding: React.FC = () => {
  const { branches, selectBranch, openBranchInfoModal } = useBranch();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7f4] via-surface to-[#f6e8e4] text-[#1c1b1b] px-4 py-8 flex flex-col justify-between transition-colors duration-300">
      <div className="max-w-md mx-auto w-full flex flex-col items-center">
        {/* Brand Header */}
        <div className="w-full text-center mt-4 mb-8">
          <h1 className="text-4xl font-black tracking-tight text-[#1c1b1b]">
            مطعم زنجر
          </h1>
          <p className="text-xs text-[#b12d00] font-bold tracking-widest mt-1">
            ZINGER
          </p>
        </div>

        {/* Social Media Icons Row */}
        <div className="flex justify-center gap-6 mb-8">
          {/* WhatsApp */}
          <a
            href="https://wa.me/201034456624"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-social-link w-12 h-12 rounded-full flex items-center justify-center hover:text-green-600 transition-all duration-300 hover:scale-110"
            aria-label="واتساب زنجر"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.236-4.148l.384.228c1.6.953 3.447 1.456 5.328 1.458 5.617 0 10.189-4.52 10.193-10.077.002-2.693-1.04-5.226-2.934-7.124-1.895-1.897-4.417-2.94-7.11-2.942-5.623 0-10.195 4.52-10.2 10.077-.001 2.01.523 3.975 1.517 5.717l.25.439-1.004 3.669 3.78-1.011zm11.367-7.3c-.301-.15-1.781-.879-2.056-.979-.275-.1-.475-.15-.675.15-.2.3-.775.979-.95 1.179-.175.2-.35.225-.651.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.783-1.675-2.083-.175-.3-.019-.462.13-.61.135-.133.301-.35.451-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.52l-.575-.01c-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.11 4.517.714.31 1.272.495 1.708.634.717.228 1.368.196 1.884.119.575-.085 1.78-.727 2.03-1.43.25-.702.25-1.3.175-1.43-.075-.13-.275-.205-.575-.355z" />
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@zinger.2010?_r=1&_t=ZS-98V1utWL748"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-social-link w-12 h-12 rounded-full flex items-center justify-center hover:text-pink-600 transition-all duration-300 hover:scale-110"
            aria-label="تيك توك زنجر"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.02-2.89-.35-4.2-1-.28-.15-.56-.32-.83-.51.02 1.48.01 2.97.01 4.46 0 3.48-1.52 7.06-4.83 8.39-3.24 1.34-7.51.62-9.93-1.97-2.54-2.67-2.61-7.44-.15-10.18 2.05-2.36 5.56-3.11 8.52-1.92v4.22c-1.78-.66-3.95-.12-5.12 1.41-1.16 1.5-1.06 3.9.23 5.25.96.99 2.43 1.37 3.77 1.02 1.43-.37 2.37-1.73 2.37-3.2v-12.2l-.01-.01z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/zinger2010?igsh=OGhtdHN1MTJ1a3gw"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-social-link w-12 h-12 rounded-full flex items-center justify-center hover:text-[#E1306C] transition-all duration-300 hover:scale-110"
            aria-label="انستجرام زنجر"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/1BXLb8iKjS/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-social-link w-12 h-12 rounded-full flex items-center justify-center hover:text-blue-600 transition-all duration-300 hover:scale-110"
            aria-label="فيسبوك زنجر"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>

        <h2 className="text-xl font-black tracking-wide text-center text-[#1c1b1b] mb-2">
          اختر الفرع
        </h2>
        <p className="text-xs text-[#5b4039] text-center mb-6">
          اضغط على الفرع لفتح المنيو مباشرة
        </p>

        {/* Branch Cards Stack */}
        <div className="w-full space-y-4">
          {branches.map((branch) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              onSelect={selectBranch}
              onShowAddress={openBranchInfoModal}
            />
          ))}
        </div>
      </div>

      {/* Landing Page Footer */}
      <footer className="w-full mt-16 border-t border-gray-200/50 pt-8 pb-4 text-right">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-black text-primary mb-2">
              مطعم زنجر | ZINGER
            </h3>
            <p className="text-xs text-[#5b4039] leading-relaxed px-4">
              طعم زنجر المميز بنكهته وقرمشته الفريدة. نقدم لعملائنا برجر، كريب،
              بيتزا، وباستا بأجود المكونات الطازجة.
            </p>
          </div>
          <div className="bg-white/40 backdrop-blur-md border border-[#e4beb4]/40 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-primary mb-2 border-b border-[#e4beb4]/30 pb-2">
              📍 فروعنا وعناويننا:
            </h4>
            <ul className="text-[11px] text-[#5b4039] space-y-2.5">
              {branches.map((b) => (
                <li key={b.id} className="flex items-start gap-1">
                  <span className="text-primary font-bold">• {b.name}:</span>
                  <span>{b.address}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-center text-[10px] text-[#5b4039] font-numeric pt-4">
            © 2026 مطعم زنجر. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
