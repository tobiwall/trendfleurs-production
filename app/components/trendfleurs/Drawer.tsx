"use client";

import Image from 'next/image';
import { Icon, Button } from './primitives';
import { imgSrc } from './data';
import type { CartItem, WishItem, DrawerTab, Page } from './data';

interface DrawerProps {
  open: boolean;
  tab: DrawerTab;
  setTab: (t: DrawerTab) => void;
  cart: CartItem[];
  wishlist: WishItem[];
  onClose: () => void;
  removeCart: (i: number) => void;
  removeWish: (i: number) => void;
  go: (p: Page) => void;
}

interface LineItemProps {
  x: CartItem | WishItem;
  onRemove: () => void;
  priceText: string;
  sub: string;
}

function LineItem({ x, onRemove, priceText, sub }: LineItemProps) {
  return (
    <div style={{ display: 'flex', gap: '14px', padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ width: 66, height: 66, flex: 'none', borderRadius: 'var(--r-sm)', overflow: 'hidden', position: 'relative' }}>
        <Image src={imgSrc(x.seed, 200)} alt={x.name} fill style={{ objectFit: 'cover' }} sizes="66px" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--ink-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {x.name}
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--ink-500)', marginTop: '3px' }}>{sub}</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', color: 'var(--ink-900)', fontWeight: 500 }}>{priceText}</div>
        <button
          onClick={onRemove}
          aria-label={`${x.name} entfernen`}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-400)',
            fontSize: '0.75rem', marginTop: '6px', fontFamily: 'var(--font-sans)', padding: '4px 0',
            minHeight: '32px',
          }}
        >
          Entfernen
        </button>
      </div>
    </div>
  );
}

function Empty({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '64px 20px', color: 'var(--ink-400)' }}>
      <div style={{ display: 'inline-flex', color: 'var(--taupe)' }}>
        <Icon name={icon} size={44} stroke={1.2} />
      </div>
      <p style={{ marginTop: '14px', fontSize: 'var(--fs-small)' }}>{text}</p>
    </div>
  );
}

const TABS: [DrawerTab, string][] = [['cart', 'Warenkorb'], ['wish', 'Wunschzettel']];

export default function Drawer({ open, tab, setTab, cart, wishlist, onClose, removeCart, removeWish, go }: DrawerProps) {
  const cartTotal = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const counts: Record<DrawerTab, number> = { cart: cart.length, wish: wishlist.length };

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(26,26,26,.35)', zIndex: 80,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity var(--dur-base)', backdropFilter: open ? 'blur(3px)' : 'none',
      }} />

      {/* Panel */}
      <aside style={{
        position: 'fixed', top: 0, right: 0, height: '100%', width: 'min(440px, 92vw)', zIndex: 81,
        background: 'var(--cream)', boxShadow: 'var(--shadow-lg)',
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform var(--dur-base) var(--ease-organic)',
      }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
          {TABS.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, padding: '20px 12px', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: '0.82rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', fontWeight: 500,
              color: tab === id ? 'var(--ink-900)' : 'var(--ink-400)',
              borderBottom: `2px solid ${tab === id ? 'var(--rust-500)' : 'transparent'}`,
            }}>
              {label} {counts[id] > 0 && <span style={{ color: 'var(--rust-500)' }}>({counts[id]})</span>}
            </button>
          ))}
          <button onClick={onClose} aria-label="Warenkorb schließen" style={{ width: 54, height: 54, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 22px' }}>
          {tab === 'cart' ? (
            cart.length === 0
              ? <Empty icon="shopping-bag" text="Dein Warenkorb ist leer." />
              : cart.map((x, i) => (
                <LineItem key={i} x={x} onRemove={() => removeCart(i)}
                  priceText={`${x.price} €`} sub={`${x.qty} × ${x.price} €`} />
              ))
          ) : (
            wishlist.length === 0
              ? <Empty icon="heart" text="Noch nichts auf dem Wunschzettel." />
              : wishlist.map((x, i) => (
                <LineItem key={i} x={x} onRemove={() => removeWish(i)}
                  priceText={x.price} sub={`Miete · ${x.unit ?? 'pro Event'}`} />
              ))
          )}
        </div>

        {/* Footer CTA */}
        <div style={{ borderTop: '1px solid var(--border)', padding: '20px 22px 26px' }}>
          {tab === 'cart' ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
                <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--ink-500)', fontSize: 'var(--fs-small)' }}>Zwischensumme</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--ink-900)' }}>
                  {cartTotal.toFixed(0)} €
                </span>
              </div>
              <Button variant="dark" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }} icon="arrow-right">
                Zur Kasse
              </Button>
            </>
          ) : (
            <>
              <p style={{ fontSize: 'var(--fs-small)', color: 'var(--ink-500)', margin: '0 0 16px', lineHeight: 1.55 }}>
                Unverbindlich — sende deinen Wunschzettel als Mietanfrage. Anni meldet sich mit Verfügbarkeit & Angebot.
              </p>
              <Button onClick={() => { onClose(); go('contact'); }} style={{ width: '100%', justifyContent: 'center' }} icon="calendar-heart">
                Als Mietanfrage senden
              </Button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
