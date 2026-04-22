import { createContext, useContext, useState, useEffect } from 'react';
import { allProducts } from '../data/products';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(allProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reverting to Simple Method: Load products from local data file
    setProducts(allProducts);
    setLoading(false);
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
