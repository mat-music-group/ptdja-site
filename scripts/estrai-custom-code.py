"""Fase 3: separa il custom code di sito da quello di pagina.

Produce:
  docs/webflow/custom-code-head.html      custom code di sito nell'<head>
  docs/webflow/custom-code-footer.html    custom code di sito in fondo al <body>
  docs/webflow/custom-code-per-pagina.md  tutto il resto, pagina per pagina
"""

from __future__ import annotations

import hashlib
import os
import re
import sys
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from bs4 import BeautifulSoup

from _comune import DIR_DOCS, PAGINE, percorso_html

# Confini del custom code di sito (li ha scritti il team, non Webflow)
HEAD_INIZIO = "<!-- REFERSION TRACKING: BEGIN -->"
HEAD_FINE_SRC = "https://tool.ptdja.com/landing-kit/kit/vt-quiz.js"
FOOT_INIZIO = "<!-- Google Tag Manager (noscript) -->"
FOOT_FINE_SRC = "https://tool.ptdja.com/tracking/track.js"

# Script che Webflow mette da sé: non sono custom code
RE_SCRIPT_WEBFLOW = re.compile(
    r"(d3e54v103j8qbb\.cloudfront\.net/js/jquery"
    r"|cdn\.prod\.website-files\.com/[^\"']*/js/webflow"
    r"|webflowembed)"
)


SPIEGAZIONE_PRICING = """

---

## Come funziona la scelta della valuta e il toggle annuale/trimestrale

> Sezione scritta a mano (non generata dal parsing) perché risponde a una domanda
> aperta del progetto: `desiderata.md`, punto 2 delle *Open questions*.
> Vale per `pricing-page` e per i blocchi prezzi replicati su `home`, `dj-course`,
> `producer-course`, `mix-mastering-course` e `play-get-signed`.

### 1. La valuta: nessuno switch manuale, è geolocalizzazione lato client

**Non esiste un selettore di valuta.** Le tre versioni del listino (USD, EUR, GBP)
sono **tutte e tre nel DOM**, una accanto all'altra, e viene mostrata solo quella
che corrisponde al paese stimato del visitatore.

Il markup: tre griglie sorelle `div.w-layout-grid.grid-three-columns`, una con
classe `usd`, una `eur shower`, una `gbp shower`. Ognuna porta due attributi:

| Attributo | Valore sulla griglia USD | Valore sulla griglia EUR | Valore sulla griglia GBP |
|---|---|---|---|
| `data-ms-code` | `locale-hide` | `locale-show` | `locale-show` |
| `data-ms-countries` | `GB, AT, BE, BG, HR, CY, EE, FI, FR, DE, EL, IE, IT, LV, LT, LU, MT, NL, PT, SK, SI, ES, AD, MC, SM, VA, XK, ME` | gli stessi meno `GB` | `GB, UK` |

Cioè: **USD è il default** e viene nascosto nei paesi euro e nel Regno Unito;
EUR compare solo nei paesi della lista euro; GBP solo in `GB`/`UK`.
Lo stesso schema è applicato anche agli `<span>` del claim "Plans starting at
$13 / €13 / £13 per month", quindi la stessa logica governa sia i prezzi in
vetrina sia le card complete.

Ad accendere e spegnere quelle griglie è uno script incollato in un embed Webflow
dentro il body della pagina, intitolato **"GEO-GATED REGION BLOCKER v0.3 —
Adblock-Proof Edition"** (testo integrale sopra, fra gli *Embed ricorrenti*).
Funziona così, nell'ordine:

1. **CSS difensivo, prima di tutto.** Lo stesso embed inietta uno `<style>` che
   mette `display: none !important` su *tutto* ciò che ha `data-ms-code`, e lo
   riaccende (`display: revert !important`) solo su chi ha anche la classe
   `ms-geo-visible`. Serve a evitare che si veda per un istante il listino
   sbagliato: finché lo script non ha deciso, non si vede nessun prezzo.
2. **Cache.** Se in `localStorage` c'è un paese salvato da meno di 60 minuti
   (`CACHE_MINUTES = 60`), usa quello e si ferma.
3. **Fuso orario.** `Intl.DateTimeFormat().resolvedOptions().timeZone` letto
   contro una tabella `TZ_TO_COUNTRY` scritta a mano (`Europe/Rome` → `IT`,
   `Europe/London` → `GB`, e via dicendo). Non passa dalla rete, quindi nessun
   adblocker può fermarlo: è il motivo del nome "adblock-proof".
4. **Lingua del browser.** Se il fuso non basta, guarda `navigator.language`:
   prima la parte dopo il trattino (`it-IT` → `IT`), poi una tabella
   `LANG_TO_COUNTRY` (`it` → `IT`, `fr` → `FR`…).
5. **Rete, solo come ultima spiaggia.** `fetch` su
   `https://www.cloudflare.com/cdn-cgi/trace` e, in subordine,
   `https://1.1.1.1/cdn-cgi/trace`, con timeout di 2,5 secondi
   (`FETCH_TIMEOUT`), leggendo il campo `loc=XX`.
6. **Fallback.** Se tutto fallisce: `FALLBACK_COUNTRY = 'US'`, cioè listino USD.

Deciso il paese, `applyVisibility(country)` aggiunge la classe `ms-geo-visible`
agli elementi `locale-show` la cui lista `data-ms-countries` contiene quel paese,
e agli elementi `locale-hide` la cui lista **non** lo contiene.

**Conseguenza per la ricostruzione in Next.js:** la valuta non dipende dall'IP
lato server né da Chargebee, è una stima lato client. Se la si rifà server side
(header `x-vercel-ip-country`) il comportamento cambia: più affidabile, ma
diverso da oggi, e con il rischio di cache condivisa fra paesi diversi. Se si
vuole restare identici, va replicata la cascata fuso → lingua → rete → `US`,
con la stessa regola del "prima nascondo tutto".

### 2. Il toggle annuale/trimestrale: interazione Webflow + jQuery

L'interruttore è `div#packageSwitch.toggle_btn`, fra le due etichette
**"Annual (-40%)"** e **"Quarterly"**, e porta
`data-w-id="18afca18-7db8-c2e0-7d35-5ee832c27b35"`. Sono due meccanismi
sovrapposti:

**a) I numeri grandi** li anima lo script jQuery in fondo alla pagina (testo
integrale nella sezione della pagina, sotto *Custom code in fondo al `<body>`*).
Ogni prezzo è uno `<span class="number">` con due attributi:
`data-month` e `data-year`. Un contatore `clicknum` conta i click: a click pari
anima il numero verso `data-month`, a click dispari verso `data-year`, con
`.animate()` di jQuery, 500 ms, easing lineare, arrotondando a intero a ogni step.
I valori sulla pricing page sono `data-month` 13 / 19 / 24 e `data-year`
19 / 29 / 39 per One, PRO ed ELITE. Attenzione al nome: i numeri **crescono**
passando al trimestrale, quindi `data-month` è il prezzo mensile equivalente del
piano **annuale** e `data-year` quello del **trimestrale**.

**b) I bottoni di acquisto** li scambia un'interazione nativa di Webflow legata a
`data-w-id="18afca18-…"`. Ogni card contiene due `<a>` diversi:
`a.button_primary-2.is_monthly` (piano **annuale**, con prezzo pieno barrato,
es. "Start Now at $156 ~~$228~~") e `a.button_primary-2.is_annual`
(piano **trimestrale**, es. "Start Now at $57"). Nel CSS pubblicato
`.button_primary-2.is_annual` nasce con `display: none`: è l'interazione Webflow
a invertire la visibilità dei due al click. Anche qui i nomi delle classi sono
invertiti rispetto al significato: `is_monthly` = annuale, `is_annual` =
trimestrale. Da non "correggere" in fase di ricostruzione, ma da rinominare con
chiarezza nel nuovo codice.

### 3. I 18 link al checkout

Sono statici nell'HTML, tre valute × tre piani × due cicli, tutti nella forma:

```
https://cart.petetong-djacademy.com?subscription_items[item_price_id][0]=<PIANO>-<VALUTA>-<CICLO>
```

con `<PIANO>` ∈ `One`, `PRO`, `ELITE`; `<VALUTA>` ∈ `USD`, `EUR`, `GBP`;
`<CICLO>` ∈ `Yearly`, `Every-3-months`. Nessun parametro di attribuzione è
scritto a mano: li aggiunge a runtime lo script *cb push v2.2* del custom code di
sito, che intercetta il click e appende i `customer[cf_*]`.
"""


def taglia(testo: str, inizio_marker: str, fine_marker: str) -> tuple[int, int, str]:
    a = testo.find(inizio_marker)
    b = testo.find(fine_marker)
    if a < 0 or b < 0:
        return -1, -1, ""
    fine = testo.find("</script>", b) + len("</script>")
    return a, fine, testo[a:fine]


def sezioni_di(el) -> str:
    """Traccia leggibile di dove sta un embed: classi degli antenati significativi."""
    catena = []
    for p in el.parents:
        if p.name in ("body", "[document]", "html"):
            break
        cls = p.get("class")
        if cls:
            catena.append(".".join(cls[:3]))
        if len(catena) >= 3:
            break
    return " < ".join(catena) if catena else "(radice del body)"


def main() -> int:
    blocchi_head: dict[str, list[str]] = {}
    blocchi_foot: dict[str, list[str]] = {}
    per_pagina: dict[str, dict] = {}

    for slug in PAGINE:
        html = open(percorso_html(slug), encoding="utf-8").read()
        i_body = html.find("<body")
        head_raw = html[:i_body]
        body_raw = html[i_body:]

        ha, hb, head_sito = taglia(head_raw, HEAD_INIZIO, HEAD_FINE_SRC)
        fa, fb, foot_sito = taglia(body_raw, FOOT_INIZIO, FOOT_FINE_SRC)
        if ha < 0 or fa < 0:
            print(f"[!!] {slug}: confini del custom code di sito non trovati")
            continue
        blocchi_head.setdefault(head_sito, []).append(slug)
        blocchi_foot.setdefault(foot_sito, []).append(slug)

        # --- coda dell'head: custom code di pagina ---
        coda_head = head_raw[hb:]
        coda_head = re.sub(
            r"<script type=\"text/javascript\">window\.__WEBFLOW_CURRENCY_SETTINGS.*?</script>",
            "",
            coda_head,
            flags=re.S,
        )
        coda_head = coda_head.replace("</head>", "").strip()

        # --- coda del body: custom code di pagina in fondo ---
        coda_foot = body_raw[fb:]
        coda_foot = re.sub(r"<script src=\"[^\"]*webflowembed[^\"]*\"[^>]*></script>", "", coda_foot)
        coda_foot = coda_foot.replace("</body>", "").replace("</html>", "").strip()

        # --- embed dentro il body ---
        # Tolgo dall'HTML i blocchi già raccolti, così quel che resta è davvero "altro".
        html_ridotto = html.replace(head_sito, "").replace(foot_sito, "")
        for gia_preso in (coda_head, coda_foot):
            if gia_preso:
                html_ridotto = html_ridotto.replace(gia_preso, "")
        soup = BeautifulSoup(html_ridotto, "html.parser")
        embed: list[tuple[str, str, str]] = []  # (hash, posizione, html)
        visti = set()
        for d in soup.body.select("div.w-embed"):
            if any(a in visti for a in map(id, d.parents)):
                continue
            visti.add(id(d))
            contenuto = d.decode_contents().strip()
            h = hashlib.md5(contenuto.encode()).hexdigest()[:8]
            embed.append((h, f"div.{'.'.join(d.get('class', []))} in {sezioni_di(d)}", contenuto))

        # script e style inline nel body fuori dagli embed e fuori dal custom code di sito
        sciolti: list[str] = []
        for tag in soup.body.find_all(["script", "style"]):
            if any(p.name == "div" and "w-embed" in (p.get("class") or []) for p in tag.parents):
                continue
            src = tag.get("src") or ""
            if src and RE_SCRIPT_WEBFLOW.search(src):
                continue
            sciolti.append(str(tag))

        per_pagina[slug] = {
            "coda_head": coda_head,
            "coda_foot": coda_foot,
            "embed": embed,
            "sciolti": sciolti,
        }

    # ---- scrittura dei due file di sito ----
    if len(blocchi_head) != 1:
        print(f"[!!] il custom code head NON è identico su tutte le pagine: {len(blocchi_head)} varianti")
        for k, v in blocchi_head.items():
            print("     variante su:", v)
    if len(blocchi_foot) != 1:
        print(f"[!!] il custom code footer NON è identico su tutte le pagine: {len(blocchi_foot)} varianti")
        for k, v in blocchi_foot.items():
            print("     variante su:", v)

    head_sito = max(blocchi_head, key=lambda k: len(blocchi_head[k]))
    foot_sito = max(blocchi_foot, key=lambda k: len(blocchi_foot[k]))

    intestazione = (
        "<!--\n"
        f"  Custom code di SITO di petetong-djacademy.com, estratto il {date.today().isoformat()}\n"
        "  dall'HTML pubblicato. Identico su tutte e 11 le pagine in scope.\n"
        "  Copia fedele: non modificare a mano, si rigenera con scripts/estrai-custom-code.py\n"
        "-->\n"
    )
    with open(os.path.join(DIR_DOCS, "custom-code-head.html"), "w", encoding="utf-8") as f:
        f.write(intestazione + head_sito + "\n")
    with open(os.path.join(DIR_DOCS, "custom-code-footer.html"), "w", encoding="utf-8") as f:
        f.write(intestazione + foot_sito + "\n")
    print(f"[OK] custom-code-head.html   {len(head_sito)} byte, pagine: {len(blocchi_head[head_sito])}")
    print(f"[OK] custom-code-footer.html {len(foot_sito)} byte, pagine: {len(blocchi_foot[foot_sito])}")

    # ---- markdown per pagina ----
    righe: list[str] = []
    righe.append("# Custom code per pagina (sito Webflow PTDJA)\n")
    righe.append(
        "> Generato da `scripts/estrai-custom-code.py` dall'HTML pubblicato. "
        f"Ultimo aggiornamento: {date.today().isoformat()}.\n"
    )
    righe.append(
        "Qui c'è solo ciò che **non** fa parte del custom code di sito "
        "(`custom-code-head.html`, `custom-code-footer.html`) e non è generato da Webflow "
        "(jQuery, `webflow.*.js`, `webflowembed`, `__WEBFLOW_CURRENCY_SETTINGS`).\n"
    )
    righe.append(
        "I blocchi JSON-LD stanno nell'head di ogni pagina ma sono documentati in "
        "`meta/<slug>.json`, non qui.\n"
    )

    # embed identici su più pagine: li elenco una volta sola
    indice_embed: dict[str, dict] = {}
    for slug, dati in per_pagina.items():
        for h, pos, cont in dati["embed"]:
            voce = indice_embed.setdefault(h, {"html": cont, "pagine": {}, "posizioni": set()})
            voce["pagine"][slug] = voce["pagine"].get(slug, 0) + 1
            voce["posizioni"].add(pos)

    condivisi = {h: v for h, v in indice_embed.items() if len(v["pagine"]) > 1}
    if condivisi:
        righe.append("\n---\n\n## Embed ricorrenti (stesso contenuto su più pagine)\n")
        for h, v in sorted(condivisi.items(), key=lambda kv: -len(kv[1]["pagine"])):
            pagine = ", ".join(f"{p} ×{n}" for p, n in sorted(v["pagine"].items()))
            righe.append(f"### Embed `{h}`\n")
            righe.append(f"Pagine: {pagine}\n")
            righe.append("Posizione tipica: `" + sorted(v["posizioni"])[0] + "`\n")
            righe.append("```html\n" + v["html"] + "\n```\n")

    for slug in PAGINE:
        dati = per_pagina.get(slug)
        if not dati:
            continue
        righe.append(f"\n---\n\n## `{slug}`\n")
        vuoto = True

        if dati["coda_head"]:
            vuoto = False
            righe.append("### Custom code nell'`<head>` della pagina\n")
            righe.append("```html\n" + dati["coda_head"] + "\n```\n")

        propri = [(h, pos, cont) for h, pos, cont in dati["embed"] if h not in condivisi]
        if propri:
            vuoto = False
            righe.append("### Embed nel body (solo di questa pagina)\n")
            conteggio: dict[str, list] = {}
            for h, pos, cont in propri:
                conteggio.setdefault(h, [pos, cont, 0])
                conteggio[h][2] += 1
            for h, (pos, cont, n) in conteggio.items():
                suffisso = f" — ripetuto {n} volte" if n > 1 else ""
                righe.append(f"**Embed `{h}`** in `{pos}`{suffisso}\n")
                righe.append("```html\n" + cont + "\n```\n")

        ricorrenti = sorted({h for h, _, _ in dati["embed"] if h in condivisi})
        if ricorrenti:
            vuoto = False
            righe.append(
                "### Embed ricorrenti presenti qui\n"
                + ", ".join(f"`{h}`" for h in ricorrenti)
                + " (testo integrale nella sezione *Embed ricorrenti* sopra)\n"
            )

        if dati["sciolti"]:
            vuoto = False
            righe.append("### Script o style inline sciolti nel body\n")
            for frammento in dati["sciolti"]:
                righe.append("```html\n" + frammento + "\n```\n")

        if dati["coda_foot"]:
            vuoto = False
            righe.append("### Custom code in fondo al `<body>` della pagina\n")
            righe.append("```html\n" + dati["coda_foot"] + "\n```\n")

        if vuoto:
            righe.append("Nessun custom code di pagina: solo quello di sito.\n")

    righe.append(SPIEGAZIONE_PRICING)

    with open(os.path.join(DIR_DOCS, "custom-code-per-pagina.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(righe))
    print("[OK] custom-code-per-pagina.md")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
