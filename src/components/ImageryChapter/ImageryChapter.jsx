import React from 'react';
import { IMAGERY } from '../../data/content.js';
import ChapterOpener from '../ChapterOpener/ChapterOpener.jsx';
import { Reveal } from '../Reveal/Reveal.jsx';
import AiNote from '../AiNote/AiNote.jsx';
import './ImageryChapter.css';

/* One page: the four rules of the site's photography, each shown on a photo from the site */
export default function ImageryChapter({ chapter }) {
  return (
    <div id={chapter.id} data-chapter={chapter.id}>
      <ChapterOpener number={chapter.number} title={chapter.title} />
      <section className="chapter-body screen imagery" aria-label="Imagery">
        <header className="imagery__head">
          <Reveal as="p" className="operational-title-lg imagery__intro">{IMAGERY.intro}</Reveal>
          <AiNote text={IMAGERY.ai} delay={0.3} />
        </header>
        <ol className="imagery__grid">
          {IMAGERY.photos.map((p, i) => (
            <Reveal as="li" key={p.src} className={`photo photo--${i}`} delay={0.15 + i * 0.15} y={24}>
              <img src={p.src} alt={p.alt} draggable="false" />
              <div className="photo__caption">
                <p className="photo__label">
                  <span className="data-tag ember-number">{String(i + 1).padStart(2, '0')}</span>
                  <span className="operational-title-sm">{p.label}</span>
                </p>
                <p className="operational-body-sm photo__line">{p.line}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>
    </div>
  );
}
