import type { Metadata } from "next";
import LeistungenClient from "./LeistungenClient";

export const metadata: Metadata = {
  title: "Leistungen — Hochzeitsplanung & Floristik",
  description:
    "Full-Service Hochzeitsplanung, JGA & Dekoration von gelernter Floristin Anni — von der Konzeption bis zum Aufbau. Persönlich vor Ort in Westerwald, Köln, Frankfurt & NRW.",
  keywords: [
    "Hochzeitsplanung Westerwald",
    "Hochzeitsfloristin Köln",
    "JGA Planung NRW",
    "Blumenworkshop",
    "Event Floristik Frankfurt",
    "Hochzeit Full Service",
    "Floristin buchen",
  ],
  alternates: { canonical: "https://www.trendfleurs.de/leistungen" },
  openGraph: {
    title: "Leistungen — Hochzeitsplanung & Floristik | a_trendfleurs by Anni",
    description:
      "Full-Service von der Floristin: Hochzeiten, JGA, Workshops & Events. Persönlich, von Konzept bis Aufbau.",
    url: "https://www.trendfleurs.de/leistungen",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Hochzeitsplanung und Floristik — a_trendfleurs" }],
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@id": "https://www.trendfleurs.de", name: "Home" } },
      { "@type": "ListItem", position: 2, item: { "@id": "https://www.trendfleurs.de/leistungen", name: "Leistungen" } },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.trendfleurs.de/leistungen#service",
    name: "Hochzeitsplanung & Floristik — Full-Service",
    provider: { "@type": "LocalBusiness", "@id": "https://www.trendfleurs.de/#business" },
    description:
      "Full-Service Eventplanung: Floristik, Dekoration, JGA-Planung und Workshops — persönlich geplant und umgesetzt von gelernter Floristin Anni.",
    serviceType: ["Hochzeitsplanung", "Hochzeitsfloristik", "JGA-Planung", "Event-Dekoration", "Floraler Workshop"],
    areaServed: [
      { "@type": "AdministrativeArea", name: "Westerwald" },
      { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
      { "@type": "City", name: "Köln" },
      { "@type": "City", name: "Frankfurt am Main" },
      { "@type": "AdministrativeArea", name: "Hamm/Sieg" },
    ],
  },
];

export default function LeistungenPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <LeistungenClient />
    </>
  );
}
