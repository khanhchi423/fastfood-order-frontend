function OrderCard({ order, onConfirm, onCancel }) {
    return (
        <div className="order-card">
            <div className="order-header">
                <div className="order-id">
                    Order #{order.orderId.substring(0, 8)}
                </div>
                <div className={`order-status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                </div>
            </div>
            <div className="order-info">
                <div><strong>Customer:</strong> {order.customerName} ({order.customerPhone})</div>
                <div><strong>Address:</strong> {order.customerAddress}</div>
                <div><strong>Total:</strong> ${order.totalAmount}</div>
                <div><strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}</div>
            </div>
            <div className="order-items">
                <strong>Items:</strong>
                <ul>
                    {order.items.map((item, index) => (
                        <li key={index}>
                            {item.name} x{item.quantity} - ${item.total}
                        </li>
                    ))}
                </ul>
            </div>
            {order.status === 'PLACED' && (
                <div className="order-actions">
                    <button 
                        className="btn btn-small" 
                        onClick={() => onConfirm(order.orderId)}
                    >
                        Confirm Order
                    </button>
                    <button 
                        className="btn btn-small btn-danger" 
                        onClick={() => onCancel(order.orderId)}
                    >
                        Cancel Order
                    </button>
                </div>
            )}
        </div>
    );
}

export default OrderCard;