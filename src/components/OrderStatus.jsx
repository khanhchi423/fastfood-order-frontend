function OrderStatus({ orderStatus }) {
    if (!orderStatus) return null;

    return (
        <div className={`order-status ${orderStatus.type}`}>
            {orderStatus.message}
        </div>
    );
}

export default OrderStatus;