/**
 * Stile inline e stile calcolato di un selettore, per capire se una misura
 * arriva dal foglio o da un'interazione IX2 che scrive sull'attributo `style`.
 *
 *   node _stile-inline.mjs <url> <larghezza> <selettore> [proprietà ...]
 *
 * Legge e basta.
 */
import { chromium } from 'playwright';

const url = process.argv[2];
const larghezza = Number(process.argv[3] || 1440);
const sel = process.argv[4];
const props = process.argv.slice(5);

const browser = await chromium.launch();
const pagina = await browser.newPage({ viewport: { width: larghezza, height: 900 } });
await pagina.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
await pagina.waitForTimeout(6000);

const righe = await pagina.evaluate(
  ({ sel, props }) => {
    return [...document.querySelectorAll(sel)].slice(0, 10).map((el) => {
      const s = getComputedStyle(el);
      return {
        inline: el.getAttribute('style'),
        calcolato: props.map((p) => `${p}=${s.getPropertyValue(p)}`).join(' '),
        h: Math.round(el.getBoundingClientRect().height),
      };
    });
  },
  { sel, props: props.length ? props : ['display', 'height', 'overflow'] }
);

for (const r of righe) console.log(r.h, '|', r.calcolato, '| inline:', r.inline);
await browser.close();
