import { useState, useEffect } from "react";
import EcheverriTitle from "./EcheverriTitle";
import SceneObject from "./SceneObject";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setTimeout(() => setLoaded(true), 150)); }, []);

  return (
    <section className="hero-grid" style={{
      height: "100vh", position: "relative", overflow: "hidden",
      display: "grid", gridTemplateColumns: "280px 1fr",
      gridTemplateRows: "minmax(0, 2fr) minmax(0, 3fr)",
      background: "var(--bg)",
    }}>
      {/* Paper texture overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none", zIndex: 0, mixBlendMode: "multiply",
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Q1: TOP-LEFT — Whisk gif */}
      <div className="hero-q1" style={{
        borderRight: "1px solid rgba(230,50,40,0.08)", borderBottom: "1px solid rgba(230,50,40,0.08)",
        position: "relative", zIndex: 10, overflow: "hidden",
        opacity: loaded ? 1 : 0, transform: loaded ? "scale(1)" : "scale(1.05)",
        transition: "all 1s cubic-bezier(.16,1,.3,1) 0.5s",
        background: "var(--bg)",
      }}>
        <img src="/whisk.gif" alt="Animated portrait of Felipe Echeverri" style={{
          width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
          filter: "brightness(0.95) contrast(1.05)",
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "25%", background: "linear-gradient(to top, var(--bg), transparent)", pointerEvents: "none" }} />
      </div>

      {/* Q2: TOP-RIGHT — ECHEVERRI + FELIPE */}
      <div className="hero-q2" style={{
        borderBottom: "1px solid rgba(230,50,40,0.08)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        position: "relative", padding: "72px 20px 16px", overflow: "hidden",
      }}>
        <EcheverriTitle />

        {/* FELIPE — bottom right, overlapping the big name */}
        <div className="hero-felipe" style={{
          position: "absolute",
          bottom: 36, right: 32,
          zIndex: 20,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateX(0)" : "translateX(30px)",
          transition: "all 1s cubic-bezier(.16,1,.3,1) 1.4s",
        }}>
          {/* Glow backdrop */}
          <div style={{
            position: "absolute", inset: "-20px -30px",
            background: "radial-gradient(ellipse, rgba(230,80,40,0.08) 0%, transparent 70%)",
            borderRadius: "50%", pointerEvents: "none",
            animation: "felipeGlow 3s ease-in-out infinite",
          }} />
          <span style={{
            fontFamily: "'Zen Dots', cursive",
            fontStyle: "normal",
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 400,
            letterSpacing: "0.08em",
            color: "transparent",
            background: "linear-gradient(135deg, #e63228, #d4392b, #e63228)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            position: "relative",
            display: "inline-block",
            animation: "felipeSlide 1.5s cubic-bezier(.16,1,.3,1) 1.6s both",
          }}>
            FELIPE
          </span>
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.12em",
          color: "var(--faint)", marginTop: 12,
          opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 1.2s",
        }}>
          <span>DESIGN ENGINEER</span>
          <span style={{ color: "var(--red)", opacity: 0.5 }}>·</span>
          <span>AI ARCHITECT</span>
          <span style={{ color: "var(--red)", opacity: 0.5 }}>·</span>
          <span>MADRID</span>
          <span style={{ color: "var(--red)", opacity: 0.5 }}>·</span>
          <span>2018 — 26</span>
        </div>
      </div>

      {/* Q3: BOTTOM-LEFT — Description + metadata */}
      <div className="hero-q3" style={{
        borderRight: "1px solid var(--border)", padding: "20px 24px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1s", overflow: "hidden",
      }}>
        <div>
          <div style={{
            fontFamily: "'Zen Dots', cursive", fontSize: 12, fontStyle: "normal",
            letterSpacing: "0.06em",
            background: "linear-gradient(135deg, #e63228, #d4392b, #e63228)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: 10,
          }}>
            A CREATIVE PRACTICE
          </div>
          <p style={{ fontFamily: "var(--f-sans)", fontSize: 12, lineHeight: 1.8, color: "var(--ink)", opacity: 0.72, fontWeight: 500 }}>
            Design engineer and AI architect — I build things that actually ship. Products, pipelines, chatbots, brand systems. Lately a lot of AI tooling: news digests, monitoring dashboards, conversational interfaces.
          </p>
          <p style={{ fontFamily: "var(--f-sans)", fontSize: 12, lineHeight: 1.8, color: "var(--ink)", opacity: 0.55, fontWeight: 400, marginTop: 10 }}>
            I care about the gap between what a thing looks like and how it actually works. Clean UI, solid backend, no cut corners.
          </p>
          <a href="#contact" style={{
            display: "block", marginTop: 14, padding: "8px 0",
            fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.12em",
            color: "var(--muted)", textDecoration: "none",
            borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
            textAlign: "center", transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.target.style.color = "var(--ink)"; e.target.style.borderColor = "rgba(0,0,0,0.15)"; }}
            onMouseLeave={e => { e.target.style.color = "var(--muted)"; e.target.style.borderColor = "var(--border)"; }}
          >LET'S CHAT</a>
        </div>
        <div style={{ fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.1em", color: "var(--faint)" }}>
          <div style={{ lineHeight: 2 }}>
            <div>PROJECTS: &gt; 30</div>
            <div>SYSTEMS: AI · WEB · BRAND</div>
            <div>40.4168° N, 3.7038° W</div>
          </div>
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--red)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", display: "inline-block", animation: "pulse 2s ease infinite" }} />
              AVAILABLE
            </div>
            <span style={{ color: "var(--red)", opacity: 0.5 }}>V2.0</span>
          </div>
        </div>
      </div>

      {/* Q4: BOTTOM-RIGHT — 3D Object */}
      <div className="hero-q4" style={{
        position: "relative", opacity: loaded ? 1 : 0, transition: "opacity 1.2s ease 0.8s", overflow: "hidden",
        background: "linear-gradient(135deg, rgba(0,0,0,0.02), rgba(0,0,0,0.06))",
      }}>
        <SceneObject />

        {/* Subtle grid lines — red tinted */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, opacity: 0.07,
          backgroundImage: "linear-gradient(var(--red) 1px, transparent 1px), linear-gradient(90deg, var(--red) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* HUD text — dark on grey */}
        <div style={{
          position: "absolute", top: 16, right: 24,
          fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.1em",
          color: "var(--faint)", textAlign: "right", lineHeight: 2.2, zIndex: 3,
        }}>
          <div>SYS.INIT ████████ <span style={{ color: "var(--red)" }}>OK</span></div>
          <div>NEURAL_MESH: ACTIVE</div>
          <div>AGENTS: 2_ONLINE</div>
          <div>LLM_ROUTER: <span style={{ color: "var(--red)" }}>NOMINAL</span></div>
        </div>

        <div style={{
          position: "absolute", bottom: 16, left: 24,
          fontFamily: "var(--f-mono)", fontSize: 8, letterSpacing: "0.15em",
          color: "var(--faint)", zIndex: 3,
        }}>COGNITIVE ARCHITECTURE · V2.0</div>

        <div style={{
          position: "absolute", bottom: 16, right: 24,
          fontFamily: "var(--f-mono)", fontSize: 8, letterSpacing: "0.15em",
          color: "var(--faint)", zIndex: 3, display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--red)", display: "inline-block" }} />
          INTERACTIVE · HOVER TO EXPLORE
        </div>

        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, background: "radial-gradient(ellipse at center, transparent 40%, rgba(155,154,153,0.35) 100%)" }} />
      </div>
    </section>
  );
}
