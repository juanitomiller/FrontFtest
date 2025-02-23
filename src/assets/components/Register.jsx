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
    
        // Log de datos antes de formatear
        console.log('Datos del formulario:', formData);
    
        const formattedData = {
            username: formData.name.trim(),
            email: formData.email.toLowerCase().trim(),
            password: formData.password,
            direccion: formData.address.trim(),
            telefono: formData.phone.replace(/\s/g, ''), // Eliminar espacios del teléfono
            edad: parseInt(formData.age),
            rol: "user"
        };

        // Log de datos formateados
        console.log('Datos formateados:', formattedData);
    
        try {
            console.log('Iniciando petición al servidor...');
            const response = await fetch("https://backendtest-8l3s.onrender.com/users", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    // Agregamos CORS headers
                    "Access-Control-Allow-Origin": "*"
                },
                credentials: 'include', // Incluir cookies si es necesario
                body: JSON.stringify(formattedData)
            });
    
            console.log('Respuesta del servidor:', response.status);
            const data = await response.json();
            console.log('Datos de respuesta:', data);

            if (!response.ok) {
                throw new Error(data.message || "Error en el registro");
            }
    
            alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
            navigate("/login");
        } catch (error) {
            console.error("Error completo:", error);
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
