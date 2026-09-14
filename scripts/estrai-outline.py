"""Fase 5: struttura pagina per pagina in docs/webflow/outline/<slug>.md.

L'obiettivo è che chi ricostruisce la pagina in Next.js possa prendere da qui
ogni stringa, ogni link, ogni immagine e ogni embed senza inventare nulla e
senza riaprire l'HTML. Header e footer stanno una volta sola in
outline/_header-footer.md.
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import sys
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from bs4 import BeautifulSoup, NavigableString, Tag

from _comune import BASE_URL, DIR_DOCS, PAGINE, assicura_dir, percorso_html

SALTA = {"script", "style", "noscript", "template"}

# Tag che NON interrompono un'unità di testo: il testo attorno resta uno solo
INLINE = {
    "span", "br", "strong", "b", "em", "i", "u", "sub", "sup", "small", "code",
    "mark", "abbr", "s", "strike", "a", "label", "time", "q", "cite", "wbr",
    "font", "del", "ins",
}
GRAFICI = {
    "img", "svg", "path", "g", "circle", "rect", "line", "polygon", "polyline",
    "defs", "clippath", "use", "picture", "source", "ellipse", "mask", "text",
    "tspan", "lineargradient", "stop", "filter", "fegaussianblur",
}
INLINE_OK = INLINE | GRAFICI

TITOLI = {"h1", "h2", "h3", "h4", "h5", "h6"}

# Riconoscimento del tipo di sezione: prima corrispondenza sulla stringa di classi
TIPI = [
    ("footer", "footer"),
    ("header|navbar", "header / navigazione"),
    ("hero", "hero"),
    ("pricing|plan_|piano", "pricing"),
    ("faq|accordion", "faq"),
    ("testimonial|review|trust|success", "testimonial / recensioni"),
    ("slider|carousel|carosello|swiper", "carosello / slider"),
    ("cta", "cta"),
    ("popup|modal|exit-intent", "popup / modale"),
    ("team|teachers|docenti", "team / docenti"),
    ("program|course|corso|curriculum|lesson", "corsi / programma"),
    ("brand|partner|logo", "loghi / partner"),
    ("feature", "feature / contenuto"),
    ("intro", "introduzione"),
    ("terms|legal|policy|rich-text", "testo legale / rich text"),
    ("form", "form"),
    ("section", "sezione generica"),
]


def tipo_sezione(el: Tag) -> str:
    firma = " ".join(el.get("class") or []) + " " + (el.get("id") or "") + " " + el.name
    firma = firma.lower()
    for pattern, etichetta in TIPI:
        if re.search(pattern, firma):
            return etichetta
    return "sezione generica"


def pulisci(testo: str) -> str:
    """Normalizza gli spazi tenendo il contenuto identico all'originale."""
    testo = testo.replace("‍", "").replace("​", "")
    testo = testo.replace("\xa0", " ")
    return re.sub(r"\s+", " ", testo).strip()


def testo_unita(el: Tag) -> str:
    """Testo di un'unità con i <br> resi come ' / ' per non perdere le andate a capo."""
    pezzi = []
    for nodo in el.descendants:
        if isinstance(nodo, NavigableString):
            if any(p.name in SALTA for p in nodo.parents):
                continue
            pezzi.append(str(nodo))
        elif isinstance(nodo, Tag) and nodo.name == "br":
            pezzi.append(" ⏎ ")
        elif isinstance(nodo, Tag) and nodo.get("data-ms-code"):
            # varianti geo-gated (valuta): vanno tenute separate, non incollate
            pezzi.append(" | ")
    testo = pulisci("".join(pezzi))
    testo = re.sub(r"\s*⏎\s*", " ⏎ ", testo).strip(" ⏎ ").strip()
    return testo


def e_unita(el: Tag) -> bool:
    if el.name in SALTA or el.name in GRAFICI:
        return False
    if not el.get_text(strip=True):
        return False
    # Due bottoni fratelli non sono un'unica stringa: se dentro c'è più di un
    # link, si scende, così ogni <a> esce con il suo testo e il suo href.
    if el.name != "a" and len(el.find_all("a", href=True)) > 1:
        return False
    return all(d.name in INLINE_OK for d in el.find_all(True))


def classi(el: Tag) -> str:
    c = el.get("class") or []
    return ("." + ".".join(c)) if c else ""


def firma_elemento(el: Tag) -> str:
    return f"{el.name}{classi(el)}"


def larghezze_srcset(srcset: str) -> tuple[list[int], str | None]:
    """Ritorna (larghezze disponibili, URL della variante più grande)."""
    larghezze: list[tuple[int, str]] = []
    for pezzo in srcset.split(","):
        pezzo = pezzo.strip()
        if not pezzo:
            continue
        parti = pezzo.split()
        url = parti[0]
        w = 0
        if len(parti) > 1 and parti[1].endswith("w"):
            try:
                w = int(parti[1][:-1])
            except ValueError:
                w = 0
        larghezze.append((w, url))
    if not larghezze:
        return [], None
    larghezze.sort()
    return [w for w, _ in larghezze if w], larghezze[-1][1]


def attributi_data(el: Tag, prefisso: str = "data-") -> dict:
    return {k: v for k, v in el.attrs.items() if k.startswith(prefisso)}


# ---------------------------------------------------------------- traversata
def descrivi(el: Tag, righe: list[str], profondita: int, interazioni: list[str]) -> None:
    """Scrive in `righe` il contenuto di `el` in ordine di documento."""
    if el.get("data-w-id"):
        interazioni.append(f"`{el['data-w-id']}` su `{firma_elemento(el)}`")

    for figlio in el.children:
        if isinstance(figlio, NavigableString):
            t = pulisci(str(figlio))
            if t:
                righe.append(f"- testo: \"{t}\"")
            continue
        if not isinstance(figlio, Tag):
            continue
        if figlio.name in SALTA:
            continue
        voce = elemento_speciale(figlio)
        if voce is not None:
            if figlio.get("data-w-id"):
                interazioni.append(f"`{figlio['data-w-id']}` su `{firma_elemento(figlio)}`")
            righe.append(voce)
            continue
        if e_unita(figlio):
            if figlio.get("data-w-id"):
                interazioni.append(f"`{figlio['data-w-id']}` su `{firma_elemento(figlio)}`")
            righe.extend(rendi_unita(figlio))
            continue
        if figlio.get("data-ms-code"):
            righe.append(
                f"- **blocco geo-gated per valuta** `{firma_elemento(figlio)}` — "
                f"`data-ms-code={figlio['data-ms-code']}`, "
                f"paesi: `{figlio.get('data-ms-countries', '')}` "
                "(vedi `custom-code-per-pagina.md`, sezione sulla scelta della valuta)"
            )
        descrivi(figlio, righe, profondita + 1, interazioni)


def rendi_unita(el: Tag) -> list[str]:
    testo = testo_unita(el)
    if not testo:
        return []
    righe: list[str] = []
    link = el if el.name == "a" else el.find_parent("a")
    href = link.get("href") if link is not None else None

    if el.name in TITOLI:
        etichetta = f"**{el.name.upper()}**"
    elif el.name == "li":
        etichetta = "item lista"
    elif el.name == "a":
        etichetta = "link"
    elif el.name in ("button",) or "w-button" in (el.get("class") or []):
        etichetta = "bottone"
    elif el.name == "p":
        etichetta = "p"
    else:
        etichetta = el.name

    riga = f"- {etichetta} `{firma_elemento(el)}`: \"{testo}\""
    if href:
        riga += f" → `{href}`"
    righe.append(riga)

    # link annidati dentro l'unità (es. un <a> dentro un <p>)
    if el.name != "a":
        for a in el.find_all("a", href=True):
            t = testo_unita(a)
            righe.append(f"  - link interno: \"{t}\" → `{a['href']}`")
    # varianti geo-gated per valuta
    for g in el.find_all(attrs={"data-ms-code": True}):
        righe.append(
            f"  - geo `{g['data-ms-code']}` per `{g.get('data-ms-countries', '')}`: "
            f"\"{pulisci(g.get_text())}\""
        )
    return righe


def elemento_speciale(el: Tag) -> str | None:
    """Immagini, video, embed terzi: restituisce la riga da scrivere, o None."""
    cls = el.get("class") or []
    firma = " ".join(cls)

    if el.name == "img":
        src = el.get("src") or ""
        alt = el.get("alt") or ""
        pezzi = [f"- **img** `{src}`", f'alt="{alt}"']
        if el.get("width"):
            pezzi.append(f"width={el['width']}")
        if el.get("height"):
            pezzi.append(f"height={el['height']}")
        if el.get("loading"):
            pezzi.append(f"loading={el['loading']}")
        if el.get("srcset"):
            larghezze, _ = larghezze_srcset(el["srcset"])
            if larghezze:
                pezzi.append("srcset=" + "/".join(str(w) for w in larghezze))
        if el.get("sizes"):
            pezzi.append(f"sizes={el['sizes']}")
        return " — ".join(pezzi)

    if el.name == "iframe":
        return f"- **iframe** `{el.get('src') or el.get('data-src') or ''}` (title=\"{el.get('title') or ''}\")"

    if el.name == "video":
        fonti = [s.get("src") for s in el.find_all("source") if s.get("src")]
        return f"- **video** {fonti or el.get('src')}"

    if el.name == "wistia-player":
        return (
            f"- **video Wistia** media-id=`{el.get('media-id')}` "
            f"aspect={el.get('aspect')} — embed `https://fast.wistia.com/embed/{el.get('media-id')}.js`"
        )

    if el.get("data-animation-type") == "lottie":
        return (
            f"- **Lottie** `{el.get('data-src')}` — loop={el.get('data-loop')} "
            f"autoplay={el.get('data-autoplay')} direction={el.get('data-direction')} "
            f"renderer={el.get('data-renderer')} duration={el.get('data-duration')} "
            f"trigger={el.get('data-w-id')}"
        )

    if "trustpilot-widget" in cls:
        dati = attributi_data(el)
        return "- **Trustpilot widget** " + json.dumps(dati, ensure_ascii=False)

    if "feedspace-embed" in firma:
        return f"- **Feedspace** data-id=`{el.get('data-id')}`"

    if el.name == "div" and "w-embed" in cls and not el.get_text(strip=True) and not el.find(["img", "iframe", "wistia-player"]):
        h = hashlib.md5(el.decode_contents().strip().encode()).hexdigest()[:8]
        return f"- *(embed Webflow `{h}` senza testo — codice in `custom-code-per-pagina.md`)*"

    return None


# ---------------------------------------------------------------- sezioni
def blocchi_primo_livello(body: Tag) -> list[Tag]:
    figli = [c for c in body.find_all(recursive=False) if isinstance(c, Tag) and c.name not in SALTA]
    # se il body ha un unico wrapper senza classe, scendo di un livello
    if len(figli) == 1 and not figli[0].get("class"):
        return [c for c in figli[0].find_all(recursive=False) if isinstance(c, Tag) and c.name not in SALTA]
    return figli


def e_header(el: Tag) -> bool:
    """Header vero, non una hero che ha 'header' dentro il nome di una classe.

    Serve sia una classe che *inizia* per `header`/`navbar`, sia una navigazione
    Webflow dentro: `section.hero-section-two-2.newheader` di `dj-course` è una
    hero, non un header, e senza questo controllo finirebbe in `_header-footer.md`.
    """
    token = [c.lower() for c in (el.get("class") or [])]
    nome_da_header = any(t == "header" or t.startswith(("header-", "navbar")) for t in token)
    return nome_da_header and bool(el.select_one(".w-nav, nav[role='navigation']"))


def e_footer(el: Tag) -> bool:
    token = [c.lower() for c in (el.get("class") or [])]
    return any(t == "footer" or t.startswith("footer-") for t in token)


def normalizza_per_confronto(el: Tag) -> str:
    """HTML dell'elemento senza gli attributi che cambiano da pagina a pagina."""
    copia = BeautifulSoup(str(el), "html.parser")
    for tag in copia.find_all(True):
        for attr in list(tag.attrs):
            if attr.startswith("data-wf-") or attr in ("aria-current",):
                del tag.attrs[attr]
        cls = tag.get("class")
        if cls:
            tag["class"] = [c for c in cls if c != "w--current"]
    return re.sub(r"\s+", " ", str(copia))


def outline_sezione(el: Tag, numero: int) -> str:
    righe: list[str] = []
    interazioni: list[str] = []
    corpo: list[str] = []
    descrivi(el, corpo, 0, interazioni)

    righe.append(f"## Sezione {numero} — `{el.name}{classi(el)}`")
    righe.append("")
    righe.append(f"- **tipo (stima):** {tipo_sezione(el)}")
    if el.get("id"):
        righe.append(f"- **id:** `{el['id']}`")
    if interazioni:
        righe.append(f"- **interazioni Webflow (`data-w-id`), {len(interazioni)}:**")
        for i in interazioni:
            righe.append(f"  - {i}")
    else:
        righe.append("- **interazioni Webflow:** nessuna")
    componenti = []
    if el.select_one(".w-slider"):
        componenti.append(f"slider Webflow ×{len(el.select('.w-slider'))}")
    if el.select_one(".w-tabs"):
        componenti.append(f"tabs Webflow ×{len(el.select('.w-tabs'))}")
    if el.select_one(".w-dropdown"):
        componenti.append(f"dropdown Webflow ×{len(el.select('.w-dropdown'))}")
    if el.select_one("form"):
        componenti.append(f"form ×{len(el.select('form'))}")
    if componenti:
        righe.append("- **componenti Webflow:** " + ", ".join(componenti))
    righe.append("")
    righe.append("### Contenuto in ordine")
    righe.append("")
    righe.extend(corpo or ["*(nessun contenuto testuale o media)*"])
    righe.append("")
    return "\n".join(righe)


def main() -> int:
    dir_out = assicura_dir(os.path.join(DIR_DOCS, "outline"))
    varianti_header: dict[str, list[str]] = {}
    varianti_footer: dict[str, list[str]] = {}
    esempi_header: dict[str, Tag] = {}
    esempi_footer: dict[str, Tag] = {}
    riepilogo: list[str] = []

    for slug, percorso in PAGINE.items():
        html = open(percorso_html(slug), encoding="utf-8").read()
        soup = BeautifulSoup(html, "html.parser")
        body = soup.body
        blocchi = blocchi_primo_livello(body)

        righe = [
            f"# Outline — `{slug}`",
            "",
            f"> {BASE_URL}{percorso}  ",
            f"> Generato da `scripts/estrai-outline.py` dall'HTML pubblicato salvato in "
            f"`docs/webflow/html/{slug}.html`. Ultimo aggiornamento: {date.today().isoformat()}.  ",
            "> Ogni stringa qui sotto è copiata dall'HTML: non riscriverla, non tradurla.",
            "",
            f"`<body class=\"{' '.join(body.get('class') or [])}\">`, {len(blocchi)} blocchi di primo livello.",
            "",
            "Legenda: `⏎` = `<br>` nell'originale. I `data-w-id` segnalano un'interazione",
            "o animazione Webflow su quell'elemento: lì c'è qualcosa da replicare.",
            "",
            "---",
            "",
        ]

        n = 0
        for blocco in blocchi:
            if e_header(blocco):
                chiave = hashlib.md5(normalizza_per_confronto(blocco).encode()).hexdigest()[:8]
                varianti_header.setdefault(chiave, []).append(slug)
                esempi_header.setdefault(chiave, blocco)
                righe.append(
                    f"## Header — `{blocco.name}{classi(blocco)}` (variante `{chiave}`)\n\n"
                    f"Contenuto in `outline/_header-footer.md`.\n"
                )
                continue
            if e_footer(blocco):
                chiave = hashlib.md5(normalizza_per_confronto(blocco).encode()).hexdigest()[:8]
                varianti_footer.setdefault(chiave, []).append(slug)
                esempi_footer.setdefault(chiave, blocco)
                righe.append(
                    f"## Footer — `{blocco.name}{classi(blocco)}` (variante `{chiave}`)\n\n"
                    f"Contenuto in `outline/_header-footer.md`.\n"
                )
                continue
            n += 1
            righe.append(outline_sezione(blocco, n))
            righe.append("---\n")

        with open(os.path.join(dir_out, f"{slug}.md"), "w", encoding="utf-8") as f:
            f.write("\n".join(righe))
        n_interazioni = len(re.findall(r'data-w-id="', html))
        riepilogo.append(f"| `{slug}` | {len(blocchi)} | {n} | {n_interazioni} |")
        print(f"[OK] outline/{slug}.md — {len(blocchi)} blocchi, {n} sezioni di contenuto")

    # ---- header e footer ----
    righe = [
        "# Header e footer condivisi",
        "",
        f"> Generato da `scripts/estrai-outline.py`. Ultimo aggiornamento: {date.today().isoformat()}.",
        "> Il confronto fra pagine ignora gli attributi `data-wf-*`, `aria-current` e la classe",
        "> `w--current`, che cambiano per forza a seconda della pagina corrente.",
        "",
    ]

    righe.append("## Varianti di header\n")
    for chiave, pagine in sorted(varianti_header.items(), key=lambda kv: -len(kv[1])):
        righe.append(f"- variante `{chiave}`: {', '.join('`'+p+'`' for p in pagine)}")
    senza_header = [s for s in PAGINE if not any(s in p for p in varianti_header.values())]
    if senza_header:
        righe.append(f"- **senza header**: {', '.join('`'+s+'`' for s in senza_header)}")
    righe.append("")

    righe.append("## Varianti di footer\n")
    for chiave, pagine in sorted(varianti_footer.items(), key=lambda kv: -len(kv[1])):
        righe.append(f"- variante `{chiave}`: {', '.join('`'+p+'`' for p in pagine)}")
    senza_footer = [s for s in PAGINE if not any(s in p for p in varianti_footer.values())]
    if senza_footer:
        righe.append(f"- **senza footer**: {', '.join('`'+s+'`' for s in senza_footer)}")
    righe.append("")
    righe.append("---\n")

    for etichetta, varianti, esempi in (
        ("Header", varianti_header, esempi_header),
        ("Footer", varianti_footer, esempi_footer),
    ):
        for chiave, pagine in sorted(varianti.items(), key=lambda kv: -len(kv[1])):
            el = esempi[chiave]
            righe.append(f"# {etichetta} — variante `{chiave}`")
            righe.append("")
            righe.append(f"Presente su: {', '.join('`'+p+'`' for p in pagine)}")
            righe.append("")
            righe.append(outline_sezione(el, 0).replace("## Sezione 0 — ", f"## {etichetta} — "))
            righe.append("---\n")

    with open(os.path.join(dir_out, "_header-footer.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(righe))
    print("[OK] outline/_header-footer.md")

    with open(os.path.join(dir_out, "_riepilogo.md"), "w", encoding="utf-8") as f:
        f.write("# Riepilogo outline\n\n")
        f.write(f"> Generato il {date.today().isoformat()} da `scripts/estrai-outline.py`.\n\n")
        f.write("| pagina | blocchi di primo livello | sezioni di contenuto | `data-w-id` nell'HTML |\n")
        f.write("|---|---|---|---|\n")
        f.write("\n".join(riepilogo) + "\n")
    print("[OK] outline/_riepilogo.md")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
