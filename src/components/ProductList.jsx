import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data);
                setError(null);
            } catch (err) {
                setError('Error al cargar los productos. Por favor, verifica la conexión al servidor.');
                console.error('Error detallado:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!products.length) return <div>No hay productos disponibles.</div>;

    return (
        <div className="products-grid">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Precio: ${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
