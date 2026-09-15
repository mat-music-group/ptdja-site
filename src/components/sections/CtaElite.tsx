import Image from "next/image";
import { SliderWebflow } from "@/components/ui/SliderWebflow";

/*
 * "For Advanced Producers. Included in the ELITE plan.":
 * `section.feature-cta-section-2.new-home-2.features-tab`, solo su
 * `/mix-mastering-course`.
 *
 * ⚠️ NON è `MoreThanACourse`. Si somigliano — riquadro nero dentro un
 * contenitore, titolo, paragrafo, uno slider — ma sono due sezioni diverse del
 * foglio: là `.feature-cta-section-3…molto-piu` con la griglia delle sei voci
 * e due slider da cinque immagini, qui `.feature-cta-section-2…features-tab`
 * con un paragrafo e UNA sola immagine. Le classi, e quindi le misure, non
 * coincidono.
 *
 * ── Misure (foglio Webflow) ───────────────────────────────────────────
 *   sezione                      padding-top 120 → 80 (≤991) → 60 (≤767) →
 *                                50 (≤479), fondo #1e1e1e
 *   .container-35.new-home-2.dj-course  blocco, max-width 1380 → 768 → 600,
 *                                px 30; a ≤479 padding-bottom 0 e overflow clip
 *   .cloneable-container-default.center.new-home-2  colonna centrata, gap 30
 *                                (20 a ≤479), fondo NERO, raggio 25,
 *                                padding 35px 30px → 35px 15px a ≤479 con
 *                                margin-top 15
 *   .feature-cta-content-button  gap 64 → 40 (≤991) → 30 (≤767), px 20
 *                                (17 a ≤479), text-align center
 *   .cta-content                 gap 16, centrato; width 100% a ≤479
 *   .cta-title-4._w-600…black-title  56px peso 400 interlinea 125% →
 *                                50 (≤991) → 36 (≤767) → 34 peso 300 (≤479),
 *                                max-width 710 (100% a ≤479), padding-bottom 0
 *   .cta-p-8._w-520…dj-course    16px peso 300 opacità .75, allineato a
 *                                SINISTRA sopra i 480 e centrato sotto;
 *                                padding-bottom 14 → 30 a ≤479, opacità 1
 *   .slider-82…elite-img         padding 25px 50px, fondo nero, centrato;
 *                                a ≤479 padding 20px 30px 0
 *   .image-47                    raggio 20 (25 e `object-fit: contain` a ≤479)
 *
 * Lo slider ha una sola slide: niente frecce (`.desk-invisible` le toglie
 * comunque dal desktop e `.mix-mastering-course` anche da ≤479) e niente
 * pallini (`.slide-nav-12.new-home-3` è `display: none`).
 */

/** `.slide-8.new-home-3`: la larghezza dell'unica slide sul desktop. */
const LARGHEZZA_SLIDE = 350;
/** `padding: 25px 50px` di `.slider-82`, che sta fuori dalla maschera. */
const PADDING_SLIDER = 100;

export type ProprietaCtaElite = {
  readonly titoloPrima: string;
  readonly titoloEvidenziato: string;
  readonly paragrafo: string;
  readonly immagine: {
    readonly src: string;
    readonly alt: string;
    readonly larghezza: number;
    readonly altezza: number;
  };
};

export function CtaElite({
  titoloPrima,
  titoloEvidenziato,
  paragrafo,
  immagine,
}: ProprietaCtaElite) {
  return (
    <section className="block overflow-hidden bg-sfondo pt-sezione max-lg:pt-20 max-md:pt-[60px] max-sm:pt-[50px]">
      {/* `.container-35.new-home-2.dj-course.w-container`: blocco, non flex —
          il `flex-flow: row` del foglio è inerte senza `display: flex`. */}
      <div className="mx-auto block w-full max-w-sito px-[30px] max-lg:max-w-[768px] max-md:max-w-[600px] max-sm:overflow-clip max-sm:pb-0">
        {/* `.cloneable-container-default.center.new-home-2` */}
        <div className="flex flex-col items-center gap-[30px] overflow-hidden rounded-media bg-nero px-[30px] py-[35px] max-sm:mt-[15px] max-sm:gap-5 max-sm:px-[15px]">
          {/* `.feature-cta-content-button` */}
          <div className="flex flex-col items-center gap-16 px-5 text-center max-lg:gap-10 max-md:gap-[30px] max-sm:px-[17px]">
            {/* `.cta-content` */}
            <div className="flex flex-col items-center justify-center gap-4 max-sm:w-full">
              <h2 className="m-0 max-w-[710px] pb-0 text-[56px] font-normal leading-[125%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[36px] max-sm:w-full max-sm:max-w-full max-sm:text-center max-sm:text-[34px] max-sm:font-light">
                {titoloPrima}
                {/* Lo spazio è l'a capo che nell'HTML separa il testo dallo
                    `<strong>`: senza, il titolo esce su tre righe invece di
                    due, perché il browser non trova dove spezzare. */}
                {" "}
                {/* `font-bold` esplicito: in un titolo di peso 400 (300 sotto
                    i 480) il `bolder` della preflight non arriverebbe a 700. */}
                <strong className="font-bold">{titoloEvidenziato}</strong>
              </h2>

              {/* `p.cta-p-8._w-520.new-home-2.dj-course`: `._w-520` è
                  `width: 100%; max-width: 520px`, ed è quello che manda il
                  paragrafo su due righe come sul sito. Il corpo resta 16px
                  anche sotto i 480px: la regola a ≤479 che porta `.cta-p-8`
                  a 15px ha una classe sola e perde contro `.cta-p-8._w-520`,
                  che dichiara `font-size: 16px` nel blocco base. */}
              <p className="m-0 w-full max-w-[520px] pb-[14px] text-left text-base font-light leading-[180%] tracking-[-0.4px] text-bianco opacity-75 max-sm:pb-[30px] max-sm:text-center max-sm:opacity-100">
                {paragrafo}
                <br />
              </p>
            </div>
          </div>

          {/* `.slider-82.new-home-3.courses.more-than-course.elite-img`
              La maschera NON è larga quanto il riquadro: `.mask-4.new-home-3`
              è `width: auto` e si dimensiona sull'unica `.slide-8.new-home-3`,
              che è larga 350px. Con `justify-content: center` il gruppo resta
              in mezzo, e l'immagine viene 310px (350 meno i 20+20 di margine
              di `.slidecontent`), non 1120. Senza questo limite la sezione
              esce 787px più alta del sito. */}
          <div
            className="mx-auto w-full"
            style={{ maxWidth: LARGHEZZA_SLIDE + PADDING_SLIDER }}
          >
            <SliderWebflow
              etichetta="Elite plan"
              perVista={{ desktop: 1 }}
              pallini={false}
              className="flex w-full items-center justify-center bg-nero px-[50px] py-[25px] max-sm:px-[30px] max-sm:pb-0 max-sm:pt-5"
              classeMask="w-full"
              slide={[
                /* `.slidecontent.courses-slides` */
                <div
                  key={immagine.src}
                  className="relative mx-5 flex h-full min-w-[200px] flex-1 overflow-visible rounded-[12px] text-center max-sm:ml-auto max-sm:mr-0 max-sm:min-w-0 max-sm:flex-col max-sm:gap-[35px] max-sm:rounded-media"
                >
                  <Image
                    src={immagine.src}
                    alt={immagine.alt}
                    width={immagine.larghezza}
                    height={immagine.altezza}
                    sizes="(max-width: 479px) 100vw, 310px"
                    className="h-auto max-w-full rounded-[20px] max-sm:rounded-media max-sm:object-contain"
                  />
                </div>,
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
