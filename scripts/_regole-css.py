#!/usr/bin/env python3
"""Stampa tutte le regole del foglio Webflow che contengono un selettore.

Uso: python3 _regole-css.py <selettore> [altro-selettore ...]

Per ogni regola stampa anche la media query in cui si trova, così i valori
responsive non si perdono. Serve solo alla lettura del riferimento.
"""
import re
import sys

PERCORSO = "docs/webflow/css/mats-mubly.webflow.shared.6b73890bb.pretty.css"

testo = open(PERCORSO, encoding="utf-8").read()

# spezza in blocchi tenendo traccia delle @media aperte
righe = testo.split("\n")
pila = []
selettore_corrente = []
dentro = False
corpo = []
risultati = []
for riga in righe:
    spoglia = riga.strip()
    if not dentro and spoglia.startswith("@media"):
        pila.append(spoglia.rstrip("{").strip())
        continue
    if not dentro and spoglia == "}" and pila:
        pila.pop()
        continue
    if not dentro and spoglia.endswith("{"):
        selettore_corrente = spoglia[:-1].strip()
        dentro = True
        corpo = []
        continue
    if dentro:
        if spoglia == "}":
            risultati.append((list(pila), selettore_corrente, list(corpo)))
            dentro = False
        else:
            corpo.append(spoglia)

for bersaglio in sys.argv[1:]:
    print(f"\n{'='*70}\n== {bersaglio}\n{'='*70}")
    for media, sel, corpo in risultati:
        parti = [p.strip() for p in sel.split(",")]
        if any(re.search(re.escape(bersaglio) + r"(?![-\w])", p) for p in parti):
            prefisso = " | ".join(media) if media else "(base)"
            print(f"\n-- {prefisso}\n{sel} {{")
            for r in corpo:
                print("  " + r)
            print("}")
