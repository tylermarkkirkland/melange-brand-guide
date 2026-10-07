import React from 'react';
import './Lockup.css';

/**
 * The logo as the website sets it: the pillar, then MELANGE in brushed metal,
 * then MERCANTILE small and widely tracked (never below Cinzel's 24px floor).
 *
 * size     MELANGE's font size in px; the pillar and spacing scale from it
 * variant  'silver' (the main logo) or 'flat' (one colour, takes `color`)
 * parts    'lockup' | 'mark'
 */
export default function Lockup({ size = 72, variant = 'silver', color = 'var(--chrome)', parts = 'lockup', className = '' }) {
  const markHeight = size * 4.8;
  const mark =
    variant === 'silver' ? (
      <img className="lockup__pillar" src="/logo/pillar-silver.png" alt="" style={{ height: markHeight }} draggable="false" />
    ) : (
      <span className="lockup__pillar lockup__pillar--flat" style={{ height: markHeight, width: markHeight * (1432 / 2180), background: color }} />
    );

  if (parts === 'mark') {
    return (
      <span className={`lockup lockup--mark ${className}`} role="img" aria-label="Melange Mercantile mark">
        {mark}
      </span>
    );
  }

  return (
    <span className={`lockup ${className}`} role="img" aria-label="Melange Mercantile" style={{ '--lockup-size': `${size}px` }}>
      {mark}
      <span className={`lockup__top${variant === 'silver' ? ' metal-text' : ''}`} style={variant === 'flat' ? { color } : undefined}>
        MELANGE
      </span>
      <span className="lockup__bottom" style={variant === 'flat' ? { color } : undefined}>
        MERCANTILE
      </span>
    </span>
  );
}
