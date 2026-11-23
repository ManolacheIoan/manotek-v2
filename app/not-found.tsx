import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CssMaskText } from "@/components/motion/CssMaskText";
import { Button } from "@/components/ui/Button";
import { notFound, plain } from "@/content/site";

export const metadata: Metadata = {
  title: plain(notFound.title).replace(/\.$/, ""),
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="continut" tabIndex={-1}>
        <section id="top" className="wrap grid-page min-h-[88svh] content-center gap-y-10 pt-36 pb-24">
          <p aria-hidden="true" className="col-span-full font-serif text-[clamp(7rem,4rem+16vw,20rem)] leading-[0.8] font-light tracking-[-0.05em] text-ink/[0.08] italic lg:col-span-5">
            404
          </p>
          <div className="col-span-full md:col-span-5 lg:col-span-6 lg:col-start-7 lg:self-end">
            <CssMaskText text={notFound.title} className="text-d2" />
            <p className="mt-6 max-w-[28rem] text-lead text-stone">{notFound.text}</p>
            <div className="mt-10">
              <Button href="/" arrow>
                {notFound.cta}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
