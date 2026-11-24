import type { CSSProperties } from "react";
import { hero } from "@/content/site";
import { Rich } from "@/lib/rich";
import { HeroLoop } from "../art/HeroLoop";
import { Button } from "../ui/Button";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Hero: titlu imens pe trei rânduri, aliniat la stânga; bucla desenată în dreapta. */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-titlu" className="relative flex min-h-[100svh] flex-col pt-[112px] lg:pt-[120px]">
      <div className="wrap grid-page flex-1 content-start lg:content-center">
        <h1
          id="hero-titlu"
          className="col-span-full flex flex-col font-serif text-[clamp(2.55rem,0.5rem+7.4vw,8rem)] leading-[1.04] font-light tracking-[-0.035em] lg:row-start-1"
        >
          {hero.lines.map((line, i) => (
            <span key={line} className="hero-line">
              <span style={{ "--i": i } as CSSProperties}>
                <Rich text={line} emClassName="italic text-ochre" />
              </span>
            </span>
          ))}
        </h1>

        <div className="col-span-full mt-9 md:col-span-4 lg:col-span-6 lg:row-start-2 lg:mt-9">
          <p className="hero-in max-w-[40rem] text-lead text-balance text-stone" style={d(520)}>
            {hero.subtitle}
          </p>
          <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={d(640)}>
            <Button href="/audit-gratuit" arrow>
              {hero.primaryCta}
            </Button>
            <Button href={`/${hero.secondaryHref}`} variant="outline">
              {hero.secondaryCta}
            </Button>
          </div>
        </div>

        <div className="col-span-full mt-20 md:col-span-4 md:col-start-2 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center">
          <HeroLoop />
        </div>
      </div>

      <div className="wrap mt-12 flex items-end justify-between gap-8 pb-8">
        <div data-audience className="hero-fade flex min-w-0 flex-1 flex-wrap items-baseline gap-x-5 gap-y-2 sm:flex-nowrap" style={d(1000)}>
          <p className="label shrink-0 text-stone">{hero.audienceLabel}</p>
          <ul className="flex min-w-0 basis-full flex-wrap gap-x-2 gap-y-1 text-small text-ink sm:flex-1 sm:basis-0">
            {hero.audience.map((a, i) => (
              <li key={a} className="flex items-center gap-2 whitespace-nowrap">
                {a}
                {i < hero.audience.length - 1 ? (
                  <span aria-hidden="true" className="text-ochre">
                    ·
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        {/* loc rezervat pentru butonul fix „Derulează” (ScrollStepper), ca lista să nu treacă pe sub el */}
        <span aria-hidden="true" className="hidden h-12 w-36 shrink-0 md:block" />
      </div>
    </section>
  );
}
