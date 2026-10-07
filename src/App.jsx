import React, { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { CHAPTERS } from './data/content.js';
import GuideScene from './components/GuideScene/GuideScene.jsx';
import Opening from './components/Opening/Opening.jsx';
import ChapterMarker from './components/ChapterMarker/ChapterMarker.jsx';
import BrandChapter from './components/BrandChapter/BrandChapter.jsx';
import LogoChapter from './components/LogoChapter/LogoChapter.jsx';
import ColourChapter from './components/ColourChapter/ColourChapter.jsx';
import TypeChapter from './components/TypeChapter/TypeChapter.jsx';
import ImageryChapter from './components/ImageryChapter/ImageryChapter.jsx';
import Close from './components/Close/Close.jsx';

const [brand, logo, colour, type, imagery] = CHAPTERS;

export default function App() {
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const lenisRef = useRef(null);
  const curtainRef = useRef(null);

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
    if (!el) return;
    const jump = () => {
      if (lenisRef.current) lenisRef.current.scrollTo(el, { immediate: true, force: true });
      else el.scrollIntoView();
    };
    const curtain = curtainRef.current;
    if (reducedMotion || !curtain) { jump(); return; }
    curtain.classList.add('is-closed');
    setTimeout(() => {
      jump();
      // land a little into a chapter's title card, where the title is fully shown
      if (id !== 'top' && lenisRef.current) lenisRef.current.scrollTo(el.offsetTop + window.innerHeight * 0.6, { immediate: true, force: true });
      requestAnimationFrame(() => curtain.classList.remove('is-closed'));
    }, 650);
  }, [reducedMotion]);

  return (
    <>
      <GuideScene reducedMotion={reducedMotion} />
      <ChapterMarker onTravel={travel} />
      <main>
        <Opening reducedMotion={reducedMotion} />
        <BrandChapter chapter={brand} />
        <LogoChapter chapter={logo} />
        <ColourChapter chapter={colour} />
        <TypeChapter chapter={type} />
        <ImageryChapter chapter={imagery} reducedMotion={reducedMotion} />
        <Close />
      </main>
      <div className="curtain" ref={curtainRef} aria-hidden="true" />
    </>
  );
}
