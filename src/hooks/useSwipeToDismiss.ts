import { useRef, useEffect } from 'react';

interface UseSwipeToDismissProps {
  onDismiss: () => void;
  threshold?: number;
  isOpen: boolean;
}

export function useSwipeToDismiss({ onDismiss, threshold = 120, isOpen }: UseSwipeToDismissProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal || !isOpen) return;

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (
        target.closest('button') ||
        target.closest('input') ||
        target.closest('label')
      ) {
        return;
      }

      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer && scrollContainer.contains(target) && scrollContainer.scrollTop > 0) {
        return;
      }

      startY = e.touches[0].clientY;
      currentY = startY;
      isDragging = true;
      modal.style.transition = 'none';
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      const dragDistance = Math.max(0, deltaY);

      if (dragDistance > 0) {
        if (e.cancelable) e.preventDefault();
        modal.style.transform = `translateY(${dragDistance}px)`;
      } else {
        modal.style.transform = '';
      }
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      modal.style.transition = 'transform 0.3s ease-out';

      const deltaY = currentY - startY;
      if (deltaY > threshold) {
        modal.style.transform = 'translateY(100%)';
        setTimeout(() => {
          modal.style.transform = '';
          onDismiss();
        }, 250);
      } else {
        modal.style.transform = 'translateY(0)';
      }
    };

    modal.addEventListener('touchstart', handleTouchStart, { passive: true });
    modal.addEventListener('touchmove', handleTouchMove, { passive: false });
    modal.addEventListener('touchend', handleTouchEnd);

    return () => {
      modal.removeEventListener('touchstart', handleTouchStart);
      modal.removeEventListener('touchmove', handleTouchMove);
      modal.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, onDismiss, threshold]);

  return { modalRef, scrollContainerRef };
}
