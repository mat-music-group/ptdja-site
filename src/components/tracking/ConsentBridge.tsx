"use client";

/*
 * Lettura del consenso Iubenda, una volta sola e in un posto solo.
 *
 * Nel repo landing questo file era anche il ponte verso `meta.js`: registrava un
 * resolver di consenso sul layer Meta e ne sbloccava gli eventi in attesa. Quella
 * metà qui NON c'è, perché `meta.js` non è installato: sul sito il pixel Meta
 * passa da GTM, e un secondo layer manderebbe gli stessi eventi una seconda
 * volta senza deduplica possibile (regola in `sito-ptdja/CLAUDE.md`).
 *
 * Resta la parte che serve a chiunque: sapere, in un punto solo, se una finalità
 * è stata concessa. Due letture separate dello stesso stato sono il modo in cui
 * due strumenti finiscono per credere due cose diverse.
 *
 * ⚠️ Sul sito la Cookie Solution la carica GTM, non questo repo (vedi `Cmp.tsx`).
 * Quindi `window._iub` compare in pagina quando il container ha finito di
 * caricare il template, non al primo render: chi legge da qui deve trattare
 * "non lo so ancora" come "no", che è esattamente ciò che fa
 * `consentForPurpose`.
 */

type IubendaConsent = { purposes?: Record<string | number, boolean> };

/** `openPreferences` riapre il pannello del CMP: servirà al link "Cookie
 *  preferences" nel footer, che sul sito Webflow c'è. */
type IubendaApi = { isConsentGiven?: () => boolean; openPreferences?: () => void };

declare global {
  interface Window {
    _iub?: { cs?: { consent?: IubendaConsent; api?: IubendaApi } };
  }
}

/*
 * Con `perPurposeConsent: true` Iubenda espone il consenso per finalità
 * numerata. La 4 è "Misurazione" e governa GA4 e Clarity; la 5 è "Targeting e
 * pubblicità" e governa il pixel Meta e Google Ads. Se la configurazione delle
 * finalità cambia, questi numeri vanno rivisti: sbagliarli non dà nessun errore,
 * sblocca o blocca gli eventi nel momento sbagliato.
 */
export const IUBENDA_PURPOSE = { measurement: 4, advertising: 5 } as const;

/** `true` solo se la finalità risulta concessa. Davanti a un CMP non ancora in
 *  pagina risponde `false`: "non lo so" non è "sì". */
export function consentForPurpose(purpose: number): boolean {
  const cs = typeof window !== "undefined" ? window._iub?.cs : undefined;
  if (!cs) return false;

  const byPurpose = cs.consent?.purposes?.[purpose];
  if (typeof byPurpose === "boolean") return byPurpose;

  /* Nessun dettaglio per finalità: capita dove il consenso non è dovuto e
     `countryDetection` lo considera dato in blocco. È il caso della maggior
     parte del traffico, che sta fuori da UE e Regno Unito. */
  return cs.api?.isConsentGiven?.() === true;
}
