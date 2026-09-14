# Inventario sito Webflow PTDJA

> Estratto via Webflow MCP il 2026-09-14. Sito `677f9e71c11a68b86359df57`, domini `www.petetong-djacademy.com` e `petetong-djacademy.com`, ultimo publish 2026-09-11.

## Numeri

| Cosa | Quanti |
|---|---|
| Pagine totali in Webflow | 131 |
| di cui pubblicata, fuori sitemap | 42 |
| di cui bozza | 28 |
| di cui virtual tour | 26 |
| di cui vecchia o utility | 11 |
| di cui in sitemap | 10 |
| di cui template CMS | 8 |
| di cui thank you | 6 |
| Collezioni CMS | 8: Blogs (22 item), Authors, Categories, Teachers' Images (1), Menu Items (0), Products, SKUs, Integrations (residui del template) |
| Asset | 1048 |
| Locale | solo inglese, localizzazione disattivata |

## Sitemap live (18 URL)

10 pagine statiche: home, terms-conditions, terms-conditions-sa, advanced-djs, play-get-signed, dj-course, producer-course, pricing-page, recess, mix-mastering-course. Più 8 articoli blog.

## Custom code a livello sito (head)

- Refersion (affiliate)
- Trustpilot widget
- GTM web `GTM-WLFQB5G` caricato via server GTM Stape (`sgtm.petetong-djacademy.com`, loader custom)
- **cb push v2.2**: attribuzione e identità (`attr_*`, `ptdja_uid`, decorazione dei link verso `cart.petetong-djacademy.com` con `customer[cf_*]`), con gating sul consenso Iubenda
- Microsoft Clarity `qgyx8qgz1i`
- Mixpanel (istanza EU, `debug: true` in produzione, cookie cross subdomain)
- Optibase (A/B test)
- Flowbase tooltip booster
- `vt-quiz.js` del landing kit (punta a `start.petetong-djacademy.com/virtualtour-form`)

## Custom code a livello sito (footer)

- GTM noscript
- Tracking Mixpanel: page view, CTA, navbar, Trustpilot, Calendly, FAQ, carosello corsi, form BP Lite, pricing checkout (rileva il piano dal DOM), alias su thank you page, lead Typeform via `?email=`
- **track.js** proprietario: `data-brand="ptdja"`, `data-landing="sito"`, `data-engagement="off"`

## Terze parti viste sulla home (HTML live)

Iubenda CMP, Intellimize (personalizzazione, non nel custom code sito: a livello pagina o app), Typeform, Feedspace (recensioni), Lottie, Wistia, YouTube, Calendly, Chargebee (link `cart.petetong-djacademy.com` con `item_price_id` USD), webfont.js (Google Fonts). Circa 59 elementi con interazioni Webflow (`data-w-id`) sulla sola home.

## Elenco pagine

| Slug | Titolo | Categoria |
|---|---|---|
| `bfpreview25` | Unlock the secret page | bozza |
| `black-friday` | Black Friday / Pete Tong DJ Academy | bozza |
| `black-friday-member-only-upgrade-pete-tong-dj-academy` | Black Friday Member-Only Upgrade / Pete Tong DJ Academy | bozza |
| `blog` | Blog | bozza |
| `changelog` | Changelog | bozza |
| `contact-us-not` | Contact | bozza |
| `dj-course-full-path-old` | Full Course DJ Path | bozza |
| `dj-course-post-sep` | DJ Course / Pete Tong DJ Academy | bozza |
| `exclusive-black-friday-offer2` | Exclusive Black Friday Offer / Pete Tong DJ Academy | bozza |
| `exclusive-news` | Exclusive Preview / Pete Tong DJ Academy | bozza |
| `exclusive-pre-black-friday-offer` | Exclusive Pre-Black Friday Offer / Pete Tong DJ Academy | bozza |
| `holiday-special` | Holiday Special / Pete Tong DJ Academy | bozza |
| `holiday-special-gift` | Holiday Special Gift / Pete Tong DJ Academy | bozza |
| `home-copy` | Home Copy | bozza |
| `integration` | Integration | bozza |
| `join-the-exclusive-live` | Join the exclusive live / Pete Tong DJ Academy | bozza |
| `kjhyurplk` | Career | bozza |
| `old-home` | Old Home | bozza |
| `perform` | Perform | bozza |
| `pricing` | Pricing | bozza |
| `privacy-policy` | Privacy Policy | bozza |
| `producer-course-pre-sep` | Producer Course / Pete Tong DJ Academy | bozza |
| `product` | Product | bozza |
| `styleguide` | Styleguide | bozza |
| `terms` | Terms | bozza |
| `vip-price-offer` | VIP Special Offer / Pete Tong DJ Academy | bozza |
| `vip-price-offer-v2` | VIP Special Offer / Pete Tong DJ Academy v2 | bozza |
| `vip-special-offer-survey-pete-tong-dj-academy` | VIP Special Offer Survey / Pete Tong DJ Academy | bozza |
| `(home)` | Home | in sitemap |
| `advanced-djs` | Advanced DJs | in sitemap |
| `dj-course` | DJ Course / Pete Tong DJ Academy | in sitemap |
| `mix-mastering-course` | Mix & Mastering Course / Pete Tong DJ Academy | in sitemap |
| `play-get-signed` | Talent Pool / Pete Tong DJ Academy | in sitemap |
| `pricing-page` | Pricing Page / Pete Tong DJ Academy | in sitemap |
| `producer-course` | Producer Course / Pete Tong DJ Academy | in sitemap |
| `recess` | Recess | in sitemap |
| `terms-conditions` | Terms & Conditions | in sitemap |
| `terms-conditions-sa` | Terms & Conditions SA | in sitemap |
| `action-plan-hero` | Action Plan Hero / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `beatport-presents-ims-dubai` | Beatport presents: IMS Dubai | pubblicata, fuori sitemap |
| `beginner-djs` | Beginner DJs | pubblicata, fuori sitemap |
| `book-a-call` | Book A call | pubblicata, fuori sitemap |
| `discover-the-academy` | Discover the Academy / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `dj-course-v3` | DJ Course / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `dj-studio-x-ptdja-pro-plan-pete-tong-dj-academy` | DJ Studio x PTDJA - PRO Plan / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `exclusive-spring-promo` | Exclusive Spring Promo / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `free-dj-lessons` | Free DJ Lessons / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `free-elite-lessons` | Free Elite Lessons / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `free-producer-lessons` | Free Producer Lessons / Pete Tong DJ Academy Copy 2 | pubblicata, fuori sitemap |
| `groover-x-ptdja-elite-plan-pete-tong-dj-academy` | Groover x PTDJA - Elite Plan / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `groover-x-ptdja-pro-pete-tong-dj-academy` | Groover x PTDJA - Pro / Pete Tong DJ Academy Copy | pubblicata, fuori sitemap |
| `holiday-scholarship-bp` | Holiday Scholarship / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `learning` | Learning | pubblicata, fuori sitemap |
| `lite-version` | PTDJA Beatport Lite Version | pubblicata, fuori sitemap |
| `lite-version-copy` | PTDJA Beatport Lite Version Copy | pubblicata, fuori sitemap |
| `midlevel-djs` | Midlevel DJs | pubblicata, fuori sitemap |
| `mix-mastering-course-pre-sep` | Mix & Mastering Course / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `pricing-page-geo` | Pricing Page / Pete Tong DJ Academy Copy | pubblicata, fuori sitemap |
| `pricing-page-v3` | Pricing Page / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `producer-course-v3` | Producer Course / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `ptdja-beatport-lite-version-2` | PTDJA Beatport Lite Version 2 | pubblicata, fuori sitemap |
| `ptdja-schlrp` | Scholarship  / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `ptdja-x-beatport-pete-tong-dj-academy` | Beatport x PTDJA / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `ptdja-x-dj-studio-pro-trial` | PTDJA x DJ Studio / One Month Pro Trial | pubblicata, fuori sitemap |
| `ptdja-x-groover-one-month-elite-trial` | PTDJA x Groover / One Month ELITE Trial | pubblicata, fuori sitemap |
| `ptdja-x-groover-one-month-pro-trial` | PTDJA x Groover / One Month PRO Trial | pubblicata, fuori sitemap |
| `ptdja-x-rekordbox-one-month-trial-1` | PTDJA x Rekordbox / One Month Trial | pubblicata, fuori sitemap |
| `ptdja-x-rekordbox-one-month-trial-v2` | PTDJA x Rekordbox / One Month Trial v2 | pubblicata, fuori sitemap |
| `ptdja-x-rekordbox-one-month-trial-v3` | PTDJA x Rekordbox / One Month Trial v3 | pubblicata, fuori sitemap |
| `ptdja-x-rekordbox-three-months-trial` | PTDJA x Rekordbox / Three Months Trial | pubblicata, fuori sitemap |
| `ptdja-x-rekordbox-three-months-trial-2` | PTDJA x Rekordbox / Three Months Trial 2 | pubblicata, fuori sitemap |
| `quiz-result-advanced` | Landing Advanced | pubblicata, fuori sitemap |
| `rekordbox-x-ptdja-pete-tong-dj-academy` | Rekordbox x PTDJA / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `scholarship-beatport` | Scholarship (beatport) / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `scholarship-beatport-tp` | Scholarship (beatport) / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `scholarship-djs` | Scholarship (dj.studio) / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `scholarship-gvr` | Scholarship (groover) / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `talent-pool-v3` | Talent Pool / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `terms-conditions-23rd-july-pete-tong-dj-academy` | Terms & Conditions - Before 23rd of July / Pete Tong DJ Academy | pubblicata, fuori sitemap |
| `test-tracking` | Test tracking | pubblicata, fuori sitemap |
| `detail_authors` | Authors Template | template CMS |
| `detail_blog` | Blogs Template | template CMS |
| `detail_category` | Categories Template | template CMS |
| `detail_integrations` | Integrations Template | template CMS |
| `detail_menu` | Menu Items Template | template CMS |
| `detail_product` | Products Template | template CMS |
| `detail_sku` | SKUs Template | template CMS |
| `detail_teachers-images` | Teachers' Images Template | template CMS |
| `thank-you-page-elite-pete-tong-dj-academy` | Thank You Page Elite / Pete Tong DJ Academy | thank you |
| `thank-you-page-one-pete-tong-dj-academy` | Thank You Page One / Pete Tong DJ Academy | thank you |
| `thank-you-page-pro-pete-tong-dj-academy` | Thank You Page Pro / Pete Tong DJ Academy | thank you |
| `thank-you-page-pro-ptdja-x-rekordbox-3` | Thank You Page Pro / PTDJA x Rekordbox | thank you |
| `thank-you-page-pro-ptdja-x-rekordbox-3m` | Thank You Page Pro / PTDJA x Rekordbox 3 | thank you |
| `thank-you-page-pro-ptdja-x-rekordbox-one` | Thank You Page Pro / PTDJA x Rekordbox 1 | thank you |
| `401` | Password | vecchia o utility |
| `404` | 404 | vecchia o utility |
| `checkout` | Checkout | vecchia o utility |
| `digital-campus-old` | The Digital Campus | vecchia o utility |
| `dj-course-advanced-path-old` | Advanced Course DJ Path | vecchia o utility |
| `order-confirmation` | Order Confirmation | vecchia o utility |
| `our-mission-old` | Our Mission | vecchia o utility |
| `paypal-checkout` | Checkout (PayPal) | vecchia o utility |
| `quiz-result-beginner-old` | Landing Beginner | vecchia o utility |
| `quiz-result-mid-level-old` | Landing Mid-level | vecchia o utility |
| `talent-pool-old` | The Talent Pool | vecchia o utility |
| `virtual-tour-beginner-dj` | Virtual Tour - Beginner DJ / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-beginner-dj-2` | Virtual Tour - Beginner DJ / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-beginner-dj-3` | Virtual Tour - Beginner DJ / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-beginner-dj-4` | Virtual Tour - Beginner DJ / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-beginner-dj-producer` | Virtual Tour - Beginner DJ&Producer / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-beginner-dj-producer-2` | Virtual Tour - Beginner DJ&Producer / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-beginner-dj-producer-3` | Virtual Tour - Beginner DJ&Producer / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-beginner-dj-producer-4` | Virtual Tour - Beginner Dj & Producer / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-beginner-producer` | Virtual Tour - Beginner Producer / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-beginner-producer-2` | Virtual Tour - Beginner Producer / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-beginner-producer-3` | Virtual Tour - Beginner Producer / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-beginner-producer-4` | Virtual Tour - Beginner Producer / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-mid-advanced-dj` | Virtual Tour - Mid-Advanced DJ / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-mid-advanced-dj-2` | Virtual Tour - Mid-Advanced DJ / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-mid-advanced-dj-3` | Virtual Tour - Mid-Advanced DJ / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-mid-advanced-dj-4` | Virtual Tour - Mid-Advanced DJ / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-mid-advanced-dj-producer` | Virtual Tour - Mid-Advanced DJ&Producer/ Pete Tong DJ Academy | virtual tour |
| `virtual-tour-mid-advanced-dj-producer-2` | Virtual Tour - Mid-Advanced DJ&Producer/ Pete Tong DJ Academy | virtual tour |
| `virtual-tour-mid-advanced-dj-producer-3` | Virtual Tour - Mid-Advanced DJ&Producer/ Pete Tong DJ Academy | virtual tour |
| `virtual-tour-mid-advanced-dj-producer-4` | Virtual Tour - Mid-Advanced DJ & Producer / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-mid-advanced-producer` | Virtual Tour - Mid-Advanced Producer/ Pete Tong DJ Academy | virtual tour |
| `virtual-tour-mid-advanced-producer-2` | Virtual Tour - Mid-Advanced Producer/ Pete Tong DJ Academy | virtual tour |
| `virtual-tour-mid-advanced-producer-3` | Virtual Tour - Mid-Advanced Producer/ Pete Tong DJ Academy | virtual tour |
| `virtual-tour-mid-advanced-producer-4` | Virtual Tour - Mid-Advanced Producer / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-x-beatport-beg` | Virtual Tour x Beatport / Pete Tong DJ Academy | virtual tour |
| `virtual-tour-x-beatport-mid` | Virtual Tour x Beatport / Pete Tong DJ Academy | virtual tour |
