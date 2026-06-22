export interface User {
  name: string;
  email: string;
  token: string;
}

export type Region = "北部" | "中部" | "南部" | "東部" | "離島";

export interface Voucher {
  id: string;
  title: string;
  subtitle: string;
  city: string;
  region: Region;
  hotelName: string;
  roomType: string;
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  images: string[];
  validFrom: string;
  validUntil: string;
  remaining: number;
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

export type PaymentMethod = "apple_pay" | "line_pay" | "credit_card";

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
  paymentMethod: PaymentMethod;
}
