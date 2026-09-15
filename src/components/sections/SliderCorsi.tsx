"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { SliderWebflow } from "@/components/ui/SliderWebflow";
import { tracciaCourseCardClick } from "@/lib/eventi-mixpanel";

/*
 * Il carosello delle tre card corso: `div.slider-79.new-home-3.courses`.
 *
 * Compare in fondo a "Explore the Courses & Build Your Plan" su
 * `/play-get-signed`, sulla home e nei "Related Courses" delle pagine corso.
 * Le card non hanno testo: sono tre PNG, ognuno dentro un link alla pagina del
 * corso. Il titolo, il prezzo, i badge "INCLUDED IN…" che si leggono nello
 * screenshot sono disegnati dentro l'immagine.
 *
 * Misure dal foglio Webflow:
 *   .slider-79.new-home-3.courses → display flex, width 100%, height auto,
 *        padding 25px 50px, sfondo `--neutral-03`, contenuto centrato;
 *        sotto i 480px padding 20px 50px 0 e overflow hidden
 *   .mask-4.new-home-3            → width auto (cioè larga quanto le slide,
 *        3 × 350 = 1050px), height auto, overflow hidden; 100% sotto i 480px
 *   .slide-8.new-home-3           → 350px; 100% con 5px di margine sotto i 480
 *   .slidecontent                 → margine orizzontale 20px, raggio 12px;
 *        sotto i 480px larghezza piena e raggio 25px
 *   .image-42                     → raggio 20px; 25px e `object-fit: contain`
 *        sotto i 480px
 *   .left-arrow-3 / .right-arrow-2 con `.desk-invisible` → `display: none`
 *        sopra i 991px, visibili da lì in giù
 *   .slide-nav-9.new-home-3       → `display: none` a ogni breakpoint
 *
 * I 1050px della maschera non sono una misura inventata: sul sito la maschera
 * è un elemento flex con `width: auto`, quindi si dimensiona sulle tre slide
 * da 350px. Qui è scritto esplicitamente perché le slide hanno larghezza in
 * percentuale, e una percentuale di `auto` non si può calcolare.
 */

export type CorsoInVetrina = {
  readonly href: string;
  readonly src: string;
  readonly alt: string;
  readonly larghezza: number;
  readonly altezza: number;
};

type ProprietaSliderCorsi = {
  readonly corsi: readonly CorsoInVetrina[];
  readonly className?: string;
};

export function SliderCorsi({ corsi, className = "" }: ProprietaSliderCorsi) {
  return (
    <SliderWebflow
      etichetta="Courses"
      perVista={{ desktop: 3, mobile: 1 }}
      pallini={false}
      classeFrecce="hidden max-lg:flex"
      className={`flex w-full items-center justify-center overflow-visible bg-sfondo px-[50px] py-[25px] max-sm:overflow-hidden max-sm:pb-0 max-sm:pt-5 ${className}`}
      classeMask="w-[1050px] max-w-full max-sm:w-full"
      /* Sotto i 480px `.slide-8` ha `width: 100%` e `margin: 0 5px`, non
         padding: con `px-[5px]` la card era larga 280 invece di 290 e
         l'immagine, a proporzione fissa, 19px più bassa. */
      classeSlide="px-5 max-sm:mx-[5px] max-sm:px-0"
      slide={corsi.map((corso) => (
        <CardCorso key={corso.href} corso={corso} />
      ))}
    />
  );
}

/*
 * Una card: `div.slidecontent.courses-slides` con dentro il link e il PNG.
 * `alt=""` nell'HTML su tutte e tre: l'immagine è decorativa e il nome del
 * corso sta nell'URL del link, quindi si lascia vuoto com'è sul sito.
 */
export function CardCorso({ corso }: { readonly corso: CorsoInVetrina }) {
  /* `Course Card Click`. Sul sito l'handler è su
     `#sliderId .w-slide a.w-inline-block`, cioè proprio questo link: il nome
     del corso non lo legge dalla pagina, lo ricava dall'href (vedi
     `src/lib/eventi-mixpanel.ts`). */
  const suClick = (evento: MouseEvent<HTMLAnchorElement>) =>
    tracciaCourseCardClick(evento.currentTarget);

  return (
    <div className="relative flex min-w-[200px] flex-col rounded-[12px] text-center max-sm:min-w-0 max-sm:gap-[35px] max-sm:rounded-media">
      <Link href={corso.href} className="inline-block max-w-full" onClick={suClick}>
        <Image
          src={corso.src}
          alt={corso.alt}
          width={corso.larghezza}
          height={corso.altezza}
          className="h-auto w-full rounded-[20px] max-sm:rounded-media max-sm:object-contain"
        />
      </Link>
    </div>
  );
}
