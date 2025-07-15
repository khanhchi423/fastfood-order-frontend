import { ShoppingCart, MapPin } from 'lucide-react';

function Header() {
    return (
        <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold text-green-600">GrabFood</h1>
                        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                            <MapPin className="w-4 h-4 text-red-500" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ShoppingCart className="w-6 h-6 text-gray-600" />
                        <span className="text-gray-600">VI</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;