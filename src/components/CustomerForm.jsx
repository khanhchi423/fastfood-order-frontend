function CustomerForm({ customerInfo, onInfoChange, onPlaceOrder, loading, totalAmount }) {
    return (
        <div className="form-section">
            <h2 className="section-title">Customer Information</h2>
            <div className="form-group">
                <label>Full Name:</label>
                <input 
                    type="text" 
                    value={customerInfo.name}
                    onChange={(e) => onInfoChange('name', e.target.value)}
                    placeholder="Enter your full name"
                />
            </div>
            <div className="form-group">
                <label>Phone Number:</label>
                <input 
                    type="tel" 
                    value={customerInfo.phone}
                    onChange={(e) => onInfoChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                />
            </div>
            <div className="form-group">
                <label>Delivery Address:</label>
                <textarea 
                    value={customerInfo.address}
                    onChange={(e) => onInfoChange('address', e.target.value)}
                    placeholder="Enter your delivery address"
                    rows="3"
                />
            </div>
            <button 
                className="btn" 
                onClick={onPlaceOrder}
                disabled={loading}
                style={{width: '100%', padding: '15px', fontSize: '16px'}}
            >
                {loading ? 'Placing Order...' : `Place Order - $${totalAmount.toFixed(2)}`}
            </button>
        </div>
    );
}

export default CustomerForm;