import React from 'react';
import { CustomerInfo, OrderType } from '../../types';
import { OrderTypeToggle } from './OrderTypeToggle';
import { useBranch } from '../../context/BranchContext';

interface CustomerDetailsFormProps {
  customerInfo: CustomerInfo;
  onUpdateCustomerInfo: (info: Partial<CustomerInfo>) => void;
  orderType: OrderType;
  onSelectOrderType: (type: OrderType) => void;
}

export const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({
  customerInfo,
  onUpdateCustomerInfo,
  orderType,
  onSelectOrderType,
}) => {
  const { branches, selectedBranch, selectBranch } = useBranch();

  return (
    <div className="space-y-4 pt-4 border-t border-gray-100">
      <h4 className="text-base font-black text-[#1c1b1b] flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-lg">person</span>
        <span>بيانات الطلب والتوصيل</span>
      </h4>

      {/* Branch Selection Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#1c1b1b] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-base">storefront</span>
          <span>اختر فرع المطعم:</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {branches.map((branch) => {
            const isSelected = selectedBranch?.id === branch.id;
            return (
              <button
                key={branch.id}
                type="button"
                onClick={() => selectBranch(branch.id)}
                className={`p-3 rounded-2xl text-xs font-bold text-right transition-all flex items-center justify-between border active:scale-[0.98] ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-[#1c1b1b] border-gray-200 hover:border-primary/40 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={`material-symbols-outlined text-base ${
                      isSelected ? 'text-white' : 'text-primary'
                    }`}
                  >
                    location_on
                  </span>
                  <span className="truncate">{branch.name}</span>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-base shrink-0">
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

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
    </div>
  );
};
