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
 * Misure dal CSS: contenitore `.container-26.call.box-call` con 120px sopra e
 * sotto; `.content-wrapper-6` è un flex con 136px fra le due colonne;
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
    <section className="flex items-start justify-start bg-sfondo pb-0 pt-sezione">
      <div className="mx-auto flex w-full max-w-sito flex-col items-start justify-start px-[30px] pb-sezione pt-sezione max-sm:px-0 max-sm:pb-[50px] max-sm:pt-[60px]">
        <p className="m-0 w-full pb-[30px] text-center text-base font-light uppercase tracking-[3px] text-bianco opacity-70">
          {BOOK_A_CALL.eyebrow}
        </p>

        <div className="flex w-full flex-col gap-16">
          <RivelaAllaVista>
            <div className="flex flex-row items-center gap-[136px] max-lg:flex-col max-lg:gap-10">
              <div className="flex w-full max-w-[541px] items-center justify-center">
                <Image
                  src={BOOK_A_CALL.immagine.src}
                  alt={BOOK_A_CALL.immagine.alt}
                  width={BOOK_A_CALL.immagine.larghezza}
                  height={BOOK_A_CALL.immagine.altezza}
                  className="h-auto w-full rounded-media"
                />
              </div>

              <div className="flex w-full max-w-testo flex-col items-start gap-12">
                <div className="flex flex-col items-start gap-9">
                  <div className="flex flex-col gap-4">
                    <h2 className="max-w-[410px] text-[40px] font-medium leading-[130%] text-bianco max-sm:text-[32px]">
                      {BOOK_A_CALL.titolo}
                    </h2>
                    <p className="m-0 max-w-[480px] text-base font-normal leading-[180%] tracking-[-0.4px] text-bianco opacity-95">
                      {BOOK_A_CALL.paragrafo}
                    </p>
                  </div>
                </div>
                <Button href={BOOK_A_CALL.href} variante="mint" esterno>
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
