/**
 * Screenshot di riferimento delle pagine del sito PTDJA.
 *
 * Parametrico: si passa la base URL e la lista di slug, così lo stesso script
 * serve sia per il sito Webflow live sia per il build locale in Next.js.
 *
 *   node screenshot-riferimento.mjs
 *   node screenshot-riferimento.mjs --base http://localhost:3000 --out ../docs/webflow/screenshots-next
 *   node screenshot-riferimento.mjs --slug home,pricing-page
 *
 * Opzioni:
 *   --base   URL di partenza (default https://www.petetong-djacademy.com)
 *   --out    cartella di destinazione (default ../docs/webflow/screenshots)
 *   --slug   elenco separato da virgole, sottoinsieme delle pagine
 *   --solo   desktop | mobile (default: tutte e due)
 */

import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const QUI = dirname(fileURLToPath(import.meta.url));

// slug -> percorso. La 404 si ottiene chiedendo una URL che non esiste.
const PAGINE = {
  home: '/',
  'dj-course': '/dj-course',
  'producer-course': '/producer-course',
  'mix-mastering-course': '/mix-mastering-course',
  'pricing-page': '/pricing-page',
  'play-get-signed': '/play-get-signed',
  'advanced-djs': '/advanced-djs',
  recess: '/recess',
  'terms-conditions': '/terms-conditions',
  'terms-conditions-sa': '/terms-conditions-sa',
  404: '/pagina-che-non-esiste-xyz',
};

const UA_MOBILE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const UA_DESKTOP =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36';

const VIEWPORT = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

function argomento(nome, predefinito) {
  const i = process.argv.indexOf(`--${nome}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : predefinito;
}

const BASE = argomento('base', 'https://www.petetong-djacademy.com').replace(/\/$/, '');
const OUT = resolve(QUI, argomento('out', '../docs/webflow/screenshots'));
const SOLO = argomento('solo', null);
const SLUG = argomento('slug', null);

const slugScelti = SLUG ? SLUG.split(',').map((s) => s.trim()) : Object.keys(PAGINE);
const formati = SOLO ? [SOLO] : ['desktop', 'mobile'];

/**
 * Chiude il banner di consenso Iubenda.
 *
 * Nota: sul sito PTDJA la CMP non sta nell'HTML, la inietta GTM, quindi il
 * nome del cookie `_iub_cs-<siteId>` non è noto in anticipo e pre-impostarlo
 * non è affidabile. Qui si clicca il bottone di accettazione, provando i
 * selettori di Iubenda in ordine; se il banner non compare entro il timeout
 * si prosegue, perché su molte esecuzioni non compare affatto.
 */
async function chiudiConsenso(page) {
  const selettori = [
    '.iubenda-cs-accept-btn',
    '#iubenda-cs-banner button.iubenda-cs-accept-btn',
    '[class*="iubenda-cs-accept"]',
    'button:has-text("Accept")',
    'button:has-text("Accetta")',
  ];
  for (const selettore of selettori) {
    try {
      const bottone = page.locator(selettore).first();
      await bottone.waitFor({ state: 'visible', timeout: 4000 });
      await bottone.click({ timeout: 3000 });
      await page.waitForTimeout(800);
      return selettore;
    } catch {
      /* si prova il successivo */
    }
  }
  return null;
}

/** Scorre lentamente fino in fondo e torna su, per far partire le animazioni on-scroll. */
async function scorriTutto(page) {
  await page.evaluate(async () => {
    const attendi = (ms) => new Promise((r) => setTimeout(r, ms));
    const passo = Math.round(window.innerHeight * 0.7);
    let y = 0;
    const massimo = () => document.body.scrollHeight;
    while (y < massimo()) {
      y += passo;
      window.scrollTo(0, y);
      await attendi(220);
    }
    window.scrollTo(0, massimo());
    await attendi(600);
    window.scrollTo(0, 0);
    await attendi(600);
  });
}

async function scatta(browser, slug, formato, esiti) {
  const url = BASE + PAGINE[slug];
  const contesto = await browser.newContext({
    viewport: VIEWPORT[formato],
    userAgent: formato === 'mobile' ? UA_MOBILE : UA_DESKTOP,
    deviceScaleFactor: 1,
    isMobile: formato === 'mobile',
    hasTouch: formato === 'mobile',
    locale: 'en-US',
    timezoneId: 'America/New_York', // il listino geo-gated resta in USD, il default del sito
  });
  const page = await contesto.newPage();
  const esito = { slug, formato, url, consenso: null, errore: null };
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      esito.nota = 'networkidle non raggiunto entro 30s (tracking e chat restano attivi): si prosegue';
    }
    esito.consenso = await chiudiConsenso(page);
    await scorriTutto(page);

    // Lo screenshot full page ridimensiona la viewport all'altezza dell'intera
    // pagina, e quel resize fa rileggere a Webflow IX2 gli stati iniziali delle
    // animazioni "scroll into view": i titoli tornerebbero a opacity 0.
    // Quindi si allarga la viewport PRIMA, si riscorre per far scattare le
    // animazioni con tutto in vista, e solo dopo si scatta.
    const altezza = await page.evaluate(() => document.body.scrollHeight);
    await page.setViewportSize({
      width: VIEWPORT[formato].width,
      height: Math.min(Math.max(altezza, VIEWPORT[formato].height), 30000),
    });
    await page.waitForTimeout(600);
    await scorriTutto(page);
    await page.waitForTimeout(1500);
    const file = `${OUT}/${slug}-${formato}.png`;
    await page.screenshot({ path: file, fullPage: true });
    const dimensione = await page.evaluate(() => ({
      w: document.documentElement.scrollWidth,
      h: document.body.scrollHeight,
    }));
    esito.pagina = dimensione;
    console.log(
      `[OK] ${slug}-${formato}.png  ${dimensione.w}x${dimensione.h}  consenso: ${esito.consenso ?? 'nessun banner'}`,
    );
  } catch (e) {
    esito.errore = String(e.message || e);
    console.log(`[KO] ${slug}-${formato}: ${esito.errore}`);
  } finally {
    await contesto.close();
  }
  esiti.push(esito);
}

/** Scrive `screenshots/README.md` a partire da `_esiti.json`. */
async function scriviReadme() {
  const esiti = JSON.parse(await readFile(`${OUT}/_esiti.json`, 'utf8'));
  const data = esiti.generato.slice(0, 10);
  const righe = [
    '# Screenshot di riferimento del sito Webflow',
    '',
    `> Scattati il **${data}** da \`scripts/screenshot-riferimento.mjs\` su \`${esiti.base}\`.`,
    '> Sono la verità di riferimento per la parità visiva: il build Next.js va confrontato con questi,',
    '> non con il ricordo di come appare il sito.',
    '',
    '## Come sono fatti',
    '',
    '| | desktop | mobile |',
    '|---|---|---|',
    `| viewport | ${esiti.viewport.desktop.width}×${esiti.viewport.desktop.height} | ${esiti.viewport.mobile.width}×${esiti.viewport.mobile.height} |`,
    '| full page | sì | sì |',
    '| device scale factor | 1 | 1 |',
    '| touch / isMobile | no | sì |',
    `| user agent | \`${esiti.userAgent.desktop}\` | \`${esiti.userAgent.mobile}\` |`,
    '',
    `Locale \`en-US\`, timezone \`${esiti.timezone}\`. **Il timezone conta**: la pagina prezzi sceglie`,
    'la valuta dal fuso orario del browser (vedi `custom-code-per-pagina.md`). Con un fuso',
    'americano il listino resta in **USD**, che è il default del sito. Per catturare le versioni',
    'EUR o GBP serve rilanciare cambiando `timezoneId` nello script.',
    '',
    '## Sequenza di ogni scatto',
    '',
    '1. `goto` e attesa di `networkidle` (max 30s; se non arriva si prosegue, tracking e chat',
    '   tengono la rete occupata).',
    '2. **Banner consenso Iubenda**: si clicca il bottone di accettazione. Provati in ordine',
    '   `.iubenda-cs-accept-btn`, `#iubenda-cs-banner button.iubenda-cs-accept-btn`,',
    '   `[class*="iubenda-cs-accept"]`, `button:has-text("Accept")`, `button:has-text("Accetta")`.',
    '   **Cosa ha funzionato:** il primo, `.iubenda-cs-accept-btn`, su tutte le pagine.',
    '   La via del cookie pre-impostato (`_iub_cs-<siteId>`) è stata **scartata**: la CMP non è',
    '   nell\'HTML della pagina, la inietta GTM, quindi il `siteId` non è noto in anticipo e il',
    '   nome del cookie non si può indovinare.',
    '3. Scroll lento fino in fondo (passi del 70% della viewport, 220 ms l\'uno) e ritorno in cima:',
    '   fa partire le animazioni "scroll into view" di Webflow e carica le immagini lazy.',
    '4. **Allargamento della viewport all\'altezza dell\'intera pagina**, poi di nuovo lo scroll.',
    '   Serve per un motivo preciso: lo screenshot full page ridimensiona la viewport, e quel',
    '   resize fa rileggere a Webflow IX2 gli stati iniziali delle animazioni, riportando a',
    '   `opacity: 0` i titoli di sezione. Allargando prima e riscorrendo dopo, le animazioni',
    '   scattano con tutto in vista e restano.',
    '5. Attesa di 1,5 s, poi screenshot `fullPage`.',
    '',
    'I caroselli (Feedspace, Trustpilot, slider corsi) sono catturati nello stato iniziale.',
    'Il widget di chat Trengo resta visibile: fa parte del sito live, non è un artefatto.',
    '',
    '## Come rifarli',
    '',
    '```bash',
    'cd sito-ptdja/scripts',
    'npm install                      # solo la prima volta (playwright, node_modules ignorato)',
    './node_modules/.bin/playwright install chromium',
    'node screenshot-riferimento.mjs',
    '```',
    '',
    'Lo script è parametrico, così serve anche per confrontare il build Next.js:',
    '',
    '```bash',
    '# solo alcune pagine, solo desktop',
    'node screenshot-riferimento.mjs --slug home,pricing-page --solo desktop',
    '',
    '# gli stessi scatti sul build locale, in un\'altra cartella',
    'node screenshot-riferimento.mjs --base http://localhost:3000 --out ../docs/webflow/screenshots-next',
    '',
    '# rigenerare solo questo README da _esiti.json',
    'node screenshot-riferimento.mjs --readme',
    '```',
    '',
    '## Cosa c\'è',
    '',
    '| pagina | desktop (px) | mobile (px) |',
    '|---|---|---|',
  ];
  const per = {};
  for (const e of esiti.esiti) {
    per[e.slug] = per[e.slug] || {};
    per[e.slug][e.formato] = e.errore ? `errore: ${e.errore}` : `${e.pagina.w}×${e.pagina.h}`;
  }
  for (const [slug, v] of Object.entries(per)) {
    righe.push(`| \`${slug}\` | ${v.desktop ?? '—'} | ${v.mobile ?? '—'} |`);
  }
  righe.push('', 'Gli esiti macchina (URL, banner, dimensioni, errori) stanno in `_esiti.json`.', '');
  await writeFile(`${OUT}/README.md`, righe.join('\n'), 'utf8');
  console.log('[OK] README.md');
}

async function main() {
  await mkdir(OUT, { recursive: true });
  if (process.argv.includes('--readme')) {
    await scriviReadme();
    return;
  }
  const browser = await chromium.launch();
  const esiti = [];
  for (const slug of slugScelti) {
    if (!PAGINE[slug]) {
      console.log(`[!!] slug sconosciuto: ${slug}`);
      continue;
    }
    for (const formato of formati) {
      await scatta(browser, slug, formato, esiti);
    }
  }
  await browser.close();

  const banner = esiti.filter((e) => e.consenso).length;
  const falliti = esiti.filter((e) => e.errore);
  await writeFile(
    `${OUT}/_esiti.json`,
    JSON.stringify(
      {
        generato: new Date().toISOString(),
        base: BASE,
        viewport: VIEWPORT,
        userAgent: { desktop: UA_DESKTOP, mobile: UA_MOBILE },
        timezone: 'America/New_York',
        esiti,
      },
      null,
      2,
    ),
    'utf8',
  );
  await scriviReadme();
  console.log(
    `\nFatti ${esiti.length - falliti.length}/${esiti.length} screenshot. ` +
      `Banner consenso chiuso ${banner} volte. Falliti: ${falliti.length}.`,
  );
  if (falliti.length) process.exitCode = 1;
}

main();
