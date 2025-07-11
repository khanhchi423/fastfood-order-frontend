import { LuConciergeBell } from "react-icons/lu";
function MenuItem({ item, cartItem, onAddToCart, onUpdateQuantity, onRemoveFromCart }) {
    const handleChoiceClick = () => {
        if (!cartItem) {
            // Add to cart with quantity 1 when choosing
            const newCartItem = { ...item, quantity: 1 };
            onAddToCart(newCartItem);
        }
    };

    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value) || 0;
        if (quantity > 0 && cartItem) {
            onUpdateQuantity(item.itemId, quantity);
        } else if (quantity === 0 && cartItem) {
            onRemoveFromCart(item.itemId);
        }
    };

    return (
        <div className="menu-item">
            <img src={item.imageUrl} alt={item.name} className="item-image" />
            <div className="item-details">
                <div className="item-name">{item.name}</div>
                <div className="item-description">{item.description}</div>
                <div className="item-price">${item.price.toFixed(2)}</div>
            </div>
            <div className="item-controls">
                {!cartItem ? (
                    <button 
                        onClick={handleChoiceClick}
                        className="btn choice-btn"
                    >
                        <LuConciergeBell />
                    </button>
                ) : (
                    <>
                        <span className="quantity-label">Quantity</span>
                        <input 
                            type="number" 
                            min="1" 
                            value={cartItem.quantity}
                            onChange={handleQuantityChange}
                            className="quantity-input"
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default MenuItem;