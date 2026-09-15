/*
  Verifica del tetto di lunghezza in attribution.js (Vibe Shield F1).

  Apre la pricing con quattro utm_* da 4000 caratteri e un fbclid con `;` e una
  sequenza percentuale malformata, con consenso Iubenda fittizio, e controlla
  che ogni cookie attr_* sia lungo al massimo 512 caratteri, che _fbc non
  contenga attributi iniettati e che lo script sia arrivato in fondo al boot
  (link carrello decorati, ptdja_identity_ready nel dataLayer).

  Uso (da scripts/):  node _verifica-cookie-bomb.mjs [base]
*/
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://localhost:3699";
const url = new URL(BASE);
const lungo = "A".repeat(3000); // tre utm da 3 KB: sotto il limite di 16 KB per gli header della richiesta (altrimenti il server risponde 431 prima che la pagina esista)
const query =
  `utm_source=${lungo}&utm_campaign=${lungo}&utm_medium=${lungo}` +
  `&fbclid=abc%3Bdomain%3Devil.com%3Bmax-age%3D1%E0`;

const browser = await chromium.launch();
const ctx = await browser.newContext();
await ctx.addCookies([
  { name: "_iub_cs-99999999", value: encodeURIComponent('{"consent":true}'), domain: url.hostname, path: "/" },
]);
const page = await ctx.newPage();
await page.route("**/*", (r) => (r.request().url().startsWith(BASE) ? r.continue() : r.abort()));
const errori = [];
page.on("pageerror", (e) => errori.push(String(e.message)));
const risposta = await page.goto(`${BASE}/pricing-page?${query}`, { waitUntil: "domcontentloaded" });
console.log(`status pagina: ${risposta && risposta.status()}`);
await page.waitForTimeout(4500);

const cookies = await ctx.cookies();
const attr = cookies.filter((c) => c.name.startsWith("attr_") || c.name === "_fbc");
let ko = 0;
for (const c of attr) {
  const val = decodeURIComponent(c.value);
  const ok = val.length <= 512 && c.domain !== "evil.com";
  if (!ok) ko++;
  console.log(`${c.name}: ${val.length} caratteri, domain=${c.domain}${ok ? "" : "  ← KO"}`);
}
// Su localhost i cookie con domain .petetong-djacademy.com vengono rifiutati dal
// browser: il tetto si osserva su localStorage, scritto dalla stessa persist().
const storage = await page.evaluate(() =>
  Object.keys(localStorage).filter((k) => k.startsWith("attr_")).map((k) => [k, localStorage.getItem(k).length]),
);
for (const [k, n] of storage) {
  const ok = n <= 512;
  if (!ok) ko++;
  console.log(`localStorage ${k}: ${n} caratteri${ok ? "" : "  ← KO"}`);
}
if (!storage.length) { ko++; console.log("nessun attr_* in localStorage: lo script non ha persistito nulla  ← KO"); }
const stato = await page.evaluate(() => ({
  decorati: [...document.querySelectorAll('a[href*="cart.petetong-djacademy.com"]')].filter((a) => a.href.includes("cf_utm_source")).length,
  identity: (window.dataLayer || []).filter((e) => e && e.event === "ptdja_identity_ready").length,
}));
console.log(`link carrello decorati: ${stato.decorati}, ptdja_identity_ready: ${stato.identity}, errori JS: ${errori.length}`);
await browser.close();
if (ko || stato.decorati < 9 || stato.identity < 1 || errori.length) {
  console.log("ESITO: KO");
  process.exit(1);
}
console.log("ESITO: OK");
