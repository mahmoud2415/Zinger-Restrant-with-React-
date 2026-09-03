import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MapPin, 
  Phone, 
  User, 
  Bike, 
  Store,
  Send
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { branches } from '../../data/branches';
import { getWhatsAppLink } from '../../utils/whatsapp';
import { useToast } from '../../context/ToastContext';

export const CheckoutDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    clearCart,
    totalPrice,
    selectedBranch,
    setSelectedBranch,
    orderType,
    setOrderType,
    customerInfo,
    setCustomerInfo,
  } = useCart();

  const { showToast } = useToast();
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

  if (!isCartOpen) return null;

  const validateForm = (): boolean => {
    const errors: { name?: string; phone?: string; address?: string } = {};

    if (!customerInfo.name.trim()) {
      errors.name = 'يرجى كتابة الاسم';
    }

    const cleanPhone = customerInfo.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'يرجى كتابة رقم جوال صحيح للتواصل (11 رقم)';
    }

    if (orderType === 'delivery' && !customerInfo.address.trim()) {
      errors.address = 'يرجى كتابة عنوان التوصيل بالتفصيل';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendWhatsAppOrder = () => {
    if (cart.length === 0) {
      showToast('السلة فارغة! أضف وجباتك أولاً', 'warning');
      return;
    }

    if (!validateForm()) {
      showToast('يرجى استكمال البيانات المطلوبة لإتمام الطلب', 'warning');
      return;
    }

    const waLink = getWhatsAppLink(cart, customerInfo, orderType, selectedBranch);
    showToast('جاري فتح واتساب لإرسال الطلب للفرع... 🔥');
    
    window.open(waLink, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-zinger-bg border-l border-zinc-800 h-full flex flex-col z-10 shadow-2xl animate-slide-up sm:animate-none">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-cairo font-black text-base text-white">
                سلة الطلبات
              </h2>
              <span className="text-xs text-zinc-400 font-cairo">
                {cart.length} {cart.length === 1 ? 'صنف' : 'أصناف'} مختارة
              </span>
            </div>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              title="تفريغ السلة"
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinger-red p-2 rounded-lg transition-colors font-cairo"
            >
              <Trash2 className="w-4 h-4" />
              <span>تفريغ</span>
            </button>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {/* Cart Empty State */}
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinger-yellow shadow-glow-yellow-sm">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="font-cairo font-black text-lg text-white">
                سلتك فارغة حالياً
              </h3>
              <p className="text-xs text-zinc-400 font-cairo max-w-xs mx-auto">
                لم تقم بإضافة أي وجبة بعد. تصفح أقسام مطعم زينجر واختر وجبتك المفضلة!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 rounded-xl bg-zinger-yellow hover:bg-zinger-yellowHover text-black font-cairo font-bold text-xs uppercase shadow-glow-yellow-sm"
              >
                تصفح المنيو الآن
              </button>
            </div>
          ) : (
            <>
              {/* 1. Items List */}
              <div className="space-y-2.5">
                <h3 className="font-cairo font-bold text-xs text-zinc-400">
                  الوجبات المختارة
                </h3>

                {cart.map((cartItem) => (
                  <div
                    key={cartItem.cartItemId}
                    className="p-3 rounded-2xl bg-zinger-card border border-zinc-800/80 flex items-center justify-between gap-3"
                  >
                    {/* Image & Title */}
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.nameAr}
                        className="w-12 h-12 rounded-xl object-cover bg-black shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-cairo font-black text-xs text-white line-clamp-1">
                          {cartItem.item.nameAr}
                        </h4>

                        {/* Size & Spice details */}
                        <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-zinger-yellow">
                          {cartItem.selectedSize && (
                            <span className="bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                              {cartItem.selectedSize.nameAr}
                            </span>
                          )}
                          {cartItem.spiceLevel && (
                            <span className="bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                              {cartItem.spiceLevel}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="font-heading font-black text-sm text-zinger-yellow">
                        {cartItem.totalPrice} ج.م
                      </span>

                      <div className="flex items-center gap-1.5 bg-zinc-900 rounded-lg p-0.5 border border-zinc-800">
                        <button
                          onClick={() => updateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-zinc-300 hover:text-white active:scale-90"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-heading font-bold px-1 text-white">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-zinc-300 hover:text-white active:scale-90"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. Select Branch (Name Only) */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <h3 className="font-cairo font-bold text-xs text-zinc-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinger-yellow" />
                  اختر الفرع
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {branches.map((branch) => {
                    const isSelected = selectedBranch.id === branch.id;
                    return (
                      <button
                        key={branch.id}
                        type="button"
                        onClick={() => setSelectedBranch(branch)}
                        className={`p-3 rounded-xl border text-right transition-all flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-zinc-900 border-zinger-yellow text-white shadow-glow-yellow-sm'
                            : 'bg-zinger-card border-zinc-800 hover:border-zinc-700 text-zinc-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-zinger-yellow bg-zinger-yellow' : 'border-zinc-600'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                          </div>
                          <span className="font-cairo font-bold text-xs text-white">
                            {branch.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Order Type (Delivery / Pickup) */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <h3 className="font-cairo font-bold text-xs text-zinc-400">
                  نوع الطلب
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border font-cairo font-bold text-xs transition-all ${
                      orderType === 'delivery'
                        ? 'bg-zinc-900 border-zinger-yellow text-zinger-yellow shadow-glow-yellow-sm'
                        : 'bg-zinger-card border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>توصيل دليفري</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border font-cairo font-bold text-xs transition-all ${
                      orderType === 'pickup'
                        ? 'bg-zinc-900 border-zinger-yellow text-zinger-yellow shadow-glow-yellow-sm'
                        : 'bg-zinger-card border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>استلام من المطعم</span>
                  </button>
                </div>
              </div>

              {/* 4. Customer Details Form */}
              <div className="space-y-3 pt-2 border-t border-zinc-800">
                <h3 className="font-cairo font-bold text-xs text-zinc-400">
                  بيانات التواصل
                </h3>

                {/* Name */}
                <div>
                  <label className="text-[11px] font-cairo font-semibold text-zinc-300 block mb-1">
                    الاسم بالكامل *
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="اكتب اسمك هنا"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-3 pr-9 py-2.5 rounded-xl bg-zinger-card border border-zinc-800 focus:border-zinger-yellow text-xs text-white placeholder-zinc-600 outline-none"
                    />
                  </div>
                  {formErrors.name && (
                    <span className="text-[10px] text-zinger-red font-cairo block mt-1">
                      {formErrors.name}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-[11px] font-cairo font-semibold text-zinc-300 block mb-1">
                    رقم الجوال للتواصل *
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="tel"
                      placeholder="010XXXXXXXX"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full pl-3 pr-9 py-2.5 rounded-xl bg-zinger-card border border-zinc-800 focus:border-zinger-yellow text-xs text-white placeholder-zinc-600 outline-none dir-ltr text-right"
                    />
                  </div>
                  {formErrors.phone && (
                    <span className="text-[10px] text-zinger-red font-cairo block mt-1">
                      {formErrors.phone}
                    </span>
                  )}
                </div>

                {/* Address (If Delivery) */}
                {orderType === 'delivery' && (
                  <div>
                    <label className="text-[11px] font-cairo font-semibold text-zinc-300 block mb-1">
                      عنوان التوصيل بالتفصيل *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute right-3 top-3 w-4 h-4 text-zinc-500" />
                      <textarea
                        rows={2}
                        placeholder="المنطقة، الشارع، العمارة، رقم الشقة"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo((prev) => ({ ...prev, address: e.target.value }))}
                        className="w-full pl-3 pr-9 py-2.5 rounded-xl bg-zinger-card border border-zinc-800 focus:border-zinger-yellow text-xs text-white placeholder-zinc-600 outline-none resize-none"
                      />
                    </div>
                    {formErrors.address && (
                      <span className="text-[10px] text-zinger-red font-cairo block mt-1">
                        {formErrors.address}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* 5. Total and Send Order Button (Inline at bottom of scroll) */}
              <div className="pt-4 border-t border-zinc-800 space-y-3 pb-8">
                <div className="flex items-center justify-between text-base bg-zinc-950/60 p-3.5 rounded-2xl border border-zinc-800/80">
                  <span className="font-cairo font-black text-white">
                    الإجمالي
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading font-black text-2xl text-zinger-yellow">
                      {totalPrice}
                    </span>
                    <span className="font-cairo font-bold text-xs text-zinc-400">جنيه مصري</span>
                  </div>
                </div>

                <button
                  onClick={handleSendWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-zinger-yellow hover:bg-zinger-yellowHover text-black font-cairo font-black text-sm tracking-wide transition-all shadow-glow-yellow active:scale-[0.98]"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  <span>إرسال الطلب عبر واتساب</span>
                </button>

                <p className="text-[10px] text-zinc-500 text-center font-cairo">
                  سيتم فتح محادثة مباشرة مع واتساب {selectedBranch.name}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
