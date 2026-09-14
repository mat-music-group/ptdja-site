import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ExitIntentPopup } from "@/components/sections/ExitIntentPopup";
import { Faq } from "@/components/sections/Faq";
import { OpportunitaTalentPool } from "@/components/sections/OpportunitaTalentPool";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { Reviews } from "@/components/sections/Reviews";
import { SliderCorsi } from "@/components/sections/SliderCorsi";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { Trengo } from "@/components/tracking/Trengo";
import { DynTube } from "@/components/ui/DynTube";
import { JsonLd } from "@/components/ui/JsonLd";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";
import { SliderWebflow } from "@/components/ui/SliderWebflow";
import { VideoWistia } from "@/components/ui/VideoWistia";
import {
  AWARDS,
  COME_FUNZIONA,
  CORSI,
  DOMANDE,
  ESPLORA_CORSI,
  HERO,
  JSON_LD,
  META,
  OPPORTUNITA,
  SUCCESS_STORIES,
} from "@/testi/play-get-signed";

/*
 * `/play-get-signed`.
 *
 * Ordine dei blocchi, dall'outline (15 di primo livello):
 *   header → hero col video Wistia → "How it Works" → slider dei 3 passi →
 *   "Access Tailored Opportunities" → sezione vuota `the-team` →
 *   "Student Success Stories" → "The Future Talent Awards®" con DynTube →
 *   "Explore the Courses & Build Your Plan" → slider dei 3 corsi →
 *   recensioni → listino → FAQ → footer → popup exit intent.
 *
 * `Trengo` (la chat) sta qui e non nel layout: sul sito è custom code di
 * pagina, presente su sei pagine su undici.
 *
 * Le tre `RivelaAllaVista` corrispondono esattamente ai tre elementi che
 * nell'HTML pubblicato hanno `data-w-id` **e** `style="opacity:0"`: il titolo
 * della hero, quello di "How it Works" e quello di "Explore the Courses".
 * Tutti gli altri `data-w-id` della pagina sono interazioni di click (il
 * toggle Producers/DJs) o non hanno nessuno stato iniziale nascosto: lì non
 * si anima niente, perché sul sito non si anima niente.
 *
 * Metadati e JSON-LD da `docs/webflow/meta/play-get-signed.json`, identici.
 */

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  alternates: { canonical: META.canonical },
  openGraph: {
    title: META.title,
    description: META.description,
    images: [META.ogImage],
    type: "website",
    url: META.ogUrl,
    siteName: META.ogSiteName,
  },
  twitter: {
    card: "summary_large_image",
    title: META.title,
    description: META.description,
    images: [META.ogImage],
  },
};

/* `h2.section-title-heading.p4`: 56px peso 300, bianco, centrato. */
const TITOLO_P4 =
  "m-0 text-center text-[56px] font-light leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:text-[32px]";

/* `.container` / `.container.new-home-2`: colonna centrata, max 1380px,
   30px di padding orizzontale che sotto i 480px vanno a zero. */
const CONTAINER =
  "mx-auto flex w-auto max-w-sito flex-col items-center justify-end bg-sfondo px-[30px] max-sm:px-0";

/* `.feature-section.section-padding.remove-bottom-padding` a secco. */
const SEZIONE =
  "block bg-sfondo pt-sezione pb-0 max-lg:pt-20 max-md:pt-[60px] max-sm:px-[30px] max-sm:pt-[50px] max-sm:text-center";

export default function PlayGetSignedPage() {
  return (
    <>
      <JsonLd dati={JSON_LD} />
      <SiteHeader />

      {/* ── 1. Hero ──────────────────────────────────────────────────
          `.hero-section…talent-pool-page.hero-space-section`: nessun padding
          verticale sul desktop (lo spazio sotto l'header è dell'header), 140px
          a 991, 130px a 767, di nuovo 0 sotto i 480. */}
      <section className="overflow-hidden bg-sfondo py-0 max-lg:pt-[140px] max-md:pt-[130px] max-sm:pt-0">
        {/* I 30px sopra e sotto NON sono una scelta di gusto: `.container-5`
            è un `.w-container`, e il clearfix `:before`/`:after` che Webflow
            gli mette (`content:" "; display:table`) dentro un contenitore
            flex diventa due elementi flex alti zero. Con `gap: 30px` il
            risultato è esattamente 30px di aria in cima e in fondo alla
            colonna, verificati misurando il sito live (titolo a y=122 con la
            sezione che parte da y=92). Sotto i 480px il gap è 20px. */}
        <div className="mx-auto flex w-auto max-w-sito flex-col items-center justify-center gap-[30px] bg-sfondo px-[30px] py-[30px] max-lg:max-w-[768px] max-md:max-w-[600px] max-sm:w-full max-sm:gap-5 max-sm:overflow-clip max-sm:py-5">
          <div className="flex w-full flex-col items-center justify-center max-lg:mx-auto max-lg:w-[70%] max-md:w-full max-sm:rounded-media max-sm:text-center">
            <RivelaAllaVista className="flex flex-col items-center gap-[30px] pb-0 text-center">
              <p className="mt-[30px] pb-0 text-left text-base font-light uppercase leading-[180%] tracking-normal text-bianco opacity-70 max-sm:pb-[5px] max-sm:normal-case">
                {HERO.eyebrow}
              </p>
              <h2 className={TITOLO_P4}>
                {HERO.titoloRiga1}
                <br />
                {HERO.titoloRiga2}
                <span className="font-semibold">{HERO.titoloEvidenziato}</span>
              </h2>
            </RivelaAllaVista>
          </div>

          {/* `.feature-tabs-wrapper-2.video-container…container-video-border`:
              75% della colonna fino a 480px, poi tutta larghezza. */}
          <div className="flex w-[75%] flex-row items-center justify-center rounded-media max-sm:w-full max-sm:flex-col max-sm:overflow-hidden">
            <VideoWistia
              src={HERO.video.src}
              titolo={HERO.video.titolo}
              larghezza={HERO.video.larghezza}
              altezza={HERO.video.altezza}
              proporzione={HERO.video.proporzione}
              className="block overflow-hidden rounded-media max-sm:rounded-[20px]"
            />
          </div>

          {/* `a.button.link.link-secondary`: un link di testo, non un bottone.
              La freccia è il glifo `` di Font Awesome, che il sito carica
              e questo repo no: qui è lo stesso chevron disegnato in SVG. */}
          <a
            href={HERO.cta.href}
            className="group inline-block max-w-full rounded-[120px] border-0 p-0 text-left text-base font-normal leading-[180%] transition-all duration-500"
          >
            <span className="flex items-center justify-center gap-3">
              <span className="text-left leading-[160%] text-mint">
                {HERO.cta.testo}
              </span>
              <span className="relative flex justify-end overflow-visible text-mint">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M9 4 L17 12 L9 20"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </a>
        </div>
      </section>

      {/* ── 2. "How it Works" ───────────────────────────────────────
          `.remove30` porta il padding-top a 90px (30px sotto i 480). */}
      <section
        id="choosecourse"
        className="block bg-sfondo pb-0 pt-[90px] max-sm:px-[30px] max-sm:pt-[30px] max-sm:text-center"
      >
        <div className={`${CONTAINER} max-sm:overflow-clip max-sm:pb-0`}>
          <div className="max-lg:mx-auto max-lg:w-[70%] max-md:w-full max-sm:flex max-sm:flex-col max-sm:gap-10">
            <RivelaAllaVista className="flex flex-col items-center gap-[30px] pb-[30px] text-center max-lg:pb-[50px] max-md:pb-10 max-sm:gap-5 max-sm:pb-0">
              <h2 className={TITOLO_P4}>
                {COME_FUNZIONA.titoloPrima}
                <span className="font-semibold">
                  {COME_FUNZIONA.titoloEvidenziato}
                </span>
              </h2>
            </RivelaAllaVista>
          </div>
        </div>
      </section>

      {/* ── 3. Slider dei tre passi ─────────────────────────────────
          Stesso `.slider-79` dei corsi: maschera larga quanto le tre slide
          da 350px, frecce nascoste sopra i 991px, pallini mai visibili. */}
      <SliderWebflow
        etichetta="How it works"
        perVista={{ desktop: 3, mobile: 1 }}
        pallini={false}
        classeFrecce="hidden max-lg:flex"
        className="flex w-full items-center justify-center overflow-visible bg-sfondo px-[50px] py-[25px] max-sm:overflow-hidden max-sm:pb-0 max-sm:pt-5"
        classeMask="w-[1050px] max-w-full max-sm:w-full"
        classeSlide="px-5 max-sm:px-[5px]"
        slide={COME_FUNZIONA.passi.map((passo, i) => (
          <div
            key={passo.immagine.src}
            className="relative flex min-w-[200px] flex-col overflow-visible rounded-[12px] p-[10px] text-center max-sm:block max-sm:min-w-0 max-sm:rounded-media max-sm:p-5"
          >
            <Image
              src={passo.immagine.src}
              alt={passo.immagine.alt}
              width={passo.immagine.larghezza}
              height={passo.immagine.altezza}
              className="h-auto w-full rounded-[20px] max-sm:rounded-media max-sm:object-contain"
            />
            {/* `.paragraph.home-trustpilot…testo-left`: 18px, grassetto.
                Solo la prima slide ha `.interlinea-testo` (interlinea 145%). */}
            <p
              className={`m-0 block overflow-hidden pt-[10px] text-left text-[18px] font-bold tracking-[-0.8px] text-bianco ${
                i === 0 ? "leading-[145%]" : "leading-[180%]"
              }`}
            >
              {passo.titolo}
            </p>
            <p className="mt-0 w-full max-w-[520px] pb-0 text-left text-base font-light leading-[180%] tracking-[-0.4px] text-bianco opacity-75 max-sm:opacity-100">
              {passo.testo}
              <br />
            </p>
          </div>
        ))}
      />

      {/* ── 4. "Access Tailored Opportunities" ──────────────────────── */}
      <OpportunitaTalentPool
        id={OPPORTUNITA.id}
        etichetteToggle={{
          sinistra: OPPORTUNITA.toggle.producers,
          destra: OPPORTUNITA.toggle.djs,
        }}
        pannelloDj={OPPORTUNITA.pannelloDj}
        pannelloProducerDesktop={OPPORTUNITA.pannelloProducerDesktop}
        pannelloProducerMobile={OPPORTUNITA.pannelloProducerMobile}
        titolo={
          <h2
            className={`${TITOLO_P4} font-light`}
          >
            {OPPORTUNITA.titoloPrima}
            <br />
            {"‍"}
            <span>
              {/* `font-bold` esplicito: il foglio Webflow dichiara
                  `strong { font-weight: bold }` (700 assoluto), mentre la
                  preflight di Tailwind usa `bolder`, che è relativo. Dentro un
                  titolo di peso 300 `bolder` vale 400, e "Opportunities"
                  verrebbe più magro che sul sito. */}
              <strong className="font-bold">
                {OPPORTUNITA.titoloEvidenziato}
              </strong>
            </span>
          </h2>
        }
      />

      {/* ── 5. La sezione vuota `the-team` ──────────────────────────
          Nell'HTML è una `<section>` dentro una `<section>`, senza nessun
          contenuto. Il CSS azzera il padding di entrambe, quindi occupa zero
          pixel: non si vede e non sposta niente. Si riproduce comunque, perché
          il riferimento è l'HTML e domani qualcuno potrebbe metterci dentro
          qualcosa. Segnalata fra le anomalie. */}
      <section className="block overflow-hidden bg-sfondo p-0 max-sm:px-[30px]">
        <section className="block bg-sfondo p-0" />
      </section>

      {/* ── 6. "Student Success Stories" ─────────────────────────────── */}
      <SuccessStories
        titoloPrima={SUCCESS_STORIES.titoloPrima}
        titoloEvidenziato={SUCCESS_STORIES.titoloEvidenziato}
        immagini={SUCCESS_STORIES.immagini}
      />

      {/* ── 7. "The Future Talent Awards®" ───────────────────────────
          Secondo `id="choosecourse"` della pagina: nell'HTML ce ne sono due
          uguali. Un id duplicato è un difetto del sito: si riproduce. */}
      <section id="choosecourse" className={SEZIONE}>
        <div className={`${CONTAINER} max-sm:overflow-clip max-sm:pb-0`}>
          <div className="mx-auto flex w-full flex-col items-center gap-16 text-center max-lg:w-[70%] max-md:w-full max-sm:gap-5">
            <div className="flex flex-col items-center gap-[30px] pb-0 text-center max-sm:gap-5">
              <p className="mt-0 pb-0 text-center text-base font-light uppercase leading-[180%] tracking-[3px] text-bianco opacity-70">
                {AWARDS.eyebrow}
              </p>
              <Image
                src={AWARDS.logo.src}
                alt={AWARDS.logo.alt}
                width={AWARDS.logo.larghezza}
                height={AWARDS.logo.altezza}
                className="h-auto"
                style={{ width: AWARDS.logo.larghezzaResa }}
              />
              <h2 className="m-0 text-center text-[56px] font-normal leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:text-[32px]">
                {AWARDS.titoloRiga1}
                <br />
                {AWARDS.titoloRiga2}
                <br />
              </h2>
            </div>

            {/* `.feature-section.section-padding.big-prhase` (con il refuso):
                è l'unica sezione della pagina che tiene anche il padding
                inferiore, e ha la filigrana `forma.png` come sfondo. */}
            <section className="block w-full bg-sfondo bg-[url('/webflow/shared/forma.png')] bg-contain bg-[position:50%] bg-repeat-y py-sezione max-lg:py-20 max-md:py-[60px] max-sm:bg-repeat-x max-sm:pb-0 max-sm:pt-[50px]">
              <div className={`${CONTAINER} max-sm:pb-[10px]`}>
                <div className="mx-auto flex w-full flex-col items-center gap-16 text-center max-lg:w-[70%] max-md:w-full">
                  <div className="flex flex-col items-center gap-[30px] pb-0 text-center">
                    <h2 className="m-0 text-center text-[40px] font-medium leading-[130%] tracking-[-1.8px] text-bianco max-md:text-[32px] max-sm:text-[28px]">
                      {AWARDS.statement.map((pezzo, i) => (
                        <span key={`${i}-${pezzo.testo}`}>
                          <span className={pezzo.evidenziato ? "text-mint" : ""}>
                            {pezzo.testo}
                          </span>
                          {pezzo.aCapo ? <br /> : null}
                        </span>
                      ))}
                    </h2>
                  </div>
                </div>
              </div>
            </section>

            {/* `.code-embed-2`: raggio 25px e 64px di spazio sotto. */}
            <DynTube chiave={AWARDS.dyntube} className="w-full rounded-media pb-16" />
          </div>
        </div>
      </section>

      {/* ── 8. "Explore the Courses & Build Your Plan" ───────────────── */}
      <section className={SEZIONE}>
        <div className={`${CONTAINER} max-sm:pb-[10px]`}>
          <div className="flex w-full flex-col items-center justify-center max-lg:mx-auto max-lg:w-[70%] max-md:w-full max-sm:gap-5 max-sm:rounded-media max-sm:text-center">
            <div className="max-lg:mx-auto max-lg:w-[70%] max-md:w-full max-sm:flex max-sm:flex-col max-sm:gap-10 max-sm:pt-0">
              <RivelaAllaVista className="flex flex-col items-center gap-[30px] pb-[30px] text-center max-lg:pb-[50px] max-md:pb-10 max-sm:gap-5 max-sm:pb-0">
                <h2 className={TITOLO_P4}>
                  {ESPLORA_CORSI.titoloPrima}
                  <span className="font-semibold">
                    {ESPLORA_CORSI.titoloCorsi}
                  </span>
                  <br />
                  {ESPLORA_CORSI.titoloE}
                  <span className="font-semibold">
                    {ESPLORA_CORSI.titoloBuild}
                  </span>
                  {ESPLORA_CORSI.titoloDopo}
                </h2>
                <p className="mt-0 w-full max-w-[520px] pb-0 text-base font-light leading-[180%] tracking-[-0.4px] text-bianco opacity-75 max-sm:text-center max-sm:opacity-100">
                  {ESPLORA_CORSI.paragrafo}
                </p>
              </RivelaAllaVista>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Slider dei tre corsi ─────────────────────────────────── */}
      <SliderCorsi corsi={CORSI} />

      {/* ── 10-12. Recensioni, listino, FAQ (condivisi) ─────────────── */}
      <Reviews />
      <PricingPlans />
      <Faq domande={DOMANDE} />

      <SiteFooter />
      <ExitIntentPopup />
      <Trengo />
    </>
  );
}
