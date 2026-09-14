# Piano: sito-ptdja, fase 1 (10 pagine)

> Piano da confermare prima di costruire. Spuntare man mano. Ultimo aggiornamento: 2026-09-14.

## 0. Fondamenta
- [ ] Repo locale in `sito-ptdja/` (git init, `.gitignore`, `.env.example` vuoto, `CLAUDE.md` di progetto, `README.md`).
- [ ] Scaffolding Next.js copiato dal repo landing (`repo-start`): `package.json`, `tsconfig`, Tailwind 4, `next.config.ts`, `test/rotte.mjs` adattato.
- [ ] Componenti trasversali riusati dal repo landing: `Cmp` (Iubenda), `ConsentBridge`, `GoogleTags` (GTM via Stape), `Mixpanel`, `Clarity`, `Acquisition` (track.js con `data-landing="sito"`), `useConsentedScript`.
- [ ] Script `cb push v2.2` portato tal quale in un componente `Attribution` (stesse chiavi `attr_*`, stesso cookie domain, stessi `FIELD_MAP`).
- [ ] Refersion, Trustpilot bootstrap, vt-quiz.js come `next/script` con consenso dove serve.
- [ ] Font via `next/font/google`: Oswald, Lato, Geist, Inter.
- [ ] Vibe Shield: `/setup-security` sul repo nuovo.

## 1. Estrazione dal sito Webflow (nessuna modifica al sito live)
- [ ] Per ognuna delle 10 pagine: HTML pubblicato salvato in `docs/webflow/<slug>.html`, CSS `mats-mubly.webflow.shared.*.css` salvato una volta.
- [ ] Metadati via MCP: title, meta description, Open Graph, JSON-LD per pagina → `src/testi/<slug>.meta.ts`.
- [ ] Asset: elenco degli URL immagine e video usati dalle 10 pagine, scaricati in `public/` con nomi leggibili, mappa vecchio URL → nuovo path.
- [ ] Lottie del menu scaricato.
- [ ] Screenshot di riferimento desktop (1440) e mobile (390) di ogni pagina, sopra e sotto la piega, con tutte le sezioni.

## 2. Ricostruzione pagina per pagina (Opus, un subagente per pagina, Fable verifica)
Ordine: prima le pagine semplici per stabilizzare header, footer e design token, poi le pesanti.
- [ ] Header e footer condivisi (menu, dropdown, icona Lottie, CTA `Enroll now`), 404.
- [ ] `terms-conditions` e `terms-conditions-sa` (testo lungo, pochi componenti).
- [ ] `advanced-djs` (36KB, zero interazioni).
- [ ] `recess`.
- [ ] `pricing-page`: 3 piani × 2 cicli × 3 valute, 18 link Chargebee identici, meccanismo di scelta valuta da capire e replicare, tooltip nativo al posto di Flowbase.
- [ ] `play-get-signed` (Talent Pool).
- [ ] Home (59 interazioni, carosello corsi, Feedspace, Trustpilot, Wistia hero).
- [ ] `dj-course` (77 interazioni, 19 riferimenti Wistia, FAQ).
- [ ] `producer-course`.
- [ ] `mix-mastering-course`.
Per ogni pagina: parità visiva desktop e mobile con lo screenshot di riferimento, link identici (checkout, campus, start, typeform, calendly), metadati identici, JSON-LD identico.

## 3. Tracking e attribuzione
- [ ] Eventi Mixpanel del footer Webflow riprodotti (page view, CTA, navbar, pricing checkout clicked, FAQ, carosello) con gli stessi nomi e props.
- [ ] Decorazione link carrello con `customer[cf_*]` verificata: confronto URL finale Webflow vs Next con gli stessi cookie `attr_*`.
- [ ] `ptdja_identity_ready` nel dataLayer, GTM Preview verde.
- [ ] track.js proprietario: `data-landing` di test durante lo sviluppo, `sito` in produzione.
- [ ] `debug: false` su Mixpanel (nice to have, da decidere).

## 4. SEO e rotte
- [ ] `sitemap.xml` e `robots.txt` equivalenti.
- [ ] Redirect 301 di Webflow replicati in `next.config.ts` (elenco da Matteo).
- [ ] Slug identici, trailing slash come Webflow.

## 5. Pubblicazione di test
- [ ] Repo GitHub `mat-music-group/<nome>` creato, progetto Vercel collegato, commit con identità verificabile.
- [ ] `/security-audit` e `/pre-deploy` prima del primo push.
- [ ] Sottodominio di test sul dominio del brand, verifica cookie `trk_vid` e `attr_*` sul dominio radice.
- [ ] `/post-deploy-check`.
- [ ] Lighthouse mobile prima (Webflow) e dopo (Vercel), stessa pagina, stesso giorno.

## Fase 2 (dopo)
- [ ] Blog headless dal CMS Webflow (lista, articolo, autori, categorie), rich text con gli embed HTML custom degli articoli.
- [ ] Elenco esplicito delle 42 pagine fuori sitemap: quali rifare, quali lasciare su Webflow, quali chiudere.
- [ ] Piano di cambio dominio.
