import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AdattaATe } from "@/components/sections/AdattaATe";
import { BookACall } from "@/components/sections/BookACall";
import { ContenutoCorso } from "@/components/sections/ContenutoCorso";
import { ExitIntentPopup } from "@/components/sections/ExitIntentPopup";
import { Faq } from "@/components/sections/Faq";
import { HeroCorso } from "@/components/sections/HeroCorso";
import { LessonHighlights } from "@/components/sections/LessonHighlights";
import { MoreThanACourse } from "@/components/sections/MoreThanACourse";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { RelatedCourses } from "@/components/sections/RelatedCourses";
import { Reviews } from "@/components/sections/Reviews";
import { SliderDocenti } from "@/components/sections/SliderDocenti";
import { TalentPoolCorso } from "@/components/sections/TalentPoolCorso";
import { TitoloDocentiCorso } from "@/components/sections/TitoloDocentiCorso";
import { VirtualTour } from "@/components/sections/VirtualTour";
import { Trengo } from "@/components/tracking/Trengo";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  ADATTA,
  BOLLE_DOCENTI,
  CONTENUTO,
  CORSI_CORRELATI,
  CORSI_CORRELATI_TITOLO,
  DOCENTI,
  DOMANDE,
  HERO,
  HIGHLIGHTS,
  JSON_LD,
  META,
  META_CORSO_DESKTOP,
  META_CORSO_MOBILE,
  TALENT_POOL,
  VIRTUAL_TOUR,
} from "@/testi/dj-course";

/*
 * `/dj-course`, la prima delle tre pagine corso.
 *
 * Ordine dei blocchi, dall'outline (21 di primo livello, 19 sezioni più header
 * e footer):
 *   header → hero → "Course Content" (variante desktop) → "Course Content"
 *   (variante mobile) → titolo "DJ Course Teachers" → carosello dei docenti →
 *   virtual tour (CTA verso start.*) → virtual tour (CTA verso Typeform) →
 *   "The Course that Adapts to You" (slider) → la stessa in versione accordion
 *   (mai visibile) → "More Than a Course" → "Lessons Highlights" → "DJ Talent
 *   Pool® Opportunities" → recensioni → listino → "Related Courses" +
 *   carosello → "Book a free call" → FAQ → footer → popup exit intent.
 *
 * `Trengo` (la chat) sta qui e non nel layout: sul sito è custom code di
 * pagina, presente su sei pagine su undici.
 *
 * Le `RivelaAllaVista` stanno dentro i componenti, esattamente sugli elementi
 * che nell'HTML pubblicato hanno `data-w-id` **e** `style="opacity:0"`: il
 * titolo "Course Content", la colonna `.sidebar.course`, il blocco dei tab, i
 * titoli delle sezioni docenti / highlights / talent pool / related, il
 * paragrafo del talent pool. Gli altri `data-w-id` della pagina sono
 * interazioni di click (i toggle) o di slider, e lì non si anima niente perché
 * sul sito, al primo caricamento, non si anima niente.
 *
 * Metadati e JSON-LD da `docs/webflow/meta/dj-course.json`, identici.
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

export default function DjCoursePage() {
  return (
    <>
      <JsonLd dati={JSON_LD} />
      <SiteHeader />

      {/* ── 1. Hero ──────────────────────────────────────────────────
          `section.hero-section-two-2.newheader`: nonostante il nome è la hero
          della pagina, non un header. */}
      <HeroCorso
        eyebrow={HERO.eyebrow}
        titolo={HERO.titolo}
        paragrafo={HERO.paragrafo}
        prezzo={HERO.prezzo}
        cta={HERO.cta}
        trustpilot={HERO.trustpilot}
        immagine={HERO.immagine}
        /* Solo qui: `.container-66.header-space--mob` a ≤479 riporta a 0 i
           35px sotto il contenitore dell'immagine, che producer e
           mix-mastering invece tengono. */
        spazioSottoImmagineMobile={false}
      />

      {/* ── 2. "Course Content", versione desktop (222 lezioni) ────── */}
      <ContenutoCorso
        variante="desktop"
        id="program"
        idTitolo="dj-coursecontent"
        titolo={CONTENUTO.titolo}
        bolle={BOLLE_DOCENTI}
        metaDesktop={META_CORSO_DESKTOP}
        metaMobile={META_CORSO_MOBILE}
        wistiaMediaId={CONTENUTO.wistiaMediaId}
        wistiaAspect={CONTENUTO.wistiaAspect}
        videoEmbedly={CONTENUTO.videoEmbedly}
        tabCurriculum={CONTENUTO.tabCurriculum}
        tabCosaImparerai={CONTENUTO.tabCosaImparerai}
        accordionTitolo={CONTENUTO.accordionTitolo}
        accordionSottotitolo={CONTENUTO.accordionSottotitoloDesktop}
        capitoli={CONTENUTO.capitoli}
        cosaImparerai={CONTENUTO.cosaImparerai}
        iconaFreccia={CONTENUTO.iconaFreccia}
        iconaSpunta={CONTENUTO.iconaSpunta}
      />

      {/* ── 3. "Course Content", versione mobile (130 lezioni) ─────── */}
      <ContenutoCorso
        variante="mobile"
        titolo={CONTENUTO.titolo}
        bolle={BOLLE_DOCENTI}
        metaDesktop={META_CORSO_DESKTOP}
        metaMobile={META_CORSO_MOBILE}
        wistiaMediaId={CONTENUTO.wistiaMediaId}
        wistiaAspect={CONTENUTO.wistiaAspect}
        videoEmbedly={CONTENUTO.videoEmbedly}
        tabCurriculum={CONTENUTO.tabCurriculum}
        tabCosaImparerai={CONTENUTO.tabCosaImparerai}
        accordionTitolo={CONTENUTO.accordionTitolo}
        accordionSottotitolo={CONTENUTO.accordionSottotitoloMobile}
        capitoli={CONTENUTO.capitoli}
        cosaImparerai={CONTENUTO.cosaImparerai}
        iconaFreccia={CONTENUTO.iconaFreccia}
        iconaSpunta={CONTENUTO.iconaSpunta}
        prezzo={HERO.prezzo}
        cta={HERO.cta}
        trustpilot={HERO.trustpilot}
      />

      {/* ── 4 e 5. Docenti ─────────────────────────────────────────── */}
      <TitoloDocentiCorso
        titoloRiga1={DOCENTI.titoloRiga1}
        titoloEvidenziato={DOCENTI.titoloEvidenziato}
      />
      <SliderDocenti slide={DOCENTI.slide} />

      {/* ── 6 e 7. Il virtual tour, due volte, con due CTA diverse ─── */}
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

      {/* ── 8. "The Course that Adapts to You" (versione slider) ───── */}
      <AdattaATe
        variante="slider"
        titoloPrima={ADATTA.titoloPrima}
        titoloEvidenziato={ADATTA.titoloEvidenziato}
        titoloDopo={ADATTA.titoloDopo}
        toggleAvanzato={ADATTA.toggleAvanzato}
        togglePrincipiante={ADATTA.togglePrincipiante}
        principiante={ADATTA.slider.principiante}
        avanzato={ADATTA.slider.avanzato}
        togglePannelloPrincipiante={ADATTA.slider.togglePrincipiante}
        togglePannelloAvanzato={ADATTA.slider.toggleAvanzato}
      />

      {/* ── 9. La stessa sezione in versione accordion ──────────────
          `.container-31` è `display: none` a ogni breakpoint: questo blocco
          esiste nel DOM del sito e non si vede mai. Si riproduce lo stesso. */}
      <AdattaATe
        variante="accordion"
        titoloPrima={ADATTA.titoloPrima}
        titoloEvidenziato={ADATTA.titoloEvidenziato}
        titoloDopo={ADATTA.titoloDopoAccordion}
        toggleAvanzato={ADATTA.toggleAvanzato}
        togglePrincipiante={ADATTA.togglePrincipiante}
        principiante={ADATTA.accordion.principiante}
        avanzato={ADATTA.accordion.avanzato}
      />

      {/* ── 10. "More Than a Course" (condivisa) ───────────────────── */}
      <MoreThanACourse />

      {/* ── 11. "Lessons Highlights" ───────────────────────────────── */}
      <LessonHighlights
        id="highlights"
        titoloPrima={HIGHLIGHTS.titoloPrima}
        titoloEvidenziato={HIGHLIGHTS.titoloEvidenziato}
        blocchi={HIGHLIGHTS.blocchi}
        iconaSpunta={HIGHLIGHTS.iconaSpunta}
      />

      {/* ── 12. "DJ Talent Pool® Opportunities" ────────────────────── */}
      <TalentPoolCorso
        eyebrow={TALENT_POOL.eyebrow}
        titoloRiga1={TALENT_POOL.titoloRiga1}
        titoloRiga2={TALENT_POOL.titoloRiga2}
        paragrafo={TALENT_POOL.paragrafo}
        opportunita={TALENT_POOL.opportunita}
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
      <Faq domande={DOMANDE} />

      <SiteFooter />
      <ExitIntentPopup />
      <Trengo />
    </>
  );
}
