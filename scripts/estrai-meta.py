"""Fase 4: metadati e JSON-LD di ogni pagina in docs/webflow/meta/<slug>.json."""

from __future__ import annotations

import json
import os
import sys
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from bs4 import BeautifulSoup

from _comune import BASE_URL, DIR_DOCS, PAGINE, assicura_dir, percorso_html

# name="..." che ci interessano
META_NAME = [
    "description",
    "robots",
    "google-site-verification",
    "viewport",
    "twitter:title",
    "twitter:description",
    "twitter:image",
    "twitter:card",
    "twitter:site",
    "twitter:creator",
]
META_PROPERTY = [
    "og:title",
    "og:description",
    "og:image",
    "og:type",
    "og:url",
    "og:site_name",
    "og:locale",
]


def main() -> int:
    dir_meta = assicura_dir(os.path.join(DIR_DOCS, "meta"))
    indice = {
        "_generato": date.today().isoformat(),
        "_sorgente": BASE_URL,
        "_nota": "Estratto da scripts/estrai-meta.py sull'HTML pubblicato. Un file per pagina in meta/<slug>.json.",
        "pagine": {},
    }

    for slug, percorso in PAGINE.items():
        html = open(percorso_html(slug), encoding="utf-8").read()
        soup = BeautifulSoup(html, "html.parser")
        head = soup.head

        dati: dict = {
            "slug": slug,
            "url": BASE_URL + percorso,
            "webflow_page_id": (soup.html.get("data-wf-page") if soup.html else None),
            "lang": (soup.html.get("lang") if soup.html else None),
            "title": head.title.string.strip() if head and head.title and head.title.string else None,
        }

        for nome in META_NAME:
            tag = head.find("meta", attrs={"name": nome})
            dati[nome] = tag.get("content") if tag else None
        for prop in META_PROPERTY:
            tag = head.find("meta", attrs={"property": prop})
            dati[prop] = tag.get("content") if tag else None

        can = head.find("link", rel="canonical")
        dati["canonical"] = can.get("href") if can else None
        fav = head.find("link", rel="shortcut icon") or head.find("link", rel="icon")
        dati["favicon"] = fav.get("href") if fav else None
        webclip = head.find("link", rel="apple-touch-icon")
        dati["apple_touch_icon"] = webclip.get("href") if webclip else None

        # robots: Webflow non lo mette se è "index, follow"
        if not dati.get("robots"):
            dati["robots"] = None
            dati["_nota_robots"] = "nessun meta robots nella pagina: vale il default index,follow"

        # JSON-LD
        jsonld = []
        for sc in head.find_all("script", attrs={"type": "application/ld+json"}):
            testo = sc.string or sc.get_text()
            if not testo or not testo.strip():
                continue
            try:
                jsonld.append(json.loads(testo))
            except json.JSONDecodeError as e:
                jsonld.append({"_ERRORE_PARSING": str(e), "_grezzo": testo})
        dati["jsonld"] = jsonld

        with open(os.path.join(dir_meta, f"{slug}.json"), "w", encoding="utf-8") as f:
            json.dump(dati, f, ensure_ascii=False, indent=2)

        indice["pagine"][slug] = {
            "url": dati["url"],
            "file": f"meta/{slug}.json",
            "title": dati["title"],
            "description": dati["description"],
            "canonical": dati["canonical"],
            "og:image": dati["og:image"],
            "jsonld_tipi": [
                t
                for blocco in jsonld
                for t in (
                    [n.get("@type") for n in blocco["@graph"]]
                    if isinstance(blocco, dict) and "@graph" in blocco
                    else [blocco.get("@type") if isinstance(blocco, dict) else None]
                )
            ],
            "jsonld_blocchi": len(jsonld),
        }
        print(f"[OK] {slug:22s} title={(dati['title'] or '')[:50]!r} jsonld={len(jsonld)}")

    with open(os.path.join(dir_meta, "_tutte.json"), "w", encoding="utf-8") as f:
        json.dump(indice, f, ensure_ascii=False, indent=2)
    print("[OK] meta/_tutte.json")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
