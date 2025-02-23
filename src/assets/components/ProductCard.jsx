import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FireAnimation.css';

export const ProductCard = ({ product, onAddProduct }) => {
    const formatPrice = (price) => {
        // Usar 0 como valor de respaldo si price es undefined o null
        const safePrice = price ?? 0;
        
        try {
            // Intentar formatear el precio
            return new Intl.NumberFormat("es-CL", { 
                style: "currency", 
                currency: "CLP", 
                minimumFractionDigits: 0 
            }).format(safePrice);
        } catch {
            // Si hay error, mostrar el precio sin formato
            return `$${safePrice}`;
        }
    };

    const calculateDiscount = (price, originalPrice) => {
        const safePrice = price ?? 0;
        const safeOriginalPrice = originalPrice ?? safePrice;
        
        try {
            if (safeOriginalPrice <= 0) return 0;
            const discount = Math.round((1 - safePrice / safeOriginalPrice) * 100);
            return isNaN(discount) ? 0 : discount;
        } catch {
            return 0;
        }
    };

    // Asegurarnos de que los precios sean números antes de mostrarlos
    const displayPrice = product.price ? product.price : 0;
    const displayOriginalPrice = product.originalPrice ? product.originalPrice : displayPrice;

    return (
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="card-container">
                <div className="card h-100 card-content" style={{ maxWidth: '300px', margin: '0 auto' }}>
                    {product.sale && (
                        <div className="badge bg-dark text-white position-absolute " style={{ top: '0.5rem', right: '0.5rem' }}>
                            {calculateDiscount(displayPrice, displayOriginalPrice)}% OFF
                        </div>
                    )}
                    <img className="card-img-top" src={product.image} alt="Product" />
                    <div className="card-body p-4">
                        <div className="text-center">
                            <h5 className="fw-bolder">{product.name}</h5>
                            {product.rating && (
                                <div className="d-flex justify-content-center small text-warning mb-2">
                                    {Array(product.rating).fill().map((_, i) => (
                                        <div key={i} className="bi-star-fill"></div>
                                    ))}
                                </div>
                            )}
                            {product.sale ? (
                                <>
                                    <span className="text-muted text-decoration-line-through">
                                        {formatPrice(displayOriginalPrice)}
                                    </span>{' '}
                                    {formatPrice(displayPrice)}
                                </>
                            ) : (
                                <span>{formatPrice(displayOriginalPrice)}</span>
                            )}
                        </div>
                    </div>
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center d-flex justify-content-between">
                            <Link 
                                to={`/producto/${product.id}`} 
                                className="btn btn-outline-warning mt-auto text-dark"
                            >
                                Ver Producto
                            </Link>
                            <button 
                                className="btn btn-outline-warning mt-auto text-dark" 
                                onClick={() => onAddProduct(product)}
                            >
                                Añadir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};