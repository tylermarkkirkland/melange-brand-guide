import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COLOR, GROUND, METAL, SPICE } from '../../data/content.js';
import ChapterOpener from '../ChapterOpener/ChapterOpener.jsx';
import RollingNumber from '../RollingNumber/RollingNumber.jsx';
import { Reveal, EASE } from '../Reveal/Reveal.jsx';
import './ColorChapter.css';

const GROUPS = [
  { id: 'ground', label: COLOR.groundLabel, note: COLOR.groundNote, colors: GROUND },
  { id: 'metal', label: COLOR.metalLabel, note: COLOR.metalNote, colors: METAL },
  { id: 'spice', label: COLOR.spiceLabel, note: COLOR.spiceNote, colors: SPICE },
];

/* All 13 colors on one page: one shared grid, so every swatch is the same height and every
   note lines up, whatever wraps. Ground, metal and spice sit in their own column runs with a
   wider gap between them (a ground always separates spice and metal: rule 01). */
function Palette() {
  let col = 1;
  const placed = GROUPS.map((g) => {
    const start = col;
    col += g.colors.length + 1; // one spacer column after each group
    return { ...g, start };
  });
  let n = 0; // running index, so the whole row rises left to right
  return (
    <section className="chapter-body screen palette" aria-label={COLOR.paletteLabel}>
      <header className="palette__head">
        <Reveal as="p" className="data-tag palette__label">{COLOR.paletteLabel}</Reveal>
        <Reveal as="p" className="operational-title-lg palette__intro" delay={0.1}>{COLOR.paletteIntro}</Reveal>
      </header>
      <div className="palette__grid">
        {placed.map((g) => (
          <Reveal as="p" key={g.id} className="palette__group-label" delay={0.1} style={{ gridColumn: `${g.start} / span ${g.colors.length}` }}>
            <span className="data-tag">{g.label}</span>
            <span className="operational-body-sm">{g.note}</span>
          </Reveal>
        ))}
        {placed.flatMap((g) => g.colors.map((c, k) => {
          const i = n++;
          return (
            <div key={c.name} className="swatch" style={{ gridColumn: g.start + k }}>
              <motion.span
                className={`swatch__chip${g.id === 'ground' ? ' swatch__chip--ground' : ''}`}
                style={{ background: c.hex }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.2 + i * 0.06 }}
              />
              <Reveal className="swatch__text" delay={0.6 + i * 0.06} y={8}>
                <p className="operational-body swatch__name">{c.name}</p>
                <p className="data-row swatch__hex">{c.hex}</p>
                {c.ratio && <p className="data-tag swatch__ratio">{c.ratio}</p>}
                <p className="operational-body-sm swatch__use">{c.use}</p>
              </Reveal>
            </div>
          );
        }))}
      </div>
    </section>
  );
}

/* Coverage: 85 / 13 / 2, a ground always between metal and spice */
function Coverage() {
  const fills = ['var(--slate)', 'var(--silver)', 'var(--spice)'];
  const [inView, setInView] = useState(false);
  return (
    <motion.section
      className="chapter-body screen coverage"
      aria-label={COLOR.coverageLabel}
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      viewport={{ amount: 0.5 }}
    >
      <Reveal as="p" className="data-tag color__label">{COLOR.coverageLabel}</Reveal>
      <div className="coverage__bar">
        {COLOR.coverage.map((c, i) => (
          <motion.span
            key={c.label}
            className="coverage__segment"
            style={{ flexGrow: c.value, background: fills[i], transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.8, ease: EASE, delay: i * 0.35 }}
          />
        ))}
      </div>
      <div className="coverage__legend">
        {COLOR.coverage.map((c, i) => (
          <Reveal key={c.label} className="coverage__item" style={{ flexGrow: c.value }} delay={0.4 + i * 0.35} y={8}>
            <span className="data-figure"><RollingNumber value={String(c.value)} suffix="%" active={inView} delay={400 + i * 350} /></span>
            <span className="data-tag">{c.label}</span>
          </Reveal>
        ))}
      </div>
    </motion.section>
  );
}

export default function ColorChapter({ chapter }) {
  return (
    <div id={chapter.id} data-chapter={chapter.id}>
      <ChapterOpener number={chapter.number} title={chapter.title} />
      <Palette />
      <Coverage />
    </div>
  );
}
