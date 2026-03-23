import Reveal from "./Reveal";
import ProjectTile from "./ProjectTile";
import DashTile from "./DashTile";
import NeuralMesh from "./NeuralMesh";
import GitHubButton from "./GitHubButton";
import { PROJECTS, TECH } from "../data/projects";

export default function WorkSection() {
  return (
    <section id="work" className="work-section" style={{ padding: "80px 40px 100px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.25em", color: "var(--red)", opacity: 0.7, marginBottom: 12 }}>{"{ SELECTED WORK }"}</div>
          <h2 style={{ fontFamily: "var(--f-display)", fontSize: 38, fontWeight: 700, color: "var(--ink)", lineHeight: 1.1, margin: 0 }}>Projects & Systems</h2>
        </Reveal>
        {/* Dashboard grid — 4 cols */}
        <div className="work-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "minmax(160px, auto)",
          gap: 10,
        }}>
          {/* ── Row 1: Project 1 (wide) + Project 2 + Project 3 ── */}
          <ProjectTile p={PROJECTS[0]} delay={0} span="2/1" />
          <ProjectTile p={PROJECTS[1]} delay={0.06} span="1/1" />
          <ProjectTile p={PROJECTS[2]} delay={0.12} span="1/1" />

          {/* ── Row 2: Project 4 + CENTER SHADER + Project 5 ── */}
          <ProjectTile p={PROJECTS[3]} delay={0.18} span="1/2" />

          <DashTile span="2/2" delay={0.24} className="neural-tile" style={{
            padding: 0, overflow: "hidden",
            borderColor: "rgba(230,50,40,0.12)",
          }}>
            <NeuralMesh />
          </DashTile>

          <ProjectTile p={PROJECTS[4]} delay={0.3} span="1/2" />

          {/* ── Row 3: Project 6 + Project 7 (wide) + Project 8 ── */}
          <ProjectTile p={PROJECTS[5]} delay={0.36} span="1/1" />
          <ProjectTile p={PROJECTS[6]} delay={0.42} span="2/1" />
          <ProjectTile p={PROJECTS[7]} delay={0.48} span="1/1" />

          {/* ── Row 4: Project 9 + Project 10 (wide) + GitHub CTA ── */}
          <ProjectTile p={PROJECTS[8]} delay={0.54} span="1/1" />
          <ProjectTile p={PROJECTS[9]} delay={0.6} span="2/1" />

          {/* GitHub CTA tile */}
          <DashTile span="1/1" delay={0.66} style={{
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <GitHubButton />
          </DashTile>

          {/* ── Bottom row: Tech stack bar ── */}
          <DashTile span="4/1" delay={0.72} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px 24px",
          }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 8, letterSpacing: "0.15em", color: "var(--red)", opacity: 0.7 }}>STACK</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", flex: 1, padding: "0 24px" }}>
              {TECH.map(t => (
                <span key={t} style={{
                  fontFamily: "var(--f-mono)", fontSize: 9, padding: "3px 10px",
                  borderRadius: 3, border: "1px solid var(--border)", color: "var(--muted)",
                  transition: "all 0.3s", cursor: "default",
                }}
                  onMouseEnter={e => { e.target.style.borderColor = "var(--red)"; e.target.style.color = "var(--ink)"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--muted)"; }}
                >&gt;{t}&lt;</span>
              ))}
            </div>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 8, letterSpacing: "0.1em", color: "var(--faint)" }}>V2.0</div>
          </DashTile>
        </div>
      </div>
    </section>
  );
}
