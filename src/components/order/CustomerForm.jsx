import { formatPrice } from '../../utils/formatters';

function CustomerForm({ customerInfo, onInfoChange, onPlaceOrder, loading, totalAmount }) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Thông tin khách hàng</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên:
                    </label>
                    <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => onInfoChange('name', e.target.value)}
                        placeholder="Nhập họ và tên"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại:
                    </label>
                    <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => onInfoChange('phone', e.target.value)}
                        placeholder="Nhập số điện thoại"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Địa chỉ giao hàng:
                    </label>
                    <textarea
                        value={customerInfo.address}
                        onChange={(e) => onInfoChange('address', e.target.value)}
                        placeholder="Nhập địa chỉ giao hàng"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <button
                    onClick={onPlaceOrder}
                    disabled={loading}
                    className="w-full bg-green-500 text-white py-4 px-6 rounded-md text-lg font-medium hover:bg-green-600 disabled:bg-gray-400 transition-colors"
                >
                    {loading ? 'Đang đặt hàng...' : `Đặt hàng - ${formatPrice(totalAmount)} đ`}
                </button>
            </div>
        </div>
    );
}

export default CustomerForm;