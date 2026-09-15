/*
  Controllo passivo del sito pubblicato con un browser vero (Playwright).

  Serve dove un client non browser viene fermato dal firewall di Vercel: legge
  robots.txt e sitemap.xml, gli header del documento (X-Robots-Tag), lo script
  track.js iniettato a runtime con il suo data-landing e la richiesta che parte
  verso tool.ptdja.com, la presenza dei tag di sito e l'assenza di quelli
  proibiti, e prova le sourcemap dei primi bundle. Poche richieste, solo GET.

  Uso (da scripts/):  node _controllo-online.mjs <url base>
*/
import { chromium } from "playwright";
import { existsSync, readFileSync } from "node:fs";

const FILE_URL = process.env.SITO_URL_FILE || "";
const BASE = (process.argv[2] || (FILE_URL && existsSync(FILE_URL) ? readFileSync(FILE_URL, "utf8").trim() : "")).replace(/\/$/, "");
if (!BASE) { console.error("manca l'URL"); process.exit(2); }

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const richiesteTool = [];
page.on("request", (r) => { if (r.url().includes("tool.ptdja.com")) richiesteTool.push(r.url()); });

let rispostaHome = await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
// Il firewall di Vercel puo' rispondere con la pagina di verifica del browser
// ("Vercel Security Checkpoint"): si aspetta che il JS la superi e si ricarica.
for (let i = 0; i < 6 && (await page.title()).includes("Security Checkpoint"); i++) {
  await page.waitForTimeout(5000);
  rispostaHome = await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
}
console.log(`home: ${rispostaHome.status()} x-robots-tag=${rispostaHome.headers()["x-robots-tag"]} server=${rispostaHome.headers()["server"]} titolo=${await page.title()}`);
await page.waitForTimeout(6000);

const runtime = await page.evaluate(() => {
  const track = document.querySelector('script[src*="tool.ptdja.com/tracking/track.js"]');
  const attr = document.querySelector('script[src*="/js/attribution.js"]');
  const bundles = [...document.querySelectorAll('script[src*="/_next/static/"]')].map((s) => s.getAttribute("src")).slice(0, 4);
  return {
    trackPresente: !!track,
    dataLanding: track && track.getAttribute("data-landing"),
    dataBrand: track && track.getAttribute("data-brand"),
    dataEndpoint: track && track.getAttribute("data-endpoint"),
    attribution: !!attr,
    stape: !!document.querySelector('script[src*="sgtm.petetong-djacademy.com"]'),
    proibiti: ["optibase", "intellimize", "refersion", "flowbase"].filter((p) => document.documentElement.outerHTML.toLowerCase().includes(p)),
    titolo: document.title,
    bundles,
  };
});
console.log(JSON.stringify(runtime, null, 1));
console.log(`richieste verso tool.ptdja.com: ${richiesteTool.length}`);
for (const u of richiesteTool.slice(0, 5)) console.log(`  ${u.slice(0, 200)}`);

for (const b of runtime.bundles) {
  const r = await page.request.get(BASE + b + ".map", { maxRedirects: 0, failOnStatusCode: false });
  console.log(`sourcemap ${b}.map: ${r.status()}`);
}

const robots = await page.goto(BASE + "/robots.txt", { waitUntil: "domcontentloaded" });
const robotsText = await page.evaluate(() => document.body.innerText);
console.log(`robots.txt: ${robots.status()} | ${robotsText.replace(/\n/g, " | ").slice(0, 200)}`);

const sm = await page.goto(BASE + "/sitemap.xml", { waitUntil: "domcontentloaded" });
const smText = await page.content();
console.log(`sitemap.xml: ${sm.status()} | url nel documento: ${(smText.match(/<loc>/g) || []).length}`);

const pricing = await page.goto(BASE + "/pricing-page", { waitUntil: "domcontentloaded" });
console.log(`pricing-page: ${pricing.status()} x-robots-tag=${pricing.headers()["x-robots-tag"]} x-frame-options=${pricing.headers()["x-frame-options"]}`);
await page.waitForTimeout(4000);
const carrello = await page.evaluate(() => document.querySelectorAll('a[href*="cart.petetong-djacademy.com"]').length);
console.log(`link carrello sulla pricing: ${carrello}`);

const errore = await page.goto(BASE + "/pagina-che-non-esiste-xyz", { waitUntil: "domcontentloaded" });
console.log(`pagina inesistente: ${errore.status()} titolo="${await page.title()}"`);

await browser.close();
