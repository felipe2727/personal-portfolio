if (!window.__kentroEffectsLoaded) { window.__kentroEffectsLoaded = true;
// Three.js visual effects for the portfolio — <scene-object> and <neural-mesh> web components.
const THREE_URL = (window.__resources && window.__resources.threeJs) || "https://unpkg.com/three@0.160.0/build/three.module.js";
let threePromise = null;
function loadThree() {
  if (!threePromise) threePromise = import(THREE_URL);
  return threePromise;
}

class SceneObject extends HTMLElement {
  connectedCallback() {
    this.style.cssText = "display:block;width:100%;height:100%;position:absolute;inset:0;";
    this._disposed = false;
    loadThree().then((THREE) => { if (!this._disposed) this._init(THREE); }).catch(() => {});
  }
  disconnectedCallback() {
    this._disposed = true;
    if (this._cleanup) this._cleanup();
  }
  _init(THREE) {
    const container = this;
    const w = container.clientWidth || 300, h = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const geo = new THREE.IcosahedronGeometry(1.6, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0x2a2a2a, wireframe: true, transparent: true, opacity: 0.55 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const geo2 = new THREE.IcosahedronGeometry(0.9, 0);
    const mat2 = new THREE.MeshBasicMaterial({ color: 0xe63228, wireframe: true, transparent: true, opacity: 0.12 });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    scene.add(mesh2);

    const ringGeo = new THREE.TorusGeometry(2.2, 0.008, 8, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x3a3a3a, transparent: true, opacity: 0.2 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.2;
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(2.5, 0.005, 8, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xe63228, transparent: true, opacity: 0.06 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3; ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

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
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
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

    const ro = new ResizeObserver(() => {
      const nw = container.clientWidth, nh = container.clientHeight;
      if (!nw || !nh) return;
      camera.aspect = nw / nh; camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    ro.observe(container);

    this._cleanup = () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }
}

class NeuralMesh extends HTMLElement {
  connectedCallback() {
    this.style.cssText = "display:block;width:100%;height:100%;position:relative;overflow:hidden;";
    this._disposed = false;

    // Terminal overlay
    const term = document.createElement("div");
    term.style.cssText = "position:absolute;inset:0;padding:16px 20px;display:flex;flex-direction:column;justify-content:flex-end;pointer-events:none;z-index:1;font-family:'JetBrains Mono',monospace;font-size:11px;line-height:1.7;color:rgba(230,50,40,0.7);text-shadow:0 0 8px rgba(230,50,40,0.3);";
    const linesEl = document.createElement("div");
    const cursor = document.createElement("div");
    cursor.style.cssText = "width:7px;height:14px;background:rgba(230,50,40,0.8);animation:blink 1s step-end infinite;margin-top:2px;";
    term.appendChild(linesEl);
    term.appendChild(cursor);
    this.appendChild(term);

    const allLines = [
      "> initializing neural_mesh...",
      "> loading design_systems v4.2.1",
      "> compiling shader_pipeline",
      "> status: ONLINE",
      "> uptime: 99.97%",
      "> latency: 12ms",
      "> nodes_active: 2,048",
      "> signal: \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 100%",
    ];
    let i = 0;
    this._interval = setInterval(() => {
      if (i < allLines.length) {
        const d = document.createElement("div");
        d.textContent = allLines[i];
        d.style.opacity = String(0.6 + (i / allLines.length) * 0.4);
        linesEl.appendChild(d);
        i++;
      } else {
        i = 0;
        linesEl.innerHTML = "";
      }
    }, 1800);

    loadThree().then((THREE) => { if (!this._disposed) this._init(THREE); }).catch(() => {});
  }
  disconnectedCallback() {
    this._disposed = true;
    clearInterval(this._interval);
    if (this._cleanup) this._cleanup();
  }
  _init(THREE) {
    const container = this;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.cssText = "position:absolute;inset:0;";
    container.insertBefore(renderer.domElement, container.firstChild);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const vertexShader = "void main() { gl_Position = vec4(position, 1.0); }";
    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
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
    scene.add(new THREE.Mesh(geometry, material));

    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      if (!w || !h) return;
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

    this._cleanup = () => {
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      renderer.setAnimationLoop(null);
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }
}

if (!customElements.get("scene-object")) customElements.define("scene-object", SceneObject);
if (!customElements.get("neural-mesh")) customElements.define("neural-mesh", NeuralMesh);

}
