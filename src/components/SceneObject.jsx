import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SceneObject() {
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

  return <div ref={mountRef} aria-hidden="true" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}
