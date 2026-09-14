# CLAUDE.md: sito-ptdja

> Repo del nuovo sito Pete Tong DJ Academy (PTDJA) in Next.js su Vercel. Rifà **in modo identico** il sito Webflow `www.petetong-djacademy.com`. Le regole di gruppo (`../CLAUDE.md`) e globali restano valide. Intento in `desiderata.md`, stato in `handoff.md`, piano in `tasks/todo.md`, inventario Webflow in `docs/inventario-webflow.md`.

## Regola numero uno: identico, non migliore
Nessun redesign, nessun cambio di copy, nessuna sezione in più o in meno. Il riferimento è l'HTML pubblicato salvato in `docs/webflow/<slug>.html` più gli screenshot in `docs/webflow/screenshots/`. Se una cosa sul sito Webflow sembra sbagliata, si riproduce e si segnala in `handoff.md`, non si corregge in silenzio.

## Perimetro fase 1 (10 pagine + 404)
`/` (home), `/dj-course`, `/producer-course`, `/mix-mastering-course`, `/pricing-page`, `/play-get-signed`, `/advanced-djs`, `/recess`, `/terms-conditions`, `/terms-conditions-sa`, `/404`. Slug identici a Webflow. Blog e altre pagine in fase 2.

## Stack e convenzioni
- Next.js (App Router) + React + TypeScript + Tailwind 4 + framer-motion, come `Funnel/Landing_ADV/PTDJA/repo-start` (repo `mat-music-group/djcoursepetetong`), che è il modello: stesse versioni, stessa struttura `src/app`, `src/components`, `src/lib`, `src/testi`.
- Testi e contenuti di pagina in `src/testi/<slug>.ts` (tipati), non hardcoded nei componenti. Il contenuto resta in inglese com'è sul sito. Commenti e documentazione in italiano, come nel repo landing.
- Componenti a sezione: una sezione Webflow = un componente. Componenti condivisi (Header, Footer, Cta, Faq, Pricing…) in `src/components/`.
- Immagini via `next/image` da `public/`, con nomi leggibili. Mappa vecchio URL Webflow → nuovo path in `docs/webflow/asset-map.json`.
- Font via `next/font/google`: Oswald, Lato, Geist, Inter (quelli caricati da Webflow con WebFont.load).
- Test rotte: `test/rotte.mjs` adattato dal repo landing (status, title, meta, og, JSON-LD, link al carrello).

## Tracking e attribuzione: riusare, non riscrivere
Il sito Webflow ha nel custom code (salvato in `docs/webflow/custom-code-head.html` e `custom-code-footer.html`):
1. GTM web `GTM-WLFQB5G` via loader Stape su `sgtm.petetong-djacademy.com` (script custom, con noscript nel footer).
2. **cb push v2.2**: attribuzione e identità (`attr_*` su cookie dominio radice `.petetong-djacademy.com` + localStorage + sessionStorage, `ptdja_uid`, decorazione dei link verso `cart.petetong-djacademy.com` con `customer[cf_*]`, gating sul consenso Iubenda, evento `ptdja_identity_ready` nel dataLayer). **Va portato tal quale**, stesse chiavi, stesse costanti, stesso comportamento.
3. Microsoft Clarity `qgyx8qgz1i`.
4. Mixpanel EU token `4e4bed2fb5993428b67208cffda63ae3`, `persistence: cookie`, `cross_subdomain_cookie: true`, più gli eventi custom del footer (Page View, CTA Click, Navbar Link Clicked, Pricing Checkout Clicked, Tracked FAQ Opened, Course Card Click, Book Free Call CTA, Trustpilot CTA Clicked, alias su thank you). Stessi nomi evento e stesse props.
5. Tracking proprietario `https://tool.ptdja.com/tracking/track.js` con `data-brand="ptdja"`, `data-landing="sito"`, `data-endpoint="https://tool.ptdja.com"`, `data-engagement="off"`.
6. `https://tool.ptdja.com/landing-kit/kit/vt-quiz.js` con `data-quiz="https://start.petetong-djacademy.com/virtualtour-form"`.
7. Iubenda CMP (config nell'HTML di ogni pagina).
8. Trustpilot bootstrap e widget, Feedspace embed, Wistia, Lottie.
9. Trengo (chat), custom code **di pagina**: componente `Trengo` da montare solo su home, dj-course, producer-course, mix-mastering-course, pricing-page, play-get-signed. Non sulle altre.

Iubenda: sul sito la Cookie Solution la carica **GTM** (nessuna `csConfiguration` nell'HTML). Quindi `Cmp` e `GoogleConsentBridge` del repo landing NON vanno montati: il banner arriva dal container.

**Parti dai componenti del repo landing** (`src/components/` di `repo-start`: `Cmp`, `ConsentBridge`, `GoogleConsentBridge`, `GoogleTags`, `Mixpanel`, `Clarity`, `Acquisition`, `useConsentedScript`, `src/lib/analytics.config.ts`, `src/lib/iubenda.config.json`) e adattali: il sito, a differenza delle landing, carica GTM via Stape e NON usa `meta.js` del landing kit (il pixel Meta passa da GTM: aggiungere `meta.js` duplicherebbe gli eventi).

**Non installare**: Optibase, Intellimize / Webflow Optimize (attributi `data-wf-ao-*`, `intellimize`), Flowbase tooltip (tooltip nativo), Refersion (programma affiliati chiuso). Nessuna variabile d'ambiente serve al tracking: se ne stai aggiungendo una, stai sbagliando (`_conoscenza-condivisa/04-kit-landing.md`).

Durante lo sviluppo su preview o locale usa `data-landing="sito-test"` per non sporcare la dashboard; `sito` solo quando il dominio sarà quello vero. Su `*.vercel.app` i cookie di dominio radice non si scrivono: è atteso, si verifica dopo il cambio dominio.

## Verifica prima di dire "fatto"
- `npx tsc --noEmit` pulito, `npm run build` pulito, `npm test` verde.
- Per ogni pagina: screenshot desktop (1440) e mobile (390) del build locale confrontato con quello di riferimento in `docs/webflow/screenshots/`. Stessa sequenza di sezioni, stessi testi, stessi link (carrello, campus, start, Typeform, Calendly), stessi metadati e JSON-LD.
- Nessun testo inventato: ogni stringa in `src/testi/` viene dall'HTML Webflow.

## Git e pubblicazione
- Commit come `mat-music-group <293055991+mat-music-group@users.noreply.github.com>` (git config locale del repo), altrimenti Vercel blocca il deploy (`06-hosting-e-tool-interni.md`). Conventional Commits, niente firme dell'assistente.
- Repo GitHub `mat-music-group/ptdja-site`, progetto Vercel `ptdja-site`, team `mat-music-group-s-projects`.
- Prima di ogni push: `/security-audit` poi `/pre-deploy`. Niente segreti nel repo.
- Il sito Webflow live **non si tocca** durante lo sviluppo.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
