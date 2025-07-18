import React from 'react';
import { Plus } from 'lucide-react';

const ProductCard = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="flex p-4">
        {/* Square image on the left */}
        <div className="w-25 h-25 flex-shrink-0 mr-3">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/64x64/f3f4f6/9ca3af?text=No+Image';
            }}
          />
        </div>
        
        {/* Content on the right */}
        <div className="flex-1">
          <h3 className="font-semibold text-base text-gray-900 mb-1 leading-tight">{item.name}</h3>
          <p className="text-gray-500 text-sm mb-2 leading-relaxed">{item.description}</p>
          
          <div className="mb-2">
            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded font-medium">
              Tiết kiệm 9.500 ₫
            </span>
            <span className="text-gray-400 text-xs ml-2 line-through">
              {(item.price + 9500).toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold text-gray-900">
              {item.price.toLocaleString()}
            </div>
            <button
              onClick={() => onAddToCart(item)}
              className="bg-green-500 text-white w-8 h-8 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center shadow-sm"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;