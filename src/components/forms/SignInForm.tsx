import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUpForm.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [institutions, setInstitutions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch schools from API
    const fetchSchools = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/schools`);
        setInstitutions(response.data);
      } catch (err) {
        console.error("Error fetching schools", err);
      }
    };
    fetchSchools();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log('eerer')
    try {
      console.log('urururu')
      const formData = {
        full_name: fullName,
        email,
        cellphone,
        password,
        school_id: institution,
        role: 'teacher'
      };
      const response = await axios.post(`${API_BASE_URL}/auth/register`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Registration successful", response.data);
      navigate("/onboarding"); // Redirect on success
    } catch (err) {
        console.log('herere', formData)
      console.error("Registration failed", err, FormData);
      setError("Error en el registro. Verifica tus datos.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1 className="form-title">Regístrate</h1>
        {error && <p className="form-error">{error}</p>}
        <form className="form-content" onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Nombre completo</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-input" required />
          </div>
          <div>
            <label className="form-label">Correo electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required />
          </div>
          <div>
            <label className="form-label">Teléfono celular</label>
            <input type="tel" value={cellphone} onChange={(e) => setCellphone(e.target.value)} className="form-input" required />
          </div>
          <div>
            <label className="form-label">Institución</label>
            <select value={institution} onChange={(e) => setInstitution(e.target.value)} className="form-input" required>
              <option value="" disabled>Selecciona una institución</option>
              {institutions.map((school) => (
                <option key={school.id} value={school.id}>{school.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" required />
          </div>
          <button type="submit" className="form-button">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
