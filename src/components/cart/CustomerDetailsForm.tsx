import React from 'react';
import { CustomerInfo, OrderType } from '../../types';
import { OrderTypeToggle } from './OrderTypeToggle';

interface CustomerDetailsFormProps {
  customerInfo: CustomerInfo;
  onUpdateCustomerInfo: (info: Partial<CustomerInfo>) => void;
  orderType: OrderType;
  onSelectOrderType: (type: OrderType) => void;
  orderNote: string;
  onChangeOrderNote: (note: string) => void;
}

export const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({
  customerInfo,
  onUpdateCustomerInfo,
  orderType,
  onSelectOrderType,
  orderNote,
  onChangeOrderNote,
}) => {
  return (
    <div className="space-y-4 pt-4 border-t border-gray-100">
      <h4 className="text-base font-black text-[#1c1b1b] flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-lg">person</span>
        <span>بيانات الطلب والتوصيل</span>
      </h4>

      <input
        type="text"
        value={customerInfo.name}
        onChange={(e) => onUpdateCustomerInfo({ name: e.target.value })}
        placeholder="الاسم بالكامل"
        className="w-full p-3.5 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-[#1c1b1b] placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-right"
      />

      <input
        type="tel"
        value={customerInfo.phone}
        onChange={(e) => onUpdateCustomerInfo({ phone: e.target.value })}
        placeholder="رقم الموبايل (مثال: 01034456624)"
        className="w-full p-3.5 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-[#1c1b1b] placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-right font-numeric"
      />

      <OrderTypeToggle
        orderType={orderType}
        onSelectOrderType={onSelectOrderType}
      />

      {orderType === 'delivery' && (
        <textarea
          rows={2}
          value={customerInfo.address}
          onChange={(e) => onUpdateCustomerInfo({ address: e.target.value })}
          placeholder="العنوان بالتفصيل (اسم المنطقة، الشارع، علامة مميزة)"
          className="w-full p-3.5 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-[#1c1b1b] placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-right"
        />
      )}

      <input
        type="text"
        value={orderNote}
        onChange={(e) => onChangeOrderNote(e.target.value)}
        placeholder="ملاحظات إضافية على الطلب (اختياري)..."
        className="w-full p-3.5 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-[#1c1b1b] placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-right"
      />
    </div>
  );
};
