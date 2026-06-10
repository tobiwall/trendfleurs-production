"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Kicker, Button, ImagePH, Reveal, Icon } from './primitives';
import { DecorTile } from './Catalog';
import { RegionsSection } from './Sections';
import Scrolly from './Scrolly';
import { SERVICES, DECOR, ANNI_SRC, imgSrc } from './data';
import type { DecorItem, Page } from './data';

/* ─── Hero ─── */
interface HeroProps { go: (p: Page) => void; }

function Hero({ go }: HeroProps) {
  const [off, setOff] = useState(0);
  useEffect(() => {
    const onScroll = () => setOff(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(56px, 8vw, 110px) 0 clamp(56px, 8vw, 96px)',
    }}>
      {/* Background hoop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hoop.svg" alt="" aria-hidden="true" style={{
        position: 'absolute', right: '-80px', top: '40px', width: '460px',
        opacity: 0.45, pointerEvents: 'none',
        transform: `translateY(${off * -0.1}px) rotate(${off * 0.008}deg)`,
      }} />

      <div className="tf-inner">
        <div className="tf-hero-grid">
          {/* ── Text ── */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <Reveal y={0}>
              <Kicker>Eventagentur · Floristik · Dekoverleih</Kicker>
            </Reveal>
            <Reveal delay={80}>
              <h1 style={{
                fontSize: 'var(--fs-display)', marginTop: '20px',
                lineHeight: 'var(--lh-display)', letterSpacing: 'var(--track-tight)',
              }}>
                Dein schönster<br />Tag — gestaltet<br />mit{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--rust-500)' }}>Liebe</em>.
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p style={{ maxWidth: '440px', marginTop: '24px', fontWeight: 300, fontSize: 'var(--fs-lead)', lineHeight: 'var(--lh-body)' }}>
                Als gelernte Floristin gestalte ich nicht nur Blumen, sondern das ganze Gefühl deines Tages — Hochzeiten, JGA und Events aller Art.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div style={{ display: 'flex', gap: '14px', marginTop: '36px', flexWrap: 'wrap' }}>
                <Button magnetic onClick={() => go('contact')} icon="arrow-up-right">
                  Unverbindlich anfragen
                </Button>
                <Button variant="ghost" onClick={() => go('decor')}>
                  Zum Dekoverleih
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ── Image stack ── */}
          <Reveal delay={100} y={40} style={{ position: 'relative', height: '540px' }} className="tf-hero-img">
            <div style={{ position: 'absolute', inset: 0 }}>
              {/* Main arch image */}
              <div style={{
                position: 'absolute', top: 0, left: '6%', width: '80%', height: '80%',
                borderRadius: '50% 50% var(--r-lg) var(--r-lg) / 32% 32% var(--r-lg) var(--r-lg)',
                overflow: 'hidden', boxShadow: 'var(--shadow-lg)',
                transform: `translateY(${off * 0.04}px)`,
              }}>
                <Image
                  src={imgSrc(2, 900)}
                  alt="Hochzeitsblumen und florale Dekoration"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  sizes="40vw"
                  priority
                />
              </div>
              {/* Anni portrait */}
              <div style={{
                position: 'absolute', bottom: 0, right: 0, width: '46%', height: '42%',
                borderRadius: 'var(--r-lg)', overflow: 'hidden',
                boxShadow: 'var(--shadow-md)', border: '5px solid var(--cream)',
                transform: `translateY(${off * -0.05}px)`,
              }}>
                <Image
                  src={ANNI_SRC}
                  alt="Anni — Inhaberin & Floristin"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  sizes="20vw"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div style={{
                position: 'absolute', bottom: '20%', left: '-2%',
                background: 'var(--cream)', borderRadius: 'var(--r-md)',
                boxShadow: 'var(--shadow-md)', padding: '14px 18px',
                display: 'flex', alignItems: 'center', gap: '10px',
                transform: `translateY(${off * -0.09}px)`,
              }}>
                <Icon name="phone-call" size={18} style={{ color: 'var(--rust-500)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                  Audio Gästetelefon
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── ServicesSection ─── */
interface ServiceCardProps {
  s: typeof SERVICES[number];
  onClick: () => void;
}

function ServiceCard({ s, onClick }: ServiceCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--paper-0)', borderRadius: 'var(--r-lg)',
        padding: '30px 28px', border: '1px solid var(--border)', cursor: 'pointer',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        transform: hover ? 'translateY(-4px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-organic), box-shadow var(--dur-base)',
        display: 'flex', gap: '20px', alignItems: 'flex-start',
      }}
    >
      <div style={{
        flex: 'none', width: '52px', height: '52px', borderRadius: '999px',
        border: '1px solid var(--gold-300)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: 'var(--rust-500)', background: 'var(--rust-50)',
      }}>
        <Icon name={s.icon} size={22} />
      </div>
      <div>
        <Kicker>{s.kicker}</Kicker>
        <h3 style={{ margin: '8px 0 10px' }}>{s.title}</h3>
        <p style={{ fontSize: 'var(--fs-small)', margin: 0 }}>{s.body}</p>
      </div>
    </div>
  );
}

function ServicesSection({ go }: { go: (p: Page) => void }) {
  return (
    <section style={{ background: 'var(--paper-100)', padding: 'var(--sp-section) 0', marginTop: 'var(--sp-7)' }}>
      <div className="tf-inner">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 52px' }}>
          <Reveal y={0}><Kicker>Leistungen</Kicker></Reveal>
          <Reveal delay={80}>
            <h2 style={{ marginTop: '14px' }}>Full-Service — von der Idee bis zum letzten Detail</h2>
          </Reveal>
        </div>
        <div className="tf-grid-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 90}>
              <ServiceCard s={s} onClick={() => go('services')} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FeaturedDecor ─── */
interface FeaturedDecorProps {
  go: (p: Page, ctx?: { kind: 'decor' | 'shop'; id: string }) => void;
  addToWishlist: (item: DecorItem) => void;
}

function FeaturedDecor({ go, addToWishlist }: FeaturedDecorProps) {
  return (
    <section style={{ padding: 'var(--sp-section) 0' }}>
      <div className="tf-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <Reveal y={0}><Kicker>Dekoverleih</Kicker></Reveal>
            <Reveal delay={70}><h2 style={{ marginTop: '12px' }}>Schönes zum Mieten</h2></Reveal>
          </div>
          <Reveal delay={120}>
            <Button variant="gold" onClick={() => go('decor')} icon="arrow-up-right">Alles ansehen</Button>
          </Reveal>
        </div>
        <div className="tf-grid-3">
          {DECOR.slice(0, 3).map((d, i) => (
            <Reveal key={d.id} delay={i * 90}>
              <DecorTile
                d={d}
                onClick={() => go('product', { kind: 'decor', id: d.id })}
                onWish={() => addToWishlist(d)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ScriptBanner ─── */
function ScriptBanner({ go }: { go: (p: Page) => void }) {
  return (
    <section style={{ background: 'var(--charcoal)', padding: 'clamp(72px, 10vw, 128px) 0', position: 'relative', overflow: 'hidden' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hoop.svg" alt="" aria-hidden="true" style={{
        position: 'absolute', left: '-80px', bottom: '-80px', width: '340px', opacity: 0.2, pointerEvents: 'none',
      }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hoop.svg" alt="" aria-hidden="true" style={{
        position: 'absolute', right: '-60px', top: '-60px', width: '280px', opacity: 0.12, pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 var(--gutter)', textAlign: 'center', position: 'relative' }}>
        <Reveal y={0}>
          <span style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2.2rem,4.5vw,3.4rem)', color: 'var(--gold-400)', lineHeight: 1 }}>
            mit Liebe gemacht
          </span>
        </Reveal>
        <Reveal delay={90}>
          <h2 style={{ color: 'var(--on-charcoal)', marginTop: '14px' }}>Lass uns deinen Tag planen.</h2>
        </Reveal>
        <Reveal delay={180}>
          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
            <Button magnetic onClick={() => go('contact')} icon="arrow-up-right">Jetzt anfragen</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Home (full page) ─── */
interface HomeProps {
  go: (p: Page, ctx?: { kind: 'decor' | 'shop'; id: string }) => void;
  addToWishlist: (item: DecorItem) => void;
}

export default function Home({ go, addToWishlist }: HomeProps) {
  return (
    <div>
      <Hero go={go} />
      <Scrolly />
      <ServicesSection go={go} />
      <FeaturedDecor go={go} addToWishlist={addToWishlist} />
      <RegionsSection go={go} />
      <ScriptBanner go={go} />
    </div>
  );
}
