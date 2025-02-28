import React, { useRef, useEffect } from "react";
import forestBg from "../../assets/forest-background.png";
import forestOverlay from "../../assets/forest-overlay.png";
import butterflyImg from "../../assets/butterfly.png";
import talaImg from "../../assets/tala.png"; // New character Tala
import "./Stage3.css"; // Import styles

const Stage3: React.FC = () => {
  const morphyRef = useRef<HTMLImageElement | null>(null);
  const talaRef = useRef<HTMLImageElement | null>(null);
  const backgroundRef = useRef<HTMLImageElement | null>(null);
  const overlayRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {

     // Background parallax effect
        if (backgroundRef.current) {
            backgroundRef.current.animate(
              [{ transform: "translateY(0px)" }, { transform: "translateY(-10px)" }, { transform: "translateY(0px)" }],
              { duration: 4000, iterations: Infinity, easing: "ease-in-out" }
            );
          }
      
          // Overlay parallax effect
          if (overlayRef.current) {
            overlayRef.current.animate(
              [{ transform: "translateY(0px)" }, { transform: "translateY(5px)" }, { transform: "translateY(0px)" }],
              { duration: 4000, iterations: Infinity, easing: "ease-in-out" }
            );
          }
    // Morphy floating animation (up and down)
    if (morphyRef.current) {
      morphyRef.current.animate(
        [
          { transform: "translate(-50%, -50%) translateY(0px) scale(2)" },
          { transform: "translate(-50%, -50%) translateY(-15px) scale(2)" },
          { transform: "translate(-50%, -50%) translateY(0px) scale(2)" },
        ],
        {
          duration: 3000,
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
    }

    // Tala enters from the bottom
    if (talaRef.current) {
      talaRef.current.animate(
        [
          { transform: "translate(-50%, 100%)", opacity: 0 }, // Start off-screen
          { transform: "translate(-50%, -20%)", opacity: 1 }, // End at position
        ],
        {
          duration: 2000,
          fill: "forwards",
          easing: "ease-out",
          delay: 1000, // Tala appears after a brief pause
        }
      );
    }
  }, []);

  return (
    <div className="stage3-container">
      {/* Background */}
      <img ref={backgroundRef} src={forestBg} alt="Forest Background" className="bg-layer layer1" />

      {/* Overlay */}
      <img ref={overlayRef} src={forestOverlay} alt="Forest Overlay" className="bg-layer layer2" />

      {/* Tala entering from bottom */}
      <img src={talaImg} alt="Tala" className="tala-entering" ref={talaRef} />

      {/* Morphy (Butterfly) - Now in the front and to the right */}
      <img src={butterflyImg} alt="Morphy" className="morphy-right" ref={morphyRef} />

      {/* Caption Bar */}
      <div className="caption">
        <p>Oh listen! Let’s go and see!</p>
      </div>
    </div>
  );
};

export default Stage3;
