import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const validarInput = async (e) => {
      e.preventDefault();
      setError("");

      try {
          const response = await fetch("https://backendtest-8l3s.onrender.com/login", {
              method: "POST",
              headers: { 
                  "Content-Type": "application/json"
              },
              mode: 'cors',
              credentials: 'omit',
              body: JSON.stringify({
                  email: email.toLowerCase().trim(),
                  password: password
              })
          });

          const data = await response.json();
          console.log('Datos de respuesta:', data);

          // Verificar si tenemos los datos necesarios
          if (data && (data.token || data.user)) {
              const userData = {
                  // Asegurarse de que tengamos todos los campos necesarios
                  user: data.user || data,
                  token: data.token || ''
              };

              console.log('Datos procesados:', userData);
              
              // Guardar en el contexto y localStorage
              login(userData.user, userData.token);
              
              // Redireccionar
              navigate('/profile');
              return;
          }

          // Si llegamos aquí, algo salió mal
          throw new Error(data.message || "Error en el formato de respuesta");
          
      } catch (error) {
          console.error('Error completo:', error);
          setError("Error en el inicio de sesión. Verifica tus credenciales.");
      }
  };

  return (
    <div className="container plox mt-5">
      <div className="login-form-container">
        <form onSubmit={validarInput}>
          <fieldset>
            <legend className="Logintext">Inicio de Sesión</legend>
            <hr />
            <div className="mb-3">
              <label htmlFor="userEmail" className="form-label">
                Ingrese su correo electrónico
              </label>
              <input
                type="email"
                id="userEmail"
                className="form-control"
                placeholder="correo@ejemplo.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <hr />
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="userPassword" className="form-label">
                  Ingrese su contraseña
                </label>
                <input
                  type="password"
                  id="userPassword"
                  className="form-control"
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>
            <hr />
            <button type="submit" className="register-btn">
              Iniciar sesión
            </button>
            <hr />
          </fieldset>
        </form>
        {error && (
          <p className="bg-danger text-light fs-6 p-3 rounded border border-danger-subtle mt-3">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
