import React from 'react';
import { ConciergeBell, Plus, Minus, X } from 'lucide-react';

const CartSidebar = ({ 
  isOpen, 
  setIsOpen, 
  cart, 
  updateQuantity, 
  removeFromCart, 
  getTotalAmount, 
  customerInfo, 
  setCustomerInfo, 
  onPlaceOrder, 
  loading 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 w-96 bg-white h-full shadow-xl">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Your Order</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ConciergeBell size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Your order is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.itemId} className="flex items-center space-x-4 border-b pb-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-green-600 font-semibold">{item.price.toLocaleString()}đ</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.itemId)}
                      className="ml-2 text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">{getTotalAmount().toLocaleString()}đ</span>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <h3 className="font-semibold text-lg text-gray-800">Customer Information</h3>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Delivery Address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows="3"
                />
              </div>
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={onPlaceOrder}
              disabled={loading || !customerInfo.name || !customerInfo.phone || !customerInfo.address}
              className="w-full bg-green-500 text-white py-4 px-6 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              {loading ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
