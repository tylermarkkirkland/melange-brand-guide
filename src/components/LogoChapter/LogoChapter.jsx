import React from 'react';
import { LOGO } from '../../data/content.js';
import { sceneState } from '../../lib/sceneState.js';
import ChapterOpener from '../ChapterOpener/ChapterOpener.jsx';
import Lockup from '../Lockup/Lockup.jsx';
import { Reveal } from '../Reveal/Reveal.jsx';
import './LogoChapter.css';

const clamp01 = (x) => Math.min(1, Math.max(0, x));

// The 3D pillar rises out of the dark with the title, turns once, then the lockup slides over it
const driveScene = (p) => {
  sceneState.logo = clamp01((p - 0.12) / 0.17) * (1 - clamp01((p - 0.5) / 0.2));
  sceneState.logoTurn = clamp01((p - 0.22) / 0.45);
};

export default function LogoChapter({ chapter }) {
  return (
    <div id={chapter.id} data-chapter={chapter.id}>
      <ChapterOpener number={chapter.number} title={chapter.title} transparent onProgress={driveScene} />

      <section className="chapter-body logo-primary screen" aria-label={LOGO.primaryLabel}>
        <Reveal className="logo-primary__mark" y={24}>
          <Lockup size={64} />
        </Reveal>
        <Reveal className="logo__caption" delay={0.3}>
          <p className="data-tag">{LOGO.primaryLabel}</p>
          <p className="operational-body">{LOGO.primaryNote}</p>
        </Reveal>
      </section>

      <section className="chapter-body logo-variants screen" aria-label="Variations">
        {LOGO.variants.map((v, i) => (
          <Reveal key={v.id} className="logo-variant" delay={i * 0.15} y={24}>
            <div className={`logo-variant__stage${v.id === 'one-colour' ? ' logo-variant__stage--ice' : ''}`}>
              {v.id === 'mark' ? <Lockup size={52} parts="mark" /> : <Lockup size={44} variant="flat" color="var(--ink)" />}
            </div>
            <div className="logo__caption">
              <p className="data-tag">{v.label}</p>
              <p className="operational-body">{v.note}</p>
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
