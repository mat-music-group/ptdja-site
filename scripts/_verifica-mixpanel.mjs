/**
 * Verifica degli eventi Mixpanel del sito, senza sporcare il progetto vero.
 *
 *   node scripts/_verifica-mixpanel.mjs --base http://localhost:3701
 *
 * Apre le pagine in scope su un dev server già acceso, intercetta OGNI
 * richiesta verso `*.mixpanel.com` e la **blocca**, decodificando il corpo per
 * stampare nome evento e proprietà. Nessun evento di prova arriva al progetto
 * Mixpanel di produzione: il token nel repo è quello vero e dentro Mixpanel i
 * dati non si cancellano come nel collector.
 *
 * Poi clicca, una per una, le cose che sul sito Webflow sono tracciate (FAQ,
 * link della navbar, CTA, link al carrello, link Trustpilot, card corso,
 * bottone Calendly) e stampa la tabella evento → props ottenuta.
 *
 * Legge e clicca: non scrive niente nel repo.
 */

import { chromium } from 'playwright';

function arg(nome, pre) {
  const i = process.argv.indexOf(`--${nome}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : pre;
}

const BASE = arg('base', 'http://localhost:3701').replace(/\/$/, '');
const PAGINE = arg('pagine', 'pricing-page,play-get-signed').split(',');

/* ── Decodifica del payload di Mixpanel ────────────────────────────────
 *
 * La libreria manda gli eventi in tre forme diverse a seconda di versione,
 * batching e trasporto: `data=` in query string (GET con `img`), `data=` nel
 * corpo urlencoded (POST xhr), oppure JSON puro nel corpo. Il valore a sua
 * volta è JSON in chiaro o JSON codificato in base64, e può contenere un
 * evento solo o un array. Qui si prova tutto, in ordine.
 */
function decodifica(testo) {
  if (!testo) return null;
  const prova = (s) => {
    try {
      return JSON.parse(s);
    } catch {
      return null;
    }
  };
  const diretto = prova(testo);
  if (diretto) return diretto;
  try {
    return prova(Buffer.from(testo, 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

function estraiDati(richiesta) {
  const url = new URL(richiesta.url());
  const daQuery = url.searchParams.get('data');
  if (daQuery) return decodifica(daQuery);

  const corpo = richiesta.postData();
  if (!corpo) return null;

  /* Corpo urlencoded: `data=…&verbose=1&ip=0` */
  if (corpo.includes('data=')) {
    const campi = new URLSearchParams(corpo);
    const valore = campi.get('data');
    if (valore) return decodifica(valore);
  }
  return decodifica(corpo);
}

/* ── Raccolta ──────────────────────────────────────────────────────────── */

const eventi = [];
const bloccate = [];

function registra(richiesta, pagina) {
  bloccate.push(richiesta.url());
  const dati = estraiDati(richiesta);
  if (!dati) return;
  const elenco = Array.isArray(dati) ? dati : [dati];
  for (const voce of elenco) {
    if (!voce || typeof voce !== 'object') continue;
    eventi.push({
      pagina,
      evento: voce.event ?? `(engage ${Object.keys(voce).find((k) => k.startsWith('$')) ?? '?'})`,
      props: voce.properties ?? voce,
    });
  }
}

/* Le props che Mixpanel aggiunge da sé a ogni evento: nel confronto con lo
   script Webflow non c'entrano niente e coprirebbero quelle che ci servono. */
const AUTOMATICHE = new Set([
  'token', 'distinct_id', '$device_id', '$user_id', '$initial_referrer',
  '$initial_referring_domain', '$os', '$browser', '$browser_version',
  '$current_url', '$device', '$screen_height', '$screen_width', 'mp_lib',
  '$lib_version', '$insert_id', 'time', '$search_engine', '$referrer',
  '$referring_domain', 'mp_sent_by_lib_version', '$model', '$manufacturer',
  '$mp_api_endpoint', '$mp_api_timestamp_ms', '$import',
]);

function propsNostre(props) {
  const fuori = {};
  for (const [chiave, valore] of Object.entries(props ?? {})) {
    if (AUTOMATICHE.has(chiave)) continue;
    fuori[chiave] = valore;
  }
  return fuori;
}

/* ── Interazioni ───────────────────────────────────────────────────────── */

const esiti = [];

/*
 * Mixpanel non spedisce al click: accoda e svuota la coda a intervalli (il
 * `batch_flush_interval_ms` della libreria, 5 secondi di suo). Aspettare un
 * tempo fisso troppo corto attribuirebbe l'evento all'azione successiva, che è
 * esattamente il modo in cui una verifica dice "non tracciato" su qualcosa che
 * funziona. Qui si aspetta finché l'evento arriva, con un tetto.
 */
async function attendi(prima, attesoMs = 9000) {
  const scadenza = Date.now() + attesoMs;
  while (Date.now() < scadenza) {
    if (eventi.length > prima) {
      /* Un attimo in più: una stessa spedizione può portare più eventi. */
      await new Promise((r) => setTimeout(r, 600));
      return;
    }
    await new Promise((r) => setTimeout(r, 200));
  }
}

async function prova(nome, azione) {
  const prima = eventi.length;
  let errore = null;
  try {
    const trovato = await azione();
    if (trovato === false) {
      esiti.push({ nome, stato: 'assente', nota: 'elemento non presente in pagina' });
      return;
    }
  } catch (e) {
    errore = e.message.split('\n')[0];
  }
  await attendi(prima);
  const nuovi = eventi.slice(prima).map((e) => e.evento);
  esiti.push({
    nome,
    stato: errore ? `errore: ${errore}` : nuovi.length ? 'ok' : 'nessun evento',
    nota: nuovi.join(', '),
  });
}

const browser = await chromium.launch();
const contesto = await browser.newContext({ viewport: { width: 1440, height: 900 } });

/* Ogni click su un link viene neutralizzato in fase di cattura: `next/link` e
   i link esterni controllano `defaultPrevented` e non navigano, mentre gli
   handler React (cioè il tracciamento) partono lo stesso, perché
   `preventDefault` non ferma la propagazione. Serve a cliccare navbar e
   carrello senza perdere la pagina. */
await contesto.addInitScript(() => {
  document.addEventListener(
    'click',
    (e) => {
      const a = e.target instanceof Element ? e.target.closest('a') : null;
      if (a) e.preventDefault();
    },
    true
  );
});

const pagina = await contesto.newPage();

let pagineCorrente = '';
await pagina.route(/https?:\/\/([a-z0-9-]+\.)*mixpanel\.com\//i, async (rotta) => {
  registra(rotta.request(), pagineCorrente);
  /* Si risponde "va bene" senza far uscire niente: con un `abort` la libreria
     riproverebbe e lo stesso evento comparirebbe più volte. */
  await rotta.fulfill({
    status: 200,
    contentType: 'application/json',
    body: '{"status": 1, "error": null}',
  });
});

for (const slug of PAGINE) {
  pagineCorrente = `/${slug}`;
  esiti.push({ nome: `── /${slug}`, stato: '', nota: '' });

  await pagina.goto(`${BASE}/${slug}`, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await pagina.waitForTimeout(3000);

  /* Banner Iubenda: sul sito lo carica GTM, quindi in locale può non esserci
     affatto. Se c'è si accetta, perché è la condizione normale di un
     visitatore. */
  const accetta = pagina.locator('.iubenda-cs-accept-btn').first();
  if (await accetta.count()) {
    await accetta.click({ timeout: 3000 }).catch(() => {});
    await pagina.waitForTimeout(500);
  }

  await prova('Page View (caricamento)', async () => true);

  await prova('Tracked FAQ Opened', async () => {
    const faq = pagina.locator('button[aria-expanded]').filter({ hasText: '?' }).first();
    if (!(await faq.count())) return false;
    await faq.scrollIntoViewIfNeeded();
    await faq.click();
  });

  await prova('Navbar Link Clicked', async () => {
    const link = pagina.locator('nav a[href="/recess"], nav a').first();
    if (!(await link.count())) return false;
    await link.scrollIntoViewIfNeeded();
    await link.click();
  });

  /* Il bottone "Sign Up Now" della hero, che sul sito porta l'evento
     `CTA Click`. Il selettore Webflow è `a.button.enroll.signup-now` e prende
     SOLO le hero di home, dj-course, producer-course e mix-mastering-course:
     su queste due pagine non esiste, né sul sito né qui. Nel repo i bottoni
     tracciati si riconoscono dalla props `traccia` del `Button`, che nel DOM
     lascia il segno `data-traccia`, che è quello che si cerca qui. */
  await prova('CTA Click (hero "Sign Up Now")', async () => {
    const cta = pagina.locator('a[data-traccia="CTA Click"]:visible').first();
    if (!(await cta.count())) return false;
    await cta.scrollIntoViewIfNeeded({ timeout: 5000 });
    await cta.click({ timeout: 5000 });
  });

  /* `:visible`: le tre griglie di valuta stanno tutte e tre nel DOM e il gate
     geografico ne mostra una sola. Senza il filtro si prenderebbe un link
     nascosto, che non si può cliccare. */
  await prova('Pricing Checkout Clicked', async () => {
    const carrello = pagina
      .locator('a[href*="cart.petetong-djacademy.com"]:visible')
      .first();
    if (!(await carrello.count())) return false;
    await carrello.scrollIntoViewIfNeeded({ timeout: 5000 });
    await carrello.click({ timeout: 5000 });
  });

  await prova('Trustpilot CTA Clicked', async () => {
    const tp = pagina.locator('p a[href*="trustpilot.com"]').first();
    if (!(await tp.count())) return false;
    await tp.scrollIntoViewIfNeeded();
    await tp.click();
  });

  await prova('Course Card Click', async () => {
    const card = pagina.locator('a[href="/dj-course"] img, a[href="/producer-course"] img').first();
    if (!(await card.count())) return false;
    await card.scrollIntoViewIfNeeded();
    await card.click();
  });

  await prova('Book Free Call CTA', async () => {
    const call = pagina.locator('a[href*="calendly.com"]').first();
    if (!(await call.count())) return false;
    await call.scrollIntoViewIfNeeded();
    await call.click();
  });

  await pagina.waitForTimeout(1500);
}

/*
 * Una navigazione client side, in un contesto pulito: qui i link DEVONO
 * navigare, quindi niente `preventDefault`. Serve a verificare l'unica cosa
 * che su Webflow era gratis e qui non lo è: sul sito ogni voce di menu era un
 * caricamento pieno, e quindi un `Page View`; con l'App Router il documento si
 * carica una volta sola.
 */
pagineCorrente = 'navigazione client';
const primaDellaNav = eventi.length;

const contestoNav = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const paginaNav = await contestoNav.newPage();
await paginaNav.route(/https?:\/\/([a-z0-9-]+\.)*mixpanel\.com\//i, async (rotta) => {
  registra(rotta.request(), pagineCorrente);
  await rotta.fulfill({
    status: 200,
    contentType: 'application/json',
    body: '{"status": 1, "error": null}',
  });
});

await paginaNav.goto(`${BASE}/pricing-page`, { waitUntil: 'domcontentloaded' });
await paginaNav.waitForTimeout(3000);
await paginaNav
  .locator('nav a[href="/play-get-signed"]')
  .first()
  .click({ timeout: 5000 })
  .catch(() => {});
await paginaNav.waitForTimeout(8000);

const dopoNav = eventi.slice(primaDellaNav);
const pageViewDopoNav = dopoNav.filter((e) => e.evento === 'Page View');
const percorsiPageView = pageViewDopoNav.map((e) => e.props?.page);

await browser.close();

/* ── Stampa ────────────────────────────────────────────────────────────── */

console.log(`\nRichieste verso Mixpanel intercettate e bloccate: ${bloccate.length}`);
console.log(`Eventi decodificati: ${eventi.length}\n`);

console.log('── ESITO DEI CLICK ────────────────────────────────────────────');
for (const e of esiti) {
  if (!e.stato) {
    console.log(`\n${e.nome}`);
    continue;
  }
  console.log(`  ${e.stato.padEnd(16)} ${e.nome}${e.nota ? `  → ${e.nota}` : ''}`);
}

console.log('\n── EVENTO → PROPS ────────────────────────────────────────────');
const visti = new Map();
for (const e of eventi) {
  const chiave = `${e.pagina} ${e.evento}`;
  if (visti.has(chiave)) continue;
  visti.set(chiave, true);
  console.log(`\n[${e.pagina}] ${e.evento}`);
  console.log(JSON.stringify(propsNostre(e.props), null, 2));
}

console.log('\n── PAGE VIEW SU NAVIGAZIONE CLIENT ───────────────────────────');
console.log(
  pageViewDopoNav.length >= 2
    ? `ok: ${pageViewDopoNav.length} Page View → ${percorsiPageView.join(' , ')}`
    : `attenzione: solo ${pageViewDopoNav.length} Page View (${percorsiPageView.join(' , ')})`
);

console.log('\nNessuna richiesta è uscita verso Mixpanel: tutte bloccate da page.route.');
