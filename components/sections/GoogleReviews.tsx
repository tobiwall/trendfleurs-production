"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// NEXT_PUBLIC_ prefix → available in browser bundle at build time
const PLACE_ID    = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? "";
const REVIEWS_URL = `https://search.google.com/local/reviews?placeid=${PLACE_ID}`;
const WRITE_URL   = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

interface ReviewsData {
  rating: number;
  totalRatings: number;
  reviews: GoogleReview[];
}

const AVATAR_PALETTE = [
  { bg: "var(--rust-50)",   fg: "var(--rust-600)" },
  { bg: "var(--gold-100)",  fg: "var(--gold-600)" },
  { bg: "var(--paper-200)", fg: "var(--ink-500)"  },
  { bg: "var(--rust-100)",  fg: "var(--rust-700)" },
  { bg: "var(--gold-100)",  fg: "var(--rust-500)" },
];

/* ── Google "G" multicolor icon ── */
function GoogleIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: "block", flexShrink: 0 }}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function StarRow({ count, size = 12 }: { count: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }} role="img" aria-label={`${count} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
          fill={i <= count ? "var(--gold-400)" : "var(--paper-400)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  index,
  tilt = false,
  interactive = true,
}: {
  review: GoogleReview;
  index: number;
  tilt?: boolean;
  interactive?: boolean;
}) {
  const cardRef      = useRef<HTMLDivElement>(null);
  const quoteWrapRef = useRef<HTMLDivElement>(null);
  const quoteRef     = useRef<HTMLQuoteElement>(null);
  const clampedH     = useRef<number>(0);
  const [expanded, setExpanded] = useState(false);

  const palette = AVATAR_PALETTE[index % AVATAR_PALETTE.length];
  const isLong  = review.text.length > 200;

  /* ── Measure line-height on mount, apply GSAP height clamp ── */
  useEffect(() => {
    if (!isLong || !quoteWrapRef.current || !quoteRef.current) return;
    const lhPx = parseFloat(getComputedStyle(quoteRef.current).lineHeight);
    clampedH.current = (isNaN(lhPx) || lhPx === 0 ? 25 : lhPx) * 4;
    gsap.set(quoteWrapRef.current, { height: clampedH.current, overflow: "hidden" });
  }, []); // stable: review.text never changes for a given card instance

  /* ── Smooth GSAP expand / collapse ── */
  const toggleExpand = () => {
    const wrap  = quoteWrapRef.current;
    const quote = quoteRef.current;
    if (!wrap || !quote || clampedH.current === 0) return;
    if (!expanded) {
      gsap.to(wrap, { height: quote.scrollHeight, duration: 0.45, ease: "power2.out" });
    } else {
      gsap.to(wrap, { height: clampedH.current,    duration: 0.35, ease: "power2.in"  });
    }
    setExpanded((e) => !e);
  };

  /* ── 3-D tilt (desktop only) ── */
  useEffect(() => {
    if (!tilt || !cardRef.current) return;
    const el = cardRef.current;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      gsap.to(el, {
        rotateY: x * 10, rotateX: -y * 8,
        transformPerspective: 1000, duration: 0.35, ease: "power2.out",
      });
    };
    const onLeave = () =>
      gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "power4.out" });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [tilt]);

  return (
    <div ref={cardRef} className="gr-card">
      {/* Author */}
      <div className="gr-author">
        <div className="gr-avatar" style={{ background: palette.bg, color: palette.fg }}>
          {review.author_name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="gr-name">{review.author_name}</p>
          <StarRow count={review.rating} />
        </div>
      </div>

      {/* Quote — height controlled by GSAP for long texts */}
      <div ref={quoteWrapRef}>
        <blockquote ref={quoteRef} className="gr-quote">
          „{review.text}"
        </blockquote>
      </div>

      {interactive && isLong && (
        <button className="gr-expand" onClick={toggleExpand}>
          {expanded ? "Weniger ↑" : "Mehr lesen ↓"}
        </button>
      )}

      {/* Footer: date + Google icon link */}
      <div className="gr-card-footer">
        <p className="gr-date">{review.relative_time_description}</p>
        <a
          href={REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gr-g-link"
          aria-label="Rezension auf Google ansehen"
        >
          <GoogleIcon size={13} />
        </a>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="gr-card gr-skel-card" aria-hidden="true">
      <div className="gr-author">
        <div className="gr-skel" style={{ width: 42, height: 42, borderRadius: "50%", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div className="gr-skel" style={{ height: 11, width: "55%", borderRadius: 4, marginBottom: 8 }} />
          <div className="gr-skel" style={{ height: 10, width: 70, borderRadius: 4 }} />
        </div>
      </div>
      <div className="gr-skel" style={{ height: 10, borderRadius: 4, marginBottom: 8 }} />
      <div className="gr-skel" style={{ height: 10, borderRadius: 4, marginBottom: 8, width: "90%" }} />
      <div className="gr-skel" style={{ height: 10, borderRadius: 4, width: "74%" }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   Main section
══════════════════════════════════════════════════════ */
export default function GoogleReviews() {
  const [data,    setData]    = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const ratingRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null); // overflow:hidden container
  const trackRef   = useRef<HTMLDivElement>(null); // moving track

  /* ── Fetch ── */
  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/reviews", { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d: ReviewsData) => {
        if (Array.isArray(d.reviews) && d.reviews.length > 0) setData(d);
      })
      .catch((err) => { if (err?.name !== "AbortError") console.warn("[GoogleReviews]", err); })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  /* ── GSAP ── */
  useEffect(() => {
    if (loading || !data) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0, y: 20, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
      });
      gsap.from(ratingRef.current, {
        opacity: 0, scale: 0.88, duration: 1.1, ease: "elastic.out(1, 0.6)",
        scrollTrigger: { trigger: ratingRef.current, start: "top 78%", once: true },
      });

      const mm = gsap.matchMedia();

      /* ── Desktop: staggered card reveal ── */
      mm.add("(min-width: 768px)", () => {
        const cards = gridRef.current?.querySelectorAll<HTMLElement>(".gr-card");
        if (!cards?.length) return;
        gsap.from(cards, {
          opacity: 0, y: 52,
          stagger: 0.1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 76%", once: true },
        });
      });

      /* ── Mobile: GSAP ticker marquee + touch-swipe ── */
      mm.add("(max-width: 767px)", () => {
        const marqueeEl = marqueeRef.current;
        const track     = trackRef.current;
        if (!marqueeEl || !track) return;

        ScrollTrigger.refresh();
        const half = track.scrollWidth / 2;
        if (half <= 0) return;

        // Smooth position accumulator driven by GSAP ticker
        const SPEED = 55; // px / s
        let xPos    = 0;
        let running = true;
        let resumeId: ReturnType<typeof setTimeout> | null = null;

        const tick = (_t: number, dt: number) => {
          if (!running) return;
          xPos -= SPEED * (dt / 1000);
          if (xPos <= -half) xPos += half; // seamless loop
          gsap.set(track, { x: xPos });
        };
        gsap.ticker.add(tick);

        /* Wrap any x value into [-half, 0) */
        const wrapX = (nx: number) => {
          let r = nx % half;
          if (r > 0) r -= half;
          return r;
        };

        /* Touch-swipe state */
        let t0x  = 0;
        let pos0 = 0;

        const onTouchStart = (e: TouchEvent) => {
          running = false;
          if (resumeId) clearTimeout(resumeId);
          t0x  = e.touches[0].clientX;
          pos0 = xPos;
        };

        const onTouchMove = (e: TouchEvent) => {
          xPos = wrapX(pos0 + (e.touches[0].clientX - t0x));
          gsap.set(track, { x: xPos });
        };

        const onTouchEnd = () => {
          // Resume auto-run after a 1.5 s pause
          resumeId = setTimeout(() => { running = true; }, 1500);
        };

        marqueeEl.addEventListener("touchstart", onTouchStart, { passive: true });
        marqueeEl.addEventListener("touchmove",  onTouchMove,  { passive: true });
        marqueeEl.addEventListener("touchend",   onTouchEnd,   { passive: true });

        return () => {
          gsap.ticker.remove(tick);
          if (resumeId) clearTimeout(resumeId);
          marqueeEl.removeEventListener("touchstart", onTouchStart);
          marqueeEl.removeEventListener("touchmove",  onTouchMove);
          marqueeEl.removeEventListener("touchend",   onTouchEnd);
          gsap.set(track, { x: 0 });
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, data]);

  if (!loading && !data) return null;

  const marqueeItems  = data?.reviews ? [...data.reviews, ...data.reviews] : [];
  const reviewCount   = data?.reviews.length ?? 1;
  const displayRating = data?.rating.toFixed(1) ?? "–";
  const totalRatings  = data?.totalRatings ?? 0;
  const roundedRating = Math.round(data?.rating ?? 0);

  return (
    <>
      <style>{`
        /* ─── Card ─── */
        .gr-card {
          background: var(--paper-0);
          border: 1px solid var(--paper-200);
          border-radius: var(--r-xl);
          padding: clamp(22px, 3vw, 34px);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          will-change: transform;
          transition: box-shadow 300ms ease, border-color 300ms ease;
        }
        .gr-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--paper-300);
        }

        /* ─── Author row ─── */
        .gr-author {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .gr-avatar {
          width: 42px; height: 42px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-serif);
          font-size: 1.15rem;
          flex-shrink: 0;
        }
        .gr-name {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--ink-900);
          margin-bottom: 5px;
        }

        /* ─── Quote ─── */
        .gr-quote {
          font-family: var(--font-serif);
          font-size: 0.93rem;
          line-height: var(--lh-body);
          color: var(--ink-700);
          font-style: italic;
          margin: 0;
        }

        /* ─── Expand ─── */
        .gr-expand {
          align-self: flex-start;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--rust-500);
          background: none;
          border: none;
          padding: 10px 0 4px;
          cursor: pointer;
          transition: color 200ms;
        }
        .gr-expand:hover { color: var(--rust-700); }

        /* ─── Card footer ─── */
        .gr-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 16px;
        }
        .gr-date {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-300);
        }
        .gr-g-link {
          display: flex;
          align-items: center;
          opacity: 0.45;
          transition: opacity 220ms;
        }
        .gr-g-link:hover { opacity: 1; }

        /* ─── Desktop grid ─── */
        .gr-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(14px, 1.8vw, 24px);
          align-items: start;
        }
        .gr-grid .gr-card:nth-child(2) { margin-top: clamp(24px, 3.5vw, 48px); }
        .gr-grid .gr-card:nth-child(3) { margin-top: clamp(12px, 1.8vw, 26px); }
        .gr-grid .gr-card:nth-child(5) { margin-top: clamp(14px, 2vw,   30px); }

        @media (max-width: 900px) {
          .gr-grid { grid-template-columns: repeat(2, 1fr); }
          .gr-grid .gr-card:nth-child(3) { margin-top: 0; }
        }

        /* ─── CTA buttons ─── */
        .gr-cta-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 30px;
        }
        .gr-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: 0.74rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 11px 22px;
          border-radius: var(--r-pill);
          text-decoration: none;
          white-space: nowrap;
          transition: all 200ms ease;
        }
        .gr-btn-outline {
          color: var(--ink-600);
          border: 1px solid var(--paper-400);
          background: transparent;
        }
        .gr-btn-outline:hover {
          color: var(--ink-900);
          border-color: var(--ink-400);
          background: var(--paper-100);
        }
        .gr-btn-tinted {
          color: var(--rust-600);
          background: var(--rust-50);
          border: 1px solid var(--rust-100);
        }
        .gr-btn-tinted:hover {
          background: var(--rust-100);
          border-color: var(--rust-200);
        }

        /* ─── Skeleton ─── */
        @keyframes gr-pulse {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.4; }
        }
        .gr-skel-card { animation: gr-pulse 1.7s ease-in-out infinite; pointer-events: none; }
        .gr-skel { background: var(--paper-300); display: block; }

        /* ─── Mobile: infinite marquee ─── */
        .gr-marquee {
          display: none;
          overflow: hidden;
          cursor: grab;
          touch-action: pan-y;
          -webkit-mask-image: linear-gradient(
            to right, transparent 0%, black 7%, black 93%, transparent 100%
          );
          mask-image: linear-gradient(
            to right, transparent 0%, black 7%, black 93%, transparent 100%
          );
        }
        .gr-marquee:active { cursor: grabbing; }
        .gr-track {
          display: flex;
          gap: clamp(12px, 2.5vw, 18px);
          width: max-content;
          padding: 8px 0 clamp(28px, 5vw, 44px);
          will-change: transform;
          user-select: none;
          -webkit-user-select: none;
        }
        .gr-track .gr-card {
          width: clamp(268px, 72vw, 300px);
          flex-shrink: 0;
        }

        @media (max-width: 767px) {
          .gr-grid    { display: none !important; }
          .gr-marquee { display: block; }
        }
      `}</style>

      <section
        ref={sectionRef}
        aria-label="Google Bewertungen"
        style={{
          background: "var(--paper-100)",
          paddingTop: "var(--sp-section)",
          paddingBottom: "var(--sp-section)",
          overflow: "hidden",
        }}
      >
        {/* ── Kicker ── */}
        <div ref={headerRef} className="tf-inner"
          style={{ textAlign: "center", marginBottom: "clamp(28px, 4vw, 44px)" }}>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-kicker)",
            letterSpacing: "var(--track-kicker)",
            textTransform: "uppercase",
            color: "var(--rust-600)",
          }}>
            Was unsere Gäste sagen
          </p>
        </div>

        {/* ── Rating hero ── */}
        <div ref={ratingRef} className="tf-inner"
          style={{ textAlign: "center", marginBottom: "clamp(48px, 7vw, 88px)" }}>
          {loading ? (
            <>
              <div className="gr-skel" style={{ width: 120, height: 88, borderRadius: 8, margin: "0 auto 20px", animation: "gr-pulse 1.7s ease-in-out infinite" }} />
              <div className="gr-skel" style={{ width: 136, height: 20, borderRadius: 6, margin: "0 auto 14px", animation: "gr-pulse 1.7s ease-in-out infinite" }} />
              <div className="gr-skel" style={{ width: 200, height: 12, borderRadius: 4, margin: "0 auto",      animation: "gr-pulse 1.7s ease-in-out infinite" }} />
            </>
          ) : (
            <>
              {/* Large serif rating number */}
              <div style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(5rem, 13vw, 8.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "var(--gold-400)",
                marginBottom: "18px",
              }}>
                {displayRating}
              </div>

              {/* Stars */}
              <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "14px" }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width={22} height={22} viewBox="0 0 24 24" aria-hidden="true"
                    fill={i <= roundedRating ? "var(--gold-400)" : "var(--paper-400)"}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Label */}
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--ink-400)",
              }}>
                von&nbsp;5&nbsp;Sternen
                {totalRatings > 0 && <> · {totalRatings.toLocaleString("de-DE")}&nbsp;Bewertungen</>}
                {" "}· Google Maps
              </p>

              {/* ── CTA buttons ── */}
              <div className="gr-cta-row">
                <a
                  href={REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gr-btn gr-btn-outline"
                >
                  <GoogleIcon size={13} />
                  Rezensionen lesen
                </a>
                <a
                  href={WRITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gr-btn gr-btn-tinted"
                >
                  Bewertung schreiben
                  <span aria-hidden="true" style={{ fontSize: "0.85em", opacity: 0.7 }}>✦</span>
                </a>
              </div>
            </>
          )}
        </div>

        {/* ── Desktop: 3-column asymmetric grid ── */}
        <div className="tf-inner">
          <div ref={gridRef} className="gr-grid">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              : data?.reviews.map((r, i) => (
                  <ReviewCard key={i} review={r} index={i} tilt />
                ))}
          </div>
        </div>

        {/* ── Mobile: infinite marquee with touch-swipe ── */}
        <div
          ref={marqueeRef}
          className="gr-marquee"
          style={{ paddingLeft: "var(--gutter)" }}
        >
          <div ref={trackRef} className="gr-track">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : marqueeItems.map((r, i) => (
                  <ReviewCard
                    key={i}
                    review={r}
                    index={i % reviewCount}
                    interactive={false}
                  />
                ))}
          </div>
        </div>
      </section>
    </>
  );
}
