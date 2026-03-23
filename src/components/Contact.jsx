import useClock from "../hooks/useClock";
import Mask from "./Mask";
import Reveal from "./Reveal";

export default function Contact() {
  const clock = useClock();
  return (
    <section id="contact" className="contact-section" style={{ padding: "100px 40px 60px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Mask>
          <h2 style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap", margin: 0 }}>
            <span style={{ fontFamily: "var(--f-display)", fontSize: "clamp(44px, 6.5vw, 88px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1 }}>Let's work</span>
            <span style={{ fontFamily: "var(--f-display)", fontSize: "clamp(44px, 6.5vw, 88px)", fontWeight: 200, color: "var(--muted)", lineHeight: 1, letterSpacing: "-0.02em" }}>together</span>
          </h2>
        </Mask>
        <Reveal delay={0.3} style={{ marginTop: 44, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <a href="mailto:mortylobster@gmail.com" style={{
            fontFamily: "var(--f-mono)", fontSize: 12, padding: "13px 30px", borderRadius: 40,
            background: "var(--red)", color: "#fff", textDecoration: "none", fontWeight: 500,
            transition: "opacity 0.3s",
          }}
            onMouseEnter={e => e.target.style.opacity = "0.85"} onMouseLeave={e => e.target.style.opacity = "1"}>Schedule a call</a>
          <a href="mailto:mortylobster@gmail.com" style={{
            fontFamily: "var(--f-mono)", fontSize: 12, padding: "13px 30px", borderRadius: 40,
            border: "1px solid var(--border)", color: "var(--muted)", textDecoration: "none",
            transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "var(--ink)"; e.target.style.color = "var(--ink)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--muted)"; }}>mortylobster@gmail.com</a>
        </Reveal>
        <Reveal delay={0.4} style={{ marginTop: 40, display: "flex", gap: 24 }}>
          {["GitHub", "LinkedIn", "Instagram", "Dribbble"].map(s => (
            <a key={s} href="#" style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--faint)", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = "var(--ink)"} onMouseLeave={e => e.target.style.color = "var(--faint)"}>{s}</a>
          ))}
        </Reveal>
        <footer style={{ marginTop: 100, paddingTop: 20, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.1em", color: "var(--faint)" }}>
          <span>© 2026</span>
          <span>Madrid · {clock} · 40.4168° N</span>
          <span>All rights reserved</span>
        </footer>
      </div>
    </section>
  );
}
