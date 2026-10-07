// Every word and value in the guide lives here, so copy can change without touching layout.
// Colour, type and the six rules are verbatim from the brand spec (BRAND.md in the site repo).
// Everything else is taken from what the website already does.

export const CHAPTERS = [
  { id: 'brand', number: '01', title: 'Brand' },
  { id: 'logo', number: '02', title: 'Logo' },
  { id: 'colour', number: '03', title: 'Colour' },
  { id: 'type', number: '04', title: 'Typography' },
  { id: 'imagery', number: '05', title: 'Imagery' },
];

export const OPENING = {
  wordmarkTop: 'MELANGE',
  wordmarkBottom: 'MERCANTILE',
  label: 'Brand guide',
  edition: 'Edition 01 · 2026',
  cue: 'Scroll',
};

export const BRAND = {
  statement: 'A chartered, discreet source of melange for the Great Houses of the Imperium.',
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
  primaryNote: 'The pillar over the name. Use it wherever there is room.',
  variants: [
    { id: 'mark', label: 'Mark', note: 'The pillar alone, once the name is already in view.' },
    { id: 'one-colour', label: 'One colour', note: 'Flat, for light grounds, seals and print.' },
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
  { name: 'Rust', hex: '#9A3412', ratio: '2.7:1', use: 'The pigment — fills, seals, print, light grounds. Never text on dark.' },
  { name: 'Spice', hex: '#C2410C', ratio: '3.8:1', use: 'The signature — large marks and large text only, never body copy.' },
  { name: 'Ember', hex: '#E8822B', ratio: '7.2:1 AAA', use: 'The glow — the only spice value allowed to carry meaning.' },
];

export const COLOUR = {
  groundLabel: 'Ground',
  groundNote: 'Cold, low chroma',
  metalLabel: 'Metal',
  metalNote: 'Sampled from the logotype · contrast on Void',
  spiceLabel: 'Spice',
  spiceNote: 'Rationed',
  coverageLabel: 'Coverage',
  coverage: [
    { label: 'Ground', value: 85 },
    { label: 'Metal', value: 13 },
    { label: 'Spice', value: 2 },
  ],
  rulesLabel: 'System rules',
};

// The six system rules, verbatim from the Figma spec
export const RULES = [
  { title: 'Spice and metal never share an edge.', body: 'Every spice value against every metal falls between 1.0:1 and 3.3:1, so a ground always separates them.' },
  { title: 'Spice never carries meaning on its own.', body: 'It is the only chroma in the system — pair it with a shape, a weight or a label.' },
  { title: 'Cinzel is capitals only and never below 24px.', body: 'Its hairlines break up on dark grounds at small sizes.' },
  { title: 'Cinzel stays on the mark and on ceremonial moments.', body: 'Plex carries the brand’s speaking voice.' },
  { title: 'Rust never appears as text on a dark ground.', body: 'It is a pigment for fills, seals and light grounds.' },
  { title: 'Coverage holds at roughly 85% ground, 13% metal, 2% spice.', body: 'Spice should read as rationed.' },
];

export const TYPE = {
  intro: 'Two voices with a hard boundary. Ceremonial speaks for Melange Mercantile. Operational speaks to the reader.',
  scaleNote: 'Sizes come from 8 with 4 as a half-step. Line heights are set in pixels, so every line box lands on a 4px multiple.',
  // The 14 styles from the spec, grouped by voice. `sample` is what each line shows.
  voices: [
    {
      id: 'ceremonial',
      label: 'Ceremonial · Cinzel',
      note: 'Capitals only, 24px floor, wide tracking, never running text.',
      styles: [
        { name: 'ceremonial/display', className: 'ceremonial-display', spec: 'Regular · 72 / 80 · 12%', sample: 'Melange' },
        { name: 'ceremonial/title', className: 'ceremonial-title', spec: 'Regular · 48 / 56 · 14%', sample: 'Certified reserve' },
        { name: 'ceremonial/heading', className: 'ceremonial-heading', spec: 'Regular · 32 / 40 · 15%', sample: 'Charter of trade' },
        { name: 'ceremonial/label', className: 'ceremonial-label', spec: 'Bold · 24 / 32 · 18%', sample: 'Spice · Trade · Influence' },
      ],
    },
    {
      id: 'operational',
      label: 'Operational · IBM Plex Sans',
      note: 'Everything that must be read or acted on. Sentence case.',
      styles: [
        { name: 'operational/title-lg', className: 'operational-title-lg', spec: 'Medium · 32 / 40', sample: 'Consignment manifest' },
        { name: 'operational/title', className: 'operational-title', spec: 'Medium · 24 / 32', sample: 'Authentication at origin' },
        { name: 'operational/title-sm', className: 'operational-title-sm', spec: 'Medium · 20 / 28', sample: 'Transit under charter' },
        { name: 'operational/body-lg', className: 'operational-body-lg', spec: 'Regular · 18 / 32 ★', sample: 'Long-form reading and introductions.' },
        { name: 'operational/body', className: 'operational-body', spec: 'Regular · 16 / 28', sample: 'Default body text for sustained reading.' },
        { name: 'operational/body-sm', className: 'operational-body-sm', spec: 'Regular · 14 / 24 ★', sample: 'Captions and secondary detail.' },
        { name: 'operational/label', className: 'operational-label', spec: 'Medium · 12 / 16 · 8%', sample: 'Consignment reference' },
      ],
    },
    {
      id: 'data',
      label: 'Data · IBM Plex Mono',
      note: 'Anything a machine assigned: codes, figures, states.',
      styles: [
        { name: 'data/figure', className: 'data-figure', spec: 'Medium · 20 / 24 · 2%', sample: '99.4%', figure: '99.4' },
        { name: 'data/row', className: 'data-row', spec: 'Regular · 16 / 24 · 4%', sample: 'MM-114-Δ  ·  12.480 kg' },
        { name: 'data/tag', className: 'data-tag', spec: 'Medium · 12 / 16 · 16%', sample: 'Guarantee active' },
      ],
    },
  ],
  footnote: '★ The two sanctioned exceptions to the 8/4 grid. Plex Sans needs 2pt steps through the reading sizes.',
};

// Taken from the website: its photographs and the grade every one of them shares
export const IMAGERY = {
  intro: 'Every photograph on the site is one object, lit from one side, held mostly in shadow.',
  photos: [
    { src: '/photos/tag.webp', alt: 'A silver consignment tag engraved with the pillar, resting on a burlap sack of melange', label: 'One subject', line: 'A single object or structure fills the frame. Never a crowd.' },
    { src: '/photos/crate.webp', alt: 'A shipping crate marked with the pillar in a hazy hangar', label: 'Engraved, never printed', line: 'The pillar is cast, stamped or engraved into the material.' },
    { src: '/photos/seal.webp', alt: 'A black wax seal pressed with the pillar', label: 'Low, hard light', line: 'One source from the side. Most of the frame sits in shadow.' },
    { src: '/photos/banner.webp', alt: 'A silver banner bearing the pillar in a stone hall', label: 'Colour held back', line: 'Colour pulled to 80%, blacks crushed, cool in the shadows, warm only where the light lands.' },
  ],
};

export const CLOSE = {
  tagline: 'Spice · Trade · Influence',
};
