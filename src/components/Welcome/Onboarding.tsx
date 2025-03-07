import { useEffect } from "react";
import "./Onboarding.css";

const Onboarding = () => {
  useEffect(() => {
    // Show welcome popup
    const popup = document.createElement("div");
    popup.innerText = "✅ ¡Bienvenido de vuelta!";
    popup.className = "welcome-popup";
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 3000);
  }, []);

  return (
    <div className="onboarding-container">
      <div className="onboarding-wrapper">
        <h1 className="onboarding-title">Onboarding</h1>
      </div>
    </div>
  );
};

export default Onboarding;