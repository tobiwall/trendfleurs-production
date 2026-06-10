import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import PinnedServices from "@/components/sections/PinnedServices";
import StorySection from "@/components/sections/StorySection";
import ServiceWorlds from "@/components/sections/ServiceWorlds";
import ProjectGallery from "@/components/sections/ProjectGallery";
import LocalSEO from "@/components/sections/LocalSEO";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "a_trendfleurs by Anni — Hochzeitsfloristik & Dekoverleih | Westerwald · Köln · Frankfurt",
  description:
    "Eventagentur, Floristik & Dekoverleih für Hochzeiten, JGA und Events — persönliche Beratung von gelernter Floristin Anni. Lieferung & Aufbau in Westerwald, Köln, Frankfurt, Hamm/Sieg & Düsseldorf.",
  alternates: { canonical: "https://www.trendfleurs.de" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <PinnedServices />
      <StorySection />
      <ServiceWorlds />
      <ProjectGallery />
      <LocalSEO />
      <CtaBanner />
    </>
  );
}
