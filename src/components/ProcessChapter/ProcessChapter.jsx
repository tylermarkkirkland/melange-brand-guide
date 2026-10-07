import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PROCESS } from '../../data/content.js';
import ChapterOpener from '../ChapterOpener/ChapterOpener.jsx';
import { Reveal, EASE } from '../Reveal/Reveal.jsx';
import './ProcessChapter.css';

/* Every process screen opens the same way: which phase, then what it was */
function Head({ phase, title }) {
  return (
    <header className="process__head">
      <Reveal as="p" className="data-tag process__phase">{phase}</Reveal>
      <Reveal as="h3" className="operational-title-lg process__title" delay={0.1}>{title}</Reveal>
    </header>
  );
}

/* Phase 1: six names, one kept, and why */
function Naming() {
  const { phase, title, names, chosen, chosenLabel, why, image } = PROCESS.naming;
  return (
    <section className="chapter-body screen process naming" aria-label={title}>
      <div className="naming__text">
        <Head phase={phase} title={title} />
        <ol className="naming__list">
          {names.map((n, i) => {
            const isChosen = n === chosen;
            return (
              <Reveal as="li" key={n} className={`naming__name${isChosen ? ' is-chosen' : ''}`} delay={0.2 + i * 0.08} y={10}>
                <span className={`ceremonial-heading${isChosen ? ' metal-text' : ''}`}>{n}</span>
                {isChosen && <span className="data-tag ember-number">{chosenLabel}</span>}
              </Reveal>
            );
          })}
        </ol>
        <div className="naming__why">
          {why.map((p, i) => (
            <Reveal as="p" key={p} className="operational-body-lg" delay={0.8 + i * 0.15}>{p}</Reveal>
          ))}
        </div>
      </div>
      <Reveal className="naming__image" delay={0.3} y={24}>
        <img src={image.src} alt={image.alt} draggable="false" />
      </Reveal>
    </section>
  );
}

/* Phase 1: a big board you scroll through. The words hold still on the left
   while three uneven columns of images drift past at slightly different speeds. */
function Moodboard() {
  const { phase, title, intro, keywords, columns } = PROCESS.moodboard;
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const drift = [
    useTransform(scrollYProgress, [0, 1], [40, -80]),
    useTransform(scrollYProgress, [0, 1], [120, -40]),
    useTransform(scrollYProgress, [0, 1], [0, -120]),
  ];

  return (
    <section className="chapter-body screen process mood" ref={ref} aria-label={title}>
      <div className="mood__text">
        <Head phase={phase} title={title} />
        <Reveal as="p" className="operational-body-lg mood__intro" delay={0.2}>{intro}</Reveal>
        <Reveal as="ul" className="mood__keywords" delay={0.35}>
          {keywords.map((k) => <li key={k} className="data-tag">{k}</li>)}
        </Reveal>
      </div>
      <div className="mood__board">
        {columns.map((col, c) => (
          <motion.div key={c} className="mood__column" style={reduced ? undefined : { y: drift[c] }}>
            {col.map((img, i) => (
              <Reveal key={img.src} className={`mood__cell${img.site ? ' mood__cell--site' : ''}`} delay={(i % 2) * 0.1 + c * 0.08} y={24}>
                <img src={img.src} alt={img.alt} width={img.width} height={img.height} draggable="false" />
                {img.site && (
                  <p className="mood__caption">
                    <span className="data-tag">{img.site}</span>
                    <span className="operational-body-sm">{img.liked}</span>
                  </p>
                )}
              </Reveal>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* Phases 2 and 3: what I drew, what AI made of it, what I kept */
function SketchToMark() {
  const { phase, title, steps } = PROCESS.sketch;
  return (
    <section className="chapter-body screen process" aria-label={title}>
      <Head phase={phase} title={title} />
      <ol className="steps">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.label} className={`step${s.final ? ' step--final' : ''}`} delay={0.2 + i * 0.25} y={24}>
            <div className="step__frame">
              <img src={s.image.src} alt={s.image.alt} draggable="false" />
            </div>
            <p className="step__label">
              <span className="data-tag ember-number">{String(i + 1).padStart(2, '0')}</span>
              <span className="operational-title-sm">{s.label}</span>
            </p>
            <p className="operational-body-sm step__note">{s.note}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* Phase 4: everything I'd made in gold, beside the same in silver; gold steps back */
function Metal() {
  const { phase, title, options, chosenLabel, line } = PROCESS.metal;
  return (
    <section className="chapter-body screen process" aria-label={title}>
      <div className="metal-head">
        <Head phase={phase} title={title} />
        <Reveal as="p" className="operational-body-lg process__line" delay={0.3}>{line}</Reveal>
      </div>
      <div className="metal-pick">
        {options.map((o, i) => (
          <Reveal key={o.label} className="metal-pick__option" delay={0.2 + i * 0.2} y={24}>
            <motion.img
              src={o.src}
              alt={o.alt}
              draggable="false"
              initial={{ opacity: 1 }}
              whileInView={o.chosen ? undefined : { opacity: 0.4 }}
              viewport={{ amount: 0.6 }}
              transition={{ duration: 1.6, ease: EASE, delay: 1.8 }}
            />
            <p className="metal-pick__label">
              <span className="operational-title-sm">{o.label}</span>
              <span className="operational-body-sm metal-pick__note">{o.note}</span>
              {o.chosen && <span className="data-tag ember-number">{chosenLabel}</span>}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function ProcessChapter({ chapter }) {
  return (
    <div id={chapter.id} data-chapter={chapter.id}>
      <ChapterOpener number={chapter.number} title={chapter.title} />
      <Naming />
      <Moodboard />
      <SketchToMark />
      <Metal />
    </div>
  );
}
