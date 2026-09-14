import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";
import { BOOK_A_CALL } from "@/testi/condivisi";

/*
 * La sezione "Get all the details about our courses — book a free call":
 * `section.feature-section…the-team.new-home-2.courses-to-reach.pricing`.
 *
 * Due colonne: a sinistra lo screenshot della call, a destra eyebrow, titolo,
 * paragrafo e il bottone verso Calendly.
 *
 * Misure dal CSS: la sezione non ha spazio sopra (`padding-top: 0`), lo mette
 * il contenitore `.container-26.call.box-call` con 120px sopra e sotto;
 * `.content-wrapper-6` è un flex con 136px fra le due colonne;
 * `.content-image-block` è largo al massimo 541px e alto almeno 506px, ma con
 * `_2-blocks-home` perde fondo e padding e resta solo l'immagine;
 * `.content-title-6` è 40px peso 500 con `max-width: 410px`;
 * `.content-p-9` è 16px con interlinea 180% e `max-width: 480px`;
 * l'immagine ha raggio 25px (`.image-40`).
 *
 * L'eyebrow "BOOK A FREE CALL" è centrato e sta sopra le due colonne, non
 * dentro la colonna di destra: è così nell'HTML.
 *
 * Il blocco delle due colonne entra con `slideInBottom`
 * (`data-w-id="6f1102fc-…d3c4"`, delay 0).
 */
export function BookACall() {
  return (
    /* La sezione NON ha spazio sopra: `.feature-section.section-padding
       .remove-bottom-padding.the-team.new-home-2` dichiara `padding-top: 0`,
       che vince sui 120px di `.section-padding`. I 120px li mette il
       contenitore. A ≤479px la sezione riprende 30px sopra
       (`.…courses-to-reach`) e 30px di lato (`.…remove-bottom-padding`). */
    <section className="flex items-start justify-start bg-sfondo pb-0 pt-0 max-sm:px-[30px] max-sm:pt-[30px]">
      {/* `.container-26`: 30px di lato, 1380px, `.call` 120px sotto,
          `.call.box-call` 120px sopra. A ≤479px `.mobilev` porta il sopra a
          60px e `.space` toglie i lati, ma il sotto resta 120px: la regola a
          50px del blocco 479 ha una classe sola e perde contro `.container-26
          .call`. Larghezza massima 768px a ≤991 e 600px a ≤767. */}
      <div className="mx-auto flex w-full max-w-sito flex-col items-start justify-start px-[30px] pb-sezione pt-sezione max-lg:max-w-[768px] max-md:max-w-[600px] max-sm:px-0 max-sm:pt-[60px]">
        {/* `.section-subtitle-29.negative.new-home-2` azzera la spaziatura fra
            le lettere (il `letter-spacing: 3px` è della classe base, che
            perde) e a ≤479px toglie il maiuscolo (qui invisibile: il testo è
            già scritto in maiuscolo). Corpo `text-[16px]` e non `text-base`:
            l'utility di Tailwind imporrebbe anche l'interlinea, mentre qui
            deve restare il 180% del `p` del sito. */}
        <p className="m-0 w-full pb-[30px] text-center text-[16px] font-light uppercase tracking-normal text-bianco opacity-70 max-sm:normal-case">
          {BOOK_A_CALL.eyebrow}
        </p>

        {/* `.feature-wrapper-one`: 70% centrato a ≤991px, di nuovo 100% a
            ≤767px. */}
        <div className="flex w-full flex-col gap-16 max-lg:mx-auto max-lg:w-[70%] max-md:w-full">
          <RivelaAllaVista>
            {/* `.content-wrapper-6`: riga con 136px di distacco, colonna con
                40px a ≤991px, e a ≤479px torna riga ma con
                `flex-flow: wrap-reverse` e 30px di distacco. Le due colonne
                sono larghe al 100%, quindi vanno a capo, e `wrap-reverse`
                rovescia l'ordine delle righe: insieme all'`order: -1` del
                blocco di testo rimette l'immagine sopra. */}
            <div className="flex flex-row items-center gap-[136px] max-lg:flex-col max-lg:gap-10 max-md:text-center max-sm:flex-row max-sm:flex-wrap-reverse max-sm:gap-[30px]">
              {/* `.content-image-block.bg-1` perde il limite di 541px a ≤991px. */}
              <div className="flex w-full max-w-[541px] items-center justify-center max-lg:max-w-full">
                <Image
                  src={BOOK_A_CALL.immagine.src}
                  alt={BOOK_A_CALL.immagine.alt}
                  width={BOOK_A_CALL.immagine.larghezza}
                  height={BOOK_A_CALL.immagine.altezza}
                  className="h-auto w-full rounded-media"
                />
              </div>

              {/* `.content-text-block-2`: 48px fra i blocchi, 30px e
                  `order: -1` a ≤991px (con testo centrato e limite di
                  larghezza tolto), 20px a ≤767px. */}
              <div className="flex w-full max-w-testo flex-col items-start gap-12 max-lg:order-first max-lg:max-w-full max-lg:items-center max-lg:gap-[30px] max-lg:text-center max-md:gap-5">
                {/* `.content-area-subtitle-content`: 36px, centrato a ≤991px,
                    20px a ≤767px. */}
                <div className="flex flex-col items-start gap-9 max-lg:items-center max-md:gap-5">
                  {/* `.content-area-content`: 16px, centrato a ≤767px. */}
                  <div className="flex flex-col gap-4 max-md:items-center">
                    {/* `.content-title-6`: 40px, 34px a ≤991, 32px a ≤767,
                        28px a ≤479. */}
                    <h2 className="max-w-[410px] text-[40px] font-medium leading-[130%] text-bianco max-lg:mx-auto max-lg:text-[34px] max-md:text-[32px] max-sm:text-[28px]">
                      {BOOK_A_CALL.titolo}
                    </h2>
                    {/* `.content-p-9`: 16px, 15px a ≤479. */}
                    <p className="m-0 max-w-[480px] text-base font-normal leading-[180%] tracking-[-0.4px] text-bianco opacity-95 max-sm:text-[15px]">
                      {BOOK_A_CALL.paragrafo}
                    </p>
                  </div>
                </div>
                {/* `.button-2.secondary` porta `margin-top: 30px`, che si
                    somma al distacco del flex. Su desktop non si vede (a
                    comandare l'altezza della riga è l'immagine), sul telefono
                    valeva 30px di pagina. */}
                <Button
                  href={BOOK_A_CALL.href}
                  variante="mint"
                  esterno
                  className="mt-[30px]"
                >
                  {BOOK_A_CALL.cta}
                </Button>
              </div>
            </div>
          </RivelaAllaVista>
        </div>
      </div>
    </section>
  );
}
