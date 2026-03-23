import useInView from "../hooks/useInView";
import Reveal from "./Reveal";
import GalleryRow from "./GalleryRow";
import { GALLERY_ROW1, GALLERY_ROW2 } from "../data/gallery";

export default function BrandingGallery() {
  const [ref, vis] = useInView(0.05);
  return (
    <section ref={ref} className="gallery-section" style={{
      padding: "80px 0", position: "relative",
      borderTop: "1px solid var(--border)",
      opacity: vis ? 1 : 0, transition: "opacity 0.8s ease",
    }}>
      {/* Section header */}
      <div className="gallery-header" style={{ padding: "0 40px", maxWidth: 1200, margin: "0 auto 48px" }}>
        <Reveal style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.25em", color: "var(--red)", opacity: 0.7, marginBottom: 12 }}>{"{ CREATIVE PORTFOLIO }"}</div>
          <h2 style={{ fontFamily: "var(--f-display)", fontSize: 38, fontWeight: 700, color: "var(--ink)", lineHeight: 1.1, margin: 0 }}>Branding & Visuals</h2>
        </Reveal>
      </div>

      {/* Row 1 — slides left */}
      <GalleryRow images={GALLERY_ROW1} direction="left" speed={45} />

      {/* Gap */}
      <div style={{ height: 12 }} />

      {/* Row 2 — slides right */}
      <GalleryRow images={GALLERY_ROW2} direction="right" speed={50} />
    </section>
  );
}
