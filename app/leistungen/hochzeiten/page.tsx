import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Flower2, Star, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Hochzeitsplanung & Hochzeitsfloristik — Full-Service von Floristin Anni",
  description:
    "Eure komplette Hochzeit aus einer Hand: Floristik, Tischdekoration, Brautstrauß, Traubogen und Aufbau. Persönlich geplant von Floristin Anni — Westerwald, Köln, Frankfurt & NRW.",
  keywords: [
    "Hochzeitsplanung Westerwald",
    "Hochzeitsfloristik Köln",
    "Brautstrauß Floristin",
    "Traubogen Dekoration",
    "Full-Service Hochzeit NRW",
    "Hochzeitsdeko Frankfurt",
    "Floristin Hochzeit",
    "Tischdekoration Hochzeit",
  ],
  alternates: { canonical: "https://www.trendfleurs.de/leistungen/hochzeiten" },
  openGraph: {
    title: "Hochzeitsplanung & Floristik — Full-Service | a_trendfleurs by Anni",
    description: "Euer schönster Tag — persönlich geplant von Floristin Anni. Von der ersten Beratung bis zum Aufbau. Westerwald, Köln, Frankfurt.",
    url: "https://www.trendfleurs.de/leistungen/hochzeiten",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Hochzeitsplanung und Floristik — a_trendfleurs" }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.trendfleurs.de/leistungen/hochzeiten#service",
  name: "Full-Service Hochzeitsplanung & Floristik",
  provider: { "@type": "LocalBusiness", "@id": "https://www.trendfleurs.de/#business" },
  description: "Komplette Hochzeitsgestaltung: Floristik, Dekoration, Brautstrauß, Traubogen, Tischdekoration und Aufbau — von der Planung bis zum letzten Blütenblatt.",
  serviceType: "Hochzeitsplanung",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Westerwald" },
    { "@type": "City", name: "Köln" },
    { "@type": "City", name: "Frankfurt am Main" },
    { "@type": "AdministrativeArea", name: "Hamm/Sieg" },
    { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
  ],
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@id": "https://www.trendfleurs.de", name: "Home" } },
      { "@type": "ListItem", position: 2, item: { "@id": "https://www.trendfleurs.de/leistungen", name: "Leistungen" } },
      { "@type": "ListItem", position: 3, item: { "@id": "https://www.trendfleurs.de/leistungen/hochzeiten", name: "Hochzeiten" } },
    ],
  },
};

const LEISTUNGEN = [
  { title: "Brautstrauß & Anstecker", body: "Von romantisch-verspielt bis modern-minimalistisch — Anni gestaltet euren Brautstrauß, Anstecker und Blumenschmuck für die Traugesellschaft nach eurem persönlichen Stil.", icon: "🌸" },
  { title: "Traubogen & Altar", body: "Ein floraler Traubogen wird zum Herzstück eurer Zeremonie. Frische Blumen, Trockenblumen, Pampas oder Grünpflanzen — jedes Konzept entsteht individuell für euch.", icon: "🌿" },
  { title: "Tisch- & Raumdekoration", body: "Stimmige Tischdekorationen, florale Centerpieces, Kerzenschmuck und Raumgestaltung — jedes Detail fügt sich zu einem harmonischen Gesamtbild.", icon: "✨" },
  { title: "Lieferung & Aufbau", body: "Anni und ihr Team liefern und bauen die komplette Dekoration auf — damit ihr euren Tag genießen könnt, ohne an Logistik zu denken.", icon: "🚐" },
  { title: "Persönliche Beratung", body: "Von der ersten Anfrage bis zum Tränen-Rückblick nach der Hochzeit: persönliche, kostenlose Erstberatung, Mood-Board und Konzeptplanung.", icon: "💬" },
  { title: "Abbau & Rückgabe", body: "Nach dem großen Tag kümmert sich das Team ums Abbauen und die Rückgabe von Leihartikeln — stressfrei und zuverlässig.", icon: "🎀" },
];

const REGIONS = [
  { city: "Westerwald", detail: "Heimatregion · kein Aufpreis" },
  { city: "Köln & Umgebung", detail: "Regelmäßige Fahrtzeiten eingeplant" },
  { city: "Frankfurt am Main", detail: "Auf Anfrage, Fahrtkosten je nach Entfernung" },
  { city: "Hamm/Sieg & NRW", detail: "Breite Abdeckung in NRW" },
  { city: "Düsseldorf", detail: "Auf Anfrage möglich" },
];

export default function HochzeitenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main>
        {/* ── HERO ── */}
        <section
          aria-labelledby="h-hochzeit-headline"
          style={{
            position: "relative", minHeight: "92svh",
            display: "flex", alignItems: "center", overflow: "hidden",
            background: "var(--cream)",
          }}
        >
          {/* Background */}
          <div style={{ position: "absolute", inset: 0 }}>
            <Image
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85"
              alt="Elegante Hochzeitsdekoration mit frischen Blumen — a_trendfleurs"
              fill priority sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(108deg, rgba(253,251,247,.96) 0%, rgba(253,251,247,.80) 42%, rgba(253,251,247,.25) 70%, transparent 100%)",
            }} />
          </div>

          <div className="tf-inner" style={{ position: "relative", zIndex: 2, width: "100%", padding: "clamp(100px,14vw,160px) var(--gutter) clamp(80px,10vw,120px)" }}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: "28px" }}>
              <ol style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                {[{ href: "/", label: "Home" }, { href: "/leistungen", label: "Leistungen" }, { href: "/leistungen/hochzeiten", label: "Hochzeiten", current: true }].map((b, i) => (
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
              Full-Service · Floristik · Westerwald & NRW
            </p>

            <h1 id="h-hochzeit-headline" style={{
              fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "16px",
              fontSize: "var(--fs-display)", lineHeight: "var(--lh-display)",
              letterSpacing: "var(--track-tight)", color: "var(--ink-900)", maxWidth: "14ch",
            }}>
              Euer schönster Tag — von Herzen gestaltet.
            </h1>

            <p style={{
              fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)",
              lineHeight: "var(--lh-body)", color: "var(--ink-700)",
              maxWidth: "46ch", marginTop: "24px",
            }}>
              Als Floristin im Westerwald begleite ich euch von der ersten Idee
              bis zum letzten Blütenblatt — persönlich, sorgfältig und unvergesslich.
            </p>

            <div style={{ display: "flex", gap: "14px", marginTop: "36px", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <Link href="/anfrage" style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  background: "var(--rust-500)", color: "var(--on-rust)",
                  padding: "15px 32px", borderRadius: "var(--r-pill)",
                  boxShadow: "var(--shadow-md)", minHeight: "48px",
                }}>
                  Kostenlos anfragen <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
                </Link>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--ink-400)", letterSpacing: "0.04em", paddingLeft: "4px" }}>
                  Unverbindlich · Anni antwortet persönlich in 48 h
                </span>
              </div>
              <Link href="/dekoverleih" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--ink-900)", padding: "14px 28px",
                borderRadius: "var(--r-pill)", border: "1px solid var(--ink-900)", minHeight: "48px",
              }}>
                Mietkollektion
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: "10px", marginTop: "32px", flexWrap: "wrap" }}>
              {[
                { icon: <Star size={13} />, text: "100+ Hochzeiten gestaltet" },
                { icon: <Flower2 size={13} />, text: "Ausgebildete Floristin" },
                { icon: <MapPin size={13} />, text: "Westerwald · Köln · Frankfurt" },
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

        {/* ── LEISTUNGEN GRID ── */}
        <section style={{ background: "var(--paper-100)", padding: "var(--sp-section) 0" }} aria-labelledby="leistungen-heading">
          <div className="tf-inner">
            <div style={{ textAlign: "center", marginBottom: "clamp(40px,6vw,72px)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
                Was ich für euch tue
              </p>
              <h2 id="leistungen-heading" style={{ marginTop: "12px" }}>
                Alles aus einer Hand
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", color: "var(--ink-500)", maxWidth: "50ch", margin: "14px auto 0", lineHeight: "var(--lh-body)" }}>
                Von der Konzeptidee bis zum Abbau — ich begleite euch durch jeden Schritt eurer Hochzeitsplanung.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,300px),1fr))", gap: "20px" }}>
              {LEISTUNGEN.map((l) => (
                <div key={l.title} style={{
                  background: "var(--paper-0)", borderRadius: "var(--r-lg)",
                  padding: "28px 26px", boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--paper-200)",
                }}>
                  <span style={{ fontSize: "1.6rem", display: "block", marginBottom: "14px" }}>{l.icon}</span>
                  <h3 style={{ fontSize: "var(--fs-h4)", color: "var(--ink-900)", marginBottom: "10px" }}>{l.title}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--ink-500)", lineHeight: "var(--lh-body)" }}>{l.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABLAUF ── */}
        <section style={{ background: "var(--cream)", padding: "var(--sp-section) 0" }} aria-labelledby="ablauf-heading">
          <div className="tf-inner">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,6vw,80px)", alignItems: "center" }}>
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
                  So läuft es ab
                </p>
                <h2 id="ablauf-heading" style={{ marginTop: "12px" }}>
                  Persönlich von Anfang bis Ende
                </h2>
                <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  {[
                    { step: "01", title: "Kostenlose Erstberatung", detail: "Erstes Gespräch per Video oder persönlich — ihr erzählt von eurem Traum, ich erzähle von meinen Möglichkeiten." },
                    { step: "02", title: "Konzept & Mood-Board", detail: "Ich erstelle ein individuelles Konzept mit Farbpalette, Blumenwahl und Deko-Ideen — passend zu eurem Stil und Budget." },
                    { step: "03", title: "Planung & Abstimmung", detail: "Wir stimmen alle Details ab: Lieferanten, Aufbauplan, Timeline — alles koordiniert, nichts vergessen." },
                    { step: "04", title: "Aufbau am großen Tag", detail: "Anni und ihr Team bauen alles auf, damit ihr sorgenfrei und strahlend in den schönsten Tag eures Lebens gehen könnt." },
                  ].map((s) => (
                    <div key={s.step} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: "var(--r-pill)", flexShrink: 0,
                        background: "var(--rust-50)", display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--rust-500)",
                        letterSpacing: "0.1em", border: "1px solid var(--rust-200)",
                      }}>
                        {s.step}
                      </div>
                      <div>
                        <h3 style={{ fontSize: "var(--fs-h4)", color: "var(--ink-900)", marginBottom: "6px" }}>{s.title}</h3>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--ink-500)", lineHeight: "var(--lh-body)" }}>{s.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ position: "relative", borderRadius: "var(--r-xl)", overflow: "hidden", aspectRatio: "3/4" }}>
                <Image
                  src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80"
                  alt="Floristin Anni bei der Arbeit — Hochzeitsdekoration aufbauen"
                  fill sizes="40vw"
                  style={{ objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", bottom: 20, left: 20, right: 20,
                  background: "rgba(253,251,247,0.92)", borderRadius: "var(--r-md)",
                  padding: "14px 18px", backdropFilter: "blur(12px)",
                  border: "1px solid var(--paper-300)",
                }}>
                  <p style={{ fontFamily: "var(--font-script)", fontSize: "1.4rem", color: "var(--rust-500)", margin: 0 }}>by Anni</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-400)", margin: "4px 0 0" }}>
                    Floristin · 100+ Hochzeiten
                  </p>
                </div>
              </div>
            </div>
          </div>
          <style>{`@media (max-width: 768px) { #ablauf-heading { font-size: var(--fs-h3); } [style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* ── REGIONEN ── */}
        <section style={{ background: "var(--paper-200)", padding: "var(--sp-section) 0" }} aria-labelledby="regionen-heading">
          <div className="tf-inner">
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
                Einsatzgebiet
              </p>
              <h2 id="regionen-heading" style={{ marginTop: "10px" }}>Wo ich für euch da bin</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "14px" }}>
              {REGIONS.map((r) => (
                <div key={r.city} style={{
                  background: "var(--paper-0)", borderRadius: "var(--r-md)",
                  padding: "18px 20px", border: "1px solid var(--paper-300)",
                  display: "flex", alignItems: "flex-start", gap: "12px",
                }}>
                  <MapPin size={16} style={{ color: "var(--rust-400)", marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--ink-900)", fontSize: "0.92rem", margin: 0 }}>{r.city}</p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-400)", margin: "4px 0 0" }}>{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INKLUSIVE ── */}
        <section style={{ background: "var(--cream)", padding: "var(--sp-section) 0" }}>
          <div className="tf-inner" style={{ maxWidth: "780px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
              Das ist immer inklusive
            </p>
            <h2 style={{ marginTop: "12px" }}>Ihr zahlt für Qualität, nicht für Extra-Posten</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "32px" }}>
              {[
                "Persönliche Erstberatung (kostenlos)",
                "Individuelles Konzept & Mood-Board",
                "Lieferung zum Veranstaltungsort",
                "Aufbau & Einrichtung durch Anni",
                "Koordination mit Caterer & Location",
                "Abbau und Entsorgung nach dem Event",
                "Persönlicher Ansprechpartner bis zum Schluss",
                "Flexible Anpassungen bis 4 Wochen vor dem Termin",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--rust-400)", flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--ink-700)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media (max-width: 600px) { [style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: "var(--charcoal)", padding: "clamp(72px,10vw,120px) 0" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center" }}>
            <span style={{ fontFamily: "var(--font-script)", fontSize: "clamp(2rem,4.5vw,3rem)", color: "var(--gold-400)", display: "block" }}>
              mit Liebe gemacht
            </span>
            <h2 style={{ color: "var(--on-charcoal)", marginTop: "14px", fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--fs-h2)" }}>
              Bereit, euren Tag zu planen?
            </h2>
            <p style={{ color: "rgba(244,239,231,.65)", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)", marginTop: "16px", lineHeight: "var(--lh-body)" }}>
              Anfrage kostenlos & unverbindlich — Anni meldet sich persönlich innerhalb von 48 Stunden.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", marginTop: "32px", flexWrap: "wrap", alignItems: "flex-start" }}>
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
                  <Clock size={10} style={{ display: "inline", marginRight: "4px" }} />
                  Anni antwortet in 48 h · kostenlos & unverbindlich
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
