export interface Branch {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapLink: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface SizeOption {
  name: string;
  price: number;
}

export interface ExtraOption {
  name: string;
  price: number;
}

export interface MenuItem {
  id: number;
  section: string;
  name: string;
  image?: string;
  images?: string[];
  desc?: string;
  price?: number;
  sizes?: SizeOption[];
  extras?: ExtraOption[];
  allowSpice?: boolean;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selectedSize: SizeOption;
  spiceLevel: string;
  selectedExtras: ExtraOption[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'delivery' | 'pickup';

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}
