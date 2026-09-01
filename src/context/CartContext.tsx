import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, MenuItem, SizeOption, ExtraOption, OrderType, CustomerInfo } from '../types';
import { getItem, setItem } from '../utils/storage';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (
    item: MenuItem,
    selectedSize: SizeOption,
    spiceLevel: string,
    selectedExtras: ExtraOption[],
    quantity: number
  ) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItemCount: number;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  customerInfo: CustomerInfo;
  updateCustomerInfo: (info: Partial<CustomerInfo>) => void;
  orderNote: string;
  setOrderNote: (note: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'zinger_cart';
const CUSTOMER_STORAGE_KEY = 'customer_info';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    return getItem<CartItem[]>(CART_STORAGE_KEY, []);
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [orderNote, setOrderNote] = useState<string>('');

  const [customerInfo, setCustomerInfoState] = useState<CustomerInfo>(() => {
    return getItem<CustomerInfo>(CUSTOMER_STORAGE_KEY, {
      name: '',
      phone: '',
      address: '',
    });
  });

  // Save cart changes
  useEffect(() => {
    setItem(CART_STORAGE_KEY, cart);
  }, [cart]);

  // Save customer info changes
  const updateCustomerInfo = (info: Partial<CustomerInfo>) => {
    setCustomerInfoState((prev) => {
      const updated = { ...prev, ...info };
      setItem(CUSTOMER_STORAGE_KEY, updated);
      return updated;
    });
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (
    item: MenuItem,
    selectedSize: SizeOption,
    spiceLevel: string,
    selectedExtras: ExtraOption[],
    quantity: number
  ) => {
    // Calculate unit price: size price + sum of extras
    const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = selectedSize.price + extrasTotal;

    // Generate unique ID based on item id, size name, spice level, and sorted extra names
    const extrasKey = selectedExtras
      .map((e) => e.name)
      .sort()
      .join('|');
    const cartItemId = `${item.id}-${selectedSize.name}-${spiceLevel}-${extrasKey}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((c) => c.cartItemId === cartItemId);
      if (existingIndex !== -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId,
          item,
          selectedSize,
          spiceLevel,
          selectedExtras,
          quantity,
          unitPrice,
          totalPrice: quantity * unitPrice,
        };
        return [...prevCart, newItem];
      }
    });
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((c) => {
          if (c.cartItemId === cartItemId) {
            const newQty = c.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...c,
              quantity: newQty,
              totalPrice: newQty * c.unitPrice,
            };
          }
          return c;
        })
        .filter((c): c is CartItem => c !== null);
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((c) => c.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cart]);

  const totalItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
        totalItemCount,
        orderType,
        setOrderType,
        customerInfo,
        updateCustomerInfo,
        orderNote,
        setOrderNote,
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
