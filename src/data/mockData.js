import { Coffee, Cookie, IceCream, Utensils, Popcorn, PackageSearch, Leaf } from 'lucide-react';

// Mock data với hình ảnh thực tế
export const mockMenuItems = [
  { 
    itemId: '1', 
    name: 'Cà phê sữa đá', 
    price: 25000, 
    category: 'Đồ uống', 
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop',
    description: 'Cà phê rang xay pha phin truyền thống với sữa đặc'
  },
  { 
    itemId: '2', 
    name: 'Trà sữa trân châu', 
    price: 35000, 
    category: 'Đồ uống', 
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
    description: 'Trà sữa thơm ngon với topping trân châu đen'
  },
  { 
    itemId: '3', 
    name: 'Bánh mì thịt nướng', 
    price: 15000, 
    category: 'Đồ ăn', 
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    description: 'Bánh mì giòn với thịt nướng và rau sống tươi'
  },
  { 
    itemId: '4', 
    name: 'Phở bò', 
    price: 45000, 
    category: 'Đồ ăn', 
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
    description: 'Phở bò truyền thống với nước dùng đậm đà'
  },
  { 
    itemId: '5', 
    name: 'Bánh flan', 
    price: 20000, 
    category: 'Tráng miệng', 
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
    description: 'Bánh flan mềm mịn với caramel thơm ngon'
  },
  { 
    itemId: '6', 
    name: 'Kem vanilla', 
    price: 18000, 
    category: 'Tráng miệng', 
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    description: 'Kem vanilla tự nhiên mát lạnh'
  },
  { 
    itemId: '7', 
    name: 'Bánh croissant', 
    price: 22000, 
    category: 'Đồ ăn', 
    image: 'https://images.unsplash.com/photo-1555507036-ab794f4eda78?w=400&h=300&fit=crop',
    description: 'Bánh croissant bơ thơm giòn tan'
  },
  { 
    itemId: '8', 
    name: 'Smoothie dâu', 
    price: 28000, 
    category: 'Đồ uống', 
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop',
    description: 'Smoothie dâu tươi ngon bổ dưỡng'
  },
  { 
    itemId: '9', 
    name: 'Tiramisu', 
    price: 32000, 
    category: 'Tráng miệng', 
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    description: 'Tiramisu Ý truyền thống với cà phê đậm đà'
  },
];

export const categories = [
  { id: 'all', name: 'All', icon: Utensils },
  { id: 'Food', name: 'Food', icon: Cookie },
  { id: 'Drink', name: 'Drink', icon: Coffee },
  { id: 'Dessert', name: 'Dessert', icon: IceCream },
  { id: 'Snack', name: 'Snack', icon: Popcorn },
  { id: 'Combo', name: 'Combo', icon: PackageSearch },
  { id: 'Healthy', name: 'Healthy', icon: Leaf },
];