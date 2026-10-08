// Every word and value in the guide lives here, so copy can change without touching layout.
// Color and type values are verbatim from the brand spec (BRAND.md in the site repo).
// Everything else is taken from what the website already does.

export const CHAPTERS = [
  { id: 'process', number: '01', title: 'Process' },
  { id: 'brand', number: '02', title: 'Brand' },
  { id: 'logo', number: '03', title: 'Logo' },
  { id: 'color', number: '04', title: 'Color' },
  { id: 'type', number: '05', title: 'Typography' },
  { id: 'imagery', number: '06', title: 'Imagery' },
];

export const OPENING = {
  // a presentation's title slide, not the website's landing
  company: 'Melange Mercantile',
  deck: 'UX growth project',
  edition: '2026',
  titleLines: ['Building', 'a Brand'],
  subtitle: 'Melange Mercantile: a luxury spice trader set in the world of Dune, from first sketch to finished system.',
  presenterLabel: 'Presented by',
  presenter: 'Tyler Kirkland',
  contentsLabel: 'Contents',
};

// How the brand was made, phase by phase, from the Research page of the Figma file.
// Written plainly, in Tyler's own voice: this part is him talking, not the brand.
const m = (name, alt, width, height) => ({ src: `/process/${name}.webp`, alt, width, height });
// a website I studied for the Phase 5 site: captured at 1440 × 900, captioned with what I liked
const site = (name, url, liked, alt) => ({ ...m(name, alt, 1440, 900), site: url, liked });

export const PROCESS = {
  naming: {
    phase: 'Phase 1 · Research',
    title: 'Naming',
    names: ['House Melange', 'Melange Mercantile', 'Melange Consortium', 'Melange Exchange', 'Melange Reserve', 'The Melange Company'],
    chosen: 'Melange Mercantile',
    chosenLabel: 'Chosen',
    why: [
      'In Dune, the spice everyone fights over has a proper name: melange. It only comes from one desert planet, and the whole universe runs on it.',
      'This company sells to the Great Houses, the most powerful families in that world, so I wanted the name to sound high-end. “Melange” feels a lot more refined than “spice.” “Mercantile” just says what they do: they’re traders.',
    ],
    image: { src: '/photos/reserve.webp', alt: 'Four glass vials of melange in different grades, capped in silver, in a dark stone hall' },
  },
  moodboard: {
    phase: 'Phase 1 · Direction',
    title: 'Moodboard',
    intro: 'I pulled together brands, buildings, film stills and websites that had the feeling I was after: dark, quiet, expensive and a little mysterious.',
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
    phase: 'Phases 2 & 3 · Concept and logo',
    title: 'From sketch to mark',
    steps: [
      {
        label: 'Sketched',
        note: 'About 60 quick pencil ideas. The pillar showed up early.',
        image: m('sketches', 'A sheet of about sixty pencil thumbnails: M letterforms, stars, diamonds, circles and pillars', 1401, 1032),
      },
      {
        label: 'Rendered with AI',
        note: 'I gave AI my strongest sketches to turn into clean versions I could compare.',
        image: m('directions', 'Seven logo directions in gold on black, numbered 1 to 7; number 3 is the pillar', 1536, 1024),
      },
      {
        label: 'Final',
        note: 'The pillar won. It reads as a monument and as an M.',
        image: { src: '/logo/pillar-silver.png', alt: 'The final pillar mark in brushed silver' },
        final: true,
      },
    ],
  },
  metal: {
    phase: 'Phase 4 · Visual identity',
    title: 'Gold or silver',
    options: [
      { label: 'Gold', note: 'Tried first', src: '/process/mockups-gold-sheet.webp', alt: 'The brand in gold across a flag, banner, plaque, seal, crate, tag, coin, certificate and sack' },
      { label: 'Silver', note: 'Where I landed', src: '/process/mockups-silver-sheet.webp', alt: 'The same applications in silver', chosen: true },
    ],
    chosenLabel: 'Chosen',
    line: 'I tried it in gold first because I thought it might look cool. After more brand defining, looking at other examples and trying silver, I decided silver worked better with the direction I wanted for the brand.',
  },
};

export const BRAND = {
  statement: 'A licensed spice trader that quietly supplies the most powerful families in the Dune universe.',
  purposeLabel: 'Purpose',
  purpose: 'Enable the secure movement and stewardship of the Imperium’s most valuable resource.',
  personalityLabel: 'Personality',
  personality: ['Prestigious', 'Authoritative', 'Sophisticated', 'Calculated', 'Elite'],
  archetypesLabel: 'Archetypes',
  archetypes: [
    { name: 'Ruler', note: 'Power, authority, control' },
    { name: 'Sage', note: 'Knowledge, expertise' },
  ],
};

export const LOGO = {
  primaryLabel: 'Primary lockup',
  primaryNote: 'The pillar over the name. Use this version whenever there’s room.',
  variants: [
    { id: 'mark', label: 'Mark', note: 'The pillar on its own, for when the name is already nearby.' },
    { id: 'one-color', label: 'One color', note: 'One flat color, for light backgrounds, seals and print.' },
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
  paletteIntro: 'Cool, dark backgrounds, metal pulled from the logo, and a little spice.',
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
  intro: 'Two kinds of type with a clear line between them. Cinzel is for the logo and big moments. Plex is for everything people actually read.',
  // One column per voice: the typeface, what it's for, and a few real examples
  voices: [
    {
      id: 'ceremonial',
      voice: 'Ceremonial',
      font: 'Cinzel',
      glyph: 'MM',
      glyphClass: 'type-glyph--cinzel',
      note: 'The logo and big moments. Capitals only, never smaller than 24px, never for paragraphs.',
      samples: [
        { className: 'ceremonial-title', text: 'Certified reserve' },
        { className: 'ceremonial-label', text: 'Charter of trade' },
      ],
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    {
      id: 'operational',
      voice: 'Operational',
      font: 'IBM Plex Sans',
      glyph: 'Aa',
      glyphClass: 'type-glyph--sans',
      note: 'Anything people need to read or click. Normal sentence case.',
      samples: [
        { className: 'operational-title-lg', text: 'Consignment manifest' },
        { className: 'operational-body', text: 'Every consignment is assayed at origin and travels under seal until it reaches the House that ordered it.' },
      ],
      alphabet: 'Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm',
    },
    {
      id: 'data',
      voice: 'Data',
      font: 'IBM Plex Mono',
      glyph: '01',
      glyphClass: 'type-glyph--mono',
      note: 'Codes, numbers and statuses.',
      samples: [
        { className: 'data-figure', figure: '99.4', suffix: '%' },
        { className: 'data-row', text: 'MM-114-Δ  ·  12.480 kg' },
        { className: 'data-tag', text: 'Guarantee active', status: true },
      ],
      alphabet: '0123456789  #  %  ·  Δ',
    },
  ],
};

// Taken from the website: its photographs and the grade every one of them shares
export const IMAGERY = {
  intro: 'Every photo on the site is one object, lit from one side, mostly in shadow.',
  ai: 'I built the website itself with AI as my coding partner. These photos come from it.',
  photos: [
    { src: '/photos/tag.webp', alt: 'A silver consignment tag engraved with the pillar, resting on a burlap sack of melange', label: 'One subject', line: 'A single object or structure fills the frame. Never a crowd.' },
    { src: '/photos/crate.webp', alt: 'A shipping crate marked with the pillar in a hazy hangar', label: 'Engraved, never printed', line: 'The pillar is cast, stamped or engraved into the material.' },
    { src: '/photos/seal.webp', alt: 'A black wax seal pressed with the pillar', label: 'Low, hard light', line: 'One source from the side. Most of the frame sits in shadow.' },
    { src: '/photos/banner.webp', alt: 'A silver banner bearing the pillar in a stone hall', label: 'Color held back', line: 'Color turned down, deep blacks, cool shadows and warm light.' },
  ],
};

export const CLOSE = {
  tagline: 'Spice · Trade · Influence',
};
