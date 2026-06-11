"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useSearchParams } from "next/navigation";

const EVENT_TYPES = ["Hochzeit", "JGA", "Workshop", "Geburtstag", "Taufe / Kommunion", "Firmenfeier", "Dekoverleih", "Sonstiges"];

function Field({
  label, name, placeholder, area, type = "text", required,
}: {
  label: string; name: string; placeholder: string; area?: boolean; type?: string; required?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const base: React.CSSProperties = {
    width: "100%", fontFamily: "var(--font-sans)", fontSize: "15px", color: "var(--ink-900)",
    background: "var(--paper-0)", borderRadius: "var(--r-sm)", padding: "13px 15px",
    outline: "none", resize: "vertical", boxSizing: "border-box", display: "block",
    border: `1px solid ${focus ? "var(--rust-500)" : "var(--paper-400)"}`,
    boxShadow: focus ? "0 0 0 3px rgba(163,106,94,.14)" : "none",
    transition: "border-color 180ms, box-shadow 180ms",
  };
  return (
    <label style={{ display: "block" }}>
      <span style={{
        display: "block", fontFamily: "var(--font-mono)", fontSize: "10px",
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: "var(--ink-500)", marginBottom: "8px",
      }}>
        {label}{required && <span style={{ color: "var(--rust-500)", marginLeft: "2px" }}>*</span>}
      </span>
      {area
        ? <textarea name={name} rows={5} placeholder={placeholder} required={required}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={base} />
        : <input name={name} type={type} placeholder={placeholder} required={required}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={base} />
      }
    </label>
  );
}

export default function AnfrageClient() {
  const [sent, setSent] = useState(false);
  const [eventType, setEventType] = useState("");
  const searchParams = useSearchParams();
  const prefilledItem = searchParams.get("name");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main>
      {/* ── Hero ── */}
      <section style={{ background: "var(--cream)", padding: "clamp(56px,9vw,96px) 0 0" }}>
        <div className="tf-inner" style={{ maxWidth: "860px" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: "24px" }}>
            <ol style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <li><Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-400)" }}>Home</Link></li>
              <li><span style={{ color: "var(--ink-300)", fontSize: "11px" }}>/</span></li>
              <li><span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--rust-500)" }}>Anfrage</span></li>
            </ol>
          </nav>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
            Kostenlos & unverbindlich
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "12px", fontSize: "var(--fs-h1)", lineHeight: "var(--lh-head)", color: "var(--ink-900)" }}>
            Erzähl mir von deinem Event
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)", color: "var(--ink-600)", marginTop: "14px", maxWidth: "52ch", lineHeight: "var(--lh-body)" }}>
            Ich antworte persönlich — kein Callcenter, keine automatischen E-Mails. Du bekommst Anni direkt.
          </p>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section style={{ background: "var(--cream)", padding: "clamp(48px,7vw,80px) 0 clamp(72px,10vw,120px)" }}>
        <div className="tf-inner" style={{ maxWidth: "860px" }}>
          {sent ? (
            <div style={{
              background: "var(--paper-0)", border: "1px solid var(--paper-300)",
              borderRadius: "var(--r-xl)", padding: "clamp(40px,7vw,72px)",
              textAlign: "center", boxShadow: "var(--shadow-sm)",
            }}>
              <div style={{ color: "var(--rust-500)", display: "inline-flex" }}>
                <CheckCircle2 size={52} strokeWidth={1.3} />
              </div>
              <h2 style={{ marginTop: "20px", fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--fs-h2)" }}>
                Danke! Deine Anfrage ist angekommen.
              </h2>
              <p style={{ marginTop: "12px", color: "var(--ink-500)", fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", maxWidth: "46ch", margin: "12px auto 0" }}>
                Ich melde mich innerhalb von 48 Stunden — mit Liebe, Anni.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
                <Link href="/leistungen" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  background: "var(--rust-500)", color: "var(--on-rust)",
                  padding: "12px 24px", borderRadius: "var(--r-pill)",
                }}>
                  Leistungen ansehen <ArrowRight size={15} strokeWidth={1.8} />
                </Link>
                <Link href="/" style={{
                  display: "inline-flex", alignItems: "center",
                  fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "var(--ink-900)", padding: "12px 22px",
                  borderRadius: "var(--r-pill)", border: "1px solid var(--ink-900)",
                }}>
                  Zurück zur Startseite
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(40px,6vw,72px)" }} className="anfrage-grid">
              {/* ── Form ── */}
              <form onSubmit={handleSubmit}
                style={{
                  background: "var(--paper-0)", borderRadius: "var(--r-xl)",
                  padding: "clamp(28px,5vw,48px)", boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--paper-300)",
                  display: "flex", flexDirection: "column", gap: "20px",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-cols">
                  <Field label="Dein Name" name="name" placeholder="Anni Musterfrau" required />
                  <Field label="E-Mail" name="email" type="email" placeholder="hallo@beispiel.de" required />
                </div>

                {/* Event type chips */}
                <div>
                  <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-500)", marginBottom: "10px" }}>
                    Art des Events <span style={{ color: "var(--rust-500)" }}>*</span>
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {EVENT_TYPES.map((type) => (
                      <button type="button" key={type} onClick={() => setEventType(type)} style={{
                        fontFamily: "var(--font-sans)", fontSize: "0.84rem",
                        padding: "8px 16px", borderRadius: "var(--r-pill)", cursor: "pointer",
                        border: `1px solid ${eventType === type ? "var(--rust-500)" : "var(--paper-400)"}`,
                        background: eventType === type ? "var(--rust-50)" : "var(--paper-0)",
                        color: eventType === type ? "var(--rust-700)" : "var(--ink-700)",
                        transition: "all 160ms",
                      }}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-cols">
                  <Field label="Datum (ca.)" name="date" placeholder="z.B. August 2026" />
                  <Field label="Gästezahl (ca.)" name="guests" placeholder="z.B. 60 Personen" />
                </div>

                <Field label="Region / Veranstaltungsort" name="location" placeholder="z.B. Westerwald, Schloss Montabaur" />

                <Field
                  label="Was darf ich für dich tun?"
                  name="message"
                  placeholder={prefilledItem
                    ? `Ich interessiere mich für: ${prefilledItem}. Außerdem…`
                    : "Beschreibe dein Event, deine Vorstellungen, deinen Stil…"
                  }
                  area required
                />

                <button type="submit" style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  background: "var(--rust-500)", color: "var(--on-rust)",
                  padding: "15px 32px", borderRadius: "var(--r-pill)", cursor: "pointer",
                  border: "none", minHeight: "52px", width: "100%",
                  boxShadow: "0 4px 18px rgba(163,106,94,.28)",
                  transition: "opacity 160ms",
                }}>
                  Anfrage senden <ArrowRight size={16} strokeWidth={1.8} />
                </button>

                <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-300)", textAlign: "center" }}>
                  100 % kostenlos · unverbindlich · persönliche Antwort innerhalb 48 h
                </p>
              </form>

              {/* ── Sidebar ── */}
              <aside style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Contact block */}
                <div style={{
                  background: "var(--charcoal)", borderRadius: "var(--r-xl)",
                  padding: "28px 26px", color: "var(--on-charcoal)",
                }}>
                  <span style={{ fontFamily: "var(--font-script)", fontSize: "1.6rem", color: "var(--gold-400)" }}>Anni direkt</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "18px" }}>
                    {[
                      { icon: <Mail size={15} />, label: "E-Mail", value: "info@wallwideweb.de" },
                      { icon: <Clock size={15} />, label: "Antwortzeit", value: "Innerhalb von 48 h" },
                      { icon: <MapPin size={15} />, label: "Einsatzgebiet", value: "Westerwald · Köln · Frankfurt · NRW" },
                    ].map((row) => (
                      <div key={row.label} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <span style={{ color: "var(--gold-400)", flexShrink: 0, marginTop: "2px" }}>{row.icon}</span>
                        <div>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,239,231,.4)" }}>{row.label}</div>
                          <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "rgba(244,239,231,.85)", marginTop: "2px" }}>{row.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why block */}
                <div style={{ background: "var(--paper-0)", borderRadius: "var(--r-xl)", padding: "26px", border: "1px solid var(--paper-300)" }}>
                  <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: "14px" }}>Warum Anni?</h3>
                  {[
                    "Floristin mit über 5 Jahren Selbstständigkeit",
                    "Persönliche Betreuung — von der Idee bis zum Abbau",
                    "100+ Hochzeiten & Events erfolgreich gestaltet",
                    "Alle Preise inkl. Beratung — keine versteckten Kosten",
                  ].map((point) => (
                    <div key={point} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "10px" }}>
                      <span style={{ color: "var(--rust-400)", flexShrink: 0, marginTop: "2px" }}>
                        <CheckCircle2 size={14} strokeWidth={2.2} />
                      </span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.86rem", color: "var(--ink-700)", lineHeight: "1.5" }}>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Leistungen quick links */}
                <div style={{ background: "var(--rust-50)", borderRadius: "var(--r-xl)", padding: "22px 24px", border: "1px solid var(--rust-100)" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--rust-600)", marginBottom: "12px" }}>
                    Leistungsübersicht
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {[
                      { href: "/leistungen/hochzeiten", label: "Hochzeiten & Floristik" },
                      { href: "/leistungen/events", label: "Events & Corporate" },
                      { href: "/leistungen/jga", label: "JGA & Workshops" },
                      { href: "/dekoverleih", label: "Dekoverleih" },
                    ].map((l) => (
                      <Link key={l.href} href={l.href} style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--rust-700)",
                        padding: "7px 0", borderBottom: "1px solid var(--rust-100)",
                      }}>
                        {l.label} <span style={{ fontSize: "0.75em" }}>→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          .anfrage-grid { grid-template-columns: 1fr 380px !important; }
        }
        @media (max-width: 600px) {
          .form-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
