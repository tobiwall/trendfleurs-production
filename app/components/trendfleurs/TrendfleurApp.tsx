"use client";

import { useState, useRef, useCallback } from 'react';
import Nav from './Nav';
import Home from './HomePage';
import { DecorPage, ShopPage } from './Catalog';
import { ServicesPage, ContactPage, Footer } from './Sections';
import ProductPage from './ProductPage';
import Drawer from './Drawer';
import { Icon } from './primitives';
import type { Page, DrawerTab, ProductCtx, CartItem, WishItem, DecorItem, ShopItem } from './data';

export default function TrendfleurApp() {
  const [page, setPage] = useState<Page>('home');
  const [ctx, setCtx] = useState<ProductCtx | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishItem[]>([]);
  const [drawer, setDrawer] = useState<{ open: boolean; tab: DrawerTab }>({ open: false, tab: 'cart' });
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((p: Page, c: { kind: 'decor' | 'shop'; id: string } | null = null) => {
    setPage(p);
    setCtx(c);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const addToCart = useCallback((item: ShopItem, qty = 1) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.id === item.id);
      if (i >= 0) {
        const n = [...c];
        n[i] = { ...n[i], qty: n[i].qty + qty };
        return n;
      }
      return [...c, { id: item.id, name: item.name, price: item.price, seed: item.seed, qty }];
    });
    flash('In den Warenkorb gelegt');
  }, [flash]);

  const addToWishlist = useCallback((item: DecorItem, qty = 1) => {
    setWishlist((w) => {
      if (w.some((x) => x.id === item.id)) return w;
      return [...w, { id: item.id, name: item.name, price: item.price, unit: item.unit, seed: item.seed, qty }];
    });
    flash('Auf den Wunschzettel gesetzt');
  }, [flash]);

  const removeCart = useCallback((i: number) => setCart((c) => c.filter((_, idx) => idx !== i)), []);
  const removeWish = useCallback((i: number) => setWishlist((w) => w.filter((_, idx) => idx !== i)), []);
  const openDrawer = useCallback((tab: DrawerTab) => setDrawer({ open: true, tab }), []);

  const cartCount = cart.reduce((s, x) => s + x.qty, 0);

  let view: React.ReactNode;
  if (page === 'home') view = <Home go={go} addToWishlist={addToWishlist} />;
  else if (page === 'services') view = <ServicesPage go={go} />;
  else if (page === 'decor') view = <DecorPage go={go} addToWishlist={addToWishlist} />;
  else if (page === 'shop') view = <ShopPage go={go} addToCart={addToCart} />;
  else if (page === 'product') view = <ProductPage go={go} ctx={ctx} addToCart={addToCart} addToWishlist={addToWishlist} />;
  else if (page === 'contact') view = <ContactPage />;
  else view = <Home go={go} addToWishlist={addToWishlist} />;

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Nav
        page={page}
        go={go}
        cartCount={cartCount}
        wishCount={wishlist.length}
        openDrawer={openDrawer}
      />

      <main key={page}>{view}</main>

      <Footer go={go} />

      <Drawer
        open={drawer.open}
        tab={drawer.tab}
        setTab={(t) => setDrawer((d) => ({ ...d, tab: t }))}
        cart={cart}
        wishlist={wishlist}
        onClose={() => setDrawer((d) => ({ ...d, open: false }))}
        removeCart={removeCart}
        removeWish={removeWish}
        go={go}
      />

      {/* Toast notification */}
      <div style={{
        position: 'fixed', bottom: '28px', left: '50%',
        transform: `translateX(-50%) translateY(${toast ? '0' : '20px'})`,
        background: 'var(--charcoal)', color: 'var(--on-charcoal)',
        padding: '14px 22px', borderRadius: '999px',
        fontFamily: 'var(--font-sans)', fontSize: '0.88rem',
        boxShadow: 'var(--shadow-lg)', zIndex: 90,
        display: 'flex', alignItems: 'center', gap: '10px',
        opacity: toast ? 1 : 0, pointerEvents: 'none',
        transition: 'all var(--dur-base) var(--ease-organic)',
      }}>
        <span style={{ color: 'var(--gold-400)', display: 'inline-flex' }}>
          <Icon name="check" size={16} />
        </span>
        {toast}
      </div>
    </div>
  );
}
