import { Plus } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

function MenuItem({ item, cartItem, onAddToCart, onUpdateQuantity }) {
    const handleAddClick = () => {
        if (!cartItem) {
            const newCartItem = { ...item, quantity: 1 };
            onAddToCart(newCartItem);
        }
    };

    return (
        <div className="bg-white rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow">
                        <div className="relative">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                />
                {item.badge && (
                    <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                    </div>
                )}
            </div>
            
            <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                <div className="flex items-center space-x-2 mb-2">
                    <span className="text-orange-500 text-sm">
                        Tiết kiệm {formatPrice(item.discount)} đ
                    </span>
                    <span className="text-gray-400 text-sm line-through">
                        {formatPrice(item.originalPrice)}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                        {formatPrice(item.price)}
                    </span>
                    {!cartItem ? (
                        <button
                            onClick={handleAddClick}
                            className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => onUpdateQuantity(item.itemId, cartItem.quantity - 1)}
                                className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                            >
                                -
                            </button>
                            <span className="w-8 text-center font-medium">{cartItem.quantity}</span>
                            <button
                                onClick={() => onUpdateQuantity(item.itemId, cartItem.quantity + 1)}
                                className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MenuItem;