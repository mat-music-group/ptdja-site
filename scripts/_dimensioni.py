#!/usr/bin/env python3
"""Stampa le dimensioni reali dei file immagine passati (path dentro `public/`).

Uso: python3 _dimensioni.py /webflow/dj-course/dj-eng.webp ...

Serve a dare a `next/image` `width` e `height` veri invece che stimati.
"""
import sys
from pathlib import Path

from PIL import Image

RADICE = Path(__file__).resolve().parent.parent / "public"
for p in sys.argv[1:]:
    f = RADICE / p.lstrip("/")
    if not f.exists():
        print(p, "MANCA")
        continue
    with Image.open(f) as img:
        print(f"{p} {img.size[0]}x{img.size[1]}")
