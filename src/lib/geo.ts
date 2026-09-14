/*
 * Stima del paese del visitatore, lato client.
 *
 * Porta in TypeScript lo script "GEO-GATED REGION BLOCKER v0.3 — Adblock-Proof
 * Edition" che sul sito Webflow sta in un embed dentro il blocco prezzi
 * (testo integrale in `docs/webflow/custom-code-per-pagina.md`, embed
 * `5701c958`). Stesse tabelle, stesso ordine, stessi timeout, stesso fallback.
 *
 * A cosa serve: la pagina prezzi non ha nessun selettore di valuta. Le tre
 * versioni del listino (USD, EUR, GBP) stanno tutte e tre nel DOM e se ne
 * mostra una sola, in base al paese stimato qui.
 *
 * ── PERCHÉ LATO CLIENT E NON DALL'HEADER DI VERCEL ───────────────────────
 * Vercel offre `x-vercel-ip-country`, che sarebbe più affidabile. Non lo
 * usiamo, per due motivi:
 *   1. la regola numero uno del repo è "identico, non migliore": sul sito la
 *      valuta dipende dal fuso orario del browser, non dall'IP, e un utente
 *      italiano dietro una VPN americana oggi vede euro. Cambiare fonte
 *      cambierebbe il comportamento osservabile;
 *   2. leggere un header rende dinamica la pagina, e una pagina di listino
 *      servita dalla cache condivisa con la valuta di un altro paese è un
 *      danno peggiore del problema che risolve.
 *
 * ── PERCHÉ NON C'È IL LAMPO DI VALUTA SBAGLIATA ──────────────────────────
 * Stessa tecnica del sito: `globals.css` nasconde con `display: none` tutto
 * ciò che ha `data-geo`, e i blocchi diventano visibili solo quando ricevono
 * la classe `geo-visibile`. L'HTML servito dal server contiene tutte e tre le
 * valute e non ne mostra nessuna; il primo frame dopo l'idratazione accende
 * quella giusta. Il prezzo di questa fedeltà è che senza JavaScript il
 * listino resta invisibile — esattamente come sul sito di oggi.
 *
 * ⚠️ Una differenza dalla documentazione: `custom-code-per-pagina.md` parla di
 * cache in `localStorage`, ma il codice dell'embed usa `sessionStorage`
 * (chiave `ms_geo_country`). Qui vale il codice, non la prosa: `sessionStorage`.
 */

/** Paese mostrato se ogni tentativo fallisce: il mercato più grande. */
export const PAESE_DI_RIPIEGO = "US";

/** Timeout della chiamata di rete, in millisecondi. */
const TIMEOUT_RETE = 2500;

/** Durata della cache in minuti. */
const MINUTI_CACHE = 60;

const CHIAVE_CACHE = "ms_geo_country";

/**
 * Fuso orario → paese. Tabella scritta a mano nello script del sito: non
 * copre il mondo, copre i mercati che contano. Non passa dalla rete, ed è
 * il motivo per cui l'autore la chiama "adblock-proof".
 */
const FUSO_PAESE: Readonly<Record<string, string>> = {
  // Europa
  "Europe/Rome": "IT",
  "Europe/Vatican": "IT",
  "Europe/Paris": "FR",
  "Europe/Monaco": "MC",
  "Europe/Berlin": "DE",
  "Europe/Busingen": "DE",
  "Europe/Madrid": "ES",
  "Atlantic/Canary": "ES",
  "Africa/Ceuta": "ES",
  "Europe/London": "GB",
  "Europe/Belfast": "GB",
  "Europe/Dublin": "IE",
  "Europe/Amsterdam": "NL",
  "Europe/Brussels": "BE",
  "Europe/Vienna": "AT",
  "Europe/Zurich": "CH",
  "Europe/Lisbon": "PT",
  "Atlantic/Azores": "PT",
  "Atlantic/Madeira": "PT",
  "Europe/Athens": "GR",
  "Europe/Warsaw": "PL",
  "Europe/Prague": "CZ",
  "Europe/Stockholm": "SE",
  "Europe/Oslo": "NO",
  "Europe/Copenhagen": "DK",
  "Europe/Helsinki": "FI",
  "Europe/Budapest": "HU",
  "Europe/Bucharest": "RO",
  "Europe/Sofia": "BG",
  "Europe/Istanbul": "TR",
  "Europe/Moscow": "RU",
  "Europe/Kaliningrad": "RU",
  "Europe/Kiev": "UA",
  "Europe/Kyiv": "UA",
  "Europe/Luxembourg": "LU",
  "Europe/Malta": "MT",
  "Europe/Tallinn": "EE",
  "Europe/Riga": "LV",
  "Europe/Vilnius": "LT",
  "Europe/Ljubljana": "SI",
  "Europe/Bratislava": "SK",
  "Europe/Zagreb": "HR",
  "Europe/Belgrade": "RS",
  "Europe/Reykjavik": "IS",
  // Americhe
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Phoenix": "US",
  "America/Anchorage": "US",
  "America/Detroit": "US",
  "America/Indiana/Indianapolis": "US",
  "America/Boise": "US",
  "Pacific/Honolulu": "US",
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/Montreal": "CA",
  "America/Edmonton": "CA",
  "America/Winnipeg": "CA",
  "America/Halifax": "CA",
  "America/Mexico_City": "MX",
  "America/Tijuana": "MX",
  "America/Monterrey": "MX",
  "America/Sao_Paulo": "BR",
  "America/Bahia": "BR",
  "America/Fortaleza": "BR",
  "America/Buenos_Aires": "AR",
  "America/Argentina/Buenos_Aires": "AR",
  "America/Santiago": "CL",
  "America/Bogota": "CO",
  "America/Lima": "PE",
  "America/Caracas": "VE",
  "America/Montevideo": "UY",
  "America/Asuncion": "PY",
  "America/La_Paz": "BO",
  "America/Guayaquil": "EC",
  // Asia e Pacifico
  "Asia/Tokyo": "JP",
  "Asia/Shanghai": "CN",
  "Asia/Hong_Kong": "HK",
  "Asia/Seoul": "KR",
  "Asia/Singapore": "SG",
  "Asia/Taipei": "TW",
  "Asia/Bangkok": "TH",
  "Asia/Jakarta": "ID",
  "Asia/Makassar": "ID",
  "Asia/Manila": "PH",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Ho_Chi_Minh": "VN",
  "Asia/Saigon": "VN",
  "Asia/Kolkata": "IN",
  "Asia/Calcutta": "IN",
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Asia/Jerusalem": "IL",
  "Asia/Tel_Aviv": "IL",
  "Asia/Karachi": "PK",
  "Asia/Dhaka": "BD",
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Australia/Brisbane": "AU",
  "Australia/Perth": "AU",
  "Australia/Adelaide": "AU",
  "Pacific/Auckland": "NZ",
  // Africa
  "Africa/Cairo": "EG",
  "Africa/Johannesburg": "ZA",
  "Africa/Lagos": "NG",
  "Africa/Nairobi": "KE",
  "Africa/Casablanca": "MA",
  "Africa/Tunis": "TN",
  "Africa/Algiers": "DZ",
};

/** Lingua del browser → paese, quando il fuso non basta. */
const LINGUA_PAESE: Readonly<Record<string, string>> = {
  it: "IT",
  fr: "FR",
  de: "DE",
  es: "ES",
  pt: "PT",
  nl: "NL",
  sv: "SE",
  no: "NO",
  da: "DK",
  fi: "FI",
  pl: "PL",
  cs: "CZ",
  hu: "HU",
  ro: "RO",
  el: "GR",
  tr: "TR",
  ru: "RU",
  uk: "UA",
  ja: "JP",
  ko: "KR",
  zh: "CN",
  ar: "SA",
  he: "IL",
  hi: "IN",
  th: "TH",
};

/** Passo 1: il fuso orario. Nessuna rete, quindi nessun adblocker. */
export function paeseDalFuso(): string | null {
  try {
    if (typeof Intl === "undefined" || !Intl.DateTimeFormat) return null;
    const fuso = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!fuso) return null;
    if (FUSO_PAESE[fuso]) return FUSO_PAESE[fuso];
    // Se il fuso non è in tabella, ci si accontenta della città:
    // `America/Indiana/Indianapolis` → `Indianapolis`.
    const citta = fuso.split("/").pop();
    if (!citta) return null;
    for (const chiave of Object.keys(FUSO_PAESE)) {
      if (chiave.endsWith("/" + citta)) return FUSO_PAESE[chiave];
    }
    return null;
  } catch {
    return null;
  }
}

/** Passo 2: la lingua del browser. Prima il suffisso (`it-IT` → `IT`). */
export function paeseDallaLingua(): string | null {
  try {
    const lingua = (navigator.language || "").toLowerCase();
    if (!lingua) return null;
    const parti = lingua.split("-");
    if (parti.length > 1 && parti[1].length === 2) return parti[1].toUpperCase();
    return LINGUA_PAESE[parti[0]] ?? null;
  } catch {
    return null;
  }
}

function fetchConTimeout(url: string, ms: number): Promise<Response> {
  return new Promise((risolvi, rifiuta) => {
    const controllo = new AbortController();
    const timer = setTimeout(() => {
      controllo.abort();
      rifiuta(new Error("timeout"));
    }, ms);
    fetch(url, {
      signal: controllo.signal,
      cache: "no-store",
      credentials: "omit",
      referrerPolicy: "no-referrer",
    })
      .then((r) => {
        clearTimeout(timer);
        risolvi(r);
      })
      .catch((e: unknown) => {
        clearTimeout(timer);
        rifiuta(e instanceof Error ? e : new Error(String(e)));
      });
  });
}

/** Passo 3: la rete, solo come ultima spiaggia. */
export async function paeseDallaRete(): Promise<string | null> {
  const indirizzi = [
    "https://www.cloudflare.com/cdn-cgi/trace",
    "https://1.1.1.1/cdn-cgi/trace",
  ];
  for (const url of indirizzi) {
    try {
      const risposta = await fetchConTimeout(url, TIMEOUT_RETE);
      if (!risposta.ok) continue;
      const testo = await risposta.text();
      const trovato = testo.match(/loc=([A-Z]{2})/);
      if (trovato) return trovato[1].toUpperCase();
    } catch {
      /* bloccato o scaduto: si passa oltre in silenzio, come sul sito */
    }
  }
  return null;
}

/** Passo 4: la cache di sessione, 60 minuti. */
export function paeseInCache(): string | null {
  try {
    const grezzo = sessionStorage.getItem(CHIAVE_CACHE);
    if (!grezzo) return null;
    const { country, ts } = JSON.parse(grezzo) as {
      country?: unknown;
      ts?: unknown;
    };
    if (typeof country !== "string" || typeof ts !== "number") return null;
    if (Date.now() - ts > MINUTI_CACHE * 60 * 1000) return null;
    return country;
  } catch {
    return null;
  }
}

export function salvaPaeseInCache(paese: string): void {
  try {
    sessionStorage.setItem(
      CHIAVE_CACHE,
      JSON.stringify({ country: paese, ts: Date.now() })
    );
  } catch {
    /* Safari in navigazione privata rifiuta di scrivere: pazienza */
  }
}

/**
 * La cascata completa, nell'ordine dello script originale:
 * cache → fuso orario → lingua → rete → `US`.
 *
 * I primi tre passi sono sincroni: nel caso normale la Promise si risolve
 * nello stesso tick, e il listino appare senza attesa percepibile.
 */
export async function stimaPaese(): Promise<string> {
  const daCache = paeseInCache();
  if (daCache) return daCache;

  const daFuso = paeseDalFuso();
  if (daFuso) {
    salvaPaeseInCache(daFuso);
    return daFuso;
  }

  const daLingua = paeseDallaLingua();
  if (daLingua) {
    salvaPaeseInCache(daLingua);
    return daLingua;
  }

  const daRete = await paeseDallaRete();
  if (daRete) salvaPaeseInCache(daRete);
  return daRete ?? PAESE_DI_RIPIEGO;
}

/**
 * Traduce gli attributi `data-ms-code` / `data-ms-countries` del sito nella
 * decisione "questo blocco si vede sì o no".
 *
 * - `mostra` (`locale-show`): visibile solo se il paese è nell'elenco;
 * - `nascondi` (`locale-hide`): visibile solo se il paese NON è nell'elenco.
 *
 * Con `paese` ancora `null` (client che non ha deciso, o rendering sul
 * server) non si vede niente: è la regola "prima nascondo tutto".
 */
export type ModoGeo = "mostra" | "nascondi";

export function visibilePerPaese(
  modo: ModoGeo,
  elenco: readonly string[],
  paese: string | null
): boolean {
  if (!paese) return false;
  const dentro = elenco.includes(paese.toUpperCase());
  return modo === "mostra" ? dentro : !dentro;
}
