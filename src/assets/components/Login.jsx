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
          const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password })
          });

          const data = await response.json();

          if (!response.ok) {
              throw new Error(data.message || "Error al iniciar sesión");
          }

          // Guardar el token y actualizar el contexto
          login(data.user, data.token);
          navigate("/profile");
      } catch (error) {
          setError(error.message);
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
