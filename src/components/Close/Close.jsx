import React from 'react';
import { CLOSE } from '../../data/content.js';
import Lockup from '../Lockup/Lockup.jsx';
import { Reveal } from '../Reveal/Reveal.jsx';
import './Close.css';

export default function Close() {
  return (
    <section className="chapter-body close screen" id="close" aria-label="Close">
      <Reveal y={24}>
        <Lockup size={56} />
      </Reveal>
      <Reveal as="p" className="close__tagline ceremonial-label" delay={0.4}>{CLOSE.tagline}</Reveal>
    </section>
  );
}
