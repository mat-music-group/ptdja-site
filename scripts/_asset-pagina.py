#!/usr/bin/env python3
"""Elenca gli asset di una pagina: URL Webflow, path nel repo, alt, larghezze.

Uso: python3 _asset-pagina.py <slug>

Legge `docs/webflow/asset-map.json` e stampa solo le voci usate da quella
pagina, ordinate per path. Sola lettura.
"""
import json
import sys
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
slug = sys.argv[1]

mappa = json.loads((RADICE / "docs/webflow/asset-map.json").read_text(encoding="utf-8"))
for url, voce in sorted(mappa["asset"].items(), key=lambda v: v[1]["path"]):
    if slug not in voce["pagine"]:
        continue
    esiste = (RADICE / "public" / voce["path"].lstrip("/")).exists()
    print(
        voce["path"],
        "|",
        "OK" if esiste else "MANCA",
        "| alt=" + json.dumps(voce["alt"], ensure_ascii=False),
        "| w=" + ",".join(str(x) for x in voce["larghezze"]),
        "|",
        url.rsplit("/", 1)[-1],
    )
