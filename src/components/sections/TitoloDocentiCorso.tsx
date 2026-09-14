import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";

/*
 * Il titolo sopra il carosello dei docenti:
 * `section.feature-section…new-home-2.course-teachers`.
 *
 * È una sezione a sé, separata dallo slider, perché sul sito lo è: il titolo
 * sta dentro un `.container` largo 1380px, il carosello è un blocco a tutta
 * larghezza subito dopo. Le tre pagine corso lo riusano cambiando solo le due
 * righe del titolo (DJ / Producer / Mix & Mastering).
 *
 * Misure: `padding-top: 60px` (50 sotto i 480), niente padding sotto;
 * `.section-title.new-home-2.dj-course` ha `padding-bottom: 40px` e 30px di
 * gap (20 sotto i 480). Titolo `.section-title-heading.p4`: 56px peso 300,
 * con la seconda riga in `span.text-span-105` a peso 600.
 */

type ProprietaTitoloDocenti = {
  readonly titoloRiga1: string;
  readonly titoloEvidenziato: string;
};

export function TitoloDocentiCorso({
  titoloRiga1,
  titoloEvidenziato,
}: ProprietaTitoloDocenti) {
  return (
    <section className="block overflow-hidden bg-sfondo pb-0 pt-[60px] max-sm:pt-[50px]">
      {/* `.container.new-home-2.dj-course` */}
      <div className="mx-auto flex w-auto max-w-sito flex-col items-center justify-end bg-sfondo px-[30px] max-sm:px-0 max-sm:pb-0">
        {/* `.feature-tabs-wrapper.slider-container` */}
        <div className="mx-auto flex flex-col items-center justify-center gap-16 text-center max-lg:w-[70%] max-md:w-full">
          {/* `.section-title.new-home-2.dj-course` */}
          <RivelaAllaVista className="flex flex-col items-center gap-[30px] pb-10 text-center max-sm:gap-5">
            <h2 className="m-0 text-center text-[56px] font-light leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:text-[32px]">
              {titoloRiga1}
              <br />
              {/* `font-semibold` esplicito: `.text-span-105` è `font-weight:
                  600`, e in un titolo di peso 300 il `bolder` della preflight
                  di Tailwind non basterebbe. */}
              <span className="font-semibold">{titoloEvidenziato}</span>
            </h2>
          </RivelaAllaVista>
        </div>
      </div>
    </section>
  );
}
