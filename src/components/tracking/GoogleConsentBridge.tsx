"use client";

import { useEffect } from "react";
import { IUBENDA_PURPOSE, consentForPurpose } from "./ConsentBridge";

/*
 * Il ponte fra Iubenda e il tag Google: manda `consent update` quando il
 * consenso cambia.
 *
 * ⛔ NON MONTATO NEL LAYOUT, di proposito.
 *
 * Sul sito i segnali di consenso Google li manda già Iubenda, dal suo template
 * dentro GTM: la configurazione del sito ha `googleConsentMode: "template"`
 * (verificato leggendo `_iub.csConfiguration` a runtime su
 * www.petetong-djacademy.com, annotato in `iubenda.config.json` del repo
 * landing). Montare anche questo componente farebbe scrivere gli stessi segnali
 * da due sistemi, che si sovrascriverebbero a vicenda a seconda di chi arriva
 * dopo. Sulle landing serve perché là GTM non c'è affatto.
 *
 * Resta qui perché è il pezzo da montare il giorno in cui il CMP uscisse da GTM
 * (vedi `Cmp.tsx`): in quello scenario senza questo ponte i default resterebbero
 * negati per sempre e **nemmeno chi accetta verrebbe misurato**, che è l'errore
 * silenzioso di questo schema.
 *
 * Continua a sincronizzare anche dopo il primo consenso: `explicitWithdrawal` è
 * attivo nella configurazione del CMP, quindi il consenso si può ritirare dal
 * pannello delle preferenze, e un ritiro che non arriva a Google è esattamente
 * il difetto che quel pannello dovrebbe risolvere.
 */

type ConsentState = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleConsentBridge() {
  useEffect(() => {
    let last = "";

    const sync = () => {
      if (typeof window.gtag !== "function") return; // il tag Google non è ancora in pagina
      if (!window._iub?.cs) return; // CMP non ancora in pagina: non sappiamo, non tocchiamo

      const ads: ConsentState = consentForPurpose(IUBENDA_PURPOSE.advertising) ? "granted" : "denied";
      const analytics: ConsentState = consentForPurpose(IUBENDA_PURPOSE.measurement)
        ? "granted"
        : "denied";

      const signature = `${ads}|${analytics}`;
      if (signature === last) return;
      last = signature;

      window.gtag("consent", "update", {
        ad_storage: ads,
        ad_user_data: ads,
        ad_personalization: ads,
        analytics_storage: analytics,
      });
    };

    sync();
    const id = setInterval(sync, 300);
    return () => clearInterval(id);
  }, []);

  return null;
}
