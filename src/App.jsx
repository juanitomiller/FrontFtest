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
import AgeVerification from './assets/components/AgeVerification';  // Corregida la ruta de importación
import Newsletter from './assets/components/Newsletter';
import Reviews from './assets/components/Reviews'; // Importar el nuevo componente Reviews

const App = () => {
    // Mover isAgeVerified al principio y simplificar
    const [isAgeVerified, setIsAgeVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]);
    const [countProducts, setCountProducts] = useState(0);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);

    // Separar la verificación de edad y la carga de productos
    useEffect(() => {
        const verified = localStorage.getItem('ageVerified');
        if (verified === 'true') {
            setIsAgeVerified(true);
        }
        setIsLoading(false);
    }, []);

    // Cargar productos solo después de verificar la edad
    useEffect(() => {
        if (isAgeVerified) {
            const loadProducts = async () => {
                try {
                    //const url = `${import.meta.env.VITE_API_URL}/productos`;
                    const url = `https://backendtest-8l3s.onrender.com/productos`;
                    const response = await fetch(url);
                    const data = await response.json();
                    setProducts(data);
                } catch (error) {
                    console.error("Error loading products:", error);
                }
            };
            loadProducts();
        }
    }, [isAgeVerified]);

    const handleAgeVerification = (verified) => {
        if (verified) {
            setIsAgeVerified(true);
            localStorage.setItem('ageVerified', 'true');
        } else {
            window.location.href = 'https://www.google.cl';
        }
    };

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

    // Mostrar pantalla de carga mientras se verifica el localStorage
    if (isLoading) {
        return <div>Cargando...</div>;
    }

    // Mostrar verificación de edad si no está verificado
    if (!isAgeVerified) {
        return <AgeVerification onVerify={handleAgeVerification} />;
    }

    // 5. Render principal
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
                                <Reviews /> {/* Agregar el componente Reviews aquí */}
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
                <Newsletter />  {/* Agregar el componente Newsletter aquí */}
                <Footer />
            </div>
        </UserProvider>
    );
};

export default App;

