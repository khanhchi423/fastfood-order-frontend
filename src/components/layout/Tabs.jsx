function Tabs({ activeTab, onTabChange }) {
    return (
        <div className="bg-white shadow-amber-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex space-x-8">
                    <button
                        className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === 'order'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                        onClick={() => onTabChange('order')}
                    >
                        Place Order
                    </button>
                    <button
                        className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === 'orders'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                        onClick={() => onTabChange('orders')}
                    >
                        View Orders
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Tabs;