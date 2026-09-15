import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";

/*
 * Il titolo "Your Teacher. / A pioneer. A legend." di `/mix-mastering-course`:
 * `section.feature-section…new-home-2.course-teachers`.
 *
 * ── Perché è un componente a sé ───────────────────────────────────────
 * L'involucro è quello delle altre due pagine corso (stessa sezione, stesso
 * `.container.new-home-2.dj-course`, stesso `.section-title.new-home-2.dj-course`),
 * ma l'`<h2>` ha una forma diversa. Sul sito:
 *
 *   <span>Your</span><span class="text-span-105"> Teacher.<br></span>A pioneer. A legend.
 *
 * cioè il grassetto (`.text-span-105`, peso 600) sta sulla PRIMA riga, sulla
 * sola parola " Teacher." (lo spazio iniziale è dentro lo span), e la seconda
 * riga è leggera. Su `/dj-course` e `/producer-course` era l'inverso — riga 1
 * leggera, riga 2 in grassetto — e lo faceva `TitoloDocentiCorso`, rimosso il
 * 2026-09-15 insieme al carosello dei docenti (vedi `DocentiAcademy`). Questo
 * resta perché `/mix-mastering-course` non ha né carosello né docenti da
 * elencare: là il titolo è tutta la sezione.
 *
 * ── Misure (dal foglio Webflow) ───────────────────────────────────────
 *   sezione                    padding-top 60 (50 sotto i 480), niente sotto
 *   .container.new-home-2.dj-course   max-width 1380 → 768 → 600, px 30,
 *                              a ≤479 px 0 e padding-bottom 0
 *   .section-title…dj-course   gap 30 (20 a ≤479), padding-bottom 40
 *   .section-title-heading.p4  56px peso 300 → 50 (≤991) → 45 (≤767) → 32 (≤479)
 */

export type ProprietaTitoloTuoDocente = {
  /** La prima parola, leggera: "Your". */
  readonly titoloPrima: string;
  /** `span.text-span-105`, peso 600: " Teacher." (con lo spazio davanti). */
  readonly titoloEvidenziato: string;
  /** La seconda riga, di nuovo leggera: "A pioneer. A legend.". */
  readonly titoloDopo: string;
};

export function TitoloTuoDocente({
  titoloPrima,
  titoloEvidenziato,
  titoloDopo,
}: ProprietaTitoloTuoDocente) {
  return (
    <section className="block overflow-hidden bg-sfondo pb-0 pt-[60px] max-sm:pt-[50px]">
      {/* `.container.new-home-2.dj-course` */}
      <div className="mx-auto flex w-auto max-w-sito flex-col items-center justify-end bg-sfondo px-[30px] max-lg:max-w-[768px] max-md:max-w-[600px] max-sm:px-0 max-sm:pb-0">
        {/* `.feature-tabs-wrapper.slider-container` */}
        <div className="mx-auto flex flex-col items-center justify-center gap-16 text-center max-lg:w-[70%] max-md:w-full">
          {/* `.section-title.new-home-2.dj-course` (`data-w-id` 378b05ab…) */}
          <RivelaAllaVista className="flex flex-col items-center gap-[30px] pb-10 text-center max-sm:gap-5">
            <h2 className="m-0 text-center text-[56px] font-light leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:text-[32px]">
              <span>{titoloPrima}</span>
              {/* `font-semibold` esplicito: `.text-span-105` è `font-weight:
                  600`, e in un titolo di peso 300 il `bolder` della preflight
                  di Tailwind varrebbe 400. Il `<br>` sta DENTRO lo span, come
                  nell'HTML. */}
              <span className="font-semibold">
                {titoloEvidenziato}
                <br />
              </span>
              {titoloDopo}
            </h2>
          </RivelaAllaVista>
        </div>
      </div>
    </section>
  );
}
