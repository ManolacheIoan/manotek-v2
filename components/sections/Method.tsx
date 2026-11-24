import { method } from "@/content/site";
import { MaskText } from "../motion/MaskText";
import { Reveal } from "../motion/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { LoopExplainer } from "./LoopExplainer";
import { StairText } from "../ui/StairText";

/** Metoda: bucla obiceiului (interactivă) și cinci principii, ca listă editorială. */
export function Method() {
  return (
    <section id="metoda" aria-labelledby="metoda-titlu" className="pt-[clamp(5.5rem,3rem+7vw,11rem)]">
      <div className="wrap grid-page gap-y-8">
        <SectionLabel className="col-span-full lg:col-span-2 lg:pt-6">{method.label}</SectionLabel>
        <MaskText id="metoda-titlu" text={method.title} className="col-span-full text-d2 md:col-span-6 lg:col-span-9 lg:col-start-3" />
        <Reveal
          variant="rise"
          delay={0.2}
          className="col-span-full max-w-[46rem] pl-[calc(var(--text-d2)*0.022)] md:col-span-5 lg:col-span-8 lg:col-start-3 lg:mt-4"
        >
          <StairText text={method.intro} className="text-lead text-stone" />
        </Reveal>
      </div>

      <LoopExplainer />

      <div className="wrap mt-24 lg:mt-32">
        <div className="grid-page gap-y-6">
          <MaskText as="h3" text={method.principlesTitle} className="col-span-full text-d3 md:col-span-5 lg:col-span-7" />
        </div>
        <ol className="mt-12 border-t border-ink/15 lg:mt-16">
          {method.principles.map((p, i) => (
            <li key={p.title} className="grid-page gap-y-4 border-b border-rule py-9 lg:py-12">
              <Reveal variant="left" delay={0.05} className="col-span-full flex items-baseline gap-5 lg:col-span-5">
                <span aria-hidden="true" className="label w-6 shrink-0 text-stone">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="text-[clamp(1.75rem,1.3rem+1.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">{p.title}</h4>
              </Reveal>
              <Reveal variant="fade" delay={0.2} className="col-span-full pl-11 md:col-span-5 lg:col-span-6 lg:col-start-7 lg:pl-0">
                <StairText text={p.text} className="text-body" />
                <StairText text={p.example} srPrefix={`${method.exampleLabel}:`} className="mt-3 font-serif text-[1.25rem] leading-snug text-stone italic" />
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="grid-page mt-12">
          <Reveal variant="rise" className="col-span-full max-w-[34rem] md:col-span-4 md:col-start-3 lg:col-span-5 lg:col-start-7">
            <StairText text={method.disclaimer} className="font-serif text-[1.375rem] leading-snug font-light italic" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
