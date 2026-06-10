import type { Metadata } from "next";
import { Playfair_Display, Lato, Sacramento, Courier_Prime } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/* ─── Fonts ─── */
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
const lato = Lato({ variable: "--font-lato", weight: ["300", "400", "700"], style: ["normal", "italic"], subsets: ["latin"], display: "swap" });
const sacramento = Sacramento({ variable: "--font-sacramento", weight: ["400"], subsets: ["latin"], display: "swap" });
const courierPrime = Courier_Prime({ variable: "--font-courier", weight: ["400", "700"], subsets: ["latin"], display: "swap" });

/* ─── Global Metadata ─── */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.trendfleurs.de"),
  title: {
    default: "a_trendfleurs by Anni — Hochzeitsfloristik & Dekoverleih | Westerwald · Köln · Frankfurt",
    template: "%s | a_trendfleurs by Anni",
  },
  description:
    "Eventagentur, Floristik & Dekoverleih für Hochzeiten, JGA und Events — persönliche Beratung von gelernter Floristin Anni. Lieferung & Aufbau in Westerwald, Köln, Frankfurt, Hamm/Sieg & Düsseldorf.",
  keywords: [
    "Hochzeitsfloristik Westerwald",
    "Dekoverleih Köln",
    "Eventagentur Frankfurt",
    "Hochzeitsplanung Hamm Sieg",
    "JGA Planung NRW",
    "Hoop Verleih",
    "Pampas Verleih",
    "Audio Gästetelefon mieten",
    "Floristin Hochzeit",
    "Dekoverleih Düsseldorf",
    "Trockenblumen Hochzeit",
    "personalisierte Hochzeitsdeko",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "a_trendfleurs by Anni",
    title: "a_trendfleurs by Anni — Hochzeitsfloristik & Dekoverleih",
    description:
      "Hochzeiten, JGA & Events mit Floristik und Dekoverleih — von gelernter Floristin Anni. Westerwald, Köln, Frankfurt & NRW.",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "a_trendfleurs by Anni — florale Hochzeitsdekoration",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "a_trendfleurs by Anni — Hochzeitsfloristik & Dekoverleih",
    description: "Floristik, Dekoverleih & Eventplanung für Hochzeiten in Westerwald, Köln & Frankfurt.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://www.trendfleurs.de" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true, follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* ─── Schema.org: LocalBusiness (rich, vollständig) ─── */
const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.trendfleurs.de/#business",
  name: "a_trendfleurs by Anni",
  alternateName: "Trendfleurs",
  description:
    "Eventagentur, Floristik & Dekoverleih für Hochzeiten, JGA und Events — persönlich, sorgfältig, unvergesslich.",
  url: "https://www.trendfleurs.de",
  image: "https://www.trendfleurs.de/og-image.jpg",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Bank Transfer, PayPal",
  address: {
    "@type": "PostalAddress",
    addressCountry: "DE",
    addressRegion: "Nordrhein-Westfalen",
  },
  founder: {
    "@type": "Person",
    name: "Anni",
    jobTitle: "Floristin & Inhaberin",
    description: "Gelernte Floristin mit langjähriger Erfahrung in Hochzeits- und Eventfloristik.",
    worksFor: { "@id": "https://www.trendfleurs.de/#business" },
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    contactOption: "TollFree",
    availableLanguage: { "@type": "Language", name: "German", alternateName: "de" },
    url: "https://www.trendfleurs.de/anfrage",
    description: "Kostenlose unverbindliche Anfrage — Anni antwortet persönlich innerhalb von 48h.",
  },
  areaServed: [
    { "@type": "City", name: "Köln", "@id": "https://www.wikidata.org/wiki/Q365" },
    { "@type": "City", name: "Frankfurt am Main", "@id": "https://www.wikidata.org/wiki/Q1794" },
    { "@type": "City", name: "Düsseldorf" },
    { "@type": "AdministrativeArea", name: "Westerwald" },
    { "@type": "AdministrativeArea", name: "Hamm/Sieg" },
    { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
  ],
  serviceType: [
    "Hochzeitsplanung",
    "Hochzeitsfloristik",
    "Dekoverleih",
    "JGA-Planung",
    "Event-Dekoration",
    "Floraler Workshop",
    "Wunschzettel Mietservice",
    "Audio Gästetelefon Verleih",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Leistungen & Dekoverleih",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Dekoverleih",
        description: "Goldene Hoops, Pampas-Gras, Kerzenständer, Audio Gästetelefon und mehr — ab 4 €/Tag.",
        url: "https://www.trendfleurs.de/dekoverleih",
        itemOffered: { "@type": "Service", name: "Dekoverleih für Hochzeiten und Events" },
      },
      {
        "@type": "Offer",
        name: "Full-Service Hochzeitsplanung",
        description: "Von der ersten Beratung bis zum Abbau — alles aus einer Hand.",
        url: "https://www.trendfleurs.de/leistungen",
        itemOffered: { "@type": "Service", name: "Hochzeitsplanung & Floristik" },
      },
      {
        "@type": "Offer",
        name: "JGA-Planung",
        description: "Workshops, Deko und das Audio Gästetelefon für unvergessliche JGA-Momente.",
        url: "https://www.trendfleurs.de/leistungen",
        itemOffered: { "@type": "Service", name: "Junggesellinnenabschied Planung" },
      },
      {
        "@type": "Offer",
        name: "Personalisierte Hochzeitsdeko",
        description: "Handgemachte Schilder, Tischkarten, Kerzen und Gästebücher — direkt kaufen.",
        url: "https://www.trendfleurs.de/shop",
        itemOffered: { "@type": "Product", name: "Personalisierte Hochzeitsdekoration" },
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${playfair.variable} ${lato.variable} ${sacramento.variable} ${courierPrime.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-cream focus:p-4 focus:rounded-lg focus:shadow-lg">
          Zum Inhalt springen
        </a>
        <Providers>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
