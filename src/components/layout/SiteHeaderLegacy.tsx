import Image from "next/image";
import { LOGO } from "@/testi/condivisi";

/*
 * L'header vecchio, variante `684f4a0d`: solo su `recess` e
 * `terms-conditions-sa`.
 *
 * È l'header di prima del rifacimento: nessun menu, nessun dropdown, nessun
 * bottone mobile. Solo il logo, e il logo è largo 400px invece di 350.
 * Il link del logo punta a `#`, non alla home: è così nell'HTML pubblicato e
 * si riproduce (regola numero uno).
 *
 * Non è un client component: non c'è niente da cliccare che richieda stato.
 */
export function SiteHeaderLegacy() {
  return (
    <div className="sticky inset-x-0 top-0 z-[9999] h-header w-full bg-sfondo py-[22px]">
      <div className="mx-auto w-full max-w-sito px-[30px] max-lg:max-w-[768px] max-md:max-w-[600px]">
        <div className="flex w-full items-center justify-between">
          <a href="#" className="flex min-w-0 shrink" aria-label="Pete Tong DJ Academy">
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              width={LOGO.larghezza}
              height={LOGO.altezza}
              priority
              className="h-auto w-[400px] max-w-full max-sm:max-w-[80%]"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
