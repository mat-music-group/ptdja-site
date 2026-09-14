import Image from "next/image";
import Link from "next/link";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";
import { FOOTER } from "@/testi/condivisi";

/*
 * Il footer del sito, variante `704d21f5`: home, i tre corsi, pricing,
 * play & get signed, terms-conditions e 404.
 *
 * Misure dal CSS Webflow (`.footer-section`, `.footer-wrapper`,
 * `.footer-top-block`, `.footer-left-block`, `.footer-right-block`,
 * `.footer-widget`, `.footer-link`, `.image-41`):
 * - sezione: fondo `--neutral-03`, 60px sopra e 30px sotto (30px sopra a ≤991);
 * - blocco alto: `flex` con `space-between`, 50px di distacco; colonna di
 *   sinistra al 24% e colonna dei link al 60%;
 * - a ≤991 diventa una colonna centrata, a ≤767 i tre gruppi di link
 *   diventano una griglia 2×2 centrata dentro 400px;
 * - i link hanno opacità .42 e diventano mint al passaggio.
 *
 * L'intera sezione entra con l'interazione `SCROLL_INTO_VIEW` /
 * `slideInBottom` (`data-w-id="b896166c-…c11a"`, delay 0).
 *
 * I tre link Iubenda restano `<a>` normali: sul sito `iubenda.js` li
 * trasforma nel badge nero, e quello script arriva dal custom code, non da
 * qui. Le classi `iubenda-*` servono a quello script per riconoscerli, quindi
 * si tengono anche se in Tailwind non significano niente.
 */
export function SiteFooter() {
  return (
    <RivelaAllaVista>
      <footer className="bg-sfondo pb-[30px] pt-[60px] max-lg:pt-[30px]">
        <div className="mx-auto flex w-full max-w-sito flex-col items-center px-[30px] max-sm:px-0">
          <div className="flex w-full flex-col gap-[72px]">
            <div className="flex justify-between gap-[50px] max-lg:flex-col max-lg:items-center max-lg:gap-10 max-md:mx-auto max-md:max-w-[400px] max-sm:max-w-full max-sm:gap-[30px]">
              {/* Colonna di sinistra: logo e paragrafo "About". */}
              <div className="flex w-[24%] flex-col gap-10 max-lg:w-full max-lg:items-center max-lg:gap-[30px] max-md:items-center max-md:text-center max-sm:px-5">
                <div className="flex flex-col gap-4">
                  <Image
                    src={FOOTER.logo.src}
                    alt={FOOTER.logo.alt}
                    width={FOOTER.logo.larghezza}
                    height={FOOTER.logo.altezza}
                    className="h-auto w-full max-w-[250px] max-sm:w-1/2"
                  />
                  {/* Sotto i 480px il testo torna a sinistra: sul sito questo
                      link ha la classe `navbar-brand`, che nel blocco
                      `max-width: 479px` dichiara `text-align: left` e vince
                      sul `text-align: center` ereditato dal blocco a 767px. */}
                  <Link href={FOOTER.aboutHref} className="block max-sm:text-left">
                    <p className="m-0 text-base font-medium tracking-[-0.2px] text-bianco">
                      {FOOTER.titoloAbout}
                    </p>
                    <p className="m-0 text-sm font-normal leading-[180%] tracking-[-0.4px] text-bianco opacity-80 max-sm:text-[15px]">
                      {FOOTER.about}
                    </p>
                  </Link>
                </div>
              </div>

              {/* Colonna di destra: i tre gruppi di link. */}
              <div className="flex w-[60%] justify-between gap-5 max-lg:w-full max-lg:gap-[30px] max-md:grid max-md:grid-cols-2 max-md:gap-[30px] max-md:text-center">
                {FOOTER.colonne.map((colonna) => (
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

                {/* Academy Platform: login, supporto e i tre badge Iubenda.
                    Nell'HTML "Technical Support" sta FUORI dal blocco che
                    contiene "Login", e i badge sono tre blocchi separati.
                    Si riproduce quella struttura, non una più ordinata. */}
                <div className="flex flex-col gap-4 max-md:gap-[15px] max-sm:gap-[5px]">
                  <p className="m-0 text-base font-medium tracking-[-0.2px] text-bianco">
                    {FOOTER.academy.titolo}
                  </p>
                  <div className="flex flex-col gap-2 max-lg:gap-[15px] max-md:gap-[10px]">
                    <FooterLink href={FOOTER.academy.login.href}>
                      {FOOTER.academy.login.testo}
                    </FooterLink>
                  </div>
                  <FooterLink href={FOOTER.academy.supporto.href}>
                    {FOOTER.academy.supporto.testo}
                  </FooterLink>
                  {FOOTER.academy.iubenda.map((badge) => (
                    <div key={badge.testo} className="flex flex-col gap-2">
                      <a
                        href={badge.href}
                        title={badge.title}
                        className="iubenda-black iubenda-noiframe iubenda-embed self-start rounded bg-nero px-2 py-1 text-xs font-bold text-bianco max-md:self-center"
                      >
                        {badge.testo}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* La striscia di forme colorate: `.image-41` è larga il 100% del
            contenitore, quindi 1320px su desktop. */}
        <div className="mx-auto flex w-full max-w-sito flex-col items-center px-[30px] max-sm:px-0">
          <Image
            src={FOOTER.forme.src}
            alt={FOOTER.forme.alt}
            width={FOOTER.forme.larghezza}
            height={FOOTER.forme.altezza}
            className="inline-block w-full max-w-full"
          />
        </div>

        <div className="mx-auto flex w-full max-w-sito flex-col items-center px-[30px] max-sm:px-0">
          <p className="m-0 text-sm font-normal leading-[180%] tracking-[-0.4px] text-bianco opacity-80 max-sm:text-[15px]">
            {FOOTER.copyright}
          </p>
        </div>
      </footer>
    </RivelaAllaVista>
  );
}

/* `.footer-link`: bianco a opacità .42, 16px, `capitalize`, mint al passaggio.
   I link interni passano da `next/link`, quelli verso campus e social no. */
export function FooterLink({
  href,
  children,
}: {
  readonly href: string;
  readonly children: string;
}) {
  const classi =
    "text-base font-normal capitalize tracking-[-0.4px] text-bianco opacity-[0.42] transition-colors hover:text-mint max-sm:text-[15px]";

  if (href.startsWith("http") || href === "#") {
    return (
      <a href={href} className={classi}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classi}>
      {children}
    </Link>
  );
}
