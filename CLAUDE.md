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

Opening (a presentation title slide, deliberately **not** the website's landing: "Melange Mercantile" title, "UX growth project 2026" subtitle, presenter, large silver pillar; no header, no contents row) → **01 Story** → **02 Logo** → **03 Color** → **04 Typography** → Close.

- **More presentation, less website (Tyler, 2026-10-29):** no floating pillar/home button at top center (it sat over content while scrolling; the **Home** key fades back to the title slide instead). No 3D scene anywhere: the Logo title card is a plain opener like the others (GuideScene, sceneState and `three` removed). Imagery chapter removed ("not really defined"; it was a way to feel the world). Close tagline is **Ember**, not Spice. After the close, Tyler switches to the live website.
- **Slides, not pages (Tyler, 2026-10-29):** anything he'll say out loud stays off screen. No "Phase 1 · …" tags; no explanatory lines (idea subline, naming why, sketch notes, moodboard "what I liked" captions — `liked` is still in the data for the talk). Each story slide is a short title plus the work. Archetypes and personality share **one slide** (`Brand` in ProcessChapter: Ruler/Sage with their words, then the five personality words, certificate photo on the right).

- **Story chapter (reworked 2026-10-28, Tyler's order):** the idea (full-bleed site photo: "A spice trader in the world of Dune" / "What if CHOAM weren't the only name in the spice trade?") → archetypes (Ruler: power, authority, control, leadership · Sage: knowledge, wisdom, expertise) → personality (five words + photo) → the name (one line: melange is spice's real name, high-end like the Houses) → moodboard → sketch → AI → final → **Grounding it in the world** (full-bleed silver mockup sheet, title only; replaced the gold-or-silver comparison 2026-10-29 — Tyler explains he was placing the logo in Dune's world to see how the brand would be used) → then the system chapters. The separate Brand chapter (purpose etc.) was removed; its words live in the story. Presentation standard: one idea per slide, minimal text. Lore: the website says Melange Mercantile is *licensed by* CHOAM; Tyler's pitch is "as if CHOAM weren't the only one", worded so both fit.

- **Story chapter pages, detail** (first built 2026-10-07 as "Process"; the year-end talk must show process: program spec says the final presentation runs Process → Concept → Final system → Applications). Pages: **Naming** (six candidates; why "melange": it's Dune's proper name for the spice, and sounds high-end for a trader serving the Great Houses) · **Moodboard** (one screen: words on the left; on arrival the uneven three-column board glides up on its own in ~8s (Tyler: ~17s was too slow) and stops at the bottom, replaying on return — one arrow press. One progress value (0–1) drives it: the glide animates it, and the wheel/trackpad over the board nudges it, clamped at both ends (at an end the wheel goes back to the page). Don't make the board a native scroll container with a sticky stage — that version misbehaved in Tyler's browser. Keep **three columns at every width**: a 2-column narrow rule wrapped the third column far below and broke the glide. Columns are listed bottom-up so the glide rests on Tyler's favorites). Below 900px wide (e.g. the in-app Browser pane) it stays one screen: words stacked compactly on top, board fills the rest — Tyler previews in that narrow pane, so check layouts there too · **From sketch to mark** (pencil sheet → AI-rendered directions → final pillar) · (former) **Gold or silver** (Tyler tried gold first because he thought it might look cool; after more brand defining, looking at examples and trying silver, he chose silver as the better fit — he was never "sure" it would be gold). Tyler does **not** want the first subject (musician platform) shown. Images are Figma renders from the **Research** page of file `xaTqpuL5E3zOnM41ZwPcAS`, saved as webp in `public/process/` (`board-*` are tiles cut from his Behance reference board; `mood-*` are film stills and concept art — third-party, fine internally, remove before any public posting). AI is mentioned where it happened, not in its own section.
- Moodboard also holds headless captures (`web-*.webp`, 1440×900) of the sites Tyler studied for the website, each captioned with what he liked: thorgal.com, dich-fashion.webflow.io, noth.in, and from his 2026-10-05 message igloo.inc, spacex.com, rolls-roycemotorcars.com. He asked to drop locomotive.ca, designxhand.com and the chocolatier tile (2026-10-07). Source lists: `~/my-thinking-repo/projects/design-development/phase5-website-plan.md` and the Melange Mercantile project's session history.
- AI is mentioned only where Tyler confirmed it: rendering sketches (Sketch to mark). The `AiNote` component went with the Imagery chapter; Tyler removed the Naming and Moodboard notes earlier.
- Title slide is **"Melange Mercantile"** with "UX growth project 2026" under it (2026-10-29).
- Process pages have a short-screen block (`max-height: 800px`) so each fits a 1280×720 projector.
- CSS gotcha: `App.css` loads after component CSS, so a component's `.screen` overrides need two classes (`.screen.process`, `.screen.naming`, `.screen.mood`, `.screen.type`).
- **Tyler wants pages full, not bare**: brand-guide style, big images, non-uniform layouts that take up space.
- **Copy tone (Tyler, 2026-10-07):** the site is Tyler talking, not the brand. Plain, human, first person on process pages; no fancy words where simple ones work. Keep his spec text verbatim (the six rules, color uses, the brand's purpose); everything around it is plain.
- **US spelling only** (Tyler, 2026-10-07): color, gray, center, traveling. The `ColorChapter` component and `#color` id follow it.

- **No Motion chapter** (Tyler isn't sure he wants one). No clear-space / minimum-size / misuse pages (not in his spec).
- Each chapter opens on a pinned title card (`ChapterOpener`, Cinzel `ceremonial/display`); the first content screen slides up over it.
- Logo chapter (2026-10-29): plain title card, then **one page titled "Logo use"**, two stages side by side, each captioned by *when* to use it: Dark backgrounds (silver lockup on Basalt) and Light backgrounds and print (one-color ink lockup on Ice). No "Primary lockup" page (Tyler didn't know the term).
- Color (2026-10-08): **one palette page**, all 13 colors as tall columns in one shared grid (5 ground · 5 metal · 3 spice, spacer columns between groups so spice never touches metal), name / hex / contrast / use under each; then the 85/13/2 coverage page. The ground wash and the system-rules screen were cut.
- Typography (2026-10-29): **one page**, three columns (Cinzel / Plex Sans / Plex Mono), no rules above them. Hierarchy (Tyler, 2026-10-29: the font choices must be the focus): small `01 Ceremonial` label (Ember number) → **the font name, set in itself, 48px** (32px under 1200 wide so IBM Plex Mono stays on one line) → what it's for (18px, Silver) → a small, quiet "Example" along the bottom. No big MM/Aa/01 glyphs (too big), no intro line, alphabets or sizing specs.

All copy and values live in `src/data/content.js`. Components: `src/components/<Name>/<Name>.jsx + .css`.

## Brand rules that must hold

- Colors: Ink #000000, Void #070A0C, Basalt #121A1F, Slate #1E2B33, Ice #E9EEF0; Pewter dark #5B5B5C (hairlines only, never text), Pewter #858789, Silver #98999B, Silver light #AEAFB1, Chrome #CFCFD1; Rust #9A3412 (never text on dark), Spice #C2410C (large marks only), Ember #E8822B (only spice that may carry meaning).
- Six rules: spice and metal never share an edge; spice never carries meaning alone; Cinzel capitals only, never below 24px; Cinzel only on the mark and ceremonial moments (Plex speaks); rust never text on dark; coverage ~85% ground / 13% metal / 2% spice.
- Spice in the presentation (Tyler, 2026-10-07: "use orange throughout, subtly, as the guidelines define"): Ember = numbers and names that mark place, always beside a label (`.ember-number`): chapter numbers, system-rule numbers, the font names in the Typography voice labels. Tyler asks for "spice color" meaning the orange; small text must be Ember, since Spice is large marks only; Spice = one short 48×2 stroke under each title (`.spice-stroke`). The close tagline is Ember (Tyler wanted the lighter spice there, 2026-10-29). Keep a ground gap between any spice and metal.
- Type: Cinzel (ceremonial), IBM Plex Sans (operational), IBM Plex Mono (data). Text-style classes in `src/App.css` match the 14 spec styles exactly.
- **Logo** = the website lockup: pillar, MELANGE (Cinzel, 0.24em tracking, brushed-metal gradient), MERCANTILE (24px, 0.62em tracking, Silver light). **No** rules, diamond or tagline line under it — `logo-primary-1254.png` in the website repo is the old lockup. The main pillar is Tyler's **transparent silver PNG** (`public/logo/pillar-silver.png`; original is Figma node 211:7333 in file `xaTqpuL5E3zOnM41ZwPcAS`). Figma screenshots flatten its transparency onto gray — download the raw image, never "cut it out". Flat one-color pillar: `public/logo/pillar-flat.svg` used as a CSS mask.

## Taste (from Tyler's feedback on the website)

- Modern, sleek, cinematic (igloo.inc, spacex.com, Rolls-Royce). One focal point per screen, little text, big imagery. Restraint.
- Nothing cartoony or "computery": no orange/ember borders or focus rings (silver focus), avoid boxes/panels, no HUD readouts. Glow and bloom subtle.
- Motion is physical ("sand, not jelly"): no springy easing. The one easing is `cubic-bezier(0.16, 1, 0.3, 1)`. Morph shapes rather than crossfade; only words crossfade. Pinned sections hold briefly, then move.
- Presenting: → / ← **scroll** (not a curtain jump) so every pin, turn and reveal plays. Stops come from `src/lib/stops.js` (measured per press; title cards flagged `title`). Entering a chapter, one → glides to its title, holds ~0.45s (`TITLE_HOLD`; 1.1s felt too long in `App.jsx`), then carries on to the first page; a second → during that skips straight to the page; ← steps back over titles. 11 presses for the whole talk (2026-10-29). Home goes back to the title slide. Key scrolls glide with an in-out curve (≈ cubic-bezier(0.65,0,0.35,1)); the fast-out brand curve rushed the scroll-driven scenes. Title letters resolve as the card arrives (opener progress > 0.26, 1.1s, 0.05 stagger) so the reveal plays while it's on screen, and reset once the card is out of view so they replay on every arrival (Tyler wants to see them every time). ↑/↓ and the wheel still scroll freely; the chapter list keeps the curtain jumps.
- Never make the reader scroll back through everything: long jumps fade through black (`travel()` in `App.jsx`).
- Repeating effects (rolling numbers) replay on each return.
- He often sends exact values from a tuning panel ("Copy values"); use them verbatim. Small lab panels are welcome for things that need tuning.

## Story / copy premise

Melange Mercantile is a **trading company licensed by CHOAM**, not a Great House; its clients are the Houses. Brand samples (type specimens, mock data) can use merchant/ledger language (consignment, assay); reserve "House" for clients. The guide's own explanatory copy is plain English and may say "spice" where it helps people follow. The Spacing Guild carries; never claim the company flies between worlds. Flag lore problems — Tyler isn't a Dune expert. (The type intro was changed from "Ceremonial speaks as the House" to "speaks for Melange Mercantile" for this reason.)

## Git

Remote: **private** repo `tylermarkkirkland/melange-brand-guide` on Tyler's personal GitHub (created 2026-10-07), separate from the `melange-mercantile` website repo. Push with the personal account, never the work one: `GH_TOKEN=$(gh auth token --user tylermarkkirkland) git push`. Repo-local identity is already set to `293983131+tylermarkkirkland@users.noreply.github.com`. Commit or push only when asked.

## Open

- **Talk length:** 11 arrow presses as of 2026-10-29 (Imagery, the primary-lockup page cut; archetypes + personality merged). Also still open: an Applications chapter (Process → Concept → System → Applications), and the designxhand particle screenshot if Tyler grabs it.

- Tyler is reviewing the first full pass (2026-10-07). Possible next steps: chapter titles larger than the 72px spec max (he may want more drama), the Logo backup option, the year-end presentation itself (format: Figma Slides was discussed, then the brand guide moved to this site), site screen recordings for the talk.
- Mobile not tuned yet.
- Review pass (2026-10-07, while Tyler was at lunch): opener title brought to spec `ceremonial/display` 72px (it had been ~106px); still open whether titles should go bigger than spec. Ember chapter number turns Rust on the Ice ground. All framer-motion animations respect reduced motion via `MotionConfig`. Chapter jumps land 0.3 screen into the title card. Coverage % roll and replay. Logo stage is Basalt, not a ruled box.
