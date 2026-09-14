import Image from "next/image";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";

/*
 * "DJ Talent Pool® Opportunities": la sezione `TALENT SCOUTING` delle pagine
 * corso (`section.feature-section.section-padding.remove-bottom-padding` con
 * dentro `.feature-tabs-wrapper-2.new-home-2.talent-scouting.dj-course`).
 *
 * Una sola card con un paragrafo e N righe "contest + logo del partner".
 * Producer e Mix & Mastering hanno lo stesso blocco con titolo, paragrafo e
 * partner diversi: per questo arriva tutto da fuori.
 *
 * ── Gli spicchi colorati ──────────────────────────────────────────────
 * L'angolo colorato di ogni riga non è un bordo: è un SVG messo come
 * `background-image` con `background-position: 0 -50px` (0 -55px sotto i
 * 480px), così si vede solo la punta. Nel foglio Webflow lo sfondo sta su due
 * elementi diversi a seconda del breakpoint (`.content-list-item-4` sopra i
 * 480, `.content-card-10` sotto); avendo lo stesso riquadro quando il padding
 * è zero, qui sta su un elemento solo e cambia solo la posizione. Stessa
 * scorciatoia già usata in `OpportunitaTalentPool`.
 *
 * ── Misure (sito live, 1440) ──────────────────────────────────────────
 *   sezione               padding-top 120, niente sotto
 *   .section-title        gap 30, padding-bottom 40; l'occhiello ha
 *                         `margin-top: 0` solo grazie alla classe `.dj-course`
 *   .pricing-table        padding-top 30, gap 24, flex wrap centrato
 *   .pricing-card         nessuna larghezza: la detta il paragrafo, che ha
 *                         `max-width: 520px` → 568px di card
 *   .pricing-card-top     fondo nero, bordo bianco 1px senza il lato basso,
 *                         padding 24px 24px 0
 *   .pricing-card-body    fondo nero, padding 24px 20px, gap 24
 *   .terms-card-wrapper-3 griglia a una colonna con `grid-template-rows: auto
 *                         auto`: la seconda riga è vuota ma il suo `gap` di
 *                         24px esiste lo stesso e allunga la card
 *   logo partner          120px di larghezza (80 sotto i 480), altezza libera
 */

const SFONDO_TONO = {
  giallo: "/webflow/shared/giallo.svg",
  viola: "/webflow/shared/viola.svg",
  rosso: "/webflow/shared/rosso.svg",
  verde: "/webflow/shared/verde.svg",
} as const;

export type OpportunitaCorso = {
  readonly titolo: string;
  readonly sottotitolo: string;
  readonly tono: keyof typeof SFONDO_TONO;
  readonly logo: { readonly src: string; readonly alt: string };
};

export type ProprietaTalentPoolCorso = {
  readonly eyebrow: string;
  readonly titoloRiga1: string;
  readonly titoloRiga2: string;
  readonly paragrafo: string;
  readonly opportunita: readonly OpportunitaCorso[];
};

export function TalentPoolCorso({
  eyebrow,
  titoloRiga1,
  titoloRiga2,
  paragrafo,
  opportunita,
}: ProprietaTalentPoolCorso) {
  return (
    <section className="block bg-sfondo pb-0 pt-sezione max-lg:pt-20 max-md:pt-[60px] max-sm:px-[30px] max-sm:pt-[50px] max-sm:text-center">
      {/* `.container` */}
      <div className="mx-auto flex w-auto max-w-sito flex-col items-center justify-end bg-sfondo px-[30px] max-sm:overflow-clip max-sm:px-0 max-sm:pb-[10px]">
        {/* `.feature-tabs-wrapper-2.new-home-2.talent-scouting.dj-course` */}
        <div className="flex w-full flex-col items-center justify-center max-lg:mx-auto max-lg:w-[70%] max-md:w-full max-sm:gap-5">
          {/* `.section-title.new-home-2.dj-course` */}
          <RivelaAllaVista className="flex flex-col items-center gap-[30px] pb-10 text-center max-sm:gap-5">
            {/* Sotto i 480px il foglio toglie il maiuscolo forzato e aggiunge
                5px di spazio sotto (`.section-subtitle.negative.new-home-2`).
                Il testo resta maiuscolo perché è scritto maiuscolo. */}
            <p className="mt-0 pb-0 text-center text-base font-light uppercase leading-[180%] tracking-normal text-bianco opacity-70 max-sm:pb-[5px] max-sm:normal-case">
              {eyebrow}
            </p>
            <h2 className="m-0 text-center text-[56px] font-light leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:text-[32px]">
              {titoloRiga1}
              <span className="font-semibold">
                <br />
                {titoloRiga2}
              </span>
            </h2>
          </RivelaAllaVista>

          {/* `.pricing-table.monthly…talent-pool.dj-course.noborder-box` */}
          <div className="flex w-full flex-wrap justify-center gap-6 pt-[30px]">
            {/* `.pricing-card` */}
            <div className="flex flex-col rounded-[16px] border border-t-0 border-[#0a091529] max-sm:w-full max-sm:rounded-tl-none">
              {/* `.pricing-card-top…noborder-box.spazio-mob.spazio-sotto`:
                  `.noborder-box` porta il bordo bianco di `.pricing-card-top.
                  new-home-2` a `border-width: 0`, quindi il filetto non si
                  vede; `.spazio-mob.spazio-sotto` azzera il padding sotto. */}
              <div className="rounded-t-media bg-nero px-6 pb-0 pt-6 max-sm:px-[10px] max-sm:pt-0 max-sm:text-left">
                <RivelaAllaVista>
                  <p className="m-0 w-full max-w-[520px] text-base font-light leading-[180%] tracking-[-0.4px] text-bianco opacity-75 max-sm:text-center max-sm:text-[15px] max-sm:opacity-100">
                    {paragrafo}
                    <br />
                  </p>
                </RivelaAllaVista>
              </div>

              {/* `.pricing-card-body.price-popular.new-home-2.noborder-box` */}
              <div className="flex flex-col gap-6 rounded-b-media bg-nero px-5 py-6 max-sm:px-[10px]">
                {/* `.price-button-wrapper` */}
                <div className="flex flex-col gap-4">
                  {/* `.terms-card-wrapper-3`: la seconda riga vuota della
                      griglia vale 24px in fondo alla card. Non è un errore. */}
                  <div className="grid grid-cols-1 grid-rows-[auto_auto] items-start justify-center gap-6 max-sm:mb-[10px] max-sm:gap-[6px]">
                    {/* `.terms-card-list-3.new-home-2.talent-pool`: il gap
                        resta 24px anche sul telefono. I 6px sono della griglia
                        che la contiene, non della lista. */}
                    <div className="flex flex-col gap-6">
                      {opportunita.map((voce, i) => (
                        <RigaOpportunita
                          key={`${voce.logo.src}-${i}`}
                          voce={voce}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
 * Una riga: `.content-card-10` → `.content-card-text-block` →
 * `.content-list-item-4` (due volte annidato sul sito, qui una sola).
 */
function RigaOpportunita({ voce }: { readonly voce: OpportunitaCorso }) {
  return (
    <div
      className="flex w-full items-center justify-around gap-[7px] rounded-media bg-sfondo bg-[position:0_-50px] bg-contain bg-no-repeat text-left max-sm:justify-between max-sm:gap-[6px] max-sm:bg-[position:0_-55px] max-sm:px-[30px] max-sm:py-[10px]"
      style={{ backgroundImage: `url(${SFONDO_TONO[voce.tono]})` }}
    >
      <p className="m-0 text-left text-base font-normal leading-[180%] tracking-[-0.4px] text-bianco max-sm:text-[15px]">
        <strong>
          {voce.titolo}
          <br />
        </strong>
        {voce.sottotitolo}
      </p>
      <Image
        src={voce.logo.src}
        alt={voce.logo.alt}
        width={164}
        height={164}
        className="mt-[3px] block h-auto w-[120px] max-sm:w-20"
      />
    </div>
  );
}
