/**
 * Confronta come si monta il player DynTube sul sito Webflow e sulla
 * ricostruzione: stampa il markup che lo script inietta e le misure.
 *
 *   node _dyntube.mjs <url>
 */
import { chromium } from 'playwright';

const url = process.argv[2];
const browser = await chromium.launch();
const pagina = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await pagina.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
await pagina.waitForTimeout(4000);

const dati = await pagina.evaluate(() => {
  const el = document.querySelector('[data-dyntube-key]');
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const c = getComputedStyle(el);
  return {
    box: `${Math.round(r.width)}x${Math.round(r.height)}`,
    classi: el.className,
    stileInline: el.getAttribute('style'),
    padding: c.padding,
    position: c.position,
    markup: el.outerHTML.slice(0, 1200),
    genitore: el.parentElement ? el.parentElement.className : null,
  };
});
console.log(JSON.stringify(dati, null, 1));
await browser.close();
