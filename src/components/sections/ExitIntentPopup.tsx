"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Il popup `#demoPopup`, presente su 6 pagine (home, i tre corsi, pricing,
 * play & get signed).
 *
 * ── COSA FA DAVVERO ─────────────────────────────────────────────────────
 * Malgrado il nome con cui lo chiamano tutti, NON è un popup di exit intent:
 * è un popup a profondità di scorrimento. Lo script dentro il `<div>`
 * (embed Webflow `866b5b22`) ascolta lo scroll, calcola la percentuale di
 * pagina letta e, superato il 20%, mette `display: block` sul contenitore e
 * salva in `localStorage` la chiave `demoPopupShownDate`, che lo tiene zitto
 * per 30 giorni.
 *
 * ── E IL CONTENUTO? ─────────────────────────────────────────────────────
 * Non c'è. Verificato sull'HTML pubblicato di tutte e sei le pagine: dentro
 * `#demoPopup` ci sono soltanto i due `<script>`, nessun markup. Il CSS dà al
 * contenitore `position: fixed`, `display: none`, `inset: auto auto 0% 0%` e
 * 10px di padding: quando lo script lo accende, si accende un riquadro vuoto
 * di zero pixel. Sul sito, oggi, questo popup non mostra niente a nessuno.
 *
 * Si riproduce così com'è — contenitore, trigger, cookie di 30 giorni — e lo
 * si segnala, che è la regola numero uno del repo. Il giorno in cui qualcuno
 * rimetterà dentro il contenuto, il posto dove metterlo è `children`.
 *
 * ── DUE PEZZI CHE NON SONO STATI PORTATI ────────────────────────────────
 * 1. Nel custom code in fondo alla pagina c'è un secondo script di exit
 *    intent che cerca `.exit-intent-popup`. Quella classe non esiste in
 *    nessuna delle sei pagine: `document.querySelector('.exit-intent-popup')`
 *    torna `null` e la riga successiva lancia un `TypeError`. È codice morto
 *    che fallisce a ogni caricamento, e non si porta dietro un errore.
 * 2. Il gestore del bottone `#btn-typeform`, che legge `mixpanel.get_distinct_id()`
 *    e manda un evento "Typeform Started": è tracciamento, e il tracciamento
 *    di pagina lo aggiunge il passo dedicato, non questo.
 */

/** Percentuale di pagina letta oltre la quale il popup compare. */
const SOGLIA_PERCENTUALE = 20;

/** 30 giorni in millisecondi, come nella costante `days30` dello script. */
const TRENTA_GIORNI = 2592000000;

const CHIAVE = "demoPopupShownDate";

type ProprietaPopup = {
  /** Il contenuto del popup. Sul sito, oggi, non c'è: vedi la nota sopra. */
  readonly children?: React.ReactNode;
};

export function ExitIntentPopup({ children }: ProprietaPopup) {
  const [visibile, setVisibile] = useState(false);
  const giaMostrato = useRef(false);

  useEffect(() => {
    let inAttesa = false;

    const controlla = () => {
      if (giaMostrato.current) return;

      const doc = document.documentElement;
      const corpo = document.body;
      const scorrimento = doc.scrollTop || corpo.scrollTop;
      const altezza = doc.scrollHeight || corpo.scrollHeight;
      const percentuale =
        ((scorrimento / (altezza - doc.clientHeight)) * 100) || 0;

      let ultimaVolta: number | null = null;
      try {
        const salvato = window.localStorage.getItem(CHIAVE);
        ultimaVolta = salvato ? Number(salvato) : null;
      } catch {
        /* localStorage negato: come sul sito, si prosegue */
      }

      const passati = ultimaVolta ? Date.now() - ultimaVolta : null;

      if (
        percentuale > SOGLIA_PERCENTUALE &&
        (!ultimaVolta || (passati !== null && passati > TRENTA_GIORNI))
      ) {
        giaMostrato.current = true;
        try {
          window.localStorage.setItem(CHIAVE, String(Date.now()));
        } catch {
          /* idem */
        }
        setVisibile(true);
      }
    };

    /* Lo script originale passa da `requestAnimationFrame` per non lavorare a
       ogni evento di scroll: stessa cosa qui. */
    const suScroll = () => {
      if (inAttesa) return;
      inAttesa = true;
      window.requestAnimationFrame(() => {
        controlla();
        inAttesa = false;
      });
    };

    window.addEventListener("scroll", suScroll, { passive: true });
    return () => window.removeEventListener("scroll", suScroll);
  }, []);

  return (
    <div
      id="demoPopup"
      className={`fixed bottom-0 left-0 z-[1] pb-[10px] pl-[10px] ${
        visibile ? "block" : "hidden"
      }`}
    >
      {children}
    </div>
  );
}
