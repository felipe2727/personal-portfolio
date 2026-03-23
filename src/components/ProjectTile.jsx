import DashTile from "./DashTile";

export default function ProjectTile({ p, delay, span = "1/1" }) {
  return (
    <DashTile span={span} delay={delay}>
      <article style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.1em", color: "var(--red)", opacity: 0.6 }}>{p.id}</span>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--faint)" }}>{p.year}</span>
          </div>
          <h3 style={{
            fontFamily: "var(--f-sans)", fontSize: span.startsWith("2") ? 24 : 19,
            fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em",
            lineHeight: 1.15, marginBottom: 10,
          }}>{p.title}</h3>
          <p style={{
            fontFamily: "var(--f-mono)", fontSize: 10, lineHeight: 1.65,
            color: "var(--muted)", margin: 0,
          }}>{p.desc}</p>
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 8, letterSpacing: "0.1em", color: "var(--faint)", marginBottom: 8 }}>{p.role}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {p.tags.map(t => (
                <span key={t} style={{
                  fontFamily: "var(--f-mono)", fontSize: 8, padding: "3px 8px",
                  borderRadius: 3, border: "1px solid var(--border)", color: "var(--muted)",
                }}>&gt;{t}&lt;</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 8 }}>
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "var(--f-mono)", fontSize: 8, color: "var(--muted)",
                  textDecoration: "none", padding: "3px 8px", borderRadius: 3,
                  border: "1px solid var(--border)", transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.target.style.borderColor = "var(--red)"; e.target.style.color = "var(--ink)"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--muted)"; }}
                >GitHub</a>
              )}
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "var(--f-mono)", fontSize: 8, color: "var(--red)",
                  textDecoration: "none", padding: "3px 8px", borderRadius: 3,
                  border: "1px solid rgba(230,50,40,0.25)", transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.target.style.background = "var(--red)"; e.target.style.color = "#fff"; }}
                  onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--red)"; }}
                >Live</a>
              )}
            </div>
          </div>
        </div>
      </article>
    </DashTile>
  );
}
