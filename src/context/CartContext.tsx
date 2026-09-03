import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, MenuItem, SizeOption, Branch, OrderType, CustomerInfo } from '../types';
import { branches } from '../data/branches';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, size?: SizeOption, spiceLevel?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItemsCount: number;
  totalPrice: number;
  selectedBranch: Branch;
  setSelectedBranch: (branch: Branch) => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  customerInfo: CustomerInfo;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
}

const CART_STORAGE_KEY = 'zinger_cart_v2';
const CUSTOMER_STORAGE_KEY = 'zinger_customer_v2';
const BRANCH_STORAGE_KEY = 'zinger_selected_branch_v2';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [selectedBranch, setSelectedBranchState] = useState<Branch>(() => {
    try {
      const savedId = localStorage.getItem(BRANCH_STORAGE_KEY);
      const found = branches.find((b) => b.id === savedId);
      return found || branches[0];
    } catch {
      return branches[0];
    }
  });

  const [orderType, setOrderType] = useState<OrderType>('delivery');

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : { name: '', phone: '', address: '', branchId: branches[0].id, note: '' };
    } catch {
      return { name: '', phone: '', address: '', branchId: branches[0].id, note: '' };
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerInfo));
  }, [customerInfo]);

  const setSelectedBranch = (branch: Branch) => {
    setSelectedBranchState(branch);
    setCustomerInfo((prev) => ({ ...prev, branchId: branch.id }));
    localStorage.setItem(BRANCH_STORAGE_KEY, branch.id);
  };

  const addToCart = (
    item: MenuItem,
    size?: SizeOption,
    spiceLevel?: string,
    quantity: number = 1
  ) => {
    const unitPrice = size ? size.price : item.basePrice;
    const cartItemId = `${item.id}_${size?.nameEn || 'def'}_${spiceLevel || 'mild'}`;

    setCart((prev) => {
      const existingIdx = prev.findIndex((ci) => ci.cartItemId === cartItemId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          totalPrice: newQty * unitPrice,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId,
          item,
          selectedSize: size,
          spiceLevel,
          quantity,
          unitPrice,
          totalPrice: quantity * unitPrice,
        };
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity,
              totalPrice: quantity * item.unitPrice,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItemsCount,
        totalPrice,
        selectedBranch,
        setSelectedBranch,
        orderType,
        setOrderType,
        customerInfo,
        setCustomerInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
