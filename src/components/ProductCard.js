import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h2 className="product-card-title">{product.name}</h2>
            <p className="product-card-price">${product.price}</p>
        </div>
    );
};

export default ProductCard;
