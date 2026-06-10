import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Heart, MapPin, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Über Anni — Floristin & Inhaberin a_trendfleurs",
  description:
    "Lerne Anni kennen: Ausgebildete Floristin, leidenschaftliche Hochzeitsplanerin und Herz hinter a_trendfleurs. Persönliche Geschichte, Expertise & E-E-A-T aus dem Westerwald.",
  keywords: [
    "Floristin Westerwald",
    "Hochzeitsplanerin Anni",
    "a_trendfleurs Inhaberin",
    "Blumendesign Erfahrung",
    "Floristin Geschichte",
    "Hochzeitsfloristik Expertise",
    "Westerwald Floristin",
  ],
  alternates: { canonical: "https://www.trendfleurs.de/ueber-uns" },
  openGraph: {
    title: "Über Anni — Floristin & Inhaberin | a_trendfleurs by Anni",
    description: "Die Geschichte hinter a_trendfleurs: Floristin Anni aus dem Westerwald über ihre Leidenschaft für florale Gestaltung.",
    url: "https://www.trendfleurs.de/ueber-uns",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Floristin Anni — a_trendfleurs" }],
  },
};

const schemaPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.trendfleurs.de/ueber-uns#anni",
  name: "Anni",
  jobTitle: "Floristin & Unternehmerin",
  description: "Ausgebildete Floristin und Inhaberin von a_trendfleurs by Anni. Spezialisiert auf Hochzeitsfloristik, Dekoverleih und Eventgestaltung im Westerwald und NRW.",
  worksFor: { "@type": "LocalBusiness", "@id": "https://www.trendfleurs.de/#business" },
  knowsAbout: ["Hochzeitsfloristik", "Eventdekoration", "Dekoverleih", "JGA-Planung", "Trockenblumen", "Florales Design"],
  image: "https://www.trendfleurs.de/anni2.jpg",
  url: "https://www.trendfleurs.de/ueber-uns",
};

const schemaPage = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.trendfleurs.de/ueber-uns#page",
  name: "Über Anni — Floristin & Inhaberin a_trendfleurs",
  description: "Die Geschichte und Expertise hinter a_trendfleurs by Anni.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@id": "https://www.trendfleurs.de", name: "Home" } },
      { "@type": "ListItem", position: 2, item: { "@id": "https://www.trendfleurs.de/ueber-uns", name: "Über uns" } },
    ],
  },
};

const WERTE = [
  { icon: <Heart size={20} />, title: "Persönlichkeit first", body: "Jede Anfrage beantworte ich selbst. Kein Callcenter, kein Assistent — Anni persönlich, von der ersten Nachricht bis zum letzten Blütenblatt." },
  { icon: <Award size={20} />, title: "Handwerkliche Exzellenz", body: "Als ausgebildete Floristin steckt in jedem Arrangement jahrelanges Handwerk, Farbgefühl und das Wissen um saisonale Blumen." },
  { icon: <Star size={20} />, title: "Konzept statt Katalog", body: "Ich arbeite nicht mit Standardpaketen. Jedes Konzept entsteht individuell — passend zu euch, eurem Stil und eurem Budget." },
  { icon: <MapPin size={20} />, title: "Heimat trifft Fernweh", body: "Verwurzelt im Westerwald, unterwegs in NRW und darüber hinaus. Die Region ist meine Heimat — ihre Feste zu gestalten meine Berufung." },
];

export default function UeberUnsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPerson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPage) }} />

      <main>
        {/* ── HERO ──
            DOM order: Portrait FIRST → Text SECOND.
            On desktop we use CSS order to put text left, portrait right.
            On mobile the portrait fills the screen at full width — unclipped, unobscured. */}
        <section aria-labelledby="h-ueber-headline" className="ueber-hero">

          {/* Portrait — full-bleed on mobile, organic oval on desktop */}
          <div className="ueber-portrait-wrap">
            <Image
              src="/anni1.jpg"
              alt="Floristin Anni, Inhaberin von a_trendfleurs by Anni"
              fill
              sizes="(max-width: 860px) 100vw, 45vw"
              style={{ objectFit: "cover", objectPosition: "top center" }}
              priority
            />
            {/* Gradient only on DESKTOP (covered via CSS) */}
            <div className="ueber-portrait-gradient" aria-hidden="true" />
            {/* Badge overlaid on portrait */}
            <div className="ueber-anni-badge">
              <p style={{ fontFamily: "var(--font-script)", fontSize: "1.3rem", color: "var(--rust-500)", margin: 0, lineHeight: 1 }}>by Anni</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-400)", margin: "4px 0 0" }}>
                Floristin · Westerwald
              </p>
            </div>
          </div>

          {/* Text content */}
          <div className="ueber-text-wrap">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: "24px" }}>
              <ol style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                {[{ href: "/", label: "Home" }, { href: "/ueber-uns", label: "Über uns", current: true }].map((b, i) => (
                  <li key={b.href} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {i > 0 && <span aria-hidden="true" style={{ color: "var(--ink-300)", fontSize: "11px" }}>/</span>}
                    {(b as { current?: boolean }).current
                      ? <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--rust-500)" }}>{b.label}</span>
                      : <Link href={b.href} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-400)" }}>{b.label}</Link>
                    }
                  </li>
                ))}
              </ol>
            </nav>

            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
              Die Geschichte dahinter
            </p>
            <h1 id="h-ueber-headline" style={{
              fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "12px",
              fontSize: "var(--fs-h1)", lineHeight: "var(--lh-head)",
              letterSpacing: "var(--track-tight)", color: "var(--ink-900)",
            }}>
              Hallo, ich bin Anni.
            </h1>
            <div style={{ marginTop: "8px" }}>
              <span style={{ fontFamily: "var(--font-script)", fontSize: "clamp(1.5rem,3.5vw,2.2rem)", color: "var(--rust-500)" }}>
                Floristin & Inhaberin
              </span>
            </div>
            <p style={{
              fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)",
              lineHeight: "var(--lh-body)", color: "var(--ink-700)", maxWidth: "42ch", marginTop: "18px",
            }}>
              Blumen sind für mich nie nur Dekoration — sie sind Sprache.
              Eine Sprache, die ich seit Jahren lerne, verfeinere und mit Herz spreche.
            </p>
            <div style={{ display: "flex", gap: "8px", marginTop: "20px", flexWrap: "wrap" }}>
              {["Ausgebildete Floristin", "100+ Hochzeiten", "Westerwald & NRW"].map((tag) => (
                <span key={tag} style={{
                  fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em",
                  textTransform: "uppercase", padding: "5px 12px", borderRadius: "var(--r-pill)",
                  background: "var(--rust-50)", color: "var(--rust-600)", border: "1px solid var(--rust-200)",
                }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
              <Link href="/anfrage" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                background: "var(--rust-500)", color: "var(--on-rust)",
                padding: "13px 26px", borderRadius: "var(--r-pill)", minHeight: "48px",
              }}>
                Kontakt aufnehmen <ArrowRight size={15} strokeWidth={1.8} />
              </Link>
              <Link href="/leistungen" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--ink-900)", padding: "13px 22px",
                borderRadius: "var(--r-pill)", border: "1px solid var(--ink-900)", minHeight: "48px",
              }}>
                Leistungen
              </Link>
            </div>
          </div>
        </section>

        {/* ── STORY ── */}
        <section style={{ background: "var(--paper-100)", padding: "var(--sp-section) 0" }}>
          <div className="tf-inner" style={{ maxWidth: "780px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
              Meine Geschichte
            </p>
            <h2 style={{ marginTop: "10px" }}>Vom ersten Strauß zur eigenen Floristerei</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "28px" }}>
              {[
                "Ich bin in einer kleinen Gemeinde im Westerwald aufgewachsen, umgeben von Wiesen, Wäldern und dem unbedingten Wunsch, Dinge schön zu machen. Als Kind habe ich heimlich Blumen gepflückt und sie für meine Mutter arrangiert — damals wusste ich noch nicht, dass daraus ein Beruf werden würde.",
                "Meine Ausbildung zur Floristin hat mir das Handwerk von Grund auf beigebracht: Farbenlehre, saisonale Botanik, Bindtechniken, Raumgestaltung. Dieses fundierte Wissen gibt mir heute die Freiheit, jede Anfrage eigenständig und kompromisslos umzusetzen.",
                "a_trendfleurs by Anni habe ich gegründet, weil ich gemerkt habe: Das Beste entsteht, wenn eine Person das Ganze im Blick hat. Ich plane, kaufe, binde, liefere und baue auf — persönlich. Kein ausgelagerter Aufbau, kein Fremdeinkauf. Alles mit meinen eigenen Händen und aus Überzeugung.",
                "Was mich antreibt? Der Moment, in dem ein Brautpaar die Dekoration sieht und einfach strahlt. Dieser Moment ist unbezahlbar — und dafür stehe ich morgens auf.",
              ].map((para, i) => (
                <p key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "var(--ink-700)" }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ── WERTE ── */}
        <section style={{ background: "var(--cream)", padding: "var(--sp-section) 0" }}>
          <div className="tf-inner">
            <div style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,64px)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
                Was mich ausmacht
              </p>
              <h2 style={{ marginTop: "10px" }}>Meine Werte & mein Versprechen</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,240px),1fr))", gap: "18px" }}>
              {WERTE.map((w) => (
                <div key={w.title} style={{
                  background: "var(--paper-0)", borderRadius: "var(--r-lg)",
                  padding: "26px 22px", boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--paper-200)",
                }}>
                  <div style={{ color: "var(--rust-400)", marginBottom: "12px" }}>{w.icon}</div>
                  <h3 style={{ fontSize: "var(--fs-h4)", color: "var(--ink-900)", marginBottom: "8px" }}>{w.title}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-500)", lineHeight: "var(--lh-body)" }}>{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ZAHLEN ── */}
        <section style={{ background: "var(--paper-200)", padding: "clamp(56px,7vw,96px) 0" }}>
          <div className="tf-inner">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "24px", textAlign: "center" }}>
              {[
                { num: "100+", label: "Hochzeiten gestaltet" },
                { num: "5 Jahre", label: "Selbstständige Floristin" },
                { num: "5 Regionen", label: "Einsatzgebiet NRW" },
                { num: "★★★★★", label: "Kundenbewertungen" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--rust-500)", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-400)", marginTop: "8px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERTISE + Bild (2-col, responsive) ── */}
        <section style={{ background: "var(--cream)", padding: "var(--sp-section) 0" }}>
          <div className="tf-inner ueber-expertise-grid">
            <div style={{ position: "relative", borderRadius: "var(--r-xl)", overflow: "hidden", aspectRatio: "4/3" }}>
              <Image
                src="https://images.unsplash.com/photo-1490750967868-88df5691cc81?auto=format&fit=crop&w=900&q=80"
                alt="Floristin Anni bei der Arbeit — florales Arrangement für eine Hochzeit"
                fill sizes="(max-width: 768px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
                Expertise & Ausbildung
              </p>
              <h2 style={{ marginTop: "10px" }}>Handwerklich ausgebildet</h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", color: "var(--ink-500)", lineHeight: "var(--lh-body)", marginTop: "16px" }}>
                Die Ausbildung zur Floristin ist kein Marketing-Begriff — sie bedeutet nachgewiesene Fachkompetenz:
                Bindtechnik, Botanik, Farbgestaltung und kreatives Design auf höchstem Handwerksniveau.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", color: "var(--ink-500)", lineHeight: "var(--lh-body)", marginTop: "12px" }}>
                Das bedeutet für euch: Ich weiß, welche Blumen im August verfügbar sind, welche Kombinationen farblich harmonieren
                und wie ein 5-Meter-Traubogen so gebaut wird, dass er auch nach 8 Stunden noch traumhaft aussieht.
              </p>
              <div style={{ marginTop: "22px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["Ausgebildete Floristin", "Hochzeitsfloristik", "Event & Raumgestaltung", "Dried Flower Design"].map((c) => (
                  <span key={c} style={{
                    fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em",
                    textTransform: "uppercase", padding: "5px 11px", borderRadius: "var(--r-pill)",
                    background: "var(--gold-100)", color: "var(--gold-600)", border: "1px solid var(--gold-300)",
                  }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: "var(--charcoal)", padding: "clamp(72px,10vw,120px) 0" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center" }}>
            <span style={{ fontFamily: "var(--font-script)", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--gold-400)", display: "block" }}>
              Lass uns reden
            </span>
            <h2 style={{ color: "var(--on-charcoal)", marginTop: "12px", fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--fs-h2)" }}>
              Schreib mir. Ich freue mich.
            </h2>
            <p style={{ color: "rgba(244,239,231,.65)", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)", marginTop: "14px", lineHeight: "var(--lh-body)" }}>
              Ob Hochzeit, JGA, Corporate oder einfach eine Frage — ich antworte persönlich innerhalb von 48 Stunden.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", marginTop: "28px", flexWrap: "wrap" }}>
              <Link href="/anfrage" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                background: "var(--rust-500)", color: "var(--on-rust)",
                padding: "15px 32px", borderRadius: "var(--r-pill)", minHeight: "48px",
              }}>
                Nachricht schreiben <ArrowRight size={16} strokeWidth={1.8} />
              </Link>
              <Link href="/leistungen" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(244,239,231,.85)", padding: "14px 26px",
                borderRadius: "var(--r-pill)", border: "1px solid rgba(244,239,231,.25)", minHeight: "48px",
              }}>
                Leistungen ansehen
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Responsive CSS for this page */}
      <style>{`
        /* Hero: portrait first on mobile, 2-col on desktop */
        .ueber-hero {
          display: flex;
          flex-direction: column;
          background: var(--cream);
        }
        .ueber-portrait-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
          flex-shrink: 0;
        }
        .ueber-portrait-gradient { display: none; }
        .ueber-anni-badge {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: rgba(253,251,247,0.92);
          border-radius: var(--r-md);
          border: 1px solid var(--paper-300);
          padding: 10px 14px;
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow-sm);
        }
        .ueber-text-wrap {
          padding: clamp(32px,6vw,56px) var(--gutter);
        }
        /* Desktop: 2-column side-by-side */
        @media (min-width: 860px) {
          .ueber-hero {
            flex-direction: row;
            min-height: 92svh;
            align-items: stretch;
          }
          .ueber-portrait-wrap {
            width: 44%;
            aspect-ratio: auto;
            min-height: 100%;
          }
          /* Organic clip on desktop only */
          .ueber-portrait-wrap img {
            border-radius: 0 var(--r-xl) var(--r-xl) 0;
          }
          .ueber-portrait-gradient {
            display: block;
            position: absolute;
            inset: 0;
            background: linear-gradient(to right, transparent 60%, var(--cream) 100%);
          }
          .ueber-anni-badge {
            bottom: 28px;
            left: 28px;
          }
          .ueber-text-wrap {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: clamp(80px,10vw,120px) var(--gutter) clamp(80px,10vw,120px) clamp(32px,4vw,56px);
          }
        }
        /* Expertise 2-col */
        .ueber-expertise-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 768px) {
          .ueber-expertise-grid {
            grid-template-columns: 1fr 1fr;
            gap: clamp(32px,6vw,72px);
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}
