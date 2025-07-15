// import { useEffect } from 'react';
import OrderCard from '../components/order/OrderCard';
import { confirmOrder, cancelOrder, loadOrders } from '../services/OrderService';

function OrderHistoryPage({ orders, setOrders, setOrderStatus }) {
    const handleConfirmOrder = async (orderId) => {
        try {
            await confirmOrder(orderId);
            setOrderStatus({ type: 'success', message: 'Xác nhận đơn hàng thành công!' });
            // Reload orders after confirmation
            const updatedOrders = await loadOrders();
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error confirming order:', error);
            setOrderStatus({ type: 'error', message: 'Xác nhận đơn hàng thất bại' });
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await cancelOrder(orderId);
            setOrderStatus({ type: 'success', message: 'Hủy đơn hàng thành công!' });
            // Reload orders after cancellation
            const updatedOrders = await loadOrders();
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error cancelling order:', error);
            setOrderStatus({ type: 'error', message: 'Hủy đơn hàng thất bại' });
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Lịch sử đơn hàng</h2>
            {orders.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-gray-500">Không có đơn hàng nào.</div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    );
}

export default OrderHistoryPage;