// src/services/apiService.js
import config from '../config/config';
import { mockMenuItems } from '../data/mockData';

const API_BASE_URL = config.API_BASE_URL;

class ApiService {
  // Helper method to simulate API delay for mock data
  static async simulateDelay(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Mock data storage for development
  static mockOrders = [];

  // Load menu items from API or mock data
  static async loadMenuItems() {
    if (config.USE_MOCK_DATA) {
      await this.simulateDelay(800);
      return mockMenuItems;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/menu`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error loading menu:', error);
      // Fallback to mock data if API fails
      console.log('Falling back to mock data...');
      return mockMenuItems;
    }
  }

  // Load all orders from API or mock data
  static async loadOrders() {
    if (config.USE_MOCK_DATA) {
      await this.simulateDelay(600);
      return this.mockOrders;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.orders || [];
    } catch (error) {
      console.error('Error loading orders:', error);
      // Fallback to mock data if API fails
      console.log('Falling back to mock orders...');
      return this.mockOrders;
    }
  }

  // Place a new order
  static async placeOrder(orderData) {
    if (config.USE_MOCK_DATA) {
      await this.simulateDelay(1500);
      
      // Create mock order
      const orderId = 'ORD-' + Date.now();
      const newOrder = {
        orderId,
        customerName: orderData.customerName,
        customerPhone: orderData.customerPhone,
        customerAddress: orderData.customerAddress,
        items: orderData.items.map(item => {
          const menuItem = mockMenuItems.find(m => m.itemId === item.itemId);
          return {
            itemId: item.itemId,
            image: item.image,
            name: menuItem?.name || 'Unknown Item',
            quantity: item.quantity,
            price: menuItem?.price || 0,
            total: (menuItem?.price || 0) * item.quantity
          };
        }),
        totalAmount: orderData.items.reduce((total, item) => {
          const menuItem = mockMenuItems.find(m => m.itemId === item.itemId);
          return total + ((menuItem?.price || 0) * item.quantity);
        }, 0),
        status: 'PLACED',
        createdAt: new Date().toISOString()
      };

      this.mockOrders.unshift(newOrder);
      return { orderId, success: true };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
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
    if (config.USE_MOCK_DATA) {
      await this.simulateDelay(1000);
      
      const orderIndex = this.mockOrders.findIndex(order => order.orderId === orderId);
      if (orderIndex !== -1) {
        this.mockOrders[orderIndex].status = 'CONFIRMED';
        return { success: true };
      } else {
        throw new Error('Order not found');
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/orders/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId })
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
    if (config.USE_MOCK_DATA) {
      await this.simulateDelay(1000);
      
      const orderIndex = this.mockOrders.findIndex(order => order.orderId === orderId);
      if (orderIndex !== -1) {
        this.mockOrders[orderIndex].status = 'CANCELLED';
        return { success: true };
      } else {
        throw new Error('Order not found');
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/orders/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          orderId,
          reason 
        })
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
    if (config.USE_MOCK_DATA) {
      await this.simulateDelay(500);
      const order = this.mockOrders.find(order => order.orderId === orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      return order;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }
}

export default ApiService;