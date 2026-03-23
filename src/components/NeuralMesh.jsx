import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function NeuralMesh() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const vertexShader = `void main() { gl_Position = vec4(position, 1.0); }`;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        vec2 mouse = (iMouse - 0.5 * iResolution.xy) / iResolution.y;

        float t = iTime * 0.2;
        float mouseDist = length(uv - mouse);

        float warp = sin(mouseDist * 20.0 - t * 4.0) * 0.1;
        warp *= smoothstep(0.4, 0.0, mouseDist);
        uv += warp;

        vec2 gridUv = abs(fract(uv * 10.0) - 0.5);
        float line = pow(1.0 - min(gridUv.x, gridUv.y), 50.0);

        vec3 gridColor = vec3(0.9, 0.15, 0.1);
        vec3 color = gridColor * line * (0.3 + sin(t * 2.0) * 0.15);

        float energy = sin(uv.x * 20.0 + t * 5.0) * sin(uv.y * 20.0 + t * 3.0);
        energy = smoothstep(0.8, 1.0, energy);
        color += vec3(1.0, 0.3, 0.1) * energy * line;

        float glow = smoothstep(0.1, 0.0, mouseDist);
        color += vec3(0.9, 0.2, 0.1) * glow * 0.4;

        color += random(uv + t * 0.1) * 0.03;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse: { value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.iResolution.value.set(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    onResize();

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      uniforms.iMouse.value.set(e.clientX - rect.left, container.clientHeight - (e.clientY - rect.top));
    };
    window.addEventListener("mousemove", onMouseMove);

    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    return () => {
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      renderer.setAnimationLoop(null);
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  const [termLines, setTermLines] = useState([]);
  const allLines = [
    "> initializing neural_mesh...",
    "> loading design_systems v4.2.1",
    "> compiling shader_pipeline",
    "> status: ONLINE",
    "> uptime: 99.97%",
    "> latency: 12ms",
    "> nodes_active: 2,048",
    "> signal: ██████████ 100%",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < allLines.length) {
        setTermLines((prev) => [...prev, allLines[i]]);
        i++;
      } else {
        i = 0;
        setTermLines([]);
      }
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        padding: "16px 20px",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        pointerEvents: "none", zIndex: 1,
        fontFamily: "var(--f-mono)", fontSize: "11px", lineHeight: 1.7,
        color: "rgba(230,50,40,0.7)",
        textShadow: "0 0 8px rgba(230,50,40,0.3)",
      }}>
        {termLines.map((line, i) => (
          <div key={i} style={{ opacity: 0.6 + (i / allLines.length) * 0.4 }}>{line}</div>
        ))}
        <div style={{
          width: "7px", height: "14px",
          background: "rgba(230,50,40,0.8)",
          animation: "blink 1s step-end infinite",
          marginTop: "2px",
        }} />
      </div>
    </div>
  );
}
