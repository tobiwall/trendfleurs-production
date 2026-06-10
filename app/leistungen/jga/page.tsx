import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "JGA Planung — Stilvolle Junggesellinnenabschiede mit Flower Crown & edle Deko",
  description:
    "Unvergessliche Junggesellinnenabschiede in NRW: Flower-Crown-Workshops, Boho-JGA-Deko, Audio Gästetelefon und persönliche Planung von Floristin Anni. Köln, Westerwald & Frankfurt.",
  keywords: [
    "JGA Planung NRW",
    "Flower Crown Workshop Köln",
    "Junggesellinnenabschied Dekoration",
    "JGA Workshop Westerwald",
    "Flower Crown selber machen Köln",
    "JGA Ideen Boho",
    "Audio Gästetelefon JGA",
    "Brautparty Floristin",
  ],
  alternates: { canonical: "https://www.trendfleurs.de/leistungen/jga" },
  openGraph: {
    title: "JGA Planung & Flower Crown Workshop | a_trendfleurs by Anni",
    description: "Stilvolle JGA-Erlebnisse: Flower-Crown-Workshop, edle Boho-Deko, Audio Gästetelefon. Persönlich geplant von Floristin Anni in NRW.",
    url: "https://www.trendfleurs.de/leistungen/jga",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "JGA Planung und Flower Crown Workshop — a_trendfleurs" }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.trendfleurs.de/leistungen/jga#service",
  name: "JGA Planung & Flower Crown Workshop",
  provider: { "@type": "LocalBusiness", "@id": "https://www.trendfleurs.de/#business" },
  description: "Unvergessliche Junggesellinnenabschiede: Flower-Crown-Workshop, edle Boho-Deko, Audio Gästetelefon und individuelle JGA-Konzepte.",
  serviceType: "JGA-Planung",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
    { "@type": "City", name: "Köln" },
    { "@type": "City", name: "Frankfurt am Main" },
    { "@type": "AdministrativeArea", name: "Westerwald" },
  ],
};

const PAKETE = [
  {
    label: "Beliebt",
    name: "Flower Crown Workshop",
    price: "ab 49 €",
    unit: "/ Person",
    desc: "Jede Teilnehmerin bindet unter Annis Anleitung ihren eigenen floralen Blumenkranz — ein unvergessliches Erlebnis und ein Erinnerungsstück zum Mitnehmen.",
    includes: [
      "Alle Blumen & Materialien inklusive",
      "Persönliche Anleitung durch Anni",
      "Für 4–16 Teilnehmerinnen geeignet",
      "Dauer: ca. 2–2,5 Stunden",
      "Location eurer Wahl (auch outdoor)",
    ],
    accent: "var(--rust-500)",
    accentBg: "var(--rust-50)",
  },
  {
    label: null,
    name: "JGA Deko-Paket",
    price: "ab 129 €",
    unit: "/ Event",
    desc: "Edle Boho-Dekoration für euren JGA: Pampas-Arrangements, goldene Hoops, Kerzen und Ballonschmuck — aufgebaut und abgebaut von Anni.",
    includes: [
      "Komplette Raumdekoration",
      "Miete goldener Hoops & Pampas",
      "Aufbau & Abbau inklusive",
      "Anpassbar nach eurem Stil",
      "Bis 4 Stunden Mietzeit",
    ],
    accent: "var(--gold-500)",
    accentBg: "var(--gold-100)",
  },
  {
    label: null,
    name: "Audio Gästetelefon",
    price: "89 €",
    unit: "/ Event",
    desc: "Das beliebteste JGA-Extra: Das Audio Gästetelefon nimmt Sprachnachrichten, Wünsche und lustige Anekdoten auf — ein unvergessliches Geschenk für die Braut.",
    includes: [
      "Lieferung & Abholung inklusive",
      "Aufladbare Aufnahmen (unbegrenzt)",
      "Anleitung & Setup inklusive",
      "Elegantes Design",
      "Perfekt für Hochzeiten & JGA",
    ],
    accent: "var(--charcoal)",
    accentBg: "var(--paper-200)",
  },
];

export default function JGAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main>
        {/* ── HERO ── */}
        <section aria-labelledby="h-jga-headline" style={{
          position: "relative", minHeight: "90svh",
          display: "flex", alignItems: "center", overflow: "hidden",
          background: "var(--cream)",
        }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85"
              alt="Flower Crown Workshop — Frauen binden gemeinsam Blumenkränze"
              fill priority sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 25%" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(108deg, rgba(253,251,247,.97) 0%, rgba(253,251,247,.84) 42%, rgba(253,251,247,.22) 68%, transparent 100%)",
            }} />
          </div>

          <div className="tf-inner" style={{ position: "relative", zIndex: 2, width: "100%", padding: "clamp(100px,14vw,160px) var(--gutter) clamp(80px,10vw,120px)" }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: "28px" }}>
              <ol style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                {[{ href: "/", label: "Home" }, { href: "/leistungen", label: "Leistungen" }, { href: "/leistungen/jga", label: "JGA", current: true }].map((b, i) => (
                  <li key={b.href} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {i > 0 && <span aria-hidden="true" style={{ color: "var(--ink-300)", fontSize: "11px" }}>/</span>}
                    {b.current
                      ? <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--rust-500)" }}>{b.label}</span>
                      : <Link href={b.href} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-400)" }}>{b.label}</Link>
                    }
                  </li>
                ))}
              </ol>
            </nav>

            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
              Flower Crown · Boho Deko · Audio Gästetelefon · NRW
            </p>
            <h1 id="h-jga-headline" style={{
              fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "16px",
              fontSize: "var(--fs-display)", lineHeight: "var(--lh-display)",
              letterSpacing: "var(--track-tight)", color: "var(--ink-900)", maxWidth: "16ch",
            }}>
              Der unvergessliche Abend vor dem Ja.
            </h1>
            <p style={{
              fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)",
              lineHeight: "var(--lh-body)", color: "var(--ink-700)", maxWidth: "46ch", marginTop: "22px",
            }}>
              Ihr bestimmt den Stil — ich sorge für das florale Erlebnis, die edle Deko und das Audio Gästetelefon.
              Persönlich geplant für unvergessliche Momente.
            </p>

            <div style={{ display: "flex", gap: "14px", marginTop: "34px", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <Link href="/anfrage" style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  background: "var(--rust-500)", color: "var(--on-rust)",
                  padding: "15px 32px", borderRadius: "var(--r-pill)", minHeight: "48px",
                  boxShadow: "var(--shadow-md)",
                }}>
                  JGA anfragen <ArrowRight size={16} strokeWidth={1.8} />
                </Link>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--ink-400)", paddingLeft: "4px" }}>
                  Kostenlos · Anni antwortet in 48 h
                </span>
              </div>
              <Link href="#pakete" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--ink-900)", padding: "14px 28px",
                borderRadius: "var(--r-pill)", border: "1px solid var(--ink-900)", minHeight: "48px",
              }}>
                Pakete ansehen
              </Link>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "28px", flexWrap: "wrap" }}>
              {[
                { icon: <Heart size={13} />, text: "Boho & Fine Art Stil" },
                { icon: <MapPin size={13} />, text: "Köln · Westerwald · NRW" },
                { icon: <Clock size={13} />, text: "Workshops & Vollservice" },
              ].map((b) => (
                <div key={b.text} style={{
                  display: "flex", alignItems: "center", gap: "7px",
                  fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "var(--ink-600)",
                  border: "1px solid var(--paper-400)", borderRadius: "var(--r-pill)",
                  padding: "7px 13px", background: "rgba(253,251,247,0.88)", backdropFilter: "blur(8px)",
                }}>
                  {b.icon} {b.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PAKETE ── */}
        <section id="pakete" style={{ background: "var(--paper-100)", padding: "var(--sp-section) 0" }}>
          <div className="tf-inner">
            <div style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,64px)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
                Was ich anbiete
              </p>
              <h2 style={{ marginTop: "10px" }}>JGA-Pakete von Floristin Anni</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))", gap: "20px" }}>
              {PAKETE.map((p) => (
                <div key={p.name} style={{
                  background: "var(--paper-0)", borderRadius: "var(--r-xl)",
                  boxShadow: "var(--shadow-md)", overflow: "hidden",
                  border: "1px solid var(--paper-200)",
                  display: "flex", flexDirection: "column",
                  position: "relative",
                }}>
                  {p.label && (
                    <div style={{
                      position: "absolute", top: "16px", right: "16px",
                      fontFamily: "var(--font-mono)", fontSize: "8.5px",
                      letterSpacing: "0.14em", textTransform: "uppercase",
                      background: "var(--rust-500)", color: "var(--on-rust)",
                      padding: "4px 10px", borderRadius: "var(--r-pill)",
                    }}>
                      {p.label}
                    </div>
                  )}
                  <div style={{ height: "6px", background: p.accent }} />
                  <div style={{ padding: "28px 26px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--fs-h3)", color: "var(--ink-900)" }}>{p.name}</h3>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "8px" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.5rem", fontWeight: 700, color: p.accent }}>{p.price}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-400)" }}>{p.unit}</span>
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--ink-500)", lineHeight: "var(--lh-body)", marginTop: "14px", flex: 1 }}>{p.desc}</p>
                    <ul style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {p.includes.map((inc) => (
                        <li key={inc} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                          <span style={{ color: p.accent, fontSize: "14px", marginTop: "1px" }}>✓</span>
                          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--ink-600)" }}>{inc}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/anfrage" style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      marginTop: "22px", fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 500,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      background: p.accent, color: "var(--paper-0)",
                      padding: "12px 20px", borderRadius: "var(--r-pill)", minHeight: "44px",
                    }}>
                      Anfragen <ArrowRight size={13} strokeWidth={1.8} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FLOWER CROWN DETAIL ── */}
        <section style={{ background: "var(--cream)", padding: "var(--sp-section) 0" }}>
          <div className="tf-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,6vw,80px)", alignItems: "center" }}>
            <div style={{ position: "relative", borderRadius: "var(--r-xl)", overflow: "hidden", aspectRatio: "4/5" }}>
              <Image
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80"
                alt="Flower Crown Workshop — Floristin Anni zeigt das Binden von Blumenkränzen"
                fill sizes="40vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
                Highlight-Erlebnis
              </p>
              <h2 style={{ marginTop: "12px" }}>Flower Crown Workshop — ein Erlebnis für alle</h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", color: "var(--ink-500)", lineHeight: "var(--lh-body)", marginTop: "16px" }}>
                Unter Annis persönlicher Anleitung bindet jede Teilnehmerin einen eigenen, floralen Blumenkranz.
                Frische und getrocknete Blumen, Kräuter und persönliche Lieblingsfarben — jedes Stück wird ein Unikat.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", color: "var(--ink-500)", lineHeight: "var(--lh-body)", marginTop: "12px" }}>
                Der Workshop dauert ca. 2–2,5 Stunden und kann bei euch zu Hause, in einer Location eurer Wahl oder im Freien stattfinden.
                Alle Materialien werden mitgebracht — ihr müsst nur erscheinen und Spaß haben.
              </p>
              <div style={{ display: "flex", gap: "8px", marginTop: "20px", flexWrap: "wrap" }}>
                {["4–16 Personen", "Ab 49 € / Person", "Alle Materialien dabei", "Dauer ca. 2 h", "Outdoor möglich"].map((tag) => (
                  <span key={tag} style={{
                    fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em",
                    textTransform: "uppercase", padding: "5px 11px", borderRadius: "var(--r-pill)",
                    background: "var(--rust-50)", color: "var(--rust-500)", border: "1px solid var(--rust-200)",
                  }}>{tag}</span>
                ))}
              </div>
              <Link href="/anfrage" style={{
                display: "inline-flex", alignItems: "center", gap: "10px", marginTop: "28px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                background: "var(--rust-500)", color: "var(--on-rust)",
                padding: "14px 28px", borderRadius: "var(--r-pill)", minHeight: "48px",
              }}>
                Workshop anfragen <ArrowRight size={15} strokeWidth={1.8} />
              </Link>
            </div>
          </div>
          <style>{`@media (max-width: 768px) { [style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: "var(--charcoal)", padding: "clamp(72px,10vw,120px) 0" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center" }}>
            <span style={{ fontFamily: "var(--font-script)", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--gold-400)", display: "block" }}>
              unvergessliche Momente
            </span>
            <h2 style={{ color: "var(--on-charcoal)", marginTop: "12px", fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--fs-h2)" }}>
              Plant gemeinsam den perfekten JGA.
            </h2>
            <p style={{ color: "rgba(244,239,231,.65)", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)", marginTop: "14px", lineHeight: "var(--lh-body)" }}>
              Erzählt mir von euren Vorstellungen — ich schicke euch ein maßgeschneidertes Angebot.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", marginTop: "28px", flexWrap: "wrap" }}>
              <Link href="/anfrage" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                background: "var(--rust-500)", color: "var(--on-rust)",
                padding: "15px 32px", borderRadius: "var(--r-pill)", minHeight: "48px",
              }}>
                JGA jetzt anfragen <ArrowRight size={16} strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
