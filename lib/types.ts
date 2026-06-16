export interface Voucher {
  id: string;
  title: string;
  subtitle: string;
  city: string;
  hotelName: string;
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  images: string[];
  validUntil: string;
  soldCount: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  description: string;
  usageInstructions: string[];
  includes: string[];
  notes: string[];
}

export interface CartItem {
  voucherId: string;
  quantity: number;
}

export interface OrderForm {
  name: string;
  phone: string;
  email: string;
  quantity: number;
  voucherId: string;
}

export interface Order {
  orderId: string;
  voucherId: string;
  voucherTitle: string;
  voucherImage: string;
  name: string;
  phone: string;
  email: string;
  quantity: number;
  totalPrice: number;
  createdAt: string; // ISO string
}
