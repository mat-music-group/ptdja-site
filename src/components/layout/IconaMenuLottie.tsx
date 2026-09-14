"use client";

import { LottieLight, type LottieHandle } from "lottie-react";
import { useEffect, useRef } from "react";
import { LOTTIE_MENU } from "@/testi/condivisi";

/*
 * L'icona del menu mobile: l'animazione Lottie `lottieflow-menu-nav-09`, la
 * stessa che Webflow monta nel `<div class="menu-button-icon-2">`.
 *
 * ── PERCHÉ UNA LIBRERIA E PERCHÉ QUESTA ─────────────────────────────────
 * Il file è un Lottie vero (120 frame a 48 fps) e la consegna chiede di
 * riprodurlo. Fra le due ammesse, `lottie-react` è la più piccola: non porta
 * il runtime del formato `.lottie` di `@lottiefiles/dotlottie-react`, che qui
 * non servirebbe a niente perché l'animazione è un `.json` normale.
 *
 * Dentro `lottie-react` si usa `LottieLight` e non `Lottie`: è il build più
 * leggero del motore, sa disegnare solo in SVG (che è il renderer che Webflow
 * dichiara, `data-renderer="svg"`) e non porta il valutatore di espressioni.
 * Verificato che l'animazione non ne usi: zero occorrenze di `"x":"` nel JSON.
 *
 * Il costo resta fuori dal bundle iniziale: `SiteHeader` importa questo file
 * con `next/dynamic` e `ssr: false`, quindi il codice arriva solo nel browser
 * e solo quando serve.
 *
 * ── COSA FA L'ANIMAZIONE ────────────────────────────────────────────────
 * Dall'IX2 pubblicato: l'evento `NAVBAR_OPEN` lancia l'azione `a-263`
 * ("Menu open 11"), che è un `PLUGIN_LOTTIE` con `value: 35` e
 * `duration: 200`, cioè "porta l'animazione al 35% in 200 ms".
 * `NAVBAR_CLOSE` fa il contrario. Il 35% di 120 frame è il frame 42: è lì che
 * le tre righe sono diventate una X.
 *
 * `src` è un percorso, non un modulo importato: i 6,5 KB del JSON restano un
 * file in `public/webflow/` e non finiscono nel JavaScript.
 */

/** Frame di arrivo: il 35% dei 120 frame dell'animazione. */
const FRAME_APERTO = 42;

type ProprietaIcona = {
  readonly aperto: boolean;
};

export function IconaMenuLottie({ aperto }: ProprietaIcona) {
  const riferimento = useRef<LottieHandle>(null);
  /* Al primo montaggio non si anima niente: il menu nasce chiuso e far
     scorrere la X all'indietro appena la pagina appare sarebbe un movimento
     che sul sito non c'è. */
  const primoGiro = useRef(true);

  useEffect(() => {
    const lottie = riferimento.current;
    if (!lottie) return;
    if (primoGiro.current) {
      primoGiro.current = false;
      if (!aperto) return;
    }
    if (aperto) lottie.playSegments([0, FRAME_APERTO]);
    else lottie.playSegments([FRAME_APERTO, 0]);
  }, [aperto]);

  return (
    <LottieLight
      lottieRef={riferimento}
      src={LOTTIE_MENU}
      loop={false}
      autoplay={false}
      className="h-[25px] w-[25px]"
    />
  );
}
