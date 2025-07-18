import React from 'react';
import { categories } from '../data/mockData';

const Sidebar = ({ activeTab, setActiveTab, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="w-64 bg-white h-auto p-4 border-r border-gray-200 shadow-sm flex flex-col justify-between min-h-screen">
      
      <div>
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/FASTFOOD1.png" 
            alt="Fast Food Logo" 
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('order')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                activeTab === 'order' 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Place order
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                activeTab === 'orders' 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              View order
            </button>
          </div>
        </div>

        {/* Categories */}
        {activeTab === 'order' && (
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                      selectedCategory === category.id 
                        ? 'bg-green-50 text-green-700 border-l-4 border-green-500' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ✅ Bottom CTA Section */}
      <div className="mt-8">
        <button
            onClick={() => alert('Go to order page')}
            className="w-full flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-3 transition shadow-md"
        >
           <img
            src="https://food.grab.com/static/page-home/bottom-food-options.svg"
            alt="Food Icon"
            className="h-6 w-6"
            />
            <div className="text-left">
            <p className="text-sm font-semibold">Fast & Delicious</p>
            <p className="text-xs">Click to place your order</p>
            </div>
        </button>
        </div>
    </div>
  );
};

export default Sidebar;
