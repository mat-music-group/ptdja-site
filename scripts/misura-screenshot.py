#!/usr/bin/env python3
"""Misure sugli screenshot, per la parità visiva fra Webflow e la ricostruzione.

Legge e basta: non tocca né il repo né le pagine. Quattro comandi.

  # altezze e posizioni delle linee separatrici, riferimento contro locale
  python3 scripts/misura-screenshot.py confronto pricing-page
  python3 scripts/misura-screenshot.py confronto pricing-page --locale docs/confronto

  # righe chiare a tutta larghezza in una fascia e in un intervallo di x
  python3 scripts/misura-screenshot.py linee <png> --x 120 440 --y 557 1390

  # riquadro del contenuto non di sfondo in una fascia (larghezza di un blocco)
  python3 scripts/misura-screenshot.py riquadro <png> --y 1600 2400

  # dove una colonna verticale cambia colore (bordi delle card, bottoni)
  python3 scripts/misura-screenshot.py colonna <png> --x 96 --y 520 1600

  # ritaglio di una fascia, per guardarla con gli occhi
  python3 scripts/misura-screenshot.py ritaglio <png> --y 0 620 --out /tmp/fascia.png

Il comando `confronto` è quello che serve quasi sempre: confronta
`docs/webflow/screenshots/<slug>-{desktop,mobile}.png` (il sito vero) con gli
screenshot del build locale prodotti da `screenshot-riferimento.mjs`.
L'intervallo di x predefinito evita le colonne laterali, dove una linea
separatrice non arriva.
"""

import argparse
import sys

from PIL import Image

RIFERIMENTO = "docs/webflow/screenshots"
LOCALE = "docs/confronto"
# x entro cui cercare le linee: desktop (colonna destra della FAQ) e mobile.
FASCE = {"desktop": (760, 1380), "mobile": (30, 360)}


def linee(path, x0, x1, y0=0, y1=None, soglia=150, quota=0.9, spessore=3):
    """Righe in cui quasi tutti i pixel fra x0 e x1 sono più chiari di `soglia`
    e che formano un gruppo sottile: sono i filetti separatori."""
    im = Image.open(path).convert("L")
    y1 = min(y1 or im.height, im.height)
    trovate = []
    for y in range(y0, y1):
        riga = [im.getpixel((x, y)) for x in range(x0, x1, 4)]
        if sum(1 for v in riga if v > soglia) / len(riga) > quota:
            trovate.append(y)
    gruppi = []
    for y in trovate:
        if not gruppi or y - gruppi[-1][-1] > 1:
            gruppi.append([y])
        else:
            gruppi[-1].append(y)
    return im.height, [g[0] for g in gruppi if len(g) <= spessore]


def riquadro(path, y0, y1):
    """Riquadro del contenuto che non è sfondo, dentro una fascia verticale."""
    im = Image.open(path).convert("RGB")
    fondo = im.getpixel((1, y0))
    xs, ys = [], []
    for y in range(y0, min(y1, im.height)):
        for x in range(0, im.width, 2):
            p = im.getpixel((x, y))
            if max(abs(a - b) for a, b in zip(p, fondo)) > 12:
                xs.append(x)
                ys.append(y)
    if not xs:
        return None
    return min(xs), max(xs), min(ys), max(ys), fondo


def colonna(path, x, y0, y1, soglia=14):
    """Righe in cui la colonna `x` cambia colore: bordi, filetti, bottoni."""
    im = Image.open(path).convert("RGB")
    prec = im.getpixel((x, y0))
    cambi = []
    for y in range(y0 + 1, min(y1, im.height)):
        p = im.getpixel((x, y))
        if max(abs(a - b) for a, b in zip(p, prec)) > soglia:
            cambi.append((y, prec, p))
        prec = p
    return cambi


def comando_confronto(a):
    for forma, (x0, x1) in FASCE.items():
        rif = f"{a.riferimento}/{a.slug}-{forma}.png"
        loc = f"{a.locale}/{a.slug}-{forma}.png"
        hr, lr = linee(rif, x0, x1)
        hl, ll = linee(loc, x0, x1)
        print(f"{forma}: webflow {hr}  next {hl}  scarto {hl - hr:+d}")
        print("  webflow", lr)
        print("  next   ", ll)
        if len(lr) == len(ll):
            print("  scarti ", [b - a_ for a_, b in zip(lr, ll)])


def main():
    p = argparse.ArgumentParser(add_help=True)
    sub = p.add_subparsers(dest="cmd", required=True)

    c = sub.add_parser("confronto")
    c.add_argument("slug")
    c.add_argument("--riferimento", default=RIFERIMENTO)
    c.add_argument("--locale", default=LOCALE)

    for nome in ("linee", "riquadro", "colonna", "ritaglio"):
        s = sub.add_parser(nome)
        s.add_argument("png")
        s.add_argument("--y", nargs=2, type=int, default=[0, 10**9])
        if nome in ("linee",):
            s.add_argument("--x", nargs=2, type=int, required=True)
            s.add_argument("--soglia", type=int, default=150)
        if nome == "colonna":
            s.add_argument("--x", type=int, required=True)
        if nome == "ritaglio":
            s.add_argument("--out", required=True)

    a = p.parse_args()

    if a.cmd == "confronto":
        return comando_confronto(a)

    if a.cmd == "linee":
        _, ys = linee(a.png, a.x[0], a.x[1], a.y[0], a.y[1], soglia=a.soglia)
        print(ys)
        return

    if a.cmd == "riquadro":
        r = riquadro(a.png, a.y[0], a.y[1])
        if not r:
            print("niente")
            return
        x0, x1, y0, y1, fondo = r
        print(f"x {x0}..{x1} (larg {x1 - x0})  y {y0}..{y1} (alt {y1 - y0})  fondo {fondo}")
        return

    if a.cmd == "colonna":
        for y, prima, dopo in colonna(a.png, a.x, a.y[0], a.y[1]):
            print(y, prima, "->", dopo)
        return

    if a.cmd == "ritaglio":
        im = Image.open(a.png)
        y1 = min(a.y[1], im.height)
        im.crop((0, a.y[0], im.width, y1)).save(a.out)
        print(a.out, im.width, y1 - a.y[0])


if __name__ == "__main__":
    sys.exit(main())
