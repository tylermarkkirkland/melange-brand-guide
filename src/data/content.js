// Every word and value in the guide lives here, so copy can change without touching layout.
// Color and type values are verbatim from the brand spec (BRAND.md in the site repo).
// Everything else is taken from what the website already does.

export const CHAPTERS = [
  { id: 'process', number: '01', title: 'Story' },
  { id: 'logo', number: '02', title: 'Logo' },
  { id: 'color', number: '03', title: 'Color' },
  { id: 'type', number: '04', title: 'Typography' },
];

export const OPENING = {
  // a presentation's title slide, not the website's landing
  titleLines: ['Melange', 'Mercantile'],
  subtitle: 'UX growth project 2026',
  presenterLabel: 'Presented by',
  presenter: 'Tyler Kirkland',
};

// How the brand was made, from the Research page of the Figma file.
// Slides, not pages: titles and pictures on screen; Tyler says the rest out loud.
const m = (name, alt, width, height) => ({ src: `/process/${name}.webp`, alt, width, height });
// a website I studied for the Phase 5 site: captured at 1440 × 900, captioned with its address (`liked` is for the talk)
const site = (name, url, liked, alt) => ({ ...m(name, alt, 1440, 900), site: url, liked });

export const PROCESS = {
  idea: {
    title: 'A spice trader in the world of Dune',
    image: { src: '/photos/arrival.webp', alt: 'A vast cargo hauler marked with the pillar, hovering over the desert at dusk' },
  },
  // who the brand is: the two archetypes and five personality words, on one slide
  brand: {
    archetypesLabel: 'Archetypes',
    archetypes: [
      { name: 'Ruler', words: ['Power', 'Authority', 'Control', 'Leadership'] },
      { name: 'Sage', words: ['Knowledge', 'Wisdom', 'Expertise'] },
    ],
    personalityLabel: 'Personality',
    personality: ['Prestigious', 'Authoritative', 'Sophisticated', 'Calculated', 'Elite'],
    image: { src: '/photos/certificate.webp', alt: 'A certificate embossed with the lockup beside a black wax seal and its silver stamp' },
  },
  naming: {
    title: 'Naming',
    names: ['House Melange', 'Melange Mercantile', 'Melange Consortium', 'Melange Exchange', 'Melange Reserve', 'The Melange Company'],
    chosen: 'Melange Mercantile',
    chosenLabel: 'Chosen',
    image: { src: '/photos/reserve.webp', alt: 'Four glass vials of melange in different grades, capped in silver, in a dark stone hall' },
  },
  moodboard: {
    title: 'Moodboard',
    keywords: ['Monolithic', 'Sacred', 'Elite', 'Timeless', 'Ceremonial', 'Strategic', 'Mysterious'],
    // three columns of different widths, so the board never reads as a grid.
    // Listed bottom-up on purpose: the glide comes to rest on the last few, Tyler's favorites.
    columns: [
      [
        site('web-rr-2', 'rolls-roycemotorcars.com', 'Scroll transitions between big images', 'Rolls-Royce website: a close-up of a black car door as the next image slides up beneath it'),
        m('board-10', 'A dark textured card with a spaced-out wordmark', 329, 212),
        site('web-dich-1', 'dich-fashion.webflow.io', 'Big type that builds in as you scroll', 'DICH Fashion website: huge black display type over clouds and a copper figure'),
        m('mood-03', 'A woman in a dark cloak against curved black walls', 637, 425),
        m('board-07', 'Close-up of a wind-rippled sand dune', 359, 315),
        site('web-thorgal-1', 'thorgal.com', 'Side nav and layered parallax', 'Thorgal website: a red desert scene with floating rocks and a dotted side navigation'),
        m('mood-09', 'Giant stone pillars rising from mist', 552, 981),
        m('board-01', 'A shopping bag with a red wordmark', 359, 261),
        m('mood-05', 'Two figures with a torch before a huge shape in orange haze', 1277, 533),
      ],
      [
        m('mood-02', 'An army in formation before a towering structure', 637, 358),
        m('board-03', 'A minimal wordmark for a desert resort', 357, 261),
        m('ref-seals', 'A chart of red wax seals for the houses of Dune', 450, 450),
        site('web-noth-1', 'noth.in', 'How content appears', 'Nothin’ website: offset project images on black'),
        m('mood-06', 'A lone figure in a dark corridor under a shaft of light', 547, 973),
        m('board-08', 'A faceted crystal decanter with amber liquid', 359, 315),
        site('web-igloo-2', 'igloo.inc', 'One big object, with data that rolls up as you scroll', 'Igloo website: a glowing igloo of stone blocks on a snowy ridge, with small numbered data points'),
        m('mood-still-2', 'A tiny figure at the foot of a glowing monolith', 736, 920),
        m('board-02', 'A black monogram logo on white paper', 359, 261),
      ],
      [
        site('web-rr-1', 'rolls-roycemotorcars.com', 'Large imagery, calm and simple like SpaceX', 'Rolls-Royce website: a dark full-screen video hero with a thin uppercase title'),
        m('board-11', 'A fashion poster with a bold serif wordmark', 329, 212),
        m('mood-13', 'A black monolith standing in fog', 530, 800),
        site('web-dich-2', 'dich-fashion.webflow.io', 'Scroll and text animations', 'DICH Fashion website: an Our Mission headline beside a dark stone ringed by orbits'),
        site('web-igloo-1', 'igloo.inc', 'Simple, large objects on screen', 'Igloo website: a wireframe igloo floating in a web of white lines and numbers'),
        m('board-06', 'A warm, brutalist living room with tall windows', 359, 315),
        m('mood-still-1', 'A cloaked figure facing a vast ship in mist', 1000, 742),
        site('web-spacex-1', 'spacex.com', 'Huge images and video, very little text', 'SpaceX website: an aerial shot of a rocket launch filling the screen, with a short title'),
        m('mood-12', 'Rows of soldiers before a stepped temple with banners', 784, 1045),
      ],
    ],
  },
  sketch: {
    title: 'From sketch to mark',
    steps: [
      {
        label: 'Sketched',
        image: m('sketches', 'A sheet of about sixty pencil thumbnails: M letterforms, stars, diamonds, circles and pillars', 1401, 1032),
      },
      {
        label: 'Rendered with AI',
        image: m('directions', 'Seven logo directions in gold on black, numbered 1 to 7; number 3 is the pillar', 1536, 1024),
      },
      {
        label: 'Final',
        image: { src: '/logo/pillar-silver.png', alt: 'The final pillar mark in brushed silver' },
        final: true,
      },
    ],
  },
  world: {
    title: 'Grounding it in the world',
    // anchored to the top, so the crop falls on the sheet's caption strip at the bottom
    image: { src: '/process/mockups-silver-sheet.webp', alt: 'The brand in silver across a flag, banner, plaque, seal, crate, tag, coin, certificate and sack', position: '50% 0%' },
  },
};

export const LOGO = {
  title: 'Logo use',
  variants: [
    { id: 'logo', label: 'Dark backgrounds', note: 'The silver logo.' },
    { id: 'one-color', label: 'Light backgrounds and print', note: 'The one-color logo, in black.' },
  ],
};

// 13 tokens, verbatim
export const GROUND = [
  { name: 'Ink', hex: '#000000', use: 'Logo ground only' },
  { name: 'Void', hex: '#070A0C', use: 'Page ground' },
  { name: 'Basalt', hex: '#121A1F', use: 'Raised surface' },
  { name: 'Slate', hex: '#1E2B33', use: 'Borders and rules' },
  { name: 'Ice', hex: '#E9EEF0', use: 'Light ground', light: true },
];

export const METAL = [
  { name: 'Pewter dark', hex: '#5B5B5C', ratio: '2.9:1', use: 'Hairlines only — never text' },
  { name: 'Pewter', hex: '#858789', ratio: '5.5:1 AA', use: 'Secondary text' },
  { name: 'Silver', hex: '#98999B', ratio: '7.0:1 AAA', use: 'Body text' },
  { name: 'Silver light', hex: '#AEAFB1', ratio: '9.0:1 AAA', use: 'Emphasis' },
  { name: 'Chrome', hex: '#CFCFD1', ratio: '12.8:1 AAA', use: 'Headings, logo' },
];

export const SPICE = [
  { name: 'Rust', hex: '#9A3412', ratio: '2.7:1', use: 'Fills, seals and print. Never text on dark.' },
  { name: 'Spice', hex: '#C2410C', ratio: '3.8:1', use: 'Large marks and large text only.' },
  { name: 'Ember', hex: '#E8822B', ratio: '7.2:1 AAA', use: 'The only spice that can carry meaning.' },
];

export const COLOR = {
  paletteLabel: 'The palette',
  paletteIntro: 'Cool darks, metal from the logo, a little spice.',
  groundLabel: 'Ground',
  groundNote: 'Cool, dark backgrounds',
  metalLabel: 'Metal',
  metalNote: 'From the logo’s metal',
  spiceLabel: 'Spice',
  spiceNote: 'Used sparingly',
  coverageLabel: 'Coverage',
  coverage: [
    { label: 'Ground', value: 85 },
    { label: 'Metal', value: 13 },
    { label: 'Spice', value: 2 },
  ],
};

export const TYPE = {
  examplesLabel: 'Example',
  // One column per voice: the typeface, what it's for, then a small example in use
  voices: [
    {
      id: 'ceremonial',
      voice: 'Ceremonial',
      font: 'Cinzel',
      fontClass: 'type-font--cinzel',
      note: 'The logo and big moments.',
      samples: [
        { className: 'ceremonial-label', text: 'Charter of trade' },
      ],
    },
    {
      id: 'operational',
      voice: 'Operational',
      font: 'IBM Plex Sans',
      fontClass: 'type-font--sans',
      note: 'Everything people read or click.',
      samples: [
        { className: 'operational-title-sm', text: 'Consignment manifest' },
        { className: 'operational-body-sm', text: 'Assayed at origin, sealed until delivery.' },
      ],
    },
    {
      id: 'data',
      voice: 'Data',
      font: 'IBM Plex Mono',
      fontClass: 'type-font--mono',
      note: 'Codes, numbers and statuses.',
      samples: [
        { className: 'data-row', text: 'MM-114-Δ  ·  12.480 kg' },
        { className: 'data-tag', text: 'Guarantee active', status: true },
      ],
    },
  ],
};

export const CLOSE = {
  tagline: 'Spice · Trade · Influence',
};
