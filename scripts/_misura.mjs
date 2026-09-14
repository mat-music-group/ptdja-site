/**
 * Misura i riquadri degli elementi di una pagina, per confrontare il sito
 * Webflow con la ricostruzione in Next.js.
 *
 *   node _misura.mjs <url> <selettore>[,<selettore>…]
 *
 * Stampa, per ogni selettore, la posizione assoluta nel documento, le misure e
 * i valori calcolati di padding/margin. Legge e basta: non tocca niente.
 */
import { chromium } from 'playwright';

const url = process.argv[2];
const selettori = (process.argv[3] || '').split('|').filter(Boolean);

const browser = await chromium.launch();
const pagina = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await pagina.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
await pagina.evaluate(() => window.scrollTo(0, 0));

for (const sel of selettori) {
  const dati = await pagina.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const c = getComputedStyle(el);
    return {
      top: Math.round(r.top + window.scrollY),
      bottom: Math.round(r.bottom + window.scrollY),
      left: Math.round(r.left),
      width: Math.round(r.width),
      height: Math.round(r.height),
      padding: `${c.paddingTop} ${c.paddingRight} ${c.paddingBottom} ${c.paddingLeft}`,
      margin: `${c.marginTop} ${c.marginRight} ${c.marginBottom} ${c.marginLeft}`,
      display: c.display,
      gap: c.rowGap,
      font: `${c.fontSize}/${c.lineHeight} ${c.fontWeight}`,
    };
  }, sel);
  console.log(sel, '→', dati ? JSON.stringify(dati) : 'NON TROVATO');
}

console.log('altezza documento:', await pagina.evaluate(() => document.documentElement.scrollHeight));
await browser.close();
