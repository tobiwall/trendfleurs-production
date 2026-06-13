"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

const HEADLINE: Array<{ text: string; break?: true }> = [
  { text: "Floristik," },
  { text: "die" },
  { text: "Geschichten", break: true },
  { text: "erzählt." },
];

export default function StorySection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoColRef = useRef<HTMLDivElement>(null);
  const kickerRef   = useRef<HTMLParagraphElement>(null);
  const bodyRef     = useRef<HTMLDivElement>(null);
  const textColRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ── Video column slides in from left on both sizes ── */
      gsap.from(videoColRef.current, {
        opacity: 0, x: -28, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });

      /* ══════════════════════════════════════════
         DESKTOP: 3D lamella headline + stagger
      ══════════════════════════════════════════ */
      mm.add("(min-width: 768px)", () => {
        const scrollTrig = {
          trigger: sectionRef.current,
          start: "top 76%",
          once: true,
        };

        gsap.from(kickerRef.current, {
          opacity: 0, y: 14, duration: 0.7, ease: "power3.out",
          scrollTrigger: scrollTrig,
        });

        gsap.set(sectionRef.current!.querySelectorAll(".story-word"), {
          transformPerspective: 700,
          transformOrigin: "50% 0%",
        });
        gsap.from(sectionRef.current!.querySelectorAll(".story-word"), {
          rotateX: -90, opacity: 0, y: 8,
          stagger: 0.085, duration: 0.95, ease: "power4.out",
          scrollTrigger: scrollTrig,
        });

        gsap.from(bodyRef.current!.children, {
          opacity: 0, y: 22, stagger: 0.1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { ...scrollTrig, start: "top 70%" },
        });
      });

      /* ══════════════════════════════════════════
         MOBILE: Z-axis fly-through headline
      ══════════════════════════════════════════ */
      mm.add("(max-width: 767px)", () => {
        const section = sectionRef.current!;
        const st = { trigger: section, start: "top 82%", once: true };

        gsap.from(kickerRef.current, {
          opacity: 0, y: 22, duration: 0.9, ease: "power4.out",
          scrollTrigger: st,
        });

        gsap.set(section.querySelectorAll(".story-word"), {
          transformPerspective: 520,
          transformOrigin: "50% 50%",
        });
        gsap.from(section.querySelectorAll(".story-word"), {
          scale: 0.42, opacity: 0, y: 10,
          stagger: 0.075, duration: 1.15, ease: "power4.out",
          scrollTrigger: { ...st, start: "top 86%" },
        });

        gsap.from(bodyRef.current!.children, {
          opacity: 0, y: 24,
          stagger: 0.09, duration: 0.95, ease: "power4.out",
          scrollTrigger: { ...st, start: "top 78%" },
        });

        return () => {
          gsap.set(section.querySelectorAll(".story-word"), { clearProps: "all" });
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* ── Two-column desktop grid ── */
        .story-section {
          position: relative;
          background: var(--cream);
          padding: var(--sp-section) 0;
          overflow: hidden;
        }
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(36px, 6vw, 96px);
          align-items: center;
        }

        /* ── Lamella-word clip ── */
        .story-word-clip {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          margin-right: 0.22em;
        }
        .story-word {
          display: inline-block;
          will-change: transform, opacity;
        }

        /* ── Desktop background wash ── */
        .story-desk-wash {
          position: absolute; top: 0; right: 0;
          width: 42%; height: 100%;
          background: linear-gradient(to left, var(--paper-100), transparent);
          pointer-events: none;
        }

        /* ── Reel video card ── */
        .story-video-col {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 9 / 16;
          max-height: 72vh;
          box-shadow: 0 24px 64px rgba(26,14,8,0.22), 0 4px 16px rgba(26,14,8,0.10);
          will-change: transform, opacity;
          background: var(--paper-200);
        }
        .story-video-col video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Quote badge inside video card */
        .story-quote-badge {
          position: absolute;
          bottom: 24px; left: 16px; right: 16px;
          background: rgba(253,251,247,0.93);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: var(--r-md);
          border: 1px solid var(--paper-300);
          padding: 14px 18px;
          box-shadow: var(--shadow-md);
        }

        /* ══════════════════════════════════════════
           MOBILE: stacked layout — video card above text
        ══════════════════════════════════════════ */
        @media (max-width: 767px) {
          .story-section {
            padding: var(--sp-section) 0;
          }
          .story-desk-wash { display: none; }

          .story-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: clamp(28px, 6vw, 40px) !important;
          }

          /* Video: constrained portrait card, centered */
          .story-video-col {
            width: 100%;
            max-width: 280px;
            margin: 0 auto;
            max-height: 52svh;
            border-radius: 18px;
          }

          /* Quote badge hidden on mobile — keeps card clean */
          .story-quote-badge { display: none; }

          .story-text-col { padding: 0; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="story-section"
        aria-label="Unsere Geschichte & Positionierung"
      >
        {/* Desktop background wash */}
        <div className="story-desk-wash" aria-hidden="true" />

        <div className="tf-inner story-grid" style={{ position: "relative" }}>

          {/* ── Reel video column ── */}
          <div ref={videoColRef} className="story-video-col">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              <source src="/anni.mp4" type="video/mp4" />
            </video>

            {/* Subtle bottom gradient for badge legibility */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(26,14,8,0.52) 0%, transparent 45%)",
              pointerEvents: "none",
            }} />

            {/* Quote badge (desktop only via CSS) */}
            <div className="story-quote-badge">
              <p style={{
                fontFamily: "var(--font-script)", fontSize: "1.4rem",
                color: "var(--rust-600)", lineHeight: 1.2, marginBottom: "6px",
              }}>
                „Jedes Detail erzählt eure Geschichte."
              </p>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "9px",
                letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-400)",
              }}>
                — Anni, Inhaberin a_trendfleurs
              </p>
            </div>
          </div>

          {/* ── Text column ── */}
          <div className="story-text-col" ref={textColRef}>
            <p
              ref={kickerRef}
              className="story-kicker"
              style={{
                fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)",
                letterSpacing: "var(--track-kicker)", textTransform: "uppercase",
                color: "var(--rust-600)", marginBottom: "20px",
              }}
            >
              Warum a_trendfleurs?
            </p>

            {/* 3D Lamella / Z-Fly headline */}
            <h2
              className="story-headline"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--fs-h1)",
                lineHeight: 1.12,
                letterSpacing: "var(--track-tight)",
                color: "var(--ink-900)",
                marginBottom: "28px",
              }}
            >
              {HEADLINE.map((item, i) => (
                <span key={i}>
                  <span className="story-word-clip">
                    <span className="story-word">{item.text}</span>
                  </span>
                  {item.break && <br />}
                </span>
              ))}
            </h2>

            <div ref={bodyRef} className="story-body" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)",
                lineHeight: "var(--lh-body)", color: "var(--ink-500)", maxWidth: "46ch",
              }}>
                Ich glaube, dass die schönsten Momente entstehen, wenn jemand
                wirklich zuhört. Kein Template, kein Baukastensystem — nur deine
                Geschichte, in Blumen, Licht und Atmosphäre verwandelt.
              </p>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)",
                lineHeight: "var(--lh-body)", color: "var(--ink-500)", maxWidth: "46ch",
              }}>
                Als gelernte Floristin plane und gestalte ich jede Hochzeit und
                jeden Event persönlich — von der ersten Idee bis zum letzten
                Blütenblatt.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingTop: "4px" }}>
                {["100+ Hochzeiten", "Gelernte Floristin", "Alles aus einer Hand", "Westerwald & NRW"].map((tag) => (
                  <span key={tag} className="story-tag" style={{
                    fontFamily: "var(--font-mono)", fontSize: "9px",
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    padding: "6px 14px", borderRadius: "var(--r-pill)",
                    background: "var(--rust-50)", color: "var(--rust-600)",
                    border: "1px solid var(--rust-100)",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ paddingTop: "8px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <Link
                  href="/anfrage"
                  className="story-cta-primary"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "var(--paper-0)", background: "var(--rust-500)",
                    padding: "14px 28px", borderRadius: "var(--r-pill)",
                    boxShadow: "0 6px 24px rgba(163,106,94,0.28)",
                    transition: "background 220ms, box-shadow 220ms, gap 180ms",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "var(--rust-600)";
                    el.style.boxShadow = "0 8px 32px rgba(163,106,94,0.38)";
                    el.style.gap = "16px";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "var(--rust-500)";
                    el.style.boxShadow = "0 6px 24px rgba(163,106,94,0.28)";
                    el.style.gap = "10px";
                  }}
                >
                  Kostenlos anfragen <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                </Link>

                <Link
                  href="/ueber-uns"
                  className="story-cta-ghost"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 400,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "var(--rust-600)",
                    borderBottom: "1px solid var(--rust-200)",
                    paddingBottom: "2px",
                    transition: "gap 180ms, color 180ms",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.gap = "14px";
                    el.style.color = "var(--rust-700)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.gap = "8px";
                    el.style.color = "var(--rust-600)";
                  }}
                >
                  Meine Geschichte <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
