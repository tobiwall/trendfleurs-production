"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flower2, Heart, ShoppingBag, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   ANIMATION ARCHITECTURE

   Desktop (≥ 768px): 30-unit scrubbed timeline over ~4× vh.
   — Left col:  anniRef = position:absolute inset:0, fills full column.
                Inner overflow-hidden wrapper clips the photo.
                Floating cards are OUTSIDE the clip → no edge cutoff.
   — Right col: Block deck centered; cards positioned in left col
                extend past its boundary (left col has NO overflow:hidden).

   Mobile (< 768px): NO pinning.
   — Anni centered oval (160×200) at top.
   — Blocks slide up on first viewport entry (gsap.from).
   — Scroll highlight: active block → opacity 1, others → 0.28.
   — Blobs parallax at three speeds.
   ───────────────────────────────────────────────────────────── */

const BLOCKS = [
  {
    num: "01",
    kicker: "Full-Service · Westerwald & NRW",
    title: ["Hochzeiten &", "Events"],
    body: "Von der ersten Blüte bis zum letzten Tanz — Anni plant und gestaltet euren schönsten Tag persönlich, sorgfältig und aus einer Hand.",
    stats: ["100+ Events gestaltet", "Persönliche Beratung inkl."] as const,
    cta: "Alle Leistungen ansehen",
    href: "/leistungen",
    Icon: Flower2,
    accent: "var(--rust-500)",
    accentBg: "var(--rust-50)",
    numColor: "rgba(163,106,94,0.09)",
    thumb: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=75",
    thumbAlt: "Elegante Hochzeitsdekoration mit Blumen",
  },
  {
    num: "02",
    kicker: "Wunschzettel erstellen",
    title: ["Dekoverleih"],
    body: "Goldene Hoops, Pampas-Gras, Kerzenständer und das Audio Gästetelefon — liebevoll kuratiert, geliefert und aufgebaut.",
    stats: ["Goldener Hoop ab 15 €/Tag", "Lieferung & Aufbau inklusive"] as const,
    cta: "Mietkollektion ansehen",
    href: "/dekoverleih",
    Icon: Heart,
    accent: "var(--gold-500)",
    accentBg: "var(--gold-100)",
    numColor: "rgba(212,175,55,0.12)",
    thumb: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=400&q=75",
    thumbAlt: "Floraler Goldener Hoop für Hochzeiten und Events",
  },
  {
    num: "03",
    kicker: "Direkt kaufen · Versand 3–5 Tage",
    title: ["Personalisierte", "Deko"],
    body: "Handgemachte Lieblingsstücke: Willkommensschilder, Tischkarten, Kerzen — personalisierbar mit deinem Namen oder Datum.",
    stats: ["Versand 3–5 Werktage", "Personalisierbar & gravierbar"] as const,
    cta: "Jetzt einkaufen",
    href: "/shop",
    Icon: ShoppingBag,
    accent: "var(--charcoal)",
    accentBg: "var(--paper-200)",
    numColor: "rgba(26,26,26,0.08)",
    thumb: "https://images.unsplash.com/photo-1544078751-58fed2b32c83?auto=format&fit=crop&w=400&q=75",
    thumbAlt: "Personalisiertes Willkommensschild für Hochzeiten",
  },
] as const;

/* Cards positioned in left column but straddle the boundary → extend visibly
   into the right column area. Left column has NO overflow:hidden, so these
   are never clipped. The separate inner wrapper clips only the Anni photo. */
const FLOAT_CARDS = [
  {
    title: "Boho Hochzeits-Event",
    sub: "Full-Service inklusive",
    img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=320&q=80",
    imgAlt: "Elegante Hochzeitsdekoration auf einem gedeckten Tisch",
    initRotate: -2,
    floatY: -14,
    /* right: slightly past the column boundary → visible in right col area */
    pos: { right: "-80px", bottom: "24%" },
    accent: "var(--rust-400)",
  },
  {
    title: "Goldener Hoop",
    sub: "Dekoverleih · ab 15 €/Tag",
    img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=320&q=80",
    imgAlt: "Floraler Goldener Hoop für Hochzeiten und Events",
    initRotate: 3.5,
    floatY: 12,
    pos: { right: "-60px", top: "18%" },
    accent: "var(--gold-500)",
  },
  {
    title: "Willkommen-Schild",
    sub: "Personalisiert · 34 €",
    img: "https://images.unsplash.com/photo-1544078751-58fed2b32c83?auto=format&fit=crop&w=320&q=80",
    imgAlt: "Personalisiertes Willkommensschild für Hochzeiten",
    initRotate: -1.5,
    floatY: -10,
    pos: { right: "-90px", bottom: "10%" },
    accent: "var(--charcoal)",
  },
] as const;

export default function PinnedServices() {
  const outerRef = useRef<HTMLElement>(null);
  const anniRef  = useRef<HTMLDivElement>(null);

  /* Desktop block refs */
  const db1Ref = useRef<HTMLDivElement>(null);
  const db2Ref = useRef<HTMLDivElement>(null);
  const db3Ref = useRef<HTMLDivElement>(null);

  /* Mobile block refs */
  const mb1Ref = useRef<HTMLDivElement>(null);
  const mb2Ref = useRef<HTMLDivElement>(null);
  const mb3Ref = useRef<HTMLDivElement>(null);

  /* Mobile decorative blobs (parallax) */
  const mDec1Ref = useRef<HTMLDivElement>(null);
  const mDec2Ref = useRef<HTMLDivElement>(null);
  const mDec3Ref = useRef<HTMLDivElement>(null);

  /* Floating card outer (position) + inner (float loop) refs */
  const c1Ref  = useRef<HTMLDivElement>(null);
  const c2Ref  = useRef<HTMLDivElement>(null);
  const c3Ref  = useRef<HTMLDivElement>(null);
  const cf1Ref = useRef<HTMLDivElement>(null);
  const cf2Ref = useRef<HTMLDivElement>(null);
  const cf3Ref = useRef<HTMLDivElement>(null);

  /* Background overlays */
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);
  const bg3Ref = useRef<HTMLDivElement>(null);

  /* Progress dots */
  const d0Ref = useRef<HTMLDivElement>(null);
  const d1Ref = useRef<HTMLDivElement>(null);
  const d2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ════════════════════════════════════════════════
         DESKTOP ≥ 768 px — pinned scrolly
      ════════════════════════════════════════════════ */
      mm.add("(min-width: 768px)", () => {
        const outer = outerRef.current!;
        outer.style.height = `${window.innerHeight * 4}px`;

        gsap.set(db1Ref.current, { zIndex: 3, opacity: 1,    x: 0,  y: 0,  scale: 1,    filter: "blur(0px)",  pointerEvents: "auto" });
        gsap.set(db2Ref.current, { zIndex: 2, opacity: 0.22, x: 16, y: 12, scale: 0.95, filter: "blur(3px)",  pointerEvents: "none" });
        gsap.set(db3Ref.current, { zIndex: 1, opacity: 0.10, x: 28, y: 22, scale: 0.90, filter: "blur(5px)",  pointerEvents: "none" });

        gsap.set([c1Ref.current, c2Ref.current, c3Ref.current], { opacity: 0, pointerEvents: "none" });
        gsap.set(c1Ref.current, { x: -24, scale: 0.82, rotate: -2 });
        gsap.set(c2Ref.current, { x: -20, scale: 0.82, rotate: 3.5 });
        gsap.set(c3Ref.current, { x: -22, scale: 0.82, rotate: -1.5 });
        gsap.set([bg1Ref.current, bg2Ref.current, bg3Ref.current], { opacity: 0 });

        /* Continuous float loops */
        gsap.to(cf1Ref.current, { y: FLOAT_CARDS[0].floatY, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(cf2Ref.current, { y: FLOAT_CARDS[1].floatY, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.6 });
        gsap.to(cf3Ref.current, { y: FLOAT_CARDS[2].floatY, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.2 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        /* Block 1 active t=0–8 */
        tl.to(bg1Ref.current, { opacity: 0.5, ease: "power1.inOut", duration: 2.5 }, 0);
        tl.to(anniRef.current, { scale: 1.05, x: -16, y: 0, rotationY: 0, transformPerspective: 1200, ease: "none", duration: 8 }, 0);
        tl.to(c1Ref.current, { opacity: 1, x: 0, scale: 1, pointerEvents: "none", duration: 2.8, ease: "power2.out" }, 1.5);
        tl.to(c1Ref.current, { y: -22, ease: "none", duration: 6 }, 2);
        tl.to(d0Ref.current, { scaleX: 3.4, ease: "none", duration: 8 }, 0.5);

        /* Transition 1→2 t=8–10 */
        tl.set(db1Ref.current, { pointerEvents: "none" }, 7.8);
        tl.to(db1Ref.current, { opacity: 0, x: -88, y: -48, scale: 0.88, filter: "blur(16px)", duration: 2.2, ease: "power2.in" }, 7.8);
        tl.set(db2Ref.current, { zIndex: 4, pointerEvents: "auto" }, 8.4);
        tl.to(db2Ref.current, { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)", duration: 2.6, ease: "power3.out" }, 8.5);
        tl.to(db3Ref.current, { opacity: 0.22, x: 16, y: 12, scale: 0.95, filter: "blur(3px)", duration: 2, ease: "power2.out" }, 8.8);
        tl.to(bg1Ref.current, { opacity: 0, duration: 2.2 }, 8);
        tl.to(bg2Ref.current, { opacity: 0.5, ease: "power1.inOut", duration: 2.8 }, 9);
        tl.to(c1Ref.current, { opacity: 0, x: 22, scale: 0.88, duration: 1.8, ease: "power2.in" }, 8);
        tl.to(d0Ref.current, { scaleX: 1, duration: 1.5, ease: "power2.out" }, 8.5);
        tl.to(d1Ref.current, { scaleX: 3.4, ease: "none", duration: 8 }, 10);

        /* Block 2 active t=10–18 */
        tl.to(anniRef.current, { scale: 1.0, x: 18, rotationY: 6, transformPerspective: 1200, duration: 3, ease: "power2.out" }, 10);
        tl.to(anniRef.current, { scale: 1.01, x: 18, rotationY: 6, ease: "none", duration: 5 }, 13);
        tl.to(c2Ref.current, { opacity: 1, x: 0, scale: 1, pointerEvents: "none", duration: 2.8, ease: "power2.out" }, 11);
        tl.to(c2Ref.current, { y: -18, ease: "none", duration: 6 }, 12);

        /* Transition 2→3 t=18–20 */
        tl.set(db2Ref.current, { pointerEvents: "none" }, 17.8);
        tl.to(db2Ref.current, { opacity: 0, x: -88, y: -48, scale: 0.88, filter: "blur(16px)", duration: 2.2, ease: "power2.in" }, 17.8);
        tl.set(db3Ref.current, { zIndex: 5, pointerEvents: "auto" }, 18.4);
        tl.to(db3Ref.current, { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)", duration: 2.6, ease: "power3.out" }, 18.5);
        tl.to(bg2Ref.current, { opacity: 0, duration: 2.2 }, 18);
        tl.to(bg3Ref.current, { opacity: 0.46, ease: "power1.inOut", duration: 2.8 }, 19);
        tl.to(c2Ref.current, { opacity: 0, x: 22, scale: 0.88, duration: 1.8, ease: "power2.in" }, 18);
        tl.to(d1Ref.current, { scaleX: 1, duration: 1.5, ease: "power2.out" }, 18.5);
        tl.to(d2Ref.current, { scaleX: 3.4, ease: "none", duration: 9 }, 20.5);

        /* Block 3 active t=20–30 */
        tl.to(anniRef.current, { scale: 1.11, x: -10, rotationY: 0, transformPerspective: 1200, duration: 3.5, ease: "power2.out" }, 20);
        tl.to(anniRef.current, { scale: 1.14, y: -24, ease: "none", duration: 7 }, 23);
        tl.to(c3Ref.current, { opacity: 1, x: 0, scale: 1, pointerEvents: "none", duration: 3, ease: "power2.out" }, 21.5);
        tl.to(c3Ref.current, { y: -28, ease: "none", duration: 7 }, 22.5);

        ScrollTrigger.refresh();

        return () => {
          outer.style.height = "auto";
          [db1Ref, db2Ref, db3Ref, c1Ref, c2Ref, c3Ref, cf1Ref, cf2Ref, cf3Ref].forEach(
            (r) => r.current && gsap.set(r.current, { clearProps: "all" })
          );
        };
      });

      /* ════════════════════════════════════════════════
         MOBILE < 768 px — stacked, full-life layout
         NO pinning. Scroll reveal + scroll highlight.
      ════════════════════════════════════════════════ */
      mm.add("(max-width: 767px)", () => {
        const mobRefs = [mb1Ref, mb2Ref, mb3Ref];

        /* Helper: highlight one block, dim the others */
        function activateBlock(activeIdx: number) {
          mobRefs.forEach((r, i) => {
            if (!r.current) return;
            gsap.to(r.current, {
              opacity: i === activeIdx ? 1 : 0.28,
              scale:   i === activeIdx ? 1 : 0.97,
              duration: 0.42,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
        }

        /* Initial reveal: slide up from below, staggered */
        mobRefs.forEach((r, i) => {
          gsap.from(r.current, {
            opacity: 0,
            y: 40,
            scale: 0.97,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.10,
            scrollTrigger: {
              trigger: r.current,
              start: "top 92%",
              once: true,
            },
          });
        });

        /* Scroll highlight: active = full opacity, siblings = dimmed */
        mobRefs.forEach((r, i) => {
          ScrollTrigger.create({
            trigger: r.current,
            start: "top 62%",
            end: "bottom 38%",
            onEnter:     () => activateBlock(i),
            onEnterBack: () => activateBlock(i),
          });
        });

        /* Decorative blobs: parallax at different rates */
        const blobSpeeds = [50, 80, 35];
        [mDec1Ref, mDec2Ref, mDec3Ref].forEach((r, i) => {
          gsap.to(r.current, {
            y: -blobSpeeds[i],
            ease: "none",
            scrollTrigger: {
              trigger: outerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        return () => {
          [...mobRefs, mDec1Ref, mDec2Ref, mDec3Ref].forEach(
            (r) => r.current && gsap.set(r.current, { clearProps: "all" })
          );
        };
      });
    }, outerRef);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <style>{`
        /* Desktop: pinned + 2-col */
        @media (min-width: 768px) {
          .ps-outer  { position: relative; }
          .ps-sticky { position: sticky; top: 0; height: 100vh; overflow: hidden; }
          .ps-mobile { display: none !important; }
        }
        /* Mobile: natural vertical scroll */
        @media (max-width: 767px) {
          .ps-outer  { padding: var(--sp-section) 0; }
          .ps-sticky { position: relative; height: auto; }
          .ps-desktop { display: none !important; }
          .ps-block-body {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>

      <section ref={outerRef} className="ps-outer" aria-label="Unsere Leistungen im Überblick">
        <div className="ps-sticky" style={{ background: "var(--cream)" }}>

          {/* ── Background overlays (desktop only) ── */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--cream)", zIndex: 0 }} />
          <div ref={bg1Ref} aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(145deg, rgba(163,106,94,0.13) 0%, rgba(246,235,231,0.20) 55%, transparent 100%)" }} />
          <div ref={bg2Ref} aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(145deg, rgba(212,175,55,0.11) 0%, rgba(241,228,188,0.18) 55%, transparent 100%)" }} />
          <div ref={bg3Ref} aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(145deg, rgba(26,26,26,0.12) 0%, rgba(58,53,47,0.18) 60%, transparent 100%)" }} />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hoop.svg" alt="" aria-hidden="true" style={{ position: "absolute", right: "22%", top: "50%", transform: "translate(50%,-50%)", width: "min(380px,30vw)", opacity: 0.06, zIndex: 2, pointerEvents: "none" }} />

          {/* ═══════════════════════════════════════════════
              DESKTOP: 2-column pinned layout
              Left col has NO overflow:hidden — inner wrapper
              clips only the Anni photo, floating cards are free.
          ═══════════════════════════════════════════════ */}
          <div className="ps-desktop" style={{
            position: "absolute", inset: 0, display: "grid",
            gridTemplateColumns: "1fr 1fr", zIndex: 3,
          }}>

            {/* ── Left: Anni (full-bleed) + floating cards ──
                IMPORTANT: NO overflow:hidden on this div.
                The inner anni-clip wrapper handles the photo clipping.
                Cards can safely extend into the right column area. */}
            <div style={{ position: "relative" }}>

              {/* Anni image — clips only inside this inner wrapper */}
              <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                <div
                  ref={anniRef}
                  style={{
                    position: "absolute", inset: 0,
                    willChange: "transform",
                  }}
                >
                  <Image
                    src="/anni2.jpg"
                    alt="Anni, Inhaberin und Floristin von a_trendfleurs — Hochzeitsplanung und Dekoverleih im Westerwald"
                    fill
                    sizes="50vw"
                    priority
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                </div>
                {/* Soft gradient right-edge fade into cream — seamless join to right col */}
                <div aria-hidden="true" style={{
                  position: "absolute", top: 0, right: 0, bottom: 0, width: "110px",
                  background: "linear-gradient(to right, transparent, var(--cream))",
                  zIndex: 2, pointerEvents: "none",
                }} />
              </div>

              {/* Anni badge — sits above the clip layer */}
              <div style={{
                position: "absolute", bottom: 24, left: 24, zIndex: 4,
                background: "rgba(253,251,247,0.92)", borderRadius: "var(--r-md)",
                border: "1px solid var(--paper-300)", padding: "12px 16px",
                backdropFilter: "blur(10px)", boxShadow: "var(--shadow-sm)",
              }}>
                <p style={{ fontFamily: "var(--font-script)", fontSize: "1.3rem", color: "var(--rust-500)", lineHeight: 1, margin: 0 }}>by Anni</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-400)", margin: "4px 0 0" }}>Floristin</p>
              </div>

              {/* Floating cards — z-index 10, exceed left col boundary freely */}
              {FLOAT_CARDS.map((card, i) => {
                const outerRefs = [c1Ref, c2Ref, c3Ref] as React.RefObject<HTMLDivElement>[];
                const innerRefs = [cf1Ref, cf2Ref, cf3Ref] as React.RefObject<HTMLDivElement>[];
                return (
                  <div key={i} ref={outerRefs[i]} aria-hidden="true" style={{
                    position: "absolute",
                    ...Object.fromEntries(Object.entries(card.pos)),
                    width: "158px", zIndex: 10, willChange: "transform, opacity",
                  }}>
                    <div ref={innerRefs[i]}>
                      <div style={{
                        background: "var(--paper-0)", borderRadius: "var(--r-lg)",
                        boxShadow: "0 12px 40px rgba(30,20,10,0.22), 0 2px 8px rgba(30,20,10,0.1)",
                        border: "1px solid var(--paper-200)",
                        overflow: "hidden", transform: `rotate(${card.initRotate}deg)`,
                        willChange: "transform",
                      }}>
                        <div style={{ position: "relative", aspectRatio: "4/3" }}>
                          <Image src={card.img} alt={card.imgAlt} fill sizes="158px" style={{ objectFit: "cover" }} />
                        </div>
                        <div style={{ padding: "10px 12px 12px" }}>
                          <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.92rem", color: "var(--ink-900)", fontWeight: 400, margin: 0, lineHeight: 1.3 }}>{card.title}</p>
                          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: card.accent, margin: "5px 0 0" }}>{card.sub}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Right: Block deck ── */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0 var(--gutter) 0 clamp(20px,3vw,44px)",
              position: "relative",
            }}>
              <div style={{
                width: "100%", maxWidth: "500px",
                minHeight: "390px", position: "relative", overflow: "visible",
              }}>
                <div style={{
                  position: "absolute", top: "-52px", left: 0,
                  fontFamily: "var(--font-mono)", fontSize: "10px",
                  letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-300)",
                }}>
                  Was wir für euch tun
                </div>

                {([db1Ref, db2Ref, db3Ref] as React.RefObject<HTMLDivElement>[]).map((ref, i) => (
                  <div key={i} ref={ref} style={{
                    position: i === 0 ? "relative" : "absolute",
                    top: 0, left: 0, right: 0,
                    willChange: "transform, opacity, filter",
                  }}>
                    <BlockCard {...BLOCKS[i]} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="ps-desktop" aria-hidden="true" style={{
            position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: "10px", alignItems: "center", zIndex: 6,
          }}>
            {[d0Ref, d1Ref, d2Ref].map((ref, i) => (
              <div key={i} ref={ref} style={{
                width: "26px", height: "3px", borderRadius: "2px", transformOrigin: "left center",
                background: i === 0 ? "var(--rust-400)" : "var(--paper-400)",
              }} />
            ))}
          </div>

          <div className="ps-desktop" aria-hidden="true" style={{
            position: "absolute", top: "28px", left: "var(--gutter)",
            fontFamily: "var(--font-mono)", fontSize: "10px",
            letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-300)", zIndex: 6,
          }}>
            Trendfleurs · Leistungen
          </div>

          {/* ═══════════════════════════════════════════════
              MOBILE: stacked, scroll-animated layout
          ═══════════════════════════════════════════════ */}
          <div className="ps-mobile" style={{ position: "relative", zIndex: 3, overflow: "hidden" }}>

            {/* Parallax blobs */}
            <div ref={mDec1Ref} aria-hidden="true" style={{
              position: "absolute", width: 100, height: 100, borderRadius: "50%",
              background: "var(--rust-50)", opacity: 0.9, top: "10%", right: "4%",
              filter: "blur(24px)", pointerEvents: "none", zIndex: 0,
            }} />
            <div ref={mDec2Ref} aria-hidden="true" style={{
              position: "absolute", width: 70, height: 70, borderRadius: "50%",
              background: "var(--gold-100)", opacity: 0.85, top: "38%", left: "2%",
              filter: "blur(16px)", pointerEvents: "none", zIndex: 0,
            }} />
            <div ref={mDec3Ref} aria-hidden="true" style={{
              position: "absolute", width: 120, height: 120, borderRadius: "50%",
              background: "var(--paper-200)", opacity: 0.7, bottom: "15%", right: "1%",
              filter: "blur(30px)", pointerEvents: "none", zIndex: 0,
            }} />

            <div style={{ position: "relative", zIndex: 1, padding: "0 var(--gutter)" }}>

              {/* Mobile header: centered, Anni portrait prominent */}
              <div style={{
                paddingTop: "var(--sp-7)",
                display: "flex", flexDirection: "column",
                alignItems: "center", textAlign: "center",
                paddingBottom: "36px", gap: "10px",
              }}>
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)",
                  letterSpacing: "var(--track-kicker)", textTransform: "uppercase",
                  color: "var(--rust-600)",
                }}>
                  Was wir für euch tun
                </p>

                {/* Anni portrait — 160×200px organic oval, centered */}
                <div style={{
                  width: "160px", height: "200px", flexShrink: 0, position: "relative",
                  borderRadius: "52% 60% 55% 48% / 58% 52% 48% 54%",
                  overflow: "hidden",
                  boxShadow: "0 16px 48px rgba(60,42,30,0.22), 0 2px 8px rgba(60,42,30,0.10)",
                  border: "3px solid var(--paper-0)",
                  marginTop: "10px",
                }}>
                  <Image
                    src="/anni2.jpg"
                    alt="Anni — Floristin & Inhaberin a_trendfleurs"
                    fill
                    sizes="160px"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(transparent, rgba(26,26,26,0.48))",
                    padding: "10px 10px 8px",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-script)", fontSize: "1.1rem",
                      color: "rgba(255,255,255,0.92)", lineHeight: 1,
                    }}>
                      by Anni
                    </span>
                  </div>
                </div>

                <h2 style={{ marginTop: "8px", fontSize: "clamp(1.6rem,6vw,2.1rem)" }}>
                  Full-Service<br />für deinen Tag
                </h2>
                <p style={{
                  marginTop: "4px", fontFamily: "var(--font-sans)",
                  fontSize: "0.88rem", color: "var(--ink-500)",
                  lineHeight: "var(--lh-body)", maxWidth: "34ch",
                }}>
                  Persönlich geplant und umgesetzt — von der Floristin Anni.
                </p>
              </div>

              {/* Mobile blocks — revealed & highlighted on scroll */}
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {([mb1Ref, mb2Ref, mb3Ref] as React.RefObject<HTMLDivElement>[]).map((ref, i) => (
                  <div key={i} ref={ref} style={{ willChange: "transform, opacity" }}>
                    <MobileBlockCard {...BLOCKS[i]} />
                  </div>
                ))}
              </div>

              <div style={{ height: "var(--sp-7)" }} />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

/* ─── Desktop Block Card ─── */
interface BlockProps {
  readonly num: string;
  readonly kicker: string;
  readonly title: readonly string[];
  readonly body: string;
  readonly stats: readonly [string, string];
  readonly cta: string;
  readonly href: string;
  readonly Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  readonly accent: string;
  readonly accentBg: string;
  readonly numColor: string;
  readonly thumb?: string;
  readonly thumbAlt?: string;
}

function BlockCard({ num, kicker, title, body, stats, cta, href, Icon, accent, accentBg, numColor }: BlockProps) {
  return (
    <article style={{
      background: "var(--paper-0)", borderRadius: "var(--r-xl)",
      boxShadow: "var(--shadow-lg)", display: "flex", overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{ width: "5px", background: accent, flexShrink: 0 }} />
      <div style={{ padding: "28px 28px 24px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "var(--r-sm)",
              background: accentBg, display: "flex", alignItems: "center", justifyContent: "center",
              color: accent, flexShrink: 0,
            }}>
              <Icon size={17} strokeWidth={1.5} />
            </div>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)",
              letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--ink-400)",
            }}>
              {kicker}
            </span>
          </div>
          <span aria-hidden="true" style={{
            fontFamily: "var(--font-serif)", fontSize: "3.2rem", fontWeight: 700,
            color: numColor, lineHeight: 1, letterSpacing: "-0.02em", flexShrink: 0,
          }}>
            {num}
          </span>
        </div>

        <h3 style={{
          fontFamily: "var(--font-serif)", fontWeight: 400,
          fontSize: "var(--fs-h2)", lineHeight: "var(--lh-head)",
          color: "var(--ink-900)", letterSpacing: "var(--track-tight)",
        }}>
          {title.map((line, i) => (
            <span key={i} style={{ display: i < title.length - 1 ? "block" : "inline" }}>{line}</span>
          ))}
        </h3>

        <p className="ps-block-body" style={{
          fontFamily: "var(--font-sans)", fontSize: "var(--fs-small)",
          lineHeight: "var(--lh-body)", color: "var(--ink-500)", marginTop: "12px",
        }}>
          {body}
        </p>

        <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
          {stats.map((s) => (
            <span key={s} style={{
              fontFamily: "var(--font-mono)", fontSize: "9px",
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "5px 11px", borderRadius: "var(--r-pill)",
              background: accentBg, color: accent,
              border: `1px solid ${accent}22`, whiteSpace: "nowrap",
            }}>
              {s}
            </span>
          ))}
        </div>

        <Link href={href}
          aria-label={`${cta} — a_trendfleurs by Anni`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "18px",
            fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase", color: accent,
            borderBottom: `1px solid ${accent}44`, paddingBottom: "2px", transition: "gap 220ms",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "14px"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "8px"; }}
        >
          {cta} <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

/* ─── Mobile Block Card (compact with thumbnail) ─── */
function MobileBlockCard({ kicker, title, body, stats, cta, href, Icon, accent, accentBg, thumb, thumbAlt }: BlockProps) {
  return (
    <article style={{
      background: "var(--paper-0)", borderRadius: "var(--r-lg)",
      boxShadow: "var(--shadow-md)", overflow: "hidden",
      border: "1px solid var(--paper-200)",
    }}>
      {thumb && (
        <div style={{ position: "relative", height: "140px", overflow: "hidden" }}>
          <Image
            src={thumb}
            alt={thumbAlt ?? kicker}
            fill
            sizes="(max-width: 767px) 100vw, 400px"
            style={{ objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to bottom, transparent 30%, ${accentBg} 100%)`,
          }} />
          <div style={{
            position: "absolute", top: 12, left: 12,
            width: 36, height: 36, borderRadius: "var(--r-sm)",
            background: "rgba(253,251,247,0.9)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: accent, boxShadow: "var(--shadow-sm)",
          }}>
            <Icon size={17} strokeWidth={1.5} />
          </div>
        </div>
      )}

      <div style={{ padding: "18px 18px 16px" }}>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)",
          letterSpacing: "var(--track-kicker)", textTransform: "uppercase",
          color: "var(--ink-400)", marginBottom: "6px",
        }}>
          {kicker}
        </p>

        <h3 style={{
          fontFamily: "var(--font-serif)", fontWeight: 400,
          fontSize: "clamp(1.3rem,5vw,1.6rem)", lineHeight: "var(--lh-tight)",
          color: "var(--ink-900)", letterSpacing: "var(--track-tight)",
        }}>
          {title.join(" ")}
        </h3>

        <p className="ps-block-body" style={{
          fontFamily: "var(--font-sans)", fontSize: "0.88rem",
          lineHeight: "var(--lh-body)", color: "var(--ink-500)", marginTop: "8px",
        }}>
          {body}
        </p>

        <div style={{ display: "flex", gap: "6px", marginTop: "12px", flexWrap: "wrap" }}>
          {stats.map((s) => (
            <span key={s} style={{
              fontFamily: "var(--font-mono)", fontSize: "8.5px",
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "4px 9px", borderRadius: "var(--r-pill)",
              background: accentBg, color: accent,
              border: `1px solid ${accent}22`, whiteSpace: "nowrap",
            }}>
              {s}
            </span>
          ))}
        </div>

        <Link
          href={href}
          aria-label={`${cta} — a_trendfleurs by Anni`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "14px",
            fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--paper-0)", background: accent,
            padding: "10px 18px", borderRadius: "var(--r-pill)", minHeight: "44px",
          }}
        >
          {cta} <ArrowRight size={12} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
