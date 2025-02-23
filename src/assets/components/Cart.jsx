import React, { useState } from 'react';
import './Cart.css';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

export const Cart = ({ allProducts, countProducts, total, onAddProduct, onDeleteProduct, onCleanCart }) => {
  return (
    <div className="cart-container">
      <h2 className="cart-title">
        <FaShoppingCart className="cart-icon" /> Carrito de Compras
      </h2>
      {allProducts.length ? (
        <>
          <ul className="cart-items">
            {allProducts.map(product => (
              <li key={product.id} className="cart-item">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{product.name}</h3>
                  <p className="cart-item-quantity">Cantidad: {product.quantity}</p>
                  <p className="cart-item-price">${product.price}</p>
                </div>
                <button 
                  className="delete-button bg-warning"
                  onClick={() => onDeleteProduct(product)}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p className="cart-total">Total: <span>${total}</span></p>
            <p className="cart-count">Productos: <span>{countProducts}</span></p>
            <button 
              className="clean-cart-button bg-black"
              onClick={onCleanCart}
            >
              Limpiar Carrito
            </button>
            <button 
              className="pay-button bg-black"
              onClick={() => console.log('Ir a pagar')}
            >
              Ir a pagar
            </button>
          </div>
        </>
      ) : (
        <p className="empty-cart">Tu carrito está vacío</p>
      )}
    </div>
  );
};

const CartContainer = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [countProducts, setCountProducts] = useState(0);
  const [total, setTotal] = useState(0);

  const onAddProduct = (product) => {
    const exists = allProducts.find(item => item.id === product.id);
    if (exists) {
      const updatedProducts = allProducts.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setAllProducts(updatedProducts);
    } else {
      setAllProducts([...allProducts, { ...product, quantity: 1 }]);
    }
    setTotal(total + product.price);
    setCountProducts(countProducts + 1);
  };

  const onDeleteProduct = (product) => {
    const filteredProducts = allProducts.filter(item => item.id !== product.id);
    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(filteredProducts);
  };

  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  return (
    <Cart
      allProducts={allProducts}
      countProducts={countProducts}
      total={total}
      onAddProduct={onAddProduct}
      onDeleteProduct={onDeleteProduct}
      onCleanCart={onCleanCart}
    />
  );
};