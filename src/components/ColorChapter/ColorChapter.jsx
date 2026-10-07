import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { COLOR, GROUND, METAL, SPICE } from '../../data/content.js';
import ChapterOpener from '../ChapterOpener/ChapterOpener.jsx';
import RollingNumber from '../RollingNumber/RollingNumber.jsx';
import { Reveal, EASE } from '../Reveal/Reveal.jsx';
import './ColorChapter.css';

/* Grounds: the screen itself becomes each ground in turn as you scroll */
function GroundWash() {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const stops = GROUND.map((_, i) => i / (GROUND.length - 1));
  const background = useTransform(scrollYProgress, stops, GROUND.map((g) => g.hex));
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setIndex(Math.min(GROUND.length - 1, Math.max(0, Math.round(p * (GROUND.length - 1)))));
  });
  const ground = GROUND[index];

  // Tell the fixed chapter marker when a light ground sits behind it (top of the screen)
  const pinRef = useRef(null);
  useEffect(() => {
    const check = () => {
      const r = pinRef.current?.getBoundingClientRect();
      const behindMarker = r && r.top <= 60 && r.bottom >= 60;
      document.documentElement.dataset.ground = behindMarker && ground.light ? 'light' : 'dark';
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [ground.light]);

  return (
    <section className="chapter-body wash" ref={ref} aria-label={COLOR.groundLabel}>
      <motion.div className={`wash__pin${ground.light ? ' is-light' : ''}`} style={{ background }} ref={pinRef}>
        <p className="wash__label data-tag">
          {COLOR.groundLabel}
          <span>{COLOR.groundNote}</span>
        </p>

        <div className="wash__name" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={ground.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <p className="operational-title-lg">{ground.name}</p>
              <p className="data-figure">{ground.hex}</p>
              <p className="operational-body">{ground.use}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <ol className="wash__steps" aria-hidden="true">
          {GROUND.map((g, i) => (
            <li key={g.name} className={i === index ? 'is-current' : ''} style={{ background: g.hex }} />
          ))}
        </ol>
      </motion.div>
    </section>
  );
}

/* Metals: five columns rising like ingots, lightest last */
function Metals() {
  return (
    <section className="chapter-body screen metals" aria-label={COLOR.metalLabel}>
      <div className="color__head">
        <Reveal as="p" className="data-tag color__label">{COLOR.metalLabel}</Reveal>
        <Reveal as="p" className="operational-body color__note" delay={0.1}>{COLOR.metalNote}</Reveal>
      </div>
      <ul className="metals__row">
        {METAL.map((m, i) => (
          <li key={m.name} className="metal">
            <motion.span
              className="metal__bar"
              style={{ background: m.hex }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.6, ease: EASE, delay: i * 0.12 }}
            />
            <Reveal className="metal__text" delay={0.5 + i * 0.12} y={8}>
              <p className="operational-title-sm">{m.name}</p>
              <p className="data-row">{m.hex}</p>
              <p className="data-row metal__ratio">{m.ratio}</p>
              <p className="operational-body-sm">{m.use}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* Spice: small, alone, with room around it */
function Spices() {
  return (
    <section className="chapter-body screen spices" aria-label={COLOR.spiceLabel}>
      <div className="color__head">
        <Reveal as="p" className="data-tag color__label">{COLOR.spiceLabel}</Reveal>
        <Reveal as="p" className="operational-body color__note" delay={0.1}>{COLOR.spiceNote}</Reveal>
      </div>
      <ul className="spices__row">
        {SPICE.map((s, i) => (
          <Reveal as="li" key={s.name} className="spice" delay={0.2 + i * 0.18} y={20}>
            <span className="spice__chip" style={{ background: s.hex }} />
            <p className="operational-title-sm">{s.name}</p>
            <p className="data-row">{s.hex}</p>
            <p className="data-row spice__ratio">{s.ratio}</p>
            <p className="operational-body-sm">{s.use}</p>
          </Reveal>
        ))}
      </ul>
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
      <GroundWash />
      <Metals />
      <Spices />
      <Coverage />
    </div>
  );
}
