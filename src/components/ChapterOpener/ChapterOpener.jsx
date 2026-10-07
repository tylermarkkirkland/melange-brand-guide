import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { RevealWord } from '../Reveal/Reveal.jsx';
import './ChapterOpener.css';

/**
 * A chapter's title card. It pins for a beat, then the chapter's first screen
 * slides up over it while the title dims. `onProgress` gets 0..1 across the
 * whole card (used by the Logo chapter to turn the pillar).
 *
 * transparent  let the WebGL scene show through (Logo chapter)
 */
export default function ChapterOpener({ number, title, transparent = false, onProgress }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // ~0.29 pinned, ~0.43 the next screen starts to cover it, ~0.71 covered
  const dim = useTransform(scrollYProgress, [0.45, 0.7], [1, 0]);
  const sink = useTransform(scrollYProgress, [0.45, 0.7], [0, -40]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (p > 0.3 && !shown) setShown(true);
    onProgress?.(p);
  });

  return (
    <section className={`opener${transparent ? ' opener--clear' : ''}`} ref={ref} aria-labelledby={`chapter-${number}`}>
      <div className="opener__pin">
        <motion.div className="opener__inner" style={{ opacity: dim, y: sink }}>
          <span className="opener__number data-tag">{number}</span>
          <h2 className="opener__title ceremonial-display" id={`chapter-${number}`}>
            <RevealWord text={title.toUpperCase()} letterClassName="metal-text" stagger={0.07} shown={shown} />
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
