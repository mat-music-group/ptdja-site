/*
 * L'icona "i" che nel listino spiega una voce.
 *
 * Sul sito è un tooltip della libreria Flowbase (`fb-tooltip`, attributi
 * `fb-tooltip-message`, `fb-tooltip-theme="dark"`…). Flowbase è fra le
 * dipendenze che `desiderata.md` ha deciso di NON portare — "tooltip rifatto
 * nativo" — quindi qui il messaggio sta nell'attributo `title`: lo mostra il
 * browser, funziona senza JavaScript, si legge da tastiera e non aggiunge un
 * byte al bundle.
 *
 * Differenza dichiarata rispetto al sito: il riquadro è quello di sistema, non
 * la nuvoletta scura di Flowbase, e compare dopo il ritardo del browser invece
 * che dopo i 200 ms configurati. Il contenuto è identico, parola per parola.
 *
 * L'SVG è copiato dall'embed Webflow `1578bc1c`, colore `#666980` compreso.
 */

type ProprietaTooltip = {
  readonly messaggio: string;
  readonly className?: string;
};

export function Tooltip({ messaggio, className = "" }: ProprietaTooltip) {
  return (
    <span
      title={messaggio}
      aria-label={messaggio}
      role="note"
      tabIndex={0}
      className={`ml-[7px] inline-flex h-[15px] w-[18px] shrink-0 cursor-help items-center justify-center ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-[15px] w-[15px]"
      >
        <path
          d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"
          fill="#666980"
        />
      </svg>
    </span>
  );
}
