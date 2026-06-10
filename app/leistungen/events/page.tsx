import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, MapPin, Clock, Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Events & Corporate — Floristik & Dekoration für Geburtstage, Jubiläen & Firmenfeiern",
  description:
    "Edle Eventdekoration für Geburtstage, Jubiläen, Corporate Events und Privatfeiern — professionell geplant von Floristin Anni. Floristik & Deko in Köln, Frankfurt, Westerwald & NRW.",
  keywords: [
    "Event Floristik NRW",
    "Corporate Event Dekoration Köln",
    "Geburtstag Deko Floristin",
    "Jubiläum Dekoration Frankfurt",
    "Privatfeier Floristik Westerwald",
    "Event Planer NRW",
    "Blumenschmuck Firmenfeier",
    "Eventdeko mieten",
  ],
  alternates: { canonical: "https://www.trendfleurs.de/leistungen/events" },
  openGraph: {
    title: "Events & Corporate Floristik | a_trendfleurs by Anni",
    description: "Edle Eventdekoration für Geburtstage, Jubiläen & Firmenfeiern — persönlich geplant und umgesetzt. Köln, Frankfurt, Westerwald & NRW.",
    url: "https://www.trendfleurs.de/leistungen/events",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Event Floristik und Dekoration — a_trendfleurs" }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.trendfleurs.de/leistungen/events#service",
  name: "Event Floristik & Dekoration",
  provider: { "@type": "LocalBusiness", "@id": "https://www.trendfleurs.de/#business" },
  description: "Floristik und Dekoration für Geburtstage, Jubiläen, Corporate Events und exklusive Privatfeiern — professionell konzipiert und umgesetzt.",
  serviceType: "Event-Dekoration",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
    { "@type": "City", name: "Köln" },
    { "@type": "City", name: "Frankfurt am Main" },
    { "@type": "AdministrativeArea", name: "Westerwald" },
  ],
};

const EVENT_TYPES = [
  {
    icon: "🎂",
    title: "Runde Geburtstage",
    body: "Ob 30, 40, 50 oder 70 — eine runde Zahl verdient einen unvergesslichen Rahmen. Florale Installationen, Tischdekoration und Raumgestaltung, die begeistern.",
    tags: ["Tischdeko", "Blumenwand", "Ballongestaltung"],
  },
  {
    icon: "🏢",
    title: "Corporate & Firmenfeiern",
    body: "Betriebsfeiern, Produktlaunch, Jahrestagung — professionelle Eventdekoration, die zur Unternehmensidentität passt und Eindruck hinterlässt.",
    tags: ["Branded Deko", "Messestand", "Empfangsbereich"],
  },
  {
    icon: "🥂",
    title: "Jubiläen & Anlässe",
    body: "Hochzeitsjubiläen, Abschlussfeiern, Taufen und Konfirmationen — jeder besondere Anlass verdient eine maßgeschneiderte, stimmige Dekoration.",
    tags: ["Goldene Hochzeit", "Schulabschluss", "Taufe"],
  },
  {
    icon: "✨",
    title: "Exklusive Privatfeiern",
    body: "Dinner-Party, Garden-Party oder Charity-Event — für private Anlässe, bei denen jedes Detail stimmen muss und Ästhetik keine Kompromisse kennt.",
    tags: ["Dinner-Party", "Garden Party", "Charity"],
  },
];

const INCLUDES = [
  "Persönliche Erstberatung inklusive",
  "Individuelle Konzeptentwicklung",
  "Komplette Raumgestaltung möglich",
  "Leih- und Kaufartikel kombinierbar",
  "Lieferung, Aufbau & Abbau",
  "Persönlicher Ansprechpartner vor Ort",
];

export default function EventsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main>
        {/* ── HERO ── */}
        <section aria-labelledby="h-events-headline" style={{
          position: "relative", minHeight: "88svh",
          display: "flex", alignItems: "center", overflow: "hidden",
          background: "var(--cream)",
        }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <Image
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1800&q=85"
              alt="Elegante Eventdekoration mit floralen Arrangements — a_trendfleurs"
              fill priority sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(108deg, rgba(253,251,247,.96) 0%, rgba(253,251,247,.82) 44%, rgba(253,251,247,.20) 72%, transparent 100%)",
            }} />
          </div>

          <div className="tf-inner" style={{ position: "relative", zIndex: 2, width: "100%", padding: "clamp(100px,14vw,160px) var(--gutter) clamp(80px,10vw,120px)" }}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: "28px" }}>
              <ol style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                {[{ href: "/", label: "Home" }, { href: "/leistungen", label: "Leistungen" }, { href: "/leistungen/events", label: "Events", current: true }].map((b, i) => (
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
              Corporate · Geburtstage · Privatfeiern · NRW & Westerwald
            </p>
            <h1 id="h-events-headline" style={{
              fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "16px",
              fontSize: "var(--fs-display)", lineHeight: "var(--lh-display)",
              letterSpacing: "var(--track-tight)", color: "var(--ink-900)", maxWidth: "16ch",
            }}>
              Events, die im Gedächtnis bleiben.
            </h1>
            <p style={{
              fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)",
              lineHeight: "var(--lh-body)", color: "var(--ink-700)", maxWidth: "48ch", marginTop: "22px",
            }}>
              Vom intimen Dinner bis zur großen Firmenfeier — ich gestalte Räume, die Atmosphäre schaffen und Gäste begeistern.
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
                  Event anfragen <ArrowRight size={16} strokeWidth={1.8} />
                </Link>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--ink-400)", paddingLeft: "4px" }}>
                  Kostenlos & unverbindlich · Antwort in 48 h
                </span>
              </div>
              <Link href="/dekoverleih" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--ink-900)", padding: "14px 28px",
                borderRadius: "var(--r-pill)", border: "1px solid var(--ink-900)", minHeight: "48px",
              }}>
                Deko mieten
              </Link>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "28px", flexWrap: "wrap" }}>
              {[
                { icon: <Users size={13} />, text: "10–500 Gäste" },
                { icon: <Sparkles size={13} />, text: "Jeder Stil & jedes Budget" },
                { icon: <MapPin size={13} />, text: "Köln · Frankfurt · NRW" },
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

        {/* ── EVENT TYPES ── */}
        <section style={{ background: "var(--paper-100)", padding: "var(--sp-section) 0" }}>
          <div className="tf-inner">
            <div style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,64px)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
                Für welche Events
              </p>
              <h2 style={{ marginTop: "10px" }}>Jeder Anlass verdient das Beste</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))", gap: "20px" }}>
              {EVENT_TYPES.map((e) => (
                <div key={e.title} style={{
                  background: "var(--paper-0)", borderRadius: "var(--r-lg)",
                  padding: "28px 24px", boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--paper-200)", display: "flex", flexDirection: "column", gap: "12px",
                }}>
                  <span style={{ fontSize: "1.8rem" }}>{e.icon}</span>
                  <h3 style={{ fontSize: "var(--fs-h4)", color: "var(--ink-900)" }}>{e.title}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--ink-500)", lineHeight: "var(--lh-body)", flex: 1 }}>{e.body}</p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {e.tags.map((t) => (
                      <span key={t} style={{
                        fontFamily: "var(--font-mono)", fontSize: "8.5px", letterSpacing: "0.1em",
                        textTransform: "uppercase", padding: "4px 9px", borderRadius: "var(--r-pill)",
                        background: "var(--rust-50)", color: "var(--rust-500)", border: "1px solid var(--rust-200)",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY STRIP ── */}
        <section aria-hidden="true" style={{ overflow: "hidden", height: "clamp(220px,28vw,360px)", display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {[
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=75",
            "https://images.unsplash.com/photo-1544078751-58fed2b32c83?auto=format&fit=crop&w=800&q=75",
            "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?auto=format&fit=crop&w=800&q=75",
          ].map((src, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden" }}>
              <Image src={src} alt="" fill sizes="33vw" style={{ objectFit: "cover" }} />
            </div>
          ))}
        </section>

        {/* ── INKLUSIVE ── */}
        <section style={{ background: "var(--cream)", padding: "var(--sp-section) 0" }}>
          <div className="tf-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,6vw,72px)", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
                Das ist immer dabei
              </p>
              <h2 style={{ marginTop: "10px" }}>Rundum-sorglos von Anfang bis Ende</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "28px" }}>
                {INCLUDES.map((item) => (
                  <div key={item} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--rust-400)", flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--ink-700)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/anfrage" style={{
                display: "inline-flex", alignItems: "center", gap: "10px", marginTop: "32px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                background: "var(--charcoal)", color: "var(--on-charcoal)",
                padding: "14px 28px", borderRadius: "var(--r-pill)", minHeight: "48px",
              }}>
                Event anfragen <ArrowRight size={15} strokeWidth={1.8} />
              </Link>
            </div>
            <div style={{ position: "relative", borderRadius: "var(--r-xl)", overflow: "hidden", aspectRatio: "4/5" }}>
              <Image
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80"
                alt="Eventdekoration — elegante Tischgestaltung mit Blumen"
                fill sizes="40vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <style>{`@media (max-width: 768px) { [style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: "var(--charcoal)", padding: "clamp(72px,10vw,120px) 0" }}>
          <div style={{ maxWidth: "620px", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center" }}>
            <span style={{ fontFamily: "var(--font-script)", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--gold-400)", display: "block" }}>
              mit Liebe gemacht
            </span>
            <h2 style={{ color: "var(--on-charcoal)", marginTop: "12px", fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--fs-h2)" }}>
              Dein nächstes Event wartet.
            </h2>
            <p style={{ color: "rgba(244,239,231,.65)", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)", marginTop: "14px", lineHeight: "var(--lh-body)" }}>
              Beschreibe mir deine Vorstellung — ich melde mich persönlich mit einem ersten Konzept.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", marginTop: "30px", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <Link href="/anfrage" style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  background: "var(--rust-500)", color: "var(--on-rust)",
                  padding: "15px 32px", borderRadius: "var(--r-pill)", minHeight: "48px",
                }}>
                  Jetzt anfragen <ArrowRight size={16} strokeWidth={1.8} />
                </Link>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(244,239,231,.45)" }}>
                  <Clock size={10} style={{ display: "inline", marginRight: "4px" }} />Kostenlos · Anni antwortet in 48 h
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
