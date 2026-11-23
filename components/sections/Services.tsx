import { ServicesAccordion } from "./ServicesAccordion";
import { ServicesHorizontal } from "./ServicesHorizontal";

/** Servicii: scroll orizontal pe desktop, accordion pe mobil și tabletă. */
export function Services() {
  return (
    <section id="servicii" aria-label="Servicii" className="bg-sand">
      <ServicesAccordion />
      <ServicesHorizontal />
    </section>
  );
}
