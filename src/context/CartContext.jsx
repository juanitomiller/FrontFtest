import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  const addToCart = (product) => {
    const productExists = allProducts.find(item => item.id === product.id);

    if (productExists) {
      const updatedProducts = allProducts.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setAllProducts(updatedProducts);
    } else {
      setAllProducts([...allProducts, { ...product, quantity: 1 }]);
    }

    setTotal(total + product.price);
    setCountProducts(countProducts + 1);
  };

  const deleteFromCart = (product) => {
    const productExists = allProducts.find(item => item.id === product.id);
  
    if (productExists && productExists.quantity > 1) {
      const updatedProducts = allProducts.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setAllProducts(updatedProducts);
      setTotal(total - product.price);
      setCountProducts(countProducts - 1);
    } else {
      const updatedProducts = allProducts.filter(item => item.id !== product.id);
      setAllProducts(updatedProducts);
      setTotal(total - product.price);
      setCountProducts(countProducts - 1);
    }
  };
  
  const cleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  return (
    <CartContext.Provider value={{ allProducts, total, countProducts, addToCart, deleteFromCart, cleanCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
