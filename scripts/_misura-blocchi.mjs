/**
 * Elenca i blocchi di primo livello di una pagina con la loro posizione e
 * altezza, per confrontare il sito Webflow con la ricostruzione in Next.js.
 *
 *   node _misura-blocchi.mjs <url> [larghezza] [selettore-radice]
 *
 * Scorre tutta la pagina prima di misurare, così le animazioni on-scroll sono
 * già finite e le altezze sono quelle vere. Legge e basta: non tocca niente.
 */
import { chromium } from 'playwright';

const url = process.argv[2];
const larghezza = Number(process.argv[3] || 1440);
const radice = process.argv[4] || 'body';

const browser = await chromium.launch();
const pagina = await browser.newPage({
  viewport: { width: larghezza, height: 900 },
});
await pagina.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
await pagina.waitForTimeout(6000);

/* scorrimento a tappe: sblocca le interazioni "scroll into view" */
await pagina.evaluate(async () => {
  const passo = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += passo) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await pagina.waitForTimeout(2000);

const blocchi = await pagina.evaluate((sel) => {
  const radice = document.querySelector(sel);
  return [...radice.children].map((el) => {
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName.toLowerCase(),
      classe: (el.className || '').toString().slice(0, 90),
      top: Math.round(r.top + window.scrollY),
      alt: Math.round(r.height),
    };
  });
}, radice);

for (const b of blocchi) {
  console.log(
    String(b.top).padStart(6),
    String(b.alt).padStart(6),
    b.tag,
    b.classe
  );
}
console.log(
  'altezza documento:',
  await pagina.evaluate(() => document.documentElement.scrollHeight)
);
await browser.close();
