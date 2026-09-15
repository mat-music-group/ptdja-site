"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LinkTrustpilot } from "@/components/ui/LinkTrustpilot";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";
import { tracciaBottone } from "@/lib/eventi-mixpanel";
import { visibilePerPaese } from "@/lib/geo";
import { usePaese } from "@/lib/usePaese";
import { LISTINO, VALUTE } from "@/testi/condivisi";

/*
 * "Course Content": la scheda del corso, i tab Curriculum / What you'll learn
 * e i nove capitoli del curriculum.
 *
 * ── DUE VERSIONI NEL DOM, E NON DICONO LA STESSA COSA ─────────────────
 * Sul sito questo blocco esiste due volte, in due `<section>` diverse:
 *
 *   `variante="desktop"`  → `section#program…content-section.courses-desk`
 *        dentro: la scheda `.card-2.course-mobile` (visibile FINO a 991px),
 *        il titolo, le bolle dei docenti, i tab in `.the-team.only-desktop`
 *        (visibili SOPRA i 479px), l'iframe embedly (visibile SOLO sotto i
 *        480px) e la colonna `.sidebar.course` (visibile SOPRA i 991px).
 *
 *   `variante="mobile"`   → `section…the-team.new-home-2.mobile-only`
 *        gli stessi tab più prezzo, CTA e frase Trustpilot. Esiste SOLO sotto
 *        i 480px.
 *
 * ⚠️ I conteggi non coincidono, ed è così sul sito pubblicato:
 *      scheda desktop (`.sidebar`)        → "Videos: 222", "Official Certificate"
 *      scheda mobile (`.card-2.course-mobile`) → "Videos: 130+", "Official Certification"
 *      accordion della variante desktop   → "222 Lessons | 30 hours"
 *      accordion della variante mobile    → "130 Lessons | 30 hours"
 *    Si riproducono tutti e quattro come sono. Segnalati fra le anomalie.
 *
 * ── IL VIDEO ─────────────────────────────────────────────────────────
 * Nell'HTML il video compare in tre forme:
 *   1. `<wistia-player media-id="…">` con `fast.wistia.com/player.js` e
 *      `fast.wistia.com/embed/<id>.js`, dentro `.code-embed-12`, che il
 *      foglio Webflow tiene a `display: none`;
 *   2. lo stesso web component dentro `.sidebar.course`, senza `.code-embed-12`,
 *      quindi visibile sul desktop;
 *   3. un iframe embedly dentro `.video-talent-pool.w-video`, che il foglio
 *      mostra solo sotto i 480px.
 * Si riproducono tutte e tre, nello stesso punto e con le stesse visibilità.
 *
 * ── I DUE EVENTI MIXPANEL DEL SITO STANNO QUI, NON NELLA HERO ─────────
 * Nel custom code del footer Webflow due selettori agganciano elementi che,
 * sulle tre pagine corso, vivono dentro la variante `mobile` di QUESTA
 * sezione e da nessun'altra parte:
 *
 *   a.button.enroll.signup-now              → 'CTA Click'  { section: 'Hero
 *                                             Signup', label, href, url }
 *   p.paragraph a[href*="trustpilot.com"]   → 'Trustpilot CTA Clicked'
 *
 * Il nome `Hero Signup` inganna: nell'HTML pubblicato le due CTA della hero
 * sono `a.button-2.enroll…signup-now` e il loro paragrafo è `paragraph-13/-14/
 * -15`, quindi nessuno dei due selettori le prende. L'unico elemento con
 * classe `.button` (senza il `-2`) e l'unico paragrafo con classe `paragraph`
 * sono quelli qui sotto. `section` resta la costante dello script.
 *
 * ⚠️ La CTA NON passa dal componente `Button`: la sua base è `.button`
 * (`padding: 10px 24px 8px`, `inline-block`, hover bianco), mentre qui a ≤479
 * il foglio la riscrive a `padding: 5px 24px`, `display: block`, larghezza
 * 80vw/300px e senza hover. Usare `Button` cambierebbe di 8px l'altezza del
 * bottone su tutte e tre le pagine corso. L'evento è lo stesso perché passa
 * dalla stessa funzione che userebbe `Button` (`tracciaBottone`).
 */

export type VoceMetaCorso = {
  readonly icona: string;
  readonly etichetta: string;
  readonly valore?: string;
  readonly allineaInAlto?: boolean;
};

export type CapitoloCorso = {
  readonly numero: string;
  readonly titolo: string;
  readonly lezioni: readonly string[];
};

type Immagine = {
  readonly src: string;
  readonly alt: string;
  readonly larghezza: number;
  readonly altezza: number;
};

export type ProprietaContenutoCorso = {
  readonly variante: "desktop" | "mobile";
  /** `id` della `<section>`: "program" sulla variante desktop. */
  readonly id?: string;
  /** `id` dell'`<h2>`: "dj-coursecontent" su questa pagina. */
  readonly idTitolo?: string;
  readonly titolo: string;
  /**
   * Le bolle dei docenti sopra i tab (`a.course-teacher-wrapper…course-content`).
   * Omesse o vuote il contenitore non si rende affatto: su
   * `/mix-mastering-course` quel blocco non c'è nell'HTML, e renderlo vuoto
   * aggiungerebbe i suoi 30px di `padding-bottom`.
   */
  readonly bolle?: readonly { readonly src: string; readonly alt: string }[];
  readonly metaDesktop: readonly VoceMetaCorso[];
  readonly metaMobile: readonly VoceMetaCorso[];
  readonly wistiaMediaId: string;
  readonly wistiaAspect: string;
  readonly videoEmbedly: {
    readonly src: string;
    readonly titolo: string;
    readonly larghezza: number;
    readonly altezza: number;
    readonly proporzione: string;
  };
  readonly tabCurriculum: string;
  readonly tabCosaImparerai: string;
  readonly accordionTitolo: string;
  /**
   * Quanti `<br>` fra il titolo dell'accordion e il conteggio delle lezioni.
   * Sono il modo in cui Webflow ottiene quello spazio (l'interlinea dell'`h4`
   * è 7px), e il numero non è lo stesso ovunque: 3 su entrambe le varianti di
   * `/dj-course`, **2** sulla variante desktop di `/producer-course` e 3 sulla
   * sua variante mobile, 1 su `/mix-mastering-course`. Default 3.
   */
  readonly accordionTitoloBr?: number;
  readonly accordionSottotitolo: string;
  readonly capitoli: readonly CapitoloCorso[];
  readonly cosaImparerai: readonly string[];
  readonly iconaFreccia: Immagine;
  readonly iconaSpunta: Immagine;
  /** Solo sulla variante mobile: il blocco prezzo + CTA in fondo. */
  readonly prezzo?: { readonly prima: string; readonly dopo: string };
  /**
   * Solo sulla variante mobile, e alternativo a `prezzo`: dove l'HTML ha una
   * frase fissa al posto dei tre `<span>` geo-gated (`/mix-mastering-course`
   * scrive "Starting at $13 per month" e basta), si passa quel testo qui e il
   * blocco valuta non si rende.
   */
  readonly prezzoMobileFisso?: string;
  readonly cta?: { readonly testo: string; readonly href: string };
  readonly trustpilot?: {
    readonly prima: string;
    readonly link: string;
    readonly href: string;
  };
};

export function ContenutoCorso(p: ProprietaContenutoCorso) {
  if (p.variante === "mobile") return <VarianteMobile {...p} />;
  return <VarianteDesktop {...p} />;
}

/* ── La sezione `#program`, quella "desktop" ────────────────────────── */

function VarianteDesktop(p: ProprietaContenutoCorso) {
  return (
    /* `.feature-section.section-padding.remove-bottom-padding…courses-desk`:
       `padding-top: 0`, nessun padding sotto. */
    <section
      id={p.id}
      className="block bg-sfondo py-0 max-sm:px-[30px] max-sm:text-center"
    >
      {/* `.container.program-section-full.new-home-2.page-courses` */}
      <div className="mx-auto flex w-auto max-w-sito flex-col items-center justify-center bg-sfondo px-[30px] pt-5 max-sm:px-0 max-sm:pb-0">
        {/* `.course-wrapper.sticky-program` */}
        <div className="flex w-full items-stretch justify-between">
          {/* `.about-course`: 660px di base, 65% da 1440 in su. */}
          <div className="w-full max-w-[660px] max-lg:mx-auto max-lg:max-w-none max-sm:w-full 2xl:max-w-[65%]">
            {/* `.card-2.course-mobile…ipadview`: si vede FINO a 991px. */}
            <SchedaCorso
              voci={p.metaMobile}
              wistiaMediaId={p.wistiaMediaId}
              wistiaAspect={p.wistiaAspect}
              nascondiEmbed
              className="hidden flex-col rounded-[24px] bg-grigio-sfondo px-8 pb-[51px] pt-[51px] shadow-[0_14px_44px_#0000000f] max-lg:mb-[70px] max-lg:flex max-lg:max-w-full max-md:mb-10 max-md:pt-6 max-sm:mb-[35px] max-sm:px-[15px] max-sm:pb-10 max-sm:pt-5"
            />

            {/* `.feature-tabs-wrapper-2` */}
            <div className="flex w-full flex-col items-center justify-center max-lg:mx-auto max-lg:w-[70%] max-md:w-full">
              {/* `.section-title.new-home-2.course-page.course-content` */}
              <RivelaAllaVista className="flex w-full flex-col items-center gap-[30px] pb-[35px] text-center max-sm:gap-0 max-sm:pb-5">
                <h2
                  id={p.idTitolo}
                  className="m-0 w-full text-center text-[56px] font-light leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:text-[32px]"
                >
                  {p.titolo}
                </h2>
              </RivelaAllaVista>

              {/* `a.course-teacher-wrapper…course-content`: sul sito è un
                  `<a href="#">` che non porta da nessuna parte. Qui è un
                  semplice contenitore: un link senza destinazione è solo un
                  ostacolo per chi naviga da tastiera. Sotto i 480px il foglio
                  lo spegne. */}
              {p.bolle && p.bolle.length > 0 ? (
                <div className="flex w-full items-center justify-center pb-[30px] max-sm:hidden">
                  {/* `.image-14.course-teacher` ha `margin-right: 24px` su
                      TUTTE le bolle, anche l'ultima: in un contenitore
                      `justify-content: center` quel margine finale sposta il
                      gruppo di 12px a sinistra. Togliendolo all'ultima, le
                      bolle escono spostate a destra rispetto al sito. */}
                  {p.bolle.map((bolla) => (
                    <Image
                      key={bolla.src}
                      src={bolla.src}
                      alt={bolla.alt}
                      width={301}
                      height={301}
                      className="mr-6 h-[70px] w-[70px] flex-none rounded-full"
                    />
                  ))}
                </div>
              ) : null}

              {/* `.feature-section…the-team.only-desktop.new-home-2`: c'è
                  sopra i 479px, sparisce sul telefono. */}
              <section className="block w-full bg-sfondo max-sm:hidden">
                <div className="mx-auto w-full px-[30px]">
                  <TabCorso
                    tabCurriculum={p.tabCurriculum}
                    tabCosaImparerai={p.tabCosaImparerai}
                    accordionTitolo={p.accordionTitolo}
                    accordionTitoloBr={p.accordionTitoloBr}
                    accordionSottotitolo={p.accordionSottotitolo}
                    capitoli={p.capitoli}
                    cosaImparerai={p.cosaImparerai}
                    iconaFreccia={p.iconaFreccia}
                    iconaSpunta={p.iconaSpunta}
                  />
                </div>
              </section>
            </div>

            {/* `.feature-tabs-wrapper-2.video-container` con dentro
                `.video-talent-pool.w-video`: `display: none` sopra i 479px. */}
            <div className="flex w-full rounded-media">
              <div
                className="relative hidden w-full p-0 max-sm:block"
                style={{ paddingTop: p.videoEmbedly.proporzione }}
              >
                <iframe
                  className="absolute left-0 top-0 h-full w-full border-0"
                  src={p.videoEmbedly.src}
                  width={p.videoEmbedly.larghezza}
                  height={p.videoEmbedly.altezza}
                  scrolling="no"
                  allowFullScreen
                  title={p.videoEmbedly.titolo}
                />
              </div>
            </div>
          </div>

          {/* `.sidebar.course`: sparisce sotto i 992px. */}
          <RivelaAllaVista className="max-lg:hidden">
            <SchedaCorso
              voci={p.metaDesktop}
              wistiaMediaId={p.wistiaMediaId}
              wistiaAspect={p.wistiaAspect}
              className="sticky top-[10px] max-w-[402px] rounded-[24px] bg-grigio-sfondo px-[26px] pb-[51px] pt-6 shadow-[0_14px_44px_#0000000f]"
            />
          </RivelaAllaVista>
        </div>
      </div>
    </section>
  );
}

/* ── La sezione `.mobile-only` ──────────────────────────────────────── */

function VarianteMobile(p: ProprietaContenutoCorso) {
  const paese = usePaese();

  return (
    /* `.feature-section…the-team.new-home-2.mobile-only`: `display: none` di
       base, `block` sotto i 480px; `.the-team` azzera il padding sopra, e i
       30px di lato vengono da `.feature-section.section-padding.remove-bottom-padding`. */
    <section className="hidden bg-sfondo pb-0 pt-0 max-sm:block max-sm:px-[30px] max-sm:text-center">
      {/* `.container-5.new-home-2.most-complete-courses.dj-lessons` */}
      <div className="mx-auto flex w-full max-w-sito flex-col items-center justify-center overflow-clip px-0 pt-5">
        <TabCorso
          tabCurriculum={p.tabCurriculum}
          tabCosaImparerai={p.tabCosaImparerai}
          accordionTitolo={p.accordionTitolo}
          accordionTitoloBr={p.accordionTitoloBr}
          accordionSottotitolo={p.accordionSottotitolo}
          capitoli={p.capitoli}
          cosaImparerai={p.cosaImparerai}
          iconaFreccia={p.iconaFreccia}
          iconaSpunta={p.iconaSpunta}
          etichettaPrimoTab
        />
      </div>

      {/* `.container.brands.new-home-2.dj-course-page` */}
      {(p.prezzo || p.prezzoMobileFisso) && p.cta && p.trustpilot ? (
        <div className="mx-auto flex w-auto max-w-sito flex-col items-center justify-center bg-sfondo pb-[10px] pt-0">
          <h2 className="m-0 mt-[30px] pb-[10px] text-center text-[16px] font-light leading-[1.2] text-bianco opacity-70">
            {p.prezzoMobileFisso ? (
              /* Nessun `[data-geo]`: qui l'HTML del sito ha una frase sola. */
              <span>{p.prezzoMobileFisso}</span>
            ) : p.prezzo ? (
              <>
                <span>{p.prezzo.prima}</span>{" "}
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
                  {p.prezzo.dopo}
                </span>
              </>
            ) : null}
          </h2>

          {/* `.hero-button-group` + `a.button.enroll.homepage…signup-now`:
              80vw fino a 300px, non 90vw come quello della hero.
              È l'unico `a.button.enroll.signup-now` della pagina, cioè l'unico
              elemento che il selettore 'CTA Click' del footer Webflow prende. */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={p.cta.href}
              data-label="pick_your_course_header"
              data-event="cta_click"
              data-category="homepage"
              data-traccia="CTA Click"
              onClick={(evento) =>
                tracciaBottone(
                  /* `section` è la costante dello script del sito, commento
                     "example" compreso. Non è un testo di pagina. */
                  { evento: "CTA Click", section: "Hero Signup" },
                  evento.currentTarget
                )
              }
              className="block w-[80vw] max-w-[300px] rounded-bottone border-0 bg-mint px-6 py-[5px] text-center text-base font-normal leading-[180%] transition-all duration-500"
            >
              <span className="flex items-center justify-center gap-3">
                <span className="leading-[160%] text-nero">{p.cta.testo}</span>
              </span>
            </Link>
          </div>

          {/* `p.paragraph.home-trustpilot`: 290px fissi sotto i 480px. È il
              solo paragrafo con classe `paragraph` delle pagine corso, quindi
              il solo link che il selettore 'Trustpilot CTA Clicked' prende. */}
          <p className="m-0 w-[290px] overflow-hidden pt-[5px] text-center text-[18px] font-light leading-[180%] text-bianco">
            {p.trustpilot.prima}
            <LinkTrustpilot href={p.trustpilot.href}>
              <span className="text-mint">{p.trustpilot.link}</span>
            </LinkTrustpilot>
          </p>
        </div>
      ) : null}
    </section>
  );
}

/* ── La scheda con il video e le voci "Level / Duration / Videos…" ──── */

function SchedaCorso({
  voci,
  wistiaMediaId,
  wistiaAspect,
  nascondiEmbed = false,
  className = "",
}: {
  readonly voci: readonly VoceMetaCorso[];
  readonly wistiaMediaId: string;
  readonly wistiaAspect: string;
  /** `true` sulla copia dentro `.code-embed-12`, che il foglio spegne. */
  readonly nascondiEmbed?: boolean;
  readonly className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* `.course-preview` */}
      <div className="relative mb-5 overflow-hidden rounded-[24px] max-lg:mb-10 max-sm:mb-5">
        <VideoWistiaWebComponent
          mediaId={wistiaMediaId}
          aspect={wistiaAspect}
          nascosto={nascondiEmbed}
        />
      </div>

      {/* `.course-details`: le righe sono separate da `.spacer` alti 24px. */}
      <div className="mt-[29px]">
        {voci.map((voce, i) => (
          <div key={`${voce.etichetta}-${i}`}>
            {i > 0 ? <div className="min-h-[24px]" /> : null}
            <div
              className={`flex ${
                voce.allineaInAlto ? "items-start" : "items-center"
              }`}
            >
              <Image
                src={voce.icona}
                alt=""
                width={26}
                height={26}
                className="mr-[18px] h-[26px] w-[26px] max-sm:h-5 max-sm:w-5"
              />
              <div className="text-[18px] leading-[1.2em] text-bianco max-sm:text-left">
                {voce.etichetta}
              </div>
              {voce.valore ? (
                <div className="text-[18px] font-medium leading-[1.2em] text-mint">
                  {voce.valore}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/*
 * Il player Wistia come web component, uguale all'HTML del sito.
 *
 * `fast.wistia.com/player.js` definisce l'elemento `<wistia-player>` e
 * `fast.wistia.com/embed/<id>.js` porta i dati di quel video. Finché il
 * componente non è definito, la regola `:not(:defined)` del sito mostra la
 * miniatura sfocata con il rapporto 16:9: è copiata qui dentro uno
 * `<style>` come sul sito, perché senza di essa il riquadro ha altezza zero.
 */
function VideoWistiaWebComponent({
  mediaId,
  aspect,
  nascosto,
}: {
  readonly mediaId: string;
  readonly aspect: string;
  readonly nascosto: boolean;
}) {
  const stile = `wistia-player[media-id='${mediaId}']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }`;

  return (
    <div className={nascosto ? "hidden" : undefined}>
      <script src="https://fast.wistia.com/player.js" async />
      <script
        src={`https://fast.wistia.com/embed/${mediaId}.js`}
        async
        type="module"
      />
      <style dangerouslySetInnerHTML={{ __html: stile }} />
      {/* `wistia-player` non è un tag conosciuto da React: `createElement` con
          una stringa lo emette comunque, ed è quello che serve. */}
      {createWistiaPlayer(mediaId, aspect)}
    </div>
  );
}

function createWistiaPlayer(mediaId: string, aspect: string) {
  const Tag = "wistia-player" as unknown as "div";
  const attributi = { "media-id": mediaId, aspect } as Record<string, string>;
  return <Tag {...attributi} />;
}

/* ── I due tab e i nove capitoli ────────────────────────────────────── */

function TabCorso({
  tabCurriculum,
  tabCosaImparerai,
  accordionTitolo,
  accordionTitoloBr = 3,
  accordionSottotitolo,
  capitoli,
  cosaImparerai,
  iconaFreccia,
  iconaSpunta,
  etichettaPrimoTab = false,
}: {
  readonly tabCurriculum: string;
  readonly tabCosaImparerai: string;
  readonly accordionTitolo: string;
  readonly accordionTitoloBr?: number;
  readonly accordionSottotitolo: string;
  readonly capitoli: readonly CapitoloCorso[];
  readonly cosaImparerai: readonly string[];
  readonly iconaFreccia: Immagine;
  readonly iconaSpunta: Immagine;
  /** Sulla variante mobile il primo tab ha una `div.text-block-6` in più. */
  readonly etichettaPrimoTab?: boolean;
}) {
  const [tab, setTab] = useState<"curriculum" | "imparerai">("curriculum");
  const [aperto, setAperto] = useState<string | null>(null);

  return (
    <RivelaAllaVista className="w-full">
      {/* `.tabs-menu-course.w-tab-menu` */}
      <div className="relative mb-[73px] flex justify-center border-b border-[#cfcfdb] max-md:mb-10 max-md:flex-col max-sm:w-full max-sm:flex-row">
        <BottoneTab
          testo={tabCurriculum}
          attivo={tab === "curriculum"}
          onClick={() => setTab("curriculum")}
          conEtichetta={etichettaPrimoTab}
        />
        <BottoneTab
          testo={tabCosaImparerai}
          attivo={tab === "imparerai"}
          onClick={() => setTab("imparerai")}
        />
      </div>

      {/* `.course-tabs-content.w-tab-content` */}
      <div className="relative block overflow-hidden max-lg:mx-auto max-lg:max-w-[680px] max-sm:max-w-none">
        {tab === "curriculum" ? (
          /* `.accordion-item.new-home-2.warmup-landing…` */
          <div className="mb-5 mt-0 rounded-media bg-grigio-sfondo px-[30px] pb-[14px] pt-6 shadow-[0_3px_7px_#00000008] max-sm:px-[15px]">
            {/* `.accordion-item-trigger` */}
            <div className="flex items-start justify-between">
              {/* `h4.accordion-heading.warmup-landing.dj-course`: interlinea
                  7px e tre `<br>` di fila. Sembra un errore ed è il modo in
                  cui il sito ottiene i 21px fra titolo e sottotitolo: si
                  copia com'è. */}
              {/* Corpo e interlinea scritti come valori arbitrari e non con
                  `text-2xl` / `text-xl`: le utility `text-*` di Tailwind
                  portano con sé un'interlinea, e qui l'interlinea deve restare
                  quella del sito (7px, sì, sette: è il modo in cui Webflow
                  ottiene i 21px fra "DJ Lessons" e il conteggio delle
                  lezioni). Sul telefono l'h4 scende a 20px ma l'interlinea
                  resta 7px, perché `.warmup-landing.dj-course` è più specifica
                  della regola a ≤479. */}
              <h4 className="m-0 block flex-1 cursor-pointer pb-[10px] text-[24px] font-medium leading-[7px] tracking-[-0.8px] text-bianco max-lg:text-[22px] max-sm:py-[10px] max-sm:text-left max-sm:text-[20px] 2xl:pb-[15px]">
                {/* `.bold-text-5`: sotto i 480px diventa crema. */}
                <strong className="font-bold max-sm:text-crema">
                  {accordionTitolo}
                  {Array.from({ length: accordionTitoloBr }, (_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: sono `<br>` identici, l'indice è l'unica identità che hanno
                    <br key={i} />
                  ))}
                </strong>
                <span className="max-sm:text-[13px] max-sm:font-light">
                  <strong className="text-[15px] font-light text-mint">
                    {accordionSottotitolo}
                  </strong>
                </span>
              </h4>
              <div className="flex h-[29px] w-[43px] min-w-[43px] items-center justify-center rounded-etichetta bg-nero p-[5px]">
                <Image
                  src={iconaFreccia.src}
                  alt={iconaFreccia.alt}
                  width={iconaFreccia.larghezza}
                  height={iconaFreccia.altezza}
                />
              </div>
            </div>

            {/* `.accordion-item-content` */}
            <div className="mr-[30px] mt-[10px] flex flex-col gap-[10px] overflow-hidden max-md:mr-0">
              {capitoli.map((capitolo) => (
                <Capitolo
                  key={capitolo.numero}
                  capitolo={capitolo}
                  aperto={aperto === capitolo.numero}
                  onToggle={() =>
                    setAperto(aperto === capitolo.numero ? null : capitolo.numero)
                  }
                  iconaFreccia={iconaFreccia}
                />
              ))}
            </div>
          </div>
        ) : (
          /* La seconda scheda: cinque righe con la spunta verde. */
          <div className="flex flex-col gap-3">
            {cosaImparerai.map((voce) => (
              <div key={voce} className="flex items-center gap-[7px]">
                <Image
                  src={iconaSpunta.src}
                  alt={iconaSpunta.alt}
                  width={iconaSpunta.larghezza}
                  height={iconaSpunta.altezza}
                  className="h-5 w-5"
                />
                <p className="m-0 text-base font-normal leading-[180%] tracking-[-0.4px] text-bianco opacity-80 max-sm:text-left max-sm:text-[15px]">
                  {voce}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </RivelaAllaVista>
  );
}

/* `a.course-tab-link.upper` */
function BottoneTab({
  testo,
  attivo,
  onClick,
  conEtichetta = false,
}: {
  readonly testo: string;
  readonly attivo: boolean;
  readonly onClick: () => void;
  readonly conEtichetta?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={attivo}
      /* `.course-tab-link.upper`. Il filetto sotto passa da 4px a 1px sotto i
         768px, ma il colore resta il mint sulla scheda attiva
         (`.course-tab-link.w--current` è più specifica della regola
         responsive). Il fondo grigio della scheda attiva resta anche sul
         telefono: `.upper.w--current` batte la regola a ≤479 che lo vorrebbe
         trasparente. */
      className={`relative -bottom-px block whitespace-nowrap border-b-4 px-[30px] pb-7 pt-[9px] text-left text-[20px] leading-[1.1em] tracking-[0.01em] transition-colors duration-[350ms] max-md:border-b-[1px] max-md:py-5 max-sm:flex max-sm:items-center max-sm:justify-center ${
        attivo
          ? "border-b-mint bg-grigio-sfondo text-mint max-sm:w-[40%]"
          : "border-b-transparent bg-transparent text-[#69697b] max-md:border-b-[#cfcfdb] max-sm:w-[53%] max-sm:text-bianco"
      }`}
    >
      <span className={conEtichetta ? "block" : undefined}>{testo}</span>
    </button>
  );
}

/*
 * Un capitolo: `div.faq-item.new-home-2.warmup-landing` con dentro
 * `.faq-header.program-section` e la `<nav>` che si apre.
 *
 * Il `-mt-[40px]` sulla lista non è un aggiustamento a occhio: è il
 * `margin-top: -40px` che Webflow mette su `.faq-item-content` per riassorbire
 * i 25px di `margin-bottom` dell'intestazione. Toglierlo allarga di 40px il
 * passo fra un capitolo e l'altro.
 */
function Capitolo({
  capitolo,
  aperto,
  onToggle,
  iconaFreccia,
}: {
  readonly capitolo: CapitoloCorso;
  readonly aperto: boolean;
  readonly onToggle: () => void;
  readonly iconaFreccia: Immagine;
}) {
  return (
    /* `margin-bottom: 15px` (20 sotto i 480) su `.faq-item.new-home-2.warmup-landing`:
       si somma ai 10px di `gap` del contenitore, e senza vale 135px in meno
       sull'altezza della sezione. */
    <div className="mb-[15px] w-full rounded-media max-sm:mb-5">
      <button
        type="button"
        aria-expanded={aperto}
        onClick={onToggle}
        className="z-10 mb-[25px] flex w-full justify-between rounded-etichetta border border-solid border-bianco bg-sfondo p-4 text-left"
      >
        {/* Corpo arbitrario e non `text-base`: l'utility di Tailwind porta
            un'interlinea di 1.5rem, mentre qui deve restare quella del `body`
            del sito (170%). Con `text-base` un capitolo su due righe misurava
            48px invece di 54. */}
        <span className="pr-[30px] text-[18px] font-normal tracking-[-0.4px] text-bianco max-sm:text-[16px]">
          <span className="text-mint">{capitolo.numero}</span>
          {capitolo.titolo}
        </span>
        <span className="flex h-[29px] w-[43px] min-w-[43px] items-center justify-center rounded-etichetta bg-nero p-[5px]">
          <Image
            src={iconaFreccia.src}
            alt={iconaFreccia.alt}
            width={iconaFreccia.larghezza}
            height={iconaFreccia.altezza}
            className={`transition-transform duration-300 ${
              aperto ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: aperto ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        aria-hidden={!aperto}
        className="-mt-[40px] overflow-hidden rounded-b-media border border-solid border-bianco bg-sfondo"
      >
        {/* Chiave composta con l'indice, non il testo: su `/producer-course`
            il capitolo 3 ripete due lezioni identiche (lo fa il sito), e con
            `key={lezione}` React segnalerebbe due figli con la stessa chiave.
            Le righe duplicate si riproducono, la chiave no. */}
        {capitolo.lezioni.map((lezione, i) => (
          <div
            key={`${i}-${lezione}`}
            className={`mx-5 flex items-center gap-[7px] py-[10px] ${
              i === 0 ? "pt-10" : ""
            } ${
              i === capitolo.lezioni.length - 1
                ? ""
                : "border-b border-solid border-bianco"
            }`}
          >
            <p className="m-0 text-base font-normal leading-[180%] tracking-[-0.4px] text-bianco opacity-80 max-sm:text-left max-sm:text-[15px]">
              {lezione}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
