import type { Metadata } from "next";
import { Geist, Inter, Lato, Oswald } from "next/font/google";
import { Acquisition } from "@/components/tracking/Acquisition";
import { Attribution } from "@/components/tracking/Attribution";
import { Clarity } from "@/components/tracking/Clarity";
import { GoogleTags } from "@/components/tracking/GoogleTags";
import { Mixpanel } from "@/components/tracking/Mixpanel";
import { VtQuiz } from "@/components/tracking/VtQuiz";
import "./globals.css";

/*
 * I quattro font che il sito Webflow carica con `WebFont.load`, presi da
 * `next/font/google` invece che dal CDN di Google.
 *
 * Il guadagno non è estetico: `next/font` scarica i file in fase di build e li
 * serve dal nostro dominio, quindi sparisce la richiesta bloccante a
 * `fonts.googleapis.com` che oggi sta in cima all'`<head>` del sito, e sparisce
 * il salto di layout che il caricamento asincrono di WebFont produce.
 *
 * I pesi sono quelli dichiarati nel `WebFont.load` del sito:
 *   Oswald 200-700, Lato 100/300/400/700/900 più i corsivi,
 *   Geist 300-700, Inter 300-700.
 * Oswald, Geist e Inter sono variabili su Google Fonts: si omette `weight` e
 * arriva l'intero intervallo, che copre quei valori e costa un file solo. Lato
 * non lo è, quindi i pesi vanno elencati, corsivi compresi.
 *
 * Ognuno espone una variabile CSS, mappata poi nel blocco `@theme` di
 * `globals.css`. Nessuno è applicato al `<body>` da qui: quale font usa quale
 * elemento lo decidono i componenti di sezione, confrontandosi con lo screenshot
 * di riferimento.
 */

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lato",
});

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/*
 * Metadati di ripiego. Ogni pagina dichiara i suoi, copiati dall'HTML Webflow:
 * questi valgono solo dove una pagina non ne dichiara nessuno, e non devono
 * diventare la scorciatoia per non copiare quelli veri.
 */
export const metadata: Metadata = {
  title: "Pete Tong DJ Academy",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${lato.variable} ${geist.variable} ${inter.variable}`}
    >
      <body>
        {/* Prima dei children, come sul sito Webflow dove entrambi stanno
            nell'<head>.

            Mixpanel per primo perché il resto del codice presuppone che
            `window.mixpanel` esista (anche solo come stub che mette in coda le
            chiamate): un evento chiamato prima dello stub è un evento perso, e
            perso in silenzio.

            Attribution subito dopo: cattura UTM e click id e decora i link
            verso il carrello. Prima ne prende possesso, meno finestre ci sono
            in cui qualcuno clicca un link non ancora decorato. */}
        <Mixpanel />
        <Attribution />

        {children}

        {/* Dopo i children: sono tag che non disegnano niente e che non devono
            competere con il contenuto per la banda del primo schermo.

            ⚠️ Sul sito Webflow GTM sta nell'<head>, non in fondo al body: è il
            container che porta dentro la Cookie Solution di Iubenda, quindi qui
            il banner compare qualche centinaio di millisecondi più tardi. È una
            differenza dichiarata, da riguardare quando le pagine vere saranno
            in piedi e il body sarà lungo. */}
        <GoogleTags />
        <Clarity />
        <Acquisition />
        <VtQuiz />
      </body>
    </html>
  );
}
