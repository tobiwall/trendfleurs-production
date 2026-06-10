"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";

const CARDS = [
  {
    cardKey: "decor",
    href: "/dekoverleih",
    kicker: "Wunschzettel",
    headline: "Dekoverleih",
    sub: "Hoops, Pampas, Kerzenständer und das beliebte Audio Gästetelefon — kuratiert und liebevoll gepflegt. Zusammenstellen, mieten, zurückgeben.",
    cta: "Mietkollektion ansehen",
    microCopy: "Ab 15 €/Tag · Lieferung & Aufbau inklusive · keine Mindesbestellung",
    Icon: Heart,
    img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85",
    imgAlt: "Florale Hochzeitsdekoration zum Mieten — Pampas, Kerzen und Hoops",
    accent: "var(--rust-500)",
    bg: "var(--paper-100)",
  },
  {
    cardKey: "shop",
    href: "/shop",
    kicker: "Online-Shop",
    headline: "Personalisierte Deko",
    sub: "Handgemachte Lieblingsstücke und individuell gravierte Objekte — Willkommensschilder, Tischkarten, Kerzen und mehr. Direkt nach Hause.",
    cta: "Jetzt einkaufen",
    microCopy: "Versand 3–5 Tage · personalisierbar · dauerhaft behalten",
    Icon: ShoppingBag,
    img: "https://images.unsplash.com/photo-1544078751-58fed2b32c83?auto=format&fit=crop&w=900&q=85",
    imgAlt: "Personalisierte Hochzeitsdeko kaufen — Schilder, Kerzen und Gästebücher",
    accent: "var(--charcoal)",
    bg: "var(--cream)",
  },
];

export default function MietenVsKaufen() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".mvk-card", {
        opacity: 0, y: 48, duration: 1, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="mvk-heading" style={{ background: "var(--cream)", padding: "var(--sp-section) 0" }}>
      <div className="tf-inner">
        {/* Section heading */}
        <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 56px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
            Wie kann ich helfen?
          </p>
          <h2 id="mvk-heading" style={{ fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "14px", color: "var(--ink-900)" }}>
            Mieten oder Kaufen?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)", color: "var(--ink-500)", marginTop: "12px", lineHeight: "var(--lh-body)" }}>
            Je nach Wunsch findest du hier zwei Wege zu deiner perfekten Dekoration — beide mit persönlicher Beratung von Anni.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="mvk-grid">
          {CARDS.map((c) => <MvkCard key={c.cardKey} {...c} />)}
        </div>
      </div>
      <style>{`@media (max-width: 700px) { .mvk-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

interface CardProps {
  href: string; kicker: string; headline: string; sub: string;
  cta: string; microCopy: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  img: string; imgAlt: string; accent: string; bg: string;
}

function MvkCard({ href, kicker, headline, sub, cta, microCopy, Icon, img, imgAlt, accent, bg }: CardProps) {
  const [hover, setHover] = useState(false);
  return (
    <article
      className="mvk-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={href}
        aria-label={`${headline} — ${cta}`}
        style={{
          display: "block", background: bg, borderRadius: "var(--r-xl)",
          overflow: "hidden", textDecoration: "none",
          border: `1px solid ${hover ? accent : "var(--paper-300)"}`,
          boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
          transform: hover ? "translateY(-6px)" : "none",
          transition: "transform 380ms var(--ease-organic), box-shadow 380ms, border-color 280ms",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
          <Image
            src={img} alt={imgAlt} fill
            sizes="(max-width:700px) 90vw, 45vw"
            style={{
              objectFit: "cover",
              transform: hover ? "scale(1.05)" : "scale(1)",
              transition: "transform var(--dur-slow) var(--ease-organic)",
            }}
          />
          {/* Kicker badge */}
          <div aria-hidden="true" style={{
            position: "absolute", top: 18, left: 18,
            fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em",
            textTransform: "uppercase", padding: "6px 14px", borderRadius: "var(--r-pill)",
            background: "rgba(253,251,247,0.92)", color: accent,
            border: `1px solid ${accent}`, backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", gap: "7px",
          }}>
            <Icon size={13} strokeWidth={1.6} aria-hidden="true" /> {kicker}
          </div>
        </div>

        {/* Text + CTA */}
        <div style={{ padding: "28px 30px 30px" }}>
          <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--fs-h3)", color: "var(--ink-900)" }}>
            {headline}
          </h3>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-small)", color: "var(--ink-500)", marginTop: "10px", lineHeight: "var(--lh-body)" }}>
            {sub}
          </p>
          {/* CTA text link */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "22px",
            fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase", color: accent,
          }}>
            {cta}
            <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true"
              style={{ transform: hover ? "translateX(4px)" : "none", transition: "transform 280ms" }} />
          </div>
          {/* Micro-Copy */}
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--ink-400)", marginTop: "8px", letterSpacing: "0.03em" }}>
            {microCopy}
          </p>
        </div>
      </Link>
    </article>
  );
}
