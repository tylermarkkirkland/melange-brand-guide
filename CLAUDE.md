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
- **Follow his spec verbatim** for color (13 tokens), typography (3 voices, 14 styles), the six system rules, and the logo. Everything he didn't define is taken **from what the website already does**, not invented.
- Story: a brand presentation. It will sit inside a ~5-minute year-end talk (short site video intro → brand guide → how it was made with AI → site walk-through).

## Structure (current)

Opening (a presentation title slide, deliberately **not** the website's landing: header with mark + edition, "Building a Brand" title, presenter, large silver pillar, clickable contents row; no 3D scene) → **01 Process** → **02 Brand** → **03 Logo** → **04 Color** → **05 Typography** → **06 Imagery** → Close.

- **Process chapter** (added 2026-10-07; the year-end talk must show process: program spec says the final presentation runs Process → Concept → Final system → Applications). Four pages, each tagged with its program phase: **Naming** (six candidates; why "melange": it's Dune's proper name for the spice, and sounds high-end for a trader serving the Great Houses) · **Moodboard** (a tall, uneven three-column collage that drifts as you scroll; words stick on the left; ~2.5 screens, arrow keys step through it) · **From sketch to mark** (pencil sheet → AI-rendered directions → final pillar) · **Gold or silver** (Tyler started in gold and made his first assets in it, then switched to silver and black because he liked it better and it fit the brand). Tyler does **not** want the first subject (musician platform) shown. Images are Figma renders from the **Research** page of file `xaTqpuL5E3zOnM41ZwPcAS`, saved as webp in `public/process/` (`board-*` are tiles cut from his Behance reference board; `mood-*` are film stills and concept art — third-party, fine internally, remove before any public posting). AI is mentioned where it happened, not in its own section.
- Moodboard also holds headless captures (`web-*.webp`, 1440×900) of the sites Tyler studied for the website, each captioned with what he liked: thorgal.com, dich-fashion.webflow.io, noth.in, and from his 2026-10-05 message igloo.inc, spacex.com, rolls-roycemotorcars.com. He asked to drop locomotive.ca, designxhand.com and the chocolatier tile (2026-10-07). Source lists: `~/my-thinking-repo/projects/design-development/phase5-website-plan.md` and the Melange Mercantile project's session history.
- AI is mentioned with the shared `AiNote` component (small "AI" label + one line), only where Tyler confirmed it: rendering sketches (Sketch to mark label) and building the website (Imagery). Tyler removed the Naming and Moodboard notes.
- Title slide is **"Building a Brand"** (header: Melange Mercantile · UX growth project · 2026).
- Process pages have a short-screen block (`max-height: 800px`) so each fits a 1280×720 projector.
- CSS gotcha: `App.css` loads after component CSS, so a component's `.screen` overrides need two classes (`.screen.process`, `.screen.imagery`, `.screen.naming`, `.screen.mood`).
- **Tyler wants pages full, not bare**: brand-guide style, big images, non-uniform layouts that take up space.
- **Copy tone (Tyler, 2026-10-07):** the site is Tyler talking, not the brand. Plain, human, first person on process pages; no fancy words where simple ones work. Keep his spec text verbatim (the six rules, color uses, the brand's purpose); everything around it is plain.
- **US spelling only** (Tyler, 2026-10-07): color, gray, center, traveling. The `ColorChapter` component and `#color` id follow it.

- **No Motion chapter** (Tyler isn't sure he wants one). No clear-space / minimum-size / misuse pages (not in his spec).
- Each chapter opens on a pinned title card (`ChapterOpener`, Cinzel `ceremonial/display`); the first content screen slides up over it.
- Logo chapter: the site's 3D pillar (GLB) makes one slow turn in the title card. **Backup idea if that doesn't land:** 3D pillar opener, then his silver PNG for lockup/variations (current lockup screens already use the PNG).
- Color: the screen itself washes through the five grounds; metals rise as bars; spice small and rationed; 85/13/2 bar (gap between metal and spice — rule 01). The system-rules screen was cut (Tyler, 2026-10-07: not important for the talk).
- Typography: one waterfall screen per voice showing all 14 styles at real size with specs.
- Imagery: **one page** (Tyler, 2026-10-07): intro + AI note across the top, four site photos in an uneven grid, captions under each.

All copy and values live in `src/data/content.js`. Components: `src/components/<Name>/<Name>.jsx + .css`. WebGL lives in `GuideScene` (one fixed canvas, driven by `src/lib/sceneState.js`; stops rendering when not visible).

## Brand rules that must hold

- Colors: Ink #000000, Void #070A0C, Basalt #121A1F, Slate #1E2B33, Ice #E9EEF0; Pewter dark #5B5B5C (hairlines only, never text), Pewter #858789, Silver #98999B, Silver light #AEAFB1, Chrome #CFCFD1; Rust #9A3412 (never text on dark), Spice #C2410C (large marks only), Ember #E8822B (only spice that may carry meaning).
- Six rules: spice and metal never share an edge; spice never carries meaning alone; Cinzel capitals only, never below 24px; Cinzel only on the mark and ceremonial moments (Plex speaks); rust never text on dark; coverage ~85% ground / 13% metal / 2% spice.
- Spice in the presentation (Tyler, 2026-10-07: "use orange throughout, subtly, as the guidelines define"): Ember = numbers and names that mark place, always beside a label (`.ember-number`): chapter numbers, system-rule numbers, the font names in the Typography voice labels. Tyler asks for "spice color" meaning the orange; small text must be Ember, since Spice is large marks only; Spice = one short 48×2 stroke under each title (`.spice-stroke`) and the close tagline (24px bold Cinzel). Keep a ground gap between any spice and metal.
- Type: Cinzel (ceremonial), IBM Plex Sans (operational), IBM Plex Mono (data). Text-style classes in `src/App.css` match the 14 spec styles exactly.
- **Logo** = the website lockup: pillar, MELANGE (Cinzel, 0.24em tracking, brushed-metal gradient), MERCANTILE (24px, 0.62em tracking, Silver light). **No** rules, diamond or tagline line under it — `logo-primary-1254.png` in the website repo is the old lockup. The main pillar is Tyler's **transparent silver PNG** (`public/logo/pillar-silver.png`; original is Figma node 211:7333 in file `xaTqpuL5E3zOnM41ZwPcAS`). Figma screenshots flatten its transparency onto gray — download the raw image, never "cut it out". Flat one-color pillar: `public/logo/pillar-flat.svg` used as a CSS mask.

## Taste (from Tyler's feedback on the website)

- Modern, sleek, cinematic (igloo.inc, spacex.com, Rolls-Royce). One focal point per screen, little text, big imagery. Restraint.
- Nothing cartoony or "computery": no orange/ember borders or focus rings (silver focus), avoid boxes/panels, no HUD readouts. Glow and bloom subtle.
- Motion is physical ("sand, not jelly"): no springy easing. The one easing is `cubic-bezier(0.16, 1, 0.3, 1)`. Morph shapes rather than crossfade; only words crossfade. Pinned sections hold briefly, then move.
- Presenting (Tyler, 2026-10-07): → / ← **scroll** to the next/previous screen (not a curtain jump), so every pin, turn and reveal plays. Stops = title slide, each title card, each content screen, each wash ground, each photo, close (`src/lib/stops.js`, measured per press). Key scrolls glide with an in-out curve (≈ cubic-bezier(0.65,0,0.35,1)); the fast-out brand curve rushed the scroll-driven scenes. ↑/↓ and the wheel still scroll freely; the chapter list keeps the curtain jumps.
- Never make the reader scroll back through everything: long jumps fade through black (`travel()` in `App.jsx`).
- Repeating effects (rolling numbers) replay on each return.
- He often sends exact values from a tuning panel ("Copy values"); use them verbatim. Small lab panels are welcome for things that need tuning.

## Story / copy premise

Melange Mercantile is a **trading company licensed by CHOAM**, not a Great House; its clients are the Houses. Brand samples (type specimens, mock data) can use merchant/ledger language (consignment, assay); reserve "House" for clients. The guide's own explanatory copy is plain English and may say "spice" where it helps people follow. The Spacing Guild carries; never claim the company flies between worlds. Flag lore problems — Tyler isn't a Dune expert. (The type intro was changed from "Ceremonial speaks as the House" to "speaks for Melange Mercantile" for this reason.)

## Git

Remote: **private** repo `tylermarkkirkland/melange-brand-guide` on Tyler's personal GitHub (created 2026-10-07), separate from the `melange-mercantile` website repo. Push with the personal account, never the work one: `GH_TOKEN=$(gh auth token --user tylermarkkirkland) git push`. Repo-local identity is already set to `293983131+tylermarkkirkland@users.noreply.github.com`. Commit or push only when asked.

## Open

- **Next session (Tyler, 2026-10-07): talk length.** ~30 arrow presses now; target ~18. Options Tyler saved for tomorrow: (1) → skips chapter title cards (they still animate in passing), saves 6; (2) the five grounds on one page instead of the 5-stop wash, saves 4; (3) the three type voices on one page, saves 2. Also still open: an Applications chapter (Process → Concept → System → Applications), and the designxhand particle screenshot if Tyler grabs it.

- Tyler is reviewing the first full pass (2026-10-07). Possible next steps: chapter titles larger than the 72px spec max (he may want more drama), the Logo backup option, the year-end presentation itself (format: Figma Slides was discussed, then the brand guide moved to this site), site screen recordings for the talk.
- Mobile not tuned yet.
- Review pass (2026-10-07, while Tyler was at lunch): opener title brought to spec `ceremonial/display` 72px (it had been ~106px); still open whether titles should go bigger than spec. Ember chapter number turns Rust on the Ice ground. All framer-motion animations respect reduced motion via `MotionConfig`. Chapter jumps land 0.3 screen into the title card. Coverage % roll and replay. Logo "Mark" stage is Basalt, not a ruled box. Not done / ideas: Logo-chapter bloom can look strong mid-turn (couldn't judge in headless WebGL).
