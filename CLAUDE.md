# Melange Mercantile — Brand Guide site

A scroll-driven, presentation-style brand guide for **Melange Mercantile** ("Spice · Trade · Influence"), a fictional Dune-inspired luxury melange trading company. Personal project (Tyler's UX growth project, Phase 6 / year-end presentation), **not FamilySearch work**: ignore FamilySearch/Zion/elderly-user rules from the home CLAUDE.md here.

Related folders (read-only reference — **never change the website**):
- Website: `~/Melange Mercantile/site/` (React + Vite + three.js). Brand spec: `~/Melange Mercantile/BRAND.md`. Story/copy premise: `~/Melange Mercantile/STORY.md`.
- Program spec and phase notes: `~/my-thinking-repo/projects/design-development/` (`growth-project-phases-reference.md`).

## Run and check

```bash
npm install
npx vite --port 5290 --strictPort
```

- Never steal window focus. Start the dev server in the background; verify with headless screenshots (chrome-devtools MCP is headless). Show Tyler things in the in-app Browser pane (`preview_start` with the URL).
- Verify visually before claiming a change works, and say what you actually checked.
- The guide is ~29,000px tall at 1440×900. To inspect a spot: `window.scrollTo(0, y)`, wait ~2s (Lenis smoothing), then screenshot.

## The brief (Tyler, 2026-10-07)

- **Super simplified.** Fewer sections, very little copy, one idea per screen.
- **Follow his spec verbatim** for colour (13 tokens), typography (3 voices, 14 styles), the six system rules, and the logo. Everything he didn't define is taken **from what the website already does**, not invented.
- Story: a brand presentation. It will sit inside a ~5-minute year-end talk (short site video intro → brand guide → how it was made with AI → site walk-through).

## Structure (current)

Opening (the site's landing: sunlit 3D pillar, name resolves letter by letter) → **01 Brand** → **02 Logo** → **03 Colour** → **04 Typography** → **05 Imagery** → Close.

- **No Motion chapter** (Tyler isn't sure he wants one). No clear-space / minimum-size / misuse pages (not in his spec).
- Each chapter opens on a pinned title card (`ChapterOpener`, Cinzel `ceremonial/display`); the first content screen slides up over it.
- Logo chapter: the site's 3D pillar (GLB) makes one slow turn in the title card. **Backup idea if that doesn't land:** 3D pillar opener, then his silver PNG for lockup/variations (current lockup screens already use the PNG).
- Colour: the screen itself washes through the five grounds; metals rise as bars; spice small and rationed; 85/13/2 bar (gap between metal and spice — rule 01); six rules verbatim.
- Typography: one waterfall screen per voice showing all 14 styles at real size with specs.
- Imagery: four site photos opening out of a window (the site's ship reveal), one rule each, drawn from the site's photo grade.

All copy and values live in `src/data/content.js`. Components: `src/components/<Name>/<Name>.jsx + .css`. WebGL lives in `GuideScene` (one fixed canvas, driven by `src/lib/sceneState.js`; stops rendering when not visible).

## Brand rules that must hold

- Colours: Ink #000000, Void #070A0C, Basalt #121A1F, Slate #1E2B33, Ice #E9EEF0; Pewter dark #5B5B5C (hairlines only, never text), Pewter #858789, Silver #98999B, Silver light #AEAFB1, Chrome #CFCFD1; Rust #9A3412 (never text on dark), Spice #C2410C (large marks only), Ember #E8822B (only spice that may carry meaning).
- Six rules: spice and metal never share an edge; spice never carries meaning alone; Cinzel capitals only, never below 24px; Cinzel only on the mark and ceremonial moments (Plex speaks); rust never text on dark; coverage ~85% ground / 13% metal / 2% spice.
- Type: Cinzel (ceremonial), IBM Plex Sans (operational), IBM Plex Mono (data). Text-style classes in `src/App.css` match the 14 spec styles exactly.
- **Logo** = the website lockup: pillar, MELANGE (Cinzel, 0.24em tracking, brushed-metal gradient), MERCANTILE (24px, 0.62em tracking, Silver light). **No** rules, diamond or tagline line under it — `logo-primary-1254.png` in the website repo is the old lockup. The main pillar is Tyler's **transparent silver PNG** (`public/logo/pillar-silver.png`; original is Figma node 211:7333 in file `xaTqpuL5E3zOnM41ZwPcAS`). Figma screenshots flatten its transparency onto grey — download the raw image, never "cut it out". Flat one-colour pillar: `public/logo/pillar-flat.svg` used as a CSS mask.

## Taste (from Tyler's feedback on the website)

- Modern, sleek, cinematic (igloo.inc, spacex.com, Rolls-Royce). One focal point per screen, little text, big imagery. Restraint.
- Nothing cartoony or "computery": no orange/ember borders or focus rings (silver focus), avoid boxes/panels, no HUD readouts. Glow and bloom subtle.
- Motion is physical ("sand, not jelly"): no springy easing. The one easing is `cubic-bezier(0.16, 1, 0.3, 1)`. Morph shapes rather than crossfade; only words crossfade. Pinned sections hold briefly, then move.
- Never make the reader scroll back through everything: long jumps fade through black (`travel()` in `App.jsx`).
- Repeating effects (rolling numbers) replay on each return.
- He often sends exact values from a tuning panel ("Copy values"); use them verbatim. Small lab panels are welcome for things that need tuning.

## Story / copy premise

Melange Mercantile is a **trading company licensed by CHOAM**, not a Great House; its clients are the Houses. Write in merchant/ledger language (charter, ledger, consignment, assay); reserve "House" for clients. Say "melange", never "spice" (except the tagline "Spice · Trade · Influence"). The Spacing Guild carries; never claim the company flies between worlds. Flag lore problems — Tyler isn't a Dune expert. (The type intro was changed from "Ceremonial speaks as the House" to "speaks for Melange Mercantile" for this reason.)

## Git

Local repo only so far. If asked to publish, use Tyler's **personal** GitHub (`tylermarkkirkland`), never the work account: `GH_TOKEN=$(gh auth token --user tylermarkkirkland) gh repo create …` / `git push`. Repo-local identity is already set to `293983131+tylermarkkirkland@users.noreply.github.com`. Commit or push only when asked.

## Open

- Tyler is reviewing the first full pass (2026-10-07). Possible next steps: chapter titles larger than the 72px spec max (he may want more drama), the Logo backup option, the year-end presentation itself (format: Figma Slides was discussed, then the brand guide moved to this site), site screen recordings for the talk.
- Mobile not tuned yet.
