import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from "react-router-dom";



const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        age: '',
        phone: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        // Validación básica de edad
        if (parseInt(formData.age) < 18) {
            setError("Debes ser mayor de 18 años para registrarte");
            return;
        }
    
        // Validación básica de teléfono
        const phoneRegex = /^\+?56\s?9\s?\d{8}$/;
        if (!phoneRegex.test(formData.phone)) {
            setError("El formato del teléfono debe ser +56 9 XXXXXXXX");
            return;
        }
    
        // Formatear los datos para coincidir con la base de datos
        const formattedData = {
            username: formData.name,  // Cambiado 'name' → 'username'
            email: formData.email,
            password: formData.password,
            direccion: formData.address,  // Cambiado 'address' → 'direccion'
            telefono: formData.phone,  // Cambiado 'phone' → 'telefono'
            edad: parseInt(formData.age), // Aseguramos que la edad sea un número
            rol: "user" // Se asume un rol por defecto
        };
    
        try {
            const response = await fetch("https://beer-chile-api.onrender.com/register", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formattedData)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en el registro");
            }
    
            const data = await response.json();
            alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
            navigate("/login");
        } catch (error) {
            setError(error.message || "Error en la conexión con el servidor");
        }
    };

    return (
        <div className="plox">
            <div className="register-container">
                <h2 className="Logintext">Registro de Usuario</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="left-column">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre completo"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Ingresa tu contraseña"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="form-label">Dirección:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Ingresa tu dirección completa"
                                required
                            />
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Correo:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ejemplo@correo.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age" className="form-label">Edad:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Ingresa tu edad"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">Teléfono:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+56 9 XXXX XXXX"
                                required
                            />
                        </div>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="register-btn">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
