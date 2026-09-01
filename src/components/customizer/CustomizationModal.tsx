import React, { useState, useEffect, useMemo } from 'react';
import { useModal } from '../../context/ModalContext';
import { useCart } from '../../context/CartContext';
import { SizeOption } from '../../types';
import { getItemImages } from '../../data/menuData';
import { ImageCarousel } from './ImageCarousel';
import { SizeSelector } from './SizeSelector';
import { SpiceSelector } from './SpiceSelector';
import { useSwipeToDismiss } from '../../hooks/useSwipeToDismiss';

export const CustomizationModal: React.FC = () => {
  const { activeCustomizingItem, closeCustomizer } = useModal();
  const { addToCart, openCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [spiceLevel, setSpiceLevel] = useState<string>('عادي');
  const [quantity, setQuantity] = useState<number>(1);

  // Initialize state when active item opens
  useEffect(() => {
    if (activeCustomizingItem) {
      let defaultSize: SizeOption;
      if (activeCustomizingItem.sizes && activeCustomizingItem.sizes.length > 0) {
        defaultSize = activeCustomizingItem.sizes[0];
      } else {
        defaultSize = { name: 'عادي', price: activeCustomizingItem.price || 0 };
      }
      setSelectedSize(defaultSize);
      setSpiceLevel('عادي');
      setQuantity(1);
    }
  }, [activeCustomizingItem]);

  const { modalRef, scrollContainerRef } = useSwipeToDismiss({
    onDismiss: closeCustomizer,
    isOpen: !!activeCustomizingItem,
  });

  const images = useMemo(() => {
    if (!activeCustomizingItem) return [];
    return getItemImages(activeCustomizingItem);
  }, [activeCustomizingItem]);

  const handleAdd = () => {
    if (!activeCustomizingItem || !selectedSize) return;

    addToCart(activeCustomizingItem, selectedSize, spiceLevel, [], quantity);
    closeCustomizer();
    openCart();
  };

  if (!activeCustomizingItem) return null;

  const unitPrice = selectedSize?.price || 0;
  const totalPrice = unitPrice * quantity;

  // Check if item supports spice selection (burgers, crepes, rolls, etc.)
  const showSpice = activeCustomizingItem.section !== 'extras';

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCustomizer}
      />

      {/* Modal Sheet */}
      <div
        ref={modalRef}
        className="fixed bottom-0 left-0 right-0 z-[70] max-w-md mx-auto animate-fade-in-up"
      >
        <div className="bg-[#fcf9f8] rounded-t-3xl p-6 safe-bottom border-t border-[#e4beb4] shadow-2xl max-h-[85vh] flex flex-col overflow-hidden transition-colors duration-300">
          {/* Drag Handle Bar */}
          <div className="w-12 h-1 bg-[#e4beb4] rounded-full mx-auto mb-4 flex-shrink-0 cursor-grab" />

          {/* Scrollable Body */}
          <div
            ref={scrollContainerRef}
            className="space-y-6 overflow-y-auto pr-1 no-scrollbar text-right flex-1 min-h-0 pb-2"
          >
            {/* Carousel */}
            <ImageCarousel images={images} itemName={activeCustomizingItem.name} />

            {/* Header info */}
            <div>
              <h3 className="text-xl font-black text-[#1c1b1b] mb-1">
                {activeCustomizingItem.name}
              </h3>
              {activeCustomizingItem.desc && (
                <p className="text-xs text-[#5b4039] leading-relaxed mb-2">
                  {activeCustomizingItem.desc}
                </p>
              )}
              <p className="text-primary font-black text-xl font-numeric">
                {unitPrice} ج.م
              </p>
            </div>

            {/* Sizes */}
            {activeCustomizingItem.sizes && activeCustomizingItem.sizes.length > 1 && (
              <SizeSelector
                sizes={activeCustomizingItem.sizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
              />
            )}

            {/* Spice */}
            {showSpice && (
              <SpiceSelector spiceLevel={spiceLevel} onChangeSpice={setSpiceLevel} />
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#e4beb4]">
            {/* Quantity */}
            <div className="flex items-center gap-3 bg-[#f0eded] rounded-2xl px-3 py-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 flex items-center justify-center text-primary font-black text-lg rounded-lg hover:bg-white transition-all"
                aria-label="تقليل الكمية"
              >
                -
              </button>
              <span className="text-base font-black text-[#1c1b1b] w-5 text-center font-numeric">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 flex items-center justify-center text-green-600 font-black text-lg rounded-lg hover:bg-white transition-all"
                aria-label="زيادة الكمية"
              >
                +
              </button>
            </div>

            {/* Add button */}
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-4 bg-primary text-white font-black rounded-2xl shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>أضف للسلة</span>
              <span className="font-numeric">({totalPrice} ج.م)</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
