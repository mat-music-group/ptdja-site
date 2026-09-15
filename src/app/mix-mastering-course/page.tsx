import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BioPretolesi } from "@/components/sections/BioPretolesi";
import { BookACall } from "@/components/sections/BookACall";
import { ContenutoCorso } from "@/components/sections/ContenutoCorso";
import { CtaElite } from "@/components/sections/CtaElite";
import { ExitIntentPopup } from "@/components/sections/ExitIntentPopup";
import { Faq } from "@/components/sections/Faq";
import { HeroCorso } from "@/components/sections/HeroCorso";
import { LessonHighlights } from "@/components/sections/LessonHighlights";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { RelatedCourses } from "@/components/sections/RelatedCourses";
import { ReverseFunnel } from "@/components/sections/ReverseFunnel";
import { Reviews } from "@/components/sections/Reviews";
import { SliderIpad } from "@/components/sections/SliderIpad";
import { TitoloTuoDocente } from "@/components/sections/TitoloTuoDocente";
import { VirtualTour } from "@/components/sections/VirtualTour";
import { Trengo } from "@/components/tracking/Trengo";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  BIO,
  CONTENUTO,
  CORSI_CORRELATI,
  CORSI_CORRELATI_TITOLO,
  COSA_IMPARERAI_DESKTOP,
  COSA_IMPARERAI_MOBILE,
  CTA_ELITE,
  DOCENTE,
  DOMANDE,
  HERO,
  HIGHLIGHTS,
  JSON_LD,
  META,
  META_CORSO_DESKTOP,
  META_CORSO_MOBILE,
  REVERSE_FUNNEL,
  SLIDER_IPAD,
  VIRTUAL_TOUR,
} from "@/testi/mix-mastering-course";

/*
 * `/mix-mastering-course`, la terza delle tre pagine corso.
 *
 * Ordine dei blocchi, dall'HTML pubblicato (21 di primo livello, 19 sezioni
 * più header e footer):
 *   header → hero → "Course Content" (variante desktop) → "Course Content"
 *   (variante mobile) → titolo "Your Teacher. A pioneer. A legend." → bio di
 *   Luca Pretolesi → "A revolutionary approach to mixing" → un contenitore
 *   VUOTO → slider `ipad-slide` → virtual tour (CTA verso start.*) → virtual
 *   tour (CTA verso Typeform) → "For Advanced Producers" → "Lessons
 *   Highlights" → recensioni → listino → "Related Courses" + carosello →
 *   "Book a free call" → FAQ → footer → popup exit intent.
 *
 * Rispetto a `/dj-course`: niente carosello dei docenti, niente "The Course
 * that Adapts to You", niente "More Than a Course", niente "DJ Talent Pool®
 * Opportunities". Al loro posto le quattro sezioni proprie di questa pagina
 * (bio, reverse funnel, slider ipad, CTA Elite) e il contenitore vuoto.
 *
 * `Trengo` (la chat) sta qui e non nel layout: sul sito è custom code di
 * pagina, presente su sei pagine su undici.
 *
 * Metadati e JSON-LD da `docs/webflow/meta/mix-mastering-course.json`,
 * identici.
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

export default function MixMasteringCoursePage() {
  return (
    <>
      <JsonLd dati={JSON_LD} />
      <SiteHeader />

      {/* ── 1. Hero ──────────────────────────────────────────────────
          `section.hero-section-two-2.newheader`: nonostante il nome è la hero
          della pagina, non un header. Qui lo `<strong>` sta sulla SECONDA
          riga del paragrafo, da cui `grassettoSu: "seconda"`.

          `titoloPaddingBottom: 60`: su questa pagina il blocco dell'occhiello
          è `.section-title-17.new-home-2.course-page.dj-course`, che ha
          `padding-bottom: 60px` invece dei 40 di `.section-title-16` di
          dj-course e producer-course (a ≤479 tornano 30 per tutte). Vale 20px
          sull'altezza della pagina. */}
      <HeroCorso
        eyebrow={HERO.eyebrow}
        titolo={HERO.titolo}
        paragrafo={HERO.paragrafo}
        prezzo={HERO.prezzo}
        cta={HERO.cta}
        trustpilot={HERO.trustpilot}
        immagine={HERO.immagine}
        spaziatura={{ titoloPaddingBottom: 60 }}
      />

      {/* ── 2. "Course Content", versione desktop (41 lezioni) ───────
          Niente `bolle`: su questa pagina non c'è il gruppo di ritratti dei
          docenti (`a.course-teacher-wrapper`) che hanno dj-course e
          producer-course. `accordionTitoloBr={1}`: qui il titolo
          dell'accordion ha UN solo `<br>` e `strong.bold-text-5.program`,
          non i tre delle altre pagine. */}
      <ContenutoCorso
        variante="desktop"
        id="program"
        titolo={CONTENUTO.titolo}
        metaDesktop={META_CORSO_DESKTOP}
        metaMobile={META_CORSO_MOBILE}
        wistiaMediaId={CONTENUTO.wistiaMediaId}
        wistiaAspect={CONTENUTO.wistiaAspect}
        videoEmbedly={CONTENUTO.videoEmbedly}
        tabCurriculum={CONTENUTO.tabCurriculum}
        tabCosaImparerai={CONTENUTO.tabCosaImparerai}
        accordionTitolo={CONTENUTO.accordionTitoloDesktop}
        accordionTitoloBr={1}
        /* `strong.bold-text-5.program { line-height: 24px }`: solo qui lo
           strong ha la classe `program`. Con l'interlinea ereditata (7px) e
           un `<br>` solo il sottotitolo finiva sopra il titolo. */
        accordionTitoloInterlinea={24}
        accordionSottotitolo={CONTENUTO.accordionSottotitoloDesktop}
        capitoli={CONTENUTO.capitoli}
        cosaImparerai={COSA_IMPARERAI_DESKTOP}
        iconaFreccia={CONTENUTO.iconaFreccia}
        iconaSpunta={CONTENUTO.iconaSpunta}
      />

      {/* ── 3. "Course Content", versione mobile (24 lezioni) ────────
          `prezzoMobileFisso`: qui il prezzo NON è geo-gated come su
          dj-course, è un `p.section-subtitle` con il testo fisso in dollari.
          Anche le prime due voci di "What you'll learn" sono diverse da
          quelle della versione desktop: è così sul sito. */}
      <ContenutoCorso
        variante="mobile"
        titolo={CONTENUTO.titolo}
        metaDesktop={META_CORSO_DESKTOP}
        metaMobile={META_CORSO_MOBILE}
        wistiaMediaId={CONTENUTO.wistiaMediaId}
        wistiaAspect={CONTENUTO.wistiaAspect}
        videoEmbedly={CONTENUTO.videoEmbedly}
        tabCurriculum={CONTENUTO.tabCurriculum}
        tabCosaImparerai={CONTENUTO.tabCosaImparerai}
        accordionTitolo={CONTENUTO.accordionTitoloMobile}
        accordionSottotitolo={CONTENUTO.accordionSottotitoloMobile}
        /* Solo qui: sul sito i sei capitoli di questa variante sono aperti al
           caricamento, perché l'interazione che li chiuderebbe non è
           agganciata. La variante `#program` della stessa pagina resta
           chiusa. Vedi la prop in `ContenutoCorso`. */
        capitoliApertiAllInizio
        capitoli={CONTENUTO.capitoli}
        cosaImparerai={COSA_IMPARERAI_MOBILE}
        iconaFreccia={CONTENUTO.iconaFreccia}
        iconaSpunta={CONTENUTO.iconaSpunta}
        prezzoMobileFisso={CONTENUTO.prezzoMobileFisso}
        cta={HERO.cta}
        trustpilot={HERO.trustpilot}
      />

      {/* ── 4 e 5. Il docente e la sua bio ──────────────────────────── */}
      <TitoloTuoDocente
        titoloPrima={DOCENTE.titoloPrima}
        titoloEvidenziato={DOCENTE.titoloEvidenziato}
        titoloDopo={DOCENTE.titoloDopo}
      />
      <BioPretolesi
        immagine={BIO.immagine}
        titoloRiga1={BIO.titoloRiga1}
        titoloRiga2={BIO.titoloRiga2}
        nomeEvidenziato={BIO.nomeEvidenziato}
        dopoNome={BIO.dopoNome}
        esperienzaEvidenziata={BIO.esperienzaEvidenziata}
        dopoEsperienza={BIO.dopoEsperienza}
        grammyEvidenziato={BIO.grammyEvidenziato}
        titoloCollaborazioni={BIO.titoloCollaborazioni}
        collaborazioni={BIO.collaborazioni}
      />

      {/* ── 6. "A revolutionary approach to mixing" ──────────────────
          Sul sito è `display: none` sopra i 479px: si vede solo sul telefono.
          Vedi la nota in `ReverseFunnel.tsx`. */}
      <ReverseFunnel
        titoloEvidenziato1={REVERSE_FUNNEL.titoloEvidenziato1}
        titoloDopo1={REVERSE_FUNNEL.titoloDopo1}
        titoloRiga2={REVERSE_FUNNEL.titoloRiga2}
        titoloEvidenziato2={REVERSE_FUNNEL.titoloEvidenziato2}
        titoloDopo2={REVERSE_FUNNEL.titoloDopo2}
        paragrafoPrima={REVERSE_FUNNEL.paragrafoPrima}
        paragrafoEvidenziato={REVERSE_FUNNEL.paragrafoEvidenziato}
        paragrafoDopo={REVERSE_FUNNEL.paragrafoDopo}
        paragrafoCarta={REVERSE_FUNNEL.paragrafoCarta}
      />

      {/* ── 7. Il contenitore vuoto ─────────────────────────────────
          `div.w-layout-blockcontainer.container.new-home-2.talent-pool.w-container`:
          nell'HTML pubblicato non ha nessun contenuto. Essendo un flex senza
          figli e senza padding verticale è alto zero e non si vede, ma esiste:
          si riproduce così com'è invece di cancellarlo. */}
      <div className="mx-auto flex w-auto max-w-sito flex-col items-center justify-end bg-sfondo px-[30px] max-lg:max-w-[768px] max-md:max-w-[600px] max-sm:overflow-clip max-sm:px-0 max-sm:pb-0" />

      {/* ── 8. Lo slider dei tre passi del Reverse Funnel ──────────── */}
      <SliderIpad slide={SLIDER_IPAD} />

      {/* ── 9 e 10. Il virtual tour, due volte, con due CTA diverse ── */}
      <VirtualTour
        eyebrow={VIRTUAL_TOUR.eyebrowPrima}
        titoloRiga1={VIRTUAL_TOUR.titoloRiga1}
        titoloRiga2={VIRTUAL_TOUR.titoloRiga2}
        iframe={VIRTUAL_TOUR.iframe}
        cta={VIRTUAL_TOUR.cta}
        href={VIRTUAL_TOUR.hrefPrima}
        sottotesto={VIRTUAL_TOUR.sottotesto}
      />
      <VirtualTour
        eyebrow={VIRTUAL_TOUR.eyebrowSeconda}
        titoloRiga1={VIRTUAL_TOUR.titoloRiga1}
        titoloRiga2={VIRTUAL_TOUR.titoloRiga2}
        iframe={VIRTUAL_TOUR.iframe}
        cta={VIRTUAL_TOUR.cta}
        href={VIRTUAL_TOUR.hrefSeconda}
        sottotesto={VIRTUAL_TOUR.sottotesto}
      />

      {/* ── 11. "For Advanced Producers." ───────────────────────────── */}
      <CtaElite
        titoloPrima={CTA_ELITE.titoloPrima}
        titoloEvidenziato={CTA_ELITE.titoloEvidenziato}
        paragrafo={CTA_ELITE.paragrafo}
        immagine={CTA_ELITE.immagine}
      />

      {/* ── 12. "Lessons Highlights" ────────────────────────────────
          Senza `id`: su questa pagina la sezione non ha `id="highlights"`,
          che invece c'è su `/dj-course`. */}
      <LessonHighlights
        titoloPrima={HIGHLIGHTS.titoloPrima}
        titoloEvidenziato={HIGHLIGHTS.titoloEvidenziato}
        blocchi={HIGHLIGHTS.blocchi}
        iconaSpunta={HIGHLIGHTS.iconaSpunta}
      />

      {/* ── 13 e 14. Recensioni e listino (condivisi) ──────────────── */}
      <Reviews />
      <PricingPlans />

      {/* ── 15 e 16. "Related Courses" ─────────────────────────────── */}
      <RelatedCourses
        titoloEvidenziato={CORSI_CORRELATI_TITOLO.evidenziato}
        titoloResto={CORSI_CORRELATI_TITOLO.resto}
        corsi={CORSI_CORRELATI}
      />

      {/* ── 17 e 18. "Book a free call" e FAQ (condivisi) ──────────── */}
      <BookACall />
      {/* `tutteAperte`: solo su questa pagina la FAQ è già aperta al
          caricamento, perché l'interazione che scriverebbe `height: 0px` sulle
          risposte non è agganciata. Vedi la prop in `Faq`. */}
      <Faq domande={DOMANDE} tutteAperte />

      <SiteFooter />
      <ExitIntentPopup />
      <Trengo />
    </>
  );
}
