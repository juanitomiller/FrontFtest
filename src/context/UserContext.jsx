import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si el usuario está autenticado al cargar la página
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (storedUser && token) {
        setUser(storedUser);
        setIsAuthenticated(true);
    }
}, []);

// Función para iniciar sesión
const login = (userData, token) => {
  setUser(userData);
  setIsAuthenticated(true);
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("token", token);
};

// Función para cerrar sesión
const logout = () => {
  setUser(null);
  setIsAuthenticated(false);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// Agregar verificación de token
const verifyToken = async (token) => {
  try {
    const response = await fetch("https://beer-chile-api.onrender.com/verify-token", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) {
      logout();
    }
  } catch (error) {
    logout();
  }
};

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    verifyToken(token);
  }
}, []);

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
