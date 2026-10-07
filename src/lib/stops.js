// The "pages" the arrow keys step through, as scroll positions, measured fresh on
// each press so they follow the layout. Each is where that screen is fully in place:
//   title slide · each chapter title card (pinned, title shown) · each content screen ·
//   each ground in the color wash · each photograph, fully opened · the close
// Screens taller than the window get extra stops so → scrolls through them.
export function getStops() {
  const vh = window.innerHeight;
  const top = (el) => el.getBoundingClientRect().top + window.scrollY;
  const stops = [0];

  // a little into each title card: pinned and revealed, before it starts to dim
  document.querySelectorAll('.opener').forEach((el) => stops.push(top(el) + vh * 0.1));
  document.querySelectorAll('.screen, .plate').forEach((el) => {
    stops.push(top(el));
    // a screen taller than the window (the moodboard) gets a stop for each window-full, ending on its last
    const extra = el.offsetHeight - vh;
    if (extra > vh * 0.25) {
      const steps = Math.ceil(extra / (vh * 0.85));
      for (let i = 1; i <= steps; i++) stops.push(top(el) + (extra * i) / steps);
    }
  });
  // the wash pins for one screen per ground; each step lands exactly on a ground
  document.querySelectorAll('.wash').forEach((el) => {
    const steps = Math.round((el.offsetHeight - vh) / vh);
    for (let i = 0; i <= steps; i++) stops.push(top(el) + i * vh);
  });

  const max = document.documentElement.scrollHeight - vh;
  return stops
    .map((y) => Math.round(Math.min(max, Math.max(0, y))))
    .sort((a, b) => a - b)
    .filter((y, i, all) => i === 0 || y - all[i - 1] > 8);
}
