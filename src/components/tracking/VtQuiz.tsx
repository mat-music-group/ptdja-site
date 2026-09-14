import Script from "next/script";
import { TOOL, VT_QUIZ_DESTINATION } from "@/lib/analytics.config";

/*
 * Il quiz del Virtual Tour: uno script del landing kit che aggancia la modale
 * del quiz ai punti di ingresso presenti nelle pagine e, a risposte date, manda
 * la persona sulla landing giusta di `start.petetong-djacademy.com`.
 *
 * Presente su ogni pagina del sito Webflow, quindi sta nel layout come là.
 *
 * Unica differenza: sul sito è un tag con `defer`, qui è `afterInteractive`. In
 * pratica è lo stesso momento (dopo il parsing del documento); il vantaggio è
 * che con `next/script` lo script non viene reinserito a ogni navigazione fra
 * pagine, che in un'app a rotte client sarebbe un doppione silenzioso.
 */
export function VtQuiz() {
  return (
    <Script
      src={`${TOOL}/landing-kit/kit/vt-quiz.js`}
      data-quiz={VT_QUIZ_DESTINATION}
      strategy="afterInteractive"
    />
  );
}
