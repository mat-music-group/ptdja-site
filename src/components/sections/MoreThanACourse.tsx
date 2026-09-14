import Image from "next/image";
import { SliderWebflow } from "@/components/ui/SliderWebflow";
import { MORE_THAN_A_COURSE } from "@/testi/condivisi";

/*
 * La CTA "More Than a Course, Everything You Need is Here":
 * `section.feature-cta-section-3.new-home-2.features.molto-piu`,
 * su home, dj-course e producer-course.
 *
 * Verificata su `/dj-course` il 2026-09-15 contro lo screenshot di riferimento
 * e contro il DOM del sito live (la nota "MAI CONFRONTATA CON UNO SCREENSHOT"
 * che stava qui non vale più).
 *
 * ── Struttura, che non è quella che sembra ────────────────────────────
 * Dentro il riquadro nero (`.cloneable-container-default.center`) ci sono
 * QUATTRO figli fratelli, non due annidati:
 *   1. `.feature-cta-content-button` → il titolo;
 *   2. `.container-default._100…black-box` → la griglia delle sei voci, che il
 *      foglio tiene a `display: none` e riaccende solo sotto i 480px (sul
 *      desktop questo blocco è alto zero e non si vede);
 *   3. lo slider `.only-desk` con i cinque PNG grandi;
 *   4. lo slider `.only-mobile` con i cinque PNG del telefono, spento sopra i
 *      480px.
 * Il `gap: 30px` del riquadro vale fra i figli VISIBILI: sul desktop sono tre
 * (il secondo è alto zero ma resta nel flusso), quindi due spazi da 30px.
 *
 * ── Due cose che sembrano errori e non lo sono ────────────────────────
 * 1. Le didascalie verdi sotto le immagini ("Complete Courses Library", "Live
 *    Sessions & Mentoring") NON sono testo: sono disegnate dentro i PNG. Non
 *    vanno riscritte.
 * 2. La griglia ha, nel foglio, due regole di bordo in conflitto: una da 4px
 *    color corallo e una da 0. Vince `.senzalinea`, che è più specifica: il
 *    bordo non si vede, e infatti misurando il sito la griglia è alta 302px
 *    esatti senza gli 8px dei bordi.
 *
 * ── Misure (sito live, 1440 e 390) ────────────────────────────────────
 *   sezione            padding-top 120 → 50 e 20px di lato sotto i 480
 *   riquadro nero      padding 35px 30px (15px di lato sotto i 480), gap 30
 *                      (20 sotto i 480), raggio 25, sfondo nero più la trama
 *                      `GEOMETRICS-FOURTEEN-02.png` (…-06 sotto i 480)
 *   titolo             56px peso 400 interlinea 125%, max-width 710
 *   slider desktop     padding 25px 50px, maschera 1160, slide 600
 *   slider mobile      padding 20px 30px 0, maschera 260, slide 260
 */

/** `.slide-8.new-home-3.grandezza-slider`: 600px sul desktop. */
const SLIDE_DESKTOP = 600;
/** Maschera misurata sul sito a 1440: 1260 di riquadro meno i 100 di padding. */
const MASCHERA_DESKTOP = 1160;

export function MoreThanACourse() {
  return (
    <section className="overflow-hidden bg-sfondo pt-sezione max-lg:pt-20 max-md:pt-[60px] max-sm:px-5 max-sm:pt-[50px]">
      {/* `.container` */}
      <div className="mx-auto flex w-auto max-w-sito flex-col items-center justify-end bg-sfondo px-[30px] max-sm:overflow-clip max-sm:px-0 max-sm:pb-[10px]">
        {/* `.cloneable-container-default.center.new-home-2.space-black.max-width` */}
        <div className="flex w-full flex-col items-center gap-[30px] overflow-hidden rounded-media bg-nero bg-[url('/webflow/shared/geometrics-fourteen-02.png')] bg-auto bg-[position:50%_100%] bg-no-repeat px-[30px] py-[35px] max-sm:mt-[15px] max-sm:gap-5 max-sm:bg-[url('/webflow/shared/geometrics-fourteen-06.png')] max-sm:bg-[position:0_0] max-sm:px-[15px]">
          {/* `.feature-cta-content-button` → `.cta-content` → il titolo. */}
          <div className="flex flex-col items-center gap-16 px-5 text-center max-lg:gap-10 max-md:gap-[30px] max-sm:px-[17px]">
            <div className="flex flex-col items-center justify-center gap-4 max-sm:w-full">
              <h2 className="m-0 max-w-[710px] text-[56px] font-normal leading-[125%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[36px] max-sm:w-full max-sm:max-w-full max-sm:text-center max-sm:text-[34px] max-sm:font-light">
                <span className="text-mint">
                  {MORE_THAN_A_COURSE.titoloEvidenziato}
                </span>
                <br />
                {MORE_THAN_A_COURSE.titoloPrima}
                {/* `.text-span-228`: peso 600 sopra i 480, 400 sotto. Lo
                    `<strong>` dentro resta a 700 in ogni caso, quindi sul
                    telefono "is Here" è in grassetto e il punto no. */}
                <span className="font-semibold max-sm:font-normal">
                  {" "}
                  <strong className="font-bold">
                    {MORE_THAN_A_COURSE.titoloGrassetto}
                  </strong>
                  {MORE_THAN_A_COURSE.titoloDopo}
                </span>
                <br />
              </h2>
            </div>
          </div>

          {/* `.container-default._100.new-home-2.black-box` con dentro la
              griglia: `display: none` sopra i 479px, quindi sul desktop è un
              blocco alto zero. */}
          {/* `w-auto` e non `w-full`: sul sito questo blocco è un elemento
              flex in una colonna con `align-items: center`, quindi si
              restringe al contenuto — 270px sul telefono, 120px sul desktop
              dove la griglia è spenta. Con `w-full` la griglia partirebbe
              25px più a sinistra del sito. */}
          <div className="mx-auto w-auto max-w-sito bg-sfondo px-[60px] max-sm:max-w-[620px] max-sm:px-0">
            {/* `.grid-two-columns` a ≤479: una colonna, `justify-items:
                start`, quindi ogni riga è larga quanto il suo contenuto. */}
            <div className="hidden grid-cols-1 justify-items-start gap-x-[99px] gap-y-5 rounded-t-[15px] border-0 border-solid px-[10px] py-5 max-sm:grid">
              {MORE_THAN_A_COURSE.voci.map((voce) => (
                <div
                  key={voce.testo}
                  className="relative flex items-center justify-center"
                >
                  <Image
                    src={voce.icona}
                    alt=""
                    width={25}
                    height={25}
                    className="h-[25px] w-[25px] flex-none"
                  />
                  {/* `p.content-list-item-text-5.new-home-2.right` con
                      `strong.bold-text.new-home-2.black-box` (10px a sinistra). */}
                  <p className="m-0 text-left text-base font-normal leading-[180%] tracking-[-0.4px] text-bianco max-sm:text-[15px]">
                    {/* `.bold-text.new-home-2.black-box`: si chiama "bold" ma
                        sotto i 480px il foglio la porta a `font-weight: 300` e
                        a 5px di margine a sinistra. Sul sito quel testo NON è
                        in grassetto: verificato sul DOM live. */}
                    <strong className="ml-[10px] font-light max-sm:ml-[5px]">
                      {voce.testo}
                    </strong>
                  </p>
                  {/* `div.text-201.bold`: la "i" in una pillola mint, corsiva.
                      Sotto i 480px scende a 10px con `padding: 0 9px 0 7px` e
                      6px di margine a sinistra. Il fumetto che l'accompagna
                      (`.tooltip-float-v3`) è `display: none` nel foglio e lo
                      apriva Flowbase, che questo repo non installa: il testo
                      resta nel `title` nativo, identico parola per parola. */}
                  <span
                    title={voce.tooltip}
                    aria-label={voce.tooltip}
                    role="note"
                    tabIndex={0}
                    className="ml-[6px] cursor-pointer rounded-[999px] border border-mint py-0 pl-[7px] pr-[9px] text-[10px] font-bold italic leading-[20px] text-mint"
                  >
                    i
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* `.slider-79…more-than-course.only-desk.trasparnza-slider` */}
          <SliderWebflow
            etichetta="More than a course"
            perVista={{ desktop: MASCHERA_DESKTOP / SLIDE_DESKTOP, tablet: 1 }}
            pallini={false}
            className="flex w-full items-center justify-start bg-transparent px-[50px] py-[25px] max-sm:hidden"
            classeMask="w-full"
            classeSlide="px-5"
            slide={MORE_THAN_A_COURSE.slideDesktop.map((s) => (
              <Image
                key={s.src}
                src={s.src}
                alt={s.alt}
                width={563}
                height={431}
                className="h-auto w-full rounded-[20px]"
                sizes="100vw"
              />
            ))}
          />

          {/* `.slider-79…more-than-course.only-mobile.trasparenza-slider` */}
          <SliderWebflow
            etichetta="More than a course"
            perVista={{ desktop: 1 }}
            pallini={false}
            className="hidden w-full items-center justify-center bg-transparent px-[30px] pb-0 pt-5 max-sm:flex"
            classeMask="w-full"
            classeSlide=""
            slide={MORE_THAN_A_COURSE.slideMobile.map((s) => (
              <Image
                key={s.src}
                src={s.src}
                alt={s.alt}
                width={411}
                height={771}
                className="h-auto w-full rounded-media object-contain"
              />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
