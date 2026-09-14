#!/usr/bin/env python3
"""Estrae e indenta un frammento dell'HTML Webflow, per poterlo leggere.

Uso: python3 _estrai-frammento.py <file.html> <marcatore-inizio> [n-caratteri]

Cerca la prima occorrenza del marcatore, risale all'inizio del tag `<` che lo
contiene, e stampa i successivi n caratteri con un a capo prima di ogni tag.
Serve solo alla lettura: non tocca nulla.
"""
import re
import sys

percorso = sys.argv[1]
marcatore = sys.argv[2]
quanti = int(sys.argv[3]) if len(sys.argv) > 3 else 6000

testo = open(percorso, encoding="utf-8").read()
i = testo.find(marcatore)
if i < 0:
    sys.exit("marcatore non trovato")
inizio = testo.rfind("<", 0, i)
frammento = testo[inizio:inizio + quanti]
# a capo prima di ogni tag di apertura o chiusura, poi indentazione grezza
frammento = re.sub(r"(<)", r"\n<", frammento)
livello = 0
vuoti = {"img", "br", "input", "source", "meta", "link"}
righe = []
for riga in frammento.split("\n"):
    riga = riga.strip()
    if not riga:
        continue
    if riga.startswith("</"):
        livello = max(0, livello - 1)
    righe.append("  " * livello + riga)
    m = re.match(r"<([a-zA-Z0-9]+)", riga)
    if m and not riga.startswith("</") and m.group(1).lower() not in vuoti and not riga.rstrip().endswith("/>"):
        livello += 1
print("\n".join(righe))
