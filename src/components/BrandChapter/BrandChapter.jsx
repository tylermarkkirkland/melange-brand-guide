import React from 'react';
import { BRAND } from '../../data/content.js';
import ChapterOpener from '../ChapterOpener/ChapterOpener.jsx';
import { Reveal } from '../Reveal/Reveal.jsx';
import './BrandChapter.css';

export default function BrandChapter({ chapter }) {
  return (
    <div id={chapter.id} data-chapter={chapter.id}>
      <ChapterOpener number={chapter.number} title={chapter.title} />
      <section className="chapter-body brand screen" aria-label="The brand">
        <div className="brand__purpose">
          <Reveal as="p" className="brand__label data-tag">{BRAND.purposeLabel}</Reveal>
          <Reveal as="p" className="brand__statement operational-title-lg" delay={0.1}>{BRAND.purpose}</Reveal>
          <Reveal as="p" className="brand__lead operational-body-lg" delay={0.25}>{BRAND.statement}</Reveal>
        </div>

        <div className="brand__traits">
          <Reveal as="p" className="brand__label data-tag">{BRAND.personalityLabel}</Reveal>
          <ul className="brand__words">
            {BRAND.personality.map((word, i) => (
              <Reveal as="li" key={word} className="ceremonial-heading metal-text" delay={0.15 + i * 0.12}>
                {word}
              </Reveal>
            ))}
          </ul>

          <Reveal as="p" className="brand__label data-tag" delay={0.4}>{BRAND.archetypesLabel}</Reveal>
          <Reveal as="dl" className="brand__archetypes" delay={0.5}>
            {BRAND.archetypes.map((a) => (
              <div key={a.name}>
                <dt className="operational-title-sm">{a.name}</dt>
                <dd className="operational-body-sm">{a.note}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
