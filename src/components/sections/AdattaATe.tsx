"use client";

import Image from "next/image";
import { useState } from "react";

/*
 * "The Course that Adapts to You".
 *
 * ⚠️ SUL SITO ESISTE DUE VOLTE, E UNA DELLE DUE NON SI VEDE MAI ─────────
 *
 *   `variante="slider"`    → `div.introduction-content…slider-block.dj-course.dj-v2`
 *        Sul desktop mostra due schede affiancate ("For Beginner" e "For
 *        Advanced"); sotto i 480px le schede spariscono e compare un toggle
 *        Advanced / Beginner che scambia due pannelli.
 *
 *   `variante="accordion"` → `div.w-layout-blockcontainer.container-31`
 *        Stessa cosa con altre classi. `.container-31` è `display: none` a
 *        OGNI breakpoint del foglio: questo blocco esiste nell'HTML servito e
 *        non si vede in nessuna condizione. Si riproduce lo stesso, perché il
 *        riferimento è l'HTML, e si segnala fra le anomalie.
 *
 * ⚠️ I due pannelli "For Advanced" dicono cose diverse: la scheda affiancata
 * parla di community ("Got a production hurdle…"), il pannello del toggle
 * parla di mixing ("If you are already advanced, master advanced mixing…").
 * Anche questo è del sito.
 *
 * ⚠️ COLORE DI "For Advanced". Il foglio dice
 * `.text-theme-color-02.gradient-subtitles.dj-v2.advanced { color:
 * var(--theme-color-03) }`, cioè il corallo #e0593b, e il sito live
 * interrogato il 2026-09-15 restituisce `rgb(224, 89, 59)`. Lo screenshot di
 * riferimento del 2026-09-14 lo mostra invece bianco: fra i due vince il
 * foglio, che è anche quello che il browser calcola oggi. Divergenza
 * dichiarata rispetto al PNG.
 *
 * ── Misure (sito live, 1440) ──────────────────────────────────────────
 *   contenitore              padding-top 64 (0 sotto i 480)
 *   .section-title…dj-course gap 30, padding-bottom 40
 *   .team-card-wrapper       riga, gap 64, `justify-content: space-between`;
 *                            griglia a due colonne sotto i 992, una sotto i 768
 *   .team-card               max-width 600, gap 24
 *   .team-card-image-wrapper gap 20
 *   .body-text-16-regular    16px peso 300, padding-bottom 20
 */

type Pannello = {
  readonly titolo?: string;
  readonly testo: string;
  readonly gradiente: string;
  readonly skill: string;
};

export type ProprietaAdattaATe = {
  readonly variante: "slider" | "accordion";
  readonly titoloPrima: string;
  readonly titoloEvidenziato: string;
  readonly titoloDopo: string;
  readonly toggleAvanzato: string;
  readonly togglePrincipiante: string;
  /** Le due schede affiancate del desktop. */
  readonly principiante: Pannello;
  readonly avanzato: Pannello;
  /** I due pannelli del toggle, che sotto i 480px sostituiscono le schede. */
  readonly togglePannelloPrincipiante?: Pannello;
  readonly togglePannelloAvanzato?: Pannello;
};

const GRADIENTE = { larghezza: 1165, altezza: 297 } as const;
const SKILL = { larghezza: 1164, altezza: 395 } as const;

export function AdattaATe(p: ProprietaAdattaATe) {
  /* Nel CSS `.pricing-table.monthly` nasce visibile e `.toggle-block-3.monthly`
     nasce colorata: lo stato iniziale è "Beginner". */
  const [avanzato, setAvanzato] = useState(false);

  if (p.variante === "accordion") return <VarianteAccordion {...p} />;

  return (
    /* `.introduction-content.homepage.new-home-2.teachers.slider-block.dj-course.dj-v2` */
    <div className="flex w-full flex-col items-center justify-between overflow-hidden bg-sfondo pt-16 leading-[170%] max-sm:gap-[30px] max-sm:pt-0">
      {/* `.container.new-home-2.dj-course.dj-v2` */}
      <div className="mx-auto flex w-auto max-w-sito flex-col items-center justify-end bg-sfondo px-[30px] max-sm:px-5 max-sm:pb-0 max-sm:pt-16">
        {/* `.section-title.new-home-2.dj-course` */}
        <div className="flex flex-col items-center gap-[30px] pb-10 text-center max-sm:gap-5">
          <h2 className="m-0 text-center text-[56px] font-light leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:text-[32px]">
            {p.titoloPrima}
            <br />
            <span className="font-semibold">{p.titoloEvidenziato}</span>
            {p.titoloDopo}
          </h2>
        </div>

        {/* `.pricing-card-wrapper.funnel-landing.dj-v2`: solo sotto i 480px. */}
        <div className="hidden flex-col items-center justify-center gap-0 pt-0 max-sm:flex">
          {/* `.pricing-tab-4.dj-v2` */}
          <div className="flex w-[230px] cursor-pointer flex-wrap items-center justify-center gap-[5px] rounded-bottone bg-bianco px-2 py-[7px]">
            <BottoneToggle
              testo={p.toggleAvanzato}
              attivo={avanzato}
              onClick={() => setAvanzato(true)}
            />
            <BottoneToggle
              testo={p.togglePrincipiante}
              attivo={!avanzato}
              onClick={() => setAvanzato(false)}
            />
          </div>

          {/* `.pricing-table.monthly.dj-v2` e `.pricing-table.yearly`. */}
          <TabellaToggle
            pannello={p.togglePannelloPrincipiante ?? p.principiante}
            visibile={!avanzato}
          />
          <TabellaToggle
            pannello={p.togglePannelloAvanzato ?? p.avanzato}
            visibile={avanzato}
          />
        </div>

        {/* `.team-card-wrapper._2-digital-features.j-v2`: sparisce sotto i 480. */}
        <div className="flex flex-row flex-wrap justify-between gap-16 pb-0 max-lg:grid max-lg:grid-cols-2 max-lg:place-items-center max-lg:gap-[30px] max-md:grid-cols-1 max-sm:hidden">
          <SchedaAdatta pannello={p.principiante} />
          <SchedaAdatta pannello={p.avanzato} avanzato />
        </div>
      </div>
    </div>
  );
}

/* `.toggle-block-3` + `.pricing-toggle-text-4` */
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
        attivo ? "bg-notte" : "bg-transparent"
      }`}
    >
      <span
        className={`text-base font-medium leading-[180%] tracking-[-0.4px] ${
          attivo ? "text-bianco opacity-100" : "text-sfondo opacity-70"
        }`}
      >
        {testo}
      </span>
    </button>
  );
}

/* Una delle due tabelle del toggle: `.pricing-table` con dentro una scheda. */
function TabellaToggle({
  pannello,
  visibile,
}: {
  readonly pannello: Pannello;
  readonly visibile: boolean;
}) {
  return (
    <div
      className={`w-full flex-wrap justify-center gap-6 bg-sfondo px-[10px] ${
        visibile ? "flex" : "hidden"
      }`}
    >
      <SchedaAdatta pannello={pannello} senzaTitolo />
    </div>
  );
}

/*
 * Una scheda: `.team-card.digital-campus.dj-v2` →
 * `.team-card-image-wrapper.dj-v2` con titolo, paragrafo e le due immagini.
 */
function SchedaAdatta({
  pannello,
  avanzato = false,
  senzaTitolo = false,
}: {
  readonly pannello: Pannello;
  readonly avanzato?: boolean;
  readonly senzaTitolo?: boolean;
}) {
  return (
    <div className="flex w-full max-w-[600px] flex-col justify-between gap-6 max-sm:items-center max-sm:border max-sm:border-sfondo max-sm:pt-10">
      <div className="flex flex-col items-start justify-center gap-5 rounded-[24px] max-sm:border max-sm:border-sfondo">
        {pannello.titolo && !senzaTitolo ? (
          <h4
            className={`m-0 text-2xl font-medium leading-[140%] tracking-[-0.8px] max-lg:text-[22px] max-sm:text-xl ${
              avanzato ? "text-corallo" : "text-giallo-cta"
            }`}
          >
            {pannello.titolo}
          </h4>
        ) : null}
        <p className="m-0 pb-5 text-base font-light leading-[180%] tracking-[-0.4px] text-bianco max-sm:text-center max-sm:text-[15px]">
          {pannello.testo}
        </p>
        <Image
          src={pannello.gradiente}
          alt=""
          width={GRADIENTE.larghezza}
          height={GRADIENTE.altezza}
          className="w-full object-contain"
          sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
        />
        <Image
          src={pannello.skill}
          alt=""
          width={SKILL.larghezza}
          height={SKILL.altezza}
          className="w-full object-contain"
          sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
        />
      </div>
    </div>
  );
}

/*
 * La versione `container-31`, che il foglio tiene a `display: none` a ogni
 * breakpoint. Resta nell'albero perché sul sito c'è, con i suoi refusi
 * ("music genra", "bring any beginner", "masters advanced mixing").
 */
function VarianteAccordion(p: ProprietaAdattaATe) {
  return (
    <div className="mx-auto hidden max-w-sito flex-row items-start justify-start px-[30px]">
      <div className="flex flex-col items-center justify-center gap-10 pt-16">
        <div className="flex flex-col items-center gap-[30px] pb-[30px] text-center">
          <h2 className="m-0 text-center text-[56px] font-light leading-[130%] tracking-[-2.5px] text-bianco">
            {p.titoloPrima}
            <br />
            <span className="font-semibold">{p.titoloEvidenziato}</span>
            {p.titoloDopo}
          </h2>
        </div>

        {/* `.pricing-tab-4.new-home-2`: `display: none` sopra i 480px. */}
        <div className="hidden cursor-pointer flex-wrap items-center justify-center gap-[5px] rounded-bottone border border-bianco bg-crema">
          <span className="rounded-[24px] px-4 py-[7px] text-base font-medium leading-[180%] tracking-[-0.4px] text-sfondo opacity-70">
            {p.toggleAvanzato}
          </span>
          <span className="rounded-[24px] bg-notte px-4 py-[7px] text-base font-medium leading-[180%] tracking-[-0.4px] text-bianco">
            {p.togglePrincipiante}
          </span>
        </div>

        <div className="flex w-full flex-row flex-wrap justify-center gap-6">
          <SchedaAccordion pannello={p.principiante} />
        </div>
        <div className="hidden w-full flex-row flex-wrap justify-center gap-6">
          <SchedaAccordion pannello={p.avanzato} />
        </div>
      </div>
    </div>
  );
}

function SchedaAccordion({ pannello }: { readonly pannello: Pannello }) {
  return (
    <div className="flex flex-col rounded-[16px] border-0">
      <div className="rounded-t-media p-6">
        {pannello.titolo ? (
          <h4 className="m-0 cursor-pointer pb-5 text-2xl font-medium leading-[22px] tracking-[-0.8px]">
            <strong className="font-bold text-crema">
              {pannello.titolo}
              <br />
            </strong>
          </h4>
        ) : null}
        <p className="m-0 text-left text-base font-light leading-[180%] tracking-[-0.4px] text-bianco opacity-75">
          {pannello.testo}
          <br />
        </p>
        <Image
          src={pannello.gradiente}
          alt=""
          width={GRADIENTE.larghezza}
          height={GRADIENTE.altezza}
          className="w-full pb-[30px] object-contain"
        />
        <Image
          src={pannello.skill}
          alt=""
          width={SKILL.larghezza}
          height={SKILL.altezza}
          className="w-full object-contain"
        />
      </div>
    </div>
  );
}
