"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Kicker, Button, Icon } from './primitives';
import { Badge } from './Catalog';
import { DECOR, SHOP, imgSrc } from './data';
import type { ProductCtx, DecorItem, ShopItem, Page } from './data';

interface ProductPageProps {
  go: (p: Page) => void;
  ctx: ProductCtx | null;
  addToCart: (item: ShopItem, qty: number) => void;
  addToWishlist: (item: DecorItem, qty: number) => void;
}

const qtyBtn: React.CSSProperties = {
  width: 44, height: 44, border: 'none', background: 'transparent',
  cursor: 'pointer', color: 'var(--ink-900)', display: 'flex', alignItems: 'center', justifyContent: 'center',
};

export default function ProductPage({ go, ctx, addToCart, addToWishlist }: ProductPageProps) {
  const isDecor = ctx?.kind === 'decor';
  const item = (isDecor ? DECOR : SHOP).find((x) => x.id === ctx?.id) ?? DECOR[0];
  const [thumb, setThumb] = useState(0);
  const [qty, setQty] = useState(1);

  const archRadius = '50% 50% var(--r-lg) var(--r-lg) / 32% 32% var(--r-lg) var(--r-lg)';

  return (
    <div className="tf-inner" style={{ paddingTop: '44px', paddingBottom: 'var(--sp-section)' }}>
      {/* Back button */}
      <button
        onClick={() => go(isDecor ? 'decor' : 'shop')}
        aria-label={`Zurück zur ${isDecor ? 'Dekoverleih-Kollektion' : 'Shop-Übersicht'}`}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          color: 'var(--ink-500)', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', marginBottom: '32px',
          minHeight: '44px', padding: '6px 0',
        }}
      >
        <Icon name="arrow-left" size={16} aria-hidden="true" />
        Zurück zu {isDecor ? 'Dekoverleih' : 'Shop'}
      </button>

      <div className="tf-grid-product">
        {/* ── Gallery ── */}
        <div>
          <div style={{
            position: 'relative', aspectRatio: isDecor ? '4/5' : '1/1',
            borderRadius: isDecor ? archRadius : 'var(--r-lg)',
            overflow: 'hidden', boxShadow: 'var(--shadow-md)',
          }}>
            <Image
              src={imgSrc(item.seed + thumb, 800)}
              alt={item.name}
              fill
              sizes="(max-width: 900px) 90vw, 50vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
            {[0, 1, 2].map((i) => (
              <button key={i} onClick={() => setThumb(i)} style={{
                flex: 1, aspectRatio: '1/1', borderRadius: 'var(--r-md)', overflow: 'hidden',
                border: `2px solid ${thumb === i ? 'var(--rust-500)' : 'transparent'}`,
                padding: 0, cursor: 'pointer', background: 'none', position: 'relative',
              }}>
                <Image
                  src={imgSrc(item.seed + i, 300)}
                  alt=""
                  fill
                  sizes="10vw"
                  style={{ objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Detail ── */}
        <div style={{ position: 'sticky', top: '90px' }}>
          <Kicker>{item.cat}</Kicker>
          <h1 style={{ fontSize: 'var(--fs-h1)', margin: '12px 0 0' }}>{item.name}</h1>
          {item.badge && <div style={{ marginTop: '14px' }}><Badge>{item.badge}</Badge></div>}

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '22px' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', color: 'var(--rust-500)' }}>
              {isDecor ? (item as DecorItem).price : `${(item as ShopItem).price} €`}
            </span>
            {isDecor && (
              <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--ink-400)', fontSize: 'var(--fs-small)' }}>
                {(item as DecorItem).unit}
              </span>
            )}
          </div>

          <p style={{ marginTop: '22px', maxWidth: '46ch', lineHeight: 'var(--lh-body)' }}>
            {isDecor
              ? 'Liebevoll kuratiert und gepflegt. Ideal für Hochzeiten, JGA und Events. Abholung oder Lieferung im Umkreis — auf Wunsch inklusive Auf- und Abbau durch Anni.'
              : 'Handgemacht mit viel Liebe zum Detail. Auf Wunsch personalisiert mit deinem Namen oder Datum. Versand innerhalb von 3–5 Werktagen.'}
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '26px 0', display: 'flex', flexDirection: 'column', gap: '13px' }}>
            {[
              isDecor ? 'Kaution & Reinigung inklusive' : 'Personalisierung möglich',
              isDecor ? 'Lieferung im Umkreis verfügbar' : 'Versand 3–5 Werktage',
              'Fragen? Schreib Anni direkt',
            ].map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-small)', color: 'var(--ink-700)' }}>
                <Icon name="check" size={16} style={{ color: 'var(--gold-500)', flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>

          {/* Qty + CTA */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-strong)', borderRadius: '999px', overflow: 'hidden' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Anzahl verringern" style={qtyBtn}><Icon name="minus" size={15} /></button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', width: '32px', textAlign: 'center' }} aria-live="polite" aria-label={`Anzahl: ${qty}`}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Anzahl erhöhen" style={qtyBtn}><Icon name="plus" size={15} /></button>
            </div>
            <Button
              magnetic
              onClick={() => isDecor ? addToWishlist(item as DecorItem, qty) : addToCart(item as ShopItem, qty)}
              icon={isDecor ? 'heart' : 'shopping-bag'}
            >
              {isDecor ? 'Auf den Wunschzettel' : 'In den Warenkorb'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
