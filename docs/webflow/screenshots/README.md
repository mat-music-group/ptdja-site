# Screenshot di riferimento del sito Webflow

> Scattati il **2026-09-14** da `scripts/screenshot-riferimento.mjs` su `https://www.petetong-djacademy.com`.
> Sono la verità di riferimento per la parità visiva: il build Next.js va confrontato con questi,
> non con il ricordo di come appare il sito.

## Come sono fatti

| | desktop | mobile |
|---|---|---|
| viewport | 1440×900 | 390×844 |
| full page | sì | sì |
| device scale factor | 1 | 1 |
| touch / isMobile | no | sì |
| user agent | `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36` | `Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1` |

Locale `en-US`, timezone `America/New_York`. **Il timezone conta**: la pagina prezzi sceglie
la valuta dal fuso orario del browser (vedi `custom-code-per-pagina.md`). Con un fuso
americano il listino resta in **USD**, che è il default del sito. Per catturare le versioni
EUR o GBP serve rilanciare cambiando `timezoneId` nello script.

## Sequenza di ogni scatto

1. `goto` e attesa di `networkidle` (max 30s; se non arriva si prosegue, tracking e chat
   tengono la rete occupata).
2. **Banner consenso Iubenda**: si clicca il bottone di accettazione. Provati in ordine
   `.iubenda-cs-accept-btn`, `#iubenda-cs-banner button.iubenda-cs-accept-btn`,
   `[class*="iubenda-cs-accept"]`, `button:has-text("Accept")`, `button:has-text("Accetta")`.
   **Cosa ha funzionato:** il primo, `.iubenda-cs-accept-btn`, su tutte le pagine.
   La via del cookie pre-impostato (`_iub_cs-<siteId>`) è stata **scartata**: la CMP non è
   nell'HTML della pagina, la inietta GTM, quindi il `siteId` non è noto in anticipo e il
   nome del cookie non si può indovinare.
3. Scroll lento fino in fondo (passi del 70% della viewport, 220 ms l'uno) e ritorno in cima:
   fa partire le animazioni "scroll into view" di Webflow e carica le immagini lazy.
4. **Allargamento della viewport all'altezza dell'intera pagina**, poi di nuovo lo scroll.
   Serve per un motivo preciso: lo screenshot full page ridimensiona la viewport, e quel
   resize fa rileggere a Webflow IX2 gli stati iniziali delle animazioni, riportando a
   `opacity: 0` i titoli di sezione. Allargando prima e riscorrendo dopo, le animazioni
   scattano con tutto in vista e restano.
5. Attesa di 1,5 s, poi screenshot `fullPage`.

I caroselli (Feedspace, Trustpilot, slider corsi) sono catturati nello stato iniziale.
Il widget di chat Trengo resta visibile: fa parte del sito live, non è un artefatto.

## Come rifarli

```bash
cd sito-ptdja/scripts
npm install                      # solo la prima volta (playwright, node_modules ignorato)
./node_modules/.bin/playwright install chromium
node screenshot-riferimento.mjs
```

Lo script è parametrico, così serve anche per confrontare il build Next.js:

```bash
# solo alcune pagine, solo desktop
node screenshot-riferimento.mjs --slug home,pricing-page --solo desktop

# gli stessi scatti sul build locale, in un'altra cartella
node screenshot-riferimento.mjs --base http://localhost:3000 --out ../docs/webflow/screenshots-next

# rigenerare solo questo README da _esiti.json
node screenshot-riferimento.mjs --readme
```

## Cosa c'è

| pagina | desktop (px) | mobile (px) |
|---|---|---|
| `404` | 1440×1969 | 390×1747 |
| `home` | 1440×12287 | 390×13337 |
| `dj-course` | 1440×15567 | 390×16915 |
| `producer-course` | 1440×15528 | 390×17764 |
| `mix-mastering-course` | 1440×14410 | 390×18330 |
| `pricing-page` | 1440×4973 | 390×6617 |
| `play-get-signed` | 1440×11068 | 390×10701 |
| `advanced-djs` | 1440×1013 | 390×1093 |
| `recess` | 1440×1908 | 390×2481 |
| `terms-conditions` | 1440×5698 | 390×7887 |
| `terms-conditions-sa` | 1440×4680 | 390×4999 |

Gli esiti macchina (URL, banner, dimensioni, errori) stanno in `_esiti.json`.
