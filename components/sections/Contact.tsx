import { contact, site, whatsappHref } from "@/content/site";
import { MaskText } from "../motion/MaskText";
import { Reveal } from "../motion/Reveal";
import { Mail, WhatsApp } from "../ui/Icons";
import { SectionLabel } from "../ui/SectionLabel";
import { TextLink } from "../ui/TextLink";
import { ContactForm } from "./ContactForm";
import { StairText } from "../ui/StairText";

/**
 * Finalul: titlu imens, formular minimalist, WhatsApp și email.
 * `data-scroll-center`: butonul „Derulează” și meniul așază secțiunea la mijlocul ecranului;
 * unde nu încape (pe mobil), formularul (`data-scroll-focus`) se vede întreg, gata de completat.
 */
export function Contact() {
  return (
    <section
      id="contact"
      data-theme="dark"
      data-scroll-center
      aria-labelledby="contact-titlu"
      className="bg-ink py-[clamp(5.5rem,3rem+7vw,11rem)] text-paper"
    >
      <div className="wrap">
        <SectionLabel tone="dark">{contact.label}</SectionLabel>
        <MaskText id="contact-titlu" text={contact.title} className="mt-8 font-serif text-d1 font-light" stagger={0.06} />
      </div>

      <div className="wrap grid-page mt-16 gap-y-16 lg:mt-24">
        <Reveal variant="rise" className="col-span-full pl-[calc(var(--text-d1)*0.038)] md:col-span-4 lg:col-span-4">
          <StairText text={contact.intro} className="max-w-[26rem] text-lead text-paper/80" />
          <ul className="mt-10 space-y-5 text-[1.0625rem]">
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
            {site.phone ? (
              <li>
                <TextLink href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-paper">
                  {site.phone}
                </TextLink>
              </li>
            ) : null}
          </ul>
        </Reveal>

        <Reveal variant="fade" delay={0.15} className="col-span-full md:col-span-6 lg:col-span-6 lg:col-start-7">
          <div data-scroll-focus>
            {/* De la tabletă în sus, nota se oprește înainte de colțul din dreapta jos, unde stă butonul „Derulează” */}
            <ContactForm noteClassName="md:max-w-[min(36rem,calc(100%_-_10rem))]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
