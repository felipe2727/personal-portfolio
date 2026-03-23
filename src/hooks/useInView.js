import { useState, useEffect, useRef } from "react";

export default function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold });
    o.observe(el); return () => o.disconnect();
  }, []); return [ref, v];
}
