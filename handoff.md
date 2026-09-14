# HANDOFF: sito-ptdja

> Aggiornare a fine sessione / prima di /clear e /compact. Leggere all'inizio.
> Last updated: 2026-09-14

## 🎯 Goal
Rifare il sito Webflow di PTDJA in Next.js su Vercel, identico, in un repo separato per test. Intento completo in `desiderata.md`.

## 📁 Files I'm working on
- `desiderata.md`: intento, in attesa di conferma.
- `docs/inventario-webflow.md`: inventario completo di pagine, CMS, asset e custom code del sito Webflow (estratto via MCP il 14/09).
- Nessun codice ancora: il repo Next.js nasce dopo le risposte alle domande.

## ✅ Current state (what works)
- Webflow MCP funziona e vede il sito PTDJA (`677f9e71c11a68b86359df57`): pagine, metadati SEO, CMS, asset, custom code sito. Per il DOM delle pagine servono `data_element_tool` / `element_snapshot_tool` oppure lo scraping dell'HTML pubblicato più il CSS di Webflow.
- Modello di riferimento: `Funnel/Landing_ADV/PTDJA/repo-start` (Next 16, React 19, Tailwind 4, framer-motion, lenis; componenti `Acquisition`, `Mixpanel`, `Clarity`, `GoogleTags`, `Cmp`, `ConsentBridge`, test `test/rotte.mjs`).
- Conoscenza letta: `04-kit-landing.md`, `06-hosting-e-tool-interni.md`, `01-accessi-e-id.md`, `00-brand-e-stack.md`, onboarding landing.

## ⚠️ What didn't work / constraints
- Il guard Vibe Shield blocca dalla sessione `gh auth status`, `gh api user`, `vercel whoami`, i comandi con `&&` e gli heredoc: lo stato dei login va chiesto all'utente (`! gh auth status`), i file si scrivono con Write.
- `list_pages` Webflow restituisce 61KB: va letto dal file salvato con python, non a schermo.
- `get_site_scripts` risponde 404 (nessun registered script applicato a livello sito, il tracking è tutto nel custom code freeform).
- Mixpanel sul sito live gira con `debug: true`.

## 📌 Decisioni del 14/09 (sera)
Perimetro fase 1 = le 10 pagine in sitemap. Ricostruzione a componenti, non porting CSS. Blog in fase 2 come Webflow headless. Via Optibase, Intellimize (è Webflow Optimize) e Flowbase; tutto il resto resta (tabella in `desiderata.md`). **Nessun form Webflow sulle 10 pagine**: verificato su HTML live e su `list_forms` (27 form, tutti su pagine fuori scope). Font: Oswald, Lato, Geist, Inter da Google Fonts. Pricing: 18 link Chargebee (3 piani × 2 cicli × USD/EUR/GBP) tutti nell'HTML, meccanismo di scelta valuta ancora da capire.

HTML delle 10 pagine più `book-a-call` e `lite-version` già scaricato nello scratchpad di sessione (`scarica_pagine.py`), da rifare dentro `docs/webflow/` quando parte il repo.

## 🏗️ Fondamenta (agente Opus, 2026-09-14)

Sezione 0 del piano fatta: il repo Next.js esiste, compila, si avvia e passa il suo test. Zero pagine vere: solo un segnaposto "in costruzione" e una 404 segnaposto.

**File creati.** `package.json` (`ptdja-site`, stesse versioni del repo landing: Next 16.3.1, React 19.2.4, Tailwind 4, framer-motion 12; script `dev`/`build`/`start`/`test`/`typecheck`), `tsconfig.json`, `postcss.config.mjs`, `next.config.ts`, `.gitignore`, `.env.example`, `README.md`, `.github/workflows/ci.yml`. Poi `src/app/` (`layout.tsx`, `globals.css`, `page.tsx`, `not-found.tsx`, `robots.ts`), `src/components/tracking/` (`Mixpanel`, `Attribution`, `GoogleTags`, `Clarity`, `Acquisition`, `VtQuiz`, `Trustpilot`, `Cmp`, `ConsentBridge`, `GoogleConsentBridge`), `src/lib/` (`analytics.config.ts`, `mixpanel.ts`, `iubenda.config.json`), `public/js/attribution.js`, `test/rotte.mjs`.

**Riusato dal repo landing** (`Funnel/Landing_ADV/PTDJA/repo-start`): tsconfig e postcss identici, versioni delle dipendenze, struttura di `next.config.ts`, la CI, l'impianto di `test/rotte.mjs`, la configurazione Iubenda, e i componenti `Cmp`, `ConsentBridge`, `GoogleConsentBridge`, `Clarity`, `Mixpanel`.

**Cambiato rispetto al modello.** `GoogleTags` è un componente nuovo: sul sito GTM si carica col loader Stape (`sgtm.petetong-djacademy.com/ezffoibuv.js`, container offuscato) più il `<noscript>` verso `googletagmanager.com/ns.html?id=GTM-WLFQB5G`, riprodotti verbatim; le landing invece chiamano GA4 e Google Ads a codice, e quella versione qui non c'è. Tolti dal `next.config.ts` i redirect e tutto ciò che riguarda l'A/B test. `ConsentBridge` ha perso la metà che pilotava `meta.js` (non installato) e resta solo come lettore del consenso. `Attribution` è nuovo: `public/js/attribution.js` è la copia **verbatim** del blocco "cb push v2.2" dell'`<head>` Webflow, caricato con `next/script` `afterInteractive`. `Trustpilot` espone un widget riusabile invece di stare nel layout.

**Verifiche.** `tsc --noEmit` pulito; `next build` pulito (4 pagine statiche, nessun warning); `npm test` verde contro `next start` in locale, 24 controlli su 2 rotte, 0 errori. Il test verifica su `/` e `/404`: status, presenza del `<title>`, presenza di `sgtm.petetong-djacademy.com`, `clarity.ms`, `tool.ptdja.com/tracking/track.js`, `/js/attribution.js`, `api-eu.mixpanel.com`, assenza di `optibase`, `intellimize`, `refersion`, `flowbase`, più `robots.txt` che blocca la scansione.

**Divergenze volute dal sito Webflow** (tutte dichiarate nel commento del file che le contiene):
1. `debug: false` su Mixpanel. Sul live è `true` e logga in console a ogni visitatore.
2. Un solo progetto Clarity (`qgyx8qgz1i`, quello del checkout). Il sito ne carica **due** (`gqhhopgpjt` e `qgyx8qgz1i`): ogni visita è registrata due volte.
3. Optibase, Intellimize, Flowbase, Refersion e Trengo non installati (i primi quattro per decisione del 14/09; Trengo non era nell'elenco della sezione 0, va deciso).
4. Trustpilot non è nel layout: lo monta la pagina che ha un widget. Sul sito è nell'`<head>` di tutte.
5. GTM sta in fondo al `<body>` e non nell'`<head>`: è l'ordine chiesto dal piano. Conseguenza: il banner Iubenda, che arriva da GTM, compare un po' più tardi. Da riguardare quando le pagine vere saranno lunghe.
6. `robots.txt` blocca tutto (`Disallow: /`): siamo su un URL di test. **Da aprire al cambio dominio**, insieme al controllo corrispondente in `test/rotte.mjs`.

**Riprodotto senza correggere, come vuole la regola numero uno:** Clarity non è dietro il consenso, esattamente come sul sito, che non carica nemmeno l'autoblocking di Iubenda. Sul repo landing invece Clarity non parte finché la finalità 4 non è concessa. È il tag più invasivo installato (registra lo schermo): gattarlo è una modifica di comportamento, va decisa.

**Dubbi aperti, in ordine di peso:**
1. **Mixpanel senza guardia sull'hostname.** Il repo landing ha un `if` che impedisce a localhost e alle anteprime di scrivere nel progetto di produzione. Qui non c'è, perché la fase di test vive su `*.vercel.app` e uno dei criteri di successo è proprio che Mixpanel veda gli stessi eventi. Il prezzo: finché siamo su un URL di prova, gli eventi di sviluppo finiscono nel progetto vero, e dentro Mixpanel non si cancellano. Da confermare prima di mandare traffico.
2. **`src/lib/iubenda.config.json` NON è la configurazione del sito**, è quella della landing. Il sito non ha nessuna `csConfiguration` nell'HTML (zero occorrenze in tutte le pagine scaricate): la carica GTM. La differenza più visibile è il `cookiePolicyId` (40840624 sul sito, 27491891 nel file). Va estratta dalla console (`copy(window._iub.csConfiguration)`) prima di montare `Cmp`, e `Cmp` non va montato finché il template Iubenda è dentro GTM.
3. `data-landing` sceglie fra `sito` e `sito-test` leggendo `VERCEL_ENV` e `VERCEL_PROJECT_PRODUCTION_URL` a build, non l'header `host` della richiesta: `headers()` renderebbe dinamica ogni pagina del sito. Da riverificare sul primo deploy che il valore sia `sito-test`.
4. **Trengo** (widget di chat, `static.widget.trengo.eu`) è nell'`<head>` del sito e non compare in nessuna decisione: resta o va?
5. `next/script` `afterInteractive` non mette il tag nell'HTML servito, mette un `<link rel="preload">` e inietta lo script dopo l'idratazione. Vale per `track.js`, `vt-quiz.js` e `attribution.js`. Funziona (è il modo documentato dal kit) ma va verificato dal vivo che `track.js` legga i suoi `data-*` e che `attribution.js` decori i link: il `boot()` regge il DOM già pronto, ma la prova sta nel cookie.

## 👉 Next steps (what I'd do next)
1. Estrazione (sezione 1 del piano): HTML e CSS in `docs/webflow/`, metadati, asset, Lottie, screenshot di riferimento.
2. Sciogliere i dubbi 1, 2 e 4 qui sopra con Matteo.
3. Ricostruzione pagina per pagina con Opus, verifica screenshot con Fable.
4. Eventi Mixpanel del footer, verifica della decorazione dei link al carrello, audit Vibe Shield, deploy di test.
