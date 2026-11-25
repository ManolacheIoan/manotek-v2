import { footer, nav, site, whatsappHref } from "@/content/site";
import { TextLink } from "../ui/TextLink";
import { CurrentYear } from "./CurrentYear";
import { FooterWordmark } from "./FooterWordmark";

export function Footer() {
  const c = site.company;
  return (
    <footer data-theme="dark" className="bg-ink text-paper">
      <div className="wrap grid-page gap-y-12 border-t border-paper/12 pt-20 pb-14 lg:pt-24">
        <div className="col-span-full lg:col-span-4">
          <p className="font-serif text-t1 font-light italic">{site.tagline}</p>
          <p className="mt-4 max-w-[22rem] text-small text-paper/62">{footer.text}</p>
        </div>

        <nav aria-label="Linkuri în subsol" className="col-span-2 md:col-span-2 lg:col-span-2 lg:col-start-6">
          <p className="label text-paper/62">{footer.siteTitle}</p>
          <ul className="mt-5 space-y-2.5 text-small">
            {nav.map((item) => (
              <li key={item.href}>
                <TextLink href={`/${item.href}`}>{item.label}</TextLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 md:col-span-2 lg:col-span-2">
          <p className="label text-paper/62">{footer.contactTitle}</p>
          <ul className="mt-5 space-y-2.5 text-small">
            <li>
              <TextLink href="/audit-gratuit">{footer.auditLink}</TextLink>
            </li>
            <li>
              <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
            </li>
            <li>
              <TextLink href={whatsappHref()} external>
                WhatsApp
              </TextLink>
            </li>
            {site.phone ? (
              <li>
                <TextLink href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</TextLink>
              </li>
            ) : null}
            <li>
              <TextLink href="/confidentialitate">{footer.privacyLabel}</TextLink>
            </li>
          </ul>
        </div>

        <div className="col-span-full md:col-span-2 lg:col-span-3">
          <p className="label text-paper/62">{footer.companyTitle}</p>
          {/* PLACEHOLDER: completează datele în content/site.ts → site.company */}
          <ul className="mt-5 space-y-1.5 text-small text-paper/62">
            <li className="text-paper">{site.name} – PFA</li>
            <li>{c.legalName}</li>
            <li>CUI: {c.cui}</li>
            <li>{c.registry}</li>
            <li>{c.address}</li>
          </ul>
        </div>
      </div>

      <div className="overflow-hidden px-[clamp(1.25rem,4.5vw,4.5rem)] pb-4">
        <FooterWordmark />
      </div>

      {/* pb-24: loc liber pentru butonul fix „Derulează” / „Sus”, ca să nu acopere linkurile */}
      <div className="wrap flex flex-col gap-3 border-t border-paper/12 pt-6 pb-24 text-small text-paper/62 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CurrentYear /> {site.name} – PFA. {footer.rights}
        </p>
        <div className="flex gap-6">
          <TextLink href="/confidentialitate">{footer.privacyLabel}</TextLink>
          <a href="#top" className="u-link">
            {footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
