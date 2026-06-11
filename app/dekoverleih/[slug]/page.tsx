import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Info, MapPin, Clock, Package } from "lucide-react";
import { DECOR, imgSrc } from "@/app/components/trendfleurs/data";
import { getVerleihProducts, getProductByHandle, shopifyImageSrc } from "@/lib/shopify";
import WishlistButton from "./WishlistButton";

/* ─────────────────────────────────────────────
   Per-item rich content
────────────────────────────────────────────── */
const ITEM_CONTENT: Record<string, {
  headline: string;
  sub: string;
  desc: string;
  includes: string[];
  occasions: string[];
  tip: string;
  dimensions?: string;
  available: string;
  deposit?: string;
}> = {
  d1: {
    headline: "Goldener Hoop — zeitloses Statement",
    sub: "Bögen & Hoops · Beliebte Wahl",
    desc: "Der goldene Hoop ist eines unserer meistgebuchten Stücke. Er funktioniert als freistehender Foto-Hintergrund, als Altar-Bogen oder als Centrepiece bei Tischdekoration. Die goldene Oberfläche fängt warm gehaltenes Licht ein und harmoniert mit nahezu jedem Farbkonzept — von Boho-Beige bis tiefem Dunkelgrün.",
    includes: [
      "1× goldener Metallhoop (Ø 80 cm)",
      "Aufbauanleitung & Standregelung",
      "Florales Styling auf Anfrage buchbar",
      "Transport-/Schutzverpackung inklusive",
    ],
    occasions: ["Hochzeiten", "JGA-Events", "Babyshower", "Geburtstage", "Corporate Fotoshootings"],
    tip: "Kombiniere den Hoop mit unserem Pampas-Set Groß (d2) für einen vollständigen Boho-Look — perfekt für den Altar oder den Fotobereich.",
    dimensions: "Ø 80 cm, Standfuß inklusive",
    available: "Ganzjährig verfügbar",
    deposit: "20 €",
  },
  d2: {
    headline: "Pampas-Set Groß — üppig, warm, romantisch",
    sub: "Florals · Boho & Natur",
    desc: "Pampas Gras ist nicht nur ein Trend — es ist ein Statement für natürliche Schönheit. Unser großes Set enthält kuratierte Büschel in warmem Creme, das ganze Jahr einsetzbar. Das Pampas hält ohne Wasser aus und eignet sich ideal als Vasendekoration, für Bögen oder als bodentiefes Statement-Arrangement.",
    includes: [
      "5–7 große Pampas-Büschel (je 60–90 cm)",
      "2–3 kleinere Akzent-Wedel",
      "Florales Styling inklusive bei Abholung",
      "Schutzverpackung für den Transport",
    ],
    occasions: ["Hochzeiten & Trauungen", "JGA-Fotoshootings", "Geburtstag-Partys", "Interior-Deko"],
    tip: "Pampas verliert beim Transport kaum Wedel, wenn es liegend transportiert wird. Wir liefern es bereits leicht aufgefächert.",
    dimensions: "Büschelhöhe 60–90 cm, variabel arrangierbar",
    available: "Ganzjährig (Trockenblumen)",
  },
  d3: {
    headline: "Audio Gästetelefon — Erinnerungen, die klingen",
    sub: "Highlights · Personalisiertes Erlebnis",
    desc: "Das Audio Gästetelefon ist unser emotionalstes Verleihstück. Gäste heben ab, sprechen einen persönlichen Gruß ein — und das Brautpaar hat am Ende des Abends eine Schatzkiste an Sprachnachrichten. Kein Kabel, keine App, kein Setup — einfach hinstellen, aufstellen, laufen lassen.",
    includes: [
      "1× Retro-Telefonhörer mit integrierter Aufnahmetechnik",
      "Personalisiertes Erklärschildchen (Name des Paares)",
      "Bis zu 200 Aufnahmen (je ca. 60 Sek.)",
      "Übergabe aller Aufnahmen als MP3-Dateien",
      "Technischer Support vor Ort auf Anfrage",
    ],
    occasions: ["Hochzeiten", "Jubiläen", "Geburtstagsfeiern", "JGA-Abende", "Firmenfeiern"],
    tip: "Stell das Telefon am Eingang auf oder direkt neben der Candybar — dort sind die meisten Gäste spontan bereit, etwas einzusprechen.",
    available: "Begrenzte Verfügbarkeit, bitte frühzeitig anfragen",
    deposit: "30 €",
  },
  d4: {
    headline: "Kerzenständer Messing — elegante Tischkultur",
    sub: "Tischdeko · Klassisch & vielseitig",
    desc: "Messing-Kerzenständer in verschiedenen Höhen schaffen Tiefe und Rhythmus auf der Tafel. Der warme Goldton harmoniert mit Cremeweiß, Dunkelgrün und Bordeaux gleichermäßen. Für Hochzeitstafeln empfehlen wir mindestens 8–12 Stück in gemischten Höhen.",
    includes: [
      "Pro Stück: 1× Messing-Kerzenständer (Höhen: 12 / 22 / 34 cm)",
      "Passend für Stabkerzen Ø 2,2 cm",
      "Kerzen nicht inklusive (optional zubuchbar)",
      "Poliertuch für den Rückversand inklusive",
    ],
    occasions: ["Hochzeitstafeln", "Galadinner", "Taufen & Kommunion", "Geburtstagstafeln"],
    tip: "Mische alle drei Höhen (12 / 22 / 34 cm) für maximale Tiefenwirkung. Wir stellen dir gerne Sets zusammen.",
    dimensions: "Erhältlich in 12, 22 und 34 cm Höhe",
    available: "Große Stückzahl vorhanden",
  },
  d5: {
    headline: "Vasen-Sammlung — kuratierte Formenvielfalt",
    sub: "Florals · Vintage & Modern",
    desc: "Unsere Vasen-Sammlung vereint handverlesene Stücke: Bud Vases in Glas, bauchige Keramik-Vasen in Erdtönen und schlanke Flaschen für einzelne Stiele. Der Mix-and-Match-Ansatz lässt Tafeln lebendig und persönlich wirken — kein Tisch gleicht dem anderen.",
    includes: [
      "8–12 Vasen in gemischten Formen & Größen",
      "Stilmix: Glas, Keramik, Terracotta, Beton",
      "Styling-Empfehlung inklusive",
      "Optional: Blumenbefüllung durch Anni buchbar",
    ],
    occasions: ["Hochzeitstafeln", "Boho-Events", "Gartenpartys", "Interior Fotoshootings"],
    tip: "Für ein kohärentes Bild wähle Vasen aus zwei Materialien (z. B. Glas + Keramik) und eine Farbpalette mit maximal drei Tönen.",
    available: "Ganzjährig verfügbar",
  },
  d6: {
    headline: "Makramee-Rückwand — handgemacht & einzigartig",
    sub: "Bögen & Hoops · Neu im Sortiment",
    desc: "Die Makramee-Rückwand ist ein handgeknüpftes Statement-Stück, das jeden Hintergrund in eine Boho-Kulisse verwandelt. Aus 100 % Baumwollkordel, natürlich cremeweiß, passt sie zu rustikalen Scheunen, modernen Lofts und Garten-Zeremonien gleichermaßen.",
    includes: [
      "1× Makramee-Panel (ca. 100 × 150 cm)",
      "Holzstab zum Aufhängen inklusive",
      "Aufhänge-Kit & Montageanleitung",
      "Optionale floralen Ergänzung buchbar",
    ],
    occasions: ["Boho-Hochzeiten", "JGA-Fotoecken", "Babyshower", "Gartenpartys", "Fotoshootings"],
    tip: "Die Rückwand lässt sich mit Trockenblumen, Pampasgras und Eukalyptus bestücken — frag uns nach dem kombinierten Styling-Paket.",
    dimensions: "ca. 100 × 150 cm (individuell anpassbar)",
    available: "Neu, begrenzte Anzahl",
    deposit: "25 €",
  },
};

/* ─────────────────────────────────────────────
   Static params
────────────────────────────────────────────── */
export async function generateStaticParams() {
  let shopifySlugs: string[] = [];
  try {
    const sp = await getVerleihProducts();
    shopifySlugs = sp.map(p => p.id);
  } catch { /* Shopify not configured — static slugs only */ }

  const staticSlugs = DECOR.map(item => item.id);
  const all = [...new Set([...staticSlugs, ...shopifySlugs])];
  return all.map(slug => ({ slug }));
}

/* ─────────────────────────────────────────────
   Metadata
────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = DECOR.find((d) => d.id === slug);

  if (item) {
    const content = ITEM_CONTENT[item.id];
    return {
      title: `${item.name} · Dekoverleih — a_trendfleurs by Anni`,
      description: `${item.name} mieten: ${item.price}${item.unit}. ${content?.desc.slice(0, 140)}…`,
      keywords: [item.name, item.cat, "Dekoverleih", "Hochzeit", "Westerwald", "a_trendfleurs"],
      alternates: { canonical: `https://www.trendfleurs.de/dekoverleih/${item.id}` },
      openGraph: {
        title: `${item.name} mieten — a_trendfleurs Dekoverleih`,
        description: `${item.price}${item.unit}. ${content?.desc.slice(0, 100)}`,
        url: `https://www.trendfleurs.de/dekoverleih/${item.id}`,
      },
    };
  }

  const sp = await getProductByHandle(slug).catch(() => null);
  if (sp) {
    return {
      title: `${sp.name} · Dekoverleih — a_trendfleurs by Anni`,
      description: `${sp.name} mieten: ${sp.price} ${sp.unit}. ${sp.description.slice(0, 140)}`,
      keywords: [sp.name, sp.cat, "Dekoverleih", "Hochzeit", "Westerwald", "a_trendfleurs"],
      alternates: { canonical: `https://www.trendfleurs.de/dekoverleih/${sp.id}` },
      openGraph: {
        title: `${sp.name} mieten — a_trendfleurs Dekoverleih`,
        description: `${sp.price} ${sp.unit}. ${sp.description.slice(0, 100)}`,
        url: `https://www.trendfleurs.de/dekoverleih/${sp.id}`,
      },
    };
  }

  return { title: "Nicht gefunden" };
}

/* ─────────────────────────────────────────────
   Page
────────────────────────────────────────────── */
export default async function DecorDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const item = DECOR.find((d) => d.id === slug);

  // Shopify product (for image, price, variants — with or without a DECOR entry)
  const shopifyProduct = await getProductByHandle(slug).catch(() => null);

  // Pure Shopify product with no DECOR entry → minimal layout
  if (!item && shopifyProduct) {
    const imgUrl = shopifyProduct.imageUrl
      ? shopifyImageSrc(shopifyProduct.imageUrl, 900)
      : null;

    return (
      <main>
        <section style={{ background: "var(--cream)", paddingTop: "clamp(40px,7vw,80px)", paddingBottom: "clamp(48px,8vw,96px)" }}>
          <div className="tf-inner">
            <nav aria-label="Breadcrumb" style={{ marginBottom: "28px" }}>
              <ol style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <li><Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-400)" }}>Home</Link></li>
                <li><span style={{ color: "var(--ink-300)", fontSize: "11px" }}>/</span></li>
                <li><Link href="/dekoverleih" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-400)" }}>Dekoverleih</Link></li>
                <li><span style={{ color: "var(--ink-300)", fontSize: "11px" }}>/</span></li>
                <li><span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--rust-500)" }}>{shopifyProduct.name}</span></li>
              </ol>
            </nav>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(32px,5vw,64px)" }} className="decor-product-grid">
              {imgUrl && (
                <div style={{
                  position: "relative", borderRadius: "var(--r-xl)", overflow: "hidden",
                  background: "var(--paper-100)",
                  height: "clamp(280px, 45vw, 500px)",
                }}>
                  <Image src={imgUrl} alt={shopifyProduct.name} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "contain" }} priority />
                </div>
              )}

              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
                  {shopifyProduct.cat}
                </p>
                <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "10px", fontSize: "var(--fs-h1)", lineHeight: "var(--lh-head)", color: "var(--ink-900)" }}>
                  {shopifyProduct.name}
                </h1>

                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "20px" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--rust-500)" }}>{shopifyProduct.price}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-400)" }}>{shopifyProduct.unit}</span>
                </div>

                {shopifyProduct.description && (
                  <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "var(--ink-700)", marginTop: "18px", maxWidth: "52ch" }}>
                    {shopifyProduct.description}
                  </p>
                )}

                <div style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
                  <Link href={`/anfrage?item=${shopifyProduct.id}&name=${encodeURIComponent(shopifyProduct.name)}`} style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    background: "var(--rust-500)", color: "var(--on-rust)",
                    padding: "13px 26px", borderRadius: "var(--r-pill)", minHeight: "48px",
                  }}>
                    Jetzt anfragen <ArrowRight size={15} strokeWidth={1.8} />
                  </Link>
                  <WishlistButton
                    id={shopifyProduct.id}
                    name={shopifyProduct.name}
                    price={shopifyProduct.price}
                    unit={shopifyProduct.unit}
                    seed={shopifyProduct.seed}
                    imageUrl={shopifyProduct.imageUrl ?? undefined}
                    variants={shopifyProduct.variants}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: "var(--charcoal)", padding: "clamp(64px,9vw,104px) 0" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center" }}>
            <h2 style={{ color: "var(--on-charcoal)", fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--fs-h2)" }}>
              {shopifyProduct.name} für dein Event
            </h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
              <Link href={`/anfrage?item=${shopifyProduct.id}&name=${encodeURIComponent(shopifyProduct.name)}`} style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                background: "var(--rust-500)", color: "var(--on-rust)",
                padding: "14px 30px", borderRadius: "var(--r-pill)", minHeight: "48px",
              }}>
                Anfrage senden <ArrowRight size={15} strokeWidth={1.8} />
              </Link>
              <Link href="/dekoverleih" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(244,239,231,.8)", padding: "13px 22px",
                borderRadius: "var(--r-pill)", border: "1px solid rgba(244,239,231,.22)", minHeight: "48px",
              }}>
                Alle Artikel
              </Link>
            </div>
          </div>
        </section>

        <style>{`
          @media (min-width: 768px) {
            .decor-product-grid { grid-template-columns: 1fr 1fr !important; align-items: start; }
          }
        `}</style>
      </main>
    );
  }

  if (!item) notFound();

  const content = ITEM_CONTENT[item.id];
  const related = DECOR.filter((d) => d.id !== item.id && (d.cat === item.cat || d.seed !== item.seed)).slice(0, 3);

  // Use Shopify image if available, otherwise Unsplash fallback
  const heroImgSrc = shopifyProduct?.imageUrl
    ? shopifyImageSrc(shopifyProduct.imageUrl, 900)
    : imgSrc(item.seed, 900);

  const schemaProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://www.trendfleurs.de/dekoverleih/${item.id}#product`,
    name: item.name,
    description: content?.desc,
    category: item.cat,
    offers: {
      "@type": "Offer",
      price: item.price.replace(/[^0-9]/g, ""),
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: item.price.replace(/[^0-9]/g, ""),
        priceCurrency: "EUR",
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: item.unit.replace(/\//g, "").trim() },
      },
      seller: { "@type": "LocalBusiness", "@id": "https://www.trendfleurs.de/#business" },
      availability: "https://schema.org/InStock",
    },
    brand: { "@type": "Brand", name: "a_trendfleurs by Anni" },
    image: shopifyProduct?.imageUrl ? shopifyImageSrc(shopifyProduct.imageUrl, 800) : imgSrc(item.seed, 800),
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@id": "https://www.trendfleurs.de", name: "Home" } },
      { "@type": "ListItem", position: 2, item: { "@id": "https://www.trendfleurs.de/dekoverleih", name: "Dekoverleih" } },
      { "@type": "ListItem", position: 3, item: { "@id": `https://www.trendfleurs.de/dekoverleih/${item.id}`, name: item.name } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />

      <main>
        {/* ── Hero / Product layout ── */}
        <section style={{ background: "var(--cream)", paddingTop: "clamp(40px,7vw,80px)", paddingBottom: "clamp(48px,8vw,96px)" }}>
          <div className="tf-inner">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: "28px" }}>
              <ol style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                {[
                  { href: "/", label: "Home" },
                  { href: "/dekoverleih", label: "Dekoverleih" },
                  { label: item.name, current: true },
                ].map((b, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {i > 0 && <span aria-hidden="true" style={{ color: "var(--ink-300)", fontSize: "11px" }}>/</span>}
                    {(b as { current?: boolean }).current
                      ? <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--rust-500)" }}>{b.label}</span>
                      : <Link href={(b as { href: string }).href} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-400)" }}>{b.label}</Link>
                    }
                  </li>
                ))}
              </ol>
            </nav>

            {/* 2-col product grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "clamp(32px,5vw,64px)",
            }} className="decor-product-grid">
              {/* Image */}
              <div style={{
                position: "relative", borderRadius: "var(--r-xl)", overflow: "hidden",
                background: "var(--paper-100)",
                height: "clamp(280px, 45vw, 500px)",
              }}>
                <Image
                  src={heroImgSrc}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "contain" }}
                  priority
                />
                {item.badge && (
                  <span style={{
                    position: "absolute", top: 16, left: 16,
                    fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.18em",
                    textTransform: "uppercase", padding: "5px 12px",
                    background: "var(--rust-500)", color: "var(--on-rust)",
                    borderRadius: "var(--r-pill)",
                  }}>
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
                  {content.sub}
                </p>
                <h1 style={{
                  fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "10px",
                  fontSize: "var(--fs-h1)", lineHeight: "var(--lh-head)",
                  letterSpacing: "var(--track-tight)", color: "var(--ink-900)",
                }}>
                  {content.headline}
                </h1>

                {/* Price */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "20px" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--rust-500)" }}>
                    {item.price}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-400)" }}>
                    {item.unit}
                  </span>
                </div>

                {/* Meta row */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "14px" }}>
                  {content.dimensions && (
                    <span style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--ink-500)" }}>
                      <Package size={12} /> {content.dimensions}
                    </span>
                  )}
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--ink-500)" }}>
                    <Clock size={12} /> {content.available}
                  </span>
                  {content.deposit && (
                    <span style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--ink-500)" }}>
                      <Info size={12} /> Kaution {content.deposit}
                    </span>
                  )}
                </div>

                <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "var(--ink-700)", marginTop: "18px", maxWidth: "52ch" }}>
                  {content.desc}
                </p>

                {/* CTA buttons */}
                <div style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
                  <Link href={`/anfrage?item=${item.id}&name=${encodeURIComponent(item.name)}`} style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    background: "var(--rust-500)", color: "var(--on-rust)",
                    padding: "13px 26px", borderRadius: "var(--r-pill)", minHeight: "48px",
                  }}>
                    Jetzt anfragen <ArrowRight size={15} strokeWidth={1.8} />
                  </Link>
                  <WishlistButton
                    id={item.id}
                    name={item.name}
                    price={shopifyProduct?.price ?? item.price}
                    unit={item.unit}
                    seed={item.seed}
                    imageUrl={shopifyProduct?.imageUrl ?? undefined}
                    variants={shopifyProduct?.variants}
                  />
                </div>

                {/* Tip callout */}
                <div style={{
                  marginTop: "24px", background: "var(--gold-50)", border: "1px solid var(--gold-200)",
                  borderRadius: "var(--r-md)", padding: "14px 16px", display: "flex", gap: "10px",
                }}>
                  <span style={{ color: "var(--gold-500)", flexShrink: 0, marginTop: "1px" }}><Info size={14} /></span>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.84rem", color: "var(--ink-700)", margin: 0, lineHeight: "1.5" }}>
                    <strong style={{ color: "var(--ink-900)" }}>Anni's Tipp: </strong>{content.tip}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Includes + Occasions ── */}
        <section style={{ background: "var(--paper-100)", padding: "var(--sp-section) 0" }}>
          <div className="tf-inner" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,340px),1fr))", gap: "32px" }}>
            <div>
              <h2 style={{ fontSize: "var(--fs-h3)", marginBottom: "20px" }}>Was ist enthalten?</h2>
              <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {content.includes.map((inc) => (
                  <li key={inc} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--rust-400)", flexShrink: 0, marginTop: "2px" }}><Check size={15} strokeWidth={2.5} /></span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", color: "var(--ink-700)", lineHeight: "1.5" }}>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: "var(--fs-h3)", marginBottom: "20px" }}>Passend für</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {content.occasions.map((occ) => (
                  <span key={occ} style={{
                    fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em",
                    textTransform: "uppercase", padding: "7px 14px", borderRadius: "var(--r-pill)",
                    background: "var(--paper-0)", border: "1px solid var(--paper-300)",
                    color: "var(--ink-600)",
                  }}>{occ}</span>
                ))}
              </div>

              <div style={{ marginTop: "28px" }}>
                <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: "12px" }}>Lieferung & Abholung</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { icon: <MapPin size={14} />, text: "Abholung in Hamm/Sieg oder Lieferung gegen Aufpreis" },
                    { icon: <Clock size={14} />, text: "Verleihzeitraum i.d.R. 1–3 Tage" },
                    { icon: <Package size={14} />, text: "Aufbau & Styling durch Anni optional buchbar" },
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", color: "var(--ink-500)", fontFamily: "var(--font-sans)", fontSize: "0.85rem" }}>
                      <span style={{ flexShrink: 0, marginTop: "2px" }}>{row.icon}</span>
                      <span>{row.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related items ── */}
        {related.length > 0 && (
          <section style={{ background: "var(--cream)", padding: "var(--sp-section) 0" }}>
            <div className="tf-inner">
              <h2 style={{ marginBottom: "28px" }}>Das könnte auch passen</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "16px" }}>
                {related.map((r) => (
                  <Link key={r.id} href={`/dekoverleih/${r.id}`} style={{
                    display: "block", background: "var(--paper-0)", borderRadius: "var(--r-lg)",
                    overflow: "hidden", boxShadow: "var(--shadow-xs)", border: "1px solid var(--paper-200)",
                    transition: "box-shadow 220ms",
                  }}>
                    <div style={{ position: "relative", aspectRatio: "4/3" }}>
                      <Image
                        src={imgSrc(r.seed, 400)}
                        alt={r.name}
                        fill sizes="220px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ padding: "14px 16px" }}>
                      {r.badge && (
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--rust-500)" }}>
                          {r.badge} ·{" "}
                        </span>
                      )}
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 500, color: "var(--ink-900)" }}>{r.name}</span>
                      <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", color: "var(--rust-500)", marginTop: "4px" }}>{r.price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section style={{ background: "var(--charcoal)", padding: "clamp(64px,9vw,104px) 0" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center" }}>
            <span style={{ fontFamily: "var(--font-script)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: "var(--gold-400)", display: "block" }}>
              Interesse?
            </span>
            <h2 style={{ color: "var(--on-charcoal)", marginTop: "10px", fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--fs-h2)" }}>
              {item.name} für dein Event
            </h2>
            <p style={{ color: "rgba(244,239,231,.6)", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-body)", marginTop: "12px", lineHeight: "var(--lh-body)" }}>
              Schick uns eine kurze Anfrage — Datum, Anlass, Region. Anni antwortet persönlich.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
              <Link href={`/anfrage?item=${item.id}&name=${encodeURIComponent(item.name)}`} style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                background: "var(--rust-500)", color: "var(--on-rust)",
                padding: "14px 30px", borderRadius: "var(--r-pill)", minHeight: "48px",
              }}>
                Anfrage senden <ArrowRight size={15} strokeWidth={1.8} />
              </Link>
              <Link href="/dekoverleih" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(244,239,231,.8)", padding: "13px 22px",
                borderRadius: "var(--r-pill)", border: "1px solid rgba(244,239,231,.22)", minHeight: "48px",
              }}>
                Alle Artikel
              </Link>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @media (min-width: 768px) {
          .decor-product-grid {
            grid-template-columns: 1fr 1fr !important;
            align-items: start;
          }
        }
      `}</style>
    </>
  );
}
