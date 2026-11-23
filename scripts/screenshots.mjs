/**
 * Capturi de ecran pentru verificarea vizuală, la 375, 768 și 1440 px.
 *
 *   npm run dev                       (într-un terminal)
 *   npm run screenshots               (în altul)
 *   npm run screenshots -- servicii   (doar anumite secțiuni)
 *
 * Capturile ajung în folderul `screenshots/` (ignorat de git).
 */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = process.env.OUT ?? "screenshots";
const WIDTHS = (process.env.WIDTHS ?? "375,768,1440").split(",").map(Number);
const HEIGHTS = { 375: 812, 768: 1024, 1024: 768, 1280: 800, 1440: 900, 1702: 910 };

// kind "element": toată secțiunea; kind "scrub": ecrane la mai multe puncte din secțiune (pentru sticky)
const SECTIONS = [
  { id: "top", kind: "viewport" },
  { id: "manifest", kind: "scrub", at: [0.05, 0.5, 0.95] },
  { id: "problema", kind: "element" },
  { id: "servicii", kind: "scrub", at: [0, 0.3, 0.7, 1], mobileKind: "element" },
  { id: "metoda", kind: "element" },
  { id: "proces", kind: "element" },
  { id: "pachete", kind: "element" },
  { id: "portofoliu", kind: "element" },
  { id: "despre", kind: "element" },
  { id: "intrebari", kind: "element" },
  { id: "contact", kind: "element" },
  { id: "footer", kind: "element", selector: "footer" },
  { id: "meniu", kind: "menu" },
  { id: "audit-gratuit", kind: "page", path: "/audit-gratuit" },
  { id: "confidentialitate", kind: "page", path: "/confidentialitate" },
  { id: "404", kind: "page", path: "/pagina-care-nu-exista" },
];

const only = process.argv.slice(2);
const list = only.length ? SECTIONS.filter((s) => only.includes(s.id)) : SECTIONS;

const wait = (p, ms) => p.waitForTimeout(ms);

async function scrollThrough(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = await page.evaluate(() => window.innerHeight);
  for (let y = 0; y < h; y += Math.round(vh * 0.5)) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await wait(page, 120);
  }
  await wait(page, 600);
}

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const errors = [];

for (const w of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: w, height: HEIGHTS[w] ?? 900 } });
  page.on("pageerror", (e) => errors.push(`${w} pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`${w} console: ${m.text()}`);
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.mouse.move(2, 2);
  await wait(page, 2600);

  let scrolled = false;
  for (const s of list) {
    const name = `${OUT}/${w}-${s.id}`;
    if (s.kind === "viewport") {
      await page.evaluate(() => window.scrollTo(0, 0));
      await wait(page, 400);
      await page.screenshot({ path: `${name}.png` });
      continue;
    }
    if (s.kind === "page") {
      const p2 = await browser.newPage({ viewport: { width: w, height: HEIGHTS[w] ?? 900 } });
      p2.on("pageerror", (e) => errors.push(`${w} ${s.path} pageerror: ${e.message}`));
      await p2.goto(BASE + s.path, { waitUntil: "networkidle" });
      await wait(p2, 1800);
      await p2.screenshot({ path: `${name}.png` });
      await scrollThrough(p2);
      await p2.addStyleTag({ content: "header{visibility:hidden!important}" });
      await p2.screenshot({ path: `${name}-full.png`, fullPage: true });
      await p2.close();
      continue;
    }
    if (s.kind === "menu") {
      await page.evaluate(() => window.scrollTo(0, 0));
      await wait(page, 500);
      await page.click("button[aria-controls='meniu']");
      await wait(page, 1800);
      await page.screenshot({ path: `${name}.png` });
      // starea de hover pe un link din meniu (literele de la final trebuie să rămână vizibile)
      await page.hover("#meniu nav li:nth-child(6) a");
      await wait(page, 900);
      await page.screenshot({ path: `${name}-hover.png` });
      await page.keyboard.press("Escape");
      await page.mouse.move(2, 2);
      await wait(page, 1200);
      continue;
    }
    if (!scrolled) {
      await scrollThrough(page);
      scrolled = true;
    }
    const kind = w < 1024 && s.mobileKind ? s.mobileKind : s.kind;
    const sel = s.selector ?? `#${s.id}`;
    if (kind === "scrub") {
      const box = await page.evaluate((q) => {
        const el = document.querySelector(q);
        const r = el.getBoundingClientRect();
        return { top: r.top + window.scrollY, height: r.height, vh: window.innerHeight };
      }, sel);
      let i = 0;
      for (const f of s.at) {
        const y = box.top + f * Math.max(0, box.height - box.vh);
        await page.evaluate((v) => window.scrollTo(0, v), y);
        await wait(page, 1300);
        await page.screenshot({ path: `${name}-${i++}.png` });
      }
    } else {
      await page.evaluate((q) => document.querySelector(q)?.scrollIntoView({ block: "start" }), sel);
      await wait(page, 1400);
      const style = await page.addStyleTag({ content: "header{visibility:hidden!important} .grain{display:none}" });
      await page.locator(sel).first().screenshot({ path: `${name}.png` });
      await style.evaluate((el) => el.remove());
    }
  }
  await page.close();
}

await browser.close();
console.log(errors.length ? errors.join("\n") : "Fără erori în consolă.");
