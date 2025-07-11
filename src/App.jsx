import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import MenuItem from './components/MenuItem';
import Cart from './components/Cart';
import CustomerForm from './components/CustomerForm';
import OrderCard from './components/OrderCard';
import OrderStatus from './components/OrderStatus';
import { loadMenuItems, loadOrders, placeOrder, confirmOrder, cancelOrder } from './services/api';
import './styles/App.css';

function App() {
    const [activeTab, setActiveTab] = useState('order');
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderStatus, setOrderStatus] = useState(null);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        loadMenuData();
        loadOrdersData();
    }, []);

    const loadMenuData = async () => {
        try {
            setLoading(true);
            const items = await loadMenuItems();
            setMenuItems(items);
        } catch (error) {
            console.error('Error loading menu:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadOrdersData = async () => {
        try {
            const ordersData = await loadOrders();
            setOrders(ordersData);
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    };

    const addToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.itemId === item.itemId);
        if (existingItem) {
            setCart(cart.map(cartItem => 
                cartItem.itemId === item.itemId 
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter(item => item.itemId !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
        } else {
            setCart(cart.map(item => 
                item.itemId === itemId 
                    ? { ...item, quantity: quantity }
                    : item
            ));
        }
    };

    const getTotalAmount = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCustomerInfoChange = (field, value) => {
        setCustomerInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePlaceOrder = async () => {
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
            const orderData = {
                customerName: customerInfo.name,
                customerPhone: customerInfo.phone,
                customerAddress: customerInfo.address,
                items: cart.map(item => ({
                    itemId: item.itemId,
                    quantity: item.quantity
                }))
            };

            const result = await placeOrder(orderData);
            setOrderStatus({ 
                type: 'success', 
                message: `Order placed successfully! Order ID: ${result.orderId}`,
                orderId: result.orderId
            });
            setCart([]);
            setCustomerInfo({ name: '', phone: '', address: '' });
            loadOrdersData();
        } catch (error) {
            console.error('Error placing order:', error);
            setOrderStatus({ type: 'error', message: 'Failed to place order' });
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmOrder = async (orderId) => {
        try {
            await confirmOrder(orderId);
            setOrderStatus({ type: 'success', message: 'Order confirmed successfully!' });
            loadOrdersData();
        } catch (error) {
            console.error('Error confirming order:', error);
            setOrderStatus({ type: 'error', message: 'Failed to confirm order' });
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await cancelOrder(orderId);
            setOrderStatus({ type: 'success', message: 'Order cancelled successfully!' });
            loadOrdersData();
        } catch (error) {
            console.error('Error cancelling order:', error);
            setOrderStatus({ type: 'error', message: 'Failed to cancel order' });
        }
    };

    return (
        <div className="container">
            <Header />
            
            <div className="content">
                <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
                
                <OrderStatus orderStatus={orderStatus} />
                
                {activeTab === 'order' && (
                    <>
                        {loading ? (
                            <div className="loading">Loading menu...</div>
                        ) : (
                            <div className="menu-section">
                                {menuItems.map(item => {
                                    const cartItem = cart.find(c => c.itemId === item.itemId);
                                    return (
                                        <MenuItem
                                            key={item.itemId}
                                            item={item}
                                            cartItem={cartItem}
                                            onAddToCart={addToCart}
                                            onUpdateQuantity={updateQuantity}
                                            onRemoveFromCart={removeFromCart}
                                        />
                                    );
                                })}
                            </div>
                        )}
                        
                        {cart.length > 0 && (
                            <>
                                <Cart 
                                    cart={cart}
                                    onUpdateQuantity={updateQuantity}
                                    onRemoveFromCart={removeFromCart}
                                    totalAmount={getTotalAmount()}
                                />
                                
                                <CustomerForm
                                    customerInfo={customerInfo}
                                    onInfoChange={handleCustomerInfoChange}
                                    onPlaceOrder={handlePlaceOrder}
                                    loading={loading}
                                    totalAmount={getTotalAmount()}
                                />
                            </>
                        )}
                    </>
                )}
                
                {activeTab === 'orders' && (
                    <div className="orders-section">
                        <h2 className="section-title">Orders History</h2>
                        {orders.length === 0 ? (
                            <div className="empty-state">No orders found.</div>
                        ) : (
                            <div className="orders-grid">
                                {orders.map(order => (
                                    <OrderCard
                                        key={order.orderId}
                                        order={order}
                                        onConfirm={handleConfirmOrder}
                                        onCancel={handleCancelOrder}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;