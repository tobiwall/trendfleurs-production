import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ — Häufige Fragen zu Dekoverleih, Liefergebiet & Ablauf",
  description:
    "Häufig gestellte Fragen zu Dekoverleih, Liefergebiet (Köln, Frankfurt, Westerwald, Hamm/Sieg), Reinigung, Buchungsablauf und Hochzeitsplanung — a_trendfleurs by Anni.",
  keywords: [
    "Dekoverleih FAQ",
    "Hochzeitsplanung Fragen",
    "Liefergebiet Dekoverleih",
    "Reinigung Mietdeko",
    "Buchungsablauf Floristin",
    "JGA Workshop FAQ",
    "Hochzeitsplanung Ablauf NRW",
  ],
  alternates: { canonical: "https://www.trendfleurs.de/faq" },
  openGraph: {
    title: "FAQ — Häufige Fragen | a_trendfleurs by Anni",
    description: "Antworten zu Dekoverleih, Liefergebiet, Reinigung, Buchungsablauf und mehr. Westerwald, Köln, Frankfurt & NRW.",
    url: "https://www.trendfleurs.de/faq",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FAQ — a_trendfleurs by Anni" }],
  },
};

/* FAQ data — also used for Schema.org FAQPage rich snippet */
const FAQ_ITEMS = [
  /* Liefergebiet */
  {
    category: "Liefergebiet & Verfügbarkeit",
    question: "In welchen Regionen bist du tätig?",
    answer: "Mein Heimatgebiet ist der Westerwald (Hamm/Sieg und Umgebung). Ich bin regelmäßig in Köln, im Großraum Frankfurt am Main und im gesamten Nordrhein-Westfalen tätig. Für Events außerhalb dieser Regionen freue ich mich über eine individuelle Anfrage — Fernfahrten sind nach Absprache möglich.",
  },
  {
    category: "Liefergebiet & Verfügbarkeit",
    question: "Fallen Fahrtkosten an?",
    answer: "Im Westerwald und in einem Umkreis von ca. 50 km um meinen Standort entstehen keine zusätzlichen Fahrtkosten. Für weitere Entfernungen (Köln, Frankfurt, Düsseldorf) kalkulieren wir die Fahrtkosten transparent im Angebot ein — keine versteckten Gebühren.",
  },
  {
    category: "Liefergebiet & Verfügbarkeit",
    question: "Wie weit im Voraus muss ich anfragen?",
    answer: "Für Hochzeiten empfehle ich eine Anfrage 6–18 Monate vor dem Termin, da die beliebtesten Wochenenden schnell ausgebucht sind. Für Dekoverleih und Events ist auch eine Buchung 4–8 Wochen vorher oft noch möglich — frag einfach an, ich prüfe die Verfügbarkeit direkt.",
  },

  /* Dekoverleih */
  {
    category: "Dekoverleih & Mietartikel",
    question: "Wie funktioniert der Wunschzettel beim Dekoverleih?",
    answer: "Du kannst auf der Dekoverleih-Seite Artikel zu deinem persönlichen Wunschzettel hinzufügen und diesen kostenlos & unverbindlich an mich senden. Ich melde mich dann persönlich mit Verfügbarkeit, Preisen und einem maßgeschneiderten Angebot.",
  },
  {
    category: "Dekoverleih & Mietartikel",
    question: "Gibt es eine Mindestbestellmenge beim Dekoverleih?",
    answer: "Nein, es gibt keine Mindestbestellmenge. Ob du nur einen Goldenen Hoop oder eine komplette Tischdeko für 150 Gäste möchtest — beides ist willkommen. Kleine und große Anfragen werden gleich herzlich bearbeitet.",
  },
  {
    category: "Dekoverleih & Mietartikel",
    question: "Wer reinigt die gemieteten Dekoartikel?",
    answer: "Alle Mietartikel werden von mir nach der Rückgabe professionell gereinigt und geprüft. Du gibst die Artikel einfach zurück — eine Grundreinigung ist im Mietpreis inbegriffen. Bei starken Verschmutzungen (z.B. Kerzenreste auf Tischtüchern oder sichtbaren Schäden) kann ein pauschaler Reinigungsaufpreis anfallen, der vorher im Vertrag festgehalten wird.",
  },
  {
    category: "Dekoverleih & Mietartikel",
    question: "Kann ich Mietartikel mit gekauften Artikeln kombinieren?",
    answer: "Absolut — das empfehle ich sogar. Personalisierte Artikel wie Willkommensschilder oder Tischkarten aus dem Shop lassen sich perfekt mit gemieteten Hoops, Kerzenständern und Pampas kombinieren. Ich helfe dir gerne bei der Zusammenstellung für dein individuelles Konzept.",
  },

  /* Buchung & Ablauf */
  {
    category: "Buchung & Ablauf",
    question: "Wie läuft eine Anfrage ab?",
    answer: "Du sendest mir über das Anfrageformular oder per E-Mail deine Wünsche — so viel oder wenig Detail wie du möchtest. Ich antworte persönlich innerhalb von 48 Stunden mit einer ersten Einschätzung und ggf. einem Terminvorschlag für ein kostenloses Erstgespräch (per Video oder vor Ort).",
  },
  {
    category: "Buchung & Ablauf",
    question: "Kostet die Erstberatung etwas?",
    answer: "Die erste Beratung ist immer kostenlos und unverbindlich. Erst wenn ihr ein Angebot annehmt und einen Vertrag unterschreibt, entsteht eine verbindliche Buchung. Kein Risiko, kein Druck.",
  },
  {
    category: "Buchung & Ablauf",
    question: "Was passiert, wenn ich kurzfristig absagen muss?",
    answer: "Ich verstehe, dass sich Umstände ändern können. In meinen AGB sind faire Stornobedingungen geregelt: Bei einer Absage mehr als 8 Wochen vor dem Termin werden keine oder nur geringe Stornogebühren fällig. Für spätere Absagen behalten wir uns eine Aufwandsentschädigung vor, die im Vertrag klar kommuniziert wird.",
  },

  /* Floristik & Hochzeit */
  {
    category: "Floristik & Hochzeit",
    question: "Kannst du auch komplette Hochzeiten planen?",
    answer: "Ja — Full-Service Hochzeitsplanung ist eines meiner Kernthemen. Das bedeutet: Konzept, Mood-Board, Blumeneinkauf, Bindung, Lieferung, Aufbau und Abbau. Alles aus einer Hand, persönlich geplant. Ich empfehle für Hochzeitsanfragen einen frühen Start, da die Saison meist schnell ausgebucht ist.",
  },
  {
    category: "Floristik & Hochzeit",
    question: "Welche Hochzeitsstile kannst du umsetzen?",
    answer: "Meine Stärke liegt im Boho-Chic, Fine Art und romantisch-eleganten Stil — aber ich arbeite grundsätzlich nach eurer Vision, nicht nach meinem Geschmack. Moderner Minimalismus, üppige Gartenromantik oder rustikales Landhaus — wenn ihr mir ein Bild eurer Welt zeigt, setze ich es um.",
  },
  {
    category: "Floristik & Hochzeit",
    question: "Welche Blumen verwendest du?",
    answer: "Ich arbeite saisonal und regional so weit wie möglich. Im Sommer sind das z.B. Rosen, Hortensien, Lavendel und wilde Gräser. Im Winter Amaryllis, Eukalyptus und Trockenblumenarrangements. Trockenblumen und Pampas-Gras sind ganzjährig verfügbar und liegen mir besonders am Herzen — sie sind langlebig, nachhaltig und wunderschön.",
  },

  /* JGA */
  {
    category: "Junggesellinnenabschied (JGA)",
    question: "Wie viele Personen können an einem Flower Crown Workshop teilnehmen?",
    answer: "Der Flower Crown Workshop ist für 4 bis 16 Personen ausgelegt. Für kleinere oder größere Gruppen bitte einfach anfragen — in besonderen Fällen ist es möglich, das Format anzupassen.",
  },
  {
    category: "Junggesellinnenabschied (JGA)",
    question: "Wo findet der Workshop statt?",
    answer: "Der Workshop findet bei euch zu Hause, in einer gemieteten Location oder im Freien statt — ganz wie ihr es euch vorstellt. Ich bringe alle Materialien mit. Ihr braucht lediglich einen Tisch und ausreichend Sitzplätze für alle Teilnehmerinnen.",
  },
] as const;

/* Group by category */
const categorized = FAQ_ITEMS.reduce<Record<string, typeof FAQ_ITEMS[number][]>>((acc, item) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(item);
  return acc;
}, {});

const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.trendfleurs.de/faq#page",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@id": "https://www.trendfleurs.de", name: "Home" } },
    { "@type": "ListItem", position: 2, item: { "@id": "https://www.trendfleurs.de/faq", name: "FAQ" } },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />

      <main>
        {/* ── HERO / HEADER ── */}
        <section style={{
          background: "var(--cream)", padding: "clamp(100px,14vw,160px) 0 clamp(48px,6vw,72px)",
          position: "relative", overflow: "hidden",
        }}>
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 50% at 60% 60%, rgba(212,175,55,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div className="tf-inner" style={{ position: "relative", zIndex: 1, maxWidth: "760px" }}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: "28px" }}>
              <ol style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                {[{ href: "/", label: "Home" }, { href: "/faq", label: "FAQ", current: true }].map((b, i) => (
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
              Häufige Fragen
            </p>
            <h1 style={{
              fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "14px",
              fontSize: "var(--fs-h1)", lineHeight: "var(--lh-head)",
              letterSpacing: "var(--track-tight)", color: "var(--ink-900)",
            }}>
              Alles, was du wissen möchtest.
            </h1>
            <p style={{
              fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)",
              lineHeight: "var(--lh-body)", color: "var(--ink-700)", maxWidth: "48ch", marginTop: "18px",
            }}>
              Zu Liefergebiet, Dekoverleih, Reinigung, Buchungsablauf und Floristik — ehrlich und persönlich beantwortet.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--ink-400)", marginTop: "12px" }}>
              Deine Frage ist nicht dabei?{" "}
              <Link href="/anfrage" style={{ color: "var(--rust-500)", textDecoration: "underline", textDecorationColor: "var(--rust-300)" }}>
                Schreib mir direkt.
              </Link>
            </p>
          </div>
        </section>

        {/* ── FAQ CONTENT ── */}
        <section style={{ background: "var(--paper-100)", padding: "var(--sp-section) 0" }}>
          <div className="tf-inner" style={{ maxWidth: "780px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(40px,5vw,60px)" }}>
              {Object.entries(categorized).map(([category, items]) => (
                <div key={category}>
                  {/* Category label */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    marginBottom: "24px", paddingBottom: "16px",
                    borderBottom: "1px solid var(--paper-300)",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)",
                      letterSpacing: "var(--track-kicker)", textTransform: "uppercase",
                      color: "var(--rust-600)", fontWeight: 400,
                    }}>
                      {category}
                    </span>
                  </div>

                  {/* Questions */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                    {items.map((item, i) => (
                      <details key={item.question} style={{
                        borderBottom: "1px solid var(--paper-300)",
                        paddingBottom: "0",
                      }}>
                        <summary style={{
                          cursor: "pointer",
                          listStyle: "none",
                          padding: "18px 0",
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          gap: "16px",
                          fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)",
                          fontWeight: 500, color: "var(--ink-900)",
                          userSelect: "none",
                        }}>
                          <span>{item.question}</span>
                          <span aria-hidden="true" style={{
                            flexShrink: 0, width: 20, height: 20,
                            borderRadius: "50%", background: "var(--rust-50)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "var(--rust-500)", fontSize: "16px", lineHeight: 1,
                          }}>+</span>
                        </summary>
                        <div style={{ paddingBottom: "20px" }}>
                          <p style={{
                            fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)",
                            lineHeight: "var(--lh-body)", color: "var(--ink-500)",
                          }}>
                            {item.answer}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STILL QUESTIONS ── */}
        <section style={{ background: "var(--paper-200)", padding: "clamp(60px,8vw,100px) 0" }}>
          <div style={{ maxWidth: "580px", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center" }}>
            <span style={{ fontFamily: "var(--font-script)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: "var(--rust-500)", display: "block" }}>
              noch Fragen?
            </span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--fs-h3)", marginTop: "10px", color: "var(--ink-900)" }}>
              Anni antwortet persönlich.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", color: "var(--ink-500)", lineHeight: "var(--lh-body)", marginTop: "12px" }}>
              Kein Bot, kein Callcenter — deine Nachricht landet direkt bei mir und ich antworte innerhalb von 48 Stunden.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", marginTop: "24px", flexWrap: "wrap" }}>
              <Link href="/anfrage" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                background: "var(--rust-500)", color: "var(--on-rust)",
                padding: "14px 28px", borderRadius: "var(--r-pill)", minHeight: "48px",
              }}>
                Anfrage stellen <ArrowRight size={15} strokeWidth={1.8} />
              </Link>
              <Link href="/leistungen" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--ink-700)", padding: "14px 24px",
                borderRadius: "var(--r-pill)", border: "1px solid var(--paper-400)", minHeight: "48px",
              }}>
                Leistungen entdecken
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* CSS für details/summary open-state */}
      <style>{`
        details[open] > summary span[aria-hidden="true"] { content: "−"; }
        details[open] > summary span[aria-hidden="true"]::after { content: "−"; }
        details > summary span[aria-hidden="true"]::after { content: "+"; }
        details > summary span[aria-hidden="true"] { font-size: 0 !important; }
        details[open] > summary span[aria-hidden="true"] { background: var(--rust-500); color: var(--on-rust); }
        details[open] > summary span[aria-hidden="true"]::after { font-size: 18px; content: "−"; }
        details > summary span[aria-hidden="true"]::after { font-size: 18px; content: "+"; }
      `}</style>
    </>
  );
}
