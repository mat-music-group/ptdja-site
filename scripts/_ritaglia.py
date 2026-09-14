#!/usr/bin/env python3
"""Ritaglia uno screenshot full page in fette leggibili.

Uso: python3 _ritaglia.py <png> <cartella-uscita> [altezza-fetta]

Serve solo a guardare uno screenshot alto 11.000 px senza che venga ridotto a
un francobollo. Le fette finiscono in /tmp, non nel repo.
"""
import sys
from pathlib import Path

from PIL import Image

sorgente = Path(sys.argv[1])
uscita = Path(sys.argv[2])
altezza = int(sys.argv[3]) if len(sys.argv) > 3 else 1400

uscita.mkdir(parents=True, exist_ok=True)
img = Image.open(sorgente)
larghezza, totale = img.size
print(f"{sorgente.name}: {larghezza}x{totale}")
n = 0
for y in range(0, totale, altezza):
    fetta = img.crop((0, y, larghezza, min(y + altezza, totale)))
    percorso = uscita / f"{sorgente.stem}-{n:02d}-{y}.png"
    fetta.save(percorso)
    print(percorso)
    n += 1
