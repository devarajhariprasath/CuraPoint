
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  batchNo: string;
  expiryDate: string;
  isPrescriptionRequired: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  discount: number; // Percentage or fixed? Let's use percentage for easier pharmacy math
}

export interface SaleSession {
  id: string;
  cashierName: string;
  startTime: string;
  initialCash: number;
  totalSales: number;
  status: 'OPEN' | 'CLOSED';
}

export interface Transaction {
  id: string;
  date: string;
  total: number;
  items: CartItem[];
  paymentMethod: 'CASH' | 'CARD' | 'LANKAPAY' | 'HELA-PAY';
  customerName?: string;
  status: 'COMPLETED' | 'RETURNED' | 'REFUNDED';
}

export type ViewType = 'SALE' | 'PAYMENT' | 'CASHIER' | 'RETURNS' | 'REFUNDS' | 'DASHBOARD';
