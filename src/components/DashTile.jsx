import { useState } from "react";
import useInView from "../hooks/useInView";

export default function DashTile({ children, span = "1/1", delay = 0, style = {}, className = "" }) {
  const [ref, vis] = useInView(0.08);
  const [hov, setHov] = useState(false);
  const [col, row] = span.split("/");

  return (
    <div ref={ref} className={className}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        gridColumn: `span ${col}`, gridRow: `span ${row}`,
        background: hov ? "rgba(26,26,26,0.06)" : "rgba(26,26,26,0.03)",
        border: "1px solid var(--border)",
        borderRadius: 6, padding: 24, position: "relative", overflow: "hidden",
        cursor: "pointer",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}s, background 0.3s ease, border-color 0.3s ease`,
        borderColor: hov ? "rgba(230,50,40,0.15)" : "var(--border)",
        ...style,
      }}
    >
      {/* Corner accent on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: hov ? 30 : 0, height: 2, background: "var(--red)",
        transition: "width 0.4s cubic-bezier(.16,1,.3,1)",
      }} />
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 2, height: hov ? 30 : 0, background: "var(--red)",
        transition: "height 0.4s cubic-bezier(.16,1,.3,1)",
      }} />
      {children}
    </div>
  );
}
