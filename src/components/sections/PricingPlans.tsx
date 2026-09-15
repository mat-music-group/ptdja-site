"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Tooltip } from "@/components/ui/Tooltip";
import { tracciaPricingCheckoutClicked } from "@/lib/eventi-mixpanel";
import { usePaese } from "@/lib/usePaese";
import { visibilePerPaese } from "@/lib/geo";
import { LISTINO, PIANI, VALUTE, type Piano, type Valuta } from "@/testi/condivisi";

/*
 * Il blocco prezzi: `div.cloneable-container-default-2.center`.
 *
 * È il componente più condiviso del sito: 6 pagine su 11 lo montano con
 * 5.499 caratteri di testo identico e gli stessi 18 link al carrello.
 *
 * ── LE TRE VALUTE ───────────────────────────────────────────────────────
 * Non c'è nessuno switch di valuta. Le tre griglie (USD, EUR, GBP) stanno
 * tutte e tre nel DOM, come su Webflow, e il gate geografico ne accende una
 * sola. Il server le rende tutte e non ne mostra nessuna: le nasconde la
 * regola `[data-geo]` di `globals.css`, che sono le stesse righe che il sito
 * inietta insieme allo script "GEO-GATED REGION BLOCKER v0.3". Vedi
 * `src/lib/geo.ts` per la cascata e per il perché non usiamo l'IP.
 *
 * ── IL CICLO DI FATTURAZIONE ────────────────────────────────────────────
 * ⚠️ Sul sito i nomi delle classi sono invertiti: `.is_monthly` è il piano
 * ANNUALE e `.is_annual` è il TRIMESTRALE, `data-month` (13/19/24) è il
 * mensile equivalente dell'annuale e `data-year` (19/29/39) quello del
 * trimestrale. Qui i nomi dicono la verità: `annuale` e `trimestrale`.
 * Lo stato iniziale è ANNUALE, come su Webflow (nell'IX2 il primo gruppo di
 * `a-606` è dichiarato stato iniziale, con il pallino a sinistra e il bottone
 * annuale visibile).
 *
 * L'animazione dei numeri riproduce lo script jQuery `#packageSwitch`:
 * 500 ms, andamento lineare, arrotondamento a intero a ogni passo.
 */

type ProprietaPricing = {
  readonly className?: string;
};

export function PricingPlans({ className = "" }: ProprietaPricing) {
  const paese = usePaese();
  const [trimestrale, setTrimestrale] = useState(false);

  return (
    <div className={`flex w-full flex-col items-center ${className}`}>
      <div className="mx-auto w-full max-w-sito bg-sfondo px-[60px] max-sm:px-[10px]">
        {/* ── Titolo ─────────────────────────────────────────────────── */}
        {/* `.heading-18`: `margin-top: 110px` di base, ma **62px** nel blocco
            `min-width: 1440px` del foglio, che è proprio la larghezza degli
            screenshot di riferimento. Senza `2xl:` tutto il resto della pagina
            scendeva di 48px su desktop. */}
        <h2 className="mt-[110px] text-center text-[48px] font-medium tracking-[-2.5px] text-bianco 2xl:mt-[62px] max-sm:mt-[50px] max-sm:text-[32px] max-sm:leading-[1.2]">
          {/* `.text-span-408` a ≤479px scende a 28px (il titolo resta 32px). */}
          <span className="text-bianco max-sm:text-[28px]">
            {LISTINO.titoloPrima}
            <br />
          </span>
          <span className="text-bianco">
            {VALUTE.map((valuta) => (
              <span
                key={valuta.codice}
                data-geo={valuta.modo}
                className={
                  visibilePerPaese(valuta.modo, valuta.paesi, paese)
                    ? "geo-visibile"
                    : undefined
                }
              >
                {valuta.simbolo}
                {LISTINO.cifraTitolo}
              </span>
            ))}
            {LISTINO.titoloDopo}
          </span>
        </h2>

        {/* `color: gray` nel CSS Webflow, cioè la parola chiave CSS (#808080),
            non un grigio della scala Tailwind.

            `.paragraph-18` cambia in tutti e tre i blocchi che ci riguardano:
            base 18px con `margin-bottom: 10px`; a `min-width: 1440px` 20px,
            peso 300, colore #777 e `margin-bottom: 85px`; a `max-width: 479px`
            14px, peso 300 e `margin-bottom: 45px`. È il motivo per cui sul
            telefono il sottotitolo del sito sta su due righe e qui ne
            occupava tre. */}
        <p className="mb-[10px] text-center text-[18px] leading-[1.2] text-[gray] 2xl:mb-[85px] 2xl:text-[20px] 2xl:font-light 2xl:text-[#777] max-sm:mb-[45px] max-sm:text-[14px] max-sm:font-light">
          {LISTINO.paragrafo.split("\n").map((riga, i) => (
            <span key={riga}>
              {i > 0 ? <br /> : null}
              {riga}
            </span>
          ))}
        </p>

        <div className="mt-[44px] flex flex-wrap items-center justify-start">
          {/* ── Interruttore annuale / trimestrale ───────────────────── */}
          <div className="flex w-full items-center justify-center">
            <div className="flex w-[40%] flex-row items-center justify-center gap-[10px] self-center rounded-full border border-bordo-chiaro bg-carta px-5 py-[15px] text-left max-lg:w-[53%] max-md:w-full">
              <div className="flex-none text-center text-sm font-normal leading-none text-testo-toggle">
                {LISTINO.toggleAnnuale}
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={trimestrale}
                aria-label={
                  trimestrale ? LISTINO.toggleTrimestrale : LISTINO.toggleAnnuale
                }
                onClick={() => setTrimestrale((v) => !v)}
                className="mx-[10px] w-[4.5rem] shrink-0 cursor-pointer rounded-full bg-mint-acceso p-[5px]"
              >
                <motion.span
                  className="block h-[30px] w-[30px] rounded-full bg-[#191717]"
                  animate={{ x: trimestrale ? "105%" : "0%" }}
                  transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
                />
              </button>
              <div className="flex-none text-center text-sm font-normal leading-none text-testo-toggle">
                {LISTINO.toggleTrimestrale}
              </div>
            </div>
          </div>

          {/* ── Le tre griglie di valuta ─────────────────────────────── */}
          {/* `margin-top: -30px` sotto i 480px ce l'ha solo
              `.grid-three-columns.usd`: nel foglio Webflow le varianti `.eur`
              e `.gbp` non la ricevono. È una disuguaglianza del sito, non un
              refuso nostro, e si riproduce com'è. */}
          {VALUTE.map((valuta) => (
            <div
              key={valuta.codice}
              data-geo={valuta.modo}
              className={[
                "w-full",
                visibilePerPaese(valuta.modo, valuta.paesi, paese)
                  ? "geo-visibile"
                  : "",
                valuta.codice === "USD" ? "max-sm:-mt-[30px]" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="mx-auto w-full">
                <div className="mt-16 flex flex-col items-center justify-between">
                  <div className="grid w-full grid-cols-3 gap-[3.2rem] max-lg:grid-cols-1">
                    {PIANI.map((piano) => (
                      <CartaPiano
                        key={piano.id}
                        piano={piano}
                        valuta={valuta}
                        trimestrale={trimestrale}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Una card ──────────────────────────────────────────────────────────── */

function CartaPiano({
  piano,
  valuta,
  trimestrale,
}: {
  readonly piano: Piano;
  readonly valuta: Valuta;
  readonly trimestrale: boolean;
}) {
  const popolare = piano.id === "PRO";

  const href =
    `${LISTINO.baseCarrello}?subscription_items[item_price_id][0]=` +
    `${piano.id}-${valuta.codice}-${trimestrale ? "Every-3-months" : "Yearly"}`;

  const totale = trimestrale ? piano.totaleTrimestrale : piano.totaleAnnuale;

  return (
    <div
      className={`rounded-carta border p-6 text-bianco ${
        popolare ? "border-mint-acceso bg-carta-pro" : "border-bordo-chiaro"
      }`}
    >
      {/* Intestazione: nome del piano ed eventuale badge. */}
      <div className="w-full">
        <div className="flex items-center justify-start gap-3 leading-none">
          <div className="pb-[2px] text-[26px] font-semibold">{piano.nome}</div>
          {piano.badge ? (
            <div
              /* `.most_popular`: 14px senza interlinea propria, quindi
                 prende l'`1` di `.plan_header_top`; raggio 8px, non 16.
                 Con `text-sm` (interlinea 20px) il badge misurava 34px
                 invece di 28 e la card cresceva di 6. */
              className={`flex items-center justify-center rounded-lg px-[10px] py-[6px] text-[14px] font-semibold ${
                piano.badge.tono === "mint"
                  ? "border border-mint-acceso bg-[#2d2d2d] text-mint-acceso"
                  : "bg-giallo-badge text-carta"
              }`}
            >
              {piano.badge.testo}
            </div>
          ) : null}
        </div>
        <div className="mt-2 text-[18px] font-light leading-none text-testo-chiaro">
          {piano.sottotitolo}
        </div>
      </div>

      {/* Prezzo: simbolo, numero animato, e la riga "per month / billed …". */}
      <div className="mt-4">
        <div className="mb-[-25px] mt-[30px] flex items-end justify-start">
          <div className="mr-[5px] text-[48px] font-light leading-[48px] text-mint-acceso">
            {valuta.simbolo}
          </div>
          <NumeroAnimato
            da={piano.mensileAnnuale}
            a={piano.mensileTrimestrale}
            trimestrale={trimestrale}
          />
          <div className="mr-[5px] whitespace-pre-line pb-[5px] text-sm leading-[18px] text-testo-prezzo">
            {trimestrale ? LISTINO.perMeseTrimestrale : LISTINO.perMeseAnnuale}
          </div>
        </div>
      </div>

      {/* CTA verso il carrello Chargebee.

          `Pricing Checkout Clicked`: sul sito parte da `.pricing_card
          .button_primary-2`, cioè da questo link. `price` e
          `billing_description` seguono lo script del sito *compresa
          l'inversione annuale/trimestrale* che ha dentro: la nota lunga sta in
          `src/lib/eventi-mixpanel.ts`, qui basta sapere che al ciclo 'yearly'
          lo script associa 19/29/39 (`mensileTrimestrale`) e al 'quarterly'
          13/19/24 (`mensileAnnuale`), e che si riproduce com'è. */}
      <div className="mt-[30px]">
        <a
          href={href}
          onClick={(evento: MouseEvent<HTMLAnchorElement>) =>
            tracciaPricingCheckoutClicked(
              {
                planName: piano.nome,
                billingCycle: trimestrale ? "quarterly" : "yearly",
                price: trimestrale ? piano.mensileAnnuale : piano.mensileTrimestrale,
                billingDescription: trimestrale
                  ? LISTINO.perMeseTrimestrale
                  : LISTINO.perMeseAnnuale,
              },
              evento.currentTarget
            )
          }
          /* `.button_primary-2.is_monthly`: 16px peso 500 senza interlinea
             propria, quindi il 170% ereditato dal `body` (27.2px), e 14px
             peso 600 a ≤479. Con `text-base` (24px) il bottone misurava 44px
             invece di 49. Il bordo di 1px arriva da
             `.button_primary-2.is_monthly.cta_stroke` (`1px solid #414141`):
             sotto il fondo mint non si vede ma vale 2px di altezza. */
          className="flex w-full items-center justify-center rounded-pillola border border-solid border-[#414141] bg-mint-acceso px-5 py-[10px] text-[16px] font-medium text-carta transition-colors hover:bg-bianco max-sm:text-[14px] max-sm:font-semibold 2xl:font-semibold"
        >
          {LISTINO.ctaPrefisso}
          {valuta.simbolo}
          {totale}
          {!trimestrale ? (
            <span className="ml-[5px] rounded-xl bg-nero px-[10px] text-mint line-through">
              {valuta.simbolo}
              {piano.totalePieno}
            </span>
          ) : null}
        </a>
      </div>

      <div className="mt-2">
        <div className="text-center text-sm font-light leading-none text-testo-toggle">
          {LISTINO.rassicurazione}
        </div>
      </div>

      {/* "What's Included:" e la lista. `.text-block-17` (e `.text-block-14`
          delle altre due card) dichiara solo `font-size: 14px`: l'interlinea
          resta quella del `body`, 170% di 16px, cioè 27,2px ereditati. Scritto
          come `text-[14px]` perché `text-sm` imporrebbe 20px. */}
      <div className="mt-8">
        <div className="border-b border-bordo pb-[2px] text-[14px] text-testo-tenue">
          {LISTINO.incluso}
        </div>
      </div>

      {/* ── Le voci del piano ─────────────────────────────────────────
          ⚠️ Le voci NON hanno tutte la stessa interlinea, e la differenza si
          vede: `.pricing_list_item.item.cart26` dichiara `line-height: 1`, e
          quasi tutte le voci (`.text-block-13`, `-15`, `-22`, `-23`) la
          ereditano, cioè 14px netti. Solo `.text-block-16` dichiara
          `line-height: 1.2` (16.8px), e nell'HTML quella classe ce l'hanno le
          **prime tre voci** di ogni piano più la voce del Talent Pool con le
          sue sottovoci. Con l'interlinea larga su tutte, ogni card cresceva
          di 20-30px e il listino di un centinaio. */}
      <ul className="m-0 mt-8 list-none p-0">
        {piano.voci.map((voce, indice) => {
          const interlineaLarga = indice < 3 || Boolean(voce.sotto);
          return (
            <li
              key={voce.testo}
              className={`mt-[10px] flex justify-start ${
                voce.grado ? "items-center" : "items-start"
              }`}
            >
              {/* `.check_icon.gradeicon`: 19px, 21px da 1440 in su, 20px a ≤479. */}
              <Image
                src={voce.grado ? LISTINO.iconaGrado.src : LISTINO.iconaSpunta.src}
                alt=""
                width={
                  voce.grado ? LISTINO.iconaGrado.larghezza : LISTINO.iconaSpunta.larghezza
                }
                height={
                  voce.grado ? LISTINO.iconaGrado.altezza : LISTINO.iconaSpunta.altezza
                }
                className={`mr-6 w-[14px] shrink-0 ${
                  voce.grado ? "h-[19px] 2xl:h-[21px] max-sm:h-[20px]" : "h-[14px]"
                }`}
              />
              <div className="flex flex-col">
                <div
                  className={`flex flex-row items-center text-sm font-light text-testo-lista ${
                    interlineaLarga ? "leading-[1.2]" : "leading-none"
                  }`}
                >
                  <span>{voce.testo}</span>
                  {voce.tooltip ? <Tooltip messaggio={voce.tooltip} /> : null}
                </div>
                {/* Le sottovoci del Talent Pool sono `.text-block-16` dentro
                    `.div-block-25.talent-pool-list`: 14px, peso 300,
                    interlinea 1.2, con 1px sopra e sotto. */}
                {voce.sotto?.map((figlia) => (
                  <div
                    key={figlia.testo}
                    className="flex items-center py-[1px] text-sm font-light leading-[1.2] text-testo-sottovoce"
                  >
                    <span>{figlia.testo}</span>
                    <Tooltip messaggio={figlia.tooltip} />
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ul>

      {/* "Best For" + la frase, con le parole in mint.
          `.text-block-25.best-for`: 20px di margine sopra e interlinea 20px,
          che da 1440 in su diventano 30 e 18; a ≤479 l'interlinea torna 18.
          I 2px sotto vengono da `.text-block-25`, che li dichiara nel blocco
          base: mancavano su ogni card. */}
      <div className="mt-5 border-t border-bordo pb-[2px] pt-[10px] text-[18px] font-light leading-5 text-testo-tenue max-sm:leading-[18px] 2xl:mt-[30px] 2xl:leading-[18px]">
        <span className="font-normal leading-[30px] text-bianco">
          {piano.bestFor.titolo}
        </span>
        <br />
        {piano.bestFor.prima}
        <span className="text-mint-acceso">{piano.bestFor.evidenziato}</span>
        {piano.bestFor.mezzo}
        {piano.bestFor.evidenziato2 ? (
          <span className="text-mint-acceso">{piano.bestFor.evidenziato2}</span>
        ) : null}
      </div>
    </div>
  );
}

/* ── Il numero che si anima ────────────────────────────────────────────── */

/*
 * Riproduce lo script jQuery `#packageSwitch` della pagina prezzi: al click
 * il prezzo scorre dal valore vecchio a quello nuovo in 500 ms con andamento
 * lineare, arrotondato a intero a ogni passo (`$.animate` con
 * `easing: 'linear'`, `duration: 500`, `Math.round` dentro lo `step`).
 *
 * Non usa framer-motion: qui non si anima una proprietà CSS ma il testo di un
 * nodo, e un `requestAnimationFrame` di dieci righe costa meno di una
 * `MotionValue` con la sua sottoscrizione.
 */
function NumeroAnimato({
  da,
  a,
  trimestrale,
}: {
  readonly da: number;
  readonly a: number;
  readonly trimestrale: boolean;
}) {
  const obiettivo = trimestrale ? a : da;
  const [mostrato, setMostrato] = useState(obiettivo);
  const mostratoRef = useRef(obiettivo);
  mostratoRef.current = mostrato;

  useEffect(() => {
    const inizio = mostratoRef.current;
    if (inizio === obiettivo) return;

    const durata = 500;
    const partenza = performance.now();
    let frame = 0;

    const passo = (ora: number) => {
      const avanzamento = Math.min((ora - partenza) / durata, 1);
      setMostrato(Math.round(inizio + (obiettivo - inizio) * avanzamento));
      if (avanzamento < 1) frame = requestAnimationFrame(passo);
    };

    frame = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(frame);
  }, [obiettivo]);

  return (
    <div className="mr-[5px] text-[48px] font-light leading-[48px] text-mint-acceso">
      {mostrato}
    </div>
  );
}
