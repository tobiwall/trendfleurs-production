import type { Metadata } from "next";
import DecorCatalogClient from "./DecorCatalogClient";

export const metadata: Metadata = {
  title: "Dekoverleih — Hoops, Pampas & Audio Gästetelefon",
  description:
    "Dekoverleih für Hochzeiten: Goldene Hoops, Pampas-Gras, Kerzenständer & Audio Gästetelefon ab 4 €/Tag. Lieferung & Aufbau in Westerwald, Köln & Frankfurt. Unverbindlicher Wunschzettel.",
  keywords: [
    "Dekoverleih Hochzeit",
    "Hoop Verleih Westerwald",
    "Pampas Gras Verleih NRW",
    "Audio Gästetelefon mieten",
    "Hochzeitsdeko mieten Köln",
    "Kerzenständer mieten",
    "Wunschzettel Hochzeit",
  ],
  alternates: { canonical: "https://www.trendfleurs.de/dekoverleih" },
  openGraph: {
    title: "Dekoverleih — Hoops, Pampas & Audio Gästetelefon | a_trendfleurs by Anni",
    description:
      "Kuratierter Dekoverleih ab 4 €/Tag: Goldene Hoops, Pampas, Kerzenständer & Audio Gästetelefon. Lieferung & Aufbau in Westerwald, Köln & Frankfurt.",
    url: "https://www.trendfleurs.de/dekoverleih",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dekoverleih für Hochzeiten — a_trendfleurs" }],
  },
};

/* ─── Breadcrumb + Service Schema ─── */
const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@id": "https://www.trendfleurs.de", name: "Home" } },
      { "@type": "ListItem", position: 2, item: { "@id": "https://www.trendfleurs.de/dekoverleih", name: "Dekoverleih" } },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.trendfleurs.de/dekoverleih#service",
    name: "Dekoverleih für Hochzeiten & Events",
    provider: { "@type": "LocalBusiness", "@id": "https://www.trendfleurs.de/#business" },
    description:
      "Kuratierter Dekoverleih: Goldene Hoops, Pampas-Gras, Kerzenständer, Vasen-Kollektionen und das beliebte Audio Gästetelefon — für Hochzeiten, JGA und Events.",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Westerwald" },
      { "@type": "City", name: "Köln" },
      { "@type": "City", name: "Frankfurt am Main" },
      { "@type": "AdministrativeArea", name: "Hamm/Sieg" },
      { "@type": "City", name: "Düsseldorf" },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "4",
      highPrice: "89",
      offerCount: "20+",
      description: "Dekoverleih ab 4 €/Tag · keine Mindestbestellung",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dekoverleih Kollektion",
      itemListElement: [
        { "@type": "Offer", name: "Goldener Hoop", price: "15", priceCurrency: "EUR", description: "ab 15 €/Tag" },
        { "@type": "Offer", name: "Pampas-Set Groß", price: "24", priceCurrency: "EUR", description: "ab 24 €/Tag" },
        { "@type": "Offer", name: "Audio Gästetelefon", price: "89", priceCurrency: "EUR", description: "ab 89 €/Event" },
        { "@type": "Offer", name: "Kerzenständer Messing", price: "4", priceCurrency: "EUR", description: "ab 4 €/Tag" },
      ],
    },
  },
];

export default function DecorPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <DecorCatalogClient />
    </>
  );
}
