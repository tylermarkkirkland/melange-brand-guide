import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { OPENING } from '../../data/content.js';
import { EASE } from '../Reveal/Reveal.jsx';
import './Opening.css';

/**
 * The title slide: the talk begins here. The title rises out of its lines,
 * then the subtitle and the presenter. Scrolling away fades the slide out.
 */
export default function Opening({ reducedMotion }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const fade = useTransform(scrollYProgress, [0, 0.42], [1, 0]); // gone before the first title card arrives

  // one timeline, in seconds; reduced motion shows everything at once
  const at = (delay, duration = 1.4) => (reducedMotion ? { duration: 0 } : { duration, ease: EASE, delay });
  const rise = (delay) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: at(delay) });

  return (
    <section className="opening" ref={sectionRef} id="top" aria-label={OPENING.titleLines.join(' ')}>
      <motion.div className="opening__slide" style={{ opacity: fade }}>
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
      </motion.div>
    </section>
  );
}
