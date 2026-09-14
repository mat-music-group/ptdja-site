#!/usr/bin/env python3
"""Stampa le regole del foglio Webflow il cui selettore corrisponde ESATTAMENTE.

Uso: python3 _regole-esatte.py '.classe-a.classe-b' '.altra' ...

A differenza di `_regole-css.py` (che cerca per sottostringa e quindi tira
dentro decine di varianti), qui una regola esce solo se uno dei selettori
separati da virgola è identico a quello chiesto. Serve a leggere i numeri di
una classe precisa senza sommergersi di rumore. Sola lettura.
"""
import sys
from pathlib import Path

PERCORSO = Path(__file__).resolve().parent.parent / (
    "docs/webflow/css/mats-mubly.webflow.shared.6b73890bb.pretty.css"
)

cercati = set(sys.argv[1:])

righe = PERCORSO.read_text(encoding="utf-8").split("\n")
pila: list[str] = []
dentro = False
selettore = ""
sospeso = ""  # righe di selettore che finiscono con la virgola
corpo: list[str] = []
for riga in righe:
    spoglia = riga.strip()
    if not dentro and spoglia.startswith("@media"):
        pila.append(spoglia.rstrip("{").strip())
        continue
    if not dentro and spoglia == "}" and pila:
        pila.pop()
        continue
    if not dentro and spoglia.endswith(","):
        sospeso += spoglia + " "
        continue
    if not dentro and spoglia.endswith("{"):
        selettore = (sospeso + spoglia[:-1]).strip()
        sospeso = ""
        dentro = True
        corpo = []
        continue
    if dentro:
        if spoglia == "}":
            parti = {p.strip() for p in selettore.replace("\n", " ").split(",")}
            if parti & cercati:
                testa = " / ".join(pila) if pila else "(base)"
                print(f"-- {testa}\n{selettore} {{")
                print("\n".join("  " + c for c in corpo if c))
                print("}\n")
            dentro = False
        else:
            corpo.append(spoglia)
