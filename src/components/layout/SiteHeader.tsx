"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ETICHETTA_CORSI,
  LOGO,
  MENU_CORSI,
  MENU_DOPO,
  MENU_PRIMA,
} from "@/testi/condivisi";

/*
 * L'header del sito, variante `a418b0b3`: quella di home, i tre corsi,
 * pricing, play & get signed, terms-conditions e 404 (8 pagine su 11).
 *
 * Struttura copiata dall'HTML: `.header-2.sticky-bg.new-home-2` →
 * `.container-3.w-container` → `.navbar-2.w-nav` → `.navbar-wrapper` con il
 * logo a sinistra, la lista di voci a destra e, sotto i 992px, il bottone
 * del menu con l'icona Lottie.
 *
 * Misure dal CSS: header alto 92px con 22px di padding sopra e sotto,
 * `position: sticky` in cima, fondo `--neutral-03`, `z-index: 9999`; il
 * contenitore è largo al massimo 1380px con 30px di lato (768px sotto i
 * 992, 600px sotto i 768); le voci hanno 36px di distanza, corpo 16px,
 * `letter-spacing: -.4px`, opacità .85 e diventano mint al passaggio.
 *
 * ── SCROLL ─────────────────────────────────────────────────────────────
 * L'header NON si nasconde e non cambia allo scorrimento. Sembrerebbe di sì,
 * perché `.navbar-2` porta un `data-w-id`, ma quell'interazione nell'IX2
 * pubblicato è `NAVBAR_OPEN` / `NAVBAR_CLOSE`, cioè l'apertura del menu
 * mobile. Verificato leggendo il bundle `webflow.schunk.5961952b…js`: non
 * esiste nessun evento `SCROLLING_IN_VIEW` su questo elemento. Quindi qui
 * sticky e basta, come dice il CSS.
 */

/* L'icona Lottie arriva solo nel browser e solo quando serve: `lottie-web`
   è pesante e sotto i 992px non vale la pena averlo nel bundle iniziale.
   `ssr: false` evita anche il disallineamento fra HTML del server e client. */
const IconaMenuLottie = dynamic(
  () => import("@/components/layout/IconaMenuLottie").then((m) => m.IconaMenuLottie),
  { ssr: false }
);

/* La freccina del dropdown. Su Webflow è un carattere del font
   `webflow-icons` (`.w-icon-dropdown-toggle`), che qui non c'è: stesso segno
   disegnato a mano, in `currentColor` così segue il colore della voce. */
function Chevron({ className = "" }: { readonly className?: string }) {
  return (
    <svg
      width="10"
      height="7"
      viewBox="0 0 10 7"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const percorso = usePathname();
  const [menuAperto, setMenuAperto] = useState(false);
  const [corsiAperti, setCorsiAperti] = useState(false);

  /* Cambiando pagina il menu si chiude: su Webflow ogni click era un
     caricamento nuovo, qui la navigazione è client side e senza questo
     il pannello resterebbe aperto sopra la pagina di destinazione. */
  useEffect(() => {
    setMenuAperto(false);
    setCorsiAperti(false);
  }, [percorso]);

  const attiva = (href: string) => (percorso === href ? "page" : undefined);

  return (
    <div className="sticky inset-x-0 top-0 z-[9999] h-header w-full bg-sfondo py-[22px]">
      <div className="mx-auto w-full max-w-sito px-[30px] max-lg:max-w-[768px] max-md:max-w-[600px]">
        <div className="flex w-full items-center justify-between">
          {/* Il logo si restringe quando lo spazio non basta: il link è un
              flex item con `min-w-0` (senza, un flex item non scende sotto la
              larghezza del suo contenuto e il logo passerebbe sopra il
              bottone del menu). Sotto i 480px l'immagine si ferma all'80% del
              link, che è la regola `.image-11 { max-width: 80% }` del foglio
              Webflow: su un iPhone il logo misura 246px e non 305. */}
          <Link
            href="/"
            className="flex min-w-0 shrink"
            aria-label="Pete Tong DJ Academy"
          >
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              width={LOGO.larghezza}
              height={LOGO.altezza}
              priority
              className="h-auto w-[350px] max-w-full max-sm:max-w-[80%]"
            />
          </Link>

          {/* ── Navigazione desktop ───────────────────────────────────── */}
          <nav className="max-lg:hidden">
            <ul className="m-0 flex list-none flex-row items-center gap-9 p-0 text-bianco">
              {MENU_PRIMA.map((voce) => (
                <li key={voce.href}>
                  <Link
                    href={voce.href}
                    aria-current={attiva(voce.href)}
                    className="block py-2 text-base font-normal capitalize tracking-[-0.4px] text-bianco opacity-85 transition-colors hover:text-mint"
                  >
                    {voce.testo}
                  </Link>
                </li>
              ))}

              {/* Il dropdown "Courses": su Webflow `data-hover="true"` con
                  `data-delay="0"`, cioè si apre al passaggio del mouse. */}
              <li
                className="group relative left-[10px]"
                onMouseEnter={() => setCorsiAperti(true)}
                onMouseLeave={() => setCorsiAperti(false)}
              >
                <button
                  type="button"
                  aria-expanded={corsiAperti}
                  aria-haspopup="true"
                  onClick={() => setCorsiAperti((v) => !v)}
                  className="-mr-[10px] flex flex-row-reverse items-center gap-[6px] pt-[3px] text-base font-normal capitalize leading-5 tracking-[-0.4px] text-bianco opacity-85 transition-colors group-hover:text-mint"
                >
                  <Chevron className="mt-[2px] transition-transform duration-300 group-hover:rotate-180" />
                  <span>{ETICHETTA_CORSI}</span>
                </button>
                {/* Il mega menu: fondo bianco, raggio 12px, ombra
                    `0 20px 36px #0000000d`, una colonna sola. */}
                <div
                  className={`absolute left-0 top-full pt-[10px] ${
                    corsiAperti ? "block" : "hidden"
                  }`}
                >
                  <div className="grid min-w-[200px] grid-cols-1 gap-[30px] rounded-xl bg-bianco p-5 shadow-[0_20px_36px_#0000000d]">
                    <div className="flex flex-col">
                      {MENU_CORSI.map((corso) => (
                        <Link
                          key={corso.href}
                          href={corso.href}
                          aria-current={attiva(corso.href)}
                          className="px-[10px] py-[3px] text-base font-normal capitalize tracking-[-0.4px] text-notte opacity-85 transition-all hover:text-mint"
                        >
                          {corso.testo}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>

              {MENU_DOPO.map((voce) => (
                <li key={voce.href}>
                  <Link
                    href={voce.href}
                    aria-current={attiva(voce.href)}
                    className="block py-2 text-base font-normal capitalize tracking-[-0.4px] text-bianco opacity-85 transition-colors hover:text-mint"
                  >
                    {voce.testo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Bottone del menu, sotto i 992px ───────────────────────── */}
          <button
            type="button"
            aria-expanded={menuAperto}
            aria-label={menuAperto ? "Close menu" : "Open menu"}
            onClick={() => setMenuAperto((v) => !v)}
            className="hidden h-5 w-[25px] shrink-0 items-center justify-center p-0 max-lg:flex"
          >
            <IconaMenuLottie aperto={menuAperto} />
          </button>
        </div>
      </div>

      {/* ── Pannello del menu mobile ────────────────────────────────────
          Su Webflow è l'overlay di `w-nav`: compare sotto l'header, a tutta
          larghezza, con il pannello bianco (`.nav-menu-2` a ≤991px: fondo
          bianco, raggio 12px, `margin-top: 20px`, `padding: 20px 30px`) e i
          link che diventano scuri (`.nav-link-2` → `--neutral-03`). */}
      {menuAperto ? (
        <div className="absolute inset-x-0 top-full lg:hidden">
          <div className="mx-auto w-full max-w-sito px-[30px] max-lg:max-w-[768px] max-md:max-w-[600px]">
            <ul className="z-[9999] m-0 mt-5 flex list-none flex-col flex-wrap items-start justify-around gap-2 rounded-xl bg-bianco px-[30px] py-5 shadow-[0_8px_50px_#0000000d]">
              {MENU_PRIMA.map((voce) => (
                <li key={voce.href} className="w-full">
                  <Link
                    href={voce.href}
                    aria-current={attiva(voce.href)}
                    className="inline-block py-[2px] text-base font-normal capitalize tracking-[-0.4px] text-sfondo opacity-85"
                  >
                    {voce.testo}
                  </Link>
                </li>
              ))}

              <li className="w-full">
                <button
                  type="button"
                  aria-expanded={corsiAperti}
                  onClick={() => setCorsiAperti((v) => !v)}
                  className="flex w-full flex-row-reverse items-center justify-end gap-[6px] py-[5px] text-base font-normal capitalize leading-5 tracking-[-0.4px] text-notte opacity-85"
                >
                  <Chevron
                    className={`transition-transform duration-300 ${
                      corsiAperti ? "rotate-180" : ""
                    }`}
                  />
                  <span>{ETICHETTA_CORSI}</span>
                </button>
                {corsiAperti ? (
                  <div className="flex flex-col px-[10px] pb-5">
                    {MENU_CORSI.map((corso) => (
                      <Link
                        key={corso.href}
                        href={corso.href}
                        aria-current={attiva(corso.href)}
                        className="px-[10px] py-[3px] text-base font-normal capitalize tracking-[-0.4px] text-notte opacity-85"
                      >
                        {corso.testo}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </li>

              {MENU_DOPO.map((voce) => (
                <li key={voce.href} className="w-full">
                  <Link
                    href={voce.href}
                    aria-current={attiva(voce.href)}
                    className="inline-block py-[2px] text-base font-normal capitalize tracking-[-0.4px] text-sfondo opacity-85"
                  >
                    {voce.testo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
