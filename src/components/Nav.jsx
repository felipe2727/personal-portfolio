import { useState, useEffect } from "react";
import useClock from "../hooks/useClock";

export default function Nav() {
  const clock = useClock();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 80); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);

  return (
    <nav aria-label="Main navigation" className="nav" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: "0 40px", height: scrolled ? 52 : 60,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: scrolled ? "rgba(155,154,153,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(1.3)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
    }}>
      <a href="#" aria-label="Scroll to top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ fontFamily: "var(--f-display)", fontSize: 20, fontWeight: 700, color: "var(--ink)", textDecoration: "none", cursor: "pointer" }}>Fe.</a>
      <div style={{ display: "flex", gap: 6 }}>
        {[["Work", "#work"], ["About", "#about"], ["Contact", "#contact"]].map(([l, h]) => (
          <a key={l} href={h} style={{
            fontFamily: "var(--f-sans)", fontSize: 13, color: "var(--muted)", textDecoration: "none",
            padding: "6px 16px", borderRadius: 30,
            border: "1px solid transparent",
            transition: "all 0.3s cubic-bezier(.16,1,.3,1)",
          }}
            onMouseEnter={e => { e.target.style.color = "var(--ink)"; e.target.style.borderColor = "rgba(230,50,40,0.2)"; e.target.style.background = "rgba(230,50,40,0.04)"; }}
            onMouseLeave={e => { e.target.style.color = "var(--muted)"; e.target.style.borderColor = "transparent"; e.target.style.background = "transparent"; }}>{l}</a>
        ))}
      </div>
      <div className="nav-clock" style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--faint)", display: "flex", gap: 12, alignItems: "center" }}>
        <span>Madrid</span>
        <span aria-live="polite" aria-label={`Current time in Madrid: ${clock}`} style={{ color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>{clock}</span>
      </div>
    </nav>
  );
}
