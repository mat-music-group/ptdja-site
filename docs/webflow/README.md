# Riferimento Webflow: cosa c'è qui e come è stato prodotto

> Fotografia del sito Webflow `www.petetong-djacademy.com` al **2026-09-14**
> (ultima pubblicazione Webflow: *Fri Sep 11 2026 14:13:38 GMT*).
> È la **verità di riferimento** per la ricostruzione in Next.js: se qualcosa qui
> non torna con quello che si sta scrivendo, ha ragione questa cartella.
> Il sito Webflow live non è stato toccato: tutto è stato letto via `curl` e Playwright.

Regola del progetto (`../../CLAUDE.md`): **identico, non migliore**. Ogni stringa, ogni
link e ogni immagine del nuovo sito viene da qui. Se una cosa sul sito Webflow sembra
sbagliata, si riproduce e si segnala in `handoff.md`, non si corregge in silenzio.

## Perimetro

Le 10 pagine in sitemap più la 404:

| slug | URL |
|---|---|
| `home` | `/` |
| `dj-course` | `/dj-course` |
| `producer-course` | `/producer-course` |
| `mix-mastering-course` | `/mix-mastering-course` |
| `pricing-page` | `/pricing-page` |
| `play-get-signed` | `/play-get-signed` |
| `advanced-djs` | `/advanced-djs` |
| `recess` | `/recess` |
| `terms-conditions` | `/terms-conditions` |
| `terms-conditions-sa` | `/terms-conditions-sa` |
| `404` | qualunque URL inesistente (qui `/pagina-che-non-esiste-xyz`) |

## Cosa c'è

| percorso | cosa contiene |
|---|---|
| `html/<slug>.html` | HTML pubblicato di ogni pagina, così com'è servito da Webflow |
| `css/mats-mubly.webflow.shared.*.css` | il foglio Webflow, uguale su tutte le pagine |
| `css/*.pretty.css` | lo stesso foglio riformattato per poterlo leggere e cercare |
| `css/SORGENTE.txt` | l'URL esatto da cui viene il CSS |
| `custom-code-head.html` | custom code **di sito** nell'`<head>` (identico su tutte e 11 le pagine) |
| `custom-code-footer.html` | custom code **di sito** in fondo al `<body>` (idem) |
| `custom-code-per-pagina.md` | tutto il resto: embed, script e stili di pagina, con il testo integrale, **più la spiegazione della logica valuta e del toggle annuale/trimestrale** |
| `meta/<slug>.json` | title, description, canonical, Open Graph, Twitter, robots, favicon, JSON-LD completo |
| `meta/_tutte.json` | indice di tutte le pagine con i metadati principali |
| `outline/<slug>.md` | struttura sezione per sezione: classi, tipo, testi in ordine, link, immagini, video, embed, `data-w-id` |
| `outline/_header-footer.md` | header e footer, una volta sola, con le varianti fra pagine |
| `outline/_riepilogo.md` | quante sezioni e quante interazioni per pagina |
| `asset-map.json` | mappa `URL Webflow → path nel repo`, con pagine che lo usano, `alt` e larghezze `srcset` |
| `design-tokens.md` | variabili CSS, colori, font, breakpoint, container, raggi, ombre |
| `screenshots/` | PNG desktop (1440×900) e mobile (390×844), full page, più il `README.md` con la procedura |
| `../../public/webflow/` | gli asset scaricati, nomi leggibili, `shared/` per quelli usati da più pagine |

## Come si rigenera

Tutto è riproducibile dagli script in `sito-ptdja/scripts/`. Nessuno di questi tocca
il sito Webflow: leggono e basta.

```bash
cd sito-ptdja

# punti 1-7: HTML, CSS, custom code, meta, outline, asset, design token
python3 scripts/estrai-riferimento.py

# una fase sola, se serve
python3 scripts/estrai-riferimento.py meta outline
```

Fasi disponibili: `html`, `css`, `custom-code`, `meta`, `outline`, `asset`, `token`.

Gli screenshot stanno a parte perché servono Playwright e un browser:

```bash
cd sito-ptdja/scripts
npm install                                   # sottoprogetto isolato, node_modules ignorato
./node_modules/.bin/playwright install chromium
node screenshot-riferimento.mjs
```

Lo stesso script serve poi per fotografare il build Next.js e confrontarlo:

```bash
node screenshot-riferimento.mjs --base http://localhost:3000 --out ../docs/webflow/screenshots-next
```

Dettagli sulla procedura degli screenshot (banner consenso, animazioni on-scroll,
perché conta il fuso orario) in `screenshots/README.md`.

### Note tecniche sugli script

- I download passano da `curl` lanciato con `subprocess`, non da `urllib`: su questa
  macchina `urllib` fallisce la verifica SSL.
- `scripts/package.json` è un **sottoprogetto separato** con il suo `node_modules`
  (ignorato da git): serve solo a Playwright e non deve finire fra le dipendenze
  dell'app Next.js.
- `scripts/_comune.py` tiene l'elenco delle pagine, i percorsi e la pulizia dei nomi
  file: è l'unico posto da modificare per aggiungere una pagina.

## Cosa sapere prima di ricostruire

### Il custom code di sito è identico ovunque
`custom-code-head.html` (14.854 byte) e `custom-code-footer.html` (16.917 byte) sono
**byte per byte gli stessi su tutte e 11 le pagine**. Diventano due componenti, non
undici copie. Dentro ci sono, nell'ordine: Refersion, bootstrap Trustpilot, GTM via
Stape, *cb push v2.2* (attribuzione e identità), Clarity, Mixpanel, Optibase, Flowbase
tooltip, `vt-quiz.js` nell'head; GTM noscript, gli script eventi Mixpanel, il tracking
Typeform e il tracking dei bottoni checkout, `track.js` nel footer.

### Componenti davvero condivisi
Non sono "sezioni simili": hanno **testo identico** su più pagine.

| componente | classe di primo livello | pagine |
|---|---|---|
| header | `div.header-2.sticky-bg.new-home-2` | 8 |
| footer | `section.footer-section` | 8 |
| blocco prezzi completo (5.499 caratteri di testo identico) | `div.cloneable-container-default-2.center` | 6 |
| sezione recensioni (Feedspace + Trustpilot) | `section.testimonial-section…reviews.new-home-2.trust` | 6 |
| sezione FAQ (struttura condivisa, **domande diverse per pagina**) | `section.faq-section-one…` | 6 |
| popup exit intent | `div.popup-div-2.import-scoll-pop…` | 6 |
| CTA "More Than a Course" | `section.feature-cta-section-3.new-home-2.features.molto-piu` | 3 |

### Header e footer hanno varianti
- Header: la variante `a418b0b3` (`div.header-2.sticky-bg.new-home-2`) sta su 8 pagine.
  `recess` e `terms-conditions-sa` hanno una variante più vecchia e più povera
  (`div.header-2.sticky-bg`, variante `684f4a0d`). `advanced-djs` **non ha né header
  né footer**: è una pagina nuda con dentro solo un iframe VideoAsk.
- Footer: la variante `704d21f5` (`section.footer-section`) sta sulle stesse 8 pagine.
  `recess` (`be31567f`) e `terms-conditions-sa` (`652f6da5`) usano invece una
  `section.footer-cta-section` più vecchia, con il claim "Connecting 8000+ DJs in 140
  countries" al posto di "Connecting thousands of DJs and producers": due footer
  diversi anche fra loro.
- Attenzione a `section.hero-section-two-2.newheader` di `dj-course`,
  `producer-course` e `mix-mastering-course`: nonostante il nome è la **hero** della
  pagina, non un header. Sta nell'outline della pagina, non in `_header-footer.md`.

### Terze parti trovate nell'HTML che non erano in elenco
- **Trengo** (widget di chat, `window.Trengo.key = 'tXUJdf3UvUi255j6ncl8'`): nel custom
  code **di pagina** di `home`, `dj-course`, `producer-course`, `mix-mastering-course`,
  `pricing-page`, `play-get-signed`. Non compare nella tabella terze parti di
  `desiderata.md`: serve una decisione, resta o va.
- **Secondo blocco Refersion duplicato** sulle stesse 6 pagine, con la sintassi rotta
  (`.then(() =>; {`): quel secondo script lancia un `SyntaxError` e non parte mai.
  Refersion è comunque già deciso "via".
- **VideoAsk** (`videoask.com/fu1pxfvu9`) è l'unico contenuto di `advanced-djs`.
- **DynTube** su `play-get-signed`.

### La 404 punta a `/old-home`
Sia il link nel paragrafo sia il bottone "Go back home" della pagina 404 puntano a
`/old-home`, non a `/`. Si riproduce così com'è e si segnala, non si corregge in silenzio.

### Valuta e prezzi
La pagina prezzi non ha nessun selettore di valuta: tutte e tre le versioni del listino
sono nel DOM e uno script geo-gated ne mostra una sola, stimando il paese da fuso orario,
lingua e, in ultima istanza, una chiamata a Cloudflare, con fallback `US`.
Spiegazione completa in `custom-code-per-pagina.md`, sezione *"Come funziona la scelta
della valuta e il toggle annuale/trimestrale"*. Attenzione ai nomi delle classi, che
sono invertiti rispetto al significato: `.is_monthly` è il piano **annuale**,
`.is_annual` è il **trimestrale**.
