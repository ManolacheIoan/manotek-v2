import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Manifest } from "@/components/sections/Manifest";
import { Method } from "@/components/sections/Method";
import { Portfolio } from "@/components/sections/Portfolio";
import { Pricing } from "@/components/sections/Pricing";
import { Problems } from "@/components/sections/Problems";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main id="continut" tabIndex={-1}>
        <Hero />
        <Manifest />
        <Problems />
        <Services />
        <Method />
        <Process />
        <Pricing />
        <Portfolio />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
