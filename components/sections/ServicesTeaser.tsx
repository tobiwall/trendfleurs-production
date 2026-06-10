"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flower2, Gift, Leaf, Sparkles, ArrowRight } from "lucide-react";

const SERVICES = [
  { icon: Flower2,   kicker: "Full-Service", title: "Hochzeiten",     desc: "Von der Idee bis zum letzten Blütenblatt — Planung, Floristik und Aufbau aus einer Hand.", href: "/leistungen" },
  { icon: Gift,      kicker: "Feiern",       title: "JGA & Feiern",   desc: "JGA, der zu euch passt: Workshops, persönliche Deko und das legendäre Audio Gästetelefon.", href: "/leistungen" },
  { icon: Leaf,      kicker: "Hands-on",     title: "Workshops",      desc: "Blumenbinden, Kränze drehen, Tischkunst gestalten — direkt mit Anni, für alle Levels.", href: "/leistungen" },
  { icon: Sparkles,  kicker: "Events",       title: "Events aller Art", desc: "Taufen, Geburtstage, Firmenfeiern — durchdachte Konzepte und Deko, die Atmosphäre schafft.", href: "/leistungen" },
];

export default function ServicesTeaser() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".st-card", {
        opacity: 0, y: 40, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "var(--cream)", padding: "var(--sp-section) 0" }}>
      <div className="tf-inner">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "44px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
              Leistungen
            </p>
            <h2 style={{ marginTop: "12px", color: "var(--ink-900)" }}>Full-Service für deinen Tag</h2>
          </div>
          <Link href="/leistungen" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--rust-500)", borderBottom: "1px solid var(--rust-300)", paddingBottom: "2px",
          }}>
            Alle Leistungen <ArrowRight size={14} strokeWidth={1.8} />
          </Link>
        </div>

        <div className="tf-grid-2" style={{ gap: "18px" }}>
          {SERVICES.map((s) => <ServiceCard key={s.title} {...s} />)}
        </div>
      </div>
    </section>
  );
}

type IconComp = React.ComponentType<{ size?: number; strokeWidth?: number }>;

function ServiceCard({ icon: Ic, kicker, title, desc, href }: { icon: IconComp; kicker: string; title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="st-card"
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.cssText += "transform:translateY(-4px);box-shadow:var(--shadow-md)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-xs)"; }}
      style={{
        display: "flex", gap: "20px", alignItems: "flex-start",
        background: "var(--paper-0)", borderRadius: "var(--r-lg)",
        padding: "28px 26px", border: "1px solid var(--border)",
        boxShadow: "var(--shadow-xs)", textDecoration: "none",
        transition: "transform 340ms var(--ease-organic), box-shadow 340ms",
      }}
    >
      <div style={{
        flex: "none", width: "50px", height: "50px", borderRadius: "var(--r-md)",
        background: "var(--rust-50)", border: "1px solid var(--rust-200)",
        display: "flex", alignItems: "center", justifyContent: "center", color: "var(--rust-500)",
      }}>
        <Ic size={22} strokeWidth={1.5} />
      </div>
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)", marginBottom: "6px" }}>
          {kicker}
        </p>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "var(--fs-h4)", fontWeight: 500, color: "var(--ink-900)" }}>
          {title}
        </h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-small)", color: "var(--ink-500)", marginTop: "8px", lineHeight: 1.6 }}>
          {desc}
        </p>
      </div>
    </Link>
  );
}
