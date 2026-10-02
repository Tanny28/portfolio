import { About, CreateBand } from "@/components/site/About";
import { Header, Loader, NavMenu } from "@/components/site/Chrome";
import { Footer, RequestModal } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import Runtime from "@/components/site/Runtime";
import { Experience, Expertise, Stack, Stats } from "@/components/site/Sections";
import { CaseModal, Works } from "@/components/site/Works";

export default function Page() {
  return (
    <>
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
