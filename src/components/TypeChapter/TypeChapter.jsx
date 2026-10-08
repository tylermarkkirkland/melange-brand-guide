import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TYPE } from '../../data/content.js';
import ChapterOpener from '../ChapterOpener/ChapterOpener.jsx';
import RollingNumber from '../RollingNumber/RollingNumber.jsx';
import { Reveal } from '../Reveal/Reveal.jsx';
import './TypeChapter.css';

/* One page, three voices side by side: the face, what it's for, and a few real examples */
export default function TypeChapter({ chapter }) {
  const [inView, setInView] = useState(false);
  return (
    <div id={chapter.id} data-chapter={chapter.id}>
      <ChapterOpener number={chapter.number} title={chapter.title} />
      <motion.section
        className="chapter-body screen type"
        aria-label="Typography"
        onViewportEnter={() => setInView(true)}
        onViewportLeave={() => setInView(false)} // the figure rolls again on every return
        viewport={{ amount: 0.5 }}
      >
        <Reveal as="p" className="operational-title-lg type__intro">{TYPE.intro}</Reveal>
        <div className="type__voices">
          {TYPE.voices.map((v, i) => (
            <Reveal key={v.id} className="voice" delay={0.15 + i * 0.15} y={20}>
              <p className="data-tag voice__label">
                {v.voice} · <span className="ember-number">{v.font}</span>
              </p>
              <p className={`type-glyph ${v.glyphClass}`} aria-hidden="true">{v.glyph}</p>
              <p className="operational-body-sm voice__note">{v.note}</p>
              <div className="voice__samples">
                {v.samples.map((s, j) => (
                  <p key={j} className={`voice__sample ${s.className}`}>
                    {s.status && <span className="voice__status" aria-hidden="true" />}
                    {s.figure ? <RollingNumber value={s.figure} suffix={s.suffix} active={inView} delay={400} /> : s.text}
                  </p>
                ))}
              </div>
              <p className={`voice__alphabet ${v.glyphClass}`}>{v.alphabet}</p>
            </Reveal>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
