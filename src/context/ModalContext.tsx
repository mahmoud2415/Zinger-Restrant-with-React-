import React, { createContext, useContext, useState } from 'react';
import { MenuItem } from '../types';

interface ModalContextType {
  activeCustomizingItem: MenuItem | null;
  openCustomizer: (item: MenuItem) => void;
  closeCustomizer: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeCustomizingItem, setActiveCustomizingItem] = useState<MenuItem | null>(null);

  const openCustomizer = (item: MenuItem) => {
    setActiveCustomizingItem(item);
  };

  const closeCustomizer = () => {
    setActiveCustomizingItem(null);
  };

  return (
    <ModalContext.Provider
      value={{
        activeCustomizingItem,
        openCustomizer,
        closeCustomizer,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
