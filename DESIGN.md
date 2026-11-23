# Manotek v2: direcția de design

Documentul de referință pentru tot ce se vede pe site. Orice componentă nouă respectă regulile de aici.

---

## 1. Direcția vizuală

**„Hârtie caldă, tipografie de revistă.”**

Site-ul arată ca un material tipărit îngrijit, nu ca o aplicație. Referințe de ton: paginile de produs Apple (o idee pe ecran, multă liniște în jur), revistele editoriale (titluri mari cu serife, linii fine, numerotare discretă) și brandurile care vând o senzație, nu o listă de funcții.

Principii:

1. **O idee pe ecran.** Fiecare secțiune are un singur moment principal: un titlu mare, o diagramă sau o listă.
2. **Tipografia face designul.** Nu folosesc fotografii de stoc, iconițe generice sau carduri cu umbre. Ierarhia vine din scală, greutate și italic.
3. **Auriul e rar.** Apare doar unde contează: butonul principal, cuvintele-cheie în italic, liniile active.
4. **Fiecare secțiune are compoziția ei.** Nu repet „titlu centrat + subtitlu + grilă”.
5. **Mișcarea explică.** Animațiile arată o idee (bucla obiceiului, pașii, progresul), nu decorează. Fiecare tip de animație are rolul lui.

---

## 2. Paleta

| Rol | Token | Hex | Folosire |
| --- | --- | --- | --- |
| Fundal | `paper` | `#FAF8F4` | Fundalul principal |
| Suprafață | `sand` | `#F1EDE6` | Secțiunile Servicii și Pachete, placeholder-ul foto |
| Text | `ink` | `#141414` | Text principal; fundalul capitolelor închise |
| Text secundar | `stone` | `#6B6760` | Paragrafe secundare, etichete |
| Linii | `rule` | `#E3DED5` | Separatoare fine, chenare |
| Accent | `ochre` | `#A8781F` | Buton principal, cuvinte în italic, linii active |

Capitolele închise (Manifestul, Finalul și Footer-ul) folosesc `ink` ca fundal, `paper` pentru text și `paper` la 62% opacitate pentru textul secundar.

### Contrast, verificat (WCAG 2.2)

| Combinație | Raport | Regulă |
| --- | --- | --- |
| ink pe paper | 17,4 : 1 | orice text |
| ink pe sand | 15,8 : 1 | orice text |
| stone pe paper | 5,3 : 1 | text normal (AA) |
| stone pe sand | 4,8 : 1 | text normal (AA) |
| ochre pe paper | 3,1 : 1 | **doar text mare (≥ 24px) sau elemente grafice** |
| ochre pe sand | 2,8 : 1 | **doar decorativ, fără text** |
| ink pe ochre | 5,6 : 1 | eticheta butonului principal |
| ochre pe ink | 5,6 : 1 | text în capitolele închise |
| paper 62% pe ink | ≈ 7 : 1 | text secundar pe fundal închis |

**Regulă fermă:** nu folosesc auriu pentru text mic pe fundal deschis.

### Textură

Un strat de grain foarte fin (zgomot SVG, opacitate ~5%), fix peste toată pagina, cu `pointer-events: none`. Dă senzația de hârtie fără să se observe ca efect.

---

## 3. Tipografie

- **Titluri:** Fraunces (axa optică `opsz`, greutăți 300–600, normal și italic), subseturile `latin` și `latin-ext`.
- **Text:** Inter (400–600), subseturile `latin` și `latin-ext`.
- Italicul Fraunces marchează cuvintele-cheie, în `ochre` doar când textul e mare.
- Axa `opsz` e obligatorie: fără ea, Google servește varianta „de text” a lui Fraunces, mult mai groasă, și titlurile își pierd contrastul editorial (verificat vizual).
- Fonturile **nu sunt preîncărcate** (`preload: false`). Textul apare imediat cu fontul de rezervă, cu dimensiuni ajustate automat de next/font, deci fără layout shift. Fraunces se încarcă în timp ce rândurile titlului urcă din mască. Cu preîncărcare, LCP-ul pe mobil era 3–5s; fără ea, e 1,4s.
- Cratimele din cuvinte („ce-ți”, „site-ul”) devin automat cratime neîntreruptibile (U+2011, prezente în ambele fonturi), ca să nu se rupă la capăt de rând.
- Cuvintele de una-două litere („le”, „o”, „în”, „cu”, „de”, „pe”, „și”) se leagă automat de cuvântul următor prin spațiu neîntreruptibil, ca să nu rămână singure la capăt de rând („le aleg”, „de o singură”). La fel numerele cu unitatea lor („15 minute”, „4 postări”, „1–3 pagini”). Titlurile animate păstrează legătura: grupul se mișcă împreună.

| Nivel | Font | Mărime (clamp) | Înălțime rând | Spațiere litere |
| --- | --- | --- | --- | --- |
| Display XXL (hero, final) | Fraunces 300 | `clamp(3rem, 1rem + 8.6vw, 8.75rem)` | 0,94 | −0,035em |
| Display XL (titluri de secțiune mari) | Fraunces 300 | `clamp(2.5rem, 1.2rem + 4.6vw, 6rem)` | 1,0 | −0,03em |
| Display L (titluri de secțiune, rânduri editoriale) | Fraunces 300 | `clamp(2.1rem, 1.3rem + 2.8vw, 4.25rem)` | 1,04 | −0,025em |
| Title M (titluri de element) | Fraunces 400 | `clamp(1.5rem, 1.2rem + 1vw, 2.25rem)` | 1,15 | −0,015em |
| Lead | Inter 400 | `clamp(1.125rem, 1rem + .4vw, 1.375rem)` | 1,5 | −0,01em |
| Body | Inter 400 | 1,0625rem (17px) | 1,65 | 0 |
| Small | Inter 500 | 0,875rem | 1,5 | 0 |
| Label | Inter 500, majuscule | 0,75rem | 1,4 | +0,14em |

Textul de corp are minimum 17px, pentru un public de 35–60 de ani. Paragrafele au maximum 60 de caractere pe rând (`max-w-[34rem]`).

---

## 4. Grid și spațiere

- **Grid:** 12 coloane pe desktop, 6 pe tabletă, 4 pe mobil. Spațiul dintre coloane e de 24px (desktop) sau 16px (mobil).
- **Margini laterale:** `clamp(1.25rem, 4.5vw, 4.5rem)`. Lățimea maximă a conținutului e de 1600px.
- **Aliniere:** predominant la stânga. Asimetria vine din decalaje (titlul pe coloanele 1–9, textul pe 7–12 etc.).
- **Aliniere optică:** literele rotunde sau cu serife din Fraunces („O”, „C”, „H”) încep, la mărimi mari, cu 2–5px mai la dreapta decât marginea casetei. Textul așezat direct sub un astfel de titlu se mută spre dreapta cu `calc(var(--text-d…) * 0,02–0,04)`, ca cele două margini să cadă pe aceeași verticală. Aplicat la manifest, metoda și final; măsurat pixel cu pixel, cu o abatere de ±0,5px.
- **Unitatea de bază:** 8px.
- **Ritm vertical variat:** secțiunile au padding diferit, nu identic.
  - mare: `clamp(7rem, 4rem + 10vw, 15rem)`
  - mediu: `clamp(5.5rem, 3rem + 7vw, 11rem)`
  - mic: `clamp(4rem, 2.5rem + 5vw, 8rem)`
- **Colțuri:** 0 pe suprafețe, imagini și liste. Singurele forme rotunjite sunt butoanele (pastilă) și punctele din diagrame.
- **Umbre:** niciuna. Separarea se face prin linii de 1px (`rule`) și prin fundal.
- **Linii:** 1px `rule` ca separator. 1px `ink` pentru câmpuri și chenare active. 2px `ochre` doar pentru elementul recomandat sau activ.

---

## 5. Componente de bază

- **Wordmark:** „Mano*tek*” în Fraunces 400, cu „tek” în italic.
- **Buton principal:** pastilă `ochre` cu text `ink`. La hover, un strat `ink` urcă de jos, iar textul alunecă în sus și e înlocuit de o copie `paper`. Are efect magnetic subtil pe desktop.
- **Buton secundar:** pastilă cu chenar `ink` de 1px. Are același hover: umplere `ink` și text `paper`.
- **Link:** subliniere care se desenează de la stânga la dreapta (`scaleX`). În paragrafe, linkurile au și o linie statică, ca să nu depindă doar de culoare.
- **Header:**
  - wordmark în stânga;
  - în dreapta, „Audit gratuit” (buton mic cu chenar) și „Meniu” (text plus două linii care se transformă).
  - Se ascunde la scroll în jos și reapare la scroll în sus. Are fundal `paper` 80% cu blur după primii 40px.
- **Meniul (overlay):**
  - pe tot ecranul, fundal `paper`;
  - linkuri Fraunces mari (`Display L`), numerotate 01–07 în `stone`, care apar decalat;
  - coloana laterală are email, WhatsApp și tagline;
  - se închide cu Escape, cu click pe un link sau cu „Închide”;
  - focusul e capturat în overlay, iar scroll-ul paginii e oprit.
- **Focus:** contur `ink` de 2px, la 3px distanță. Pe fundal închis, conturul e `paper`.
- **Cursor:**
  - doar pe desktop (`hover: hover` și `pointer: fine`);
  - un punct de 8px care devine un cerc de 56px peste elementele interactive și dispare peste câmpurile de text;
  - pe secțiunile închise își inversează culoarea.
- **WhatsApp plutitor:**
  - doar pe mobil;
  - cerc de 48px `paper`, chenar `rule` și simbol `ink`;
  - apare după hero și dispare în secțiunea de contact.

---

## 6. Compoziția secțiunilor

| # | Secțiune | Fundal | Compoziție |
| --- | --- | --- | --- |
| 1 | **Hero** | paper | Titlu pe două rânduri, „Mai mulți *clienți* / pentru afacerea ta.”, aliniat la stânga, cu „clienți” în italic `ochre`. Sub el, pe coloanele 1–5: subtitlul și butoanele. În dreapta, pe coloanele 7–12: bucla, mare (~86% din coloană, maximum 36rem) și centrată vertical față de titlu și butoane. Nodurile ei sunt sus („Indiciu”) și jos, ca etichetele să nu atingă titlul; pe mobil apar doar numerele. Liniile se desenează, iar un punct auriu orbitează lent. Pe desktop, blocul principal e centrat vertical în ecran. Subtitlul are `text-balance` (rânduri egale). Jos: indexul „Lucrez cu” (Restaurante · Cafenele · … · Depozite de materiale, separate de puncte aurii) și indicatorul de scroll. |
| 2 | **Manifest** | ink | Secțiune lipicioasă (`sticky`) de 240vh. Fraza Display XL, pe coloanele 1–10, se luminează cuvânt cu cuvânt la scroll (opacitate de la 0,35 la 1; minimul de 0,35 păstrează contrastul de 3:1). „simt” trece din crem în `ochre` prin două straturi suprapuse. Dedesubt, o frază în paper 62%, lată (coloanele 3–10), pe două rânduri. |
| 3 | **Problema** | paper | În stânga, pe coloanele 1–3, eticheta „Problema”. Titlul Display L pe coloanele 4–12. Urmează trei rânduri editoriale separate de linii care se desenează. Fiecare rând are numărul (Fraunces italic) pe coloana 1, afirmația Display L pe coloanele 2–8 și explicația pe 9–12. Încheie o frază cu link. |
| 4 | **Servicii** | sand | **Desktop:** secțiune lipicioasă cu scroll orizontal. Primul panou are titlul. Urmează șase panouri de 52vw, separate de linii verticale. Fiecare panou are, de sus în jos: indexul „01 / 06”, ilustrația SVG (pătrat de 34vh, aliniată la stânga cu textul), titlul Display L, beneficiul (Lead, ink) și descrierea (stone). Cu mișcare redusă, panourile devin o listă verticală, cu linii între ele. Jos, o bară de progres de 1px. **Mobil și tabletă:** titlul, apoi o listă accordion cu linii fine. |
| 5 | **Metoda** | paper | Titlul Display XL pe coloanele 3–11, introducerea dedesubt, aliniată cu titlul (coloanele 3–10). **Desktop:** în stânga, diagrama buclei, lipicioasă (coloanele 1–6). În dreapta, cele trei etape (coloanele 8–12), fiecare înaltă cât ~70% din ecran. Etapa din mijlocul ecranului (sau cea de sub cursor) activează nodul și arcul în diagramă. În centrul diagramei apare exemplul etapei active, în Fraunces italic. **Mobil și tabletă:** diagrama sus, apoi etapele. Lângă noduri apar doar numerele, iar în centru apar numele etapei active și exemplul ei. Etapele se activează la atingere sau automat, una după alta, cât diagrama e vizibilă. Apoi „Cinci principii, folosite cinstit”: rânduri pe două coloane, cu numele și numărul în stânga (1–5), explicația și exemplul în dreapta (7–12). La final, avertismentul, în italic. |
| 6 | **Procesul** | paper | În stânga, titlul lipicios (coloanele 1–5). În dreapta (coloanele 7–12), o linie verticală care se desenează la scroll, cu patru noduri care se umplu cu `ochre` când linia ajunge la ele. Fiecare pas are numărul mare în Fraunces, titlul și textul. |
| 7 | **Pachete** | sand | Eticheta și titlul în stânga (coloanele 1–7). Introducerea și comutatorul „O singură plată / Abonament lunar” în dreapta (coloanele 9–12), aliniate cu baza titlului. Comutatorul e o pastilă cu un indicator `ink` care alunecă. Pe desktop, cele trei planuri stau pe coloane separate de linii verticale. Pe tabletă, fiecare plan e un rând pe două coloane: numele și prețul în stânga, ce include în dreapta. Planul recomandat are o linie `ochre` de 2px deasupra, eticheta „Recomandat” și numele în italic. Prețul e în Fraunces Display L. Cele două grupe stau suprapuse în aceeași celulă de grid (înălțime stabilă, fără salt). La final, nota despre prețuri. |
| 8 | **Portofoliu** | paper | Eticheta și titlul Display XL în stânga (coloanele 1–7), introducerea în dreapta (coloanele 9–12), aliniată jos. Urmează un chenar mare, cu linie fină: în stânga, „Primele proiecte vin în curând.” (Display L, cu italic); în dreapta, șablonul unui studiu de caz (Afacerea · Problema · Ce am făcut · Ce s-a schimbat) cu „în lucru” pe fiecare rând. Dedesubt, linkul „Hai să vorbim”. |
| 9 | **Despre mine** | paper | Fotografia (4:5) pe coloanele 1–5, coborâtă față de text, cu parallax subtil. Textul pe coloanele 7–12: titlul Display L, paragrafele, apoi o listă de date (Studii · Experiență · Pasiune) separate de linii. Fotografia reală e preluată din portofoliu (`public/ioan-manolache.webp`), dezvăluită de o cortină. Fără fotografie, apare un chenar `sand` cu inițialele în italic și textul „Aici vine fotografia ta”. |
| 10 | **Întrebări** | paper | Titlul lipicios în stânga (coloanele 1–4). În dreapta (coloanele 6–12), lista accordion: întrebările în Fraunces Title M, linii fine între ele, un „+” desenat din două linii care se rotește la 45°. |
| 11 | **Final** | ink | Titlul Display XXL „Hai să-ți aducem *clienți*.”, cu masca rândurilor. Pe coloanele 1–5: textul, WhatsApp și emailul (linkuri cu subliniere). Pe coloanele 7–12: formularul minimalist (câmpuri doar cu linie dedesubt, etichete care urcă la focus, linie `ochre` care se desenează la focus), butonul principal și, sub el, pe toată lățimea, nota de confidențialitate. |
| 12 | **Footer** | ink | Trei coloane de linkuri: Pe site · Contact · Date firmă. Urmează wordmark-ul „Mano*tek*” pe toată lățimea (~23vw), ale cărui litere urcă decalat. Jos: ©, „Manotek – PFA”, confidențialitate. |

**Pagina `/audit-gratuit`:** butoanele „Audit gratuit”, „Cere un audit gratuit”, „Alege pachetul X” (care completează mesajul cu pachetul ales) și „Programează o discuție” duc aici. Folosește același formular, aceleași date de contact și aceleași întrebări ca pagina principală.

- **Desktop:** titlul Display XL și introducerea pe coloanele 1–6. Formularul stă pe un panou `ink`, lipicios, pe coloanele 8–12. Sub titlu: „Ce primești” (listă cu linioare aurii) și „Cum decurge” (trei pași numerotați), apoi linkuri spre pachete și metodă și trei întrebări frecvente.
- **Mobil:** formularul vine imediat după introducere.

Ritmul fundalurilor: paper → **ink** → paper → sand → paper → paper → sand → paper → paper → paper → **ink** → **ink**. Primul și ultimul capitol închis încadrează pagina.

---

## 7. Animații

Easing comun: `cubic-bezier(0.22, 1, 0.36, 1)`. Durate între 0,6 și 1,2s. Animez **doar `transform` și `opacity`**, cu două excepții justificate:

- liniile SVG care se desenează (`stroke-dashoffset`, doar desen, fără layout);
- înălțimea panoului din accordion, care se schimbă doar la click și nu produce layout shift.

| Unde | Animație | Durată | Tehnică |
| --- | --- | --- | --- |
| Hero, titlu | Rânduri care urcă dintr-o mască, decalat cu 90ms | 1,1s | CSS, pornește fără JavaScript (bun pentru LCP) |
| Titlurile de la începutul paginilor (audit, confidențialitate, 404) | Cuvintele urcă din mască | 1,05s | CSS (`CssMaskText`), fără JavaScript |
| Hero, subtitlu și butoane | Opacitate și urcare de 12px, după titlu | 0,9s | CSS |
| Hero, buclă | Arcele se desenează pe rând, apoi un punct orbitează lent | 1,2s / 24s | CSS |
| Hero, indicator de scroll | Un segment coboară pe o linie, în buclă | 2,4s | CSS |
| Header | Se ascunde și apare (`translateY`) | 0,6s | Framer |
| Butonul „Meniu” | Cele două linii devin X | 0,6s | CSS |
| Meniul (overlay) | Panoul coboară; linkurile urcă din mască decalat cu 60ms; coloana laterală apare la final | 0,8 / 0,9s | Framer |
| Manifest | Cuvintele se luminează legat de scroll (0,35 → 1) | scrub | Framer `useScroll` |
| Titlurile de secțiune | Rândurile urcă din mască la intrarea în ecran | 1s | Framer |
| Problema | Liniile se desenează (`scaleX`), textul urcă decalat | 1,1s | Framer |
| Servicii, desktop | Panourile glisează orizontal legat de scroll; bara de progres crește | scrub | Framer |
| Servicii, ilustrații | Liniile se desenează când panoul intră în ecran | 1,2s | Framer `pathLength` |
| Metoda, diagrama | Nodul activ crește, arcul activ se desenează, exemplul din centru se schimbă cu fade | 0,6s | Framer |
| Metoda, principiile | Numele intră din stânga, linia se desenează | 0,9s | Framer |
| Procesul | Linia verticală crește la scroll; fiecare nod se umple exact când linia ajunge la el | scrub / 0,5s | Framer |
| Pachete | Indicatorul alunecă; planurile ies și intră cu fade și deplasare decalată | 0,7s | Framer |
| Despre | Fotografia are parallax de ±40px; o cortină `sand` urcă și o dezvăluie | scrub / 1,2s | Framer |
| Întrebări | „+” se rotește la 45°; panoul se deschide; textul apare cu fade | 0,6s | Framer |
| Formular | Eticheta urcă și se micșorează; linia aurie se desenează | 0,5s | CSS |
| Footer | Literele wordmark-ului urcă decalat | 1,2s | Framer |
| Butoane | Textul alunecă și e înlocuit de o copie; umplerea urcă; efect magnetic | 0,6s / spring | CSS și Framer |
| Linkuri | Sublinierea se desenează de la stânga, iar la ieșire dispare spre dreapta | 0,6s | CSS |
| Cursor | Punctul urmărește mouse-ul cu spring și se mărește peste elementele interactive | spring | Framer |

**Scroll lin:** Lenis, legat de bucla de cadre a Framer Motion (`frame.update`), ca animațiile legate de scroll să fie sincronizate. Funcționează cu `position: sticky`, pentru că Lenis folosește scroll-ul nativ.

### `prefers-reduced-motion: reduce`

Fără Lenis, fără cursor custom, fără efect magnetic, fără parallax și fără scroll orizontal (panourile de servicii devin o listă verticală). Tot conținutul apare static și complet:

- CSS forțează `opacity: 1` și `transform: none` pe orice element marcat cu `data-reveal` sau `data-scrub`;
- animațiile CSS sunt oprite.

Fără JavaScript, conținutul rămâne vizibil printr-un `<noscript>` care anulează stările inițiale.

---

## 8. Ton și texte

- Profesionist, cald și direct, cu adresare cu „tu”. Fără generalizări („lumea”) și fără expresii colocviale („n-ai”, „nu-i”, „pe ce dai banii”).
- Pentru scop se folosește infinitivul: „pentru a fi găsit”, „înainte de a începe”, nu „ca să fii găsit”, „înainte să începem”.
- Fără clișee de marketing și fără afirmații care nu pot fi dovedite.
- **Puțin text, ușor de scanat.** Patronul nu citește tot: o idee pe propoziție, paragrafe de cel mult două propoziții, răspunsuri și descrieri de una-două propoziții. Detaliile se discută la audit.
- **Text în trepte:** textele scurte (2–3 rânduri) își aleg rupturile astfel încât rândurile să crească de sus în jos (`StairText`). Numărul de rânduri randat de browser rămâne același, deci pagina nu sare. Textele vizibile imediat la încărcare nu folosesc `StairText`, ca să nu întârzie afișarea (LCP): subtitlul din hero are `text-balance` din CSS, iar introducerea de pe pagina de audit e scrisă rând cu rând în conținut (în trepte de la 360px în sus; sub 360px curge normal).

## 9. Iconițe și ilustrații

Toate sunt desenate de mână în SVG (`components/art/serviceArtData.ts`). Nu folosesc biblioteci de iconițe sau emoji. Iconițele de interfață sunt doar o săgeată, simbolul WhatsApp, un plic și un „+”.

**Ilustrațiile de servicii** sunt obiecte desenate în linie fină, nu iconițe de interfață:

| Serviciu | Obiect | Accentul `ochre` (povestea) |
| --- | --- | --- |
| Prezență online | vitrina unui magazin | pinul de pe hartă |
| Video și foto | aparat foto | inelul obiectivului |
| Campanii și oferte | ceașcă de cafea și card de fidelitate | a 10-a ștampilă |
| Reclame plătite | telefon cu o postare sponsorizată | prima undă: postarea ajunge departe |
| Sisteme la comandă | laptop cu nivelul stocului și un colet | bara de stoc scăzut |
| Mentenanță și monitorizare | fereastră de browser și scut | pulsul site-ului |

- **Pânza:** pătrată, 320 × 320. Cercul `paper` din spate o umple, deci marginea lui stângă e marginea ilustrației. Desenul stă centrat optic în cerc; `fit` (mutare și scară) egalează poziția și greutatea celor șase, iar umbra se mută odată cu obiectul.
- **Ierarhia liniilor:** contururi `ink` de 1,25px, detalii `stone` de 1px, un singur accent `ochre` de 1,5px (e mai deschis la culoare, deci puțin mai gros, ca să cântărească la fel). Grosimea e constantă la orice mărime (`vector-effect: non-scaling-stroke`).
- **Umbra:** o elipsă `rule` sub obiect, care îl așază pe suprafață. Fără umbre CSS.
- **Încadrarea pe desktop:** în fiecare panou totul pornește de sus, la distanțe fixe: numărul, desenul (pătrat de 34vh), titlul. Numărul, cercul și titlul stau la aceeași înălțime în toate panourile și pe aceeași verticală stângă; doar textul de sub titlu are lungimi diferite. Încape deasupra barei de progres de la 1024 × 768 la 1920 × 1080, verificat inclusiv la 1280 × 720.
- **Încadrarea pe mobil și tabletă:** pe mobil desenul (12rem) stă sub text, aliniat la stânga cu el; pe tabletă stă în dreapta, aliniat cu marginea listei.
- **Animație:** liniile se desenează printr-o mască (traseul animat e în mască, nu în linia vizibilă), ca grosimea să nu se schimbe. Desenul complet durează cel mult ~2,2s.

**Textul în trepte:** vezi §8. Se aplică textelor scurte de pe tot site-ul, inclusiv din panourile de servicii.

## 10. Ce evit (verificat la fiecare captură)

- Header „logo stânga, linkuri pe mijloc, buton dreapta”.
- Badge sau pastilă deasupra titlului din hero.
- Hero centrat, blob-uri, gradient colorat, text cu gradient.
- Grile de carduri identice cu iconițe în pătrate rotunjite.
- Secțiuni cu aceeași structură.
- Umbre mari, colțuri foarte rotunjite.
- Aceeași animație pe toate elementele.
- Clișee de text și afirmații nedemonstrabile.
