import type { ReactNode } from "react";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";

/*
 * Il titolo di sezione del sito: una riga "eyebrow" in maiuscolo con molta
 * spaziatura fra le lettere, e sotto il titolo grande.
 *
 * Da `.section-title` (flex colonna, centrato, gap 30px, padding-bottom 30px),
 * `.section-subtitle` (opacità .7, bianco, `letter-spacing: 3px`,
 * `text-transform: uppercase`, 16px, peso 300) e `.section-title-heading`
 * (bianco, `letter-spacing: -2.5px`, 56px, peso 400).
 *
 * L'eyebrow del sito non è mai scritto in maiuscolo nell'HTML: in
 * `terms-conditions` è la parola "policy" e a renderla "POLICY" è il CSS.
 * Quindi qui si passa il testo com'è nell'outline e lo trasforma la classe.
 */

type ProprietaSectionTitle = {
  readonly eyebrow?: string;
  readonly children: ReactNode;
  /** Livello del titolo: il sito usa `h2` anche dove sarebbe l'unico titolo. */
  readonly livello?: "h1" | "h2";
  readonly className?: string;
  /** Anima l'entrata come l'interazione Webflow "slide in bottom". */
  readonly rivela?: boolean;
};

export function SectionTitle({
  eyebrow,
  children,
  livello = "h2",
  className = "",
  rivela = true,
}: ProprietaSectionTitle) {
  const Titolo = livello;

  const contenuto = (
    <div
      className={`flex flex-col items-center gap-[30px] pb-[30px] text-center ${className}`}
    >
      {eyebrow ? (
        <p className="m-0 text-base font-light uppercase tracking-[3px] text-bianco opacity-70">
          {eyebrow}
        </p>
      ) : null}
      <Titolo className="text-[56px] font-normal leading-[125%] tracking-[-2.5px] text-bianco max-sm:text-[36px]">
        {children}
      </Titolo>
    </div>
  );

  return rivela ? <RivelaAllaVista>{contenuto}</RivelaAllaVista> : contenuto;
}
