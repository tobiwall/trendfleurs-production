"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Kicker, ImagePH, Reveal, Icon } from './primitives';
import { TABLES, ANNI_SRC, ANNI_SRC_2 } from './data';

function isSmallOrReduced(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(max-width: 860px)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/* ─── Desktop GSAP version ─── */
function ScrollyDesktop() {
  const wrapRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const SEG = 10;
    const N = TABLES.length;

    const ctx = gsap.context(() => {
      const q = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
      const bgs   = q('.scrolly-bg');
      const texts = q('.scrolly-text');
      const anni  = root.querySelector<HTMLElement>('.scrolly-anni-inner');
      const hoop  = root.querySelector<HTMLElement>('.scrolly-hoop');
      if (!anni || !hoop) return;

      gsap.set(bgs, { opacity: 0 });
      gsap.set(bgs[0], { opacity: 1 });
      gsap.set(texts, { opacity: 0, y: 26 });
      gsap.set(texts[0], { opacity: 1, y: 0 });
      gsap.set(q('.scrolly-deko'), { xPercent: -50, yPercent: -50 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top', end: 'bottom bottom', scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(anni, { scale: 1.0, y: 14 }, { scale: 1.12, y: -10, ease: 'none', duration: SEG * N }, 0);
      tl.fromTo(hoop, { rotate: -8, scale: 0.95 }, { rotate: 26, scale: 1.08, ease: 'none', duration: SEG * N }, 0);

      TABLES.forEach((t, ti) => {
        const S = ti * SEG;
        if (ti > 0) {
          tl.to(bgs[ti], { opacity: 1, duration: 2, ease: 'power1.inOut' }, S - 1);
          tl.to(bgs[ti - 1], { opacity: 0, duration: 2, ease: 'power1.inOut' }, S - 1);
        }
        if (ti > 0) tl.to(texts[ti], { opacity: 1, y: 0, duration: 1.4 }, S + 1);
        if (ti < N - 1) tl.to(texts[ti], { opacity: 0, y: -22, duration: 1.2, ease: 'power2.in' }, S + 8);

        const deko = q(`.scrolly-deko[data-t="${ti}"]`);
        deko.forEach((el, ii) => {
          const it = t.items[ii];
          const settleRot = (ii % 2 ? 1 : -1) * (3 + ii);
          tl.fromTo(el,
            { x: it.dx, y: it.dy, rotate: it.rot, scale: 0.42, opacity: 0, filter: 'blur(6px)' },
            { x: 0, y: 0, rotate: settleRot, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 3.4, ease: 'power3.out' },
            S + 1.2 + ii * 0.45
          );
        });

        if (ti < N - 1) {
          deko.forEach((el, ii) => {
            const it = t.items[ii];
            tl.to(el, {
              x: it.dx * 0.5, y: it.dy * 0.5 - 60, rotate: it.rot * 0.5,
              scale: 0.55, opacity: 0, filter: 'blur(5px)', duration: 1.8, ease: 'power2.in',
            }, S + 8 + ii * 0.18);
          });
        }
      });

      ScrollTrigger.refresh();
    }, rootRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); ctx.revert(); };
  }, []);

  return (
    <section ref={wrapRef} style={{ height: '380vh', position: 'relative', background: 'var(--cream)' }}>
      <div ref={rootRef} style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Backgrounds */}
        {TABLES.map((t) => (
          <div key={t.id} className="scrolly-bg" aria-hidden="true"
            style={{ position: 'absolute', inset: 0, background: t.bg }} />
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hoop.svg" alt="" aria-hidden="true" className="scrolly-hoop" style={{
          position: 'absolute', left: '50%', top: '50%', width: '72vh', maxWidth: '780px',
          marginLeft: '-36vh', marginTop: '-36vh', opacity: 0.14, mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'absolute', inset: 0, display: 'grid',
          gridTemplateColumns: '1fr 1fr', alignItems: 'center',
          maxWidth: 'var(--maxw)', margin: '0 auto', padding: '0 var(--gutter)',
        }}>
          {/* Text column */}
          <div style={{ position: 'relative', zIndex: 5, minHeight: '260px' }}>
            {TABLES.map((t, i) => {
              const dark = i === 2;
              return (
                <div key={t.id} className="scrolly-text" style={{
                  position: i === 0 ? 'relative' : 'absolute', top: 0, left: 0, maxWidth: '440px',
                  color: dark ? 'var(--on-charcoal)' : 'var(--ink-900)',
                }}>
                  <Kicker color={dark ? 'var(--gold-400)' : 'var(--rust-600)'}>
                    {t.kicker} · {t.theme}
                  </Kicker>
                  <h2 style={{ margin: '16px 0 14px', color: dark ? 'var(--on-charcoal)' : 'var(--ink-900)', fontSize: 'var(--fs-h1)' }}>
                    {t.title}
                  </h2>
                  <p style={{ fontWeight: 300, fontSize: 'var(--fs-lead)', color: dark ? 'rgba(244,239,231,.8)' : 'var(--ink-700)' }}>
                    {t.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stage column */}
          <div style={{ position: 'relative', height: '80vh', zIndex: 3 }}>
            {/* Anni portrait */}
            <div className="scrolly-anni" style={{
              position: 'absolute', left: '50%', bottom: '4%',
              transform: 'translateX(-50%)', width: '52%', height: '88%', zIndex: 3,
            }}>
              <div className="scrolly-anni-inner" style={{ width: '100%', height: '100%', transformOrigin: '50% 90%' }}>
                <div style={{
                  width: '100%', height: '100%',
                  borderRadius: '50% 50% 12px 12px / 40% 40% 12px 12px',
                  overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '5px solid var(--cream)',
                  position: 'relative',
                }}>
                  <Image
                    src={ANNI_SRC}
                    alt="Anni, Floristin und Inhaberin von a_trendfleurs — Hochzeitsplanung und Floristik im Westerwald"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                    sizes="25vw"
                  />
                </div>
              </div>
            </div>

            {/* Deko items (ImagePH gradients are fine for these small floaters) */}
            {TABLES.map((t, ti) =>
              t.items.map((it, ii) => (
                <div key={t.id + ii} className="scrolly-deko" data-t={ti} style={{
                  position: 'absolute', left: `${50 + it.x}%`, top: `${50 + it.y}%`,
                  width: `${it.w}%`, aspectRatio: '1/1',
                  zIndex: it.y < 0 ? 2 : 4, opacity: 0, willChange: 'transform, opacity, filter',
                }}>
                  <ImagePH label={it.label} seed={it.seed} radius="50%"
                    style={{ height: '100%', boxShadow: 'var(--shadow-md)', border: '3px solid var(--cream)' }} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', left: 'var(--gutter)', bottom: '36px',
          display: 'flex', alignItems: 'center', gap: '12px', zIndex: 6, color: 'var(--ink-500)',
        }}>
          <Icon name="mouse" size={18} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Scroll · Anni&apos;s Journey
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── Mobile / reduced-motion version ─── */
function ScrollyMobile() {
  return (
    <section style={{ padding: 'var(--sp-7) 0' }}>
      <div className="tf-inner">
        <Reveal y={0}><Kicker>Anni&apos;s Journey</Kicker></Reveal>
        <Reveal delay={60}><h2 style={{ margin: '12px 0 28px', maxWidth: '14ch' }}>Drei Tische, ein Gefühl</h2></Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {TABLES.map((t, i) => {
            const dark = i === 2;
            return (
              <Reveal key={t.id} delay={i * 80}>
                <div style={{
                  borderRadius: 'var(--r-lg)', overflow: 'hidden', background: t.bg,
                  padding: '28px 24px', color: dark ? 'var(--on-charcoal)' : 'var(--ink-900)',
                  display: 'grid', gap: '14px', boxShadow: 'var(--shadow-sm)',
                }}>
                  <Kicker color={dark ? 'var(--gold-400)' : 'var(--rust-700)'}>
                    {t.kicker} · {t.theme}
                  </Kicker>
                  <h3 style={{ color: dark ? 'var(--on-charcoal)' : 'var(--ink-900)' }}>{t.title}</h3>
                  <p style={{ margin: 0, fontSize: 'var(--fs-small)', color: dark ? 'rgba(244,239,231,.8)' : 'var(--ink-700)' }}>
                    {t.body}
                  </p>
                  <div style={{ width: '110px', marginTop: '6px', position: 'relative', aspectRatio: '4/5', borderRadius: 'var(--r-md)', overflow: 'hidden', border: '4px solid var(--cream)' }}>
                    <Image src={ANNI_SRC_2} alt="Anni" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="110px" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Adaptive Scrolly ─── */
export default function Scrolly() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const check = () => setSmall(isSmallOrReduced());
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return small ? <ScrollyMobile /> : <ScrollyDesktop />;
}
