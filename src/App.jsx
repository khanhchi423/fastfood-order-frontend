import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Tabs from './components/layout/Tabs';
import SearchBar from './components/home/SearchBar';
import Categories from './components/home/Categories';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderStatus from './components/shared/OrderStatus';
import { loadMenuItems, loadOrders } from './services/OrderService';
import './styles/App.css'
function App() {
    // Basic state
    const [activeTab, setActiveTab] = useState('order');
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderStatus, setOrderStatus] = useState(null);

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState('all');

    // Cart state
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Orders state
    const [orders, setOrders] = useState([]);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Initial data loading
    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                loadMenuData(),
                loadOrdersData()
            ]);
        } catch (error) {
            console.error('Error loading initial data:', error);
            setOrderStatus({
                type: 'error',
                message: 'Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.'
            });
        } finally {
            setLoading(false);
        }
    };

    const loadMenuData = async () => {
        try {
            const items = await loadMenuItems();
            setMenuItems(items);
        } catch (error) {
            console.error('Error loading menu:', error);
            throw error;
        }
    };

    const loadOrdersData = async () => {
        try {
            const ordersData = await loadOrders();
            setOrders(ordersData);
        } catch (error) {
            console.error('Error loading orders:', error);
            throw error;
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setSearchLoading(true);

        // Reset category filter when searching
        setCategoryFilter('all');

        // Simulate search delay
        setTimeout(() => {
            setSearchLoading(false);
        }, 300);
    };

    const handleCategorySelect = (category) => {
        setCategoryFilter(category);
        // Reset search when changing category
        setSearchQuery('');
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // Clear any existing status messages
        setOrderStatus(null);
        
        // Reset filters
        setSearchQuery('');
        setCategoryFilter('all');
        
        // Reload orders when switching to orders tab
        if (tab === 'orders') {
            loadOrdersData();
        }
    };

    // Filter menu items based on search and category
    const filteredMenuItems = menuItems.filter(item => {
        const matchesSearch = searchQuery 
            ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        const matchesCategory = categoryFilter === 'all' 
            ? true 
            : item.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    if (loading && !menuItems.length) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-8 h-8 animate-spin mx-auto text-green-500" />
                    <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header cartItemCount={cart.length} />
            
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    {/* Search Bar */}
                    <div className="mb-8">
                        <SearchBar 
                            onSearch={handleSearch}
                            loading={searchLoading}
                            initialValue={searchQuery}
                        />
                    </div>

                    {/* Categories */}
                    <div className="mb-8">
                        <Categories 
                            onCategorySelect={handleCategorySelect}
                            selectedCategory={categoryFilter}
                        />
                    </div>

                    {/* Tabs and Content */}
                    <div>
                        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
                        
                        <OrderStatus orderStatus={orderStatus} />
                        
                        {activeTab === 'order' ? (
                            <OrderPage
                                menuItems={filteredMenuItems}
                                loading={loading || searchLoading}
                                cart={cart}
                                setCart={setCart}
                                orderStatus={orderStatus}
                                setOrderStatus={setOrderStatus}
                            />
                        ) : (
                            <OrderHistoryPage
                                orders={orders}
                                setOrders={setOrders}
                                setOrderStatus={setOrderStatus}
                            />
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;