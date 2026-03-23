import { lazy, Suspense } from "react";
import Nav from "./components/Nav";
import Marquee from "./components/Marquee";
import BrandingGallery from "./components/BrandingGallery";
import AboutSection from "./components/AboutSection";
import Contact from "./components/Contact";

const Hero = lazy(() => import("./components/Hero"));
const WorkSection = lazy(() => import("./components/WorkSection"));

export default function Portfolio() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <a href="#work" className="skip-link">Skip to content</a>
      <Nav />
      <Suspense fallback={<div style={{ height: "100vh", background: "var(--bg)" }} />}>
        <Hero />
      </Suspense>
      <Marquee />
      <Suspense fallback={<div style={{ minHeight: 400, background: "var(--bg)" }} />}>
        <WorkSection />
      </Suspense>
      <Marquee text="AI SYSTEMS ✦ BRAND IDENTITY ✦ INTERACTIVE DEV ✦ DATA AUTOMATION ✦ LLM ORCHESTRATION ✦ " />
      <BrandingGallery />
      <AboutSection />
      <Contact />
    </div>
  );
}
