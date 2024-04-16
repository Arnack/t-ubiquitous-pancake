const API_URL = 'http://localhost:3030';

interface Product {
    id?: number;
    name?: string;
    sku?: string;
    description?: string;
    price?: number;
}

export const ProductService = {
    fetchProducts: async () => {
        try {
            const response = await fetch(`${API_URL}/goods`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    fetchProductById: async (productId: number) => {
        const response = await fetch(`${API_URL}/goods/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        return await response.json();
    },

    updateProduct: async (productId: number, data: Product) => {
        const response = await fetch(`${API_URL}/goods/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        return await response.json();
    },
};
