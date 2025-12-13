// src/services/orders.service.ts

import API from '../api/client';

export interface IOrderSummary {
  orderId: number,
  orderDate: Date,
  customerName: string,
  shippingMethod: number,
  invoiceStatus: string,
  containsPreOrder: number,
  dispatchEmailSent: Date,
  goods: number,
  carriage: number,
  dispatchDate: Date
}

export async function fetchActiveOrders(): Promise<IOrderSummary[]> {
  try {
    const response = await API.get('/orders/active');
    return response.data.success ? response.data.data : [];
  } catch (err) {
    console.error('Failed to fetch active orders:', err);
    return [];
  }
}