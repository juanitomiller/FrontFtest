import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('https://backendtest-8l3s.onrender.com/usuario', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }

                const data = await response.json(); // { username, email, direccion, telefono }
                setUserData(data[0]); // Solo se espera un usuario
                setIsAuthenticated(true); // Si se obtiene el usuario, se considera autenticado
            } catch (err) {
                setError(err.message);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    if (loading) {
        return <div className="container mt-5"><h2>Cargando...</h2></div>;
    }

    if (error) {
        return <div className="container mt-5"><h2>Error: {error}</h2></div>;
    }

    if (!isAuthenticated) {
        return (
            <div className="container mt-5">
                <h2>No tienes acceso al perfil</h2>
                <p>Por favor, inicia sesión para ver tu perfil.</p>
            </div>
        );
    }

    return (
        <div className="container mt-5 fondo">
            <div className="card shadow">
                <div className="card-header bg-dark text-white text-center py-3">
                    <h2 className="mb-0">
                        <i className="bi bi-person-circle me-2"></i>
                        Mi Perfil
                    </h2>
                </div>
                <div className="card-body">
                    {userData ? (
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nombre:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={userData.username}
                                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{userData.username || 'No disponible'}</p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Correo Electrónico:</label>
                                    <p className="form-control-plaintext">{userData.email}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Dirección:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={userData.direccion}
                                            onChange={(e) => setUserData({ ...userData, direccion: e.target.value })}
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{userData.direccion || 'No disponible'}</p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Teléfono:</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            className="form-control"
                                            value={userData.telefono}
                                            onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{userData.telefono || 'No disponible'}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>No hay datos disponibles</p>
                    )}
                    <div className="d-grid gap-2">
                        <button 
                            className={`btn ${isEditing ? 'btn-success' : 'btn-secondary'}`}
                            onClick={handleEdit}
                        >
                            {isEditing ? 'Guardar cambios' : 'Editar datos'}
                        </button>
                        <button 
                            className="btn btn-warning"
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