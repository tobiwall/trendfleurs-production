import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import PinnedServices from "@/components/sections/PinnedServices";
import StorySection from "@/components/sections/StorySection";
import ServiceWorlds from "@/components/sections/ServiceWorlds";
import ProjectGallery from "@/components/sections/ProjectGallery";
import GoogleReviews from "@/components/sections/GoogleReviews";
import LocalSEO from "@/components/sections/LocalSEO";
import CtaBanner from "@/components/sections/CtaBanner";
import { getAllProducts, type ProductHighlight } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "a_trendfleurs by Anni — Hochzeitsfloristik & Dekoverleih | Westerwald · Köln · Frankfurt",
  description:
    "Eventagentur, Floristik & Dekoverleih für Hochzeiten, JGA und Events — persönliche Beratung von gelernter Floristin Anni. Lieferung & Aufbau in Westerwald, Köln, Frankfurt, Hamm/Sieg & Düsseldorf.",
  alternates: { canonical: "https://www.trendfleurs.de" },
};

export default async function HomePage() {
  // Fetch 3 highlight products for the PinnedServices floating cards:
  //   slots 0+1 from verleih (prefer badged/highlighted ones first)
  //   slot 2 from shop (prefer badged/highlighted)
  let highlights: ProductHighlight[] = [];
  try {
    const all = await getAllProducts();
    const verleih = all.filter(p => p.tags.some(t => t.toLowerCase() === "verleih"));
    const shop    = all.filter(p => p.tags.some(t => t.toLowerCase() === "verkauf"));

    // Sort: badged products first
    const ranked = (arr: typeof all) =>
      [...arr].sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));

    const rankedV = ranked(verleih);
    const rankedS = ranked(shop);

    const h0 = rankedV[0] ?? null;
    const h1 = rankedV.find(p => p !== h0) ?? rankedV[1] ?? null;
    const h2 = rankedS[0] ?? null;

    highlights = [h0, h1, h2]
      .filter((p): p is NonNullable<typeof p> => p !== null)
      .map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        imageUrl: p.imageUrl,
        type: p.tags.some(t => t.toLowerCase() === "verleih") ? "verleih" : "shop",
      }));
  } catch {
    // Shopify not configured — highlights array stays empty, static fallbacks used
  }

  return (
    <>
      <Hero />
      <TrustBar />
      <ServiceWorlds />
      <StorySection />
      <PinnedServices highlights={highlights} />
      <ProjectGallery />
      <GoogleReviews />
      <LocalSEO />
      <CtaBanner />
    </>
  );
}
