import Image from "next/image";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";

/*
 * "Lessons Highlights": `section#highlights.feature-section…lesson-highlights`.
 *
 * N blocchi uguali fra loro — tre su `/dj-course`, quattro su
 * `/producer-course` — ognuno con un riquadro di tre immagini a sinistra e
 * titolo più cinque voci a destra.
 *
 * ── Le due disposizioni delle immagini ────────────────────────────────
 * `disposizione: "sinistra"` è `.content-image-group.feature.gifs.original`:
 * riga, una immagine alta a sinistra (48% della larghezza) e due impilate a
 * destra (45%).
 * `disposizione: "destra"` è lo stesso gruppo SENZA `.original`: colonna, con
 * sopra una riga di due immagini (`.div-right-gifs.but-left`, 48%, con dentro
 * un'immagine al 60% e una al 140%, che deborda di proposito) e sotto
 * un'immagine a tutta larghezza (`.div-left-gifs.but-right`, 100%).
 * Le percentuali strane non sono un errore: `.image-22 { width: 140% }` è
 * proprio nel foglio, ed è quello che fa sporgere la seconda immagine.
 *
 * ── Misure (sito live, 1440) ──────────────────────────────────────────
 *   sezione              padding-top 64, niente sotto; 30px di lato sotto i 480
 *   .section-title       gap 30, padding-bottom 30
 *   .content-card-wrapper-3  colonna, gap 24
 *   .content-card-4      riga, gap 50, padding 72px 60px, raggio 24,
 *                        fondo --neutral-06; colonna con padding 30px 20px
 *                        sotto i 768 e il testo PRIMA delle immagini
 *                        (`order: -1` su `.content-text-block`)
 *   .div-block-5         40% (100% sotto i 480), fondo --neutral-03,
 *                        raggio 25, padding 20
 *   .content-text-block  gap 48 (20 sotto i 768), max-width 648
 *   .content-title-2     40px → 34 a ≤991 → 32 a ≤767 → 28 a ≤479
 *   .content-list        gap 12, icone 20×20
 *
 * La `<section class="section-4 left">` vuota prima del titolo non è un
 * refuso di ricostruzione: c'è nell'HTML, ha altezza zero
 * (`.section-4.left { padding-top: 0 }`) e serve solo a far esistere i 16px
 * di `gap` sopra il titolo. Toglierla alza il titolo di 16px.
 */

export type BloccoHighlight = {
  readonly titolo: string;
  readonly voci: readonly string[];
  readonly disposizione: "sinistra" | "destra";
  /*
   * Sotto i 480px il PRIMO blocco della pagina è più stretto degli altri: sul
   * sito porta due classi in più (`.new-home-2.dj-course` sulla card e
   * `.lesson-hifhlights` — con il refuso — sul blocco del titolo) che portano
   * il `gap` della card da 30 a 20px e quello fra titolo e sottotitolo da 16 a
   * 0. Vale 26px per blocco: senza, la sezione è 52px più bassa del sito.
   * È una proprietà del singolo blocco, non della pagina, quindi si dichiara
   * qui e non si deduce dall'indice.
   */
  readonly spaziatura?: "compatta" | "normale";
  readonly immagini: readonly {
    readonly src: string;
    readonly alt: string;
    readonly larghezza: number;
    readonly altezza: number;
  }[];
};

type Immagine = {
  readonly src: string;
  readonly alt: string;
  readonly larghezza: number;
  readonly altezza: number;
};

export type ProprietaLessonHighlights = {
  readonly id?: string;
  readonly titoloPrima: string;
  readonly titoloEvidenziato: string;
  readonly blocchi: readonly BloccoHighlight[];
  readonly iconaSpunta: Immagine;
};

export function LessonHighlights({
  id,
  titoloPrima,
  titoloEvidenziato,
  blocchi,
  iconaSpunta,
}: ProprietaLessonHighlights) {
  return (
    <section
      id={id}
      className="block bg-sfondo pb-0 pt-16 max-sm:px-[30px] max-sm:text-center"
    >
      {/* `.container` */}
      <div className="mx-auto flex w-auto max-w-sito flex-col items-center justify-end bg-sfondo px-[30px] max-sm:overflow-clip max-sm:px-0 max-sm:pb-[10px]">
        {/* `.section-title` */}
        <RivelaAllaVista className="flex flex-col items-center gap-[30px] pb-[30px] text-center max-lg:pb-[50px] max-md:pb-10 max-sm:gap-5 max-sm:pb-0">
          <h2 className="m-0 text-[56px] font-light leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:pb-5 max-sm:text-[32px]">
            {titoloPrima}
            <strong className="font-bold">{titoloEvidenziato}</strong>
            <br />
          </h2>
        </RivelaAllaVista>

        {/* `.content-card-wrapper-3.new-home-2` */}
        <div className="flex w-full flex-col gap-6">
          {blocchi.map((blocco) => (
            <CardHighlight
              key={blocco.titolo}
              blocco={blocco}
              iconaSpunta={iconaSpunta}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardHighlight({
  blocco,
  iconaSpunta,
}: {
  readonly blocco: BloccoHighlight;
  readonly iconaSpunta: Immagine;
}) {
  const [alta, primaPiccola, secondaPiccola] = blocco.immagini;
  const compatto = blocco.spaziatura === "compatta";

  return (
    /* `.content-card-4` */
    <div
      className={`flex items-center justify-between gap-[50px] rounded-[24px] bg-grigio-sfondo px-[60px] py-[72px] max-lg:mx-auto max-lg:max-w-[500px] max-lg:flex-col max-lg:gap-10 max-lg:p-[50px] max-lg:text-center max-md:px-5 max-md:py-[30px] ${
        compatto ? "max-sm:gap-5" : "max-sm:gap-[30px]"
      }`}
    >
      {/* `.div-block-5` */}
      <div className="flex w-[40%] max-w-none flex-row items-center justify-center rounded-media bg-sfondo p-5 max-sm:w-full">
        {blocco.disposizione === "sinistra" ? (
          /* `.content-image-group.feature.gifs.original` */
          <div className="flex w-full max-w-full flex-row items-start justify-center gap-5">
            <div className="w-[48%]">
              <Foto immagine={alta} className="w-full max-w-none rounded-media" />
            </div>
            <div className="flex w-[45%] flex-col gap-[15px]">
              <Foto immagine={primaPiccola} className="rounded-media" />
              <Foto
                immagine={secondaPiccola}
                className="w-auto max-w-full rounded-media"
              />
            </div>
          </div>
        ) : (
          /* `.content-image-group.feature.gifs` */
          <div className="flex w-full max-w-full flex-col items-start justify-center gap-5">
            {/* `.div-right-gifs.but-left` */}
            <div className="flex w-[48%] flex-row gap-[15px]">
              <Foto
                immagine={alta}
                className="w-[60%] max-w-[60%] rounded-media"
              />
              <Foto
                immagine={primaPiccola}
                className="w-[140%] max-w-none rounded-media"
              />
            </div>
            {/* `.div-left-gifs.but-right` */}
            <div className="w-full">
              <Foto immagine={secondaPiccola} className="rounded-media" />
            </div>
          </div>
        )}
      </div>

      {/* `.content-text-block.feature`: sotto i 992px passa PRIMA delle
          immagini (`order: -1`) e si centra. */}
      <div className="flex w-[60%] max-w-testo flex-col items-start justify-start gap-12 max-lg:order-first max-lg:max-w-full max-lg:items-center max-lg:gap-[30px] max-lg:text-center max-md:gap-5 max-sm:w-full">
        {/* `.content-area-list-content` */}
        <div className="flex flex-col items-start gap-7 max-lg:text-left max-md:items-center max-md:gap-5">
          {/* `.content-area-content` */}
          <div
            className={`flex flex-col gap-4 max-md:items-center ${
              compatto ? "max-sm:gap-0" : ""
            }`}
          >
            {/* `section.section-4.left`: vuota e alta zero, tiene il `gap`. */}
            <section className="flex gap-[10px] pt-0" />
            <h2 className="m-0 max-w-[475px] text-left text-[40px] font-medium leading-[130%] text-bianco max-lg:mx-auto max-lg:text-[34px] max-md:w-full max-md:max-w-full max-md:text-[32px] max-sm:text-center max-sm:text-[28px]">
              {blocco.titolo}
            </h2>
          </div>

          {/* `.content-list` */}
          <div className="flex flex-col gap-3">
            {blocco.voci.map((voce) => (
              <div key={voce} className="flex items-center gap-[7px]">
                <Image
                  src={iconaSpunta.src}
                  alt={iconaSpunta.alt}
                  width={iconaSpunta.larghezza}
                  height={iconaSpunta.altezza}
                  className="h-5 w-5 flex-none"
                />
                <p className="m-0 text-base font-normal leading-[180%] tracking-[-0.4px] text-bianco opacity-80 max-sm:text-left max-sm:text-[15px]">
                  {voce}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Foto({
  immagine,
  className = "",
}: {
  readonly immagine: Immagine;
  readonly className?: string;
}) {
  return (
    <Image
      src={immagine.src}
      alt={immagine.alt}
      width={immagine.larghezza}
      height={immagine.altezza}
      className={`h-auto ${className}`}
      unoptimized={immagine.src.endsWith(".gif")}
    />
  );
}
