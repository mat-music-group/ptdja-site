"""Fase 2: scarica il foglio CSS condiviso di Webflow e ne produce una versione leggibile."""

from __future__ import annotations

import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from _comune import DIR_DOCS, assicura_dir, curl_testo, percorso_html

RE_CSS = re.compile(
    r'href="(https://cdn\.prod\.website-files\.com/[^"]+/css/[^"]+\.css)"'
)


def abbellisci(css: str) -> str:
    """Formattazione minima e prevedibile: una regola per riga, una dichiarazione per riga.

    Non è un formatter CSS completo: serve solo a rendere leggibile il file
    minificato di Webflow per potervi cercare dentro a mano.
    """
    fuori = []
    indent = 0
    i = 0
    n = len(css)
    in_stringa = None
    while i < n:
        c = css[i]
        if in_stringa:
            fuori.append(c)
            if c == "\\" and i + 1 < n:
                fuori.append(css[i + 1])
                i += 2
                continue
            if c == in_stringa:
                in_stringa = None
            i += 1
            continue
        if c in "\"'":
            in_stringa = c
            fuori.append(c)
            i += 1
            continue
        if css[i : i + 2] == "/*":
            fine = css.find("*/", i + 2)
            fine = n if fine < 0 else fine + 2
            fuori.append("\n" + css[i:fine] + "\n" + "  " * indent)
            i = fine
            continue
        if c == "{":
            indent += 1
            fuori.append(" {\n" + "  " * indent)
            i += 1
            while i < n and css[i] in " \t\n":
                i += 1
            continue
        if c == "}":
            indent = max(0, indent - 1)
            fuori.append("\n" + "  " * indent + "}\n" + "  " * indent)
            i += 1
            while i < n and css[i] in " \t\n":
                i += 1
            continue
        if c == ";":
            fuori.append(";\n" + "  " * indent)
            i += 1
            while i < n and css[i] in " \t\n":
                i += 1
            continue
        if c == "," and indent == 0:
            fuori.append(",\n")
            i += 1
            while i < n and css[i] in " \t\n":
                i += 1
            continue
        if c in "\n\t":
            fuori.append(" ")
            i += 1
            continue
        fuori.append(c)
        i += 1
    testo = "".join(fuori)
    testo = re.sub(r"[ \t]+\n", "\n", testo)
    testo = re.sub(r"\n{3,}", "\n\n", testo)
    return testo


def main() -> int:
    html = open(percorso_html("home"), encoding="utf-8").read()
    head = html[: html.find("<body")]
    m = RE_CSS.search(head)
    if not m:
        print("[KO] URL del CSS non trovato nell'head di home.html")
        return 1
    url = m.group(1)
    nome = url.rsplit("/", 1)[-1]
    dir_css = assicura_dir(os.path.join(DIR_DOCS, "css"))

    css, err = curl_testo(url)
    if css is None:
        print(f"[KO] {url}: {err}")
        return 1
    with open(os.path.join(dir_css, nome), "w", encoding="utf-8") as f:
        f.write(css)
    nome_pretty = nome.replace(".css", ".pretty.css")
    with open(os.path.join(dir_css, nome_pretty), "w", encoding="utf-8") as f:
        f.write(abbellisci(css))
    with open(os.path.join(dir_css, "SORGENTE.txt"), "w", encoding="utf-8") as f:
        f.write(url + "\n")
    print(f"[OK] {nome} ({len(css)} byte) e {nome_pretty}")
    print(f"     sorgente: {url}")

    # verifica che tutte le pagine usino lo stesso foglio
    from _comune import PAGINE

    for slug in PAGINE:
        h = open(percorso_html(slug), encoding="utf-8").read()
        mm = RE_CSS.search(h[: h.find("<body")])
        trovato = mm.group(1) if mm else "(nessuno)"
        if trovato != url:
            print(f"[!!] {slug} usa un CSS diverso: {trovato}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
