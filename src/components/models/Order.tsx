export interface Order {
    id?: number;
    isRead: boolean;
    buyerName: string;
    buyerEmail: string;
    orderDate: string;
    shippingPrice: number;
    subtotal: number;
    total: number;
    paymentMethod: string;
    orderStatus: string;
    userId: number;
    deliveryMethodId: number;
    branchId: string;
    items: {
      products: Product[];
      prints: Print[];
    };
    shippingAddress: Address;
  }
  
  export interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }
  
  export interface Print {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }
  
  export interface Address {
    id: number;
    phone: string;
    country: string;
    state: string;
    city: string;
    primary_street: string;
    secondary_street: string;
    latitude: number;
    longitude: number;
  }
  
  export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T | T[];
  }
  
  export interface OrderSummary {
    buyerName: string;
    buyerEmail: string;
    total: string;
    orderDate: Date;
  }
  
  export interface SalesSummary {
    date: string;
    totalSales: number;
    orders: number;
  }
  
  export interface OrderSummaryResponse {
    salesSummary: SalesSummary[];
    oldestOrderDate: string;
    newestOrderDate: string;
  }
  
  export const InitialOrderState: Order = {
    id: 0,
    isRead: false,
    buyerName: "",
    buyerEmail: "",
    orderDate: "",
    shippingPrice: 0,
    subtotal: 0,
    total: 0,
    paymentMethod: "",
    orderStatus: "",
    userId: 0,
    deliveryMethodId: 0,
    branchId: "",
    items: {
      products: [],
      prints: [],
    },
    shippingAddress: {
      id: 0,
      phone: "",
      country: "",
      state: "",
      city: "",
      primary_street: "",
      secondary_street: "",
      latitude: 0,
      longitude: 0,
    },
  };
  