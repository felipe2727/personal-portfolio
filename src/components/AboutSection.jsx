import Mask from "./Mask";
import Reveal from "./Reveal";
import { CAPABILITIES, EXPERIENCE } from "../data/projects";

export default function AboutSection() {
  return (
    <section id="about" className="about-section" style={{ padding: "100px 40px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, marginBottom: 80 }}>
          <div>
            <Mask><p style={{ fontFamily: "var(--f-display)", fontSize: 24, lineHeight: 1.55, color: "var(--muted)", fontWeight: 300, margin: 0 }}>
              A design & engineering practice shaping <span style={{ color: "var(--ink)", fontWeight: 500 }}>AI systems</span>, <span style={{ color: "var(--ink)", fontWeight: 500 }}>brand identities</span>, and <span style={{ color: "var(--ink)", fontWeight: 500 }}>digital experiences</span>. Driven by meaning, technical depth, and strategy.
            </p></Mask>
            <Reveal delay={0.3}><p style={{ fontFamily: "var(--f-display)", fontSize: 15, lineHeight: 1.75, color: "var(--faint)", fontWeight: 300, marginTop: 28 }}>Working project by project, partnering with clients and studios globally. Background in Power Platform consulting, now fully immersed in AI-native development and creative technology.</p></Reveal>
            <Reveal delay={0.4} style={{ marginTop: 28 }}>
              <a href="#contact" style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--muted)", textDecoration: "underline", textUnderlineOffset: 4, transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "var(--ink)"} onMouseLeave={e => e.target.style.color = "var(--muted)"}>Pop up a message →</a>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.2}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.15em", color: "var(--red)", marginBottom: 20, opacity: 0.7 }}>CAPABILITIES</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div>{CAPABILITIES.left.map(c => <div key={c} style={{ fontFamily: "var(--f-display)", fontSize: 13, fontWeight: 400, color: "var(--muted)", padding: "7px 0" }}>{c}</div>)}</div>
                <div>{CAPABILITIES.right.map(c => <div key={c} style={{ fontFamily: "var(--f-display)", fontSize: 13, fontWeight: 400, color: "var(--muted)", padding: "7px 0" }}>{c}</div>)}</div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}><div style={{ fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.15em", color: "var(--red)", marginBottom: 24, opacity: 0.7 }}>EXPERIENCE</div></Reveal>
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={i} delay={0.1 * i}>
            <div className="experience-row" style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 40, padding: "24px 0", borderTop: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--red)", marginBottom: 6, opacity: 0.7 }}>{exp.period}</div>
                <div style={{ fontFamily: "var(--f-sans)", fontSize: 17, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>{exp.role}</div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--faint)" }}>{exp.company}</div>
              </div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 13, lineHeight: 1.7, fontWeight: 300, color: "var(--muted)", paddingTop: 4 }}>{exp.desc}</div>
            </div>
          </Reveal>
        ))}

      </div>
    </section>
  );
}
