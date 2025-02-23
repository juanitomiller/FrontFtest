import React from 'react';
import { ProductCard }  from './ProductCard';

export const ProductList = ({ products }) => {
    const MAX_PRODUCTS = 4;

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {products
                        .filter(product => product.sale) // Filtra solo productos con sale: true
                        .slice(0, MAX_PRODUCTS) // Toma los primeros 4 productos después del filtro
                        .map((product, index) => (
                            <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

