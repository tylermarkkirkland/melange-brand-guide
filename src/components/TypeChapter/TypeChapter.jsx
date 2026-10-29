import React from 'react';
import { TYPE } from '../../data/content.js';
import ChapterOpener from '../ChapterOpener/ChapterOpener.jsx';
import { Reveal } from '../Reveal/Reveal.jsx';
import './TypeChapter.css';

/* One page, three voices side by side. The typeface I chose is the hero, set in itself;
   then what it's for, and a small example in use along the bottom */
export default function TypeChapter({ chapter }) {
  return (
    <div id={chapter.id} data-chapter={chapter.id}>
      <ChapterOpener number={chapter.number} title={chapter.title} />
      <section className="chapter-body screen type" aria-label="Typography">
        <div className="type__voices">
          {TYPE.voices.map((v, i) => (
            <Reveal key={v.id} className="voice" delay={0.15 + i * 0.15} y={20}>
              <p className="data-tag voice__label">
                <span className="ember-number">{String(i + 1).padStart(2, '0')}</span> {v.voice}
              </p>
              <h3 className={`voice__font ${v.fontClass}`}>{v.font}</h3>
              <p className="operational-body-lg voice__note">{v.note}</p>
              <div className="voice__example">
                <p className="data-tag voice__example-label">{TYPE.examplesLabel}</p>
                {v.samples.map((s, j) => (
                  <p key={j} className={`voice__sample ${s.className}`}>
                    {s.status && <span className="voice__status" aria-hidden="true" />}
                    {s.text}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
