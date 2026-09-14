"""Fase 7: design token dal CSS Webflow, base per globals.css e la config Tailwind."""

from __future__ import annotations

import glob
import os
import re
import sys
from collections import Counter
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from _comune import DIR_DOCS

RE_ROOT = re.compile(r"(?::root|html)\s*\{([^}]*)\}")
RE_VAR = re.compile(r"(--[\w-]+)\s*:\s*([^;]+);")
RE_HEX = re.compile(r"#(?:[0-9a-fA-F]{3,8})\b")
RE_RGB = re.compile(r"rgba?\([^)]+\)")
RE_FONT_FAMILY = re.compile(r"font-family\s*:\s*([^;}]+)")
RE_FONT_WEIGHT = re.compile(r"font-weight\s*:\s*([^;}]+)")
RE_MEDIA = re.compile(r"@media[^{]*\(\s*(min|max)-width\s*:\s*(\d+)px")
RE_RADIUS = re.compile(r"border-radius\s*:\s*([^;}]+)")
RE_SHADOW = re.compile(r"box-shadow\s*:\s*([^;}]+)")
RE_MAXW = re.compile(r"\.([\w-]*container[\w-]*)[^{]*\{([^}]*)\}")
RE_FONT_SIZE = re.compile(r"font-size\s*:\s*([\d.]+(?:px|rem|em))")


def normalizza_colore(c: str) -> str:
    c = c.strip().lower()
    if c.startswith("#") and len(c) == 4:  # #abc -> #aabbcc
        c = "#" + "".join(ch * 2 for ch in c[1:])
    return c


def tabella(titolo: str, intestazioni: list[str], righe: list[list[str]]) -> list[str]:
    out = [f"## {titolo}", ""]
    out.append("| " + " | ".join(intestazioni) + " |")
    out.append("|" + "|".join("---" for _ in intestazioni) + "|")
    for r in righe:
        out.append("| " + " | ".join(r) + " |")
    out.append("")
    return out


def main() -> int:
    candidati = sorted(
        p for p in glob.glob(os.path.join(DIR_DOCS, "css", "*.css")) if ".pretty." not in p
    )
    if not candidati:
        print("[KO] nessun CSS in docs/webflow/css/: esegui prima scarica-css.py")
        return 1
    percorso_css = candidati[0]
    css = open(percorso_css, encoding="utf-8").read()
    nome_css = os.path.basename(percorso_css)

    righe: list[str] = [
        "# Design token dal CSS Webflow",
        "",
        f"> Estratti da `docs/webflow/css/{nome_css}` ({len(css) // 1024} KB) "
        f"con `scripts/estrai-design-tokens.py`. Ultimo aggiornamento: {date.today().isoformat()}.",
        "",
        "Servono come base per `globals.css` e per la configurazione di Tailwind. "
        "Sono **frequenze misurate**, non una palette curata: un colore con 2 occorrenze "
        "è probabilmente un residuo, uno con 200 è un colore di sistema.",
        "",
        "---",
        "",
    ]

    # --- variabili CSS ---
    variabili: dict[str, str] = {}
    for blocco in RE_ROOT.findall(css):
        for nome, valore in RE_VAR.findall(blocco):
            variabili[nome] = valore.strip()
    # anche le variabili dichiarate altrove
    altrove: dict[str, str] = {}
    for nome, valore in RE_VAR.findall(css):
        valore = valore.strip()
        # scarto i falsi positivi: selettori BEM tipo `.tabs--large:after { ... }`
        if "{" in valore or "\n" in valore or not valore:
            continue
        if nome not in variabili:
            altrove[nome] = valore

    if variabili:
        righe += tabella(
            f"Variabili CSS in `:root` / `html` ({len(variabili)})",
            ["variabile", "valore"],
            [[f"`{k}`", f"`{v}`"] for k, v in sorted(variabili.items())],
        )
    else:
        righe += ["## Variabili CSS in `:root`", "", "Nessuna.", ""]
    if altrove:
        righe += tabella(
            f"Altre variabili CSS dichiarate fuori da `:root` ({len(altrove)})",
            ["variabile", "valore"],
            [[f"`{k}`", f"`{v}`"] for k, v in sorted(altrove.items())],
        )

    # --- colori ---
    colori = Counter(normalizza_colore(c) for c in RE_HEX.findall(css))
    colori.update(re.sub(r"\s+", "", c.lower()) for c in RE_RGB.findall(css))
    righe += tabella(
        f"Colori più usati (primi 40 su {len(colori)} distinti)",
        ["colore", "occorrenze"],
        [[f"`{c}`", str(n)] for c, n in colori.most_common(40)],
    )

    # --- font ---
    famiglie = Counter()
    for valore in RE_FONT_FAMILY.findall(css):
        prima = valore.split(",")[0].strip().strip("\"'")
        if prima:
            famiglie[prima] += 1
    pesi = Counter(v.strip() for v in RE_FONT_WEIGHT.findall(css))
    righe += tabella(
        "Famiglie di font (prima voce dello stack)",
        ["famiglia", "occorrenze"],
        [[f"`{c}`", str(n)] for c, n in famiglie.most_common(25)],
    )
    righe += tabella(
        "Pesi font usati",
        ["peso", "occorrenze"],
        [[f"`{c}`", str(n)] for c, n in pesi.most_common(20)],
    )
    righe += [
        "I font arrivano da Google Fonts via `WebFont.load` nell'`<head>`:",
        "",
        "```js",
        "WebFont.load({ google: { families: [",
        '  "Oswald:200,300,400,500,600,700",',
        '  "Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic",',
        '  "Geist:300,400,500,600,700",',
        '  "Inter:300,400,500,600,700"',
        "]}});",
        "```",
        "",
        "In Next.js diventano quattro `next/font/google`.",
        "",
    ]

    # --- dimensioni testo ---
    misure = Counter(RE_FONT_SIZE.findall(css))
    righe += tabella(
        "Dimensioni di testo più frequenti (prime 25)",
        ["font-size", "occorrenze"],
        [[f"`{c}`", str(n)] for c, n in misure.most_common(25)],
    )

    # --- breakpoint ---
    bp = Counter(f"{tipo}-width: {px}px" for tipo, px in RE_MEDIA.findall(css))
    righe += tabella(
        "Breakpoint delle media query",
        ["media query", "occorrenze"],
        [[f"`{c}`", str(n)] for c, n in sorted(bp.items(), key=lambda kv: -kv[1])],
    )
    righe += [
        "Webflow usa tre soglie fisse: **991px** (tablet), **767px** (mobile landscape), "
        "**479px** (mobile portrait), tutte `max-width`, quindi desktop first. "
        "Tailwind lavora al contrario (`min-width`): riscrivere le regole, non tradurle "
        "meccanicamente.",
        "",
    ]

    # --- container ---
    contenitori: list[list[str]] = []
    for nome, corpo in RE_MAXW.findall(css):
        m = re.search(r"max-width\s*:\s*([^;}]+)", corpo)
        if m:
            contenitori.append([f"`.{nome}`", f"`{m.group(1).strip()}`"])
    visti = set()
    contenitori_unici = []
    for r in contenitori:
        chiave = tuple(r)
        if chiave not in visti:
            visti.add(chiave)
            contenitori_unici.append(r)
    righe += tabella(
        f"`max-width` dei container ({len(contenitori_unici)})",
        ["classe", "max-width"],
        contenitori_unici[:60],
    )

    # --- raggi e ombre ---
    raggi = Counter(v.strip() for v in RE_RADIUS.findall(css))
    righe += tabella(
        "Border radius ricorrenti (primi 20)",
        ["valore", "occorrenze"],
        [[f"`{c}`", str(n)] for c, n in raggi.most_common(20)],
    )
    ombre = Counter(re.sub(r"\s+", " ", v.strip()) for v in RE_SHADOW.findall(css))
    righe += tabella(
        "Ombre ricorrenti (prime 20)",
        ["box-shadow", "occorrenze"],
        [[f"`{c}`", str(n)] for c, n in ombre.most_common(20)],
    )

    with open(os.path.join(DIR_DOCS, "design-tokens.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(righe))
    print(f"[OK] design-tokens.md — {len(colori)} colori, {len(famiglie)} famiglie font, {len(bp)} breakpoint")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
