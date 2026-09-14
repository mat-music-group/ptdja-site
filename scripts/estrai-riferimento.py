"""Estrazione completa del riferimento Webflow, punti 1 a 7.

Lancia in ordine le fasi che producono `docs/webflow/`:

  1. scarica-html.py          HTML pubblicato delle 11 pagine
  2. scarica-css.py           foglio CSS condiviso + versione leggibile
  3. estrai-custom-code.py    custom code di sito e di pagina
  4. estrai-meta.py           metadati e JSON-LD
  5. estrai-outline.py        struttura sezione per sezione
  6. estrai-asset.py          mappa e download degli asset
  7. estrai-design-tokens.py  design token dal CSS

Gli screenshot (punto 8) stanno a parte, in `screenshot-riferimento.mjs`,
perché richiedono Playwright.

Uso:
    python3 scripts/estrai-riferimento.py            # tutto
    python3 scripts/estrai-riferimento.py meta css   # solo alcune fasi
"""

from __future__ import annotations

import os
import subprocess
import sys

DIR_SCRIPT = os.path.dirname(os.path.abspath(__file__))

FASI = [
    ("html", "scarica-html.py", "HTML pubblicato delle 11 pagine"),
    ("css", "scarica-css.py", "foglio CSS Webflow condiviso"),
    ("custom-code", "estrai-custom-code.py", "custom code di sito e di pagina"),
    ("meta", "estrai-meta.py", "metadati e JSON-LD"),
    ("outline", "estrai-outline.py", "struttura sezione per sezione"),
    ("asset", "estrai-asset.py", "mappa e download degli asset"),
    ("token", "estrai-design-tokens.py", "design token dal CSS"),
]


def main() -> int:
    richieste = [a for a in sys.argv[1:] if not a.startswith("-")]
    da_fare = [f for f in FASI if not richieste or f[0] in richieste]
    if richieste and not da_fare:
        print("Fasi disponibili: " + ", ".join(f[0] for f in FASI))
        return 1

    falliti = []
    for nome, script, descrizione in da_fare:
        print(f"\n{'=' * 70}\n[{nome}] {descrizione}\n{'=' * 70}")
        esito = subprocess.run([sys.executable, os.path.join(DIR_SCRIPT, script)])
        if esito.returncode != 0:
            falliti.append(nome)

    print(f"\n{'=' * 70}")
    if falliti:
        print("Fasi con errori: " + ", ".join(falliti))
        return 1
    print("Tutte le fasi completate. Gli screenshot si fanno a parte:")
    print("  cd scripts && node screenshot-riferimento.mjs")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
