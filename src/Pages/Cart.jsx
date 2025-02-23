import React from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Tu carrito está vacío</h2>
        <Link 
          to="/products" 
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold
                     transition duration-300 ease-in-out transform hover:scale-105 
                     hover:bg-blue-700 shadow-lg"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">Tu Carrito</h2>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {cart.map((item) => (
            <div key={item.id} 
                 className="flex items-center border-b border-gray-200 py-6 last:border-b-0
                          transition duration-300 ease-in-out hover:bg-gray-50">
              <div className="w-32 h-32 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="flex-grow ml-6">
                <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 text-lg mt-1">Precio: ${item.price}</p>
                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center space-x-4">
                    <button 
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                               transition-all duration-300 flex items-center justify-center"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <FaMinus className="text-white" />
                    </button>
                    <span className="px-6 py-2 font-semibold text-gray-700 bg-white">
                      {item.quantity}
                    </span>
                    <button 
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                               transition-all duration-300 flex items-center justify-center"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FaPlus className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right ml-6">
                <p className="text-xl font-bold text-gray-800">
                  ${calculateSubtotal(item.price, item.quantity)}
                </p>
                <button 
                  className="mt-3 bg-red-500 text-white p-2 rounded-md hover:bg-red-600
                           transition-all duration-300 flex items-center justify-center"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))}
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-gray-800">Total:</span>
              <span className="text-3xl font-bold text-blue-600">${calculateTotal()}</span>
            </div>
            <div className="flex justify-between items-center">
              <button 
                onClick={clearCart}
                className="px-6 py-2 bg-red-500 text-white rounded-md font-semibold
                         transition-all duration-300 hover:bg-red-600 shadow-md
                         flex items-center justify-center"
              >
                Vaciar Carrito
              </button>
              <Link 
                to="/checkout"
                className="px-6 py-2 bg-blue-500 text-white rounded-md font-semibold
                         transition-all duration-300 hover:bg-blue-600 shadow-md
                         flex items-center justify-center"
              >
                Proceder al Pago
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
