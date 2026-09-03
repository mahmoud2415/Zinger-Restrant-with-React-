import React, { useState, useEffect, useRef } from 'react';
import { Deal } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DealsBannerProps {
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
}

export const DealsBanner: React.FC<DealsBannerProps> = ({ deals, onSelectDeal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const activeDeals = deals.filter((d) => d.isActive);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (activeDeals.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeDeals.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeDeals.length]);

  if (activeDeals.length === 0) return null;

  const currentDeal = activeDeals[currentIndex] || activeDeals[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeDeals.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeDeals.length) % activeDeals.length);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="px-3 sm:px-4 pt-3 pb-2 max-w-7xl mx-auto">
      {/* Pure Image Hero Banner Container */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => onSelectDeal(currentDeal)}
        className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] rounded-3xl overflow-hidden bg-zinc-950 border border-zinger-border hover:border-zinger-yellow/60 transition-all shadow-card-dark cursor-pointer group select-none"
      >
        {/* Pure Banner Image */}
        <img
          key={currentDeal.id}
          src={currentDeal.image}
          alt={currentDeal.titleAr}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02] animate-fade-in"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&auto=format&fit=crop&q=80';
          }}
        />

        {/* Carousel Navigation Arrows (Desktop / Hover only) */}
        {activeDeals.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dots Indicator at bottom center */}
        {activeDeals.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {activeDeals.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-6 bg-zinger-yellow shadow-glow-yellow-sm'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
