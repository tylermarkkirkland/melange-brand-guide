// The "pages" the arrow keys step through, as scroll positions, measured fresh on each
// press so they follow the layout: the title slide, each chapter's title card (pinned,
// title shown), each content screen, and the close. Screens taller than the window get
// extra stops so → scrolls through them.
// Each stop is { y, title }; `title` marks a chapter title card, which → passes through
// with a short hold rather than stopping on (see App.jsx).
export function getStops() {
  const vh = window.innerHeight;
  const top = (el) => el.getBoundingClientRect().top + window.scrollY;
  const stops = [{ y: 0 }];

  // a little into each title card: pinned and revealed, before it starts to dim
  document.querySelectorAll('.opener').forEach((el) => stops.push({ y: top(el) + vh * 0.1, title: true }));
  document.querySelectorAll('.screen').forEach((el) => {
    stops.push({ y: top(el) });
    const extra = el.offsetHeight - vh;
    if (extra > vh * 0.25) {
      const steps = Math.ceil(extra / (vh * 0.85));
      for (let i = 1; i <= steps; i++) stops.push({ y: top(el) + (extra * i) / steps });
    }
  });

  const max = document.documentElement.scrollHeight - vh;
  return stops
    .map((s) => ({ ...s, y: Math.round(Math.min(max, Math.max(0, s.y))) }))
    .sort((a, b) => a.y - b.y)
    .filter((s, i, all) => i === 0 || s.y - all[i - 1].y > 8);
}
