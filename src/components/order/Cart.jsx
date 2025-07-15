import { formatPrice } from '../../utils/formatters';

function Cart({ cart, onUpdateQuantity, onRemoveFromCart, totalAmount }) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
            {cart.map(item => (
                <div key={item.itemId} className="flex items-center justify-between py-3">
                    <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">{formatPrice(item.price)} đ mỗi món</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => onUpdateQuantity(item.itemId, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                            -
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item.itemId, item.quantity + 1)}
                            className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600"
                        >
                            +
                        </button>
                        <button
                            onClick={() => onRemoveFromCart(item.itemId)}
                            className="ml-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                        >
                            Xóa
                        </button>
                    </div>
                </div>
            ))}
            <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-green-600">{formatPrice(totalAmount)} đ</span>
                </div>
            </div>
        </div>
    );
}

export default Cart;