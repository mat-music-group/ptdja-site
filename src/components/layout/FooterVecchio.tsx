import Image from "next/image";
import { FooterLink } from "@/components/layout/SiteFooter";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";
import { FOOTER_VECCHIO } from "@/testi/condivisi";

/*
 * Il corpo del footer vecchio, condiviso dalle varianti `be31567f` (recess) e
 * `652f6da5` (terms-conditions-sa).
 *
 * Differenze rispetto al footer nuovo, tutte volute e tutte del sito:
 * - il claim dice "Connecting 8000+ DJs in 140 countries" invece di
 *   "Connecting thousands of DJs and producers";
 * - i link puntano alle pagine vecchie (`/dj-course-full-path-old`,
 *   `/digital-campus-old`…) e "FAQ" punta a `#`;
 * - le colonne sono quattro invece di tre, con "What's Your Level?" e
 *   "Campus" al posto di "Academy Platform";
 * - non ci sono i badge Iubenda;
 * - il logo e il paragrafo sono dentro un unico link verso `/old-home`;
 * - la striscia di forme è larga 940px e non 1320: nell'HTML quell'immagine
 *   non ha la classe `.image-41` (che imporrebbe `width: 100%`), quindi la sua
 *   larghezza di layout la decide l'attributo `sizes`, che dichiara 940px.
 *
 * Il contenitore esterno è `section.footer-cta-section`, che nell'HTML avvolge
 * una `section.cta-section` vuota più la `section.footer-section` vera. La
 * sezione vuota NON si può togliere anche se non contiene niente: `.cta-section`
 * ha `padding-bottom: 60px`, e quei 60px di aria sopra il footer si vedono.
 * Misurato: senza, la pagina è 86px più corta dell'originale.
 */
export function FooterVecchio() {
  return (
    <RivelaAllaVista>
      <div className="bg-sfondo pb-[60px]" aria-hidden="true" />
      <footer className="bg-sfondo pb-[30px] pt-[60px] max-lg:pt-[30px]">
        <div className="mx-auto flex w-full max-w-sito flex-col items-center px-[30px] max-sm:px-0">
          <div className="flex w-full flex-col gap-[72px]">
            <div className="flex justify-between gap-[50px] max-lg:flex-col max-lg:items-center max-lg:gap-10 max-md:mx-auto max-md:max-w-[400px] max-sm:max-w-full max-sm:gap-[30px]">
              <div className="flex w-[24%] flex-col gap-10 max-lg:w-full max-lg:items-center max-lg:gap-[30px] max-md:items-center max-md:text-center max-sm:px-5">
                <div className="flex flex-col gap-4">
                  {/* Vedi la nota in `SiteFooter`: sotto i 480px la classe
                      `navbar-brand` riporta il testo a sinistra. */}
                  <a href={FOOTER_VECCHIO.aboutHref} className="block max-sm:text-left">
                    <Image
                      src={FOOTER_VECCHIO.logo.src}
                      alt={FOOTER_VECCHIO.logo.alt}
                      width={FOOTER_VECCHIO.logo.larghezza}
                      height={FOOTER_VECCHIO.logo.altezza}
                      className="h-auto w-full max-w-[250px] max-sm:w-1/2"
                    />
                    <p className="m-0 text-base font-medium tracking-[-0.2px] text-bianco">
                      {FOOTER_VECCHIO.titoloAbout}
                    </p>
                    <p className="m-0 text-sm font-normal leading-[180%] tracking-[-0.4px] text-bianco opacity-80 max-sm:text-[15px]">
                      {FOOTER_VECCHIO.about}
                    </p>
                  </a>
                </div>
              </div>

              <div className="flex w-[60%] justify-between gap-5 max-lg:w-full max-lg:gap-[30px] max-md:grid max-md:grid-cols-2 max-md:gap-[30px] max-md:text-center">
                {FOOTER_VECCHIO.colonne.map((colonna) => (
                  <div
                    key={colonna.titolo}
                    className="flex flex-col gap-4 max-md:gap-[15px] max-sm:gap-[5px]"
                  >
                    <p className="m-0 text-base font-medium tracking-[-0.2px] text-bianco">
                      {colonna.titolo}
                    </p>
                    <div className="flex flex-col gap-2 max-lg:gap-[15px] max-md:gap-[10px]">
                      {colonna.voci.map((voce) => (
                        <FooterLink key={voce.testo} href={voce.href}>
                          {voce.testo}
                        </FooterLink>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-sito flex-col items-center px-[30px] max-sm:px-0">
          <Image
            src={FOOTER_VECCHIO.forme.src}
            alt={FOOTER_VECCHIO.forme.alt}
            width={FOOTER_VECCHIO.forme.larghezza}
            height={FOOTER_VECCHIO.forme.altezza}
            className="inline-block h-auto w-full max-w-[940px]"
          />
        </div>

        <div className="mx-auto flex w-full max-w-sito flex-col items-center px-[30px] max-sm:px-0">
          <p className="m-0 text-sm font-normal leading-[180%] tracking-[-0.4px] text-bianco opacity-80 max-sm:text-[15px]">
            {FOOTER_VECCHIO.copyright}
          </p>
        </div>
      </footer>
    </RivelaAllaVista>
  );
}
