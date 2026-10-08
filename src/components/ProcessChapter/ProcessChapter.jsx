import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
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

/* Phase 1: one screen. The words hold still on the left; once you arrive, the board glides
   up on its own and stops at the bottom, so it takes one press, not several.
   One number drives it: progress, 0 (top) to 1 (bottom). The glide animates it; the wheel or
   trackpad over the board nudges it, clamped, so it can never run past either end. At an end,
   the wheel goes back to scrolling the page. Each column moves its own distance for the same
   progress, so they drift at slightly different speeds. */
const GLIDE_DELAY = 0.8; // seconds: let the words and first images settle first

function Moodboard() {
  const { phase, title, intro, keywords, columns } = PROCESS.moodboard;
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
        <Head phase={phase} title={title} />
        <Reveal as="p" className="operational-body-lg mood__intro" delay={0.2}>{intro}</Reveal>
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
                {img.site && (
                  <p className="mood__caption">
                    <span className="data-tag">{img.site}</span>
                    <span className="operational-body-sm">{img.liked}</span>
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        ))}
      </div>
    </motion.section>
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
