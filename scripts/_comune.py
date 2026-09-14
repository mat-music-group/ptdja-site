"""Funzioni comuni agli script di estrazione del riferimento Webflow.

Nota: su questa macchina `urllib` fallisce per verifica SSL, quindi ogni
download passa da `curl` lanciato con `subprocess`.
"""

from __future__ import annotations

import os
import re
import subprocess
import unicodedata

# Percorsi base del repo, calcolati rispetto a questo file (scripts/_comune.py)
DIR_SCRIPT = os.path.dirname(os.path.abspath(__file__))
DIR_REPO = os.path.dirname(DIR_SCRIPT)
DIR_DOCS = os.path.join(DIR_REPO, "docs", "webflow")
DIR_PUBLIC = os.path.join(DIR_REPO, "public", "webflow")

BASE_URL = "https://www.petetong-djacademy.com"
USER_AGENT = "Mozilla/5.0"

# slug -> percorso sul sito Webflow
PAGINE: dict[str, str] = {
    "home": "/",
    "dj-course": "/dj-course",
    "producer-course": "/producer-course",
    "mix-mastering-course": "/mix-mastering-course",
    "pricing-page": "/pricing-page",
    "play-get-signed": "/play-get-signed",
    "advanced-djs": "/advanced-djs",
    "recess": "/recess",
    "terms-conditions": "/terms-conditions",
    "terms-conditions-sa": "/terms-conditions-sa",
    # Webflow serve la 404 custom su qualsiasi URL inesistente
    "404": "/pagina-che-non-esiste-xyz",
}


def assicura_dir(percorso: str) -> str:
    os.makedirs(percorso, exist_ok=True)
    return percorso


def curl_testo(url: str, timeout: int = 90) -> tuple[str | None, str]:
    """Scarica un URL come testo. Ritorna (contenuto, messaggio_errore)."""
    try:
        res = subprocess.run(
            ["curl", "-s", "-L", "-A", USER_AGENT, "--max-time", str(timeout), url],
            capture_output=True,
            timeout=timeout + 15,
        )
    except subprocess.TimeoutExpired:
        return None, "timeout"
    if res.returncode != 0:
        return None, f"curl exit {res.returncode}"
    testo = res.stdout.decode("utf-8", errors="replace")
    if not testo.strip():
        return None, "risposta vuota"
    return testo, ""


def curl_file(url: str, destinazione: str, timeout: int = 180) -> tuple[bool, str]:
    """Scarica un URL su file. Ritorna (successo, messaggio_errore)."""
    assicura_dir(os.path.dirname(destinazione))
    try:
        res = subprocess.run(
            [
                "curl", "-s", "-L", "-A", USER_AGENT,
                "--max-time", str(timeout),
                "-w", "%{http_code}",
                "-o", destinazione,
                url,
            ],
            capture_output=True,
            timeout=timeout + 20,
        )
    except subprocess.TimeoutExpired:
        return False, "timeout"
    if res.returncode != 0:
        return False, f"curl exit {res.returncode}"
    codice = res.stdout.decode("utf-8", errors="replace").strip()[-3:]
    if codice != "200":
        return False, f"HTTP {codice}"
    if not os.path.exists(destinazione) or os.path.getsize(destinazione) == 0:
        return False, "file vuoto"
    return True, ""


# Gli asset Webflow hanno il formato <hash 24 char>_<displayName>.<ext>.
# Capita che il displayName contenga a sua volta un hash di un caricamento
# precedente, quindi gli hash in testa si tolgono finché ce ne sono.
RE_HASH_WEBFLOW = re.compile(r"^[0-9a-f]{20,40}[_-]", re.IGNORECASE)


def nome_leggibile(url: str) -> str:
    """Dal URL Webflow ricava un nome file kebab-case senza hash."""
    percorso = url.split("?")[0].split("#")[0]
    base = percorso.rsplit("/", 1)[-1]
    try:
        from urllib.parse import unquote

        base = unquote(base)
    except Exception:
        pass
    radice, punto, ext = base.rpartition(".")
    if not punto:
        radice, ext = base, ""
    # via gli hash davanti, anche più di uno
    for _ in range(4):
        nuovo = RE_HASH_WEBFLOW.sub("", radice)
        if nuovo == radice or not nuovo:
            break
        radice = nuovo
    # via i suffissi di variante srcset (-p-500, -p-1080)
    radice = re.sub(r"-p-\d+$", "", radice)
    radice = unicodedata.normalize("NFKD", radice).encode("ascii", "ignore").decode()
    radice = re.sub(r"[^A-Za-z0-9]+", "-", radice).strip("-").lower()
    radice = re.sub(r"-{2,}", "-", radice)
    if not radice:
        radice = "asset"
    if len(radice) > 70:
        radice = radice[:70].rstrip("-")
    ext = re.sub(r"[^A-Za-z0-9]", "", ext).lower()
    return f"{radice}.{ext}" if ext else radice


def percorso_html(slug: str) -> str:
    return os.path.join(DIR_DOCS, "html", f"{slug}.html")
