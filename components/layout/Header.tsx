"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useStore } from "@/lib/store";

const NAV_SIMPLE = [
  { href: "/", label: "Home" },
  { href: "/dekoverleih", label: "Dekoverleih" },
  { href: "/shop", label: "Shop" },
  { href: "/ueber-uns", label: "Über uns" },
];

const LEISTUNGEN_DROPDOWN = [
  { href: "/leistungen", label: "Alle Leistungen", desc: "Überblick aller Services" },
  { href: "/leistungen/hochzeiten", label: "Hochzeiten & Floristik", desc: "Full-Service vom Brautstrauß bis zum Aufbau" },
  { href: "/leistungen/events", label: "Events & Corporate", desc: "Geburtstage, Jubiläen, Firmenfeiern" },
  { href: "/leistungen/jga", label: "JGA & Workshops", desc: "Flower Crown, Boho-Deko, Audio Gästetelefon" },
];

const MOBILE_NAV = [
  { href: "/", label: "Home", big: true },
  { href: "/leistungen", label: "Leistungen", big: true },
  { href: "/leistungen/hochzeiten", label: "Hochzeiten & Floristik", big: false, indent: true },
  { href: "/leistungen/events", label: "Events & Corporate", big: false, indent: true },
  { href: "/leistungen/jga", label: "JGA & Workshops", big: false, indent: true },
  { href: "/dekoverleih", label: "Dekoverleih", big: true },
  { href: "/shop", label: "Shop", big: true },
  { href: "/ueber-uns", label: "Über uns", big: true },
  { href: "/faq", label: "FAQ", big: false },
  { href: "/anfrage", label: "Anfrage stellen", big: true },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, wishCount } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? "rgba(253,251,247,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--paper-300)" : "1px solid transparent",
        transition: "background 380ms ease, border-color 380ms ease",
      }}>
        <div className="tf-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "clamp(60px,9vw,72px)" }}>

          {/* ── Logo ── */}
          <Link href="/" style={{ flexShrink: 0, display: "block", lineHeight: 0 }}>
            <Image
              src="/logo.png"
              alt="a_trendfleurs by Anni"
              width={772}
              height={772}
              priority
              style={{ width: "clamp(160px, 22vw, 240px)", height: "auto", display: "block" }}
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="desktop-nav" style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {/* Leistungen with dropdown */}
            <LeistungenMenu pathname={pathname} />
            {NAV_SIMPLE.map((n) => (
              <NavLink key={n.href} href={n.href} active={pathname === n.href || pathname.startsWith(n.href + "/")}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* ── Actions ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
            <IconButton href="/dekoverleih" label="Wunschzettel" count={wishCount}>
              <Heart size={20} strokeWidth={1.6} />
            </IconButton>
            <IconButton href="/shop" label="Warenkorb" count={cartCount}>
              <ShoppingBag size={20} strokeWidth={1.6} />
            </IconButton>
            <Link href="/anfrage" style={{
              display: "none", alignItems: "center", marginLeft: "10px",
              fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 500,
              letterSpacing: "0.14em", textTransform: "uppercase",
              background: "var(--charcoal)", color: "var(--on-charcoal)",
              padding: "10px 20px", borderRadius: "var(--r-pill)", whiteSpace: "nowrap",
            }} className="cta-desktop">
              Anfragen
            </Link>
            <button
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 40, height: 40, background: "none", border: "none", cursor: "pointer",
                color: "var(--ink-900)", marginLeft: "4px",
              }}
              className="hamburger"
            >
              {open ? <X size={24} strokeWidth={1.7} /> : <Menu size={24} strokeWidth={1.7} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile backdrop ── */}
      <div onClick={() => setOpen(false)} style={{
        position: "fixed", inset: 0, background: "rgba(26,26,26,.40)",
        zIndex: 48, opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
        transition: "opacity 360ms ease", backdropFilter: open ? "blur(4px)" : "none",
      }} />

      {/* ── Mobile off-canvas ── */}
      <aside style={{
        position: "fixed", top: 0, right: 0, height: "100%", width: "min(400px,92vw)",
        zIndex: 49, background: "var(--cream)", boxShadow: "var(--shadow-lg)",
        display: "flex", flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 420ms cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px 0" }}>
          <Image src="/logo.png" alt="a_trendfleurs by Anni" width={772} height={772} style={{ width: "160px", height: "auto", display: "block" }} />
          <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-500)", padding: "8px" }}>
            <X size={22} strokeWidth={1.6} />
          </button>
        </div>

        <nav style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 24px 20px", overflowY: "auto" }}>
          {MOBILE_NAV.map((n, i) => (
            <Link key={n.href + i} href={n.href}
              style={{
                fontFamily: n.big ? "var(--font-serif)" : "var(--font-sans)",
                fontSize: n.big ? "clamp(1.3rem,4.5vw,1.75rem)" : "0.88rem",
                color: pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href))
                  ? "var(--rust-500)" : n.indent ? "var(--ink-500)" : "var(--ink-900)",
                padding: n.big ? "12px 0" : "8px 0 8px 16px",
                borderBottom: n.big ? "1px solid var(--paper-300)" : "1px solid var(--paper-200)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                letterSpacing: n.big ? 0 : "0.01em",
                opacity: 0,
                animation: open ? `fadeSlideIn 480ms ${i * 45 + 50}ms forwards` : "none",
              }}
            >
              <span>{n.indent ? "↳ " : ""}{n.label}</span>
              {n.big && <span style={{ fontSize: "0.75em", color: "var(--rust-300)" }}>→</span>}
            </Link>
          ))}
        </nav>

        <div style={{ padding: "16px 24px 32px", borderTop: "1px solid var(--paper-300)" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-400)", margin: 0 }}>
            Westerwald · Köln · Frankfurt · NRW
          </p>
        </div>
      </aside>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (min-width: 992px) {
          .hamburger    { display: none !important; }
          .cta-desktop  { display: flex !important; }
        }
        @media (max-width: 991px) {
          .desktop-nav  { display: none !important; }
        }
      `}</style>
    </>
  );
}

/* ── Leistungen dropdown (hover on desktop, click on touch) ── */
function LeistungenMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = pathname.startsWith("/leistungen");

  /* Detect touch/coarse-pointer devices once on mount */
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div
      ref={ref}
      style={{ position: "relative" }}
      /* Hover only on fine-pointer (mouse) devices — gap-free via paddingTop below */
      onMouseEnter={() => { if (!isTouch) setOpen(true); }}
      onMouseLeave={() => { if (!isTouch) setOpen(false); }}
    >
      <button
        aria-haspopup="true"
        aria-expanded={open}
        /* On touch devices the button click is the only trigger */
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex", alignItems: "center", gap: "4px",
          fontFamily: "var(--font-sans)", fontSize: "0.93rem", letterSpacing: "0.03em",
          color: isActive ? "var(--rust-500)" : "var(--ink-700)",
          background: "none", border: "none", cursor: "pointer", padding: "2px 0",
          position: "relative", transition: "color 200ms",
        }}
      >
        Leistungen
        <ChevronDown size={13} strokeWidth={2} style={{
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 220ms",
        }} />
        <span style={{
          position: "absolute", left: 0, bottom: -1, height: "1px",
          background: "var(--gold-400)", width: isActive ? "100%" : "0%",
          transition: "width 320ms var(--ease-out)",
        }} />
      </button>

      {/* Flyout — positioned flush (top:100%) so no gap breaks the hover chain.
          paddingTop creates the visual breathing room while keeping the
          mouse inside this element's bounds the whole way down. */}
      {open && (
        <div style={{
          position: "absolute", top: "100%", left: "50%",
          transform: "translateX(-50%)",
          paddingTop: "10px",   /* visual gap — hover area stays continuous */
          zIndex: 100,
        }}>
          <div style={{
            background: "rgba(253,251,247,0.97)", backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid var(--paper-300)", borderRadius: "var(--r-lg)",
            boxShadow: "var(--shadow-lg)",
            minWidth: "280px", padding: "8px",
            animation: "dropIn 180ms ease",
          }}>
            {LEISTUNGEN_DROPDOWN.map((item, i) => {
              const isItemActive = pathname === item.href || (item.href !== "/leistungen" && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}
                  style={{
                    display: "flex", flexDirection: "column", gap: "2px",
                    padding: "10px 14px", borderRadius: "var(--r-sm)",
                    background: isItemActive ? "var(--rust-50)" : "transparent",
                    transition: "background 150ms", textDecoration: "none",
                    borderTop: i === 1 ? "1px solid var(--paper-200)" : "none",
                    marginTop: i === 1 ? "4px" : 0,
                  }}
                  onMouseEnter={(e) => { if (!isItemActive) e.currentTarget.style.background = "var(--paper-100)"; }}
                  onMouseLeave={(e) => { if (!isItemActive) e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{
                    fontFamily: "var(--font-sans)", fontSize: i === 0 ? "0.82rem" : "0.9rem",
                    fontWeight: i === 0 ? 400 : 500,
                    color: isItemActive ? "var(--rust-600)" : i === 0 ? "var(--ink-400)" : "var(--ink-900)",
                    letterSpacing: i === 0 ? "0.1em" : 0,
                    textTransform: i === 0 ? "uppercase" : "none",
                  }}>
                    {item.label}
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--ink-400)", lineHeight: 1.3 }}>
                    {item.desc}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      <style>{`
        @keyframes dropIn {
          from { opacity:0; transform:translateX(-50%) translateY(-6px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Simple nav link ── */
function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <Link href={href}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--font-sans)", fontSize: "0.93rem", letterSpacing: "0.03em",
        color: active ? "var(--rust-500)" : hover ? "var(--rust-500)" : "var(--ink-700)",
        position: "relative", paddingBottom: "2px", transition: "color 200ms",
      }}
    >
      {children}
      <span style={{
        position: "absolute", left: 0, bottom: -1, height: "1px", background: "var(--gold-400)",
        width: active || hover ? "100%" : "0%", transition: "width 320ms var(--ease-out)",
      }} />
    </Link>
  );
}

/* ── Icon button ── */
function IconButton({ href, label, count, children }: { href: string; label: string; count: number; children: React.ReactNode }) {
  return (
    <Link href={href} title={label} style={{ position: "relative", display: "inline-flex", padding: "10px", color: "var(--ink-700)" }}>
      {children}
      {count > 0 && (
        <span style={{
          position: "absolute", top: 4, right: 4, width: 16, height: 16,
          background: "var(--rust-500)", color: "var(--on-rust)", borderRadius: "999px",
          fontFamily: "var(--font-mono)", fontSize: "9px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
