import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Categories({ onCategorySelect }) { // Bỏ selectedCategory khỏi props
    const scrollContainerRef = useRef(null);

    const categories = [
        {
            id: 1,
            title: 'Tất cả',
            value: 'all',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300',
        },
        {
            id: 2,
            title: 'Brand đình deal đậm',
            value: 'DEAL',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300',
        },
        {
            id: 3,
            title: 'Vùng deal siêu đậm',
            value: 'SUPER_DEAL',
            image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300',
        },
        {
            id: 4,
            title: 'City Must Try',
            value: 'MUST_TRY',
            image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300',
        },
        {
            id: 5,
            title: 'Ưu đãi GrabUnlimited',
            value: 'GRAB_UNLIMITED',
            image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=300'
        },
        {
            id: 6,
            title: 'Deal rẻ vô địch',
            value: 'BEST_DEAL',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300'
        },
        {
            id: 7,
            title: 'Deal rẻ vô địch',
            value: 'BEST_DEAL',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300'
        }
    ];

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        const scrollAmount = 300;
        if (container) {
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative">
            <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto scrollbar-hide space-x-4 py-4 px-2"
            >
                {categories.map((category) => (
                    <div 
                        key={category.id}
                        onClick={() => onCategorySelect(category.value)}
                        className="flex-none w-48 relative cursor-pointer group"
                    >
                        <div className="relative h-32 rounded-lg overflow-hidden">
                            <img 
                                src={category.image} 
                                alt={category.title}
                                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                            />
                            {category.type === 'DEAL' && (
                                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                                    DEAL
                                </div>
                            )}
                            {category.badge && (
                                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                    {category.badge}
                                </div>
                            )}
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                            {category.title}
                        </h3>
                    </div>
                ))}
            </div>

            <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
}

export default Categories;