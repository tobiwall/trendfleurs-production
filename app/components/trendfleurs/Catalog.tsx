"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Kicker, ImagePH, Reveal, Icon } from './primitives';
import { DECOR, DECOR_CATS, SHOP, SHOP_CATS, imgSrc } from './data';
import type { DecorItem, ShopItem, Page } from './data';

/* ─── Badge ─── */
interface BadgeProps { children: string; }

export function Badge({ children }: BadgeProps) {
  const tones = {
    rust: { bg: 'var(--rust-50)', fg: 'var(--rust-600)' },
    gold: { bg: 'var(--gold-100)', fg: 'var(--gold-600)' },
    sage: { bg: '#E7EADF', fg: '#51603C' },
  };
  const t = children === 'Neu' ? tones.gold : children === 'Highlight' ? tones.sage : tones.rust;
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.16em',
      textTransform: 'uppercase', padding: '5px 11px', borderRadius: '999px',
      background: t.bg, color: t.fg, whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

/* ─── DecorTile (rental) ─── */
interface DecorTileProps {
  d: DecorItem;
  onClick: () => void;
  onWish?: () => void;
}

export function DecorTile({ d, onClick, onWish }: DecorTileProps) {
  const [hover, setHover] = useState(false);
  const [wished, setWished] = useState(false);
  const heartRef = useRef<HTMLButtonElement>(null);

  function handleWish(e: React.MouseEvent) {
    e.stopPropagation();
    setWished(true);
    onWish?.();
    /* GSAP heart bounce */
    if (heartRef.current) {
      gsap.timeline()
        .to(heartRef.current, { scale: 1.45, duration: 0.13, ease: 'power2.out' })
        .to(heartRef.current, { scale: 1,    duration: 0.38, ease: 'elastic.out(1.1, 0.4)' });
    }
  }

  return (
    <article>
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`${d.name} — ${d.price} ${d.unit} ansehen`}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ cursor: 'pointer' }}
      >
      <div style={{
        borderRadius: 'var(--r-lg)', overflow: 'hidden', position: 'relative',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'box-shadow var(--dur-base)', aspectRatio: '4/5',
      }}>
        <Image
          src={imgSrc(d.seed, 600)}
          alt={`${d.name} — Dekoverleih für Hochzeiten und Events`}
          fill
          sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw"
          style={{
            objectFit: 'cover',
            transform: hover ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform var(--dur-slow) var(--ease-organic)',
          }}
        />
        {d.badge && <div style={{ position: 'absolute', top: 14, left: 14 }} aria-label={d.badge}><Badge>{d.badge}</Badge></div>}
        <button
          ref={heartRef}
          aria-label={wished ? `${d.name} ist auf dem Wunschzettel` : `${d.name} auf den Wunschzettel setzen`}
          onClick={handleWish}
          style={{
            position: 'absolute', bottom: 14, right: 14, width: 42, height: 42,
            borderRadius: '999px', border: 'none', cursor: 'pointer',
            background: wished ? 'var(--rust-500)' : 'rgba(253,251,247,0.9)',
            color: wished ? 'var(--on-rust)' : 'var(--rust-500)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)',
            opacity: hover || wished ? 1 : 0,
            transform: hover || wished ? 'translateY(0)' : 'translateY(8px)',
            transition: 'background var(--dur-base), color var(--dur-base), opacity var(--dur-base) var(--ease-organic)',
            willChange: 'transform',
          }}
        >
          <Icon name="heart" size={18} />
        </button>
      </div>
      <div style={{ padding: '14px 4px 0' }}>
        <Kicker style={{ fontSize: '10px' }}>{d.cat}</Kicker>
        <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--ink-900)' }}>{d.name}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-small)', color: 'var(--ink-700)', marginTop: '4px' }}>
          <b style={{ fontWeight: 500 }}>{d.price}</b>{' '}
          <span style={{ color: 'var(--ink-400)' }}>{d.unit}</span>
        </div>
      </div>
      </div>
    </article>
  );
}

/* ─── ShopTile ─── */
interface ShopTileProps {
  p: ShopItem;
  onClick: () => void;
  onAdd: () => void;
}

export function ShopTile({ p, onClick, onAdd }: ShopTileProps) {
  const [hover, setHover] = useState(false);
  return (
    <article onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`${p.name} für ${p.price} € ansehen`}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        style={{
          borderRadius: 'var(--r-lg)', overflow: 'hidden', position: 'relative', cursor: 'pointer',
          boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
          transition: 'box-shadow var(--dur-base)', aspectRatio: '1/1',
          background: 'var(--paper-0)',
        }}
      >
        <Image
          src={imgSrc(p.seed, 600)}
          alt={`${p.name} — personalisierte Hochzeitsdeko kaufen`}
          fill
          sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw"
          style={{
            objectFit: 'cover',
            transform: hover ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform var(--dur-slow) var(--ease-organic)',
          }}
        />
        {p.badge && <div style={{ position: 'absolute', top: 14, left: 14 }}><Badge>{p.badge}</Badge></div>}
      </div>
      <div style={{ padding: '14px 4px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--ink-900)', cursor: 'pointer' }}
            onClick={onClick}>{p.name}</span>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-small)', color: 'var(--ink-700)', marginTop: '3px' }}>
            {p.price.toFixed(0)} €
          </div>
        </div>
        <button
          onClick={onAdd}
          aria-label={`${p.name} in den Warenkorb legen`}
          style={{
            flex: 'none', width: 44, height: 44, borderRadius: '999px',
            border: '1px solid var(--border-strong)', cursor: 'pointer',
            background: hover ? 'var(--charcoal)' : 'transparent',
            color: hover ? 'var(--on-charcoal)' : 'var(--ink-900)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all var(--dur-fast)',
          }}
        >
          <Icon name="plus" size={18} />
        </button>
      </div>
    </article>
  );
}

/* ─── Page header ─── */
interface PageHeadProps { kicker: string; title: string; lead?: string; }

function PageHead({ kicker, title, lead }: PageHeadProps) {
  return (
    <div className="tf-inner" style={{ paddingTop: '60px' }}>
      <Reveal y={0}><Kicker>{kicker}</Kicker></Reveal>
      <Reveal delay={70}><h1 style={{ marginTop: '14px', maxWidth: '12ch' }}>{title}</h1></Reveal>
      {lead && (
        <Reveal delay={150}>
          <p style={{ maxWidth: '500px', marginTop: '18px', fontWeight: 300, fontSize: 'var(--fs-lead)' }}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ─── FilterBar ─── */
interface FilterBarProps { cats: string[]; active: string; onPick: (c: string) => void; }

function FilterBar({ cats, active, onPick }: FilterBarProps) {
  return (
    <div className="tf-inner" style={{ paddingTop: '32px', paddingBottom: '0', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {cats.map((c) => (
        <button key={c} onClick={() => onPick(c)} style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.84rem', letterSpacing: '0.04em',
          padding: '9px 18px', borderRadius: '999px', cursor: 'pointer',
          border: '1px solid ' + (active === c ? 'var(--charcoal)' : 'var(--border-strong)'),
          background: active === c ? 'var(--charcoal)' : 'transparent',
          color: active === c ? 'var(--on-charcoal)' : 'var(--ink-700)',
          transition: 'all var(--dur-fast)',
        }}>
          {c}
        </button>
      ))}
    </div>
  );
}

/* ─── DecorPage ─── */
interface DecorPageProps {
  go: (p: Page, ctx?: { kind: 'decor' | 'shop'; id: string }) => void;
  addToWishlist: (item: DecorItem) => void;
}

export function DecorPage({ go, addToWishlist }: DecorPageProps) {
  const [cat, setCat] = useState('Alle');
  const items = cat === 'Alle' ? DECOR : DECOR.filter((d) => d.cat === cat);
  return (
    <div style={{ paddingBottom: 'var(--sp-section)' }}>
      <PageHead kicker="Dekoverleih" title="Schönes zum Mieten"
        lead="Hoops, Florals, Tischdeko und das Audio Gästetelefon — kuratiert und liebevoll gepflegt. Stell dir einen unverbindlichen Wunschzettel zusammen." />
      <FilterBar cats={DECOR_CATS} active={cat} onPick={setCat} />
      <div className="tf-inner" style={{ paddingTop: '40px' }}>
        <div className="tf-grid-3">
          {items.map((d, i) => (
            <Reveal key={d.id} delay={(i % 3) * 80}>
              <DecorTile d={d} onClick={() => go('product', { kind: 'decor', id: d.id })} onWish={() => addToWishlist(d)} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ShopPage ─── */
interface ShopPageProps {
  go: (p: Page, ctx?: { kind: 'decor' | 'shop'; id: string }) => void;
  addToCart: (item: ShopItem) => void;
}

export function ShopPage({ go, addToCart }: ShopPageProps) {
  const [cat, setCat] = useState('Alle');
  const items = cat === 'Alle' ? SHOP : SHOP.filter((p) => p.cat === cat);
  return (
    <div style={{ paddingBottom: 'var(--sp-section)' }}>
      <PageHead kicker="Shop" title="Deko & Personalisiertes"
        lead="Fertige Lieblingsstücke und personalisierte Deko — direkt nach Hause geliefert." />
      <FilterBar cats={SHOP_CATS} active={cat} onPick={setCat} />
      <div className="tf-inner" style={{ paddingTop: '40px' }}>
        <div className="tf-grid-3" style={{ gap: '30px 24px' }}>
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 80}>
              <ShopTile p={p} onClick={() => go('product', { kind: 'shop', id: p.id })} onAdd={() => addToCart(p)} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
