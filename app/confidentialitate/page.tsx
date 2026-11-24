import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CssMaskText } from "@/components/motion/CssMaskText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { fillCompany, plain, privacy } from "@/content/site";

export const metadata: Metadata = {
  title: plain(privacy.title).replace(/\.$/, ""),
  description: "Cum folosește Manotek datele pe care le trimiți prin formularul de contact sau pe WhatsApp.",
  alternates: { canonical: "/confidentialitate/" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="continut" tabIndex={-1}>
        <article id="top" className="wrap pt-[clamp(8rem,5rem+8vw,13rem)] pb-[clamp(3.5rem,1.5rem+5vw,7.75rem)]">
          <div className="grid-page gap-y-8">
            <SectionLabel className="col-span-full lg:col-span-3 lg:pt-5">{privacy.label}</SectionLabel>
            <div className="col-span-full md:col-span-6 lg:col-span-9 lg:col-start-4">
              <CssMaskText text={privacy.title} className="text-d2 max-[400px]:text-[1.85rem]" />
              <p className="mt-6 text-small text-stone">Ultima actualizare: {privacy.updated}</p>
              <p className="mt-10 max-w-[38rem] border-l border-ochre pl-6 text-lead">{privacy.intro}</p>
            </div>
          </div>

          <div className="mt-20 border-t border-ink/80 lg:mt-28">
            {privacy.sections.map((s, i) => (
              <section key={s.title} aria-labelledby={`sec-${i}`} className="grid-page gap-y-4 border-b border-rule py-10 lg:py-14">
                <h2 id={`sec-${i}`} className="col-span-full flex items-baseline gap-5 text-t1 md:col-span-2 lg:col-span-4 lg:col-start-1">
                  <span aria-hidden="true" className="label w-6 shrink-0 text-stone">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                <div className="col-span-full space-y-4 pl-11 text-body text-stone md:col-span-4 md:col-start-3 md:pl-0 lg:col-span-6 lg:col-start-6">
                  {s.body.map((p) => (
                    <p key={p}>{fillCompany(p)}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14">
            <TextLink href="/" arrow className="text-body font-medium">
              {privacy.back}
            </TextLink>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
