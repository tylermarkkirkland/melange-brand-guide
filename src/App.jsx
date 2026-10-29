import React, { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import { CHAPTERS } from './data/content.js';
import { getStops } from './lib/stops.js';
import Opening from './components/Opening/Opening.jsx';
import ChapterMarker from './components/ChapterMarker/ChapterMarker.jsx';
import ProcessChapter from './components/ProcessChapter/ProcessChapter.jsx';
import LogoChapter from './components/LogoChapter/LogoChapter.jsx';
import ColorChapter from './components/ColorChapter/ColorChapter.jsx';
import TypeChapter from './components/TypeChapter/TypeChapter.jsx';
import Close from './components/Close/Close.jsx';

const [process, logo, color, type] = CHAPTERS;

// ≈ cubic-bezier(0.65, 0, 0.35, 1), the in-out curve the guide uses for its scroll cue
const glide = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const isChapter = (id) => CHAPTERS.some((c) => c.id === id);

export default function App() {
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const lenisRef = useRef(null);
  const curtainRef = useRef(null);
  const traveling = useRef(false);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true }); // the site's feel
    lenisRef.current = lenis;
    let raf = 0;
    const tick = (time) => { lenis.raf(time); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisRef.current = null; };
  }, [reducedMotion]);

  // Never scroll the reader through the whole guide: fade to black, jump, fade back
  const travel = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el || traveling.current) return;
    // land a little into a chapter's title card: pinned, title revealed, not yet dimming
    const y = isChapter(id) ? el.offsetTop + window.innerHeight * 0.3 : el.offsetTop;
    const jump = () => {
      if (lenisRef.current) lenisRef.current.scrollTo(y, { immediate: true, force: true });
      else window.scrollTo(0, y);
    };
    const curtain = curtainRef.current;
    if (reducedMotion || !curtain) { jump(); return; }
    traveling.current = true; // ignore further jumps until the curtain has opened again
    curtain.classList.add('is-closed');
    setTimeout(() => {
      jump();
      requestAnimationFrame(() => curtain.classList.remove('is-closed'));
      setTimeout(() => { traveling.current = false; }, 600);
    }, 650);
  }, [reducedMotion]);

  // Presenting: → scrolls on to the next screen, ← back one, so every pin, turn and
  // reveal plays as if scrolled by hand (a clicker that sends arrows works too).
  // Entering a chapter, → glides to its title, holds a beat, then carries on to the first
  // page in the same press; pressing again during that skips straight to the page.
  // ← steps back over title cards. Up/down still scroll freely; the chapter list keeps
  // the fade-to-black jumps, and Home fades back to the title slide.
  useEffect(() => {
    const TITLE_HOLD = 450; // ms on a chapter title before carrying on
    let heading = null; // where a key-started scroll is going, so quick presses keep stepping
    let pending = null; // { to, timer } from the moment a press heads through a title until it carries on

    const glideTo = (to, then) => {
      const lenis = lenisRef.current;
      heading = to;
      if (!lenis) { window.scrollTo(0, to); heading = null; then?.(); return; }
      // An even glide (in-out), not the fast-out UI curve, which would rush the scroll-driven
      // scenes (logo turn, title reveals) into the first few frames. Longer trips take a little longer.
      const screens = Math.abs(to - window.scrollY) / window.innerHeight;
      lenis.scrollTo(to, {
        duration: Math.min(2.6, 1.3 + screens * 0.5),
        easing: glide,
        force: true,
        onComplete: () => { heading = null; then?.(); },
      });
    };

    const cancelHold = () => { if (pending) { clearTimeout(pending.timer); pending = null; } };

    // glide to a chapter title, hold a beat, then carry on to its first page
    const throughTitle = (titleY, pageY) => {
      const seq = { to: pageY, timer: null };
      pending = seq;
      glideTo(titleY, () => {
        if (pending !== seq) return; // a later press already took over
        seq.timer = setTimeout(() => { if (pending === seq) { pending = null; glideTo(pageY); } }, TITLE_HOLD);
      });
    };

    const onKey = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Home') return;
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      if (traveling.current) return;
      e.preventDefault();

      if (e.key === 'Home') { cancelHold(); heading = null; travel('top'); return; }

      // heading through a title (gliding to it or holding on it): → goes straight on to the page; ← stays put
      if (pending) {
        const { to } = pending;
        cancelHold();
        if (e.key === 'ArrowRight') glideTo(to);
        return;
      }

      const from = heading ?? window.scrollY;
      const stops = getStops();
      if (e.key === 'ArrowLeft') {
        const back = [...stops].reverse().find((s) => s.y < from - 4 && !s.title);
        if (back) glideTo(back.y);
        return;
      }
      const i = stops.findIndex((s) => s.y > from + 4);
      if (i < 0) return;
      const next = stops[i];
      const after = stops[i + 1];
      if (next.title && after && !reducedMotion) {
        throughTitle(next.y, after.y);
        return;
      }
      glideTo(next.title && after ? after.y : next.y);
    };
    const forget = () => { heading = null; cancelHold(); }; // the reader took over with the wheel or touch
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', forget, { passive: true });
    window.addEventListener('touchstart', forget, { passive: true });
    return () => {
      cancelHold();
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', forget);
      window.removeEventListener('touchstart', forget);
    };
  }, [reducedMotion, travel]);

  return (
    <MotionConfig reducedMotion="user">
      <ChapterMarker onTravel={travel} />
      <main>
        <Opening reducedMotion={reducedMotion} />
        <ProcessChapter chapter={process} />
        <LogoChapter chapter={logo} />
        <ColorChapter chapter={color} />
        <TypeChapter chapter={type} />
        <Close />
      </main>
      <div className="curtain" ref={curtainRef} aria-hidden="true" />
    </MotionConfig>
  );
}
