export default function Marquee({ text = "ECHEVERRI ✦ DESIGN ENGINEER ✦ AI SYSTEMS ✦ BRANDING ✦ AUTOMATION ✦ MADRID ✦ " }) {
  return (
    <div aria-hidden="true" style={{ overflow: "hidden", whiteSpace: "nowrap", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "18px 0" }}>
      <div style={{ display: "inline-block", animation: "marquee 35s linear infinite", fontFamily: "var(--f-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(230,50,40,0.1)", textTransform: "uppercase" }}>
        {text.repeat(6)}
      </div>
    </div>
  );
}
