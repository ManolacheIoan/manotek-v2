import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { CSSProperties } from "react";
import { CssMaskText } from "@/components/motion/CssMaskText";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { Mail, WhatsApp } from "@/components/ui/Icons";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { auditPage, contact, faq, site, whatsappHref } from "@/content/site";
import { StairText } from "@/components/ui/StairText";

export const metadata: Metadata = {
  title: auditPage.label,
  description: auditPage.seoDescription,
  alternates: { canonical: "/audit-gratuit/" },
  openGraph: {
    url: "/audit-gratuit/",
    title: `${auditPage.label} | ${site.name}`,
    description: auditPage.seoDescription,
  },
};

/** Pagina dedicată cererii de audit: aceleași date și același formular ca pe pagina principală. */
export default function AuditPage() {
  const questions = auditPage.faqItems.map((i) => faq.items[i]).filter(Boolean);

  return (
    <>
      <Header />
      <main id="continut" tabIndex={-1}>
        <section
          id="top"
          aria-labelledby="audit-titlu"
          className="wrap pt-[clamp(7.5rem,5rem+6vw,11rem)]"
        >
          <div className="grid-page gap-y-14 lg:gap-y-20">
            {/* Titlul și promisiunea */}
            <div className="col-span-full md:col-span-6 lg:col-span-6">
              <SectionLabel>{auditPage.label}</SectionLabel>
              <CssMaskText id="audit-titlu" text={auditPage.title} className="mt-6 text-d2" />
              <p className="hero-in mt-8 max-w-[36rem] text-lead text-balance text-stone" style={{ "--d": "450ms" } as CSSProperties}>
                {auditPage.intro.map((line, i) => (
                  <span key={line} className="min-[360px]:block">
                    {i > 0 ? " " : null}
                    {line}
                  </span>
                ))}
              </p>
            </div>

            {/* Formularul: pe mobil imediat după introducere, pe desktop în dreapta, lipicios */}
            <div
              className="hero-in col-span-full md:col-span-6 lg:sticky lg:top-28 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-start"
              style={{ "--d": "300ms" } as CSSProperties}
            >
              <div id="cerere" data-theme="dark" className="bg-ink p-7 text-paper sm:p-10">
                <h2 className="font-serif text-t1 font-light">{auditPage.formTitle}</h2>
                <p className="mt-3 max-w-[30rem] text-body text-balance text-paper/62">{auditPage.formIntro}</p>
                <div className="mt-8">
                  <ContactForm />
                </div>
                <div className="mt-10 border-t border-paper/12 pt-6">
                  <p className="label text-paper/62">{auditPage.otherTitle}</p>
                  <ul className="mt-4 space-y-3 text-[1.0625rem]">
                    <li>
                      <TextLink href={whatsappHref()} external className="text-paper">
                        <WhatsApp className="size-5 shrink-0" />
                        {contact.whatsappLabel}
                      </TextLink>
                    </li>
                    <li>
                      <TextLink href={`mailto:${site.email}`} className="text-paper">
                        <Mail className="size-5 shrink-0" />
                        {site.email}
                      </TextLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Ce primești și cum decurge */}
            <div className="col-span-full md:col-span-6 lg:col-span-6 lg:col-start-1 lg:row-start-2">
              <Reveal variant="fade">
                <h2 className="text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
                  {auditPage.includesTitle}
                </h2>
                <ul className="mt-7 border-t border-ink/80">
                  {auditPage.includes.map((item) => (
                    <li key={item} className="flex gap-4 border-b border-rule py-5 text-lead">
                      <span aria-hidden="true" className="text-ochre">
                        –
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal variant="fade" delay={0.1} className="mt-16">
                <h2 className="text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
                  {auditPage.stepsTitle}
                </h2>
                <ol className="mt-7 border-t border-ink/80">
                  {auditPage.steps.map((step, i) => (
                    <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-rule py-6">
                      <span aria-hidden="true" className="font-serif text-[1.75rem] leading-none text-stone/70 italic">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[1.5rem] leading-tight">{step.title}</h3>
                        <StairText text={step.text} className="mt-2 text-body text-stone" />
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal variant="fade" delay={0.15} className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
                {auditPage.related.map((link) => (
                  <TextLink key={link.href} href={link.href} arrow className="text-body font-medium">
                    {link.label}
                  </TextLink>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        <Faq id="intrebari-audit" label={faq.label} title={auditPage.faqTitle} intro={faq.intro} items={questions} />
      </main>
      <Footer />
    </>
  );
}
