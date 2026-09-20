import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <main id="main" className="relative z-raised">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Achievements />
      <Contact />
    </main>
  );
}
