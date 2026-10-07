import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CHAPTERS, OPENING } from '../../data/content.js';
import { EASE } from '../Reveal/Reveal.jsx';
import './Opening.css';

/**
 * The title slide: the talk begins here. Hairlines draw, the title rises out
 * of its line, then the presenter and the contents. Each contents entry jumps
 * to its chapter. Scrolling away fades the slide out.
 */
export default function Opening({ reducedMotion, onTravel }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const fade = useTransform(scrollYProgress, [0, 0.42], [1, 0]); // gone before the first title card arrives

  // one timeline, in seconds; reduced motion shows everything at once
  const at = (delay, duration = 1.4) => (reducedMotion ? { duration: 0 } : { duration, ease: EASE, delay });
  const rise = (delay) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: at(delay) });

  return (
    <section className="opening" ref={sectionRef} id="top" aria-label={`${OPENING.company} ${OPENING.deck}`}>
      <motion.div className="opening__slide" style={{ opacity: fade }}>
        <header className="opening__head">
          <motion.p className="opening__company data-tag" {...rise(0.3)}>
            <img src="/logo/pillar-silver.png" alt="" />
            {OPENING.company}
          </motion.p>
          <motion.p className="opening__edition data-tag" {...rise(0.4)}>
            {OPENING.deck} <span aria-hidden="true">·</span> {OPENING.edition}
          </motion.p>
          <motion.span
            className="opening__rule"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={at(0, 2.2)}
          />
        </header>

        <div className="opening__title-block">
          <h1 className="opening__title ceremonial-display">
            {OPENING.titleLines.map((line, i) => (
              <span className="opening__line" key={line}>
                <motion.span
                  className="opening__line-inner metal-text"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={at(0.7 + i * 0.18, 1.8)}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.span
            className="opening__stroke spice-stroke"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={at(1.3, 1.6)}
          />
          <motion.p className="opening__subtitle operational-body-lg" {...rise(1.5)}>
            {OPENING.subtitle}
          </motion.p>
          <motion.p className="opening__presenter" {...rise(1.7)}>
            <span className="data-tag">{OPENING.presenterLabel}</span>
            <span className="operational-title-sm">{OPENING.presenter}</span>
          </motion.p>
        </div>

        <motion.img
          className="opening__mark"
          src="/logo/pillar-silver.png"
          alt=""
          draggable="false"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={at(1.0, 2.4)}
        />

        <nav className="opening__contents" aria-label={OPENING.contentsLabel}>
          <motion.span
            className="opening__rule"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={at(1.6, 2.2)}
          />
          <motion.p className="opening__contents-label data-tag" {...rise(1.9)}>{OPENING.contentsLabel}</motion.p>
          <ol style={{ '--count': CHAPTERS.length }}>
            {CHAPTERS.map((c, i) => (
              <motion.li key={c.id} {...rise(2.0 + i * 0.08)}>
                <button type="button" onClick={() => onTravel(c.id)}>
                  <span className="data-tag ember-number">{c.number}</span>
                  <span className="operational-body">{c.title}</span>
                </button>
              </motion.li>
            ))}
          </ol>
        </nav>
      </motion.div>
    </section>
  );
}
