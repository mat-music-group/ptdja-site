import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";

/*
 * "A revolutionary approach to mixing": il blocco
 * `div#opportunities.pricing-card-wrapper.funnel-landing.new-home-2.dj-course-page`
 * di `/mix-mastering-course`.
 *
 * ⚠️ SUL SITO QUESTA SEZIONE NON SI VEDE SOPRA I 479px.
 * Nel foglio c'è `.pricing-card-wrapper.funnel-landing { display: none }` e
 * nessuna regola più specifica rimette `display` per questa combinazione di
 * classi: la sola che lo fa è, nella media query a ≤479,
 * `.pricing-card-wrapper.funnel-landing { display: block }`. Quindi il blocco
 * esiste nel DOM di tutte le viewport e compare solo sul telefono. Non è un
 * errore di ricostruzione: si riproduce con la stessa visibilità e si segnala.
 *
 * ⚠️ E LA CARD INTERNA NON SI VEDE MAI.
 * `.pricing-table.yearly { display: none }` non viene battuta da niente, né al
 * base né a ≤479: il paragrafo "iRefine your skills…" sta nell'HTML pubblicato
 * e non è visibile a nessuna larghezza. Sta qui perché il riferimento è
 * l'HTML, non lo screenshot.
 *
 * ⚠️ Due refusi del sito, riprodotti: "iRefine" (per "Refine") e "masters
 * advanced mixing" (per "master").
 *
 * ── Misure a ≤479 (le uniche che contano, sopra è invisibile) ─────────
 *   wrapper                    padding 50px 30px 0, fondo #1e1e1e
 *   .section-title…talent-pool gap 20, padding-bottom 0, centrato
 *   .section-title-heading.p4  32px peso 300
 *   .cta-p._w-520…mm-page      15px peso 300, opacità 1, centrato, pb 0
 */

export type ProprietaReverseFunnel = {
  readonly titoloEvidenziato1: string;
  readonly titoloDopo1: string;
  readonly titoloRiga2: string;
  readonly titoloEvidenziato2: string;
  readonly titoloDopo2: string;
  readonly paragrafoPrima: string;
  readonly paragrafoEvidenziato: string;
  readonly paragrafoDopo: string;
  /** Il testo della card interna, che il foglio tiene spenta a ogni larghezza. */
  readonly paragrafoCarta: string;
};

export function ReverseFunnel({
  titoloEvidenziato1,
  titoloDopo1,
  titoloRiga2,
  titoloEvidenziato2,
  titoloDopo2,
  paragrafoPrima,
  paragrafoEvidenziato,
  paragrafoDopo,
  paragrafoCarta,
}: ProprietaReverseFunnel) {
  return (
    <div
      id="opportunities"
      className="hidden bg-sfondo px-[30px] pb-0 pt-[50px] max-sm:block"
    >
      {/* `.section-title.new-home-2.talent-pool` (`data-w-id` 55930d1c…e45) */}
      <RivelaAllaVista className="flex flex-col items-center gap-5 pb-0 text-center">
        <h2 className="m-0 text-center text-[32px] font-light leading-[130%] tracking-[-2.5px] text-bianco">
          {/* `font-bold` esplicito: in un titolo di peso 300 il `bolder` della
              preflight di Tailwind varrebbe 400. */}
          <strong className="font-bold">{titoloEvidenziato1}</strong>
          {titoloDopo1}
          <br />
          {titoloRiga2}
          <strong className="font-bold">{titoloEvidenziato2}</strong>
          {titoloDopo2}
        </h2>

        {/* `p.cta-p._w-520.new-home-2.dj-course.mm-page`: `._w-520` è
            `width: 100%; max-width: 520px` e dichiara `font-size: 16px` nel
            blocco base, che batte la regola a ≤479 dove `.cta-p` scende a 15.
            Con 15px il paragrafo misurava 81px invece di 86. */}
        <p className="m-0 w-full max-w-[520px] text-center text-[16px] font-light leading-[180%] tracking-[-0.4px] text-bianco">
          {paragrafoPrima}
          <strong className="font-bold">{paragrafoEvidenziato}</strong>
          {paragrafoDopo}
          <br />
        </p>
      </RivelaAllaVista>

      {/* `.pricing-table.new-home-2.advanced.yearly`: `display: none` a ogni
          larghezza (`.pricing-table.yearly`). Resta nel DOM come sul sito. */}
      <div className="hidden w-full flex-wrap justify-center gap-6">
        {/* `.pricing-card.new-home-2.switcher-page.dj-course-page` */}
        <div className="flex w-full flex-col rounded-[16px] border-0">
          {/* `.pricing-card-top…dj-course-page.only-text`: fondo trasparente,
              nessun bordo, padding 0 a ≤479. */}
          <div className="rounded-t-[25px] border-0 bg-transparent p-0">
            <p className="m-0 w-full max-w-[520px] text-[16px] font-light leading-[180%] tracking-[-0.4px] text-bianco">
              {paragrafoCarta}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
