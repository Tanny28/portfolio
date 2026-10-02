import { About, CreateBand } from "@/components/site/About";
import { Header, Loader, NavMenu } from "@/components/site/Chrome";
import { Footer, RequestModal } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import Runtime from "@/components/site/Runtime";
import { Experience, Expertise, Stack, Stats } from "@/components/site/Sections";
import { CaseModal, Works } from "@/components/site/Works";
import { PROFILE } from "@/lib/data";
import { SITE } from "@/lib/constants";

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: "AI / GenAI Engineer",
  url: SITE.url,
  email: `mailto:${PROFILE.email}`,
  image: `${SITE.url}/tanmay.jpg`,
  address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Pimpri Chinchwad University" },
  worksFor: { "@type": "Organization", name: "Pixaflip Technologies" },
  sameAs: [PROFILE.github, PROFILE.linkedin],
  knowsAbout: [
    "Generative AI",
    "Large language models",
    "Retrieval-augmented generation",
    "AI agents",
    "Machine learning",
    "PyTorch",
    "FastAPI",
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
      />
      <div className="sr-only" role="status" aria-live="polite" data-sr-live />
      <Loader />
      <div id="page">
        <Header />
        <main id="main">
          <Hero />
          <About />
          <CreateBand />
          <Works />
          <Expertise />
          <Experience />
          <Stack />
          <Stats />
        </main>
        <Footer />
      </div>
      <NavMenu />
      <CaseModal />
      <RequestModal />
      <Runtime />
    </>
  );
}
