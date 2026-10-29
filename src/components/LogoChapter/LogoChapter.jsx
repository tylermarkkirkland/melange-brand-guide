import React from 'react';
import { LOGO } from '../../data/content.js';
import ChapterOpener from '../ChapterOpener/ChapterOpener.jsx';
import Lockup from '../Lockup/Lockup.jsx';
import { Reveal } from '../Reveal/Reveal.jsx';
import './LogoChapter.css';

export default function LogoChapter({ chapter }) {
  return (
    <div id={chapter.id} data-chapter={chapter.id}>
      <ChapterOpener number={chapter.number} title={chapter.title} />

      <section className="chapter-body screen logo-use" aria-label={LOGO.title}>
        <Reveal as="h3" className="operational-title-lg logo-use__title">{LOGO.title}</Reveal>
        <div className="logo-variants">
          {LOGO.variants.map((v, i) => (
            <Reveal key={v.id} className="logo-variant" delay={0.15 + i * 0.15} y={24}>
              <div className={`logo-variant__stage${v.id === 'one-color' ? ' logo-variant__stage--ice' : ''}`}>
                {v.id === 'logo' ? <Lockup size={44} /> : <Lockup size={44} variant="flat" color="var(--ink)" />}
              </div>
              <div className="logo__caption">
                <p className="data-tag">{v.label}</p>
                <p className="operational-body">{v.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
