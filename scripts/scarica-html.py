"""Fase 1: scarica l'HTML pubblicato delle 11 pagine in docs/webflow/html/."""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from _comune import BASE_URL, DIR_DOCS, PAGINE, assicura_dir, curl_testo, percorso_html


def main() -> int:
    assicura_dir(os.path.join(DIR_DOCS, "html"))
    errori = []
    for slug, percorso in PAGINE.items():
        url = BASE_URL + percorso
        html, err = curl_testo(url)
        if html is None:
            errori.append((slug, url, err))
            print(f"[KO] {slug}: {err}")
            continue
        dest = percorso_html(slug)
        with open(dest, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"[OK] {slug:24s} {len(html):>8d} byte  <- {url}")
    if errori:
        print("\nFalliti:")
        for slug, url, err in errori:
            print(f"  {slug} ({url}): {err}")
    return 1 if errori else 0


if __name__ == "__main__":
    raise SystemExit(main())
