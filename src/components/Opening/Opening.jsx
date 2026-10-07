import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { OPENING } from '../../data/content.js';
import { sceneState } from '../../lib/sceneState.js';
import { RevealWord, EASE } from '../Reveal/Reveal.jsx';
import './Opening.css';

/**
 * The site's landing, in miniature: sunlight finds the pillar, then the
 * name resolves beneath it. Scrolling away fades the scene out.
 */
export default function Opening({ reducedMotion }) {
  const ref = useRef(null);
  const [phase, setPhase] = useState(reducedMotion ? 2 : 0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  useEffect(() => {
    if (reducedMotion) return undefined;
    const a = setTimeout(() => setPhase(1), 2400); // the name, once the pillar is lit
    const b = setTimeout(() => setPhase(2), 4400); // then the rest
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [reducedMotion]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    sceneState.opening = Math.max(0, 1 - p * 1.6);
  });

  return (
    <section className="opening" ref={ref} id="top" aria-label="Melange Mercantile brand guide">
      <motion.div className="opening__fade" style={{ opacity: useFade(scrollYProgress) }}>
        <h1 className="opening__wordmark">
          <RevealWord text={OPENING.wordmarkTop} className="opening__top" letterClassName="metal-text" stagger={0.11} shown={phase >= 1} />
          <RevealWord text={OPENING.wordmarkBottom} className="opening__bottom" stagger={0.07} delay={0.9} shown={phase >= 1} />
        </h1>
        <motion.div
          className="opening__foot"
          initial={{ opacity: 0, y: 8 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <p className="opening__label data-tag">
            {OPENING.label}
            <span className="opening__edition">{OPENING.edition}</span>
          </p>
          <span className="opening__cue" aria-hidden="true">
            <span className="data-tag">{OPENING.cue}</span>
            <span className="opening__cue-line" />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

// words leave quickly, before the scene has gone
function useFade(progress) {
  const [o, setO] = useState(1);
  useMotionValueEvent(progress, 'change', (p) => setO(Math.max(0, 1 - p * 2.4)));
  return o;
}
