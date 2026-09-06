export interface Branch {
  id: string;
  name: string;
  nameEn: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapLink: string;
  isOpen: boolean;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  coverImage: string;
  descAr?: string;
}

export interface SizeOption {
  nameAr: string;
  nameEn: string;
  price: number;
}

export interface MenuItem {
  id: string;
  category: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  basePrice: number;
  image: string;
  images?: string[];
  sizes?: SizeOption[];
  allowSpice?: boolean;
  isAvailable: boolean;
  badge?: 'HOT' | 'NEW' | 'BESTSELLER' | 'SUPER CRUNCHY' | 'CHEF PICK';
  createdAt?: string | number;
}

export interface Deal {
  id: string;
  titleEn: string;
  titleAr: string;
  descAr: string;
  badge: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  sourceProductId?: string;
  coverType?: 'product' | 'custom';
  code?: string;
  isActive: boolean;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selectedSize?: SizeOption;
  spiceLevel?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'delivery' | 'pickup';

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  branchId: string;
  note?: string;
}

export interface AdminUser {
  email: string;
  uid: string;
}
