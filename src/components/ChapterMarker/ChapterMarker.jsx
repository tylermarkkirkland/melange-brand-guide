import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CHAPTERS } from '../../data/content.js';
import { EASE } from '../Reveal/Reveal.jsx';
import './ChapterMarker.css';

/**
 * The guide's only chrome: where you are ("02 / 05 Logo") top left, which opens
 * the chapter list, and the docked pillar top centre, which returns to the start.
 * Hidden on the opening and the close.
 */
export default function ChapterMarker({ onTravel }) {
  const [current, setCurrent] = useState(null);
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const els = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean);
    const update = () => {
      const mid = window.innerHeight * 0.5;
      const hit = els.find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= mid && r.bottom > mid;
      });
      setCurrent(hit ? hit.id : null);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!current) setOpen(false);
  }, [current]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    listRef.current?.querySelector('button')?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const chapter = CHAPTERS.find((c) => c.id === current);
  const go = (id) => { setOpen(false); onTravel(id); };

  return (
    <AnimatePresence>
      {chapter && (
        <motion.nav
          className="marker"
          aria-label="Chapters"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <button
            className="marker__current"
            type="button"
            aria-expanded={open}
            aria-controls="chapter-list"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="data-tag marker__count">{chapter.number} / {String(CHAPTERS.length).padStart(2, '0')}</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={chapter.id}
                className="data-tag marker__title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {chapter.title}
              </motion.span>
            </AnimatePresence>
          </button>

          <AnimatePresence>
            {open && (
              <motion.ol
                id="chapter-list"
                className="marker__list"
                ref={listRef}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {CHAPTERS.map((c) => (
                  <li key={c.id}>
                    <button type="button" className={c.id === current ? 'is-current' : ''} onClick={() => go(c.id)}>
                      <span className="data-tag">{c.number}</span>
                      <span className="operational-body">{c.title}</span>
                    </button>
                  </li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>

          <button className="marker__home" type="button" onClick={() => go('top')} aria-label="Back to the start">
            <img src="/logo/pillar-silver.png" alt="" />
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
