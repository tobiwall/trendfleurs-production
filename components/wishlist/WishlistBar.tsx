"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Heart, ChevronUp } from "lucide-react";
import { useStore } from "@/lib/store";

export default function WishlistBar() {
  const { wishCount, wishDrawerOpen, openWishDrawer } = useStore();
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const prevCount = useRef(0);

  /* Animate in on first item added, out when list is empty */
  useEffect(() => {
    const wasEmpty = prevCount.current === 0;
    const isEmpty  = wishCount === 0;

    if (!wasEmpty && isEmpty) {
      /* Slide out and unmount */
      gsap.to(barRef.current, {
        y: 90, opacity: 0, ease: "power3.in", duration: 0.34,
        onComplete: () => setVisible(false),
      });
    } else if (wasEmpty && !isEmpty) {
      /* Mount, then slide in */
      setVisible(true);
      requestAnimationFrame(() => {
        gsap.fromTo(barRef.current,
          { y: 90, opacity: 0 },
          { y: 0, opacity: 1, ease: "power4.out", duration: 0.46 }
        );
      });
    }

    prevCount.current = wishCount;
  }, [wishCount]);

  /* Pulse animation when count increases while bar is already visible */
  useEffect(() => {
    if (!visible || !barRef.current) return;
    gsap.timeline()
      .to(barRef.current.querySelector(".wb-count"), { scale: 1.35, duration: 0.14, ease: "power2.out" })
      .to(barRef.current.querySelector(".wb-count"), { scale: 1, duration: 0.32, ease: "elastic.out(1.1, 0.4)" });
  }, [wishCount, visible]);

  /* Hide behind open drawer */
  if (!visible || wishDrawerOpen) return null;

  return (
    <>
      <style>{`
        /* Desktop: nudge up slightly so it clears any nav */
        @media (min-width: 768px) {
          .wb-bar { bottom: 28px !important; left: 50% !important; transform: translateX(-50%) !important; width: auto !important; right: auto !important; }
        }
      `}</style>

      <div
        ref={barRef}
        className="wb-bar"
        style={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          zIndex: 8990,
          padding: "0 16px 12px",
          pointerEvents: "none",
        }}
        aria-live="polite"
      >
        <button
          onClick={openWishDrawer}
          aria-label={`Wunschzettel öffnen — ${wishCount} ${wishCount === 1 ? "Artikel" : "Artikel"}`}
          style={{
            width: "100%",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 20px",
            background: "var(--charcoal)",
            borderRadius: "var(--r-pill)",
            border: "none", cursor: "pointer",
            boxShadow: "0 8px 32px rgba(16,10,6,0.28), 0 2px 8px rgba(16,10,6,0.18)",
            pointerEvents: "all",
            transition: "background 180ms, box-shadow 180ms",
          }}
          onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "#000"; el.style.boxShadow = "0 12px 40px rgba(16,10,6,0.36)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "var(--charcoal)"; el.style.boxShadow = "0 8px 32px rgba(16,10,6,0.28), 0 2px 8px rgba(16,10,6,0.18)"; }}
        >
          {/* Left: heart icon + label */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 34, height: 34,
              borderRadius: "var(--r-pill)",
              background: "var(--rust-500)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Heart size={15} fill="currentColor" color="white" strokeWidth={0} aria-hidden="true" />
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "8px",
                letterSpacing: "0.24em", textTransform: "uppercase",
                color: "rgba(253,251,247,0.55)", marginBottom: "1px",
              }}>
                Dekoverleih
              </p>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: "0.88rem",
                fontWeight: 500, color: "var(--paper-0)", margin: 0,
              }}>
                Wunschzettel
              </p>
            </div>
          </div>

          {/* Right: count badge + chevron */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              className="wb-count"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                minWidth: 28, height: 28,
                background: "var(--rust-500)",
                borderRadius: "var(--r-pill)",
                fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 600,
                color: "var(--paper-0)",
                padding: "0 8px",
              }}
            >
              {wishCount}
            </span>
            <ChevronUp size={18} strokeWidth={1.8} color="rgba(253,251,247,0.55)" aria-hidden="true" />
          </div>
        </button>
      </div>
    </>
  );
}
