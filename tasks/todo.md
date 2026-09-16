# Piano: sito-ptdja, fase 1 (10 pagine)

> Piano da confermare prima di costruire. Spuntare man mano. Ultimo aggiornamento: 2026-09-14 (sera, ripresa Fable).

## 0. Fondamenta
- [x] Repo locale in `sito-ptdja/` (git init, `.gitignore`, `.env.example` vuoto, `CLAUDE.md` di progetto, `README.md`).
- [x] Scaffolding Next.js copiato dal repo landing (`repo-start`): `package.json`, `tsconfig`, Tailwind 4, `next.config.ts`, `test/rotte.mjs` adattato.
- [x] Componenti trasversali riusati dal repo landing: `Cmp` (Iubenda), `ConsentBridge`, `GoogleTags` (GTM via Stape), `Mixpanel`, `Clarity`, `Acquisition` (track.js con `data-landing="sito"`), `useConsentedScript`.
- [x] Script `cb push v2.2` portato tal quale in un componente `Attribution` (stesse chiavi `attr_*`, stesso cookie domain, stessi `FIELD_MAP`).
- [x] Refersion, Trustpilot bootstrap, vt-quiz.js come `next/script` con consenso dove serve.
- [x] Font via `next/font/google`: Oswald, Lato, Geist, Inter.
- [x] Vibe Shield: `/setup-security` sul repo nuovo.

## 1. Estrazione dal sito Webflow (nessuna modifica al sito live)
- [x] Per ognuna delle 10 pagine: HTML pubblicato salvato in `docs/webflow/<slug>.html`, CSS `mats-mubly.webflow.shared.*.css` salvato una volta.
- [x] Metadati via MCP: title, meta description, Open Graph, JSON-LD per pagina → `src/testi/<slug>.meta.ts`.
- [x] Asset: elenco degli URL immagine e video usati dalle 10 pagine, scaricati in `public/` con nomi leggibili, mappa vecchio URL → nuovo path.
- [x] Lottie del menu scaricato.
- [x] Screenshot di riferimento desktop (1440) e mobile (390) di ogni pagina, sopra e sotto la piega, con tutte le sezioni.

## 2. Ricostruzione pagina per pagina (Opus, un subagente per pagina, Fable verifica)
Ordine: prima le pagine semplici per stabilizzare header, footer e design token, poi le pesanti.
- [x] Header e footer condivisi (menu, dropdown, icona Lottie, CTA `Enroll now`), 404.
- [x] `terms-conditions` e `terms-conditions-sa` (testo lungo, pochi componenti).
- [x] `advanced-djs` (36KB, zero interazioni).
- [x] `recess`.
- [x] `pricing-page`: 3 piani × 2 cicli × 3 valute, 18 link Chargebee identici, meccanismo di scelta valuta da capire e replicare, tooltip nativo al posto di Flowbase.
- [x] `play-get-signed` (Talent Pool).
- [x] Home (59 interazioni, carosello corsi, Feedspace, Trustpilot, Wistia hero).
- [x] `dj-course` (77 interazioni, 19 riferimenti Wistia, FAQ).
- [x] `producer-course`.
- [x] `mix-mastering-course`.
Per ogni pagina: parità visiva desktop e mobile con lo screenshot di riferimento, link identici (checkout, campus, start, typeform, calendly), metadati identici, JSON-LD identico.

## 3. Tracking e attribuzione
- [x] Eventi Mixpanel del footer Webflow riprodotti (page view, CTA, navbar, pricing checkout clicked, FAQ, carosello) con gli stessi nomi e props.
- [x] Decorazione link carrello con `customer[cf_*]` verificata: confronto URL finale Webflow vs Next con gli stessi cookie `attr_*`.
- [x] `ptdja_identity_ready` nel dataLayer (verificato in locale con Playwright). GTM Preview verde: da fare sul deploy.
- [x] track.js proprietario: `data-landing` di test durante lo sviluppo (`sito-test` via VERCEL_ENV), `sito` in produzione.
- [x] `debug: false` su Mixpanel (nice to have, da decidere).

## 4. SEO e rotte
- [x] `sitemap.xml` e `robots.txt` equivalenti.
- [ ] Redirect 301 di Webflow replicati in `next.config.ts` (elenco da Matteo: export da Site settings → Publishing, **ancora mancante**).
- [x] Slug identici, trailing slash come Webflow.

## 5. Pubblicazione di test
- [x] Repo GitHub `mat-music-group/<nome>` creato, progetto Vercel collegato, commit con identità verificabile.
- [x] `/security-audit` e `/pre-deploy` prima del primo push.
- [ ] Sottodominio di test sul dominio del brand, verifica cookie `trk_vid` e `attr_*` sul dominio radice (oggi test su `ptdja-site.vercel.app`: i cookie di dominio radice non si scrivono, atteso).
- [x] `/post-deploy-check`.
- [ ] Lighthouse mobile prima (Webflow) e dopo (Vercel), stessa pagina, stesso giorno. Vercel home: 34, LCP 22,1 s (15/09); Webflow non misurato (PSI bloccata).

## Fase 2 (dopo)
- [ ] Blog headless dal CMS Webflow (lista, articolo, autori, categorie), rich text con gli embed HTML custom degli articoli.
- [ ] Elenco esplicito delle 42 pagine fuori sitemap: quali rifare, quali lasciare su Webflow, quali chiudere.
- [ ] Piano di cambio dominio.
