import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignInForm.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const SignInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);
      
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      
      console.log("Login successful", response.data);
      navigate("/dashboard"); // Redirect on success
    } catch (err) {
      console.error("Login failed", err);
      setError("Tus datos son incorrectos, valida tu correo/contraseña.");
      
      // Show popup
      const popup = document.createElement("div");
      popup.innerText = "❌ Tus datos son incorrectos, valida tu correo/contraseña.";
      popup.className = "login-error-popup";
      document.body.appendChild(popup);
      
      setTimeout(() => {
        popup.remove();
      }, 3000);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1 className="form-title">Iniciar sesión en tu cuenta</h1>
        {error && <p className="form-error">{error}</p>}
        <form className="form-content" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="form-label">Tu correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="nombre@empresa.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="form-options">
            <label className="form-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="form-checkbox"
              />
              Recuérdame
            </label>
            <a href="#" className="form-link">¿Olvidaste tu contraseña?</a>
          </div>
          <button type="submit" className="form-button">Iniciar sesión</button>
          <p className="form-footer">
            ¿No tienes una cuenta? <a href="/register" className="form-link">Regístrate</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
