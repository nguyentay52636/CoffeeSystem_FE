import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { OrderItem } from './type';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateTotalAmount = (orderItems: OrderItem[]) => {
  return orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
};
