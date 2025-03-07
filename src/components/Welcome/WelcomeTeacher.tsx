import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import "./WelcomeScreen.css"; // Import CSS file

const WelcomeTeacher = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-wrapper">
        {/* Centered text */}
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Bienvenido a Morphy
          </h2>
          <p className="mt-4 text-lg text-gray-600 sm:text-xl">
            Únete a nuestra comunidad y comienza a compartir conocimientos hoy mismo.
          </p>
        </div>

        {/* Cards */}
        <div className="welcome-grid">
          {/* Existing teacher card */}
          <div className="welcome-card" onClick={() => navigate("/login")}>
            <h3>Soy un profe Morphy</h3>
            <p>Inicia sesión.</p>
            <div className="action login">
              Ingresar
              <ArrowRightIcon />
            </div>
          </div>

          {/* New teacher card */}
          <div className="welcome-card" onClick={() => navigate("/register")}>
            <h3>Aún no soy un profe Morphy</h3>
            <p>Regístrate para empezar.</p>
            <div className="action register">
              Registrarme
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default WelcomeTeacher;
