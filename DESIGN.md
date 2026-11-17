# Design

## World

Hangline’s small-batch shop, translated onto meto's lamps: sage paper with a pin-dot grid, a forest-green script mark, garments replaced by line elevations of sconces and throws. Cool daylight on cotton-paper, not limestone benches and not a purple SaaS dashboard.

Light: even showroom daylight. The site is light because the rack sits on that paper.

## Type

- Mark: **Yellowtail** — the Hangline script, now spelling meto.
- Display: **Instrument Serif** italic — drop titles and section heads.
- Body / UI: **Inter** — labels, nav, prices. Numerals in money are tabular.

## Color

- Ground `limestone` `#e8ece6` (Hangline sage paper)
- Ink `pitch` `#2f4034`
- Panel `vellum` `#f2f4ef`
- Forest `oxide` `#2f4034` (primary actions, ticker, links)
- Fitting `fitting` `#3e5444` (lamp fills)
- Danger `ember` `#a2403b`
- Rule `hairline` `#d3d3cd`
- Muted `muted` `#5c645d`

`--ns-primary` and `--ns-accent` for the assistant are forest, dark enough for white text.

## Components

- Centered script mark; tracked uppercase nav split left and right.
- Outline pills for actions; filled forest only on hover.
- Product tiles are pale rounded fields with a hanging drop-shadow, not nested cards.
- Confirmation dialogs stay paper sheets: question, sentence, definition list, two verbs named after the act.
- Footer is a forest ticker bar using the existing shop line, not new copy.
- Product marks remain geometric SVG elevations, not stock photos.

## Motion

One authored moment: the run timeline row easing in when a receipt lands. Everything else is instant.
