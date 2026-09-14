/**
 * Stampa il colore calcolato (e qualche altra proprietà) degli elementi che
 * soddisfano i selettori dati, sul sito live o sul build locale.
 *
 *   node _colori.mjs <url> <sel1|sel2|…> [larghezza]
 *
 * Sola lettura: serve a decidere un colore guardando il browser invece che il
 * foglio di stile, quando le regole si contraddicono.
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
await pagina.waitForTimeout(5000);

for (const sel of selettori) {
  const dati = await pagina.evaluate((s) => {
    return [...document.querySelectorAll(s)].map((el) => {
      const c = getComputedStyle(el);
      return {
        testo: (el.textContent || '').trim().slice(0, 40),
        color: c.color,
        background: c.backgroundColor,
        border: c.borderColor,
        font: `${c.fontSize}/${c.lineHeight} ${c.fontWeight}`,
        display: c.display,
      };
    });
  }, sel);
  console.log(sel, '→', JSON.stringify(dati));
}
await browser.close();
