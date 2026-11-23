# Manotek v2

Site de prezentare pentru Manotek, cu tagline-ul „E mai ușor online”. E un site static: o pagină principală, pagina de confidențialitate și o pagină 404. Nu are backend și nici bază de date.

Direcția vizuală (paleta, tipografia, gridul, compoziția fiecărei secțiuni și lista animațiilor) e descrisă în [`DESIGN.md`](DESIGN.md).

Pentru dezvoltatori: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion și Lenis (scroll lin), cu export static în folderul `out/`.

---

## 1. Cum pornești site-ul local

Ai nevoie de Node.js 20 sau mai nou.

```bash
cd ~/Documents/manotek-v2
npm install      # doar prima dată
npm run dev      # pornește site-ul pe http://localhost:3000
```

Modificările apar imediat în browser. Ca să oprești serverul, apasă `Ctrl + C` în terminal.

Dacă `npm install` dă eroarea `EACCES`, folosește un cache temporar:

```bash
npm_config_cache=/tmp/npmcache npm install
```

Alte comenzi utile:

| Comandă | Ce face |
| --- | --- |
| `npm run build` | Construiește site-ul final în folderul `out/` |
| `npx serve out` | Deschide local versiunea construită, exact cum va fi online |
| `npm run lint` | Verifică codul |
| `npm run screenshots` | Face capturi de ecran la 375, 768 și 1440 px, în folderul `screenshots/` (cu `npm run dev` pornit) |

---

## 2. Cum editezi textele

**Tot conținutul e într-un singur fișier: [`content/site.ts`](content/site.ts).**

Fișierul e împărțit pe blocuri, în ordinea de pe pagină:

| Bloc | Ce conține |
| --- | --- |
| `site` | Email, WhatsApp, telefon, datele PFA-ului, titlul și descrierea pentru Google |
| `nav` | Linkurile din meniu (numerotate automat 01, 02…) |
| `hero` | Titlul mare (rând cu rând), subtitlul, butoanele, etichetele buclei |
| `manifest` | Fraza care se luminează la scroll |
| `problems` | Cele trei situații în care se recunoaște patronul |
| `services` | Cele șase servicii |
| `method` | Bucla obiceiului și cele cinci principii |
| `steps` | Procesul în patru pași |
| `pricing` | Pachetele: o singură plată și abonament lunar |
| `portfolio` | Studiile de caz (lista `cases`) |
| `about` | Despre tine și fotografia |
| `faq` | Întrebările frecvente |
| `contact` | Titlul final și textele formularului |
| `auditPage` | Pagina separată „Audit gratuit” (`/audit-gratuit`): titlul, ce primești, pașii, întrebările afișate |
| `privacy` | Politica de confidențialitate |

Reguli simple:

- Textul stă între ghilimele drepte: `"așa"`. În text folosește ghilimelele românești „ și ”.
- **Un cuvânt pus între steluțe, `*așa*`, apare în italic** (și auriu, în titlurile mari). De exemplu: `"Hai să-ți aducem *clienți*."`.
- Păstrează virgula de la finalul fiecărui rând.
- Folosește ș și ț cu virgulă dedesubt, nu ş și ţ cu sedilă. Tastatura „Romanian – Standard” de pe Mac le scrie corect.
- Cratimele din cuvinte („ce-ți”, „site-ul”) se transformă automat în cratime care nu se rup la capăt de rând. Scrie-le normal.
- Cuvintele scurte („le”, „o”, „în”, „cu”, „de”, „și”) și numerele („15 minute”, „4 postări”) nu rămân singure la capăt de rând: se leagă automat de cuvântul următor. Scrie textul normal, cu spații obișnuite.

**Exemple:**

- *Schimbi un preț:* în `pricing.groups`, la pachetul dorit, modifici `price: "1.500"`.
- *Schimbi ce include un pachet:* editezi lista `features` a pachetului.
- *Adaugi o întrebare frecventă:* în `faq.items`, copiezi un bloc `{ q: "...", a: "..." },` și îl modifici.
- *Pagina de audit:* butoanele „Audit gratuit”, „Cere un audit gratuit”, „Alege pachetul X” și „Programează o discuție” duc la `/audit-gratuit`. Când vii din „Alege pachetul X”, mesajul din formular e completat automat cu pachetul ales. Întrebările afișate acolo le alegi în `auditPage.faqItems` (numărul întrebării din `faq.items`, de la 0).
- *Adaugi un studiu de caz:* în `portfolio.cases`, adaugi un obiect ca în exemplul din comentariu. Cât timp lista e goală, pe site apare blocul „Primele proiecte vin în curând”.

---

## 3. Cum publici pe Vercel

### Varianta A: din GitHub (recomandată, se actualizează singur)

1. Urcă proiectul pe GitHub, într-un repository nou (poate fi privat).
2. Intră pe [vercel.com](https://vercel.com), apasă **Add New → Project** și alege repository-ul.
3. Vercel recunoaște singur Next.js. Nu schimba nimic la setări și apasă **Deploy**.
4. Apoi, la fiecare `git push`, site-ul se actualizează automat.

### Varianta B: din terminal

```bash
npm i -g vercel
vercel          # prima dată: răspunzi la câteva întrebări
vercel --prod   # publicarea finală
```

### Domeniul manotek.ro

În Vercel: **Project → Settings → Domains → Add** și scrii `manotek.ro`. Vercel îți spune ce înregistrări DNS să pui la firma de unde ai cumpărat domeniul. Dacă domeniul final e altul, schimbă-l și în `content/site.ts`, la `site.url`. Contează pentru Google, sitemap și previzualizările de pe Facebook și WhatsApp.

---

## 4. Ce trebuie să completezi tu

Toate sunt în [`content/site.ts`](content/site.ts), dacă nu e scris altfel.

### Obligatoriu înainte de lansare

- [ ] **Numărul de WhatsApp:** `site.whatsapp`, doar cifre, în format internațional, fără `+` (ex. `"40712345678"`). Cât timp e gol, butoanele WhatsApp deschid aplicația, dar vizitatorul trebuie să-și aleagă singur contactul.
- [ ] **Datele PFA-ului:** `site.company`: `legalName`, `cui`, `registry`, `address`. Apar în footer și în politica de confidențialitate.
- [ ] **Adresa contact@manotek.ro:** verifică dacă primește emailuri. Formularul trimite acolo.

**Fotografia** e deja pusă: e portretul din portofoliul tău, optimizat pentru web (`public/ioan-manolache.webp`, 1000 × 1250 px, 62 KB). Ca s-o schimbi, pune altă fotografie în `public/` (pe verticală, 4:5) și scrie calea ei în `about.photo`.

### Opțional

- [ ] **Telefon afișat:** `site.phone` (ex. `"0712 345 678"`). Dacă e gol, nu apare.
- [ ] **Formspree**, ca mesajele să ajungă direct la tine, fără să se deschidă aplicația de email a vizitatorului. Instrucțiunile sunt în comentariul de sus din [`components/sections/ContactForm.tsx`](components/sections/ContactForm.tsx): îți faci cont gratuit pe formspree.io și pui ID-ul formularului în `FORMSPREE_ID`. Adaugă apoi Formspree și în politica de confidențialitate.
- [ ] **Imaginea de previzualizare** (apare când trimiți linkul pe WhatsApp sau Facebook): [`app/opengraph-image.png`](app/opengraph-image.png), 1200 × 630 px. Favicon-ul e în [`app/icon.png`](app/icon.png) și [`app/apple-icon.png`](app/apple-icon.png). Le poți înlocui cu fișiere cu același nume.

### De confirmat: promisiuni scrise pe site în numele tău

Le-am formulat rezonabil, dar sunt angajamente pe care trebuie să le respecți. Schimbă-le dacă nu se potrivesc:

- [ ] „Îți răspund în cel mult o zi lucrătoare” (`contact.intro`).
- [ ] Abonamentele se opresc cu un preaviz de 30 de zile, iar site-ul, domeniul, conturile, pozele și clipurile rămân ale clientului (`faq`).
- [ ] Un site de prezentare cu profil Google e gata, de obicei, în una-două săptămâni (`faq`).
- [ ] Auditul durează în jur de 30 de minute, iar clientul primește lista în scris (`faq`).
- [ ] „Verificarea zilnică a site-ului” (`services`, Mentenanță și monitorizare).
- [ ] Datele conversațiilor se păstrează cel mult 12 luni dacă persoana nu devine client (`privacy`).

---

## Structura proiectului (pe scurt)

```
content/site.ts            ← TOT textul site-ului
DESIGN.md                  ← direcția vizuală și regulile de design
app/page.tsx               ← ordinea secțiunilor pe pagina principală
app/audit-gratuit/         ← pagina separată pentru cererea de audit
app/confidentialitate/     ← pagina GDPR
app/not-found.tsx          ← pagina 404
app/layout.tsx             ← fonturi, titlu, descriere, date pentru Google (schema.org)
app/globals.css            ← culori, scala tipografică, grain, animațiile din hero
components/sections/       ← fiecare secțiune a paginii
components/layout/         ← header, meniu, footer, butonul WhatsApp de pe mobil
components/ui/             ← butoane, linkuri, iconițe
components/art/            ← ilustrațiile SVG și diagrama buclei
components/motion/         ← animațiile reutilizabile
scripts/screenshots.mjs    ← capturile pentru verificarea vizuală
```

## Note tehnice

- Fonturile (Fraunces pentru titluri, Inter pentru text) se încarcă de pe site, cu subsetul `latin-ext`, ca să apară corect ă, â, î, ș, ț. Nu se trimite nimic către Google Fonts.
- Animațiile țin cont de setarea „reduce mișcarea” din telefon sau calculator. Cine o are activată vede site-ul static și complet: fără scroll lin, fără cursor personalizat, fără scroll orizontal la servicii.
- Fără JavaScript, tot conținutul rămâne vizibil.
- Sitemap-ul (`/sitemap.xml`) și `robots.txt` se generează automat din `site.url`.
- Site-ul nu folosește cookie-uri și nu are analytics. Dacă adaugi Google Analytics sau Meta Pixel, ai nevoie de un banner de cookie-uri și trebuie să actualizezi politica de confidențialitate.
