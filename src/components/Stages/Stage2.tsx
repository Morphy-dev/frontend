import React, { useRef, useEffect } from "react";
import forestBg from "../../assets/forest-background.png";
import forestOverlay from "../../assets/forest-overlay.png";
import butterflyImg from "../../assets/butterfly.png";
import "./Stage2.css"; // Importing styles

const Stage2: React.FC = () => {
  const backgroundRef = useRef<HTMLImageElement | null>(null);
  const morphyRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Example: Slight background animation for depth effect
    if (backgroundRef.current) {
      backgroundRef.current.animate(
        [
          { transform: "translateY(0px)" },
          { transform: "translateY(-10px)" },
          { transform: "translateY(0px)" },
        ],
        {
          duration: 3000,
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
    }
 // Morphy floating animation (same as Stage 3 but always bigger)
 if (morphyRef.current) {
    morphyRef.current.animate(
      [{ transform: "translate(-50%, -50%) scale(3)" }, { transform: "translate(-50%, -55%) scale(3)" }, { transform: "translate(-50%, -50%) scale(3)" }],
      { duration: 3000, iterations: Infinity, easing: "ease-in-out" }
    );
  }
  }, []);

  return (
    <div className="stage2-container">
      {/* Background */}
      <img src={forestBg} alt="Forest Background" className="bg-layer layer1" ref={backgroundRef} />

      {/* Overlay */}
      <img src={forestOverlay} alt="Forest Overlay" className="bg-layer layer2" />

      {/* Morphy in a fixed position */}
      <img ref={morphyRef} src={butterflyImg} alt="Morphy" className="morphy-fixed" />

      {/* Caption Bar */}
      <div className="caption">
        <p>Hello friends! My name is Morphy</p>
      </div>
    </div>
  );
};

export default Stage2;
