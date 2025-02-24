import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, isAuthenticated, logout } = useUser();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!isAuthenticated) {
                navigate("/login");
                return;
            }

            try {
                const token = localStorage.getItem("token");
                console.log("Token usado:", token);

                const response = await fetch("https://backendtest-8l3s.onrender.com/usuario", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Error al cargar el perfil");
                }

                const data = await response.json();
                console.log("Datos recibidos:", data);

                // Asegurar que los nombres de los campos coincidan
                setUserData({
                    name: data.username || data.name,
                    email: data.email,
                    age: data.edad || data.age,
                    address: data.direccion || data.address,
                    phone: data.telefono || data.phone,
                    rol: data.rol
                });
            } catch (error) {
                console.error("Error fetching profile:", error);
                logout();
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [isAuthenticated, logout, navigate]);

    if (loading) return (
        <div className="container mt-5 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );

    if (!isAuthenticated || !userData) return (
        <div className="container mt-5 text-center">
            <div className="alert alert-danger">
                Acceso denegado. 
                <button className="btn btn-link" onClick={() => navigate("/login")}>
                    Iniciar sesión
                </button>
            </div>
        </div>
    );

    const handleEdit = async () => {
        if (isEditing) {
            try {
                const response = await fetch("https://backendtest-8l3s.onrender.com/usuario", {
                    method: "PUT",
                    headers: { 
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });

                if (!response.ok) {
                    throw new Error("Error al actualizar el perfil");
                }

                alert("Perfil actualizado exitosamente");
            } catch (error) {
                alert(error.message);
                return;
            }
        }
        setIsEditing(!isEditing);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white text-center py-3">
                    <h2 className="mb-0">
                        <i className="bi bi-person-circle me-2"></i>
                        Mi Perfil
                    </h2>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label fw-bold">Nombre:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={userData.name}
                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                    />
                                ) : (
                                    <p className="form-control-plaintext">{userData.name}</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Correo Electrónico:</label>
                                <p className="form-control-plaintext">{userData.email}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Edad:</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={userData.age}
                                        onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                                    />
                                ) : (
                                    <p className="form-control-plaintext">{userData.age}</p>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label fw-bold">Dirección:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={userData.address}
                                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                    />
                                ) : (
                                    <p className="form-control-plaintext">{userData.address}</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Teléfono:</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        className="form-control"
                                        value={userData.phone}
                                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                    />
                                ) : (
                                    <p className="form-control-plaintext">{userData.phone}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2">
                        <button 
                            className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
                            onClick={handleEdit}
                        >
                            {isEditing ? 'Guardar cambios' : 'Editar datos'}
                        </button>
                        <button 
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;