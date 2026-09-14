/**
 * Posizione e altezza dei punti di riferimento della pagina locale (header,
 * titoli, sezioni, blocchi geo, footer) lette dal DOM.
 *
 *   node scripts/misura-sezioni.mjs --base http://localhost:3701 --slug pricing-page --vp mobile
 *
 * Serve a dire *dove* nasce uno scarto di altezza: `misura-screenshot.py`
 * dice di quanto la pagina è più alta o più bassa del sito vero, questo dice
 * quale sezione se lo mangia. Legge e basta.
 */

import { chromium } from 'playwright';

function arg(nome, pre) {
  const i = process.argv.indexOf(`--${nome}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : pre;
}

const BASE = arg('base', 'http://localhost:3701').replace(/\/$/, '');
const SLUG = arg('slug', 'pricing-page');
const VP = arg('vp', 'mobile');
const VIEWPORT =
  VP === 'mobile' ? { width: 390, height: 844 } : { width: 1440, height: 900 };

const browser = await chromium.launch();
const pagina = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 1 });
await pagina.goto(`${BASE}/${SLUG}`, { waitUntil: 'networkidle', timeout: 120000 });
await pagina.waitForTimeout(3000);

const dati = await pagina.evaluate(() => {
  const punti = [];
  const segna = (nome, el) => {
    if (!el) return punti.push([nome, null, null]);
    const r = el.getBoundingClientRect();
    punti.push([nome, Math.round(r.top + window.scrollY), Math.round(r.height)]);
  };
  segna('header', document.querySelector('header, [data-sezione="header"]'));
  segna('h1-eyebrow', document.querySelector('h1'));
  const h2 = [...document.querySelectorAll('h2')];
  h2.forEach((e, i) => segna(`h2[${i}] ${e.textContent.slice(0, 24)}`, e));
  segna('paragrafo-hero', document.querySelector('h2 + p'));
  segna('toggle', document.querySelector('[role="switch"]'));
  const sezioni = [...document.querySelectorAll('section')];
  sezioni.forEach((e, i) => segna(`section[${i}] .${e.className.split(' ')[0]}`, e));
  const card = [...document.querySelectorAll('.geo-visibile')];
  card.forEach((e, i) => segna(`geo[${i}]`, e));
  segna('footer', document.querySelector('footer'));
  return {
    altezza: document.documentElement.scrollHeight,
    punti,
  };
});

console.log('altezza totale:', dati.altezza);
for (const [nome, top, h] of dati.punti) console.log(String(top).padStart(6), String(h).padStart(6), nome);

await browser.close();
