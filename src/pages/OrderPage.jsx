import React, { useState } from 'react';
import { Search, ConciergeBell } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import Banner from '../components/Banner';
import { mockMenuItems } from '../data/mockData'; // Fallback data

const OrderPage = ({ 
  cart, 
  setCart, 
  customerInfo, 
  setCustomerInfo, 
  onPlaceOrder, 
  loading, 
  menuItems, 
  selectedCategory 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  // Use API data if available, otherwise fallback to mock data
  const dataToUse = menuItems.length > 0 ? menuItems : mockMenuItems;

  const filteredItems = dataToUse.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.itemId === item.itemId);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.itemId === item.itemId 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.itemId === itemId 
          ? { ...item, quantity: quantity }
          : item
      ));
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.itemId !== itemId));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <Banner />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Menu</h2>
          <p className="text-gray-600">Choose your favorite dishes</p>
        </div>
        <button
          onClick={() => setCartOpen(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-3 shadow-lg hover:shadow-xl"
        >
          <ConciergeBell size={24} />
          <span className="font-semibold">Place order ({cart.length})</span>
        </button>
      </div>

      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-4 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {loading && menuItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Loading menu items...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <ProductCard
                key={item.itemId}
                item={item}
                onAddToCart={addToCart}
              />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No matching dishes found</p>
            </div>
          )}
        </>
      )}

      <CartSidebar
        isOpen={cartOpen}
        setIsOpen={setCartOpen}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalAmount={getTotalAmount}
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
        onPlaceOrder={onPlaceOrder}
        loading={loading}
      />
    </div>
  );
};

export default OrderPage;