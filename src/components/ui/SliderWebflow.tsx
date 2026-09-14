"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/*
 * Lo slider nativo di Webflow (`div.w-slider`) rifatto in React.
 *
 * Il sito ne usa tre tipi sulla sola `/play-get-signed`, e altri sulla home e
 * sulle pagine corso: invece di copiare il carosello ogni volta, qui c'è un
 * componente solo, parametrico come lo sono gli attributi `data-*` che Webflow
 * scrive nell'HTML.
 *
 * ── Come si comporta lo slider Webflow, e perché qui è riprodotto così ──
 *
 * 1. `.w-slider-mask` ha `overflow: hidden` e le `.w-slide` stanno in fila.
 *    Di default una slide è larga quanto la maschera (`width: 100%`); per
 *    vederne più d'una il progettista riduce la larghezza della slide nel CSS
 *    (`.slide-8 { width: 33.33% }`). Qui lo stesso risultato si ottiene con
 *    `perVista`, che diventa la larghezza `100 / perVista` per cento.
 * 2. Lo scorrimento è **a pagine**, non a singola slide: Webflow trasla di una
 *    larghezza di maschera per volta. Con 8 slide e 4 visibili le pagine sono
 *    due, ed è esattamente quello che mostrano i due pallini sul sito.
 * 3. `data-hide-arrows="true"` nasconde la freccia quando da quella parte non
 *    c'è più niente: è `nascondiFrecceAiBordi`.
 * 4. `data-infinite="true"` fa ripartire dal principio: è `infinito`.
 * 5. `data-duration` è la durata della traslazione in millisecondi,
 *    `data-nav-spacing` lo spazio fra i pallini.
 * 6. `data-disable-swipe="false"` lascia attivo il trascinamento col dito:
 *    qui è un `touchstart`/`touchend` con soglia di 40px.
 *
 * ── Differenze dichiarate rispetto al sito ──
 *
 * - Le frecce del sito sono due glifi del font `webflow-icons` (un TTF in
 *   base64 dentro il foglio). Qui sono due `<svg>` disegnati a mano con la
 *   stessa forma: nessun font da caricare, stesso ingombro (1em in un box da
 *   80px, come `.w-slider-arrow-*`).
 * - Webflow monta una `.w-slider-aria-label` nascosta per lo screen reader;
 *   qui il ruolo lo fanno gli `aria-label` dei bottoni, che è la stessa
 *   informazione detta meglio.
 */

type PerVista = {
  /** Sopra i 991px. */
  readonly desktop: number;
  /** Fino a 991px (tablet Webflow). Se manca, resta quello desktop. */
  readonly tablet?: number;
  /** Fino a 767px (mobile orizzontale). Se manca, resta quello tablet. */
  readonly mobileOrizzontale?: number;
  /** Fino a 479px (mobile verticale). Se manca, resta il precedente. */
  readonly mobile?: number;
};

type ProprietaSlider = {
  /** Una slide per elemento: il componente non sa cosa c'è dentro. */
  readonly slide: readonly ReactNode[];
  /** Quante slide si vedono per volta. Può essere frazionario (1.5 = una e mezza). */
  readonly perVista?: PerVista;
  /** `data-duration`, millisecondi della traslazione. */
  readonly durata?: number;
  /** `data-infinite`: dall'ultima pagina si torna alla prima. */
  readonly infinito?: boolean;
  /** Mostra le due frecce. */
  readonly frecce?: boolean;
  /** `data-hide-arrows`: nasconde la freccia quando non c'è più niente da quel lato. */
  readonly nascondiFrecceAiBordi?: boolean;
  /** Mostra i pallini di navigazione (`.w-slider-nav`). */
  readonly pallini?: boolean;
  /** `data-nav-spacing`, in px: il margine orizzontale di ogni pallino. */
  readonly spaziaturaPallini?: number;
  /** Diametro dei pallini, in px (`.w-slider-dot` sta a 1em del contenitore). */
  readonly diametroPallini?: number;
  /** `padding-top` della barra dei pallini: 10px di base, 40px su `.slide-nav-3`. */
  readonly paddingPallini?: number;
  /** Classi del contenitore `.w-slider`. */
  readonly className?: string;
  /** Classi della maschera `.w-slider-mask`. */
  readonly classeMask?: string;
  /** Classi di ogni `.w-slide`. */
  readonly classeSlide?: string;
  /** Classi delle due frecce (sul sito `.desk-invisible` le toglie dal desktop). */
  readonly classeFrecce?: string;
  /** Classi della barra dei pallini. */
  readonly classePallini?: string;
  /** Nome del carosello per chi naviga con la tastiera o lo screen reader. */
  readonly etichetta?: string;
};

/** Le tre soglie di Webflow, desktop-first. */
function perVistaDaLarghezza(larghezza: number, p: PerVista): number {
  const tablet = p.tablet ?? p.desktop;
  const orizzontale = p.mobileOrizzontale ?? tablet;
  const mobile = p.mobile ?? orizzontale;
  if (larghezza <= 479) return mobile;
  if (larghezza <= 767) return orizzontale;
  if (larghezza <= 991) return tablet;
  return p.desktop;
}

export function SliderWebflow({
  slide,
  perVista = { desktop: 1 },
  durata = 500,
  infinito = true,
  frecce = true,
  nascondiFrecceAiBordi = false,
  pallini = true,
  spaziaturaPallini = 3,
  diametroPallini = 16,
  paddingPallini = 10,
  className = "",
  classeMask = "",
  classeSlide = "",
  classeFrecce = "",
  classePallini = "",
  etichetta = "carousel",
}: ProprietaSlider) {
  /* Il primo render, anche sul server, usa il valore desktop: è quello che
     deve combaciare con lo screenshot a 1440px. Al montaggio l'effetto
     corregge il valore sul viewport vero. */
  const [visibili, setVisibili] = useState(perVista.desktop);
  const [pagina, setPagina] = useState(0);
  const inizioTocco = useRef<number | null>(null);

  useEffect(() => {
    const aggiorna = () =>
      setVisibili(perVistaDaLarghezza(window.innerWidth, perVista));
    aggiorna();
    window.addEventListener("resize", aggiorna);
    return () => window.removeEventListener("resize", aggiorna);
    /* `perVista` è un oggetto letterale definito nel chiamante: si confronta
       sui valori, non sul riferimento, per non riagganciare a ogni render. */
  }, [perVista]);

  const pagine = Math.max(1, Math.ceil(slide.length / visibili));
  /* Se il viewport si allarga, la pagina corrente può non esistere più. */
  const paginaValida = Math.min(pagina, pagine - 1);

  const vai = (delta: number) => {
    setPagina((p) => {
      const prossima = Math.min(p, pagine - 1) + delta;
      if (infinito) return (prossima + pagine) % pagine;
      return Math.min(Math.max(prossima, 0), pagine - 1);
    });
  };

  const puoIndietro = infinito || paginaValida > 0;
  const puoAvanti = infinito || paginaValida < pagine - 1;
  const mostraSinistra =
    frecce && (!nascondiFrecceAiBordi || paginaValida > 0) && pagine > 1;
  const mostraDestra =
    frecce &&
    (!nascondiFrecceAiBordi || paginaValida < pagine - 1) &&
    pagine > 1;

  const stileTraccia: CSSProperties = {
    transform: `translateX(-${paginaValida * 100}%)`,
    transitionDuration: `${durata}ms`,
  };

  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={etichetta}
      onTouchStart={(e) => {
        inizioTocco.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const partenza = inizioTocco.current;
        inizioTocco.current = null;
        if (partenza === null) return;
        const scarto = (e.changedTouches[0]?.clientX ?? partenza) - partenza;
        if (Math.abs(scarto) < 40) return;
        if (scarto < 0 && puoAvanti) vai(1);
        if (scarto > 0 && puoIndietro) vai(-1);
      }}
    >
      {/* `.w-slider-mask`: `overflow: hidden`, la fila di slide scorre dentro. */}
      <div className={`relative overflow-hidden ${classeMask}`}>
        <div
          className="flex transition-transform ease-out will-change-transform"
          style={stileTraccia}
        >
          {slide.map((contenuto, i) => (
            /* Chiave posizionale: le slide sono una lista fissa, non si
               riordinano e non si aggiungono. */
            <div
              key={i}
              className={`shrink-0 ${classeSlide}`}
              style={{ width: `${100 / visibili}%` }}
              aria-hidden={
                i < paginaValida * visibili ||
                i >= (paginaValida + 1) * visibili
              }
            >
              {contenuto}
            </div>
          ))}
        </div>
      </div>

      {/* `.w-slider-arrow-left` / `-right`: box da 80px a tutta altezza,
          il glifo centrato dentro. */}
      {mostraSinistra ? (
        <button
          type="button"
          aria-label="Previous"
          onClick={() => vai(-1)}
          className={`absolute inset-y-0 left-0 z-[3] flex w-20 cursor-pointer items-center justify-center text-bianco ${classeFrecce}`}
        >
          <Chevron verso="sinistra" />
        </button>
      ) : null}
      {mostraDestra ? (
        <button
          type="button"
          aria-label="Next"
          onClick={() => vai(1)}
          className={`absolute inset-y-0 right-0 z-[4] flex w-20 cursor-pointer items-center justify-center text-bianco ${classeFrecce}`}
        >
          <Chevron verso="destra" />
        </button>
      ) : null}

      {/* `.w-slider-nav`: barra dei pallini appoggiata al bordo inferiore. */}
      {pallini && pagine > 1 ? (
        <div
          style={{ paddingTop: paddingPallini }}
          className={`absolute inset-x-0 bottom-0 z-[2] h-10 text-center ${classePallini}`}
        >
          {Array.from({ length: pagine }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show slide ${i + 1} of ${pagine}`}
              aria-current={i === paginaValida}
              onClick={() => setPagina(i)}
              style={{
                width: diametroPallini,
                height: diametroPallini,
                marginLeft: spaziaturaPallini,
                marginRight: spaziaturaPallini,
              }}
              className={`inline-block cursor-pointer rounded-full align-top transition-colors ${
                i === paginaValida ? "bg-bianco" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/*
 * Il glifo delle frecce. Sul sito è il carattere `` / `` del font
 * `webflow-icons`; qui è la stessa forma disegnata, così non serve caricare
 * un TTF per due triangoli.
 */
function Chevron({ verso }: { readonly verso: "sinistra" | "destra" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="drop-shadow-[0_0_2px_rgba(0,0,0,0.35)]"
    >
      <path
        d={verso === "sinistra" ? "M15 4 L7 12 L15 20" : "M9 4 L17 12 L9 20"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
