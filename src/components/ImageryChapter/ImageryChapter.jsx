import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IMAGERY } from '../../data/content.js';
import ChapterOpener from '../ChapterOpener/ChapterOpener.jsx';
import { Reveal } from '../Reveal/Reveal.jsx';
import './ImageryChapter.css';

/* A photograph that opens out of a window as it scrolls in, as the site's ship does */
function Plate({ photo, index, reducedMotion }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const inset = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v * 1.4}% ${v}% ${v * 1.4}%)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section className="chapter-body plate" ref={ref} aria-label={photo.label}>
      <div className="plate__pin">
        <motion.div className="plate__frame" style={reducedMotion ? undefined : { clipPath }}>
          <motion.img src={photo.src} alt={photo.alt} style={reducedMotion ? undefined : { scale }} draggable="false" />
        </motion.div>
        <div className="plate__caption">
          <Reveal as="p" className="data-tag">{String(index + 1).padStart(2, '0')} · {photo.label}</Reveal>
          <Reveal as="p" className="operational-body-lg" delay={0.15}>{photo.line}</Reveal>
        </div>
      </div>
    </section>
  );
}

export default function ImageryChapter({ chapter, reducedMotion }) {
  return (
    <div id={chapter.id} data-chapter={chapter.id}>
      <ChapterOpener number={chapter.number} title={chapter.title} />
      <section className="chapter-body screen imagery-intro" aria-label="Imagery">
        <Reveal as="p" className="operational-title-lg">{IMAGERY.intro}</Reveal>
      </section>
      {IMAGERY.photos.map((p, i) => (
        <Plate key={p.src} photo={p} index={i} reducedMotion={reducedMotion} />
      ))}
    </div>
  );
}
