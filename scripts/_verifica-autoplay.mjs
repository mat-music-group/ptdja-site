/**
 * Verifica dell'autoplay del carosello docenti.
 *
 *   cd scripts
 *   node _verifica-autoplay.mjs --base http://localhost:3699
 *
 * L'autoplay è una DEVIAZIONE VOLUTA dal sito Webflow (richiesta di Matteo del
 * 2026-09-15): lo slider dei docenti avanza da solo ogni 3,5s. La prop sta in
 * `src/components/ui/SliderWebflow.tsx` (`autoplay`), il valore in
 * `src/components/sections/SliderDocenti.tsx`.
 *
 * Qui si controllano le regole che contano, su `/dj-course`:
 *   1. finché lo slider è fuori dal viewport non si muove;
 *   2. fermo lì a guardare, lo slider avanza da solo;
 *   3. col puntatore sopra si ferma, e riparte quando esce;
 *   4. con `prefers-reduced-motion: reduce` non parte affatto.
 *
 * Cosa si guarda: il `transform` **inline** della lista di slide. È il valore
 * di arrivo scritto da React (`translateX(-100%)`, `-200%`…), non lo stato
 * intermedio dell'animazione: cambia esattamente una volta per avanzamento,
 * quindi non serve inseguire la transizione.
 *
 * Lo script legge e muove il mouse: non scrive niente nel repo.
 */

import { chromium } from 'playwright';

function arg(nome, pre) {
  const i = process.argv.indexOf(`--${nome}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : pre;
}

const BASE = arg('base', 'http://localhost:3699').replace(/\/$/, '');
const PAGINA = arg('pagina', 'dj-course');
/* 4,5s: più di un ciclo da 3500ms più i 700ms di traslazione, con un margine
   per il tempo che ci mette la macchina. */
const ATTESA = Number(arg('attesa', '4500'));
const ETICHETTA = 'Teachers';

/* Il selettore della lista che trasla, dentro la sola regione dei docenti. */
const TRACCIA = `[aria-label="${ETICHETTA}"] div[style*="translateX"]`;

let errori = 0;

function esito(ok, titolo, dettaglio) {
  if (!ok) errori += 1;
  console.log(`${ok ? '  OK  ' : ' KO   '} ${titolo}`);
  if (dettaglio) console.log(`       ${dettaglio}`);
}

async function trasformazione(page) {
  return page.$eval(TRACCIA, (n) => n.style.transform);
}

/** Apre la pagina, chiude il banner e porta lo slider docenti nel viewport. */
async function apri(page) {
  await page.goto(`${BASE}/${PAGINA}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  const banner = page.locator('.iubenda-cs-accept-btn').first();
  if (await banner.count()) await banner.click().catch(() => {});
  await page.waitForTimeout(400);
  const regione = page.locator(`[aria-label="${ETICHETTA}"]`).first();
  await regione.scrollIntoViewIfNeeded();
  /* L'IntersectionObserver deve fare in tempo ad accorgersene, e la sezione ha
     un reveal all'ingresso. */
  await page.waitForTimeout(1200);
  return regione;
}

const browser = await chromium.launch();
const contesto = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
const page = await contesto.newPage();

console.log(`\nAutoplay dello slider docenti su ${BASE}/${PAGINA}\n`);

/* ── 1. Fuori dal viewport non si muove ────────────────────────────── */
await page.goto(`${BASE}/${PAGINA}`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1200);
const bannerPrimo = page.locator('.iubenda-cs-accept-btn').first();
if (await bannerPrimo.count()) await bannerPrimo.click().catch(() => {});
/* Nessuno scorrimento: lo slider docenti sta a qualche migliaio di pixel. */
const fuoriPrima = await trasformazione(page);
await page.waitForTimeout(ATTESA);
const fuoriDopo = await trasformazione(page);
esito(
  fuoriPrima === fuoriDopo,
  `fuori dal viewport resta fermo per ${ATTESA}ms`,
  `${fuoriPrima} → ${fuoriDopo}`
);

/* ── 2. Avanza da solo ─────────────────────────────────────────────── */
const regione = await apri(page);
const prima = await trasformazione(page);
await page.waitForTimeout(ATTESA);
const dopo = await trasformazione(page);
esito(
  prima !== dopo,
  `avanza da solo entro ${ATTESA}ms`,
  `t=0: ${prima || '(vuoto)'} → t=${ATTESA}ms: ${dopo || '(vuoto)'}`
);

/* ── 3. Si ferma col puntatore sopra, riparte quando esce ──────────── */
const riquadro = await regione.boundingBox();
/* Il centro della regione: le frecce stanno sui bordi, di lì non si passa. */
await page.mouse.move(
  riquadro.x + riquadro.width / 2,
  riquadro.y + riquadro.height / 2
);
await page.waitForTimeout(300);
const inPausaPrima = await trasformazione(page);
await page.waitForTimeout(ATTESA);
const inPausaDopo = await trasformazione(page);
esito(
  inPausaPrima === inPausaDopo,
  `col puntatore sopra resta fermo per ${ATTESA}ms`,
  `${inPausaPrima} → ${inPausaDopo}`
);

/* Mouse fuori dallo slider: deve ripartire. */
await page.mouse.move(5, 5);
await page.waitForTimeout(300);
const ripresaPrima = await trasformazione(page);
await page.waitForTimeout(ATTESA);
const ripresaDopo = await trasformazione(page);
esito(
  ripresaPrima !== ripresaDopo,
  'riparte quando il puntatore esce',
  `${ripresaPrima} → ${ripresaDopo}`
);

/* ── 4. Niente autoplay con prefers-reduced-motion: reduce ─────────── */
await page.emulateMedia({ reducedMotion: 'reduce' });
await apri(page);
const ridottoPrima = await trasformazione(page);
await page.waitForTimeout(ATTESA);
const ridottoDopo = await trasformazione(page);
esito(
  ridottoPrima === ridottoDopo,
  `con prefers-reduced-motion: reduce resta fermo per ${ATTESA}ms`,
  `${ridottoPrima} → ${ridottoDopo}`
);

await browser.close();

console.log(
  `\n${errori === 0 ? 'Tutte e cinque le prove passate.' : `${errori} prove fallite.`}\n`
);
process.exit(errori === 0 ? 0 : 1);
