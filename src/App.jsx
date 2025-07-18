import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import OrderPage from './pages/OrderPage';
import OrdersPage from './pages/OrderHistoryPage';
import ApiService from './services/apiService';
import './styles/App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('order');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // Load initial data when component mounts
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      // Load menu items and orders concurrently
      const [menuData, ordersData] = await Promise.all([
        ApiService.loadMenuItems(),
        ApiService.loadOrders()
      ]);
      
      setMenuItems(menuData);
      setOrders(ordersData);
    } catch (error) {
      setOrderStatus({ 
        type: 'error', 
        message: 'Failed to load data. Using fallback data.' 
      });
      // You can keep your mockData as fallback
      console.error('Failed to load initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh orders data
  const refreshOrders = async () => {
    try {
      const ordersData = await ApiService.loadOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to refresh orders:', error);
    }
  };

  const placeOrder = async () => {
    // Validation
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      setOrderStatus({ type: 'error', message: 'Please fill in all customer information' });
      return;
    }

    if (cart.length === 0) {
      setOrderStatus({ type: 'error', message: 'Please add items to your cart' });
      return;
    }

    try {
      setLoading(true);
      
      // Prepare order data for API
      const orderData = {
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerAddress: customerInfo.address,
        items: cart.map(item => ({
            itemId: item.itemId,
            name: item.name,          
            price: item.price,     
            image: item.image,        
            description: item.description, 
            quantity: item.quantity
        }))
      };

      // Place order via API
      const result = await ApiService.placeOrder(orderData);
      
      setOrderStatus({ 
        type: 'success', 
        message: `Order placed successfully! Order ID: ${result.orderId}`,
        orderId: result.orderId
      });
      
      // Clear cart and customer info
      setCart([]);
      setCustomerInfo({ name: '', phone: '', address: '' });
      
      // Refresh orders list
      await refreshOrders();
      
      // Auto clear status after 5 seconds
      setTimeout(() => setOrderStatus(null), 5000);
    } catch (error) {
      setOrderStatus({ 
        type: 'error', 
        message: error.message || 'Failed to place order' 
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmOrder = async (orderId) => {
    try {
      await ApiService.confirmOrder(orderId);
      setOrderStatus({ type: 'success', message: 'Order confirmed successfully!' });
      
      // Refresh orders list
      await refreshOrders();
      
      setTimeout(() => setOrderStatus(null), 3000);
    } catch (error) {
      setOrderStatus({ 
        type: 'error', 
        message: error.message || 'Failed to confirm order' 
      });
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await ApiService.cancelOrder(orderId);
      setOrderStatus({ type: 'success', message: 'Order cancelled successfully!' });
      
      // Refresh orders list
      await refreshOrders();
      
      setTimeout(() => setOrderStatus(null), 3000);
    } catch (error) {
      setOrderStatus({ 
        type: 'error', 
        message: error.message || 'Failed to cancel order' 
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      
      <main className="flex-1">
        {orderStatus && (
          <div className={`p-4 text-center ${
            orderStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {orderStatus.message}
          </div>
        )}
        
        {activeTab === 'order' ? (
          <OrderPage
            cart={cart}
            setCart={setCart}
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
            onPlaceOrder={placeOrder}
            loading={loading}
            menuItems={menuItems}
            selectedCategory={selectedCategory}
          />
        ) : (
          <OrdersPage
            orders={orders}
            onConfirmOrder={confirmOrder}
            onCancelOrder={cancelOrder}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
};

export default App;