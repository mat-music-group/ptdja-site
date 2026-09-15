/**
 * Riquadro (x, larghezza, top, altezza) di uno o più selettori su una pagina,
 * per confrontare il DOM del sito Webflow salvato con quello locale.
 *
 *   node _misura-selettori.mjs <url> <larghezza> <sel1> [sel2 ...]
 *
 * Scorre tutta la pagina prima di misurare, così le animazioni on-scroll sono
 * già finite. Legge e basta: non tocca niente.
 */
import { chromium } from 'playwright';

const url = process.argv[2];
const larghezza = Number(process.argv[3] || 1440);
const selettori = process.argv.slice(4);

const browser = await chromium.launch();
const pagina = await browser.newPage({ viewport: { width: larghezza, height: 900 } });
await pagina.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
await pagina.waitForTimeout(5000);
await pagina.evaluate(async () => {
  const passo = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += passo) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 100));
  }
  window.scrollTo(0, 0);
});
await pagina.waitForTimeout(1500);

const righe = await pagina.evaluate((sels) => {
  const out = [];
  for (const sel of sels) {
    const nodi = [...document.querySelectorAll(sel)];
    if (!nodi.length) out.push([sel, 'assente']);
    nodi.slice(0, 8).forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      out.push([
        `${sel}[${i}]`,
        `x=${Math.round(r.x)} w=${Math.round(r.width)} top=${Math.round(r.top + window.scrollY)} h=${Math.round(r.height)}`,
        `font=${s.fontSize}/${s.lineHeight} pad=${s.paddingTop} ${s.paddingBottom} mar=${s.marginTop} ${s.marginBottom} gap=${s.rowGap} display=${s.display}`,
      ]);
    });
  }
  return out;
}, selettori);

for (const r of righe) console.log(r.join('  |  '));
console.log('altezza documento:', await pagina.evaluate(() => document.documentElement.scrollHeight));
await browser.close();
