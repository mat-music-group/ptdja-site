/*
 * "Take Our Virtual Tour": `section.feature-section…courses-to-reach.virtual-tour`.
 *
 * ⚠️ Su `/dj-course` questa sezione compare DUE VOLTE di fila, identica in
 * tutto tranne la destinazione della CTA: la prima porta al form su
 * `start.petetong-djacademy.com`, la seconda a un Typeform. È un doppione del
 * sito pubblicato, non un errore di ricostruzione: si riproduce e si segnala.
 * Anche l'occhiello cambia capitalizzazione fra le due copie ("VIRTUAL TOUR" e
 * "Virtual TOUR"): il CSS lo rende maiuscolo, quindi a schermo non si vede.
 *
 * ── Il video ──────────────────────────────────────────────────────────
 * È un iframe Wistia (`43vokrh7kh`) in autoplay muto, in loop, senza nessun
 * controllo, sfocato di 6px e senza eventi del puntatore: fa da sfondo, non da
 * player. Sopra ci stanno un velo nero al 45% e il contenuto centrato.
 * I parametri dell'URL sono copiati uno per uno dall'HTML: toglierne uno fa
 * ricomparire la barra di riproduzione.
 *
 * Il doppio contenitore (`div` con lo stile inline + `.ptvt-video`) è come
 * nell'HTML: il primo ritaglia, il secondo sfoca e deborda del 4% per non
 * lasciare vedere i bordi sfumati. L'iframe deborda di un altro 6%.
 *
 * ── Misure ────────────────────────────────────────────────────────────
 *   sezione       padding-top 120 (50 sotto i 480), niente sotto
 *   .ptvt-wrap    padding 40px 5%
 *   .ptvt-inner   max-width 1100
 *   .ptvt-media   rapporto 16:9 (`padding-bottom: 56.25%`), raggio 24
 *   .ptvt-cta     16px 34px e fondo #2ebf94 da 1280 in su; 5px 24px e fondo
 *                 --neutral-04 sotto i 480
 *   .ptvt-subtext 20px → 24px da 1280 → 16px sotto i 480
 */

export type ProprietaVirtualTour = {
  readonly eyebrow: string;
  readonly titoloRiga1: string;
  readonly titoloRiga2: string;
  readonly iframe: { readonly src: string; readonly titolo: string };
  readonly cta: string;
  /** Cambia fra la prima e la seconda copia della sezione. */
  readonly href: string;
  readonly sottotesto: string;
};

export function VirtualTour({
  eyebrow,
  titoloRiga1,
  titoloRiga2,
  iframe,
  cta,
  href,
  sottotesto,
}: ProprietaVirtualTour) {
  return (
    <section className="block overflow-hidden bg-sfondo pb-0 pt-sezione max-sm:px-[30px] max-sm:pt-[50px] max-sm:text-center">
      {/* `.container-5.new-home-2.most-complete-courses` */}
      <div className="mx-auto flex w-full max-w-sito flex-col items-start justify-start px-[30px] max-lg:max-w-[768px] max-md:max-w-[600px] max-sm:items-center max-sm:justify-center max-sm:overflow-clip max-sm:px-0">
        {/* `.feature-tabs-wrapper-2` */}
        <div className="flex w-full flex-col items-center justify-center max-lg:mx-auto max-lg:w-[70%] max-md:w-full">
          {/* `.section-title.reach-goal.course-home` */}
          <div className="flex flex-col items-center gap-[30px] pb-[30px] text-center max-sm:gap-5 max-sm:px-[30px] max-sm:pb-0">
            {/* Sotto i 480px il foglio toglie il maiuscolo forzato e mette
                5px di spazio sotto: è il motivo per cui sul telefono la
                seconda copia si legge "Virtual TOUR" e non "VIRTUAL TOUR". */}
            {/* `letter-spacing: 0`: i 3px di `.section-subtitle` li azzera
                `.negative.new-home-2`, che è più specifica. */}
            <p className="mt-0 pb-0 text-center text-base font-light uppercase leading-[180%] tracking-normal text-bianco opacity-70 max-sm:pb-[5px] max-sm:normal-case">
              {eyebrow}
            </p>
            <h2 className="m-0 text-center text-[56px] font-light leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:text-[32px]">
              {titoloRiga1}
              <br />
              {/* `font-bold` esplicito: in un titolo di peso 300 il `bolder`
                  della preflight di Tailwind vale 400 e lo `<strong>` del
                  sito, che è 700, uscirebbe magro. */}
              <strong className="font-bold">{titoloRiga2}</strong>
            </h2>
          </div>
        </div>
      </div>

      {/* `.ptvt-wrap` */}
      <div className="box-border flex w-full justify-center px-[5%] py-10">
        {/* `.ptvt-inner` */}
        <div className="relative w-full max-w-[1100px]">
          {/* `.ptvt-media`: rapporto 16:9 tenuto dal padding, come sul sito. */}
          <div className="relative h-0 w-full overflow-hidden rounded-[24px] pb-[56.25%]">
            {/* `.ptvt-video` + il `div` con lo stile inline dell'embed. */}
            <div className="pointer-events-none absolute left-[-2%] top-[-2%] h-[104%] w-[104%] border-0 blur-[6px]">
              <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
                <iframe
                  src={iframe.src}
                  title={iframe.titolo}
                  allow="autoplay; fullscreen"
                  scrolling="no"
                  className="pointer-events-none absolute left-[-3%] top-[-3%] h-[106%] w-[106%] border-0 blur-[6px]"
                />
              </div>
            </div>

            {/* `.ptvt-overlay` */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[#00000073]" />

            {/* `.ptvt-content` */}
            <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center p-5 text-center">
              <a
                href={href}
                data-vt-quiz="true"
                rel="noopener"
                className="mb-[14px] inline-block rounded-[999px] bg-mint px-[34px] py-4 text-base font-normal text-[#060606] no-underline xl:bg-[#2ebf94] xl:text-[#0e0d0d] max-sm:px-6 max-sm:py-[5px]"
              >
                {cta}
              </a>
              <p className="m-0 max-w-[420px] text-[20px] text-bianco xl:text-[24px] max-sm:text-base">
                {sottotesto}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
