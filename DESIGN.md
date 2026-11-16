# Design

## World

A north-lit metal shop that makes lamps: cool limestone benches, oxidized copper, brass fittings, ink drawings pinned with clips. Not a cream-and-terracotta boutique and not a purple SaaS dashboard.

Light: cool daylight on stone, tungsten on metal. The site is light because the work happens on a desk in that room.

## Type

- Display: **Bodoni Moda** — engraved plaque lettering on a lamp maker's door.
- Body / UI: **Libre Franklin** — workshop labels and invoices.
- Numerals in money and versions are tabular.

## Color

- Ground `limestone` `#d5dbd6`
- Ink `pitch` `#121916`
- Panel `vellum` `#eef1ee`
- Verdigris `oxide` `#2c5749` (primary actions, links)
- Brass `fitting` `#8d7040` (rare, for live agent status)
- Danger `ember` `#8a2f2a`
- Rule `hairline` `#b7c0ba`

`--ns-primary` and `--ns-accent` for the assistant are oxide, dark enough for white text.

## Components

- Hairline rules, not cards-in-cards.
- 12px corners on panels; pills only on small status chips.
- Confirmation dialogs are paper sheets: question, sentence, definition list, technical details, two verbs named after the act.
- Product marks are geometric SVG elevations, not stock photos.

## Motion

One authored moment: the run timeline row easing in when a receipt lands. Everything else is instant.
