import React, { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import { CHAPTERS } from './data/content.js';
import { getStops } from './lib/stops.js';
import GuideScene from './components/GuideScene/GuideScene.jsx';
import Opening from './components/Opening/Opening.jsx';
import ChapterMarker from './components/ChapterMarker/ChapterMarker.jsx';
import ProcessChapter from './components/ProcessChapter/ProcessChapter.jsx';
import BrandChapter from './components/BrandChapter/BrandChapter.jsx';
import LogoChapter from './components/LogoChapter/LogoChapter.jsx';
import ColorChapter from './components/ColorChapter/ColorChapter.jsx';
import TypeChapter from './components/TypeChapter/TypeChapter.jsx';
import ImageryChapter from './components/ImageryChapter/ImageryChapter.jsx';
import Close from './components/Close/Close.jsx';

const [process, brand, logo, color, type, imagery] = CHAPTERS;

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
  // Up/down still scroll freely; the chapter list keeps the fade-to-black jumps.
  useEffect(() => {
    let heading = null; // where a key-started scroll is going, so quick presses keep stepping
    const onKey = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      if (traveling.current) return;
      const lenis = lenisRef.current;
      const from = heading ?? window.scrollY;
      const stops = getStops();
      const to = e.key === 'ArrowRight'
        ? stops.find((y) => y > from + 4)
        : [...stops].reverse().find((y) => y < from - 4);
      if (to === undefined) return;
      e.preventDefault();
      if (!lenis) { window.scrollTo(0, to); return; }
      heading = to;
      // An even glide (in-out), not the fast-out UI curve, which would rush the scroll-driven
      // scenes (logo turn, photo reveals) into the first few frames. Longer trips take a little longer.
      const screens = Math.abs(to - window.scrollY) / window.innerHeight;
      lenis.scrollTo(to, { duration: Math.min(2.6, 1.3 + screens * 0.5), easing: glide, force: true, onComplete: () => { heading = null; } });
    };
    const forget = () => { heading = null; }; // the reader took over with the wheel or touch
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', forget, { passive: true });
    window.addEventListener('touchstart', forget, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', forget);
      window.removeEventListener('touchstart', forget);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <GuideScene reducedMotion={reducedMotion} />
      <ChapterMarker onTravel={travel} />
      <main>
        <Opening reducedMotion={reducedMotion} onTravel={travel} />
        <ProcessChapter chapter={process} />
        <BrandChapter chapter={brand} />
        <LogoChapter chapter={logo} />
        <ColorChapter chapter={color} />
        <TypeChapter chapter={type} />
        <ImageryChapter chapter={imagery} />
        <Close />
      </main>
      <div className="curtain" ref={curtainRef} aria-hidden="true" />
    </MotionConfig>
  );
}
