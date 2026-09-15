import Image from "next/image";
import { SliderWebflow } from "@/components/ui/SliderWebflow";

/*
 * "Student Success Stories": la parete delle otto immagini degli studenti.
 *
 * Il titolo è parametrico perché il sito lo scrive in due modi diversi:
 * "Student / Success Stories" su `/play-get-signed` e "Student's / Success
 * Stories" sulla home. Non si sceglie quale è giusto: si passa quello della
 * pagina che si sta ricostruendo.
 *
 * Misure dal foglio Webflow:
 *   section  .feature-section.section-padding.remove-bottom-padding
 *            → padding-top 120 / 80 / 60 / 50, padding-bottom 0,
 *              padding-x 30 solo sotto i 480px
 *   div      .container.success-wall.new-home-2
 *            → max-width 1380 a OGNI breakpoint (`.container.new-home-2` batte
 *              le regole a una classe dentro le media), padding-x 30 → 0 a 479
 *   div      .feature-tabs-wrapper.slider-container.students-achievements
 *            → flex colonna, gap 4px → 20px a 479, width 100% → 70% a 991
 *   div      .section-title → padding-bottom 30 / 50 / 40 / 0, gap 30 → 20
 *   h2       .section-title-heading.new-home-2 → 56 / 50 / 45 / 32px, peso 300
 *   span     .text-span-102 → peso 600, nessun colore proprio
 *   slider   .slider-24.achievements-students → sfondo trasparente, altezza auto
 *   mask     .mask-3.talent-pool → padding-bottom 20px → 0 a 479
 *   slide    .slide.achievements-students → 25% + 10px di padding per lato,
 *            80% sotto i 480px
 *   img      .image-2.success-story → width 100%, max-width 424px, raggio 25px
 *   nav      .slide-nav-3 → padding-top 40px, nascosta sotto i 480px
 *
 * `data-hide-arrows="true"`: le frecce spariscono quando da quella parte non
 * c'è più niente, ed è per questo che nello screenshot di riferimento si vede
 * solo quella destra.
 */

export type ImmagineSuccesso = {
  readonly src: string;
  readonly alt: string;
  readonly larghezza: number;
  readonly altezza: number;
  /** `loading="eager"` nell'HTML: due immagini su otto ce l'hanno. */
  readonly priorita?: boolean;
};

type ProprietaSuccessStories = {
  /** Prima riga del titolo ("Student" qui, "Student's" sulla home). */
  readonly titoloPrima: string;
  /** Seconda riga, in grassetto (`span.text-span-102`). */
  readonly titoloEvidenziato: string;
  readonly immagini: readonly ImmagineSuccesso[];
  /**
   * `false` su `/play-get-signed`, dove sotto i 480px i 30px di aria in fondo
   * spariscono. Le due pagine non hanno le stesse classi: sulla home il
   * contenitore è `.container.success-wall` (10px sotto, da `.container`) e la
   * maschera `.mask-3` (20px sotto); su play-get-signed sono
   * `.container.success-wall.new-home-2` e `.mask-3.talent-pool`, che a ≤479
   * portano tutti e due i padding a 0. Default `true`, cioè la home.
   */
  readonly spaziSottoMobile?: boolean;
};

export function SuccessStories({
  titoloPrima,
  titoloEvidenziato,
  immagini,
  spaziSottoMobile = true,
}: ProprietaSuccessStories) {
  return (
    <section className="bg-sfondo pt-sezione max-lg:pt-20 max-md:pt-[60px] max-sm:px-[30px] max-sm:pt-[50px] max-sm:text-center">
      {/* `.container` a ≤479 aggiunge `padding-bottom: 10px`, che
          `.container.success-wall.new-home-2` riporta a 0. */}
      <div
        className={`mx-auto flex w-auto max-w-sito flex-col items-center justify-end bg-sfondo px-[30px] max-sm:px-0 ${
          spaziSottoMobile ? "max-sm:pb-[10px]" : ""
        }`}
      >
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-1 text-center max-lg:w-[70%] max-md:w-full max-sm:w-full max-sm:gap-5">
          <div className="flex flex-col items-center gap-[30px] pb-[30px] text-center max-lg:pb-[50px] max-md:pb-10 max-sm:gap-5 max-sm:pb-0">
            <h2 className="m-0 text-[56px] font-light leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:text-[32px]">
              {titoloPrima}
              <br />
              <span className="font-semibold">{titoloEvidenziato}</span>
              <br />
            </h2>
          </div>

          <SliderWebflow
            etichetta="Student success stories"
            perVista={{ desktop: 4, mobile: 1.25 }}
            nascondiFrecceAiBordi
            spaziaturaPallini={4}
            paddingPallini={40}
            classePallini="max-sm:hidden"
            className="w-full bg-transparent"
            /* `.mask-3 { padding-bottom: 20px }` vale anche sotto i 480px:
               a riportarlo a 0 lì è `.mask-3.talent-pool`, che ce l'ha solo
               play-get-signed. */
            classeMask={spaziSottoMobile ? "pb-5" : "pb-5 max-sm:pb-0"}
            classeSlide="px-[10px] max-sm:px-[10px]"
            slide={immagini.map((immagine) => (
              <Image
                key={immagine.src}
                src={immagine.src}
                alt={immagine.alt}
                width={immagine.larghezza}
                height={immagine.altezza}
                priority={immagine.priorita}
                className="h-auto w-full max-w-[424px] rounded-media"
              />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
