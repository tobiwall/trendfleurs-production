import type { Metadata } from "next";
import { Suspense } from "react";
import AnfrageClient from "./AnfrageClient";

export const metadata: Metadata = {
  title: "Kostenlose Anfrage stellen",
  description:
    "Kostenlose, unverbindliche Anfrage für Hochzeit, JGA, Dekoverleih oder Workshop — Anni antwortet persönlich innerhalb von 48h. Floristik & Events in Westerwald, Köln & Frankfurt.",
  keywords: [
    "Hochzeit Floristin anfragen",
    "Dekoverleih anfragen",
    "JGA Planung buchen",
    "Hochzeitsplanung Kostenlos",
    "Event Deko anfragen NRW",
  ],
  alternates: { canonical: "https://www.trendfleurs.de/anfrage" },
  openGraph: {
    title: "Kostenlose Anfrage | a_trendfleurs by Anni",
    description:
      "Unverbindliche Anfrage für dein Event. Anni antwortet persönlich innerhalb von 48h. Floristik & Dekoverleih.",
    url: "https://www.trendfleurs.de/anfrage",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Anfrage stellen — a_trendfleurs by Anni" }],
  },
  robots: { index: true, follow: false }, /* Kontaktseiten nicht tief indexieren */
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@id": "https://www.trendfleurs.de", name: "Home" } },
      { "@type": "ListItem", position: 2, item: { "@id": "https://www.trendfleurs.de/anfrage", name: "Anfrage" } },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://www.trendfleurs.de/anfrage#page",
    name: "Kostenlose Anfrage — a_trendfleurs by Anni",
    description: "Unverbindliche Anfrage für Hochzeit, JGA, Dekoverleih oder Workshop.",
    provider: { "@type": "LocalBusiness", "@id": "https://www.trendfleurs.de/#business" },
    about: {
      "@type": "Service",
      name: "Floristik, Hochzeitsplanung & Dekoverleih",
      provider: { "@id": "https://www.trendfleurs.de/#business" },
    },
  },
];

export default function AnfragePage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Suspense fallback={null}>
        <AnfrageClient />
      </Suspense>
    </>
  );
}
