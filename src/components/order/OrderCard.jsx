import { formatPrice } from '../../utils/formatters';

function OrderCard({ order, onConfirm, onCancel }) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">
                    Đơn hàng #{order.orderId.substring(0, 8)}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'PLACED' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                }`}>
                    {order.status}
                </span>
            </div>
            
            <div className="space-y-2 mb-4">
                <p><strong>Khách hàng:</strong> {order.customerName} ({order.customerPhone})</p>
                <p><strong>Địa chỉ:</strong> {order.customerAddress}</p>
                <p><strong>Tổng tiền:</strong> {formatPrice(order.totalAmount)} đ</p>
                <p><strong>Thời gian:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            
            <div className="mb-4">
                <strong>Món ăn:</strong>
                <ul className="mt-2 space-y-1">
                    {order.items.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">
                            {item.name} x{item.quantity} - {formatPrice(item.total)} đ
                        </li>
                    ))}
                </ul>
            </div>
            
            {order.status === 'PLACED' && (
                <div className="flex space-x-2">
                    <button
                        onClick={() => onConfirm(order.orderId)}
                        className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                    >
                        Xác nhận
                    </button>
                    <button
                        onClick={() => onCancel(order.orderId)}
                        className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Hủy đơn
                    </button>
                </div>
            )}
        </div>
    );
}

export default OrderCard;