import useInView from "../hooks/useInView";

export default function Reveal({ children, delay = 0, y = 50, style = {} }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ ...style, opacity: v ? 1 : 0, transform: v ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`, transition: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div>;
}
