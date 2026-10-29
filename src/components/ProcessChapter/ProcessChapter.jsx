import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { PROCESS } from '../../data/content.js';
import ChapterOpener from '../ChapterOpener/ChapterOpener.jsx';
import { Reveal } from '../Reveal/Reveal.jsx';
import './ProcessChapter.css';

/* Every story slide has a short title; Tyler tells the rest out loud */
function Head({ title }) {
  return (
    <header className="process__head">
      <Reveal as="h3" className="operational-title-lg process__title">{title}</Reveal>
    </header>
  );
}

/* A full-bleed picture with its title over the dark corner: the idea, and the brand in the world */
function FullBleed({ title, image }) {
  return (
    <section className="chapter-body screen idea" aria-label={title}>
      <Reveal className="idea__image" y={0}>
        <img src={image.src} alt={image.alt} style={{ objectPosition: image.position }} draggable="false" />
      </Reveal>
      <div className="idea__text">
        <Reveal as="h3" className="ceremonial-title metal-text idea__title" delay={0.2}>{title}</Reveal>
      </div>
    </section>
  );
}

/* Who the brand is: the two archetypes and five personality words, beside a photo that feels that way */
function Brand() {
  const { archetypesLabel, archetypes, personalityLabel, personality, image } = PROCESS.brand;
  return (
    <section className="chapter-body screen process brand" aria-label="Archetypes and personality">
      <div className="brand__text">
        <div className="brand__group">
          <Reveal as="p" className="data-tag brand__label">{archetypesLabel}</Reveal>
          <div className="brand__archetypes">
            {archetypes.map((a, i) => (
              <Reveal key={a.name} className="archetype" delay={0.15 + i * 0.2} y={16}>
                <h3 className="ceremonial-title metal-text archetype__name">{a.name}</h3>
                <ul className="archetype__words">
                  {a.words.map((w) => <li key={w} className="operational-body-lg">{w}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="brand__group">
          <Reveal as="p" className="data-tag brand__label" delay={0.5}>{personalityLabel}</Reveal>
          <ul className="brand__personality">
            {personality.map((w, i) => (
              <Reveal as="li" key={w} className="operational-title-sm" delay={0.6 + i * 0.08} y={10}>{w}</Reveal>
            ))}
          </ul>
        </div>
      </div>
      <Reveal className="brand__image" delay={0.3} y={24}>
        <img src={image.src} alt={image.alt} draggable="false" />
      </Reveal>
    </section>
  );
}

/* Six names, one kept */
function Naming() {
  const { title, names, chosen, chosenLabel, image } = PROCESS.naming;
  return (
    <section className="chapter-body screen process naming" aria-label={title}>
      <div className="naming__text">
        <Head title={title} />
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
      </div>
      <Reveal className="naming__image" delay={0.3} y={24}>
        <img src={image.src} alt={image.alt} draggable="false" />
      </Reveal>
    </section>
  );
}

/* The moodboard, one screen. The words hold still on the left; once you arrive, the board glides
   up on its own and stops at the bottom, so it takes one press, not several.
   One number drives it: progress, 0 (top) to 1 (bottom). The glide animates it; the wheel or
   trackpad over the board nudges it, clamped, so it can never run past either end. At an end,
   the wheel goes back to scrolling the page. Each column moves its own distance for the same
   progress, so they drift at slightly different speeds. */
const GLIDE_DELAY = 0.8; // seconds: let the words and first images settle first

function Moodboard() {
  const { title, keywords, columns } = PROCESS.moodboard;
  const reduced = useReducedMotion();
  const boardRef = useRef(null);
  const colRefs = useRef([]);
  const travel = useRef(columns.map(() => 0)); // how far each column moves, top to bottom
  const progress = useMotionValue(0);
  const glide = useRef(null);

  // place the columns for the current progress
  const place = useCallback(() => {
    const p = progress.get();
    colRefs.current.forEach((c, i) => {
      if (c) c.style.transform = `translateY(${-travel.current[i] * p}px)`;
    });
  }, [progress]);

  useEffect(() => progress.on('change', place), [progress, place]);

  // measure how far each column must move for its last image to reach the bottom of the board
  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return undefined;
    const measure = () => {
      const h = board.clientHeight;
      travel.current = colRefs.current.map((c) => Math.max(0, (c?.scrollHeight || 0) - h));
      place();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(board);
    colRefs.current.forEach((c) => c && ro.observe(c));
    return () => ro.disconnect();
  }, [place]);

  const stopGlide = useCallback(() => { glide.current?.stop(); glide.current = null; }, []);

  // the wheel or trackpad over the board moves the board, until it reaches an end
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return undefined;
    const onWheel = (e) => {
      const range = Math.max(...travel.current);
      if (!range) return;
      const p = progress.get();
      const atEnd = (e.deltaY > 0 && p >= 1) || (e.deltaY < 0 && p <= 0);
      if (atEnd) return; // let the page have it
      stopGlide();
      e.preventDefault();
      e.stopPropagation(); // keep the page's smooth scroll out of it
      progress.set(Math.min(1, Math.max(0, p + e.deltaY / range)));
    };
    board.addEventListener('wheel', onWheel, { passive: false });
    return () => board.removeEventListener('wheel', onWheel);
  }, [progress, stopGlide]);

  const start = () => {
    stopGlide();
    progress.set(0);
    const range = Math.max(...travel.current);
    if (reduced || !range) return;
    // about 260px a second for the longest column, 5 to 9 seconds in all
    const duration = Math.min(9, Math.max(5, range / 260));
    glide.current = animate(progress, 1, { duration, delay: GLIDE_DELAY, ease: [0.45, 0, 0.55, 1] });
  };

  const reset = () => { stopGlide(); progress.set(0); }; // back to the top, so it plays again on return

  useEffect(() => stopGlide, [stopGlide]);

  return (
    <motion.section
      className="chapter-body screen process mood"
      aria-label={title}
      onViewportEnter={start}
      onViewportLeave={reset}
      viewport={{ amount: 0.6 }}
    >
      <div className="mood__text">
        <Head title={title} />
        <Reveal as="ul" className="mood__keywords" delay={0.35}>
          {keywords.map((k) => <li key={k} className="data-tag">{k}</li>)}
        </Reveal>
      </div>
      <div className="mood__board" ref={boardRef} onTouchStart={stopGlide} onPointerDown={stopGlide}>
        {columns.map((col, c) => (
          <div key={c} className="mood__column" ref={(el) => { colRefs.current[c] = el; }}>
            {col.map((img, i) => (
              <Reveal key={img.src} className={`mood__cell${img.site ? ' mood__cell--site' : ''}`} delay={(i % 2) * 0.1 + c * 0.08} y={24}>
                <img src={img.src} alt={img.alt} width={img.width} height={img.height} draggable="false" />
                {img.site && <p className="mood__caption data-tag">{img.site}</p>}
              </Reveal>
            ))}
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* What I drew, what AI made of it, what I kept */
function SketchToMark() {
  const { title, steps } = PROCESS.sketch;
  return (
    <section className="chapter-body screen process" aria-label={title}>
      <Head title={title} />
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
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export default function ProcessChapter({ chapter }) {
  return (
    <div id={chapter.id} data-chapter={chapter.id}>
      <ChapterOpener number={chapter.number} title={chapter.title} />
      <FullBleed {...PROCESS.idea} />
      <Brand />
      <Naming />
      <Moodboard />
      <SketchToMark />
      <FullBleed {...PROCESS.world} />
    </div>
  );
}
