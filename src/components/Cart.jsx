function Cart({ cart, onUpdateQuantity, onRemoveFromCart, totalAmount }) {
    return (
        <div className="cart-section">
            <h2 className="section-title">Your Order</h2>
            {cart.map(item => (
                <div key={item.itemId} className="cart-item">
                    <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">${item.price.toFixed(2)} each</div>
                    </div>
                    <div className="cart-controls">
                        <button 
                            className="quantity-btn" 
                            onClick={() => onUpdateQuantity(item.itemId, item.quantity - 1)}
                        >
                            -
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button 
                            className="quantity-btn" 
                            onClick={() => onUpdateQuantity(item.itemId, item.quantity + 1)}
                        >
                            +
                        </button>
                        <button 
                            className="btn btn-small btn-danger" 
                            onClick={() => onRemoveFromCart(item.itemId)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <div className="cart-total">
                Total: ${totalAmount.toFixed(2)}
            </div>
        </div>
    );
}

export default Cart;