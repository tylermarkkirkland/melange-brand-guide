import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TYPE } from '../../data/content.js';
import ChapterOpener from '../ChapterOpener/ChapterOpener.jsx';
import RollingNumber from '../RollingNumber/RollingNumber.jsx';
import { Reveal } from '../Reveal/Reveal.jsx';
import './TypeChapter.css';

/* One voice: its styles at their real sizes, largest to smallest, with the spec beside each */
function Voice({ voice, intro }) {
  const [inView, setInView] = useState(false);
  return (
    <motion.section
      className="chapter-body screen voice"
      aria-label={voice.label}
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)} // figures roll again on every return, as on the site
      viewport={{ amount: 0.5 }}
    >
      <header className="voice__head">
        {intro && <Reveal as="p" className="operational-title voice__intro">{intro}</Reveal>}
        <Reveal as="p" className="data-tag voice__label" delay={intro ? 0.2 : 0}>
          {voice.voice} · <span className="ember-number">{voice.font}</span>
        </Reveal>
        <Reveal as="p" className="operational-body voice__note" delay={intro ? 0.3 : 0.1}>{voice.note}</Reveal>
      </header>

      <ol className="voice__styles">
        {voice.styles.map((s, i) => (
          <Reveal as="li" key={s.name} className="voice__row" delay={0.15 + i * 0.1} y={12}>
            <span className={`voice__sample ${s.className}`}>
              {s.figure && <RollingNumber value={s.figure} suffix="%" active={inView} delay={300} />}
              {s.status && <span className="voice__status" aria-hidden="true" />}
              {!s.figure && s.sample}
            </span>
            <span className="voice__spec">
              <span className="data-row">{s.name}</span>
              <span className="data-row voice__dim">{s.spec}</span>
            </span>
          </Reveal>
        ))}
      </ol>
    </motion.section>
  );
}

export default function TypeChapter({ chapter }) {
  return (
    <div id={chapter.id} data-chapter={chapter.id}>
      <ChapterOpener number={chapter.number} title={chapter.title} />
      {TYPE.voices.map((v, i) => (
        <Voice key={v.id} voice={v} intro={i === 0 ? TYPE.intro : null} />
      ))}
      <section className="chapter-body type-notes" aria-label="Scale">
        <Reveal as="p" className="operational-body">{TYPE.scaleNote}</Reveal>
        <Reveal as="p" className="operational-body-sm" delay={0.1}>{TYPE.footnote}</Reveal>
      </section>
    </div>
  );
}
