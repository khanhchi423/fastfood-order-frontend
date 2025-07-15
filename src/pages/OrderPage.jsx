import { useState } from 'react';
import MenuItem from '../components/order/MenuItem';
import Cart from '../components/order/Cart';
import CustomerForm from '../components/order/CustomerForm';
import OrderStatus from '../components/shared/OrderStatus';
import { placeOrder } from '../services/OrderService';

function OrderPage({ menuItems, loading, cart, setCart, setOrderStatus }) {
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        address: ''
    });

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
            setOrderStatus({ type: 'error', message: 'Vui lòng điền đầy đủ thông tin khách hàng' });
            return;
        }

        if (cart.length === 0) {
            setOrderStatus({ type: 'error', message: 'Vui lòng thêm món ăn vào giỏ hàng' });
            return;
        }

        try {
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
                message: `Đặt hàng thành công! Mã đơn hàng: ${result.orderId}`,
                orderId: result.orderId
            });
            setCart([]);
            setCustomerInfo({ name: '', phone: '', address: '' });
        } catch (error) {
            console.error('Error placing order:', error);
            setOrderStatus({ type: 'error', message: 'Đặt hàng thất bại' });
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mt-5 mb-6">Ưu đãi hôm nay</h2>
                
                {loading ? (
                    <div className="text-center py-8">
                        <div className="text-gray-500">Đang tải menu...</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
            
            {cart.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                </div>
            )}
        </div>
    );
}

export default OrderPage;