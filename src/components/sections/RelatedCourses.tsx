import {
  CardCorso,
  type CorsoInVetrina,
} from "@/components/sections/SliderCorsi";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";
import { SliderWebflow } from "@/components/ui/SliderWebflow";

/*
 * "Related Courses": il titolo (`section.feature-section…`) più il carosello
 * delle altre due pagine corso (`div.introduction-content…slider-block`).
 *
 * Sul sito sono due blocchi di primo livello distinti, uno dopo l'altro: qui
 * stanno in un componente solo perché non ha senso montarne uno senza l'altro.
 *
 * ── Perché non si riusa `SliderCorsi` così com'è ──────────────────────
 * `SliderCorsi` è tarato sui TRE corsi della home e di `/play-get-signed`:
 * maschera da 1050px (3 × 350) e tre slide per vista. Qui i corsi correlati
 * sono due, e sul sito la maschera è larga 700px — `width: auto` su `.mask-4`,
 * che si dimensiona sulle due slide da 350, dentro uno slider
 * `justify-content: center`; misurata 700px sul sito live a 1440.
 * Riusare `SliderCorsi` lascerebbe 350px vuoti a destra e sposterebbe le due
 * card di 175px a sinistra. Quindi qui si riusa la card (`CardCorso`,
 * esportata da `SliderCorsi`) dentro lo stesso `SliderWebflow`, con la
 * larghezza calcolata sul numero di corsi. Nessuno dei due componenti
 * condivisi viene toccato.
 *
 * ── Misure (sito live, 1440) ──────────────────────────────────────────
 *   sezione del titolo   padding-top 120; `.section-title…related-course`
 *                        ha 40px sotto; titolo 56px peso 300 con "Related"
 *                        in `span.text-span-96` a peso 600
 *   contenitore slider   padding-top 30
 *   .slider-79           padding 25px 50px, `justify-content: center`
 *   .slide-8.new-home-3  350px
 *   .image-42            larghezza naturale limitata dal contenitore, raggio 20
 *   frecce               `.desk-invisible`: si vedono solo fino a 991px
 */

/** Larghezza di una slide sul sito, da `.slide-8.new-home-3`. */
const LARGHEZZA_SLIDE = 350;
/** `padding: 25px 50px` di `.slider-79`, che sta fuori dalla maschera. */
const PADDING_SLIDER = 100;

export type ProprietaRelatedCourses = {
  readonly titoloEvidenziato: string;
  readonly titoloResto: string;
  readonly corsi: readonly CorsoInVetrina[];
};

export function RelatedCourses({
  titoloEvidenziato,
  titoloResto,
  corsi,
}: ProprietaRelatedCourses) {
  return (
    <>
      <section className="block bg-sfondo pb-0 pt-sezione max-lg:pt-20 max-md:pt-[60px] max-sm:px-[30px] max-sm:pt-[50px] max-sm:text-center">
        {/* `.container` → `.feature-tabs-wrapper-2…` → `.feature-wrapper…` */}
        <div className="mx-auto flex w-auto max-w-sito flex-col items-center justify-end bg-sfondo px-[30px] max-sm:px-0 max-sm:pb-[10px]">
          <div className="flex w-full flex-col items-center justify-center max-lg:mx-auto max-lg:w-[70%] max-md:w-full">
            <div className="mx-auto flex flex-col items-center max-lg:w-[70%] max-md:w-full max-sm:gap-10">
              {/* `.section-title.new-home-2.related-course` azzera il
                  `padding-bottom` sotto i 480px: senza, la sezione del titolo
                  viene 40px più alta del sito. */}
              <RivelaAllaVista className="flex flex-col items-center gap-[30px] pb-10 text-center max-sm:gap-5 max-sm:pb-0">
                <h2 className="m-0 text-center text-[56px] font-light leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:text-[32px]">
                  <span className="font-semibold">{titoloEvidenziato}</span>
                  {titoloResto}
                </h2>
              </RivelaAllaVista>
            </div>
          </div>
        </div>
      </section>

      {/* `.introduction-content.homepage.new-home-2.teachers.slider-block.dj-course` */}
      <div className="flex w-full flex-col items-center justify-between overflow-hidden bg-sfondo pt-[30px] leading-[170%] max-sm:gap-[30px] max-sm:pt-0">
        <div className="flex w-[90%] flex-col items-center justify-center gap-4 overflow-hidden max-sm:w-full max-sm:gap-0 2xl:max-w-sito">
          {/* La larghezza sta qui e non in una classe Tailwind perché dipende
              dal numero di corsi, che cambia da pagina a pagina. */}
          <div
            className="w-full"
            style={{ maxWidth: LARGHEZZA_SLIDE * corsi.length + PADDING_SLIDER }}
          >
            <SliderWebflow
              etichetta="Related courses"
              perVista={{ desktop: corsi.length, mobile: 1 }}
              pallini={false}
              /* `.left-arrow-3…desk-invisible`: le frecce compaiono solo da
                 991px in giù. */
              classeFrecce="hidden max-lg:flex"
              className="flex h-full w-full items-center justify-center bg-sfondo px-[50px] py-[25px] max-sm:overflow-hidden max-sm:pb-0 max-sm:pt-5"
              classeMask="w-full"
              /* Sotto i 480px la slide del sito è larga quanto la maschera
                 (i 5px sono margini che debordano): niente padding, o
                 l'immagine viene 10px più stretta e 19px più bassa. */
              classeSlide="px-5 max-sm:px-0"
              slide={corsi.map((corso) => (
                <CardCorso key={corso.href} corso={corso} />
              ))}
            />
          </div>
        </div>
      </div>
    </>
  );
}
