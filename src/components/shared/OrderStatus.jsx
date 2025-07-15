function OrderStatus({ orderStatus }) {
    if (!orderStatus) return null;

    return (
        <div className={`max-w-7xl mx-auto px-4 py-3 rounded-md mb-4 ${
            orderStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
            {orderStatus.message}
        </div>
    );
}

export default OrderStatus;