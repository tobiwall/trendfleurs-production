import { Flower2, Star, Truck, Users } from "lucide-react";

const SIGNALS = [
  { icon: Star,    label: "★★★★★ Google", sub: "Top-bewertet" },
  { icon: Flower2, label: "100+ Events", sub: "erfolgreich gestaltet" },
  { icon: Users,   label: "Persönlich", sub: "Beratung ab Tag 1" },
  { icon: Truck,   label: "Lieferung", sub: "Auf- & Abbau inkl." },
];

export default function TrustBar() {
  return (
    <section
      aria-label="Vertrauenssignale"
      style={{ background: "var(--paper-100)", borderTop: "1px solid var(--paper-300)", borderBottom: "1px solid var(--paper-300)" }}
    >
      <div className="tf-inner" style={{ padding: "0 var(--gutter)" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0",
        }}
        className="trust-grid"
        >
          {SIGNALS.map((s, i) => (
            <div key={s.label} style={{
              display: "flex", alignItems: "center", gap: "14px",
              padding: "22px 0",
              borderRight: i < SIGNALS.length - 1 ? "1px solid var(--paper-300)" : "none",
              paddingLeft: i === 0 ? 0 : "28px",
              paddingRight: i === SIGNALS.length - 1 ? 0 : "28px",
            }}>
              <div style={{
                flex: "none", width: "40px", height: "40px", borderRadius: "var(--r-sm)",
                background: "var(--rust-50)", border: "1px solid var(--rust-200)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "var(--rust-500)",
              }}>
                <s.icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.88rem", color: "var(--ink-900)", letterSpacing: "0.01em" }}>
                  {s.label}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)", color: "var(--ink-500)", marginTop: "1px" }}>
                  {s.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 680px) {
          .trust-grid { grid-template-columns: 1fr 1fr !important; }
          .trust-grid > div:nth-child(2) { border-right: none !important; }
          .trust-grid > div:nth-child(3) { border-top: 1px solid var(--paper-300); }
          .trust-grid > div:nth-child(4) { border-top: 1px solid var(--paper-300); border-right: none; }
        }
        @media (max-width: 400px) {
          .trust-grid { grid-template-columns: 1fr !important; }
          .trust-grid > div { border-right: none !important; border-top: 1px solid var(--paper-300); }
          .trust-grid > div:first-child { border-top: none; }
        }
      `}</style>
    </section>
  );
}
