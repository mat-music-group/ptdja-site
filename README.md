# ptdja-site

Il sito pubblico di **Pete Tong DJ Academy** rifatto in Next.js, oggi su Webflow
(`www.petetong-djacademy.com`). Non è un redesign: è una copia.

## La regola numero uno: identico, non migliore

Nessun cambio di grafica, di copy o di struttura. Il riferimento è l'HTML
pubblicato salvato in `docs/webflow/<slug>.html` più gli screenshot in
`docs/webflow/screenshots/`, entrambi versionati in questo repo. Se qualcosa sul
sito Webflow sembra sbagliato, si riproduce e si scrive in `handoff.md`: non si
corregge in silenzio.

Le divergenze consapevoli esistono, sono poche, e sono tutte scritte nel
commento in testa al file che le contiene.

## Avvio

```bash
npm install
npm run dev            # http://localhost:3000
```

Nessuna variabile d'ambiente: vedi `.env.example`.

Prima di dire che una cosa è fatta:

```bash
npm run typecheck      # tsc --noEmit
npm run build
npm run start -- -p 3699 &
BASE=http://localhost:3699 npm test
```

`npm test` gira contro l'HTML servito da un build di produzione, non contro i
sorgenti: verifica che ogni rotta risponda, che porti un titolo, che il
tracciamento sia davvero in pagina e che gli script che abbiamo deciso di non
portare (Optibase, Intellimize, Flowbase, Refersion) non siano rientrati
copiando dall'HTML di origine. Senza un server in ascolto esce con codice 2 e
spiega cosa lanciare.

La stessa sequenza gira in CI su ogni pull request (`.github/workflows/ci.yml`).

## Struttura

```
src/app/                  rotte (App Router), layout, globals.css, robots.ts
src/components/tracking/  tracking e attribuzione (vedi sotto)
src/lib/                  ID e configurazioni: analytics.config.ts, mixpanel.ts,
                          iubenda.config.json
src/testi/                testi di pagina, tipati, uno per slug (da fare)
public/js/attribution.js  lo script "cb push" del sito, copia verbatim
docs/webflow/             HTML pubblicato e screenshot di riferimento
test/rotte.mjs            il cancello
```

Convenzioni: una sezione Webflow = un componente; i testi in `src/testi/<slug>.ts`
e mai dentro i componenti; immagini via `next/image` da `public/`; commenti e
documentazione in italiano, contenuto di pagina in inglese com'è sul sito.

## Tracciamento

Montato nel layout, quindi presente su ogni pagina, 404 compresa:

| Componente    | Cosa installa                                                       |
| ------------- | ------------------------------------------------------------------- |
| `Mixpanel`    | libreria Mixpanel, progetto EU, cookie sul dominio radice            |
| `Attribution` | `cb push v2.2`: cookie `attr_*`, `ptdja_uid`, link al carrello       |
| `GoogleTags`  | GTM `GTM-WLFQB5G` via loader Stape su `sgtm.petetong-djacademy.com`  |
| `Clarity`     | Microsoft Clarity, progetto `qgyx8qgz1i`                             |
| `Acquisition` | `track.js` del tool, `data-brand=ptdja`, `data-engagement=off`       |
| `VtQuiz`      | quiz Virtual Tour del landing kit                                    |

Non montati, e il perché sta scritto in ciascun file: `Cmp` e
`GoogleConsentBridge` (sul sito il CMP Iubenda e i segnali di consenso Google
arrivano da GTM, montarli qui vorrebbe dire farli scrivere da due sistemi) e
`Trustpilot` (lo monta la pagina che ha davvero un widget).

Non si installa `meta.js` del landing kit: il pixel Meta passa da GTM, e un
secondo layer manderebbe gli stessi eventi una seconda volta senza deduplica.

`data-landing` vale `sito-test` finché non siamo sul dominio del brand in
produzione, `sito` dopo: la logica, e il perché non usa `headers()`, stanno in
`src/lib/analytics.config.ts`.

## Documenti

- `desiderata.md` — cosa costruire e perché.
- `handoff.md` — stato, cosa funziona, cosa no, cosa faresti dopo.
- `tasks/todo.md` — il piano della fase 1.
- `CLAUDE.md` — le regole di questo repo.
- `../_conoscenza-condivisa/` — stack, tracciamento end to end, hosting, kit landing.

## Git

Commit come `mat-music-group <293055991+mat-music-group@users.noreply.github.com>`
(config **locale** del repo, già impostata), altrimenti Vercel rifiuta il deploy
per autore del commit non verificabile. Conventional Commits. Prima di ogni push:
`/security-audit` e poi `/pre-deploy`.
