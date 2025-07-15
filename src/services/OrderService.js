import API_BASE_URL from './api';

export const defaultMenuItems = [
    {
        itemId: 'combo-chicken',
        name: 'combo nửa con gà lắc phomai + 2 pepsi',
        description: 'Combo gà lắc phomai kèm 2 pepsi',
        price: 189000,
        originalPrice: 210000,
        discount: 21000,
        imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        category: 'COMBO'
    },
    // ... other menu items ...
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