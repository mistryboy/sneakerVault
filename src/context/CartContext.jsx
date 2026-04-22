import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    if (authLoading) return;

    const initCart = () => {
      setIsInitializing(true);
      // Reverting to Simple Method: Everything is localStorage
      const localCartStr = localStorage.getItem('vault_cart');
      setCart(localCartStr ? JSON.parse(localCartStr) : []);
      setIsInitializing(false);
    };

    initCart();
  }, [user, authLoading]);

  const syncCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('vault_cart', JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    const size = product.selectedSize || product.sizes[0];
    const existing = cart.find((item) => item.id === product.id && item.selectedSize === size);
    
    let newCart;
    if (existing) {
      newCart = cart.map((item) =>
        item.id === product.id && item.selectedSize === size
          ? { ...item, quantity: item.quantity + (product.quantity || 1) }
          : item
      );
    } else {
      newCart = [...cart, { ...product, selectedSize: size, quantity: product.quantity || 1 }];
    }
    
    syncCart(newCart);
    setCartOpen(true);
    addToast(`${product.name} added to your vault.`, 'cart');
  };

  const updateCartQty = (item, delta) => {
    const newCart = cart
      .map((ci) =>
        ci.id === item.id && ci.selectedSize === item.selectedSize
          ? { ...ci, quantity: ci.quantity + delta }
          : ci
      )
      .filter((ci) => ci.quantity > 0);
    
    syncCart(newCart);
  };

  const removeFromCart = (item) => {
    const newCart = cart.filter((ci) => !(ci.id === item.id && ci.selectedSize === item.selectedSize));
    syncCart(newCart);
    addToast(`${item.name} removed from vault.`, 'info');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateCartQty,
      removeFromCart,
      totalItems,
      totalPrice,
      cartOpen,
      setCartOpen,
      isInitializing
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
