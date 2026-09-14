/*
 * Un video Wistia incapsulato nel widget embedly, come lo mette Webflow.
 *
 * Sul sito l'embed è un `div.w-video` con `padding-top` in percentuale (il
 * vecchio trucco del rapporto d'aspetto, precedente ad `aspect-ratio`) e
 * dentro un `<iframe>` in `position: absolute` che lo riempie. Il CSS Webflow
 * di riferimento:
 *
 *   .w-video        { width: 100%; padding: 0; position: relative }
 *   .w-video iframe { border: none; width: 100%; height: 100%;
 *                     position: absolute; top: 0; left: 0 }
 *
 * Qui è riprodotto uguale, `padding-top` compreso, perché il valore esatto
 * (56.27659574468085%) decide l'altezza della hero e quindi l'altezza della
 * pagina. Non si arrotonda a 56.25%.
 *
 * L'iframe resta un iframe e non passa da `next/script` o da una libreria:
 * è quello che serve il sito, stesso `src`, stessi parametri, stesso `title`.
 * Nessun `loading="lazy"`: sul sito non c'è, e il video è sopra la piega.
 */

type ProprietaVideoWistia = {
  /** `src` dell'iframe, copiato integralmente dall'HTML Webflow. */
  readonly src: string;
  /** `title` dell'iframe: è l'unico nome accessibile del video. */
  readonly titolo: string;
  /** `width`/`height` dell'iframe originale (940×529 sul sito). */
  readonly larghezza: number;
  readonly altezza: number;
  /**
   * Il `padding-top` in percentuale che fissa il rapporto d'aspetto, così
   * com'è nell'attributo `style` dell'HTML (es. "56.27659574468085%").
   */
  readonly proporzione: string;
  /** Classi aggiuntive sul contenitore `.w-video`. */
  readonly className?: string;
};

export function VideoWistia({
  src,
  titolo,
  larghezza,
  altezza,
  proporzione,
  className = "",
}: ProprietaVideoWistia) {
  return (
    <div
      className={`relative w-full p-0 ${className}`}
      style={{ paddingTop: proporzione }}
    >
      <iframe
        className="absolute left-0 top-0 h-full w-full border-0"
        src={src}
        width={larghezza}
        height={altezza}
        scrolling="no"
        allowFullScreen
        title={titolo}
      />
    </div>
  );
}
