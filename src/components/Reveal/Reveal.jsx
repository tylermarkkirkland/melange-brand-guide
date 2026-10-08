import React from 'react';
import { motion } from 'framer-motion';

// The site's easing: fast out, long settle
export const EASE = [0.16, 1, 0.3, 1];

/**
 * Rises and fades in the first time it scrolls into view.
 * `as` picks the element; `delay` is in seconds.
 */
export function Reveal({ as = 'div', delay = 0, y = 16, className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.4, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const letter = {
  hidden: { opacity: 0, y: 10, filter: 'blur(10px)' },
  shown: (duration) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration, ease: EASE } }),
};

/**
 * A word that resolves letter by letter out of a blur, as the site's wordmark does.
 * Screen readers get the whole word. Animates when `shown` is true.
 */
export function RevealWord({ text, className, letterClassName, stagger = 0.08, delay = 0, duration = 1.6, shown }) {
  return (
    <motion.span
      className={className}
      aria-label={text}
      role="text"
      initial="hidden"
      animate={shown ? 'shown' : 'hidden'}
      variants={{ shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {text.split('').map((ch, i) => (
        <motion.span key={i} aria-hidden="true" className={letterClassName} style={{ display: 'inline-block' }} variants={letter} custom={duration}>
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}
