import useInView from "../hooks/useInView";

export default function Mask({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ ...style, overflow: "hidden" }}><div style={{ transform: v ? "translateY(0)" : "translateY(110%)", transition: `transform 1s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div></div>;
}
