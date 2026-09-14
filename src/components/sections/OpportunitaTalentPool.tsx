"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";
import { Tooltip } from "@/components/ui/Tooltip";
import type { PannelloOpportunita } from "@/testi/play-get-signed";

/*
 * "Access Tailored Opportunities": il blocco `#opportunities` di
 * `/play-get-signed`, che torna identico sulla home.
 *
 * ── Tre pannelli, non due ─────────────────────────────────────────────
 *
 * Sul sito la struttura è questa, e va capita prima di leggere il codice:
 *
 *   div#opportunities.pricing-card-wrapper…prod-dj
 *     div.section-title…tailored-opportunities      → titolo
 *     div.pricing-tab…prod-dj                       → toggle Producers / DJs
 *     div.pricing-table.monthly…half-left           → SEMPRE visibile
 *       div.pricing-card                              → la card "DJs"
 *       div.pricing-card.producer-right-desktop       → la card "Producers",
 *                                                       solo da 1280px in su
 *     div.pricing-table…producer.yearly             → display:none nel CSS,
 *                                                     l'accende il toggle
 *
 * Sul desktop il toggle è `display: none` e si vedono le due card affiancate.
 * Sotto i 480px la card Producers affiancata sparisce, compare il toggle, e
 * "Producers" scambia la prima tabella con la seconda.
 *
 * ⚠️ Fra 480px e 1279px l'intero `#opportunities` è `display: none`:
 * `.pricing-card-wrapper.funnel-landing` vale `none` e nessuna regola lo
 * riaccende in quella fascia. Su un tablet la sezione non esiste. È un
 * difetto del sito, si riproduce e si segnala.
 *
 * ⚠️ I due pannelli Producers dicono cose diverse (voci e paragrafo): anche
 * questo è del sito, non un errore di copiatura. Vedi il commento in
 * `src/testi/play-get-signed.ts`.
 *
 * `h4.accordion-heading` si chiama così ma non apre niente: qui non c'è
 * nessun dropdown Webflow, è solo il nome della classe riusata dal tema.
 *
 * ── Larghezza delle card ──────────────────────────────────────────────
 * Le due card non hanno `width` nel CSS: sono elementi flex che si
 * dimensionano sul contenuto. Il contenuto più largo è il paragrafo, che ha
 * `max-width: 520px`; con i 24px di padding per lato la card viene 568px, che
 * è la misura che si vede nello screenshot di riferimento. Non si scrive
 * `w-[568px]`: si lascia il `max-w-[520px]` sul paragrafo e la larghezza esce
 * da sola, come sul sito.
 */

/** I quattro angoli colorati, che nel CSS sono quattro SVG di sfondo. */
const SFONDO_TONO = {
  giallo: "/webflow/shared/giallo.svg",
  viola: "/webflow/shared/viola.svg",
  rosso: "/webflow/shared/rosso.svg",
  verde: "/webflow/shared/verde.svg",
} as const;

type ProprietaOpportunita = {
  /** `id` della sezione: qui "opportunities", il bersaglio della CTA della hero. */
  readonly id?: string;
  /** Il titolo, già composto dal chiamante con i suoi `<span>`. */
  readonly titolo: ReactNode;
  /** Le due etichette del toggle, nell'ordine del sito (sinistra, destra). */
  readonly etichetteToggle: { readonly sinistra: string; readonly destra: string };
  /** La card sempre visibile. */
  readonly pannelloDj: PannelloOpportunita;
  /** La card affiancata, che il CSS mostra solo da 1280px in su. */
  readonly pannelloProducerDesktop: PannelloOpportunita;
  /** La seconda tabella, che il toggle accende sotto i 480px. */
  readonly pannelloProducerMobile: PannelloOpportunita;
};

export function OpportunitaTalentPool({
  id,
  titolo,
  etichetteToggle,
  pannelloDj,
  pannelloProducerDesktop,
  pannelloProducerMobile,
}: ProprietaOpportunita) {
  /* Lo stato iniziale è "DJs": nel CSS `.toggle-block.monthly` nasce già
     colorata e `.pricing-table.monthly` già visibile. */
  const [producers, setProducers] = useState(false);

  return (
    <div
      id={id}
      className="flex flex-col items-center gap-[30px] bg-sfondo pt-[120px] [@media(min-width:480px)_and_(max-width:1279px)]:hidden max-sm:gap-5 max-sm:px-[30px] max-sm:pt-[50px]"
    >
      {/* `.section-title…tailored-opportunities`: `padding-bottom: 0`. */}
      <div className="flex flex-col items-center gap-[30px] text-center max-sm:gap-5">
        {titolo}
      </div>

      {/* `.pricing-tab…prod-dj`: esiste solo sotto i 480px. */}
      <div className="hidden w-[200px] items-center justify-center gap-[5px] rounded-bottone border border-bianco bg-crema py-[5px] max-sm:flex">
        <BottoneToggle
          testo={etichetteToggle.sinistra}
          attivo={producers}
          onClick={() => setProducers(true)}
        />
        <BottoneToggle
          testo={etichetteToggle.destra}
          attivo={!producers}
          onClick={() => setProducers(false)}
        />
      </div>

      {/* `.pricing-table.monthly…half-left`. */}
      <div
        className={`flex w-full flex-row justify-center gap-6 px-[30px] pt-[30px] max-sm:rounded-media max-sm:bg-nero max-sm:px-0 ${
          producers ? "max-sm:hidden" : ""
        }`}
      >
        <CardOpportunita pannello={pannelloDj} />
        {/* `.producer-right-desktop`: `display: none` sotto i 480px. */}
        <CardOpportunita pannello={pannelloProducerDesktop} className="max-sm:hidden" />
      </div>

      {/* `.pricing-table…producer.yearly`: nel CSS è sempre `display: none`,
          la accende l'interazione Webflow del toggle. */}
      <div
        className={`hidden w-full flex-row flex-wrap justify-center gap-6 max-sm:rounded-media max-sm:bg-nero max-sm:px-[10px] ${
          producers ? "max-sm:flex" : ""
        }`}
      >
        <CardOpportunita pannello={pannelloProducerMobile} bordata />
      </div>
    </div>
  );
}

/* Un'etichetta del toggle: `.toggle-block` + `.pricing-toggle-text`. */
function BottoneToggle({
  testo,
  attivo,
  onClick,
}: {
  readonly testo: string;
  readonly attivo: boolean;
  readonly onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={attivo}
      className={`flex items-center gap-2 rounded-[24px] px-4 py-[7px] transition-all duration-[400ms] ${
        attivo ? "bg-nero" : "bg-transparent"
      }`}
    >
      <span
        className={`text-[15px] font-medium leading-[180%] tracking-[-0.4px] ${
          attivo ? "text-bianco opacity-100" : "text-nero opacity-70"
        }`}
      >
        {testo}
      </span>
    </button>
  );
}

/*
 * Una card: intestazione (titolo + paragrafo) e corpo (le cinque voci).
 *
 * `bordata` serve alla terza tabella, che non ha `.noborder-box` e quindi
 * conserva il filetto bianco da 1px del tema.
 */
function CardOpportunita({
  pannello,
  className = "",
  bordata = false,
}: {
  readonly pannello: PannelloOpportunita;
  readonly className?: string;
  readonly bordata?: boolean;
}) {
  return (
    <div className={`rounded-blocco ${className}`}>
      {/* `.pricing-card-top`. La `pt-0` sotto i 480px è della card DJs, che è
          l'unica a portare `.opportunitites-talent-pool.blocco-talent-home`;
          la terza tabella non ha titolo e parte direttamente dal paragrafo. */}
      <div
        className={`rounded-t-media bg-nero px-6 pb-[10px] pt-6 max-sm:px-[10px] ${
          bordata ? "border-x border-t border-bianco" : ""
        } ${pannello.titolo ? "max-sm:pt-0" : ""}`}
      >
        {pannello.titolo ? (
          <h4 className="m-0 cursor-pointer text-2xl font-medium leading-[22px] tracking-[-0.8px] max-lg:text-[22px] max-sm:hidden">
            <strong
              className={
                pannello.tonoTitolo === "arancio"
                  ? "text-corallo"
                  : "text-giallo-cta"
              }
            >
              {pannello.titolo}
              <br />
            </strong>
          </h4>
        ) : null}
        <p className="m-0 w-full max-w-[520px] text-base font-light leading-[180%] tracking-[-0.4px] text-bianco opacity-75 max-sm:text-center max-sm:opacity-100">
          {pannello.paragrafo}
          <br />
        </p>
      </div>

      {/* `.pricing-card-body`. */}
      <div
        className={`flex flex-col gap-6 rounded-b-media bg-nero px-5 py-6 max-sm:px-[10px] ${
          bordata ? "border-x border-b border-bianco" : ""
        }`}
      >
        <div className="flex flex-col gap-4">
          {/* `.terms-card-wrapper-3` (grid) → `.terms-card-list-3` (flex
              colonna, gap 24).

              `grid-template-rows: auto auto` con un figlio solo non è inutile:
              la seconda riga resta vuota ma il `gap` fra le due righe esiste
              lo stesso, e aggiunge 24px in fondo alla card. Misurato sul sito
              live (735px invece dei 711px delle cinque voci più i quattro
              spazi). Toglierlo accorcia la sezione di 24px. */}
          <div className="grid grid-cols-1 grid-rows-[auto_auto] items-start justify-center gap-6 max-sm:mb-[10px] max-sm:grid-rows-[auto] max-sm:gap-[6px]">
            <div className="flex flex-col gap-6">
              {pannello.opportunita.map((o, i) => (
                <RigaOpportunita key={`${o.titolo}-${i}`} opportunita={o} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
 * Una voce: `.content-card-10` → `.content-list-item-4` → testo + logo.
 *
 * Nel CSS lo spicchio colorato è lo sfondo di due elementi diversi a seconda
 * del breakpoint (`.content-list-item-4` sopra i 480px, `.content-card-10`
 * sotto). I due elementi hanno lo stesso riquadro quando il padding è zero,
 * quindi qui lo sfondo sta su un elemento solo e cambia solo la posizione:
 * `0 -50px` sopra, `0 -55px` sotto. Risultato identico, un livello in meno.
 */
function RigaOpportunita({
  opportunita,
}: {
  readonly opportunita: PannelloOpportunita["opportunita"][number];
}) {
  return (
    <div
      className="flex w-full items-center justify-around gap-[7px] rounded-media bg-sfondo bg-[position:0_-50px] bg-contain bg-no-repeat text-left max-sm:justify-between max-sm:gap-[6px] max-sm:bg-[position:0_-55px] max-sm:px-[30px] max-sm:py-[10px]"
      style={{ backgroundImage: `url(${SFONDO_TONO[opportunita.tono]})` }}
    >
      <p className="m-0 text-left text-base font-normal leading-[180%] tracking-[-0.4px] text-bianco max-sm:text-[15px]">
        <strong>
          {opportunita.titolo}
          <br />
        </strong>
        {opportunita.sottotitolo}
        {opportunita.tooltip ? <Tooltip messaggio={opportunita.tooltip} /> : null}
      </p>
      <Image
        src={opportunita.logo.src}
        alt={opportunita.logo.alt}
        width={opportunita.logo.larghezza}
        height={opportunita.logo.altezza}
        className="mt-[3px] block h-auto w-[120px] max-sm:w-20"
      />
    </div>
  );
}
