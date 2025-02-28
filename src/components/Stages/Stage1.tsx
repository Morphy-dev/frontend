// src/components/Stage1.tsx
import React, { useRef, useEffect } from 'react';

// 1) Import the PNG/JPG images normally
import forestBg from '../../assets/forest-background.png';
import forestOverlay from '../../assets/forest-overlay.png';
import butterflyImg from '../../assets/butterfly.png';

import MorphyPathSvg from "../paths/MorphyPathSvg";

const Stage1: React.FC = () => {

  // We'll store a ref to the <svg> that MyPathSVG renders
  const svgRef = useRef<SVGSVGElement | null>(null);

  // We'll also store a ref to the <img> for our butterfly
  const butterflyRef = useRef<HTMLImageElement | null>(null);
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
    // If we don't have the <svg> or <img> in the DOM yet, bail out
    if (!svgRef.current || !butterflyRef.current) {
      console.warn('Either svgRef or butterflyRef is not set yet.');
      return;
    }

    // 3) Within the inlined SVG, find the actual <path> node
    //    We'll use querySelector('path') since we know there's only one <path>.
    const pathElement = svgRef.current.querySelector('path');
    if (!pathElement) {
      console.error('No <path> found inside the inline SVG!');
      return;
    }

    // 4) Now we can call getTotalLength() or getPointAtLength() on that path
    const pathLength = pathElement.getTotalLength();

    let startTime: number | null = null;
    const duration = 3000; // 3 seconds total

    function animateButterfly(timestamp: number) {
      if (startTime === null) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1); // from 0..1

      // Get the point (x,y) along the path at fraction t
      const point = pathElement.getPointAtLength(pathLength * t);

      // Move the butterfly to that (x,y). 
      // Right now it's placing top-left corner at the point.
      // If you want it centered, subtract half the butterfly's width/height.
      butterflyRef.current!.style.transform = `translate(${point.x}px, ${point.y}px) scale(0.7)`;

      if (t < 1) {
        requestAnimationFrame(animateButterfly);
      } else {
        console.log('Butterfly animation complete!');
      }

     
    }

    // 5) Kick off the animation
    requestAnimationFrame(animateButterfly);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Forest Background */}
      <img
        src={forestBg}
        ref={backgroundRef}
        alt="Forest Background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          zIndex: 1
        }}
      />

      {/* Forest Overlay (on top of background) */}
      <img
        src={forestOverlay}
        ref={overlayRef}
        alt="Forest Overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* 6) Render the entire path.svg as inline DOM elements.
             We attach ref={svgRef} so we can query inside it.
             We'll hide it visually by giving it zero size or display:none. */}
      <MorphyPathSvg
        ref={svgRef}
        style={{
          position: 'absolute',
          bottom:'30%',
          left: '15%',
          width: 0,
          height: 0,
          overflow: 'hidden'
        }} 
      />

      {/* The butterfly that we’ll animate along that path */}
      <img
        ref={butterflyRef}
        src={butterflyImg}
        alt="Butterfly"
        style={{
          position: 'absolute',
          transform: 'translate(0, 0)',
          bottom:'30%',
          left: '15%',
          zIndex: 3
        }}
      />

      {/* A simple text caption at the bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          width: '100%',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.4)',
          color: '#fff',
          padding: '1rem',
          zIndex: 4
        }}
      >
        <p>Hi everyone! Today is Monday</p>
      </div>
    </div>
  );
};

export default Stage1;
