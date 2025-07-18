import React from 'react';
import { Star } from 'lucide-react';

const Banner = () => {
  return (
    <div 
      className="relative rounded-2xl p-8 mb-8 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://t4.ftcdn.net/jpg/04/17/20/73/360_F_417207342_G7LYJqMP12em9M6szV1rEaUEGuVwBEYH.jpg')`
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Welcome to FAST FOOD System</h1>
            <p className="text-xl mb-4 opacity-90">Enjoy delicious meals at great prices</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400 fill-current" size={20} />
                <Star className="text-yellow-400 fill-current" size={20} />
                <Star className="text-yellow-400 fill-current" size={20} />
                <Star className="text-yellow-400 fill-current" size={20} />
                <Star className="text-yellow-400 fill-current" size={20} />
                <span className="ml-2 text-lg font-medium">5.0 (2,350 reviews)</span>
              </div>
            </div>
          </div>    
        </div>
        
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-sm opacity-90">Free Delivery</div>
            <div className="font-semibold">Orders from 100K</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-sm opacity-90">Delivery Time</div>
            <div className="font-semibold">15-30 minutes</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-sm opacity-90">Discount</div>
            <div className="font-semibold">Up to 20%</div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
    </div>
  );
};

export default Banner;
