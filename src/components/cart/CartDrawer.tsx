import React from 'react';
import { useCart } from '../../context/CartContext';
import { CartItemRow } from './CartItemRow';
import { CustomerDetailsForm } from './CustomerDetailsForm';
import { CartSummary } from './CartSummary';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    customerInfo,
    updateCustomerInfo,
    orderType,
    setOrderType,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed left-0 top-0 bottom-0 w-[92%] max-w-lg bg-gradient-to-b from-primary/10 via-[#fff7f4] to-surface border-r border-[#f4d8cf] z-[90] shadow-2xl flex flex-col h-full rounded-r-3xl overflow-hidden transition-all duration-300 animate-fade-in-up">
        {/* Header */}
        <div className="p-5 border-b border-[#e8c2b5] flex items-center justify-between bg-primary/15 backdrop-blur-sm rounded-b-3xl">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">
              shopping_cart
            </span>
            <h3 className="text-xl font-black text-[#1c1b1b]">سلة المشتريات</h3>
            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-[11px] text-red-600 hover:underline mr-2 font-bold"
              >
                تفريغ السلة
              </button>
            )}
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#5b4039] hover:bg-gray-200 active:scale-90 transition-transform"
            onClick={closeCart}
            aria-label="إغلاق السلة"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-right min-h-0 no-scrollbar">
          {cart.length === 0 ? (
            <div className="py-16 text-center text-gray-400 flex flex-col items-center">
              <span className="material-symbols-outlined text-6xl mb-3 text-gray-300">
                remove_shopping_cart
              </span>
              <p className="text-sm font-bold text-gray-500">سلتك فارغة حالياً</p>
              <p className="text-xs text-gray-400 mt-1">
                تصفح المنيو واختر وجباتك المفضلة!
              </p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="space-y-3">
                {cart.map((c) => (
                  <CartItemRow
                    key={c.cartItemId}
                    item={c}
                    onUpdateQuantity={(delta) => updateQuantity(c.cartItemId, delta)}
                    onRemove={() => removeFromCart(c.cartItemId)}
                  />
                ))}
              </div>

              {/* Customer Form */}
              <CustomerDetailsForm
                customerInfo={customerInfo}
                onUpdateCustomerInfo={updateCustomerInfo}
                orderType={orderType}
                onSelectOrderType={setOrderType}
              />

              {/* Summary & Checkout */}
              <CartSummary />
            </>
          )}
        </div>
      </div>
    </>
  );
};
