import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ countProducts, total, allProducts, onDeleteProduct, onCleanCart }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { isAuthenticated, logout } = useUser();
    const navigate = useNavigate(); // Agregar esta línea

    const handleLogout = () => {
        logout();  // función de cierre de sesión del contexto
        navigate("/");  // Redirigir al usuario a la página de inicio
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark py-4">
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand text-white d-flex align-items-center" to="/">
                    <img 
                        src="../public/img/pngwing.com.png" 
                        alt="Logo" 
                        style={{ 
                            height: '54px',  // Aumentado de 40px a 54px (35% más grande)
                            marginRight: '10px'
                        }} 
                    />
                    Clandestino.cl
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ms-auto flex-grow-0" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item">
                            <Link className="nav-link active text-white" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/catalogo">Catálogo</Link>
                        </li>

                        {!isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/registrate">Registrarse</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/login">Iniciar Sesión</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/profile">Mi Perfil</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link text-white btn btn-link" onClick={handleLogout}>
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Carrito de Compras */}
                    <div className="d-flex ms-auto position-relative">
                        <button 
                            className="btn btn-outline-light"
                            onClick={() => setIsCartOpen(!isCartOpen)}
                        >
                            <i className="bi-cart-fill me-1"></i>
                            Carrito
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{countProducts}</span>
                        </button>
                        
                        {isCartOpen && (
                            <div className="position-absolute top-100 end-0 mt-2 rounded shadow-lg p-3" style={{
                                width: '300px',
                                zIndex: 1000,
                                right: 0,
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                <h6 className="text-dark mb-3">Carrito de Compras</h6>
                                {allProducts.length ? (
                                    <>
                                        {allProducts.map(product => (
                                            <div key={product.id} className="d-flex justify-content-between align-items-center mb-2">
                                                <div className="text-dark">
                                                    <span>{product.name}</span>
                                                    <span className="ms-2">x{product.quantity}</span>
                                                </div>
                                                <div>
                                                    <span className="text-dark me-2">${product.price * product.quantity}</span>
                                                    <button 
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => onDeleteProduct(product)}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="border-top pt-2 mt-2">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-dark fw-bold">Total:</span>
                                                <span className="text-dark">${total}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <button 
                                                    className="btn btn-sm btn-danger"
                                                    onClick={onCleanCart}
                                                >
                                                    Vaciar
                                                </button>
                                                <Link 
                                                    to="/cart" 
                                                    className="btn btn-sm btn-success"
                                                    onClick={() => setIsCartOpen(false)}
                                                >
                                                    Ver Carrito
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-dark mb-0">El carrito está vacío</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;