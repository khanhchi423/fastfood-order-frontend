function Tabs({ activeTab, onTabChange }) {
    return (
        <div className="tabs">
            <button 
                className={`tab ${activeTab === 'order' ? 'active' : ''}`}
                onClick={() => onTabChange('order')}
            >
                Place Order
            </button>
            <button 
                className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => onTabChange('orders')}
            >
                View Orders
            </button>
        </div>
    );
}

export default Tabs;