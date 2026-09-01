import React, { useState, useRef } from 'react';

interface ImageCarouselProps {
  images: string[];
  itemName: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, itemName }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  if (!images || images.length === 0) return null;

  const handleScroll = () => {
    if (sliderRef.current) {
      const index = Math.round(
        sliderRef.current.scrollLeft / sliderRef.current.clientWidth
      );
      if (index >= 0 && index < images.length && index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  const scrollToImage = (index: number) => {
    const nextIdx = (index + images.length) % images.length;
    setActiveIndex(nextIdx);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: nextIdx * sliderRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full aspect-[16/10] bg-[#f5ebe8] rounded-2xl overflow-hidden mt-3 mb-5 group select-none">
      {/* Slider */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        dir="ltr"
      >
        {images.map((img, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0 snap-center">
            <img
              src={img}
              alt={`${itemName} - ${idx + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'assets/placeholder.webp';
              }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollToImage(activeIndex - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 active:scale-95 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
            aria-label="الصورة السابقة"
          >
            <span className="material-symbols-outlined text-xl">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToImage(activeIndex + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 active:scale-95 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
            aria-label="الصورة التالية"
          >
            <span className="material-symbols-outlined text-xl">chevron_right</span>
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToImage(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                aria-label={`عرض الصورة ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
