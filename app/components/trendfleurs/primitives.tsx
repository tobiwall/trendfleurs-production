"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as LucideIcons from 'lucide-react';

/* ---------- Reveal-on-scroll hook ---------- */
interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useReveal(options: RevealOptions = {}): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setShown(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.unobserve(el); } });
      },
      { threshold: options.threshold ?? 0.18, rootMargin: options.rootMargin ?? '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, shown];
}

/* ---------- Icon (Lucide) ---------- */
interface IconProps {
  name: string;
  size?: number;
  stroke?: number;
  style?: React.CSSProperties;
}

export function Icon({ name, size = 20, stroke = 1.5, style }: IconProps) {
  const pascalName = name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  type IconComp = React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  const Comp = (LucideIcons as unknown as Record<string, IconComp>)[pascalName];
  if (!Comp) return null;
  return <Comp size={size} strokeWidth={stroke} style={style} />;
}

/* ---------- Kicker (mono eyebrow label) ---------- */
interface KickerProps {
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}

export function Kicker({ children, color, style }: KickerProps) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-kicker)',
      letterSpacing: 'var(--track-kicker)',
      textTransform: 'uppercase',
      color: color ?? 'var(--rust-500)',
      fontWeight: 400,
      display: 'inline-block',
      ...style,
    }}>
      {children}
    </span>
  );
}

/* ---------- Button ---------- */
type ButtonVariant = 'primary' | 'dark' | 'ghost' | 'gold';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  magnetic?: boolean;
  style?: React.CSSProperties;
  icon?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ children, variant = 'primary', onClick, magnetic = false, style, icon, type = 'button' }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const [mag, setMag] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setMag({
      x: (e.clientX - (r.left + r.width / 2)) * 0.25,
      y: (e.clientY - (r.top + r.height / 2)) * 0.3,
    });
  }, [magnetic]);

  const base: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    padding: '14px 30px',
    borderRadius: 'var(--r-pill)',
    border: '1px solid transparent',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'transform var(--dur-fast) var(--ease-organic), background var(--dur-fast), box-shadow var(--dur-fast), color var(--dur-fast)',
    transform: `translate(${mag.x}px, ${mag.y}px) translateY(${press ? 1 : hover ? -2 : 0}px) scale(${press ? 0.98 : 1})`,
  };

  const variants: Record<ButtonVariant, React.CSSProperties> = {
    primary: { background: hover ? 'var(--rust-600)' : 'var(--rust-500)', color: 'var(--on-rust)', boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)' },
    dark: { background: hover ? '#000' : 'var(--charcoal)', color: 'var(--on-charcoal)', boxShadow: hover ? 'var(--shadow-md)' : 'none' },
    ghost: { background: hover ? 'var(--charcoal)' : 'transparent', color: hover ? 'var(--on-charcoal)' : 'var(--ink-900)', borderColor: 'var(--ink-900)' },
    gold: { background: 'transparent', color: hover ? 'var(--gold-600)' : 'var(--gold-600)', borderColor: 'var(--gold-400)', boxShadow: hover ? 'var(--shadow-gold)' : 'none' },
  };

  return (
    <button
      ref={ref}
      type={type}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setMag({ x: 0, y: 0 }); }}
      onMouseMove={onMove}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
      {icon && <Icon name={icon} size={17} />}
    </button>
  );
}

/* ---------- Image placeholder ---------- */
const PH_GRADS = [
  'linear-gradient(135deg, #D7C4B7, #A36A5E)',
  'linear-gradient(160deg, #EBD6CF, #C5917F)',
  'linear-gradient(145deg, #C5917F, #714540)',
  'linear-gradient(135deg, #F1E9DD, #D7C4B7)',
  'linear-gradient(150deg, #D9B4A9, #8C5750)',
  'linear-gradient(135deg, #E7DACB, #BCA796)',
];

interface ImagePHProps {
  label?: string;
  seed?: number;
  radius?: string;
  arch?: boolean;
  ratio?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function ImagePH({ label, seed = 0, radius = 'var(--r-lg)', arch = false, ratio, style, children }: ImagePHProps) {
  const grad = PH_GRADS[seed % PH_GRADS.length];
  const r = arch ? '50% 50% var(--r-lg) var(--r-lg) / 32% 32% var(--r-lg) var(--r-lg)' : radius;
  return (
    <div style={{
      position: 'relative',
      background: grad,
      borderRadius: r,
      overflow: 'hidden',
      aspectRatio: ratio,
      width: '100%',
      height: ratio ? undefined : '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(40,28,22,0.5)',
        border: '1px solid rgba(40,28,22,0.22)',
        borderRadius: '999px',
        padding: '5px 12px',
      }}>
        {label ?? 'Foto'}
      </span>
      {children}
    </div>
  );
}

/* ---------- Reveal wrapper ---------- */
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
  className?: string;
  threshold?: number;
}

export function Reveal({ children, delay = 0, y = 28, style, className, threshold }: RevealProps) {
  const [ref, shown] = useReveal({ threshold });
  return (
    <div ref={ref} className={className} style={{
      transform: shown ? 'none' : `translateY(${y}px)`,
      opacity: shown ? 1 : 0,
      transition: `transform var(--dur-reveal) var(--ease-drift) ${delay}ms, opacity var(--dur-slow) var(--ease-out) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}
