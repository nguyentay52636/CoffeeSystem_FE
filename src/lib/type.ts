// Interfaces based on the database schema
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface OrderItem {
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
}

export interface User {
  id: number;
  full_name: string;
  address: string;
}

export interface Order {
  id: number;
  user_id: number;
  status: 'New Order' | 'Processed' | 'Canceled';
  created_at: string;
  user: User;
  order_items: OrderItem[];
}
