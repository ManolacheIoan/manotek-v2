import { problems } from "@/content/site";
import { DrawLine } from "../motion/DrawLine";
import { MaskText } from "../motion/MaskText";
import { Reveal } from "../motion/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { TextLink } from "../ui/TextLink";
import { StairText } from "../ui/StairText";

/**
 * Problema: trei rânduri editoriale mari, numerotate, separate de linii care se desenează.
 * `data-scroll-pace`: butonul „Derulează” încetinește lin cât cele trei situații trec prin ecran (la 40% din viteză).
 */
export function Problems() {
  return (
    <section id="problema" aria-labelledby="problema-titlu" className="pt-[clamp(5.5rem,3rem+7vw,11rem)] pb-14 lg:pb-20">
      <div className="wrap grid-page gap-y-8">
        <SectionLabel className="col-span-full lg:col-span-3 lg:pt-4">{problems.label}</SectionLabel>
        <MaskText
          id="problema-titlu"
          text={problems.title}
          className="col-span-full text-d3 md:col-span-5 lg:col-span-8 lg:col-start-4"
        />
      </div>

      <div data-scroll-pace="0.4" className="wrap mt-[clamp(5.5rem,3rem+7vw,11rem)]">
      <ol>
        {problems.items.map((item, i) => (
          <li key={item.title} className="relative">
            <DrawLine delay={i * 0.12} />
            <div className="grid-page gap-y-5 py-10 lg:py-14">
              <Reveal
                variant="fade"
                delay={0.2 + i * 0.12}
                className="col-span-full font-serif text-t1 text-stone italic lg:col-span-1"
              >
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </Reveal>
              <MaskText
                as="h3"
                text={item.title}
                delay={0.1 + i * 0.08}
                className="col-span-full text-d3 md:col-span-5 lg:col-span-6 lg:col-start-2"
              />
              <Reveal
                variant="rise"
                delay={0.3 + i * 0.08}
                className="col-span-full max-w-[30rem] md:col-span-4 md:col-start-2 lg:col-span-4 lg:col-start-9 lg:pt-3"
              >
                <StairText text={item.text} className="text-body text-stone" />
              </Reveal>
            </div>
          </li>
        ))}
      </ol>
      <DrawLine delay={0.36} />
      </div>

      <div className="wrap grid-page mt-14 lg:mt-20">
        <Reveal
          variant="left"
          className="col-span-full flex flex-col gap-4 md:col-span-6 lg:col-span-11 lg:col-start-2 lg:flex-row lg:items-baseline lg:gap-12"
        >
          <p className="font-serif text-t1 font-light">{problems.outro}</p>
          <TextLink href="/#servicii" arrow className="shrink-0 text-body font-medium whitespace-nowrap">
            {problems.outroLink.label}
          </TextLink>
        </Reveal>
      </div>
    </section>
  );
}
