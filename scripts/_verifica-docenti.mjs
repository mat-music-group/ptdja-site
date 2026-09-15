/**
 * Verifica il carosello dei docenti su /dj-course:
 *   1. le card sono le sei della lista DJ, nell'ordine;
 *   2. la freccia "avanti" fa scorrere la pista, quella "indietro" la riporta;
 *   3. il clic su una card apre la bio.
 *
 *   node _verifica-docenti.mjs --base http://localhost:3699
 */

import { chromium } from 'playwright';

function argomento(nome, predefinito) {
  const i = process.argv.indexOf(`--${nome}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : predefinito;
}

const base = argomento('base', 'http://localhost:3699');
const attesi = ['Pete Tong', 'Carl Cox', 'Adam Beyer', 'Nicole Moudaber', 'TSHA', 'Jamie Jones'];

let errori = 0;
function controlla(etichetta, ok, dettaglio = '') {
  console.log(`${ok ? '[OK]' : '[KO]'} ${etichetta}${dettaglio ? ` — ${dettaglio}` : ''}`);
  if (!ok) errori += 1;
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(`${base}/dj-course`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2000);

const sezione = page.locator('section', { hasText: 'The Academy Teachers.' }).last();
await sezione.scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);

const nomi = await sezione.locator('[data-card] h3').allInnerTexts();
controlla('nomi delle card', JSON.stringify(nomi) === JSON.stringify(attesi), nomi.join(' · '));

const leggi = () =>
  sezione.evaluate((s) => s.querySelector('[data-card]').parentElement.scrollLeft);

const prima = await leggi();
await sezione.getByRole('button', { name: 'Next' }).click();
await page.waitForTimeout(900);
const dopoAvanti = await leggi();
controlla('la freccia avanti scorre', dopoAvanti > prima, `${prima} → ${dopoAvanti}`);

await sezione.getByRole('button', { name: 'Previous' }).click();
await page.waitForTimeout(900);
const dopoIndietro = await leggi();
controlla('la freccia indietro torna', dopoIndietro < dopoAvanti, `${dopoAvanti} → ${dopoIndietro}`);

const card = sezione.locator('[data-card] [role="button"]').first();
await card.click();
await page.waitForTimeout(500);
controlla('il clic apre la bio', (await card.getAttribute('aria-expanded')) === 'true');

await browser.close();
console.log(errori === 0 ? '\n0 errori.' : `\n${errori} errori.`);
process.exit(errori === 0 ? 0 : 1);
