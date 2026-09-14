/*
  Verifica della decorazione dei link carrello (attribution.js, "cb push v2.2").

  Apre una pagina del build locale con cookie attr_* e un cookie di consenso
  Iubenda fittizio, aspetta il ciclo di boot dello script e controlla che i
  link verso cart.petetong-djacademy.com abbiano acquisito i parametri
  customer[cf_*] previsti da FIELD_MAP, più le UTM al primo livello, e che
  nel dataLayer sia arrivato ptdja_identity_ready. Poi aziona l'interruttore
  annuale/trimestrale e ripete il controllo sui link trimestrali.

  Nota: Webflow tiene 18 ancore nel DOM (9 annuali + 9 trimestrali) e ne
  mostra 9; PricingPlans rende 9 ancore e cambia l'href con lo stato del
  toggle. Il risultato per il visitatore e per Chargebee è lo stesso, e il
  MutationObserver più il click in fase di cattura di attribution.js
  decorano anche gli href cambiati.

  Uso (da scripts/):  node _verifica-attribuzione.mjs [base] [percorso]
  Default: http://localhost:3701 /pricing-page
*/
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://localhost:3701";
const PERCORSO = process.argv[3] || "/pricing-page";
const url = new URL(BASE);

const ATTESI = [
  "customer[cf_utm_source]=test_src",
  "customer[cf_utm_campaign]=camp_test",
  "customer[cf_utm_medium]=cpc",
  "customer[cf_goo_gclid]=gclid_abc",
  "customer[cf_facebook_fbp]=fb.1.1700000000.123456",
  "customer[cf_facebook_fbc]=fb.1.1700000000.IwAR-test",
  "utm_source=test_src",
  "utm_campaign=camp_test",
];

const browser = await chromium.launch();
const ctx = await browser.newContext();
await ctx.addCookies([
  { name: "attr_utm_source", value: "test_src", domain: url.hostname, path: "/" },
  { name: "attr_gclid", value: "gclid_abc", domain: url.hostname, path: "/" },
  { name: "_fbp", value: "fb.1.1700000000.123456", domain: url.hostname, path: "/" },
  { name: "_fbc", value: "fb.1.1700000000.IwAR-test", domain: url.hostname, path: "/" },
  { name: "_iub_cs-99999999", value: encodeURIComponent('{"consent":true}'), domain: url.hostname, path: "/" },
]);
const page = await ctx.newPage();
// niente rete verso terzi: il test riguarda solo lo script locale
await page.route("**/*", (route) =>
  route.request().url().startsWith(BASE) ? route.continue() : route.abort(),
);
await page.goto(`${BASE}${PERCORSO}?utm_campaign=camp_test&utm_medium=cpc`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4500); // boot + META_COOKIE_WAIT_MS + POST_INIT_RETRY_MS

async function raccogli(attesi) {
  return page.evaluate((attesi) => {
    const links = [...document.querySelectorAll('a[href*="cart.petetong-djacademy.com"]')];
    const dettagli = links.map((a) => {
      const u = new URL(a.href);
      const q = decodeURIComponent(u.search);
      return {
        item: u.searchParams.get("subscription_items[item_price_id][0]"),
        mancanti: attesi.filter((p) => !q.includes(p)),
        uid: u.searchParams.get("customer[cf_ptdja_uid]"),
      };
    });
    const dl = (window.dataLayer || []).filter((e) => e && e.event === "ptdja_identity_ready");
    return { dettagli, identityReady: dl.length, esempio: links[0] && links[0].href };
  }, attesi);
}

function stampa(titolo, esito) {
  console.log(`${titolo}: ${esito.dettagli.length} link`);
  for (const d of esito.dettagli) {
    console.log(`  ${d.item}  uid=${d.uid ? "sì" : "NO"}  mancanti=${d.mancanti.length ? d.mancanti.join(", ") : "nessuno"}`);
  }
  return esito.dettagli.filter((d) => d.mancanti.length || !d.uid).length;
}

let ko = 0;
const annuali = await raccogli(ATTESI);
ko += stampa("annuali", annuali);
const ciclo = new Set(annuali.dettagli.map((d) => d.item && d.item.split("-").slice(2).join("-")));
if (!ciclo.has("Yearly") || annuali.dettagli.length !== 9) ko += 1;
console.log(`ptdja_identity_ready nel dataLayer: ${annuali.identityReady}`);
console.log(`esempio: ${annuali.esempio}`);

await page.locator('[role="switch"]').first().click();
await page.waitForTimeout(1500); // il MutationObserver ridecora dopo 300 ms
const trimestrali = await raccogli(ATTESI);
ko += stampa("trimestrali (dopo il toggle)", trimestrali);
const cicloT = new Set(trimestrali.dettagli.map((d) => d.item && d.item.split("-").slice(2).join("-")));
if (!cicloT.has("Every-3-months") || trimestrali.dettagli.length !== 9) ko += 1;

await browser.close();
if (ko || annuali.identityReady < 1) {
  console.log("ESITO: KO");
  process.exit(1);
}
console.log("ESITO: OK");
