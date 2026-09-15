import Image from "next/image";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";

/*
 * La bio di Luca Pretolesi: `div.container._2-paths.mm-page-luca.space-luca`.
 * Sezione che esiste solo su `/mix-mastering-course`.
 *
 * Non è una `<section>`: sul sito è un contenitore di primo livello dentro
 * `body`, senza padding verticale suo (sopra i 480px). Lo spazio che si vede
 * sopra e sotto viene dal `padding-bottom: 40px` della sezione del titolo e
 * dal `padding-top` della sezione che segue. Si riproduce così: aggiungere un
 * padding qui allungherebbe la pagina.
 *
 * ── Misure (foglio Webflow) ───────────────────────────────────────────
 *   .container                     max-width 1380 → 768 (≤991) → 600 (≤767),
 *                                  px 30; a ≤479 padding-bottom 10 e px 0…
 *   ._2-paths.mm-page-luca         …ma `.space-luca` rimette i 30px di lato e
 *                                  `.mm-page-luca` aggiunge padding-top 20
 *   .feature-wrapper-one           colonna, gap 64; a ≤991 width 70% centrato,
 *                                  a ≤767 width 100%
 *   .content-wrapper-3.style-1.mm-v2  riga, gap 136, space-between, centrato;
 *                                  DA 1440 IN SU gap 40 e justify-content
 *                                  center; a ≤991 colonna gap 40; a ≤479 gap 30
 *   .content-image-block…mm-v2     max-width 541, min-height 506, padding 0,
 *                                  raggio 24; width auto da 1440; a ≤767
 *                                  min-height 100% e `order: -1`
 *   .high-def                      raggio 30
 *   .content-text-block-2.mm-v2    gap 48, max-width 648 (auto da 1440); a ≤991
 *                                  `order: -1`, centrato, gap 30, max-width 100%;
 *                                  a ≤767 gap 20
 *   .content-area-subtitle-content gap 36 (20 a ≤767)
 *   .content-area-content          gap 16
 *   .content-title                 40px peso 500 → 34 (≤991) → 32 (≤767) → 28 (≤479)
 *   .content-p-2                   16px (15 a ≤479) peso 400, opacità .95,
 *                                  max-width 480, interlinea 180%
 *
 * ── L'ordine dei due blocchi cambia due volte ─────────────────────────
 * Sopra i 992px: immagine a sinistra, testo a destra (ordine del DOM).
 * Fra 480 e 991: il testo passa sopra (`order: -1` su `.content-text-block-2`).
 * Sotto i 768: anche l'immagine prende `order: -1`, quindi i due tornano
 * nell'ordine del DOM e l'immagine risale sopra il testo. Non è un errore del
 * sito, è la somma di due regole: si riproduce con `max-lg:order-first` sul
 * testo e `max-md:order-first` sull'immagine.
 *
 * ── I quattro pezzi verdi del paragrafo ───────────────────────────────
 * `span.text-span-152/153/154` e `span.text-span-147` sono tutti
 * `color: var(--theme-color-01)`, cioè il mint del brand. L'elenco delle
 * collaborazioni è in `<em>`.
 */

export type ProprietaBioPretolesi = {
  readonly immagine: {
    readonly src: string;
    readonly alt: string;
    readonly larghezza: number;
    readonly altezza: number;
  };
  readonly titoloRiga1: string;
  readonly titoloRiga2: string;
  readonly nomeEvidenziato: string;
  readonly dopoNome: string;
  readonly esperienzaEvidenziata: string;
  readonly dopoEsperienza: string;
  readonly grammyEvidenziato: string;
  readonly titoloCollaborazioni: string;
  readonly collaborazioni: string;
};

export function BioPretolesi({
  immagine,
  titoloRiga1,
  titoloRiga2,
  nomeEvidenziato,
  dopoNome,
  esperienzaEvidenziata,
  dopoEsperienza,
  grammyEvidenziato,
  titoloCollaborazioni,
  collaborazioni,
}: ProprietaBioPretolesi) {
  return (
    /* `.container._2-paths.mm-page-luca.space-luca.w-container` */
    <div className="mx-auto flex w-auto max-w-sito flex-col items-center justify-end bg-sfondo px-[30px] max-lg:max-w-[768px] max-md:max-w-[600px] max-sm:overflow-clip max-sm:px-[30px] max-sm:pb-[10px] max-sm:pt-5">
      {/* `.feature-wrapper-one` */}
      <div className="flex flex-col gap-16 max-lg:mx-auto max-lg:w-[70%] max-md:w-full">
        {/* `.content-wrapper-3.style-1.mm-v2` (`data-w-id` f211c6be…) */}
        <RivelaAllaVista className="flex flex-row items-center justify-between gap-[136px] max-lg:flex-col max-lg:gap-10 max-md:text-center max-sm:gap-[30px] 2xl:justify-center 2xl:gap-10">
          {/* `.content-image-block.bg-2._2-blocks-home.mm-v2`: `.bg-2` porta
              uno sfondo a gradiente che `._2-blocks-home` spegne
              (`background-image: none`), quindi qui non si disegna niente. */}
          <div className="flex min-h-[506px] w-full max-w-[541px] items-center justify-center rounded-[24px] p-0 max-md:order-first max-md:min-h-full 2xl:w-auto">
            {/* `img.high-def`: nell'HTML ha `width="805"`, ma il contenitore la
                limita a 541. Si passano i valori dell'attributo, non quelli
                del file (4032×3024), così `next/image` genera lo stesso
                srcset del sito. */}
            <Image
              src={immagine.src}
              alt={immagine.alt}
              width={805}
              height={604}
              sizes="(max-width: 767px) 100vw, 805px"
              className="h-auto max-w-full rounded-[30px]"
            />
          </div>

          {/* `.content-text-block-2.mm-v2` */}
          <div className="flex w-full max-w-testo flex-col items-start gap-12 max-lg:order-first max-lg:max-w-full max-lg:items-center max-lg:gap-[30px] max-lg:text-center max-md:items-center max-md:gap-5 2xl:w-auto">
            {/* `.content-area-subtitle-content` */}
            <div className="flex flex-col items-start gap-9 max-lg:items-center max-md:items-center max-md:gap-5">
              {/* `.content-area-content` */}
              <div className="flex flex-col gap-4 max-md:items-center">
                <h2 className="m-0 text-left text-[40px] font-medium leading-[130%] text-bianco max-lg:mx-auto max-lg:text-[34px] max-md:text-[32px] max-sm:text-center max-sm:text-[28px]">
                  {titoloRiga1}
                  <br />
                  {titoloRiga2}
                </h2>

                {/* `p.content-p-2` */}
                <p className="m-0 max-w-[480px] text-base font-normal leading-[180%] tracking-[-0.4px] text-bianco opacity-95 max-sm:text-[15px]">
                  <span className="text-mint">{nomeEvidenziato}</span>
                  {dopoNome}
                  <span className="text-mint">{esperienzaEvidenziata}</span>
                  {dopoEsperienza}
                  <span className="text-mint">{grammyEvidenziato}</span>
                  <br />
                  <br />
                  <span className="text-mint">{titoloCollaborazioni}</span>
                  <br />
                  <em>{collaborazioni}</em>
                </p>
              </div>
            </div>
          </div>
        </RivelaAllaVista>
      </div>
    </div>
  );
}
