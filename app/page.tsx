import dynamic from "next/dynamic";
const Hero = dynamic(() => import("@/components/sections/HeroCinematic"), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Research from "@/components/sections/Research";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <main className="relative z-10">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Research />
      <Contact />
    </main>
  );
}
