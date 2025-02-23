import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ products, onAddProduct }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) return <div>Producto no encontrado</div>;

    return (
        <div className="container my-5">
            <div className="row">
                {/* Columna Izquierda - Imagen */}
                <div className="col-md-4">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="img-fluid rounded shadow"
                    />
                </div>

                {/* Columna Central - Detalles del producto */}
                <div className="col-md-4">
                    <h2 className="mb-3">{product.name}</h2>
                    <p className="h3 mb-3">${product.price}</p>
                    <div className="mb-3">
                        {product.rating && (
                            <div className="d-flex text-warning mb-2">
                                {Array(product.rating).fill().map((_, i) => (
                                    <div key={i} className="bi-star-fill me-1"></div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <h4>Características:</h4>
                        <ul>
                            <li>Marca: {product.brand}</li>
                            <li>Categoría: {product.category}</li>
                            <li>Stock: {product.stock} unidades</li>
                        </ul>
                    </div>
                    <button 
                        className="btn btn-outline-warning"
                        onClick={() => onAddProduct(product)}
                    >
                        Añadir al Carrito
                    </button>
                </div>

                {/* Columna Derecha - Descripción del producto */}
                <div className="col-md-4">
                    <h4>Descripción</h4>
                    <p className="text-muted">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
