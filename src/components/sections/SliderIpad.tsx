import Image from "next/image";
import { SliderWebflow } from "@/components/ui/SliderWebflow";

/*
 * Il carosello dei tre passi del Reverse Funnel 2.0®:
 * `div#sliderId.slider-79.new-home-3.teachers.warmup-landing.how-it-works.ipad-slide.w-slider`.
 * Sezione che esiste solo su `/mix-mastering-course`.
 *
 * ── Perché non si riusa `SliderCorsi` né `RelatedCourses` ─────────────
 * Quelli montano una card con un link; qui ogni slide è un blocco
 * `.slidecontent…noborder-box` con dentro un'immagine, un titolo in grassetto
 * allineato a sinistra e un paragrafo. Cambia il contenuto, non il
 * meccanismo: lo slider resta `SliderWebflow`.
 *
 * ── Misure (foglio Webflow, viste sul sito a 1440 e 390) ──────────────
 *   .slider-79…how-it-works   larghezza 100%, padding 25px 50px, fondo
 *                             --neutral-03, `justify-content: center`;
 *                             a ≤991 e ≤767 `flex-start`; a ≤479
 *                             padding-top 20, padding-bottom 0, overflow hidden
 *   .mask-4.new-home-3        width auto (si dimensiona sulle tre slide),
 *                             100% a ≤479
 *   .slide-8.new-home-3       350px; 100% a ≤479
 *   .slidecontent…noborder-box  colonna, margini laterali 20, padding 10,
 *                             raggio 12, nessun bordo; a ≤479 raggio 25,
 *                             padding 20, larghezza 100%, margine sinistro auto
 *   .image-42                 raggio 20 (25 e `object-fit: contain` a ≤479)
 *   p.paragraph…testo-left    18px peso 700 (600 a ≤479), allineato a
 *                             sinistra, padding-top 10
 *   p.cta-p._w-520…opportunities-section  16px (15 a ≤479) peso 300,
 *                             sinistra, padding-bottom 0, opacità .75 (1 a ≤479)
 *   frecce `.desk-invisible`  si vedono solo da 991px in giù
 *   pallini `.slide-nav-9.new-home-3`  `display: none` ovunque
 *
 * Sul desktop le tre slide stanno tutte nella maschera (3 × 350 = 1050) e non
 * c'è niente da scorrere: è per questo che sul sito le frecce lì non servono.
 */

/** `.slide-8.new-home-3`: la larghezza di una slide sul desktop. */
const LARGHEZZA_SLIDE = 350;
/** `padding: 25px 50px` di `.slider-79`, che sta fuori dalla maschera. */
const PADDING_SLIDER = 100;

export type SlideIpad = {
  readonly immagine: {
    readonly src: string;
    readonly alt: string;
    readonly larghezza: number;
    readonly altezza: number;
  };
  readonly titolo: string;
  readonly testo: string;
};

export type ProprietaSliderIpad = {
  readonly slide: readonly SlideIpad[];
};

export function SliderIpad({ slide }: ProprietaSliderIpad) {
  return (
    /* Il blocco è di primo livello nel `body` del sito, a tutta larghezza, e
       il suo `justify-content: center` centra la maschera. Qui lo stesso
       risultato con un contenitore centrato largo quanto maschera + padding:
       la larghezza dipende dal numero di slide, quindi sta in uno `style` e
       non in una classe. */
    <div className="w-full bg-sfondo">
      <div
        className="mx-auto w-full"
        style={{ maxWidth: LARGHEZZA_SLIDE * slide.length + PADDING_SLIDER }}
      >
        <SliderWebflow
          etichetta="Reverse Funnel steps"
          perVista={{ desktop: slide.length, mobile: 1 }}
          pallini={false}
          /* `.left-arrow-3…desk-invisible` e `.right-arrow-2…desk-invisible`:
             compaiono solo da 991px in giù. */
          classeFrecce="hidden max-lg:flex"
          className="flex h-full w-full items-center justify-center bg-sfondo px-[50px] py-[25px] max-sm:overflow-hidden max-sm:pb-0 max-sm:pt-5"
          classeMask="w-full"
          slide={slide.map((s) => (
            <SlideContenuto key={s.immagine.src} slide={s} />
          ))}
        />
      </div>
    </div>
  );
}

/* `.slidecontent.new-home-2.opportunities-section.noborder-box` */
function SlideContenuto({ slide }: { readonly slide: SlideIpad }) {
  return (
    /* Sotto i 480px `.slidecontent.new-home-2.opportunities-section` torna
       `display: block` (non flex): l'immagine ridiventa in linea e la riga che
       la contiene porta con sé lo spazio sotto la linea di base. Sono gli 8px
       che separano questa slide da quella del sito. */
    <div className="relative mx-5 flex h-full min-w-[200px] flex-1 flex-col overflow-visible rounded-[12px] border-0 p-[10px] text-center max-sm:ml-auto max-sm:mr-0 max-sm:block max-sm:min-w-0 max-sm:rounded-media max-sm:p-5">
      <Image
        src={slide.immagine.src}
        alt={slide.immagine.alt}
        width={slide.immagine.larghezza}
        height={slide.immagine.altezza}
        sizes="(max-width: 479px) 100vw, 350px"
        className="h-auto max-w-full rounded-[20px] max-sm:rounded-media max-sm:object-contain"
      />

      {/* `p.paragraph.home-trustpilot.new-home-2.testo-left`: il peso è sulla
          classe (700, 600 sotto i 480), non sullo `<strong>`; l'esplicito
          serve perché il `bolder` della preflight, dentro un paragrafo già a
          700, salirebbe a 900. */}
      <p className="m-0 overflow-hidden pt-[10px] text-left text-[18px] font-bold text-bianco max-sm:font-semibold">
        <strong style={{ fontWeight: "inherit" }}>{slide.titolo}</strong>
      </p>

      {/* `p.cta-p._w-520.new-home-2.opportunities-section`: `._w-520` è
          `width: 100%; max-width: 520px` (qui la slide è più stretta, quindi
          il limite non morde, ma la classe c'è). */}
      <p className="m-0 w-full max-w-[520px] pb-0 text-left text-base font-light leading-[180%] tracking-[-0.4px] text-bianco opacity-75 max-sm:text-[15px] max-sm:opacity-100">
        {slide.testo}
        <br />
      </p>
    </div>
  );
}
