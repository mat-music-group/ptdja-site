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

## 📸 Estrazione riferimento Webflow (agente Opus, 2026-09-14)

Sezione 1 del piano **fatta**. Tutto letto, niente scritto sul sito Webflow. Il riferimento vive in `docs/webflow/` ed è interamente rigenerabile dagli script in `scripts/`. Punto di partenza obbligato per chi ricostruisce: `docs/webflow/README.md`.

**Numeri.** 11 pagine scaricate su 11 (10 in sitemap più la 404, presa chiedendo `/pagina-che-non-esiste-xyz`). 180 asset scaricati su 180, 20,78 MB, zero errori. 22 screenshot su 22 (11 desktop 1440×900 + 11 mobile 390×844, full page). CSS Webflow unico per tutto il sito, 731 KB, salvato anche in versione leggibile. Interazioni Webflow (`data-w-id`) per pagina: home 59, dj-course 77, producer-course 77, mix-mastering-course 47, play-get-signed 30, pricing-page 13, 404 7, terms-conditions 6, recess 5, terms-conditions-sa 5, advanced-djs 0.

**File prodotti.**
- `docs/webflow/README.md`: indice, procedura, e le scoperte da leggere prima di scrivere codice.
- `docs/webflow/html/<slug>.html`: 11 file, HTML pubblicato così com'è.
- `docs/webflow/css/mats-mubly.webflow.shared.6b73890bb.css` + `.pretty.css` + `SORGENTE.txt`.
- `docs/webflow/custom-code-head.html` (14.854 byte) e `custom-code-footer.html` (16.917 byte): custom code **di sito**, verificato identico byte per byte su tutte e 11 le pagine.
- `docs/webflow/custom-code-per-pagina.md`: embed, script e stili di pagina con testo integrale, più la spiegazione lunga della logica valuta e del toggle prezzi.
- `docs/webflow/meta/<slug>.json` (11) + `meta/_tutte.json`: title, description, canonical, OG, Twitter, robots, favicon, webclip, JSON-LD completo come oggetto.
- `docs/webflow/outline/<slug>.md` (11) + `_header-footer.md` + `_riepilogo.md`: ~494 KB di struttura, ogni stringa copiata dall'HTML.
- `docs/webflow/asset-map.json`: mappa `URL Webflow → path nel repo`, con pagine, `alt` e larghezze `srcset`.
- `docs/webflow/design-tokens.md`: 24 variabili `:root`, 215 colori con conteggio, font e pesi, breakpoint, container, raggi, ombre.
- `docs/webflow/screenshots/`: 22 PNG + `README.md` + `_esiti.json`.
- `public/webflow/{shared,home,dj-course,producer-course,mix-mastering-course,play-get-signed,404}/`: 180 asset, nomi kebab-case senza hash Webflow.
- `scripts/`: `estrai-riferimento.py` (orchestratore punti 1-7), `_comune.py`, `scarica-html.py`, `scarica-css.py`, `estrai-custom-code.py`, `estrai-meta.py`, `estrai-outline.py`, `estrai-asset.py`, `estrai-design-tokens.py`, `screenshot-riferimento.mjs`, più `package.json` e `.gitignore` del sottoprogetto Playwright.

**Domanda aperta 2 di `desiderata.md` risolta: come si sceglie la valuta.** Non c'è nessuno switch. Le tre versioni del listino (USD, EUR, GBP) stanno tutte nel DOM e uno script incollato in un embed Webflow, *GEO-GATED REGION BLOCKER v0.3*, ne mostra una sola. Nasconde tutto via CSS (`[data-ms-code] { display:none !important }`), stima il paese in cascata — cache in `localStorage` 60 minuti → fuso orario (`Intl.DateTimeFormat`, tabella scritta a mano) → lingua del browser → `fetch` su `cloudflare.com/cdn-cgi/trace` con timeout 2,5 s → fallback `US` — e poi accende con la classe `ms-geo-visible` gli elementi `data-ms-code="locale-show"` il cui `data-ms-countries` contiene quel paese, e quelli `locale-hide` che non lo contengono. USD è il default, nascosto nei paesi euro e in GB; EUR nei 26 paesi elencati; GBP in `GB, UK`. Il toggle annuale/trimestrale è invece doppio: uno script jQuery `#packageSwitch` che anima i numeri fra `data-month` e `data-year`, e un'interazione Webflow che scambia i due bottoni. **Trappola:** i nomi sono invertiti, `.is_monthly` è il piano annuale e `.is_annual` il trimestrale, e `data-month` (13/19/24) è il mensile equivalente dell'annuale mentre `data-year` (19/29/39) è il trimestrale.

**Componenti condivisi, non solo simili** (stesso testo, non solo stessa classe): header `div.header-2.sticky-bg.new-home-2` su 8 pagine; footer `section.footer-section` su 8; blocco prezzi `div.cloneable-container-default-2.center` su 6 con 5.499 caratteri identici e gli stessi 18 link Chargebee; sezione recensioni Feedspace + Trustpilot su 6; popup exit intent su 6; CTA "More Than a Course" su 3. La sezione FAQ è condivisa come struttura ma non come contenuto: 15 domande sulla home, 7 su ciascuna delle altre cinque.

**Varianti da non perdere.** `recess` e `terms-conditions-sa` usano header e footer **vecchi** e diversi (footer con "Connecting 8000+ DJs in 140 countries" invece di "Connecting thousands of DJs and producers"), e i loro due footer differiscono anche fra loro. `advanced-djs` non ha né header né footer: è una pagina nuda con dentro solo un iframe VideoAsk (`videoask.com/fu1pxfvu9`) e un link. Attenzione a `section.hero-section-two-2.newheader` sulle tre pagine corso: malgrado il nome è la hero, non un header.

**Cose trovate che chiedono una decisione.**
1. **Trengo** (chat, `window.Trengo.key = 'tXUJdf3UvUi255j6ncl8'`) è nel custom code **di pagina** di home, dj-course, producer-course, mix-mastering-course, pricing-page e play-get-signed. Conferma il dubbio 4 della sezione Fondamenta: non è in nessuna decisione presa.
2. Sulle stesse 6 pagine c'è un **secondo blocco Refersion duplicato**, con la sintassi rotta (`.then(() =>; {`): lancia un `SyntaxError` e non parte mai. Refersion è comunque già deciso "via".
3. La **404 punta a `/old-home`**, sia nel paragrafo sia nel bottone "Go back home". Da riprodurre così e segnalare, non da correggere in silenzio (regola numero uno).
4. **Clarity nell'HTML è uno solo** (`qgyx8qgz1i`), su tutte e 11 le pagine. Se sul live se ne vedono due, il secondo arriva da GTM, non dal custom code: la verifica va fatta in GTM, non nel codice del sito.
5. Nessuna `csConfiguration` Iubenda nell'HTML di nessuna pagina: la CMP arriva da GTM. Conferma il dubbio 2 della sezione Fondamenta.

**Cosa non è riuscito / limiti noti.**
- Gli screenshot sono stati scattati con timezone `America/New_York`, quindi **il listino è in USD**. Le versioni EUR e GBP non ci sono: per averle bisogna rilanciare lo script cambiando `timezoneId`.
- I caroselli (slider corsi, Feedspace, Trustpilot) sono nello stato iniziale, come da consegna.
- Il widget di chat Trengo compare negli screenshot: fa parte del sito live, non è un artefatto.
- `networkidle` non sempre arriva entro 30 s (tracking e chat tengono la rete aperta): lo script prosegue e lo annota in `_esiti.json`.
- Trappola risolta e documentata: lo screenshot `fullPage` ridimensiona la viewport, e quel resize fa rileggere a Webflow IX2 gli stati iniziali delle animazioni, riportando a `opacity: 0` i titoli di sezione. La soluzione è allargare la viewport **prima** e riscorrere dopo. Vale anche per gli screenshot del build Next.js.
- Il banner Iubenda si chiude cliccando `.iubenda-cs-accept-btn` (funziona su tutte le pagine). La via del cookie `_iub_cs-<siteId>` pre-impostato è stata scartata: il `siteId` non è nell'HTML perché la CMP la inietta GTM.
- Gli asset referenziati dal CSS Webflow via `url()` **non** sono stati scaricati: la consegna riguardava quelli usati dall'HTML. Se in ricostruzione manca un'immagine di sfondo, è lì che va cercata.

## 👉 Next steps (what I'd do next)
1. ~~Estrazione (sezione 1 del piano)~~ **fatta**, vedi sopra. Da qui in poi il riferimento è `docs/webflow/`.
2. Sciogliere i dubbi 1, 2 e 4 qui sopra con Matteo.
3. Ricostruzione pagina per pagina con Opus, verifica screenshot con Fable.
4. Eventi Mixpanel del footer, verifica della decorazione dei link al carrello, audit Vibe Shield, deploy di test.
