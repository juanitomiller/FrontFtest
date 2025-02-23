import React from 'react';
import { ProductCard } from './ProductCard';

const ProductGalery = ({ products, onAddProduct }) => {
    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <h2 className="text-center mb-4">Catálogo Completo</h2>
                <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-4 justify-content-center">
                    {products.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            onAddProduct={onAddProduct}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGalery;