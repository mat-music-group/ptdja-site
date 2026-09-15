import Image from "next/image";
import { SliderWebflow } from "@/components/ui/SliderWebflow";

/*
 * Il carosello dei docenti:
 * `div.introduction-content…teachers.slider-block.dj-course` con dentro
 * `div.slider-79.new-home-3.teachers`.
 *
 * Otto slide su `/dj-course`; la home ne ha undici e le altre due pagine corso
 * un numero diverso ancora: per questo le slide arrivano da fuori.
 *
 * ── Misure, prese sul sito live a 1440 e a 390 ────────────────────────
 *   contenitore              padding-top 30 (0 sotto i 480)
 *   .introduction-left-content.new-home-2   larghezza 90% (max 1380 da 1440)
 *   .slider-79…teachers      padding 25px 50px → 20px 50px 0 sotto i 480
 *   .mask-4.new-home-3       `width: auto`, quindi si restringe allo spazio
 *                            che resta: 1196px a 1440, 290px a 390
 *   .slide-8.new-home-3      350px fissi; 100% con 5px di margine sotto i 480
 *   .slidecontent            20px di margine per lato (0 sotto i 480)
 *   .image-42                dimensione naturale (295×556), raggio 20px
 *
 * ⚠️ DIVERGENZA DICHIARATA. Sul sito la slide è larga 350px fissi e la
 * maschera si adatta; `SliderWebflow` fa il contrario (maschera piena, slide
 * in percentuale). Per far combaciare il desktop la percentuale è scritta come
 * "quante slide da 350px stanno in 1196px", cioè 3,417. A 1440 il risultato è
 * identico al pixel; fra 992 e 1439 le slide vengono un po' più strette del
 * sito. Sotto i 992 si passa a una slide per volta, come sul sito.
 *
 * ⚠️ L'interazione Webflow su ogni slide (`data-w-id`) NON è un hover: è
 * `SLIDER_ACTIVE` / `SLIDER_INACTIVE` (azioni `a-336` / `a-337` dell'IX2),
 * che porta l'opacità della slide attiva a 1 e quella delle altre a 0,31 in
 * 500ms. Ha `useFirstGroupAsInitialState: false`, quindi al primo caricamento
 * non si applica a nessuna slide: la pagina appena aperta le mostra tutte
 * piene, ed è esattamente quello che si vede nello screenshot di riferimento.
 * Qui non è riprodotta: si accenderebbe solo dopo un clic sulle frecce, e
 * `SliderWebflow` non espone quale slide è "attiva". Segnalata fra le
 * divergenze.
 */

export type SlideDocente = {
  readonly src: string;
  readonly alt: string;
  readonly larghezza: number;
  readonly altezza: number;
};

type ProprietaSliderDocenti = {
  readonly slide: readonly SlideDocente[];
  /** Nome del carosello per screen reader e tastiera. */
  readonly etichetta?: string;
  /**
   * `true` dove sotto i 480px i 30px sopra restano. Nel foglio
   * `.introduction-content…slider-block { padding-top: 30px }` non ha nessuna
   * variante responsive: ad azzerarlo a ≤479 sono `.slider-block.dj-course` e
   * `.slider-block.warmup-landing`, cioè le pagine corso. Sulla home quelle
   * due classi non ci sono e i 30px restano. Default `false`, cioè il
   * comportamento delle pagine corso.
   */
  readonly paddingSopraSotto480?: boolean;
};

export function SliderDocenti({
  slide,
  etichetta = "Teachers",
  paddingSopraSotto480 = false,
}: ProprietaSliderDocenti) {
  return (
    /* `.introduction-content.homepage.new-home-2.teachers.slider-block.dj-course` */
    <div
      className={`flex w-full flex-col items-center justify-between overflow-hidden bg-sfondo pt-[30px] leading-[170%] max-sm:gap-[30px] ${
        paddingSopraSotto480 ? "" : "max-sm:pt-0"
      }`}
    >
      {/* `.introduction-left-content.new-home-2` */}
      <div className="flex w-[90%] flex-col items-center justify-center gap-4 overflow-hidden max-sm:w-full max-sm:gap-0 2xl:max-w-sito">
        <SliderWebflow
          etichetta={etichetta}
          perVista={{ desktop: 1196 / 350, tablet: 1 }}
          pallini={false}
          className="flex h-full w-full items-center justify-start bg-sfondo px-[50px] py-[25px] 2xl:justify-around max-sm:overflow-hidden max-sm:pb-0 max-sm:pt-5"
          classeMask="w-full"
          classeSlide="flex"
          slide={slide.map((docente) => (
            /* `.slidecontent`: 20px di margine per lato, raggio 12px. */
            <div
              key={docente.src}
              className="relative mx-5 flex h-full min-w-[200px] flex-1 justify-center rounded-[12px] text-center max-sm:mx-0 max-sm:min-w-0 max-sm:rounded-media"
            >
              <Image
                src={docente.src}
                alt={docente.alt}
                width={docente.larghezza}
                height={docente.altezza}
                className="h-auto w-auto max-w-full rounded-[20px] max-sm:rounded-media max-sm:object-contain"
              />
            </div>
          ))}
        />
      </div>
    </div>
  );
}
