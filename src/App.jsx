import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

/* ════════════════════════════════════════════════════════════════
   FELIPE ECHEVERRI — PORTFOLIO V7
   Theme: Concrete grey · Red accent · Industrial editorial
   Inspired by: AVA SRG · scratchy warm grey palette
   ════════════════════════════════════════════════════════════════ */

const IMG = {
  profile: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format",
  proj1: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700&q=80&auto=format",
  proj2: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=80&auto=format",
  proj3: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=80&auto=format",
  proj4: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=700&q=80&auto=format",
  proj5: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=700&q=80&auto=format",
  proj6: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=700&q=80&auto=format",
};

const PROJECTS = [
  { id: "01", title: "OpenClaw HQ", role: "Architecture, Engineering", year: "2025", img: IMG.proj1, desc: "Two-agent AI system with cost-optimized model routing across distributed hardware.", tags: ["Kimi K2.5", "Claude", "DeepSeek"] },
  { id: "02", title: "Shibumi Botanicals", role: "Brand, Design, Dev", year: "2025", img: IMG.proj2, desc: "High-end bonsai custodianship subscription with JUUN.J-inspired editorial design.", tags: ["Next.js", "Supabase", "Framer"] },
  { id: "03", title: "B2B Lead Engine", role: "Engineering, Automation", year: "2025", img: IMG.proj3, desc: "Parallelized scraping pipeline targeting Spanish SMBs across fashion, hotels, restaurants.", tags: ["Apify", "Firecrawl", "Airtable"] },
  { id: "04", title: "Härissa Foods", role: "Design, Development", year: "2024", img: IMG.proj4, desc: "WhatsApp chatbot for Mediterranean restaurant chain with parsed JSON menu.", tags: ["WhatsApp API", "Node.js"] },
  { id: "05", title: "AI News Digest", role: "Design, Engineering", year: "2025", img: IMG.proj5, desc: "Dark editorial news aggregation platform with automated curation.", tags: ["Next.js 15", "Supabase"] },
  { id: "06", title: "MCP Memory Server", role: "Engineering", year: "2025", img: IMG.proj6, desc: "Semantic memory retrieval across distributed machines via Qdrant Cloud.", tags: ["Qdrant", "MCP", "Claude Code"] },
];

const EXPERIENCE = [
  { period: "2024 — Present", role: "Design Engineer & AI Systems Architect", company: "Independent Practice", desc: "Building AI agent architectures, automated pipelines, and high-concept brand systems. Specializing in LLM orchestration and creative technology." },
  { period: "2020 — 2024", role: "Power Platform Consultant", company: "Enterprise Clients", desc: "Production solutions in Power Apps, Power Automate, and Dataverse. Migrated workflows from Power Automate Desktop to Python/Playwright." },
  { period: "2018 — 2020", role: "Web Developer & Designer", company: "Agency & Freelance", desc: "Full-stack development, brand identity systems, and interactive experiences for agencies and direct clients." },
];

const CAPABILITIES = {
  left: ["Creative Direction", "AI Systems Architecture", "Digital Design", "Brand Identity", "Interactive Development"],
  right: ["Automation Engineering", "LLM Orchestration", "Data Pipelines", "User Experience", "Visual Storytelling"],
};

const TECH = ["React", "Next.js", "TypeScript", "Python", "GSAP", "Framer Motion", "Supabase", "Dataverse", "Power Platform", "Claude API", "Apify", "Node.js"];

// ── Hooks ──
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold });
    o.observe(el); return () => o.disconnect();
  }, []); return [ref, v];
}

function useClock() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  return t.toLocaleTimeString("en-GB", { timeZone: "Europe/Madrid", hour: "2-digit", minute: "2-digit" });
}

const BRAIN_TOTAL = 96;
const BRAIN_FPS = 12;
function BrainAnimation() {
  const [frame, setFrame] = useState(1);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const loadedRef = useRef(0);

  useEffect(() => {
    const imgs = [];
    for (let i = 1; i <= BRAIN_TOTAL; i++) {
      const img = new Image();
      img.src = `/brain-frames/frame-${String(i).padStart(3, "0")}.jpg`;
      img.onload = () => { loadedRef.current++; };
      imgs.push(img);
    }
    framesRef.current = imgs;
  }, []);

  useEffect(() => {
    let raf;
    let last = 0;
    const interval = 1000 / BRAIN_FPS;
    const loop = (ts) => {
      if (ts - last >= interval) {
        setFrame((f) => (f % BRAIN_TOTAL) + 1);
        last = ts;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    const img = framesRef.current[frame - 1];
    if (ctx && img && img.complete) {
      const canvas = canvasRef.current;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    }
  }, [frame]);

  return (
    <canvas ref={canvasRef} style={{
      width: "100%", height: "100%", objectFit: "cover", display: "block",
    filter: "brightness(1.15)",
    }} />
  );
}

function Reveal({ children, delay = 0, y = 50, style = {} }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ ...style, opacity: v ? 1 : 0, transform: v ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`, transition: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div>;
}

function Mask({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ ...style, overflow: "hidden" }}><div style={{ transform: v ? "translateY(0)" : "translateY(110%)", transition: `transform 1s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div></div>;
}

// ═══════════════════════════════════════
//  INTERACTIVE NAME — 3D flip + glitch
// ═══════════════════════════════════════
function EcheverriTitle() {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [flipPhase, setFlipPhase] = useState(0);

  useEffect(() => { setTimeout(() => setLoaded(true), 400); }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipPhase(1);
      setTimeout(() => setFlipPhase(0), 1200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const isFlipping = flipPhase === 1;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: "1200px", cursor: "pointer", position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
    >
      {/* Glitch layers — red + amber on grey */}
      {hovered && (
        <>
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--f-display)", fontSize: "clamp(72px, 13vw, 200px)", fontWeight: 700,
            letterSpacing: "0.05em", color: "transparent",
            WebkitTextStroke: "1px var(--red)",
            transform: "translate(-3px, -2px)", animation: "glitch1 0.15s infinite",
            pointerEvents: "none", zIndex: 3,
          }}>ECHEVERRI</div>
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--f-display)", fontSize: "clamp(72px, 13vw, 200px)", fontWeight: 700,
            letterSpacing: "0.05em", color: "transparent",
            WebkitTextStroke: "1px var(--amber)",
            transform: "translate(3px, 2px)", animation: "glitch2 0.15s infinite",
            pointerEvents: "none", zIndex: 3,
          }}>ECHEVERRI</div>
        </>
      )}

      {/* Main text */}
      <div style={{
        fontFamily: "var(--f-display)", fontSize: "clamp(72px, 13vw, 200px)", fontWeight: 700,
        letterSpacing: "0.05em", color: "var(--ink)", textAlign: "center", userSelect: "none",
        transformStyle: "preserve-3d",
        transform: isFlipping ? "rotateY(360deg)" : hovered ? "rotateY(12deg) rotateX(-3deg) scale(1.02)" : "rotateY(0deg)",
        transition: isFlipping ? "transform 1.2s cubic-bezier(.25,.46,.45,.94)" : "transform 0.4s cubic-bezier(.16,1,.3,1)",
        position: "relative", zIndex: 2,
        textShadow: hovered ? "0 0 80px rgba(230,50,40,0.1), 0 0 160px rgba(230,50,40,0.04)" : "none",
        opacity: loaded ? 1 : 0, filter: loaded ? "none" : "blur(10px)", willChange: "transform",
      }}>ECHEVERRI</div>

      {/* Reflection */}
      <div style={{
        position: "absolute", bottom: -6, left: 0, right: 0, height: "50%",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        fontFamily: "var(--f-display)", fontSize: "clamp(72px, 13vw, 200px)", fontWeight: 700,
        letterSpacing: "0.05em", color: "var(--ink)", transform: "scaleY(-1)", opacity: 0.04,
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)",
        pointerEvents: "none", zIndex: 1,
      }}>ECHEVERRI</div>
    </div>
  );
}

// ═══════════════════════════════════════
//  3D OBJECT — Rethemed dark wireframe
// ═══════════════════════════════════════
function SceneObject() {
  const mountRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const w = container.clientWidth, h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Dark charcoal wireframe
    const geo = new THREE.IcosahedronGeometry(1.6, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0x2a2a2a, wireframe: true, transparent: true, opacity: 0.55 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Inner — red tint
    const geo2 = new THREE.IcosahedronGeometry(0.9, 0);
    const mat2 = new THREE.MeshBasicMaterial({ color: 0xe63228, wireframe: true, transparent: true, opacity: 0.12 });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    scene.add(mesh2);

    // Ring — dark
    const ringGeo = new THREE.TorusGeometry(2.2, 0.008, 8, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x3a3a3a, transparent: true, opacity: 0.2 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.2;
    scene.add(ring);

    // Second ring — red
    const ring2Geo = new THREE.TorusGeometry(2.5, 0.005, 8, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xe63228, transparent: true, opacity: 0.06 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3; ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // Particles — dark specks
    const pCount = 180;
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x1a1a1a, size: 0.025, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => { mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5; mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5; };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      mesh.rotation.x = t * 0.12 + mouseY * 0.3; mesh.rotation.y = t * 0.2 + mouseX * 0.3;
      mesh2.rotation.x = -t * 0.18; mesh2.rotation.y = -t * 0.12;
      ring.rotation.z = t * 0.06; ring2.rotation.z = -t * 0.04;
      const pos = particles.geometry.attributes.position.array;
      for (let i = 0; i < pCount; i++) { pos[i * 3 + 1] -= 0.005; if (pos[i * 3 + 1] < -3.5) pos[i * 3 + 1] = 3.5; }
      particles.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => { const nw = container.clientWidth, nh = container.clientHeight; camera.aspect = nw / nh; camera.updateProjectionMatrix(); renderer.setSize(nw, nh); };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(frameRef.current); window.removeEventListener("resize", handleResize); window.removeEventListener("mousemove", onMouseMove); if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement); renderer.dispose(); };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

// ═══════════════════════════════════════
//  NAV
// ═══════════════════════════════════════
function Nav() {
  const clock = useClock();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 80); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: "0 40px", height: scrolled ? 52 : 60,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: scrolled ? "rgba(155,154,153,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(1.3)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
    }}>
      <span style={{ fontFamily: "var(--f-display)", fontSize: 20, fontWeight: 700, color: "var(--ink)" }}>Fe.</span>
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
      <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--faint)", display: "flex", gap: 12, alignItems: "center" }}>
        <span>Madrid</span>
        <span style={{ color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>{clock}</span>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════
//  HERO — 4 quadrant split
// ═══════════════════════════════════════
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setTimeout(() => setLoaded(true), 150)); }, []);

  return (
    <section style={{
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
      <div style={{
        borderRight: "1px solid rgba(230,50,40,0.08)", borderBottom: "1px solid rgba(230,50,40,0.08)",
        position: "relative", zIndex: 10, overflow: "hidden",
        opacity: loaded ? 1 : 0, transform: loaded ? "scale(1)" : "scale(1.05)",
        transition: "all 1s cubic-bezier(.16,1,.3,1) 0.5s",
        background: "var(--bg)",
      }}>
        <img src="/whisk.gif" alt="Whisk Motion" style={{
          width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
          filter: "brightness(0.95) contrast(1.05)",
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "25%", background: "linear-gradient(to top, var(--bg), transparent)", pointerEvents: "none" }} />
      </div>

      {/* Q2: TOP-RIGHT — ECHEVERRI + FELIPE */}
      <div style={{
        borderBottom: "1px solid rgba(230,50,40,0.08)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        position: "relative", padding: "72px 20px 16px", overflow: "hidden",
      }}>
        <EcheverriTitle />

        {/* FELIPE — bottom right, overlapping the big name */}
        <div style={{
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
            background: "linear-gradient(135deg, #e63228, #ff6b35, #d4a017)",
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
      <div style={{
        borderRight: "1px solid var(--border)", padding: "20px 24px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1s", overflow: "hidden",
      }}>
        <div>
          <div style={{
            fontFamily: "'Zen Dots', cursive", fontSize: 12, fontStyle: "normal",
            letterSpacing: "0.06em",
            background: "linear-gradient(135deg, #e63228, #ff6b35, #d4a017)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: 10,
          }}>
            A CREATIVE PRACTICE
          </div>
          <p style={{ fontFamily: "var(--f-sans)", fontSize: 11, lineHeight: 1.7, color: "var(--faint)" }}>
            Design engineer and AI systems architect building intelligent products, automated pipelines, and high-concept brand experiences.
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
      <div style={{
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

// ═══════════════════════════════════════
//  MARQUEE
// ═══════════════════════════════════════
function Marquee({ text = "ECHEVERRI ✦ DESIGN ENGINEER ✦ AI SYSTEMS ✦ BRANDING ✦ AUTOMATION ✦ MADRID ✦ " }) {
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "18px 0" }}>
      <div style={{ display: "inline-block", animation: "marquee 35s linear infinite", fontFamily: "var(--f-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(230,50,40,0.1)", textTransform: "uppercase" }}>
        {text.repeat(6)}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
//  WORK — Dashboard Bento Grid
// ═══════════════════════════════════════
function DashTile({ children, span = "1/1", delay = 0, style = {} }) {
  const [ref, vis] = useInView(0.08);
  const [hov, setHov] = useState(false);
  const [col, row] = span.split("/");

  return (
    <div ref={ref}
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

function ProjectTile({ p, delay, span = "1/1" }) {
  return (
    <DashTile span={span} delay={delay}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
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
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {p.tags.map(t => (
              <span key={t} style={{
                fontFamily: "var(--f-mono)", fontSize: 8, padding: "3px 8px",
                borderRadius: 3, border: "1px solid var(--border)", color: "var(--muted)",
              }}>&gt;{t}&lt;</span>
            ))}
          </div>
        </div>
      </div>
    </DashTile>
  );
}

function WorkSection() {
  const [countVis, setCountVis] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const el = countRef.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setCountVis(true); o.unobserve(el); } }, { threshold: 0.3 });
    o.observe(el); return () => o.disconnect();
  }, []);

  return (
    <section id="work" style={{ padding: "80px 40px 100px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Dashboard grid — 4 cols */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "minmax(160px, auto)",
          gap: 10,
        }}>
          {/* ── Row 1: Stats tiles + project 1 (wide) ── */}

          {/* Stat: Projects */}
          <DashTile span="1/1" delay={0} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 8, letterSpacing: "0.15em", color: "var(--red)", opacity: 0.7 }}>PROJECTS</div>
            <div ref={countRef}>
              <span style={{
                fontFamily: "var(--f-display)", fontSize: 52, fontWeight: 700, color: "var(--ink)",
                lineHeight: 1, display: "block",
              }}>
                {countVis ? "30" : "0"}<span style={{ fontSize: 28, color: "var(--red)" }}>+</span>
              </span>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--faint)" }}>deployed systems</span>
            </div>
          </DashTile>

          {/* Stat: Domains */}
          <DashTile span="1/1" delay={0.06} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 8, letterSpacing: "0.15em", color: "var(--red)", opacity: 0.7 }}>DOMAINS</div>
            <div>
              <span style={{ fontFamily: "var(--f-display)", fontSize: 52, fontWeight: 700, color: "var(--ink)", lineHeight: 1, display: "block" }}>5</span>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--faint)" }}>specializations</span>
            </div>
          </DashTile>

          {/* Project 1 — wide */}
          <ProjectTile p={PROJECTS[0]} delay={0.12} span="2/1" />

          {/* ── Row 2: Project 2 + CENTER HERO + Project 3 ── */}

          {/* Project 2 */}
          <ProjectTile p={PROJECTS[1]} delay={0.18} span="1/2" />

          {/* CENTER HERO — brain animation */}
          <DashTile span="2/2" delay={0.24} style={{
            padding: 0, overflow: "hidden",
            borderColor: "rgba(230,50,40,0.12)",
          }}>
            <BrainAnimation />
          </DashTile>

          {/* Project 3 */}
          <ProjectTile p={PROJECTS[2]} delay={0.3} span="1/2" />

          {/* ── Row 3: Remaining projects + extra tiles ── */}

          {/* Project 4 */}
          <ProjectTile p={PROJECTS[3]} delay={0.36} span="1/1" />

          {/* Project 5 — wide */}
          <ProjectTile p={PROJECTS[4]} delay={0.42} span="2/1" />

          {/* Project 6 */}
          <ProjectTile p={PROJECTS[5]} delay={0.48} span="1/1" />

          {/* ── Bottom row: Tech stack bar ── */}
          <DashTile span="4/1" delay={0.54} style={{
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

// ═══════════════════════════════════════
//  BRANDING GALLERY — Auto-sliding rows
// ═══════════════════════════════════════
const GALLERY_ROW1 = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=340&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&h=340&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&h=340&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=340&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=500&h=340&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=500&h=340&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515630771457-09367d0ae038?w=500&h=340&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=500&h=340&q=80&auto=format&fit=crop",
];

const GALLERY_ROW2 = [
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=340&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=340&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=340&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=340&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&h=340&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=340&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&h=340&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&h=340&q=80&auto=format&fit=crop",
];

function GalleryRow({ images, direction = "left", speed = 40 }) {
  const doubled = [...images, ...images];
  return (
    <div style={{
      overflow: "hidden", width: "100%", position: "relative",
    }}
      onMouseEnter={e => {
        const strip = e.currentTarget.querySelector("[data-strip]");
        if (strip) strip.style.animationPlayState = "paused";
      }}
      onMouseLeave={e => {
        const strip = e.currentTarget.querySelector("[data-strip]");
        if (strip) strip.style.animationPlayState = "running";
      }}
    >
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg, var(--bg), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(270deg, var(--bg), transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div data-strip style={{
        display: "flex", gap: 12, width: "max-content",
        animation: `gallery${direction === "left" ? "Left" : "Right"} ${speed}s linear infinite`,
      }}>
        {doubled.map((src, i) => (
          <div key={i} style={{
            width: 320, height: 220, borderRadius: 6, overflow: "hidden",
            flexShrink: 0, position: "relative",
            border: "1px solid var(--border)",
            transition: "transform 0.4s cubic-bezier(.16,1,.3,1), border-color 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.borderColor = "rgba(230,50,40,0.2)"; e.currentTarget.style.zIndex = "5"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.zIndex = "1"; }}
          >
            <img src={src} alt="" loading="lazy" style={{
              width: "100%", height: "100%", objectFit: "cover",
              filter: "saturate(0.85) contrast(1.05)",
              transition: "filter 0.4s ease",
            }}
              onMouseEnter={e => e.target.style.filter = "saturate(1.1) contrast(1.1)"}
              onMouseLeave={e => e.target.style.filter = "saturate(0.85) contrast(1.05)"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandingGallery() {
  const [ref, vis] = useInView(0.05);
  return (
    <section ref={ref} style={{
      padding: "80px 0", position: "relative",
      borderTop: "1px solid var(--border)",
      opacity: vis ? 1 : 0, transition: "opacity 0.8s ease",
    }}>
      {/* Section header */}
      <div style={{ padding: "0 40px", maxWidth: 1200, margin: "0 auto 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 8, letterSpacing: "0.2em", color: "var(--red)", opacity: 0.7, marginBottom: 8 }}>[ CREATIVE PORTFOLIO ]</div>
            <h2 style={{ fontFamily: "var(--f-display)", fontSize: 28, fontWeight: 300, color: "var(--ink)", margin: 0, letterSpacing: "0.02em" }}>
              Branding & Visuals
            </h2>
          </div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--faint)", letterSpacing: "0.1em", textAlign: "right" }}>
            AI-GENERATED CONCEPTS<br />
            <span style={{ color: "var(--amber)" }}>CAMPAIGNS · EDITORIAL · PRODUCT</span>
          </div>
        </div>
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

// ═══════════════════════════════════════
//  ABOUT
// ═══════════════════════════════════════
function AboutSection() {
  return (
    <section id="about" style={{ padding: "100px 40px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, marginBottom: 80 }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 40, padding: "24px 0", borderTop: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--amber)", marginBottom: 6, opacity: 0.7 }}>{exp.period}</div>
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

// ═══════════════════════════════════════
//  CONTACT
// ═══════════════════════════════════════
function Contact() {
  const clock = useClock();
  return (
    <section id="contact" style={{ padding: "100px 40px 60px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Mask>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--f-display)", fontSize: "clamp(44px, 6.5vw, 88px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1 }}>Let's work</span>
            <span style={{ fontFamily: "var(--f-display)", fontSize: "clamp(44px, 6.5vw, 88px)", fontWeight: 200, color: "var(--muted)", lineHeight: 1, letterSpacing: "-0.02em" }}>together</span>
          </div>
        </Mask>
        <Reveal delay={0.3} style={{ marginTop: 44, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <a href="mailto:hello@felipemolina.dev" style={{
            fontFamily: "var(--f-mono)", fontSize: 12, padding: "13px 30px", borderRadius: 40,
            background: "var(--red)", color: "#fff", textDecoration: "none", fontWeight: 500,
            transition: "opacity 0.3s",
          }}
            onMouseEnter={e => e.target.style.opacity = "0.85"} onMouseLeave={e => e.target.style.opacity = "1"}>Schedule a call</a>
          <a href="mailto:hello@felipemolina.dev" style={{
            fontFamily: "var(--f-mono)", fontSize: 12, padding: "13px 30px", borderRadius: 40,
            border: "1px solid var(--border)", color: "var(--muted)", textDecoration: "none",
            transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "var(--ink)"; e.target.style.color = "var(--ink)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--muted)"; }}>hello@felipemolina.dev</a>
        </Reveal>
        <Reveal delay={0.4} style={{ marginTop: 40, display: "flex", gap: 24 }}>
          {["GitHub", "LinkedIn", "Instagram", "Dribbble"].map(s => (
            <a key={s} href="#" style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--faint)", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = "var(--ink)"} onMouseLeave={e => e.target.style.color = "var(--faint)"}>{s}</a>
          ))}
        </Reveal>
        <div style={{ marginTop: 100, paddingTop: 20, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.1em", color: "var(--faint)" }}>
          <span>© 2026</span>
          <span>Madrid · {clock} · 40.4168° N</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════
export default function Portfolio() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&family=Oxanium:wght@200;300;400;500;600;700;800&family=Zen+Dots&display=swap');

        :root {
          --f-display: 'Oxanium', 'Orbitron', sans-serif;
          --f-sans: 'Oxanium', 'Orbitron', sans-serif;
          --f-serif: 'Oxanium', 'Orbitron', sans-serif;
          --f-mono: 'JetBrains Mono', 'SF Mono', monospace;
          --bg: #9b9a99;
          --ink: #1a1a1a;
          --muted: rgba(26,26,26,0.6);
          --faint: rgba(26,26,26,0.3);
          --border: rgba(26,26,26,0.1);
          --red: #e63228;
          --amber: #d4a017;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--ink); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        ::selection { background: rgba(230,50,40,0.15); color: var(--ink); }

        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pulse { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(230,50,40,0.3); } 50% { opacity: 0.6; box-shadow: 0 0 0 5px rgba(230,50,40,0); } }

        @keyframes felipeSlide {
          0% { opacity: 0; transform: translateX(20px); letter-spacing: 0.25em; }
          60% { opacity: 1; }
          100% { opacity: 1; transform: translateX(0); letter-spacing: 0.08em; }
        }

        @keyframes felipeGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        @keyframes lineGrow {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }

        @keyframes dashPulse {
          0%, 100% { opacity: 1; text-shadow: 0 0 0px transparent; }
          50% { opacity: 0.92; text-shadow: 0 0 40px rgba(230,50,40,0.08); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes galleryLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes galleryRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        @keyframes glitch1 {
          0% { clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); transform: translate(-3px, -2px); }
          25% { clip-path: polygon(0 20%, 100% 20%, 100% 65%, 0 65%); transform: translate(2px, 1px); }
          50% { clip-path: polygon(0 50%, 100% 50%, 100% 85%, 0 85%); transform: translate(-1px, 3px); }
          75% { clip-path: polygon(0 10%, 100% 10%, 100% 40%, 0 40%); transform: translate(3px, -1px); }
          100% { clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%); transform: translate(-2px, 2px); }
        }

        @keyframes glitch2 {
          0% { clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%); transform: translate(3px, 2px); }
          25% { clip-path: polygon(0 70%, 100% 70%, 100% 95%, 0 95%); transform: translate(-2px, -1px); }
          50% { clip-path: polygon(0 15%, 100% 15%, 100% 50%, 0 50%); transform: translate(1px, -3px); }
          75% { clip-path: polygon(0 65%, 100% 65%, 100% 90%, 0 90%); transform: translate(-3px, 1px); }
          100% { clip-path: polygon(0 5%, 100% 5%, 100% 35%, 0 35%); transform: translate(2px, -2px); }
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: rgba(26,26,26,0.12); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(26,26,26,0.25); }
        img { display: block; }
        canvas { display: block; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
        <Nav />
        <Hero />
        <Marquee />
        <WorkSection />
        <Marquee text="AI SYSTEMS ✦ BRAND IDENTITY ✦ INTERACTIVE DEV ✦ DATA AUTOMATION ✦ LLM ORCHESTRATION ✦ " />
        <BrandingGallery />
        <AboutSection />
        <Contact />
      </div>
    </>
  );
}
