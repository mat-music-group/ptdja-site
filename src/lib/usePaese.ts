"use client";

import { useEffect, useState } from "react";
import { stimaPaese } from "@/lib/geo";

/**
 * Restituisce il paese stimato del visitatore, o `null` finché non si sa.
 *
 * `null` non è un errore: è lo stato "non ho ancora deciso", ed è lo stato in
 * cui il listino non deve mostrare nessuna valuta. Sul server vale sempre
 * `null`, quindi l'HTML servito contiene tutte e tre le griglie e non ne
 * mostra nessuna (le nasconde la regola `[data-geo]` di `globals.css`).
 *
 * La stima gira una volta sola per montaggio. La cache di sessione dentro
 * `stimaPaese` fa il resto fra una pagina e l'altra.
 */
export function usePaese(): string | null {
  const [paese, setPaese] = useState<string | null>(null);

  useEffect(() => {
    let vivo = true;
    void stimaPaese().then((stimato) => {
      if (vivo) setPaese(stimato);
    });
    return () => {
      vivo = false;
    };
  }, []);

  return paese;
}
