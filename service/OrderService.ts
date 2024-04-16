const API_URL = 'http://localhost:3030';

export const OrderService = {
    fetchOrders: async () => {
        try {
            const response = await fetch(`${API_URL}/orders`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    fetchOrderById: async (orderId: number) => {
        const response = await fetch(`${API_URL}/orders/${orderId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        return await response.json();
    },

    postOrder: async (data) => {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to create order');
        }
        return await response.json();
    }
};
