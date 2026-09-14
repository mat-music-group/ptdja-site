/*
 *  IL CANCELLO.
 *
 *  Adattato da `test/rotte.mjs` del repo landing
 *  (`Funnel/Landing_ADV/PTDJA/repo-start`). Là verifica il contratto degli slug
 *  di acquisizione; qui verifica il contratto del sito: che ogni rotta risponda,
 *  che porti un titolo, e soprattutto che l'HTML servito contenga il
 *  tracciamento che il sito Webflow ha davvero e NON contenga gli script che
 *  abbiamo deciso di non portare.
 *
 *  Uso, con un `next start` già in ascolto:
 *     npm run build
 *     npm run start -- -p 3699 &
 *     BASE=http://localhost:3699 npm test
 *
 *  PERCHÉ SULL'HTML SERVITO e non sui file sorgente. Un componente che monta il
 *  tag giusto non dimostra che il tag sia finito in pagina: `next/script` lo
 *  inietta con strategie diverse, un componente può non essere montato, un
 *  albero può cambiare. Un controllo che legge i sorgenti verifica le intenzioni,
 *  questo verifica il risultato.
 *
 *  PERCHÉ LE STRINGHE PROIBITE SONO UN ERRORE E NON UN AVVISO. Optibase,
 *  Intellimize, Flowbase e Refersion sono quattro script che sul Webflow ci sono
 *  e che qui, per decisione presa il 2026-09-14 e scritta in `desiderata.md`, non
 *  devono esistere. Ricostruendo una pagina alla volta copiando dall'HTML di
 *  origine, il modo più facile di sbagliare è portarsene dietro uno per inerzia.
 *  Questo test è l'unica cosa che se ne accorge.
 *
 *  Le rotte controllate crescono con le pagine: oggi ci sono solo `/` e la 404,
 *  perché le pagine vere non sono ancora state ricostruite.
 */

const BASE = process.env.BASE || "http://localhost:3699";

/*
 * Prima di tutto: c'è qualcuno in ascolto?
 *
 * Senza questo controllo, con il server spento fallisce la prima `fetch` e
 * quello che si legge è uno stack trace su ECONNREFUSED. Sembra un test rotto,
 * non un server spento, e chi lo incontra al primo uso smette di usarlo. Exit 2
 * per distinguerlo da exit 1, che significa «il contratto è violato».
 */
try {
  await fetch(BASE + "/");
} catch {
  console.error(
    `\nNessuna risposta da ${BASE}.\n\n` +
      `Questo test gira sull'HTML servito da un build di produzione, quindi serve un server:\n` +
      `   npm run build\n` +
      `   npm run start -- -p 3699\n` +
      `e poi, in un altro terminale:\n` +
      `   npm test\n\n` +
      `Con un'altra porta o un altro host, passalo in BASE.\n`
  );
  process.exit(2);
}

const errori = [];
let controlli = 0;

function esige(condizione, messaggio) {
  controlli++;
  if (!condizione) errori.push(messaggio);
}

/* ── Le rotte e il loro stato atteso ───────────────────────────────
   `/404` non è un file in `src/app`: è un indirizzo che non esiste, e serve
   proprio a questo. Chiedendolo si verifica che Next risponda 404 e serva
   `not-found.tsx` dentro il layout, cioè col tracciamento montato. Una 404 che
   perde il layout è una pagina su cui il visitatore esiste e non viene contato. */
const ROTTE = [
  { path: "/", status: 200, nome: "home (segnaposto)" },
  { path: "/404", status: 404, nome: "404" },
  { path: "/terms-conditions", status: 200, nome: "terms-conditions" },
  { path: "/terms-conditions-sa", status: 200, nome: "terms-conditions-sa" },
  { path: "/recess", status: 200, nome: "recess" },
  { path: "/advanced-djs", status: 200, nome: "advanced-djs" },
  { path: "/pricing-page", status: 200, nome: "pricing-page" },
];

/* ── Ciò che deve esserci, e ciò che non deve esserci ──────────────
 *
 * Ogni stringa qui sotto viene dal custom code del sito Webflow, letto
 * dall'HTML pubblicato il 2026-09-14. Non sono nomi di prodotto scelti a mano:
 * sono i frammenti che identificano ciascuno script in modo non ambiguo.
 */
const OBBLIGATORI = [
  {
    frammento: "sgtm.petetong-djacademy.com",
    perche:
      "il loader GTM di Stape. Senza, non parte nessun tag del container GTM-WLFQB5G: " +
      "niente GA4, niente pixel Meta, e niente Cookie Solution di Iubenda, che sul sito arriva da lì",
  },
  {
    frammento: "clarity.ms",
    perche: "Microsoft Clarity: nessuna heatmap e nessuna registrazione di sessione",
  },
  {
    frammento: "tool.ptdja.com/tracking/track.js",
    perche:
      "il tracciamento proprietario. Senza, non esiste il cookie trk_vid e quindi " +
      "non esiste nessun collegamento fra il sito e il checkout su cart.*",
  },
  {
    frammento: "/js/attribution.js",
    perche:
      "lo script cb push (public/js/attribution.js): cookie attr_* sul dominio radice e " +
      "decorazione dei link al carrello con customer[cf_*]. Senza, ogni acquisto arriva in " +
      "Chargebee senza campagna",
  },
  {
    frammento: "api-eu.mixpanel.com",
    perche: "Mixpanel sulla regione EU. Un init senza api_host manderebbe i dati sul progetto sbagliato",
  },
];

const PROIBITI = [
  { frammento: "optibase", perche: "A/B test di terza parte: sostituito dal tool A/B del gruppo" },
  {
    frammento: "intellimize",
    perche: "Webflow Optimize: non esiste fuori da Webflow, e qui non c'è niente da personalizzare",
  },
  { frammento: "refersion", perche: "tracking affiliati: programma chiuso (Matteo, 14/09/2026)" },
  { frammento: "flowbase", perche: "libreria di tooltip per Webflow: il tooltip si rifà nativo" },
];

/* ── I controlli, rotta per rotta ─────────────────────────────────── */
for (const r of ROTTE) {
  const url = BASE + r.path;
  const res = await fetch(url);

  esige(res.status === r.status, `${r.path} (${r.nome}) risponde HTTP ${res.status}, atteso ${r.status}`);

  const html = await res.text();
  const minuscolo = html.toLowerCase();

  const titolo = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "";
  esige(
    titolo.trim().length > 0,
    `${r.path}: nessun <title>. È la prima cosa che si vede in un risultato di ricerca e in una scheda del browser`
  );

  for (const { frammento, perche } of OBBLIGATORI) {
    esige(
      minuscolo.includes(frammento.toLowerCase()),
      `${r.path}: manca "${frammento}" nell'HTML servito. È ${perche}`
    );
  }

  for (const { frammento, perche } of PROIBITI) {
    esige(
      !minuscolo.includes(frammento),
      `${r.path}: l'HTML servito contiene "${frammento}", che non deve esistere in questo repo (${perche})`
    );
  }
}

/* ── robots.txt ────────────────────────────────────────────────────
   Finché siamo su un URL di test, il sito non deve essere scansionato: è una
   copia di un sito già indicizzato, e il danno del contenuto duplicato lo
   prende l'originale. Quando si cambia dominio questo controllo va cambiato
   insieme a `src/app/robots.ts`, e il fatto che fallisca è il promemoria. */
{
  const res = await fetch(BASE + "/robots.txt");
  esige(res.ok, `/robots.txt risponde HTTP ${res.status}`);
  const testo = res.ok ? await res.text() : "";
  esige(
    /Disallow:\s*\/\s*$/m.test(testo),
    `/robots.txt non blocca la scansione. Su un URL di test deve farlo: ` +
      `se invece il dominio è cambiato, aggiorna insieme robots.ts e questo controllo`
  );
}

/* ── Esito ────────────────────────────────────────────────────────── */
console.log(`\n${controlli} controlli su ${ROTTE.length} rotte\n`);
for (const e of errori) console.log(`  ERRORE  ${e}`);

if (errori.length === 0) {
  console.log(`0 errori. Il contratto delle rotte è rispettato.`);
  process.exit(0);
}
console.log(`\n${errori.length} errori. Gli errori bloccano il merge.`);
process.exit(1);
