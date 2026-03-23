import { useState, useEffect } from "react";

export default function EcheverriTitle() {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [flipPhase, setFlipPhase] = useState(0);

  useEffect(() => { setTimeout(() => setLoaded(true), 400); }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipPhase(1);
      setTimeout(() => setFlipPhase(0), 1200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const isFlipping = flipPhase === 1;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: "1200px", cursor: "pointer", position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
    >
      {/* Glitch layers — red + amber on grey */}
      {hovered && (
        <>
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--f-display)", fontSize: "clamp(72px, 13vw, 200px)", fontWeight: 700,
            letterSpacing: "0.05em", color: "transparent",
            WebkitTextStroke: "1px var(--red)",
            transform: "translate(-3px, -2px)", animation: "glitch1 0.15s infinite",
            pointerEvents: "none", zIndex: 3,
          }}>ECHEVERRI</div>
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--f-display)", fontSize: "clamp(72px, 13vw, 200px)", fontWeight: 700,
            letterSpacing: "0.05em", color: "transparent",
            WebkitTextStroke: "1px var(--red)",
            transform: "translate(3px, 2px)", animation: "glitch2 0.15s infinite",
            pointerEvents: "none", zIndex: 3,
          }}>ECHEVERRI</div>
        </>
      )}

      {/* Main text */}
      <h1 style={{
        fontFamily: "var(--f-display)", fontSize: "clamp(72px, 13vw, 200px)", fontWeight: 700,
        letterSpacing: "0.05em", color: "var(--ink)", textAlign: "center", userSelect: "none", margin: 0,
        transformStyle: "preserve-3d",
        transform: isFlipping ? "rotateY(360deg)" : hovered ? "rotateY(12deg) rotateX(-3deg) scale(1.02)" : "rotateY(0deg)",
        transition: isFlipping ? "transform 1.2s cubic-bezier(.25,.46,.45,.94)" : "transform 0.4s cubic-bezier(.16,1,.3,1)",
        position: "relative", zIndex: 2,
        textShadow: hovered ? "0 0 80px rgba(230,50,40,0.1), 0 0 160px rgba(230,50,40,0.04)" : "none",
        opacity: loaded ? 1 : 0, filter: loaded ? "none" : "blur(10px)", willChange: "transform",
      }}>ECHEVERRI</h1>

      {/* Reflection */}
      <div style={{
        position: "absolute", bottom: -6, left: 0, right: 0, height: "50%",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        fontFamily: "var(--f-display)", fontSize: "clamp(72px, 13vw, 200px)", fontWeight: 700,
        letterSpacing: "0.05em", color: "var(--ink)", transform: "scaleY(-1)", opacity: 0.04,
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)",
        pointerEvents: "none", zIndex: 1,
      }}>ECHEVERRI</div>
    </div>
  );
}
