const API_BASE_URL = 'https://gj14wfwtig.execute-api.ap-southeast-1.amazonaws.com/prod';

// Default menu items
const defaultMenuItems = [
    {
        itemId: 'fried-rice',
        name: 'Fried Rice',
        description: 'Fried Rice is a combination of long grained rice, mixture of warm peas, carrots and onions with scrambled eggs mixed all together!',
        price: 10.00,
        imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
        itemId: 'carbonara',
        name: 'Carbonara',
        description: 'Pasta with saffron sauce, bacon, garlic, egg, and parmesan.',
        price: 12.00,
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
        itemId: 'vegan-pizza',
        name: 'Vegan Pizza',
        description: 'Sun-dried tomatoes, broccoli, pizza dough, cashew cream.',
        price: 9.00,
        imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
];

export const loadMenuItems = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/menu`);
        const data = await response.json();
        return data.items && data.items.length > 0 ? data.items : defaultMenuItems;
    } catch (error) {
        console.error('Error loading menu:', error);
        return defaultMenuItems;
    }
};

export const loadOrders = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`);
        const data = await response.json();
        return data.orders || [];
    } catch (error) {
        console.error('Error loading orders:', error);
        return [];
    }
};

export const placeOrder = async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.error || 'Failed to place order');
    }
    
    return result;
};

export const confirmOrder = async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/orders/confirm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.error || 'Failed to confirm order');
    }
    
    return result;
};

export const cancelOrder = async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/orders/cancel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            orderId,
            reason: 'Customer cancellation'
        })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.error || 'Failed to cancel order');
    }
    
    return result;
};