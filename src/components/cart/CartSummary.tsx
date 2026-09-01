import React from 'react';
import { useCart } from '../../context/CartContext';
import { useBranch } from '../../context/BranchContext';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const CartSummary: React.FC = () => {
  const { cart, totalPrice, customerInfo, orderType, orderNote } = useCart();
  const { selectedBranch } = useBranch();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('السلة فارغة! 🛒');
      return;
    }

    const name = customerInfo.name.trim();
    const phone = customerInfo.phone.trim();
    const address = customerInfo.address.trim();

    if (!name) {
      alert('من فضلك اكتب اسمك بالكامل لخدمتك بشكل أفضل 👤');
      return;
    }
    if (!phone) {
      alert('من فضلك اكتب رقم الموبايل للتواصل 📞');
      return;
    }

    // Egyptian phone validation: 11 digits starting with 010, 011, 012, 015
    const egPhoneRegex = /^01[0125]\d{8}$/;
    if (!egPhoneRegex.test(phone)) {
      alert('من فضلك اكتب رقم موبايل مصري صحيح مكون من 11 رقماً ويبدأ بـ (010, 011, 012, 015) 🇪🇬');
      return;
    }

    if (orderType === 'delivery' && !address) {
      alert('من فضلك اكتب العنوان بالتفصيل لتوصيل طلبك سريعاً 🛵');
      return;
    }

    const waLink = getWhatsAppLink(cart, customerInfo, orderType, selectedBranch, orderNote);
    window.open(waLink, '_blank');
  };

  return (
    <div className="p-5 border border-[#f4d8cf] bg-[#fff6f2] rounded-3xl mt-4 shadow-sm transition-colors duration-300">
      <div className="space-y-3 mb-4 font-numeric">
        <div className="flex justify-between items-center text-xl font-black text-[#1c1b1b]">
          <span className="font-sans text-base">إجمالي الحساب:</span>
          <span className="text-primary">{totalPrice} ج.م</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        className="w-full py-4 bg-[#25D366] hover:bg-[#20ba56] text-white font-black rounded-2xl shadow-[0_4px_20px_rgba(37,211,102,0.25)] hover:shadow-[0_4px_25px_rgba(37,211,102,0.4)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
      >
        <span>إرسال الطلب عبر واتساب</span>
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.512-2.96-2.626-.087-.114-.694-.925-.694-1.769 0-.843.441-1.258.599-1.428.158-.171.343-.214.458-.214.114 0 .229 0 .329.004.106.005.25.006.388.341.144.35.487 1.187.53 1.273.043.086.072.185.014.3-.058.114-.087.185-.171.285l-.258.3c-.086.1-.174.209-.074.38.1.171.442.729.948 1.18.651.58 1.201.76 1.372.845.171.086.271.071.371-.043.1-.114.428-.499.543-.671.114-.171.229-.142.386-.085.158.057 1 .471 1.172.557.171.086.286.128.329.2.043.071.043.414-.101.819z" />
        </svg>
      </button>
    </div>
  );
};
