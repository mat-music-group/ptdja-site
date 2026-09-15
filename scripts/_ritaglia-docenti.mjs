/**
 * Screenshot della sola sezione dei docenti (`DocentiAcademy`), a 1440 e a 390.
 * Usa e getta: serve a guardare la sezione senza aprire uno screenshot alto
 * 15.000px. Le immagini finiscono in /tmp.
 *
 *   node _ritaglia-docenti.mjs --base http://localhost:3699
 */

import { chromium } from 'playwright';

function argomento(nome, predefinito) {
  const i = process.argv.indexOf(`--${nome}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : predefinito;
}

const base = argomento('base', 'http://localhost:3699');
const slugs = argomento('slug', '/,/dj-course,/producer-course').split(',');
const fuori = argomento('out', '/tmp/docenti');
/* Pezzo di URL che riconosce le foto: `/docenti/` qui, `/teachers/` sul repo
   delle landing, quando si vuole lo scatto di confronto. */
const marcatore = argomento('marcatore', 'docenti');

const browser = await chromium.launch();
for (const larghezza of [1440, 390]) {
  const ctx = await browser.newContext({ viewport: { width: larghezza, height: 900 } });
  for (const slug of slugs) {
    const page = await ctx.newPage();
    await page.goto(base + slug, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    // La sezione è l'unica che contiene l'h2 "The Academy Teachers."
    const sezione = page.locator('section', { hasText: 'The Academy Teachers.' }).last();
    await sezione.scrollIntoViewIfNeeded();
    /* Le foto sono `loading="lazy"`: senza questa attesa lo scatto esce vuoto.
       Solo quelle dentro il viewport arrivano, le altre restano in coda finché
       non si scorre la pista: è il comportamento voluto, non un errore. */
    await page.waitForFunction(
      (m) =>
        [...document.querySelectorAll('img')].filter(
          (i) => i.src.includes(m) && i.complete && i.naturalWidth > 0,
        ).length >= 2,
      marcatore,
      { timeout: 20000 },
    );
    await page.waitForTimeout(2000);
    const nome = `${fuori}/${slug.replace(/\//g, '') || 'home'}-${larghezza}.png`;
    await sezione.screenshot({ path: nome });
    console.log(nome);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
