import { useRef } from "react";

export default function GalleryRow({ images, direction = "left", speed = 40 }) {
  const stripRef = useRef(null);
  const doubled = [...images, ...images];

  const handleKeyDown = (e) => {
    const strip = stripRef.current;
    if (!strip) return;
    if (e.key === "ArrowLeft") strip.scrollLeft -= 340;
    if (e.key === "ArrowRight") strip.scrollLeft += 340;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      strip.style.animationPlayState = strip.style.animationPlayState === "paused" ? "running" : "paused";
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Image gallery carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        overflow: "hidden", width: "100%", position: "relative", outline: "none",
      }}
      onMouseEnter={e => {
        const strip = e.currentTarget.querySelector("[data-strip]");
        if (strip) strip.style.animationPlayState = "paused";
      }}
      onMouseLeave={e => {
        const strip = e.currentTarget.querySelector("[data-strip]");
        if (strip) strip.style.animationPlayState = "running";
      }}
      onFocus={e => {
        const strip = e.currentTarget.querySelector("[data-strip]");
        if (strip) strip.style.animationPlayState = "paused";
      }}
      onBlur={e => {
        const strip = e.currentTarget.querySelector("[data-strip]");
        if (strip) strip.style.animationPlayState = "running";
      }}
    >
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg, var(--bg), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(270deg, var(--bg), transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div ref={stripRef} data-strip style={{
        display: "flex", gap: 12, width: "max-content",
        animation: `gallery${direction === "left" ? "Left" : "Right"} ${speed}s linear infinite`,
      }}>
        {doubled.map((item, i) => {
          const isVideo = typeof item === "object" && item.video;
          const isObj = typeof item === "object" && !item.video;
          const src = isVideo ? item.video : isObj ? item.src : item;
          const alt = isObj ? item.alt : "";
          return (
            <div key={i} className="gallery-thumb" style={{
              width: 320, height: 360, borderRadius: 6, overflow: "hidden",
              flexShrink: 0, position: "relative",
              border: "1px solid var(--border)",
              transition: "transform 0.4s cubic-bezier(.16,1,.3,1), border-color 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.borderColor = "rgba(230,50,40,0.2)"; e.currentTarget.style.zIndex = "5"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.zIndex = "1"; }}
            >
              {isVideo ? (
                <video src={src} muted autoPlay loop playsInline aria-hidden="true" style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  filter: "saturate(0.85) contrast(1.05)",
                }} />
              ) : (
                <img src={src} alt={alt} loading="lazy" style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  filter: "saturate(0.85) contrast(1.05)",
                  transition: "filter 0.4s ease",
                }}
                  onMouseEnter={e => e.target.style.filter = "saturate(1.1) contrast(1.1)"}
                  onMouseLeave={e => e.target.style.filter = "saturate(0.85) contrast(1.05)"}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
