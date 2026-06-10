"use client";

import { useState, useEffect } from 'react';
import { Icon } from './primitives';
import type { Page, DrawerTab } from './data';

interface WordmarkProps {
  small?: boolean;
  onClick?: () => void;
}

export function Wordmark({ small = false, onClick }: WordmarkProps) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1,
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontWeight: 700,
        fontSize: small ? '17px' : '20px', letterSpacing: '0.01em', color: 'var(--ink-900)',
      }}>
        a<span style={{ color: 'var(--rust-500)' }}>_</span>trendfleurs
      </span>
      <span style={{
        fontFamily: 'var(--font-script)',
        fontSize: small ? '17px' : '20px',
        color: 'var(--rust-500)', marginTop: '-3px', marginLeft: '2px',
      }}>
        by Anni
      </span>
    </button>
  );
}

const NAV_LINKS: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Leistungen' },
  { id: 'decor', label: 'Dekoverleih' },
  { id: 'shop', label: 'Shop' },
];

interface NavLinkProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function NavLink({ children, active, onClick }: NavLinkProps) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
        fontFamily: 'var(--font-sans)', fontSize: '0.94rem', letterSpacing: '0.04em',
        color: active ? 'var(--rust-500)' : 'var(--ink-900)', position: 'relative',
      }}
    >
      {children}
      <span style={{
        position: 'absolute', left: 0, bottom: -2, height: '1px',
        width: active || hover ? '100%' : '0%', background: 'var(--gold-400)',
        transition: 'width var(--dur-base) var(--ease-out)',
      }} />
    </button>
  );
}

function Count({ n }: { n: number }) {
  return (
    <span style={{
      position: 'absolute', top: -7, right: -9, background: 'var(--rust-500)',
      color: 'var(--on-rust)', fontFamily: 'var(--font-mono)', fontSize: '10px',
      width: 17, height: 17, borderRadius: '999px', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {n}
    </span>
  );
}

interface NavProps {
  page: Page;
  go: (p: Page) => void;
  cartCount?: number;
  wishCount?: number;
  openDrawer: (tab: DrawerTab) => void;
}

export default function Nav({ page, go, cartCount = 0, wishCount = 0, openDrawer }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(253,251,247,0.82)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base)',
    }}>
      <div style={{
        maxWidth: 'var(--maxw)', margin: '0 auto', padding: '18px var(--gutter)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px',
      }}>
        <Wordmark onClick={() => go('home')} />

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: '34px', alignItems: 'center' }}>
          {NAV_LINKS.map((l) => (
            <NavLink key={l.id} active={page === l.id} onClick={() => go(l.id)}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button title="Wunschzettel" onClick={() => openDrawer('wish')} style={{
            position: 'relative', background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--ink-900)', display: 'inline-flex',
          }}>
            <Icon name="heart" size={21} />
            {wishCount > 0 && <Count n={wishCount} />}
          </button>
          <button title="Warenkorb" onClick={() => openDrawer('cart')} style={{
            position: 'relative', background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--ink-900)', display: 'inline-flex',
          }}>
            <Icon name="shopping-bag" size={21} />
            {cartCount > 0 && <Count n={cartCount} />}
          </button>
          <button onClick={() => go('contact')} style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            background: 'var(--charcoal)', color: 'var(--on-charcoal)',
            border: 'none', borderRadius: '999px', padding: '11px 22px', cursor: 'pointer',
          }}>
            Anfragen
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-900)',
            display: 'none',
          }}>
            <Icon name={menuOpen ? 'x' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div style={{
        display: 'none', flexDirection: 'column', gap: '4px', overflow: 'hidden',
        maxHeight: menuOpen ? '320px' : '0px',
        transition: 'max-height var(--dur-base) var(--ease-out)',
        background: 'rgba(253,251,247,0.96)', backdropFilter: 'blur(12px)',
        borderBottom: menuOpen ? '1px solid var(--border)' : 'none',
      }}>
        <div style={{ padding: menuOpen ? '8px var(--gutter) 18px' : '0 var(--gutter)', display: 'flex', flexDirection: 'column' }}>
          {[...NAV_LINKS, { id: 'contact' as Page, label: 'Anfrage' }].map((l) => (
            <button key={l.id} onClick={() => { go(l.id); setMenuOpen(false); }} style={{
              background: 'none', border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer',
              textAlign: 'left', padding: '15px 2px', fontFamily: 'var(--font-serif)', fontSize: '1.3rem',
              color: page === l.id ? 'var(--rust-500)' : 'var(--ink-900)',
            }}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
