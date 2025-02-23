import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from "react-router-dom";
import './Profile.css';

const Profile = () => {
    const { user, isAuthenticated, logout } = useUser();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            setLoading(true);
            fetch("https://beer-chile-api.onrender.com/profile", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => {
                if (!res.ok) throw new Error("Error al cargar perfil");
                return res.json();
            })
            .then(data => setUserData(data))
            .catch(() => {
                logout();
                navigate("/login");
            })
            .finally(() => setLoading(false));
        }
    }, [isAuthenticated, logout, navigate]);

    if (loading) return <div>Cargando...</div>;
    if (!isAuthenticated || !userData) return <div>Acceso denegado. <button onClick={() => navigate("/login")}>Iniciar sesión</button></div>;

    const handleEdit = async () => {
        if (isEditing) {
            try {
                const response = await fetch("https://beer-chile-api.onrender.com/profile", {
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
        <div className="profile-container">
            <div className="profile-header">
                <span className="profile-icon">👤</span>
                <h2>Mi Perfil</h2>
            </div>
            <div className="profile-info">
                <div className="profile-item">
                    <label>Nombre:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                    ) : (
                        <span>{userData.name}</span>
                    )}
                </div>
                <div className="profile-item">
                    <label>Correo Electrónico:</label>
                    <span>{userData.email}</span>
                </div>
                <div className="profile-item">
                    <label>Edad:</label>
                    {isEditing ? (
                        <input
                            type="number"
                            value={userData.age}
                            onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                        />
                    ) : (
                        <span>{userData.age}</span>
                    )}
                </div>
                <div className="profile-item">
                    <label>Dirección:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={userData.address}
                            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        />
                    ) : (
                        <span>{userData.address}</span>
                    )}
                </div>
                <div className="profile-item">
                    <label>Teléfono:</label>
                    {isEditing ? (
                        <input
                            type="tel"
                            value={userData.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        />
                    ) : (
                        <span>{userData.phone}</span>
                    )}
                </div>
            </div>
            <button className="edit-button" onClick={handleEdit}>
                {isEditing ? 'Guardar cambios' : 'Editar datos'}
            </button>
            <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default Profile;