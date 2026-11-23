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
  scroll: "Derulează",
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
      art: "ads" as ServiceArt,
      title: "Reclame plătite",
      benefit: "Ajungi la oamenii din zona ta care pot deveni clienți.",
      text: "Campanii pe Facebook, Instagram și Google, gestionate de mine.",
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

/* ───────────── Pachete ───────────── */

export type Plan = {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  recommended?: boolean;
  footnote?: string;
};

export const pricing = {
  label: "Pachete",
  title: "Prețuri clare. Știi de la început în ce *investești*.",
  intro:
    "O plată unică la început sau un abonament lunar, fără efort din partea ta.",
  recommendedLabel: "Recomandat",
  fromLabel: "de la",
  planCta: "Alege pachetul",
  groups: [
    {
      id: "setup",
      tab: "O singură plată",
      plans: [
        {
          name: "Start",
          price: "900",
          unit: "lei",
          description: "Pentru afacerile care pornesc de la zero.",
          features: [
            "Profil Google Business creat sau optimizat",
            "Site de prezentare de 1–3 pagini, rapid pe telefon",
            "10–15 fotografii profesionale",
          ],
        },
        {
          name: "Vizibil",
          price: "1.500",
          unit: "lei",
          recommended: true,
          description: "Pentru a fi ales în fața concurenței.",
          features: [
            "Tot ce include Start",
            "Site de 4–6 pagini, cu formular de ofertă",
            "Clip de prezentare, filmat și editat",
            "Pagini de Facebook și Instagram",
          ],
        },
        {
          name: "Complet",
          price: "3.000",
          unit: "lei",
          description: "Pentru proiecte mari, cu ofertă personalizată.",
          features: [
            "Magazin online",
            "Aplicație sau sistem intern",
            "Totul pe măsura afacerii tale",
          ],
          footnote: "Prețul depinde de proiect.",
        },
      ] as Plan[],
    },
    {
      id: "lunar",
      tab: "Abonament lunar",
      plans: [
        {
          name: "Mentenanță",
          price: "100",
          unit: "lei / lună",
          description: "Un site sigur și mereu la zi.",
          features: [
            "Actualizări și securitate",
            "Copii de siguranță",
            "Monitorizare zilnică",
            "Modificări mici de conținut",
          ],
        },
        {
          name: "Prezență",
          price: "400",
          unit: "lei / lună",
          recommended: true,
          description: "Prezență online activă, fără efort.",
          features: [
            "Tot ce include Mentenanță",
            "4 postări sau clipuri pe lună",
            "Răspunsuri la recenziile de pe Google",
          ],
        },
        {
          name: "Creștere",
          price: "800",
          unit: "lei / lună",
          description: "Clienți noi, în mod constant.",
          features: [
            "Tot ce include Prezență",
            "8 postări sau clipuri pe lună",
            "O campanie nouă în fiecare lună",
            "Administrarea reclamelor plătite",
            "Raport lunar, pe înțelesul tău",
          ],
          footnote: "Bugetul de reclamă se plătește separat.",
        },
      ] as Plan[],
    },
  ],
  note: "Prețurile finale se stabilesc după auditul gratuit.",
};

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
      q: "Cine plătește reclamele?",
      a: "Tu, direct la Meta sau Google. Tu stabilești bugetul și îl poți opri oricând.",
    },
    {
      q: "Ce se întâmplă dacă vreau să renunț?",
      a: "Mă anunți cu 30 de zile înainte. Tot ce am realizat rămâne al tău.",
    },
    {
      q: "Lucrezi doar în anumite orașe?",
      a: "Nu. Lucrez cu afaceri din toată România, mai ales online. Pentru filmări vin la tine.",
    },
    {
      q: "Cui îi aparțin site-ul și conturile?",
      a: "Ție. Totul e pe numele tău, iar accesul meu îl poți retrage oricând.",
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
    planMessage: "Mă interesează pachetul {plan}.",
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
  faqItems: [0, 2, 7],
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
