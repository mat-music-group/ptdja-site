"use client";

import { trackMixpanel, trackMixpanelSenzaPage } from "@/lib/mixpanel";

/*
 * Il catalogo degli eventi Mixpanel del sito, uno per funzione.
 *
 * Ogni funzione qui dentro è la trascrizione di un blocco del custom code del
 * footer Webflow (`docs/webflow/custom-code-footer.html`): stesso nome evento,
 * stesse chiavi, stessi valori, stesso ordine. I componenti non costruiscono
 * props: chiamano una di queste funzioni passandogli l'elemento cliccato. Così
 * il giorno in cui una props cambia, cambia in un posto solo, e il confronto
 * con lo script del sito si fa leggendo un file invece che sette componenti.
 *
 * ── PERCHÉ SI LEGGE DAL DOM E NON DAI TESTI ─────────────────────────────
 * Diverse props del sito nascono da `innerText.trim()` o da `getAttribute`
 * sull'elemento cliccato. Ricavarle invece dalle costanti di `src/testi/`
 * darebbe *quasi* sempre lo stesso valore: quasi, perché il DOM porta anche
 * quello che i componenti aggiungono attorno al testo (il prezzo barrato dentro
 * la CTA del listino, per dirne una) e perché una modifica al markup si vedrebbe
 * subito nei dati invece di restare nascosta. Il sito legge il DOM: si legge il
 * DOM.
 *
 * ⚠️ NESSUN GATE DI CONSENSO, ed è voluto. Sul sito Webflow `mixpanel.init` sta
 * nell'`<head>` fuori da qualunque condizione e tutti questi handler sono
 * registrati su `DOMContentLoaded`, senza mai interrogare Iubenda (al contrario
 * del blocco di attribuzione "cb push v2.2", che invece il consenso lo aspetta).
 * Mettere qui un gate renderebbe il repo più prudente del sito e i due grafici
 * non combacerebbero più. Si riproduce il comportamento; la decisione se
 * cambiarlo è di chi gestisce il CMP, non di questo file.
 */

/* ── Page View ──────────────────────────────────────────────────────────
 *
 *   if (!window.location.href.includes("thank-you")) {
 *     trackMixpanel('Page View', { title, url, timestamp });
 *   }
 */

/** `true` sulle thank you page, che il sito esclude "to reduce noise". */
export function paginaDaEscludereDalPageView(): boolean {
  return window.location.href.includes("thank-you");
}

export function tracciaPageView(): void {
  if (paginaDaEscludereDalPageView()) return;

  trackMixpanel("Page View", {
    title: document.title,
    url: window.location.href,
    timestamp: new Date().toISOString(),
  });
}

/* ── CTA Click e Book Free Call CTA (i due eventi dei bottoni) ──────────
 *
 * Sono descritti con un oggetto serializzabile invece che con una callback
 * perché il `Button` li riceve da pagine e sezioni che girano sul server, e da
 * un componente server a uno client passa un oggetto, non una funzione.
 */

export type TracciaBottone =
  /*
   *   document.querySelectorAll('a.button.enroll.signup-now') → 'CTA Click'
   *   { section: 'Hero Signup', label, href, url }
   *
   * `section` è una costante nello script del sito ('Hero Signup', con il
   * commento "example" accanto), ma resta un parametro: è l'unico modo perché
   * una hero diversa possa dichiarare la sua senza duplicare questo blocco.
   */
  | { readonly evento: "CTA Click"; readonly section: string }
  /*
   *   a.button-2.secondary.w-inline-block[href*="calendly.com"] → 'Book Free Call CTA'
   *   { section: 'Free Call Section', label: 'Book a free call', heading,
   *     description, href, url, timestamp }
   *
   * `heading` e `description` il sito li pesca risalendo al
   * `.content-text-block-2` e leggendo l'`h2` e il `p` che ci stanno dentro.
   * Qui li passa il chiamante, che quei due testi li ha già: il risultato è lo
   * stesso e non serve un `closest` su una classe Webflow che nel repo non c'è.
   */
  | {
      readonly evento: "Book Free Call CTA";
      readonly section: string;
      readonly heading: string;
      readonly description: string;
    };

export function tracciaBottone(traccia: TracciaBottone, elemento: HTMLAnchorElement): void {
  const href = elemento.getAttribute("href") || "";

  if (traccia.evento === "CTA Click") {
    trackMixpanel("CTA Click", {
      section: traccia.section,
      /* Sul sito: `button.querySelector('.button-text')?.innerText.trim()`.
         Nel repo il testo del bottone è tutto il contenuto testuale dell'`<a>`
         (l'eventuale icona è un `<img>` e non porta testo), quindi il valore
         coincide. `'Unknown'` è il ripiego dello script, non un'invenzione. */
      label: testo(elemento) || "Unknown",
      href,
      url: window.location.href,
    });
    return;
  }

  trackMixpanel("Book Free Call CTA", {
    section: traccia.section,
    /* Costante nello script del sito, anche quando il bottone dice altro. */
    label: "Book a free call",
    heading: traccia.heading,
    description: traccia.description,
    href,
    url: window.location.href,
    timestamp: new Date().toISOString(),
  });
}

/* ── I due eventi legati a un id ────────────────────────────────────────
 *
 *   #enroll-now-menu  → mixpanel.track("Buy Now Menu")
 *   #buy-now-header   → mixpanel.track("Buy Now Header")
 *
 * Nessuna proprietà, nemmeno `page`: sono due `mixpanel.track` con il solo
 * nome. `#buy-now-header` esiste davvero, ed è il bottone "Go back home" della
 * 404 (`docs/webflow/html/404.html`); `#enroll-now-menu` non compare in nessuna
 * delle 11 pagine pubblicate, ma il gancio si porta lo stesso, perché è nel
 * custom code del sito e costa una riga.
 */

export const ID_TRACCIATI: Record<string, string> = {
  "enroll-now-menu": "Buy Now Menu",
  "buy-now-header": "Buy Now Header",
};

export function tracciaClickSuId(id: string | undefined): void {
  if (!id) return;
  const evento = ID_TRACCIATI[id];
  if (!evento) return;
  trackMixpanelSenzaPage(evento);
}

/* ── Navbar Link Clicked ────────────────────────────────────────────────
 *
 *   document.querySelectorAll('.header-2 a, .nav-menu-2 a')
 *   { type, menu, label, href, url }
 *
 * `type`/`menu` valgono 'Main Menu'/'Main' per le voci di primo livello e
 * 'Submenu'/<testo del toggle> per i link dentro `.nav-dropdown-list-2`.
 *
 * ⚠️ Il selettore prende anche il logo, che nell'HTML è un `<a class="navbar-
 * brand">` dentro `.header-2`. Non contenendo testo, manda `label: ''`. È un
 * evento che il sito produce davvero e va prodotto anche qui: toglierlo
 * cambierebbe i conteggi.
 */

export const MENU_PRINCIPALE = { type: "Main Menu", menu: "Main" } as const;

export function tracciaNavbarLinkClicked(
  elemento: HTMLAnchorElement,
  { type, menu }: { readonly type: string; readonly menu: string }
): void {
  trackMixpanel("Navbar Link Clicked", {
    type,
    menu,
    label: testo(elemento),
    href: elemento.getAttribute("href") || "",
    url: window.location.href,
  });
}

/* ── Trustpilot CTA Clicked ─────────────────────────────────────────────
 *
 *   document.querySelectorAll('p.paragraph a[href*="trustpilot.com"]')
 *   { section: 'Generic Trust Section', label: 'Trustpilot CTA', text, href, url }
 *
 * `label` è costante e `text` è il testo del link: sono due props diverse con
 * lo stesso aspetto, e invertirle è l'errore facile da fare qui.
 */
export function tracciaTrustpilotCtaClicked(elemento: HTMLAnchorElement): void {
  trackMixpanel("Trustpilot CTA Clicked", {
    section: "Generic Trust Section",
    label: "Trustpilot CTA",
    text: testo(elemento) || "Trustpilot",
    href: elemento.getAttribute("href") || "",
    url: window.location.href,
  });
}

/* ── Tracked FAQ Opened ─────────────────────────────────────────────────
 *
 *   .faq-right-block.section-footer .faq-item.w-dropdown .faq-header
 *   { section: 'Footer FAQ Section', faqTitle, url, timestamp }
 *
 * Solo all'apertura: lo script legge `aria-expanded` **prima** che Webflow lo
 * ribalti e manda l'evento solo se valeva `false`. Qui il chiamante conosce già
 * lo stato, quindi chiama questa funzione soltanto quando sta aprendo.
 */
export function tracciaFaqAperta(faqTitle: string): void {
  trackMixpanel("Tracked FAQ Opened", {
    section: "Footer FAQ Section",
    faqTitle,
    url: window.location.href,
    timestamp: new Date().toISOString(),
  });
}

/* ── Course Card Click ──────────────────────────────────────────────────
 *
 *   document.querySelectorAll('#sliderId .w-slide a.w-inline-block')
 *   { section: 'Homepage Courses Carousel', label, href, image, url }
 *
 * `label` non è un testo della pagina: lo script lo ricava dall'ultimo segmento
 * dell'href, sostituendo `-` e `_` con spazi e mettendo in maiuscolo l'iniziale
 * di ogni parola. `/dj-course` diventa "Dj Course", non "DJ Course": è il
 * valore che sta nei report, e si riproduce con la stessa regex.
 */
export function tracciaCourseCardClick(elemento: HTMLAnchorElement): void {
  const href = elemento.getAttribute("href") || "";
  const immagine = elemento.querySelector("img");

  const dallHref =
    href.split("/").filter(Boolean).pop()?.replace(/[-_]/g, " ") || "Unknown";

  trackMixpanel("Course Card Click", {
    section: "Homepage Courses Carousel",
    label: dallHref.replace(/\b\w/g, (carattere) => carattere.toUpperCase()),
    href,
    /* Sul sito è l'URL del CDN Webflow; qui è quello che `next/image` scrive
       nell'attributo, cioè `/_next/image?url=…`. Il valore cambia perché
       cambia l'hosting delle immagini, la props no. */
    image: immagine?.getAttribute("src") || "",
    url: window.location.href,
  });
}

/* ── Pricing Checkout Clicked ───────────────────────────────────────────
 *
 *   .pricing_card .button_primary-2
 *   { plan_name, billing_cycle, price, price_display, billing_description,
 *     button_text, checkout_url, page_url, timestamp }     ← senza `page`
 *
 * ⚠️ DUE COSE SBAGLIATE NELLO SCRIPT DEL SITO, RIPRODOTTE COM'È.
 *
 * 1. `price` è invertito. Lo script chiama `yearly` il prezzo 19/29/39 e
 *    `monthly` il 13/19/24, poi assegna il primo al ciclo annuale. Ma sul sito
 *    19/29/39 è il mensile equivalente del piano TRIMESTRALE e 13/19/24 quello
 *    dell'ANNUALE (le classi `.is_monthly`/`.is_annual` sono a loro volta
 *    scambiate, vedi la nota in `PricingPlans.tsx`). Risultato: l'evento del
 *    piano annuale porta `price: '19'` mentre a schermo c'è 13.
 * 2. `price_display` è sempre in dollari (`$${price}/month`), anche quando il
 *    visitatore sta guardando la griglia in euro o in sterline.
 *
 * Sono due difetti noti dei dati, non due sviste di questa migrazione:
 * correggerli qui spezzerebbe in due ogni serie storica costruita su quei
 * numeri. Restano, e stanno scritti qui perché chi legge i report li trovi.
 */

export type PropsListino = {
  /** 'One' | 'Pro' | 'Elite', come `.plan_titile`. */
  readonly planName: string;
  /** 'yearly' per il piano annuale, 'quarterly' per il trimestrale. */
  readonly billingCycle: "yearly" | "quarterly";
  /** Il numero che lo script assegna a quel ciclo. Vedi il punto 1 qui sopra. */
  readonly price: number;
  /** `.save-hs` per l'annuale, `.billed-3-mo` per il trimestrale. */
  readonly billingDescription: string;
};

export function tracciaPricingCheckoutClicked(
  { planName, billingCycle, price, billingDescription }: PropsListino,
  elemento: HTMLAnchorElement
): void {
  trackMixpanelSenzaPage("Pricing Checkout Clicked", {
    plan_name: planName,
    billing_cycle: billingCycle,
    price: String(price),
    price_display: `$${price}/month`,
    billing_description: billingDescription,
    button_text: testo(elemento) || "Start Learning",
    checkout_url: elemento.getAttribute("href") || "",
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
  });
}

/* ── Utility ───────────────────────────────────────────────────────────── */

/**
 * Il testo di un elemento, cioè il valore che sul sito viene da `innerText`.
 *
 * ⚠️ Qui si legge `textContent`, e non è una svista: `innerText` dipende dal
 * *layout*, non dal contenuto. Inserisce un a capo fra due box di livello
 * blocco, e nel repo diversi bottoni sono contenitori flex là dove su Webflow
 * erano `inline-block`. Sulla CTA del listino la differenza si vede nei dati:
 *
 *   sito Webflow (`<a>` inline-block)  →  "Start Now at $156$228"
 *   repo con innerText (`<a>` flex)    →  "Start Now at €156\n€228"
 *   repo con textContent               →  "Start Now at €156€228"
 *
 * Il valore da riprodurre è quello del sito, non la chiamata: `textContent` lo
 * dà, `innerText` no. Nessuno degli elementi tracciati ha figli nascosti via
 * CSS, che è il solo caso in cui i due differirebbero nell'altro verso.
 */
function testo(elemento: HTMLElement): string {
  return (elemento.textContent ?? "").trim();
}
