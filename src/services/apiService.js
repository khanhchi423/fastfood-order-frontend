// src/services/apiService.js
import config from '../config/config';

const API_BASE_URL = config.API_BASE_URL;

class ApiService {
  // Load menu items from API
  static async loadMenuItems() {
    try {
      const response = await fetch(`${API_BASE_URL}/menu`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error loading menu:', error);
      throw error;
    }
  }

  // Load all orders
  static async loadOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.orders || [];
    } catch (error) {
      console.error('Error loading orders:', error);
      throw error;
    }
  }

  // Place a new order
  static async placeOrder(orderData) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to place order');
      }

      return result;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  }

  // Confirm an order
  static async confirmOrder(orderId) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to confirm order');
      }

      return result;
    } catch (error) {
      console.error('Error confirming order:', error);
      throw error;
    }
  }

  // Cancel an order
  static async cancelOrder(orderId, reason = 'Customer cancellation') {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, reason }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to cancel order');
      }

      return result;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  }

  // Get order by ID
  static async getOrderById(orderId) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }
}

export default ApiService;
