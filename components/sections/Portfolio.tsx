import { portfolio } from "@/content/site";
import { MaskText } from "../motion/MaskText";
import { Reveal } from "../motion/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { TextLink } from "../ui/TextLink";
import { StairText } from "../ui/StairText";

/** Portofoliu: pregătit pentru studii de caz; până atunci, un bloc onest „vin în curând”. */
export function Portfolio() {
  const { cases, comingSoon, template, caseLabels } = portfolio;
  return (
    <section id="portofoliu" aria-labelledby="portofoliu-titlu" className="pt-[clamp(4rem,2.5rem+5vw,8rem)]">
      <div className="wrap grid-page gap-y-8">
        <div className="col-span-full md:col-span-5 lg:col-span-7">
          <SectionLabel>{portfolio.label}</SectionLabel>
          <MaskText id="portofoliu-titlu" text={portfolio.title} className="mt-6 text-d2" />
        </div>
        <Reveal
          variant="fade"
          delay={0.2}
          className="col-span-full max-w-[30rem] md:col-span-4 md:col-start-3 lg:col-span-4 lg:col-start-9 lg:self-end"
        >
          <StairText text={portfolio.intro} className="text-body text-stone" />
        </Reveal>
      </div>

      <div className="wrap mt-16 lg:mt-24">
        {cases.length > 0 ? (
          <ul className="border-t border-ink/80">
            {cases.map((c) => (
              <li key={c.business} className="grid-page gap-y-6 border-b border-rule py-12">
                <div className="col-span-full md:col-span-2 lg:col-span-4">
                  <h3 className="text-t1">{c.business}</h3>
                  <p className="mt-1 text-small text-stone">{c.city}</p>
                </div>
                <dl className="col-span-full grid gap-6 md:col-span-4 lg:col-span-7 lg:col-start-6">
                  <div>
                    <dt className="label text-stone">{caseLabels.problem}</dt>
                    <dd className="mt-2 text-body">{c.problem}</dd>
                  </div>
                  <div>
                    <dt className="label text-stone">{caseLabels.work}</dt>
                    <dd className="mt-2 text-body">{c.work}</dd>
                  </div>
                  <div>
                    <dt className="label text-stone">{caseLabels.result}</dt>
                    <dd className="mt-2 font-serif text-t1 italic">{c.result}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        ) : (
          <div className="relative grid-page gap-y-14 border border-ink/15 px-6 py-12 md:px-10 md:py-14 lg:px-16 lg:py-20">
            <div className="col-span-full md:col-span-6 lg:col-span-6">
              <MaskText as="h3" text={comingSoon.title} className="text-d3" />
              <Reveal variant="fade" delay={0.25} className="mt-7 max-w-[30rem]">
                <StairText text={comingSoon.text} className="text-body text-stone" />
              </Reveal>
              <Reveal variant="fade" delay={0.35} className="mt-9">
                <TextLink href="/audit-gratuit" arrow className="text-body font-medium">
                  {comingSoon.cta}
                </TextLink>
              </Reveal>
            </div>

            <div className="col-span-full md:col-span-6 lg:col-span-5 lg:col-start-8" aria-label={template.heading}>
              <p className="label flex items-center justify-between text-stone">
                <span>{template.heading}</span>
                <span aria-hidden="true" className="font-serif text-[1.1rem] tracking-normal normal-case italic">
                  01 / —
                </span>
              </p>
              <Reveal as="dl" variant="fade" delay={0.2} className="mt-6 border-b border-ink/15">
                {template.fields.map((f) => (
                  <div key={f} className="flex items-baseline justify-between gap-6 border-t border-ink/15 py-5">
                    <dt className="text-body">{f}</dt>
                    <dd className="font-serif text-[1.125rem] text-stone italic">{template.placeholder}</dd>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
