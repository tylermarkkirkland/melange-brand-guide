import React from 'react';
import { Reveal } from '../Reveal/Reveal.jsx';
import './AiNote.css';

/**
 * Where AI took part, said quietly in one line: a small "AI" label, then the sentence.
 * Used across the talk instead of a separate AI section.
 */
export default function AiNote({ text, delay = 0.6, className = '' }) {
  if (!text) return null;
  return (
    <Reveal as="p" className={`ai-note ${className}`} delay={delay}>
      <span className="data-tag ai-note__label">AI</span>
      <span className="operational-body-sm ai-note__text">{text}</span>
    </Reveal>
  );
}
