"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import {
  type TracciaBottone,
  tracciaBottone,
  tracciaClickSuId,
} from "@/lib/eventi-mixpanel";

/*
 * Il bottone del sito, nelle tre varianti che esistono davvero nel CSS
 * Webflow. Non ce ne sono altre: se serve un quarto stile, prima si cerca
 * nel foglio, poi lo si aggiunge qui con il nome della classe di origine.
 *
 * - `mint`   → `.button.secondary` e `.button-2.secondary`: fondo
 *              `--theme-color-01`, testo `--neutral-03`, nessun bordo.
 *              È il bottone principale del sito (404, book a call, VideoAsk).
 * - `stroke` → `.button` e `.button-2` senza modificatori: fondo nero,
 *              bordo `2px solid #ffffff1a`, testo bianco.
 * - `giallo` → variante con `--colore-button-cta` (#e7ff09), usata dalle CTA
 *              in evidenza.
 *
 * Tutte e tre condividono raggio `--button-radius` (32px), padding
 * `10px 24px 8px` (sì, asimmetrico: è così nel CSS) e `line-height: 180%`.
 *
 * ── PERCHÉ È UN CLIENT COMPONENT ────────────────────────────────────────
 * Per il tracciamento, e solo per quello. Sul sito Webflow gli eventi Mixpanel
 * dei bottoni sono agganciati per selettore (`a.button.enroll.signup-now`,
 * `#buy-now-header`, `a.button-2.secondary[href*="calendly.com"]`), cioè da
 * fuori: qui quelle classi non esistono e l'unico posto che sa di essere un
 * bottone è questo componente. Chi lo usa dichiara *quale* evento con la props
 * `traccia`, che è un oggetto e non una callback proprio perché deve poter
 * arrivare da una pagina renderizzata sul server.
 *
 * Un bottone senza `traccia` e senza `id` tracciato non manda niente: il click
 * non passa da nessuna funzione, l'handler esce alla prima riga.
 */

type Variante = "mint" | "stroke" | "giallo";

const VARIANTI: Record<Variante, string> = {
  mint: "bg-mint text-sfondo hover:bg-bianco",
  stroke: "bg-nero text-bianco border-2 border-white/10 hover:bg-nero/90",
  giallo: "bg-giallo-cta text-sfondo hover:bg-bianco",
};

type ProprietaBottone = {
  readonly href: string;
  readonly children: ReactNode;
  readonly variante?: Variante;
  /** Icona a destra del testo, come la freccia grigia della 404. */
  readonly icona?: { readonly src: string; readonly alt: string; readonly lato: number };
  readonly className?: string;
  /** `true` per i link che escono dal sito (carrello, Calendly, social). */
  readonly esterno?: boolean;
  /** Anche il gancio di `Buy Now Menu` / `Buy Now Header`, che sul sito sono
   *  agganciati a `#enroll-now-menu` e `#buy-now-header`. */
  readonly id?: string;
  /** L'evento Mixpanel da mandare al click, se ce n'è uno. */
  readonly traccia?: TracciaBottone;
};

export function Button({
  href,
  children,
  variante = "mint",
  icona,
  className = "",
  esterno,
  id,
  traccia,
}: ProprietaBottone) {
  const classi = [
    "inline-block rounded-bottone px-6 pt-[10px] pb-2 text-base font-normal leading-[180%] transition-all duration-500",
    VARIANTI[variante],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  /* `data-traccia` (più sotto) non serve al tracciamento: serve a vedere dal
     DOM quali bottoni sono agganciati, che è l'unica cosa che qui si perde
     rispetto a Webflow, dove il gancio era una classe e quindi si leggeva
     nell'HTML. Stessa idea del `data-pricing-tracked` che lo script del listino
     scrive sui bottoni che ha già preso in carico. Lo usa
     `scripts/_verifica-mixpanel.mjs`.

     Un solo handler per entrambi i ganci: sul sito un bottone può avere sia
     l'id tracciato sia una classe tracciata, e in quel caso partono due eventi.
     Stesso ordine dello script, prima l'id. */
  const suClick = (evento: MouseEvent<HTMLAnchorElement>) => {
    tracciaClickSuId(id);
    if (traccia) tracciaBottone(traccia, evento.currentTarget);
  };

  const contenuto = (
    <span className="flex items-center justify-center gap-3">
      <span>{children}</span>
      {icona ? (
        <Image
          src={icona.src}
          alt={icona.alt}
          width={icona.lato}
          height={icona.lato}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      ) : null}
    </span>
  );

  /* I link interni passano da `next/link` per non ricaricare la pagina;
     quelli esterni restano `<a>`, altrimenti Next prefetcherebbe domini
     che non controlliamo. */
  if (esterno || href.startsWith("http") || href.startsWith("#")) {
    return (
      <a
        id={id}
        href={href}
        className={`group ${classi}`}
        onClick={suClick}
        data-traccia={traccia?.evento}
      >
        {contenuto}
      </a>
    );
  }

  return (
    <Link
      id={id}
      href={href}
      className={`group ${classi}`}
      onClick={suClick}
      data-traccia={traccia?.evento}
    >
      {contenuto}
    </Link>
  );
}
