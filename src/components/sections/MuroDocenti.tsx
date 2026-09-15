import Image from "next/image";
import type { ImmagineMuro } from "@/testi/home";

/*
 * Il muro di immagini della hero della home: `div.hero-images.desktop` più le
 * due strisce `div.hero-images.mobile.new-home-2`.
 *
 * 41 immagini sul desktop (3 colonne da 14, 13 e 14) e 28 sul telefono (2
 * strisce da 14). Con il logo Ableton della colonna di sinistra sono le 70
 * immagini della hero.
 *
 * ── Misure, dal foglio Webflow ────────────────────────────────────────
 *   .hero-images        perspective 2000, align-items flex-end, width 100%,
 *                       max-width 810, max-height 810, overflow hidden;
 *                       a ≤767 height 75vh e raggio 20; a ≤479 height 35vh e
 *                       max-height 690. `.desktop` sparisce a ≤479, `.mobile`
 *                       esiste solo lì (height auto, larga il 150%).
 *   .third-divider      width 33%, height 100vh; solo `._2` è flex con
 *                       align-items flex-end; `._1.mobile` è flex, largo 100%,
 *                       alto auto, gap 16.
 *   .scroll-div         niente sul desktop; a ≤479 `.up` è flex centrato con
 *                       overflow visible, `.left` è row-reverse, `.right` flex.
 *   .hero-image         padding 7, preserve-3d, rotateY(-13deg); 70vw a ≤479.
 *   .card.updown-slider object-fit fill, preserve-3d, rotateY(-4deg), raggio 18;
 *                       width 100% a ≤479.
 *
 * ── PERCHÉ NELLO SCREENSHOT SI VEDE UNA COLONNA SOLA ──────────────────
 * Non è un errore da correggere: è la conseguenza di due cose che stanno
 * entrambe nel CSS del sito.
 *   1. `.third-divider` è alto `100vh`, e `screenshot-riferimento.mjs`
 *      allarga la viewport all'altezza dell'intera pagina prima di scattare:
 *      `100vh` vale 12.287 px, non 900.
 *   2. `.hero-images` è alto al massimo 810 px, con `overflow: hidden` e
 *      `align-items: flex-end`: delle colonne si vedono solo gli ultimi
 *      810 px.
 * Le colonne `_1` e `_3` sono blocchi (contenuto in cima, fuori dalla
 * finestra), la `_2` è flex con `align-items: flex-end` (contenuto in fondo,
 * dentro la finestra). Lo screenshot del build locale, scattato con la stessa
 * procedura, subisce lo stesso taglio: non c'è niente da compensare.
 *
 * ⚠️ Nel riferimento l'ultima foto visibile della colonna `_2` è `12-min`
 * (Carl Cox) e non `22.png`, che nel DOM le sta sotto: al momento dello scatto
 * l'interazione Webflow dello `scroll-div` aveva lasciato uno scostamento
 * residuo. Qui non è riprodotta (non è nel CSS scaricato, e il box resta alto
 * 810 px in ogni caso): la pagina non cambia altezza, cambia quale foto si
 * vede in fondo. Segnalata fra le divergenze.
 */

const COLONNA = "h-screen w-[33%]";

/* `.hero-image` */
const CORNICE =
  "p-[7px] [transform-style:preserve-3d] [transform:rotateX(0)_rotateY(-13deg)_rotateZ(0)] max-sm:w-[70vw] max-sm:shrink-0";

/* `img.card.updown-slider` */
const FOTO =
  "h-auto w-auto max-w-full rounded-[18px] object-fill [transform-style:preserve-3d] [transform:rotateX(0)_rotateY(-4deg)_rotateZ(0)] max-sm:w-full";

function Foto({ immagine }: { readonly immagine: ImmagineMuro }) {
  return (
    <div className={CORNICE}>
      <Image
        src={immagine.src}
        alt={immagine.alt}
        width={immagine.larghezza}
        height={immagine.altezza}
        /* `loading="lazy"` su tutte e 69, come nell'HTML. */
        loading="lazy"
        /* ⚠️ `540px` e non la larghezza vera del riquadro (~220px), ed è una
           misura di layout, non di peso. `.hero-images` è `width: 100%` dentro
           un contenitore che si dimensiona sul contenuto: la sua larghezza
           nasce dalla larghezza *intrinseca* delle foto. Con un `sizes` piccolo
           il browser sceglie una sorgente da 256w, l'intrinseca crolla a 250px
           e il muro esce 714px invece di 740, cioè la colonna di foto si
           restringe di 17px rispetto al sito. Con `540px` l'intrinseca torna
           quella dei file originali (540×540), che è quello che serve il sito. */
        sizes="(max-width: 479px) 70vw, 540px"
        className={FOTO}
      />
    </div>
  );
}

function Colonna({
  immagini,
  className,
  classeScroll,
}: {
  readonly immagini: readonly ImmagineMuro[];
  readonly className: string;
  readonly classeScroll?: string;
}) {
  return (
    <div className={className}>
      <div className={classeScroll}>
        {/* Le colonne ripetono lo stesso file più volte (`22.png` due volte
            nella `_2`): la chiave porta anche la posizione. */}
        {immagini.map((immagine, i) => (
          <Foto key={`${immagine.src}-${i}`} immagine={immagine} />
        ))}
      </div>
    </div>
  );
}

type ProprietaMuroDocenti = {
  readonly colonna1: readonly ImmagineMuro[];
  readonly colonna2: readonly ImmagineMuro[];
  readonly colonna3: readonly ImmagineMuro[];
  readonly mobileAlto: readonly ImmagineMuro[];
  readonly mobileBasso: readonly ImmagineMuro[];
};

export function MuroDocenti({
  colonna1,
  colonna2,
  colonna3,
  mobileAlto,
  mobileBasso,
}: ProprietaMuroDocenti) {
  return (
    <>
      {/* `.hero-images.desktop`.
          `min-w-0`: senza, il blocco non si restringe e la hero esce dal
          contenitore. Sul sito lo stesso risultato arriva dal fatto che le
          colonne hanno larghezza in percentuale, quindi non fanno da
          larghezza minima. */}
      <div className="flex max-h-[810px] w-full min-w-0 max-w-[810px] items-end overflow-hidden [perspective:2000px] max-md:h-[75vh] max-md:rounded-[20px] max-sm:hidden max-sm:h-[35vh] max-sm:max-h-[690px]">
        <Colonna immagini={colonna1} className={COLONNA} />
        {/* `.third-divider._2`: l'unica che è flex, e con il contenuto in
            fondo. È il motivo per cui è l'unica visibile nello screenshot. */}
        <Colonna immagini={colonna2} className={`${COLONNA} flex items-end`} />
        <Colonna immagini={colonna3} className={COLONNA} />
      </div>

      {/* `.hero-images.mobile.new-home-2`: larga il 150%, scorre in
          `row-reverse`. Esiste solo sotto i 480px. */}
      <div className="hidden max-h-[810px] w-[150%] max-w-[810px] overflow-hidden [perspective:2000px] max-sm:block">
        <Colonna
          immagini={mobileAlto}
          className="flex h-auto w-full gap-4"
          classeScroll="flex flex-row-reverse"
        />
      </div>

      {/* `.hero-images.mobile.new-home-2.bottom`: stessa larghezza, contenuto
          centrato (`.scroll-div.up.right`). */}
      <div className="hidden max-h-[810px] w-[150%] max-w-[810px] overflow-hidden [perspective:2000px] max-sm:block">
        <Colonna
          immagini={mobileBasso}
          className="flex h-auto w-full gap-4"
          classeScroll="flex items-center justify-center overflow-visible"
        />
      </div>
    </>
  );
}
