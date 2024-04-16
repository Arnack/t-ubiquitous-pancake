import create from 'zustand';

export const useCartStore = create(set => ({
  cart: [],
  addToCart: (product) => set(state => {
    const index = state.cart.findIndex(item => item.id === product.id);
    if (index >= 0) {
      const newCart = state.cart.slice();
      newCart[index].quantity += 1;
      return { cart: newCart };
    }
    return { cart: [...state.cart, {...product, quantity: 1}] };
  }),
  removeFromCart: (productId) => set(state => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),
  updateQuantity: (productId, quantity) => set(state => ({
    cart: state.cart.map(item => item.id === productId ? {...item, quantity} : item)
  })),
  clearCart: () => set({ cart: [] }),
  countAllItems: () => set(state => state.cart.reduce((total, item) => total + item.quantity, 0)),
}));
