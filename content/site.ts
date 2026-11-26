/**
 * ─────────────────────────────────────────────────────────────
 *  TOT CONȚINUTUL SITE-ULUI MANOTEK
 * ─────────────────────────────────────────────────────────────
 *  Aici editezi textele, serviciile, pachetele, întrebările
 *  frecvente și datele de contact. Nu trebuie să umbli în altă
 *  parte pentru modificări de conținut.
 *
 *  Reguli simple:
 *  - Textul stă între ghilimele drepte: "așa". În text folosește
 *    ghilimelele românești „ și ”.
 *  - Un cuvânt pus între steluțe, *așa*, apare în italic
 *    (și auriu, în titlurile mari).
 *  - Păstrează virgula de la finalul fiecărui rând.
 *  - Diacritice corecte: ș și ț (cu virgulă dedesubt).
 *  - Locurile marcate cu [ ... ] sunt de completat de tine.
 * ─────────────────────────────────────────────────────────────
 */

/* ───────────── Date generale și de contact ───────────── */

export const site = {
  name: "Manotek",
  tagline: "E mai ușor online",
  url: "https://manotek.ro", // domeniul final, fără „/” la sfârșit
  email: "contact@manotek.ro",

  /**
   * Numărul de WhatsApp, în format internațional, DOAR cifre, fără „+”.
   * Exemplu: "40712345678".
   * Cât timp e gol, butoanele de WhatsApp deschid aplicația și te lasă
   * să alegi contactul (funcționează, dar nu ajunge direct la tine).
   */
  whatsapp: "",
  whatsappMessage: "Bună ziua! Aș dori mai multe detalii despre auditul gratuit.",

  /** Telefon afișat (opțional). Lasă gol ca să nu apară. Ex: "0712 345 678" */
  phone: "",

  /** Datele PFA-ului, afișate în footer și în politica de confidențialitate. */
  company: {
    legalName: "[Numele complet al PFA-ului]", // ex. „Manolache Ioan PFA”
    cui: "[CUI]",
    registry: "[Nr. Registrul Comerțului]", // ex. „F17/123/2026”
    address: "[Adresa sediului]",
  },

  seo: {
    title: "Manotek | Mai mulți clienți pentru afacerea ta",
    description:
      "Prezență online, conținut foto și video și oferte construite pe psihologia cumpărătorului, pentru restaurante, cafenele, saloane, săli de sport și alte afaceri locale din România. Începe cu un audit gratuit.",
  },
};

/* ───────────── Meniu (numerotat automat 01, 02…) ───────────── */

export const nav = [
  { label: "Servicii", href: "#servicii" },
  { label: "Metoda", href: "#metoda" },
  { label: "Cum lucrăm", href: "#proces" },
  { label: "Pachete", href: "#pachete" },
  { label: "Despre mine", href: "#despre" },
  { label: "Întrebări", href: "#intrebari" },
  { label: "Contact", href: "#contact" },
];

export const header = {
  cta: "Audit gratuit",
  menu: "Meniu",
  close: "Închide",
  menuWrite: "Scrie-mi",
  auditLink: "Cere un audit gratuit",
  skip: "Sari la conținut",
};

/* ───────────── Butonul „Derulează” (mereu vizibil, în colțul ecranului) ───────────── */

export const scrollStep = {
  label: "Derulează",
  labelTop: "Sus",
  aria: "Derulează la secțiunea următoare",
  ariaTop: "Sus, înapoi la începutul paginii",
};

/* ───────────── Hero ───────────── */

export const hero = {
  /** Titlul, rând cu rând. Pe telefon, un rând lung se poate împărți în două. */
  lines: ["Mai mulți *clienți*", "pentru afacerea ta."],
  subtitle:
    "Te ajut să fii găsit online, să arăți profesionist și să ai oferte gândite pe psihologia cumpărătorului.",
  primaryCta: "Cere un audit gratuit",
  secondaryCta: "Vezi cum lucrez",
  secondaryHref: "#metoda",
  audienceLabel: "Lucrez cu",
  audience: [
    "Restaurante",
    "Cafenele",
    "Saloane",
    "Frizerii",
    "Săli de sport",
    "Magazine",
    "Pensiuni",
    "Cabinete",
    "Service-uri auto",
    "Depozite de materiale",
  ],
  loop: ["Indiciu", "Rutină", "Recompensă"],
  loopLabel: "Bucla obiceiului: indiciu, rutină, recompensă",
};

/* ───────────── Manifest ───────────── */

export const manifest = {
  label: "Ce cred",
  text: "Oamenii nu cumpără produse. Cumpără felul în care se *simt*.",
  caption:
    "De aceea nu încep cu tehnologia, ci cu oamenii care îți trec pragul.",
};

/* ───────────── Problema ───────────── */

export const problems = {
  label: "Provocări",
  title: "Trei situații care te costă clienți. Toate au *soluție*.",
  items: [
    {
      title: "Clienții nu te găsesc pe Google.",
      text: "Oamenii te caută, dar găsesc concurența.",
    },
    {
      title: "Ai pagini online, dar nu aduc clienți.",
      text: "Postările adună aprecieri, dar nu aduc telefoane sau vizite.",
    },
    {
      title: "Nu ai timp pentru marketing.",
      text: "Afacerea îți ia tot timpul, iar marketingul rămâne pe ultimul loc.",
    },
  ],
  outro: "Nu trebuie să le rezolvi tu. De asta mă ocup eu.",
  outroLink: { label: "Descoperă serviciile", href: "#servicii" },
};

/* ───────────── Servicii ───────────── */

export type ServiceArt = "presence" | "video" | "offers" | "ads" | "systems" | "care";

export const services = {
  label: "Servicii",
  title: "Tot ce îți trebuie pentru a fi găsit, ales și *ținut minte*.",
  intro:
    "Nu vând tehnologie, ci rezultate. Alegi doar ce îți trebuie.",
  hint: "Derulează",
  items: [
    {
      art: "presence" as ServiceArt,
      title: "Prezență online",
      benefit: "Clienții te găsesc ușor și au încredere în tine.",
      text: "Site rapid, profil Google complet și pagini de social media îngrijite.",
    },
    {
      art: "video" as ServiceArt,
      title: "Video și foto",
      benefit: "Afacerea ta arată online la fel de bine ca în realitate.",
      text: "Clipuri scurte și fotografii, filmate și editate de mine.",
    },
    {
      art: "offers" as ServiceArt,
      title: "Campanii și oferte",
      benefit: "Clienții au un motiv clar să vină și să revină.",
      text: "Oferte simple, gândite pe psihologia cumpărătorului.",
    },
    {
      art: "systems" as ServiceArt,
      title: "Sisteme la comandă",
      benefit: "Mai puțină hârtie și mai mult control asupra afacerii.",
      text: "Magazine online și aplicații simple, de exemplu pentru stoc.",
    },
    {
      art: "care" as ServiceArt,
      title: "Mentenanță și monitorizare",
      benefit: "Site-ul funcționează, fără griji pentru tine.",
      text: "Actualizări, copii de siguranță și verificări zilnice.",
    },
  ],
};

/* ───────────── Metoda ───────────── */

export const method = {
  label: "Metoda",
  title: "Clienți care *revin*, nu doar clienți de o singură dată.",
  intro:
    "Oamenii cumpără din obișnuință, din încredere și din plăcere. Pe aceste principii, confirmate de cercetare, construiesc oferte.",
  loop: {
    title: "Bucla obiceiului",
    text: "Orice obicei are trei etape. Folosite corect, îi aduc pe clienți înapoi.",
    steps: [
      {
        label: "Indiciu",
        text: "Semnalul care pornește obiceiul.",
        example: "E ora 12, la birou.",
      },
      {
        label: "Rutină",
        text: "Gestul făcut aproape automat.",
        example: "Vine la prânz la restaurantul tău.",
      },
      {
        label: "Recompensă",
        text: "Motivul pentru care revine.",
        example: "Meniul zilei, servit în 15 minute.",
      },
    ],
    note: "O promisiune simplă, ținută zi de zi, devine obicei.",
    hint: "Atinge o etapă",
  },
  principlesTitle: "Cinci principii, aplicate cu *onestitate*.",
  principles: [
    {
      title: "Reciprocitate",
      text: "Când primim ceva, vrem să dăm înapoi.",
      example: "„Desertul copiilor e din partea casei.”",
    },
    {
      title: "Dovadă socială",
      text: "Ne luăm după alegerile altora.",
      example: "Recenzii reale pe Google.",
    },
    {
      title: "Raritate",
      text: "Ce e limitat pare mai valoros.",
      example: "„Meniul de toamnă, doar în noiembrie.”",
    },
    {
      title: "Simpatie",
      text: "Cumpărăm de la oameni care ne plac.",
      example: "Proprietarul care apare în clipuri.",
    },
    {
      title: "Angajament",
      text: "Ce am început, vrem să terminăm.",
      example: "„A 10-a cafea e din partea casei.”",
    },
  ],
  exampleLabel: "Exemplu",
  disclaimer:
    "Nu sunt trucuri și nu promit minuni. Doar principii simple, folosite corect.",
};

/* ───────────── Procesul ───────────── */

export const steps = {
  label: "Cum lucrăm",
  title: "De la prima discuție la clienți noi, în *patru* pași.",
  intro: "Știi mereu ce urmează și cât costă.",
  items: [
    {
      title: "Audit gratuit",
      text: "Analizez cum te găsesc clienții azi și îți spun ce merge și ce nu.",
    },
    {
      title: "Plan și ofertă",
      text: "Stabilim prioritățile. Primești prețul exact înainte de a începe.",
    },
    {
      title: "Implementare",
      text: "Mă ocup eu de tot. Tu doar aprobi.",
    },
    {
      title: "Rezultate și ajustări lunare",
      text: "Lună de lună, păstrăm ce funcționează și ajustăm restul.",
    },
  ],
};

/* ───────────── Pachete și prețuri ───────────── */

/**
 * PREȚURILE: singurul loc în care le schimbi.
 * Scrii doar numărul, fără „lei” și fără punct: 1200, nu „1.200 lei”.
 * Pe site apar automat ca „1.200 lei” sau „400 lei/lună”, iar rândurile „Separat” și
 * „Economisești” de la pachetele lunare se recalculează singure din prețurile de aici.
 */
export const prices = {
  /** Site-uri de prezentare, plată unică */
  site: { start: 1200, business: 2200, plus: 3500 },
  /**
   * Site Business pe abonament: plata de la început, rata lunară și răscumpărarea
   * (cât plătești pentru fiecare lună rămasă până la final, ca să păstrezi site-ul).
   */
  siteSubscription: { upfront: 300, monthly: 199, buyoutPerMonth: 100 },
  /** Domeniul, plătit de client: interval aproximativ, pe an */
  domainPerYear: { min: 50, max: 100 },
  /** Pachete lunare */
  bundle: { prezenta: 400, crestere: 1000, complet: 1700 },
  /** Servicii individuale, pe lună */
  maintenance: { basic: 100, plus: 200 },
  social: { posts4: 350, posts10: 750, posts15: 1000 },
  /** Clip video: unul singur și pachetul de 4 */
  video: { one: 200, four: 700 },
};

/** Termenele contractelor, folosite în pachete și în întrebările frecvente. */
export const terms = {
  /** Preavizul la renunțare, în zile */
  noticeDays: 30,
  /** Perioada minimă pentru social media și pachetele lunare, în luni */
  monthlyMinMonths: 3,
  /** Site Business pe abonament: perioada minimă și luna după care site-ul e al clientului */
  subscriptionMinMonths: 12,
  subscriptionOwnedAfterMonths: 24,
};

/** „3 luni”, „24 de luni”, „30 de zile”: în română, de la 20 în sus se pune „de”. */
export function count(n: number, one: string, many: string) {
  if (n === 1) return `1 ${one}`;
  const r = n % 100;
  return r === 0 || r >= 20 ? `${n} de ${many}` : `${n} ${many}`;
}

/** 1200 → „1.200” (punct la mii, ca în română) */
export function formatLei(amount: number) {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Un preț afișat: suma și, opțional, perioada („400 lei/lună”, „200 lei/clip”). */
export type Price = { amount: number; per?: "lună" | "clip" };

export type Plan = {
  /** Folosit în link (`?pachet=…`): litere mici, fără spații și fără diacritice. */
  id: string;
  name: string;
  /** Ce apare în mesajul completat automat în formular, după „Mă interesează:” */
  request: string;
  /** Textul butonului */
  cta: string;
  description?: string;
  /** Un singur preț… */
  price?: Price;
  /** …sau mai multe variante, afișate ca tabel (de ex. 4, 10 sau 15 postări). */
  tiers?: { label: string; price: Price }[];
  /** Plata de la început, afișată deasupra prețului lunar (site-ul pe abonament). */
  upfront?: { amount: number; label: string };
  features: string[];
  /** Pachetele lunare: cât ar costa serviciile incluse, luate separat (se calculează singur). */
  separate?: number;
  recommended?: boolean;
  footnote?: string;
};

export type PlanGroup = {
  id: string;
  /** Eticheta din comutator: scurtă, ca să încapă pe telefon */
  tab: string;
  title: string;
  subtitle?: string;
  plans: Plan[];
  /** Ce au în comun toate planurile din grupă */
  included?: { title: string; items: string[] };
  extraNote?: string;
  /** O variantă afișată sub planuri, pe toată lățimea */
  variant?: Plan & { label: string };
};

/** Pachet lunar din servicii individuale: lista „ce include” și prețul lor luate separat. */
function bundle(parts: { label: string; amount: number }[]) {
  return {
    features: parts.map((p) => p.label),
    separate: parts.reduce((sum, p) => sum + p.amount, 0),
  };
}

/** „Contract minim 3 luni.”: pe social media și pe pachetele lunare (din `terms`). */
const monthlyMinNote = `Contract minim ${count(terms.monthlyMinMonths, "lună", "luni")}.`;

export const pricing = {
  label: "Pachete",
  title: "Prețuri clare. Știi de la început în ce *investești*.",
  intro: "Un site cu plată unică, un pachet lunar sau doar serviciile de care ai nevoie.",
  recommendedLabel: "Recomandat",
  separateLabel: "Separat:",
  savingsLabel: "Economisești",
  groups: [
    {
      id: "site",
      tab: "Site-uri",
      title: "Site-uri de prezentare",
      subtitle: "Plată unică",
      plans: [
        {
          id: "site-start",
          name: "Start",
          request: "Site Start",
          cta: "Alege pachetul Start",
          price: { amount: prices.site.start },
          features: ["Site de o pagină", "Servicii, contact și hartă"],
        },
        {
          id: "site-business",
          name: "Business",
          request: "Site Business",
          cta: "Alege pachetul Business",
          recommended: true,
          price: { amount: prices.site.business },
          features: ["Site de 4–6 pagini", "Galerie", "SEO de bază", "Configurare profil Google Business"],
        },
        {
          id: "site-plus",
          name: "Plus",
          request: "Site Plus",
          cta: "Alege pachetul Plus",
          price: { amount: prices.site.plus },
          features: [
            "Site de până la 10 pagini",
            "Funcții extra, de exemplu programări online sau site în 2 limbi",
          ],
        },
      ],
      included: {
        title: "Inclus la toate site-urile",
        items: ["Adaptat pentru telefon", "2 runde de modificări", "Găzduire gratuită inclusă"],
      },
      extraNote: `Domeniul se înregistrează pe numele tău (aprox. ${formatLei(prices.domainPerYear.min)}–${formatLei(prices.domainPerYear.max)} lei/an, plătit de tine).`,
      variant: {
        id: "site-abonament",
        label: "Variantă",
        name: "Site Business pe abonament",
        request: "Site Business pe abonament",
        cta: "Alege varianta pe abonament",
        upfront: { amount: prices.siteSubscription.upfront, label: "la început +" },
        price: { amount: prices.siteSubscription.monthly, per: "lună" },
        features: [
          `Minimum ${count(terms.subscriptionMinMonths, "lună", "luni")}`,
          "Mentenanța Basic inclusă",
          `După ${count(terms.subscriptionOwnedAfterMonths, "lună", "luni")}, site-ul devine proprietatea ta`,
        ],
      },
    },
    {
      id: "lunar",
      tab: "Pachete lunare",
      title: "Pachete lunare",
      subtitle: "Servicii combinate",
      plans: [
        {
          id: "prezenta",
          name: "Prezență",
          request: "Pachetul lunar Prezență",
          cta: "Alege pachetul Prezență",
          price: { amount: prices.bundle.prezenta, per: "lună" },
          footnote: monthlyMinNote,
          ...bundle([
            { label: "Mentenanță Basic", amount: prices.maintenance.basic },
            { label: "4 postări pe lună", amount: prices.social.posts4 },
          ]),
        },
        {
          id: "crestere",
          name: "Creștere",
          request: "Pachetul lunar Creștere",
          cta: "Alege pachetul Creștere",
          recommended: true,
          price: { amount: prices.bundle.crestere, per: "lună" },
          footnote: monthlyMinNote,
          ...bundle([
            { label: "Mentenanță Plus", amount: prices.maintenance.plus },
            { label: "10 postări pe lună", amount: prices.social.posts10 },
            { label: "1 clip video pe lună", amount: prices.video.one },
          ]),
        },
        {
          id: "complet",
          name: "Complet",
          request: "Pachetul lunar Complet",
          cta: "Alege pachetul Complet",
          price: { amount: prices.bundle.complet, per: "lună" },
          footnote: monthlyMinNote,
          ...bundle([
            { label: "Mentenanță Plus", amount: prices.maintenance.plus },
            { label: "15 postări pe lună", amount: prices.social.posts15 },
            { label: "4 clipuri video pe lună", amount: prices.video.four },
          ]),
        },
      ],
    },
    {
      id: "servicii",
      tab: "Servicii",
      title: "Servicii individuale",
      plans: [
        {
          id: "mentenanta",
          name: "Mentenanță",
          request: "Mentenanță",
          cta: "Alege mentenanța",
          description: "Un site sigur și mereu la zi.",
          tiers: [
            { label: "Basic", price: { amount: prices.maintenance.basic, per: "lună" } },
            { label: "Plus", price: { amount: prices.maintenance.plus, per: "lună" } },
          ],
          features: [
            "Basic: găzduire, administrarea domeniului (reînnoire și setări), certificat SSL, monitorizare, backup, o modificare mică pe lună",
            "Plus: tot ce e în Basic + până la 2 ore de modificări pe lună + raport lunar",
          ],
        },
        {
          id: "social-media",
          name: "Social media",
          request: "Social media (Facebook + Instagram)",
          cta: "Alege social media",
          description: "Facebook + Instagram.",
          tiers: [
            { label: "4 postări", price: { amount: prices.social.posts4, per: "lună" } },
            { label: "10 postări", price: { amount: prices.social.posts10, per: "lună" } },
            { label: "15 postări", price: { amount: prices.social.posts15, per: "lună" } },
          ],
          features: ["Plan lunar", "Design și texte", "Programarea postărilor"],
          footnote: monthlyMinNote,
        },
        {
          id: "clip-video",
          name: "Clip video",
          request: "Clip video",
          cta: "Alege clipurile video",
          description: "Filmat la tine și montat.",
          tiers: [
            { label: "1 clip", price: { amount: prices.video.one, per: "clip" } },
            { label: "4 clipuri", price: { amount: prices.video.four } },
          ],
          features: [],
        },
      ],
    },
  ] as PlanGroup[],
  notes: ["Prețurile sunt finale, nu se adaugă TVA.", "Pentru proiecte mai mari, cere o ofertă personalizată."],
};

/** Toate planurile, inclusiv variantele: pentru formular și pentru datele structurate. */
export const pricingPlans: Plan[] = pricing.groups.flatMap((g) => (g.variant ? [...g.plans, g.variant] : g.plans));

/** Cel mai mic preț de pe site (pentru „de la … lei” din datele pentru Google). */
export const lowestPrice = Math.min(
  ...pricingPlans.flatMap((p) => [p.price?.amount, ...(p.tiers ?? []).map((t) => t.price.amount)]).filter(
    (n): n is number => typeof n === "number",
  ),
);

/* ───────────── Portofoliu ───────────── */

export const portfolio = {
  label: "Portofoliu",
  title: "Rezultate reale, prezentate *transparent*.",
  intro:
    "Aici vor apărea studii de caz reale. Fără cifre exagerate și fără recenzii inventate.",
  /**
   * Când ai primele studii de caz, adaugă-le aici. Cât timp lista e goală,
   * pe site apare blocul „Primele studii de caz apar în curând”.
   * Exemplu de element:
   * { business: "Cafeneaua X", city: "Galați", problem: "...", work: "...", result: "..." }
   */
  cases: [] as {
    business: string;
    city: string;
    problem: string;
    work: string;
    result: string;
  }[],
  comingSoon: {
    title: "Primele studii de caz apar *în curând*.",
    text: "Afacerea ta poate fi unul dintre primele studii de caz.",
    cta: "Programează o discuție",
  },
  template: {
    heading: "Studiu de caz 01",
    fields: ["Afacerea", "Provocarea", "Soluția", "Rezultatul"],
    placeholder: "în pregătire",
  },
  caseLabels: { problem: "Provocarea", work: "Soluția", result: "Rezultatul" },
};

/* ───────────── Despre mine ───────────── */

export const about = {
  label: "Despre mine",
  title: "Vorbești direct cu cel care lucrează la *proiectul tău*.",
  name: "Ioan Manolache",
  role: "Fondator Manotek",
  /**
   * Fotografia ta, din folderul `public/`. Pentru altă fotografie, pune fișierul
   * în `public/` și scrie aici calea (de ex. "/poza-noua.jpg").
   * Recomandat: pe verticală (4:5), cel puțin 1000 × 1250 px.
   */
  photo: "/ioan-manolache.webp",
  photoAlt: "Portretul lui Ioan Manolache, fondatorul Manotek",
  photoPlaceholder: "Aici vine fotografia ta",
  paragraphs: [
    "Sunt Ioan Manolache. Mă pasionează un lucru simplu: de ce alege un client o cafenea și nu alta.",
    "Combin designul UX, filmarea și psihologia cumpărătorului. Fără intermediari: vorbești direct cu mine.",
  ],
  facts: [
    {
      label: "Studii",
      value: "Automatică și Informatică Aplicată, Universitatea „Dunărea de Jos” din Galați",
    },
    { label: "Experiență", value: "Design UX, filmare și editare video" },
    { label: "Pasiune", value: "Psihologia cumpărătorului" },
  ],
};

/* ───────────── Întrebări frecvente ───────────── */

// Folosite în răspunsurile despre renunțare și proprietate; valorile vin din `terms` și `prices`.
const notice = count(terms.noticeDays, "zi", "zile");
const buyout = `${formatLei(prices.siteSubscription.buyoutPerMonth)} lei`;

export const faq = {
  label: "Întrebări",
  title: "Răspunsuri clare, înainte de orice *angajament*.",
  intro: "Ai altă întrebare?",
  cta: "Scrie-mi",
  items: [
    {
      q: "Ce primesc la auditul gratuit?",
      a: "O discuție de 30 de minute și o listă scrisă cu ce poți îmbunătăți. Lista rămâne a ta, oricum ai decide.",
    },
    {
      q: "Cât durează realizarea?",
      a: "Un site cu profil Google e gata, de obicei, în una-două săptămâni. Termenul exact îl afli din ofertă.",
    },
    {
      q: "Cât de mult trebuie să mă implic?",
      a: "Foarte puțin: o discuție la început și aprobarea ta înainte de publicare.",
    },
    {
      q: "Ce se întâmplă dacă vreau să renunț?",
      a: [
        `Mentenanța o poți opri oricând, cu ${notice} preaviz.`,
        `Social media și pachetele lunare au o perioadă minimă de ${count(terms.monthlyMinMonths, "lună", "luni")}. După aceea le poți opri oricând, cu ${notice} preaviz.`,
        `Site-ul pe abonament are o perioadă minimă de ${count(terms.subscriptionMinMonths, "lună", "luni")}, iar după ${count(terms.subscriptionOwnedAfterMonths, "lună", "luni")} e al tău. Între lunile ${terms.subscriptionMinMonths} și ${terms.subscriptionOwnedAfterMonths} poți renunța cu ${notice} preaviz. Dacă vrei să păstrezi site-ul, plătești o singură dată ${buyout} pentru fiecare lună rămasă până la luna ${terms.subscriptionOwnedAfterMonths} și site-ul devine al tău. Dacă nu, site-ul se oprește, iar domeniul și conținutul lui (texte, poze) rămân ale tale.`,
        "Dacă renunți înainte de finalul perioadei minime, plătești lunile rămase din ea.",
      ],
    },
    {
      q: "Lucrezi doar în anumite orașe?",
      a: "Nu. Lucrez cu afaceri din toată România, mai ales online. Pentru filmări vin la tine.",
    },
    {
      q: "Cui îi aparțin site-ul și conturile?",
      a: [
        "Domeniul și conturile (Google, Facebook, Instagram) sunt pe numele tău de la început, iar accesul meu îl poți retrage oricând.",
        `Site-ul plătit integral e al tău de la livrare. Site-ul pe abonament devine al tău după ${count(terms.subscriptionOwnedAfterMonths, "lună", "luni")} sau mai devreme, prin răscumpărare: între lunile ${terms.subscriptionMinMonths} și ${terms.subscriptionOwnedAfterMonths} plătești o singură dată ${buyout} pentru fiecare lună rămasă până la luna ${terms.subscriptionOwnedAfterMonths}.`,
      ],
    },
    {
      q: "Am deja site și pagini. Putem porni de la ele?",
      a: "Da. Păstrăm ce funcționează și îmbunătățim restul.",
    },
  ],
};

/* ───────────── Final și contact ───────────── */

export const contact = {
  label: "Contact",
  title: "Hai să-ți aducem *clienți*.",
  intro:
    "Spune-mi câteva lucruri despre afacerea ta. Îți răspund în cel mult o zi lucrătoare.",
  whatsappLabel: "Scrie-mi pe WhatsApp",
  emailLabel: "Trimite un email",
  form: {
    name: "Numele tău",
    business: "Afacerea ta",
    reach: "Telefon sau email",
    message: "Ce ai vrea să îmbunătățim?",
    optional: "opțional",
    submit: "Trimite cererea de audit",
    sending: "Se deschide aplicația de email…",
    privacy: "Folosesc datele tale doar pentru a-ți răspunde. Detalii în",
    privacyLink: "Politica de confidențialitate",
    success:
      "Aplicația ta de email s-a deschis cu mesajul completat. Apasă „Trimite”. Dacă nu s-a deschis, scrie-mi la",
    successFormspree: "Mulțumesc! Îți răspund în curând.",
    required: "Completează acest câmp.",
    emailSubject: "Cerere audit gratuit",
    planMessage: "Mă interesează: {plan}.",
  },
};

/* ───────────── Pagina „Audit gratuit” (/audit-gratuit) ───────────── */

export const auditPage = {
  label: "Audit gratuit",
  title: "Un audit gratuit, pentru a ști exact ce *merită îmbunătățit*.",
  /** Rând cu rând, în trepte (rândurile cresc de sus în jos); pe mobil textul curge normal. */
  intro: ["30 de minute de discuție", "și o listă scrisă cu ce poți îmbunătăți."],
  seoDescription:
    "Cere un audit gratuit al prezenței online a afacerii tale: o discuție de 30 de minute și o listă scrisă cu măsuri concrete pentru a atrage mai mulți clienți.",
  includesTitle: "Ce primești",
  includes: [
    "Analiza prezenței tale online",
    "O discuție de 30 de minute",
    "O listă scrisă cu priorități clare",
    "Fără costuri și fără obligații",
  ],
  stepsTitle: "Cum decurge",
  steps: [
    { title: "Completezi formularul", text: "Câteva rânduri despre afacerea ta." },
    {
      title: "Stabilim discuția",
      text: "Îți răspund în cel mult o zi lucrătoare.",
    },
    {
      title: "Primești lista în scris",
      text: "Lista rămâne a ta, oricum ai decide.",
    },
  ],
  formTitle: "Cere auditul",
  formIntro: "Completează formularul sau scrie-mi pe WhatsApp.",
  otherTitle: "Preferi alt canal?",
  faqTitle: "Întrebări despre *audit*.",
  /** Întrebările din `faq` afișate pe pagina de audit (numărate de la 0). */
  faqItems: [0, 2, 6],
  related: [
    { label: "Vezi pachetele", href: "/#pachete" },
    { label: "Află cum lucrez", href: "/#metoda" },
  ],
};

/* ───────────── Footer ───────────── */

export const footer = {
  text: "Mai mulți clienți pentru afacerile locale din România.",
  siteTitle: "Pe site",
  contactTitle: "Contact",
  companyTitle: "Date firmă",
  privacyLabel: "Politica de confidențialitate",
  rights: "Toate drepturile rezervate.",
  backToTop: "Înapoi sus",
  auditLink: "Audit gratuit",
};

/* ───────────── Pagina 404 ───────────── */

export const notFound = {
  title: "Pagina aceasta nu *există*.",
  text: "Poate a fost mutată sau adresa are o greșeală.",
  cta: "Înapoi la pagina principală",
};

/* ───────────── Politica de confidențialitate ───────────── */

export const privacy = {
  label: "Date personale",
  title: "Politica de *confidențialitate*.",
  updated: "23 noiembrie 2026",
  intro:
    "Pe scurt: folosesc datele tale doar pentru a-ți răspunde și pentru a discuta despre afacerea ta. Nu le vând, nu le transmit nimănui în scop de marketing și nu te abonez la nicio listă.",
  sections: [
    {
      title: "Cine prelucrează datele tale",
      body: [
        "Operatorul datelor este {legalName}, CUI {cui}, {registry}, cu sediul în {address}, care activează sub numele Manotek.",
        "Pentru orice întrebare despre datele tale, scrie la {email}.",
      ],
    },
    {
      title: "Ce date colectez",
      body: [
        "Prin formularul de contact: numele, numele afacerii, telefonul sau adresa de email și mesajul pe care îl scrii.",
        "Formularul nu trimite datele pe un server. El deschide aplicația ta de email, cu mesajul precompletat. Datele ajung la mine doar dacă alegi să trimiți emailul.",
        "Dacă îmi scrii pe WhatsApp, primesc numărul și numele tău de profil, conform regulilor WhatsApp.",
      ],
    },
    {
      title: "Scopul prelucrării",
      body: [
        "Pentru a-ți răspunde, pentru a programa auditul gratuit și, la cererea ta, pentru a-ți trimite o ofertă. Temeiul legal este demersul făcut la cererea ta înainte de un eventual contract (art. 6 alin. (1) lit. (b) din GDPR) și interesul legitim de a răspunde mesajelor primite (art. 6 alin. (1) lit. (f)).",
      ],
    },
    {
      title: "Cât timp le păstrez",
      body: [
        "Dacă nu ajungem să colaborăm, șterg conversația în cel mult 12 luni. Dacă devii client, păstrez datele pe durata colaborării și apoi atât cât prevede legea pentru documentele contabile.",
      ],
    },
    {
      title: "Cui pot fi transmise",
      body: [
        "Doar furnizorilor tehnici necesari: furnizorul de email, WhatsApp (dacă îmi scrii acolo) și compania care găzduiește site-ul, care poate păstra temporar jurnale tehnice (de exemplu, adresa IP) din motive de securitate.",
      ],
    },
    {
      title: "Cookie-uri",
      body: [
        "Site-ul nu folosește cookie-uri de analiză sau de publicitate și nu îți urmărește activitatea. Fonturile sunt încărcate direct de pe site, nu de la terți.",
      ],
    },
    {
      title: "Drepturile tale",
      body: [
        "Ai dreptul să afli ce date am despre tine, să le corectezi, să ceri ștergerea lor, să restricționezi sau să te opui prelucrării lor și să le primești într-un format portabil. Scrie-mi la {email} și îți răspund în cel mult 30 de zile.",
        "Dacă nu ești mulțumit de răspuns, poți depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), www.dataprotection.ro.",
      ],
    },
  ],
  back: "Înapoi la pagina principală",
};

/* ───────────── Ajutoare (nu e nevoie să le modifici) ───────────── */

export function whatsappHref(message = site.whatsappMessage) {
  const text = encodeURIComponent(message);
  return site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

export function fillCompany(text: string) {
  return text
    .replaceAll("{legalName}", site.company.legalName)
    .replaceAll("{cui}", site.company.cui)
    .replaceAll("{registry}", site.company.registry)
    .replaceAll("{address}", site.company.address)
    .replaceAll("{email}", site.email);
}

/** Textul fără steluțe, pentru metadate și cititoare de ecran. */
export function plain(text: string) {
  return text.replaceAll("*", "");
}

/* ───────────── Tipografie (automat, nu e nevoie să modifici) ─────────────
 * - Cratimele din cuvinte („ce-ți”, „site-ul”, „s-a”) nu se rup la capăt de rând.
 * - Cuvintele de una-două litere („le”, „o”, „în”, „cu”, „de”…) și numerele nu rămân
 *   singure la capăt de rând: se leagă de cuvântul următor („le aleg”, „15 minute”).
 * Adresele, linkurile și căile de fișiere rămân neatinse.
 */
const SKIP = new Set(["href", "url", "email", "whatsapp", "phone", "photo", "id", "art"]);
const NO_BREAK_HYPHEN = "‑";
const NO_BREAK_SPACE = " ";
const keepTogether = (s: string) =>
  s
    .replace(/(?<=\p{L})-(?=\p{L})/gu, NO_BREAK_HYPHEN)
    .replace(/(?<=^|[\s(„])(\p{L}{1,2}) (?=[\p{L}\d„*])/gu, `$1${NO_BREAK_SPACE}`)
    // numerele rămân lângă cuvântul următor: „15 minute”, „4 postări”, „1–3 pagini”
    .replace(/(?<=^|[\s(„])(\d+(?:[.,–-]\d+)*) (?=\p{L})/gu, `$1${NO_BREAK_SPACE}`);

function typeset(node: unknown): void {
  if (Array.isArray(node)) {
    node.forEach((v, i) => {
      if (typeof v === "string") node[i] = keepTogether(v);
      else typeset(v);
    });
    return;
  }
  if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    for (const [k, v] of Object.entries(obj)) {
      if (SKIP.has(k)) continue;
      if (typeof v === "string") obj[k] = keepTogether(v);
      else typeset(v);
    }
  }
}

for (const block of [nav, header, hero, manifest, problems, services, method, steps, pricing, portfolio, about, faq, contact, auditPage, footer, notFound, privacy]) {
  typeset(block);
}
