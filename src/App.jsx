import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './assets/components/Navbar';
import Header from './assets/components/Header';
import Footer from './assets/components/Footer';
import { Login } from './assets/components/Login'; // Asegúrate de importar Login
import { UserProvider } from './context/UserContext'; // Asegúrate de importar UserProvider
import { Cart } from './assets/components/Cart';
import Register from './assets/components/Register';
import ProductGalery from './assets/components/ProductGalery';
import { ProductCard } from './assets/components/ProductCard'; // Cambiado: eliminado los corchetes
import ProductDetail from './assets/components/ProductDetail'; // Asegúrate de importar ProductDetail
import Profile from "./assets/components/Profile";

const App = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [countProducts, setCountProducts] = useState(0);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);

    const consultarApi = async () => {
        //const url = "https://beer-chile-api.onrender.com/productos";
        const url = "http://localhost:3000/productos";
        const response = await fetch(url);
        const data = await response.json();
        console.log("ejecutada consulta a productos", data)
        setProducts(data);
      };
    
      useEffect(() => {
        consultarApi();
      }, []);

    const calculateTotal = (products) => {
        return products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    };

    const onAddProduct = (product) => {
        const exists = allProducts.find(item => item.id === product.id);
        let updatedProducts;
        
        if (exists) {
            updatedProducts = allProducts.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedProducts = [...allProducts, { ...product, quantity: 1 }];
        }
        
        setAllProducts(updatedProducts);
        setTotal(calculateTotal(updatedProducts));
        setCountProducts(countProducts + 1);
    };

    const onDeleteProduct = (product) => {
        const updatedProducts = allProducts.map(item =>
             item.id === product.id ? {...item, quantity: item.quantity - 1 } : item
        ). filter(item => item.quantity > 0);

        setAllProducts(updatedProducts);
        setTotal(calculateTotal(updatedProducts));
        setCountProducts(updatedProducts.reduce((total, item) => total + item.quantity, 0));

       /* const updatedProducts = allProducts.filter(item => item.id !== product.id);
        setAllProducts(updatedProducts);
        setTotal(calculateTotal(updatedProducts));
        setCountProducts(countProducts - product.quantity);*/
    };

    const onCleanCart = () => {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);
    };

    // Seleccionar solo los primeros 4 productos para el Home
    const featuredProducts = products.slice(0, 4);

    return (
        <UserProvider> {/* Asegúrate de envolver todo el contenido dentro de UserProvider */}
            <div>
                <Navbar 
                    countProducts={countProducts}
                    total={total}
                    allProducts={allProducts}
                    onDeleteProduct={onDeleteProduct}
                    onCleanCart={onCleanCart}
                />
                <Header />
                <div className="container px-4 px-lg-5 mt-5">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <h2 className="text-center mb-4">Productos Destacados</h2>
                                <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-4 justify-content-center">
                                    {featuredProducts.map(product => (
                                        <ProductCard 
                                            key={product.id} 
                                            product={product} 
                                            onAddProduct={onAddProduct} 
                                        />
                                    ))}
                                </div>
                            </>
                        } />
                        <Route path="/login" element={<Login />} />
                        <Route path="/cart" element={
                            <Cart 
                                allProducts={allProducts} 
                                countProducts={countProducts} 
                                total={total} 
                                onAddProduct={onAddProduct} 
                                onDeleteProduct={onDeleteProduct} 
                                onCleanCart={onCleanCart} 
                            />
                        } />
                        <Route path="/registrate" element={<Register />} />
                        <Route path="/catalogo" element={
                            <ProductGalery 
                                products={products}
                                onAddProduct={onAddProduct}
                            />
                        } />
                        <Route 
                            path="/producto/:id" 
                            element={
                                <ProductDetail 
                                    products={products} 
                                    onAddProduct={onAddProduct}
                                />
                            } 
                        />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </UserProvider>
    );
};

export default App;

