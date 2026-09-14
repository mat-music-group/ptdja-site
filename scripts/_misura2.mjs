/**
 * Misura i riquadri degli elementi di una pagina (variante robusta di
 * `_misura.mjs`: non aspetta `networkidle`, che su queste pagine non arriva
 * mai per colpa di Wistia e Trustpilot, e accetta la larghezza del viewport).
 *
 *   node _misura2.mjs <url> <sel1|sel2|…> [larghezza]
 *
 * Per ogni selettore stampa TUTTI gli elementi che lo soddisfano. Sola lettura.
 */
import { chromium } from 'playwright';

const url = process.argv[2];
const selettori = (process.argv[3] || '').split('|').filter(Boolean);
const larghezza = Number(process.argv[4] || 1440);

const browser = await chromium.launch();
const pagina = await browser.newPage({
  viewport: { width: larghezza, height: 900 },
});
await pagina.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
await pagina.waitForTimeout(6000);
await pagina.evaluate(async () => {
  const passo = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += passo) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 100));
  }
  window.scrollTo(0, 0);
});
await pagina.waitForTimeout(1500);

for (const sel of selettori) {
  const dati = await pagina.evaluate((s) => {
    return [...document.querySelectorAll(s)].map((el) => {
      const r = el.getBoundingClientRect();
      const c = getComputedStyle(el);
      return {
        top: Math.round(r.top + window.scrollY),
        left: Math.round(r.left),
        w: Math.round(r.width),
        h: Math.round(r.height),
        display: c.display,
        pad: `${c.paddingTop} ${c.paddingRight} ${c.paddingBottom} ${c.paddingLeft}`,
        mar: `${c.marginTop} ${c.marginRight} ${c.marginBottom} ${c.marginLeft}`,
        gap: c.rowGap,
        font: `${c.fontSize}/${c.lineHeight} ${c.fontWeight}`,
      };
    });
  }, sel);
  console.log(sel, '→', JSON.stringify(dati));
}
await browser.close();
