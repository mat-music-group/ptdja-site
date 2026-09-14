"""Fase 6: raccoglie e scarica gli asset usati dalle 11 pagine.

Origini considerate: `src`, `srcset`, `data-src` (incluse le animazioni Lottie),
`background-image` negli stili inline, `og:image`, `twitter:image`, favicon e
webclip, video `.mp4` locali, font self hosted.

Scrive gli asset in `public/webflow/<slug-o-shared>/<nome>.<ext>` e la mappa in
`docs/webflow/asset-map.json`.
"""

from __future__ import annotations

import json
import os
import re
import sys
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from bs4 import BeautifulSoup

from _comune import (
    BASE_URL,
    DIR_DOCS,
    DIR_PUBLIC,
    PAGINE,
    assicura_dir,
    curl_file,
    nome_leggibile,
    percorso_html,
)

RE_URL_CSS = re.compile(r"url\(\s*['\"]?([^'\")]+)['\"]?\s*\)")
EXT_ASSET = (
    ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif", ".ico",
    ".json", ".mp4", ".webm", ".woff", ".woff2", ".ttf", ".otf", ".eot",
)


def assoluto(url: str) -> str | None:
    if not url:
        return None
    url = url.strip()
    if url.startswith(("data:", "blob:", "javascript:", "#")):
        return None
    if url.startswith("//"):
        return "https:" + url
    if url.startswith("/"):
        return BASE_URL + url
    if url.startswith("http"):
        return url
    return BASE_URL + "/" + url


def larghezze_srcset(srcset: str) -> tuple[list[int], str | None]:
    voci: list[tuple[int, str]] = []
    for pezzo in srcset.split(","):
        pezzo = pezzo.strip()
        if not pezzo:
            continue
        parti = pezzo.split()
        w = 0
        if len(parti) > 1 and parti[1].endswith("w"):
            try:
                w = int(parti[1][:-1])
            except ValueError:
                w = 0
        voci.append((w, parti[0]))
    if not voci:
        return [], None
    voci.sort()
    return [w for w, _ in voci if w], voci[-1][1]


def main() -> int:
    # url -> dati
    mappa: dict[str, dict] = {}

    def registra(url: str | None, slug: str, alt: str = "", larghezze=None,
                 scaricare: str | None = None, origine: str = "") -> None:
        url = assoluto(url)
        if not url:
            return
        base = url.split("?")[0].lower()
        if not base.endswith(EXT_ASSET):
            return
        voce = mappa.setdefault(
            url,
            {
                "path": None,
                "pagine": [],
                "alt": "",
                "larghezze": [],
                "url_scaricato": scaricare or url,
                "origine": set(),
            },
        )
        if slug not in voce["pagine"]:
            voce["pagine"].append(slug)
        if alt and not voce["alt"]:
            voce["alt"] = alt
        if larghezze:
            voce["larghezze"] = sorted(set(voce["larghezze"]) | set(larghezze))
        if scaricare:
            voce["url_scaricato"] = assoluto(scaricare) or url
        if origine:
            voce["origine"].add(origine)

    for slug in PAGINE:
        html = open(percorso_html(slug), encoding="utf-8").read()
        soup = BeautifulSoup(html, "html.parser")

        # head: og:image, twitter:image, favicon, webclip
        for prop, origine in (("og:image", "og:image"), ("twitter:image", "twitter:image")):
            tag = soup.head.find("meta", attrs={"property": prop}) or soup.head.find(
                "meta", attrs={"name": prop}
            )
            if tag:
                registra(tag.get("content"), slug, origine=origine)
        for rel, origine in (
            ("shortcut icon", "favicon"),
            ("icon", "favicon"),
            ("apple-touch-icon", "webclip"),
        ):
            tag = soup.head.find("link", rel=rel)
            if tag:
                registra(tag.get("href"), slug, origine=origine)

        for img in soup.find_all("img"):
            larghezze, piu_grande = ([], None)
            if img.get("srcset"):
                larghezze, piu_grande = larghezze_srcset(img["srcset"])
            registra(
                img.get("src"),
                slug,
                alt=img.get("alt") or "",
                larghezze=larghezze,
                scaricare=piu_grande,
                origine="img",
            )
        for src in soup.find_all(attrs={"data-src": True}):
            registra(src["data-src"], slug, origine="data-src/lottie")
        for el in soup.find_all("source"):
            if el.get("srcset"):
                larghezze, piu_grande = larghezze_srcset(el["srcset"])
                registra(piu_grande, slug, larghezze=larghezze, origine="source")
            registra(el.get("src"), slug, origine="source")
        for el in soup.find_all("video"):
            registra(el.get("src"), slug, origine="video")
            registra(el.get("poster"), slug, origine="video-poster")
        for el in soup.find_all(style=True):
            for u in RE_URL_CSS.findall(el["style"]):
                registra(u, slug, origine="style inline")
        for el in soup.find_all("link", href=True):
            if (el.get("as") == "font") or el["href"].lower().split("?")[0].endswith(
                (".woff", ".woff2", ".ttf", ".otf")
            ):
                registra(el["href"], slug, origine="font")

    # ---- nomi e cartelle ----
    usati: dict[str, str] = {}  # path -> url
    for url, voce in mappa.items():
        cartella = "shared" if len(voce["pagine"]) > 1 else voce["pagine"][0]
        nome = nome_leggibile(voce["url_scaricato"])
        path = f"/webflow/{cartella}/{nome}"
        if path in usati and usati[path] != url:
            radice, _, ext = nome.rpartition(".")
            import hashlib

            suffisso = hashlib.md5(url.encode()).hexdigest()[:6]
            nome = f"{radice}-{suffisso}.{ext}" if ext else f"{nome}-{suffisso}"
            path = f"/webflow/{cartella}/{nome}"
        usati[path] = url
        voce["path"] = path

    # ---- download ----
    falliti: list[tuple[str, str]] = []
    scaricati = 0
    byte_totali = 0
    for url, voce in sorted(mappa.items()):
        dest = os.path.join(DIR_PUBLIC, voce["path"].replace("/webflow/", "", 1))
        if os.path.exists(dest) and os.path.getsize(dest) > 0:
            byte_totali += os.path.getsize(dest)
            scaricati += 1
            continue
        ok, err = curl_file(voce["url_scaricato"], dest)
        if not ok:
            falliti.append((voce["url_scaricato"], err))
            voce["errore"] = err
            print(f"[KO] {voce['url_scaricato']}: {err}")
            continue
        scaricati += 1
        byte_totali += os.path.getsize(dest)

    # ---- mappa su file ----
    uscita = {}
    for url, voce in sorted(mappa.items()):
        uscita[url] = {
            "path": voce["path"],
            "pagine": voce["pagine"],
            "alt": voce["alt"],
            "larghezze": voce["larghezze"],
            "url_scaricato": voce["url_scaricato"],
            "origine": sorted(voce["origine"]),
        }
        if "errore" in voce:
            uscita[url]["errore"] = voce["errore"]

    documento = {
        "_generato": date.today().isoformat(),
        "_script": "scripts/estrai-asset.py",
        "_nota": (
            "Chiave: URL originale su cdn.prod.website-files.com così come compare nell'HTML. "
            "`url_scaricato` è la variante effettivamente salvata (la più grande dello srcset). "
            "`path` è il percorso pubblico nel repo Next.js (file fisico in public/webflow/...). "
            "`larghezze` elenca le larghezze disponibili nello srcset di Webflow."
        ),
        "_totali": {
            "asset": len(mappa),
            "scaricati": scaricati,
            "falliti": len(falliti),
            "megabyte": round(byte_totali / 1024 / 1024, 2),
        },
        "asset": uscita,
    }
    with open(os.path.join(DIR_DOCS, "asset-map.json"), "w", encoding="utf-8") as f:
        json.dump(documento, f, ensure_ascii=False, indent=2)

    print(f"\nAsset totali: {len(mappa)}")
    print(f"Scaricati:    {scaricati}  ({round(byte_totali/1024/1024, 2)} MB)")
    print(f"Falliti:      {len(falliti)}")
    for u, e in falliti:
        print(f"  - {u}: {e}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
