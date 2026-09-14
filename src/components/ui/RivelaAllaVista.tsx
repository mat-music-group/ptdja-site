"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/*
 * L'interazione Webflow più diffusa del sito: "slide in bottom".
 *
 * Nell'IX2 del bundle pubblicato (`webflow.schunk.5961952b…js`) è un evento
 * `SCROLL_INTO_VIEW` con `effectIn: slideInBottom`, `direction: "BOTTOM"` e un
 * `delay` che cambia da elemento a elemento. Webflow marca l'elemento con
 * `style="opacity:0"` nell'HTML servito e lo anima quando entra nella
 * finestra: opacità 0 → 1 e traslazione dal basso.
 *
 * Qui la stessa cosa con framer-motion. La consegna chiede parità
 * **percepibile**, non frame per frame: quindi 100px di traslazione,
 * 1 secondo, `easeOut`, una sola volta (`once`), esattamente come si vede
 * scorrendo il sito.
 *
 * `amount: 0.15` fa partire l'animazione quando il 15% dell'elemento è
 * visibile: con `scrollOffsetValue: 0` Webflow parte appena l'elemento tocca
 * il bordo, ma su blocchi alti come il footer quel comportamento farebbe
 * apparire il contenuto già animato fuori schermo.
 */

type ProprietaRivela = {
  readonly children: ReactNode;
  /** Ritardo in millisecondi, come il `delay` dell'evento IX2. */
  readonly ritardo?: number;
  readonly className?: string;
};

export function RivelaAllaVista({
  children,
  ritardo = 0,
  className,
}: ProprietaRivela) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: "easeOut", delay: ritardo / 1000 }}
    >
      {children}
    </motion.div>
  );
}
