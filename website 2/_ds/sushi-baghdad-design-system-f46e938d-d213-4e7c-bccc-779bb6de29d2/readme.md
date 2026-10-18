# Sushi Baghdad — Design System v1.0

**Japan, discovered in Baghdad.**

Sushi Baghdad is a cloud kitchen in Baghdad serving Japanese food. The product is a
mobile-first ordering experience with a cultural layer wrapped around it: every order can
open a small window into Japanese culture — a word, a riddle, a piece of art, a story.

The brand's own summary of the split:

> Sushi Baghdad is Iraqi. Sushi originates in Japan. The brand celebrates the meeting of
> cultures without pretending they are interchangeable.

Three content labels carry that everywhere in the UI: **FROM JAPAN**, **FROM BAGHDAD**,
**TOGETHER**.

Positioning lines in use: *Tokyo technique. Baghdad energy.* / *More than sushi. A shared
story.* / *أكثر من سوشي. قصة تجمعنا.* / *もっと美味しく、一緒に。* / Logo strapline:
*BAGHDAD FLAVOURS. JAPANESE SOUL.*

## Sources this system was built from

| Source | Path | Notes |
| --- | --- | --- |
| Brand sheet, "Sushi Baghdad Design System v1.0" | `uploads/ds.png` (1312×1199 PNG) | The ground truth. Palette, type hierarchy, icon style, mascot expressions, patterns, photography direction, content modules, mobile UI example, tone-of-voice words, taglines. |
| Logo mark | `uploads/sb logo.jpg` (150×150 JPG) | Mascot-in-a-circle mark. |
| Written brief | Chat (brand story + a 25-point interaction system spec) | Nav, loaders, menu, riddles, word of the day, collectibles, secret menu, mascot, order journey, gamification, accessibility. |

No codebase, Figma file or slide deck was provided. **Every raster asset in `assets/` was
cut programmatically out of `uploads/ds.png`, so it inherits that sheet's resolution** —
see *Asset caveats* at the bottom.

## Products represented

1. **Ordering app (mobile-first web)** — the primary surface. Home, Menu, product sheet,
   Basket/Checkout, Order tracking, Play/Learn/Discover, Profile & Rewards.
   → `ui_kits/app/`
2. **Marketing / landing site (responsive)** — the editorial brand story, menu teaser and
   cultural sections, taken from the sheet's hero panels. → `ui_kits/site/`
3. **Installable PWA** — the same ordering app as a mobile web app: manifest, service worker,
   offline shell, install prompt, safe-area layout. → `ui_kits/pwa/`

There is no back-of-house/kitchen surface in the source, so none was invented.

---

## CONTENT FUNDAMENTALS

**Voice words, straight off the sheet:** Friendly, Confident, Curious, Cultural, Modern,
Playful, Respectful, Inclusive, Simple, Human.

**Sentence shape.** Short declaratives, often fragments, stacked as separate lines rather
than joined with commas. The rhythm is *statement — statement — turn*:

> Some days you come for the sushi.
> Some days you discover something new.
> And sometimes, you just want really good food delivered to your door.

Two-beat headline pairs are the house move: *Tokyo technique. Baghdad energy.* /
*Different places. Same table.* / *Two cultures. A richer story.* Use them for section
openers; never write a third beat.

**Person.** "We" for the brand, "you" for the customer. The brand explains itself in the
first person plural and never refers to itself in the third person inside product copy.

**Casing.** Sentence case for headlines and body. ALL-CAPS with wide tracking
(`--track-eyebrow`) only for eyebrow labels: `FROM JAPAN`, `TWO CULTURES A RICHER STORY.`,
`FOOD PEOPLE CULTURE CURIOSITY COMMUNITY`. Never all-caps a sentence.

**Trilingual pairing.** English and Arabic sit as a pair, Arabic below or beside, at
comparable size — Arabic is not a subtitle. Japanese appears when the thing itself is
Japanese (a dish, a word, a phrase), with romanisation, then Arabic meaning, then English
meaning, then context. Module titles run bilingual as a rule:

- `Riddle of the Day` / `لغز اليوم`
- `Word of the Day` / `كلمة اليوم`
- `Your Collection` / `مجموعتك`
- `From Japan` / `من اليابان` · `From Baghdad` / `من بغداد`

**Iraqi microcopy** is colloquial Baghdadi, used for the mascot and playful states, never
for functional labels: `هسه نحچي.` · `قريب 😂` · `خوش اختيار.` · `وين هالغيبة؟` ·
`بعد وحدة؟` · `لقيتها 👀`. Loader copy alternates languages: `Rolling...` ·
`Almost ready...` · `لفّيناها` · `ثواني ونجهزها`.

**Buttons and state copy** are two words at most, and change in place to a past-tense
confirmation: `Add to Basket → Added ✓`, `Save → Saved`, `Learn → Learned ✓`,
`Collect → Collected`, `Answer → Correct / Try again`. Other real labels from the sheet:
`Order Now`, `Tap to reveal`, `Learn More`, `Explore`, `Collect to unlock special rewards`,
`Search for dishes, stories...`, `Loading your sushi...`, `3 / 10`.

**Emoji.** Sparingly, and only inside Iraqi mascot microcopy or a state confirmation
(`😂`, `👀`, `✓`). Never in navigation, dish names, prices, headings or as an icon
substitute.

**Cultural content is sourced, not improvised.** Any Japanese fact, word or artwork carries
attribution fields — Contributor, Source, Location, Artist, Translator/Reviewer — and the UI
shows the credit rather than hiding it. Explain how a word is genuinely used instead of
giving a misleading literal gloss (`いただきます / Itadakimasu — a phrase of gratitude said
before eating`, not "I humbly receive"). Never invent a cultural fact to fill a card, and
never write pseudo-Japanese.

**What not to write:** no exclamation-mark enthusiasm, no "delicious authentic Japanese
cuisine" restaurant boilerplate, no urgency ("Hurry!"), no points-grinding language
("Earn 250 XP!"). Progress is phrased as discovery: `Words learned: 7`, `Art collected:
4/12`, `Riddles solved: 3`, `Hidden finds: 2`.

---

## VISUAL FOUNDATIONS

### Colour

Six base colours, no more (`tokens/colors.css`):

| Token | Hex | Role from the sheet |
| --- | --- | --- |
| `--sb-red` | `#E10606` | Primary Red — brand, highlights, CTA |
| `--sb-red-deep` | `#A10F0F` | Deep Red — headers, emphasis |
| `--sb-white` | `#FFFFFF` | Backgrounds, space |
| `--sb-black` | `#111111` | Text, contrast |
| `--sb-avocado` | `#7A9E3A` | Success, icons, gamification |
| `--sb-grey` | `#F3F4F6` | UI backgrounds, dividers |

Red dominates and it is the only colour allowed to be loud. Avocado green is a *secondary
interactive accent* — successful actions, secondary selection, learning progress, discovery,
rewards — and it must read as avocado: natural, food-like, slightly warm, never neon,
emerald or corporate. `--sb-avocado-deep` (`#5E7C2A`) exists for green text on light
grounds, since `#7A9E3A` at body size falls short on contrast.

Extended neutrals (`--sb-cream #F7F4F0`, greys 200/400/600, `--sb-ink-70`) and two washes
per accent (`--sb-red-050/100`, `--sb-avocado-050/100`) were derived from the panel surfaces
on the sheet; they are tints for grounds, never for text. Body copy runs `--sb-ink-70`,
headings `--sb-black`. Maximum two background colours in any one layout.

### Type

Four families, each with one job (`tokens/typography.css`):

- **Dela Gothic One** — English display only. Heavy, tight, editorial. H1 60/70 on desktop,
  40px mobile. Never body copy, never long lines, never below ~22px.
- **IBM Plex Sans Arabic** — Arabic *and* Latin body/UI. Bold 40/52 for H2, Regular 18/28
  for body, and every label, price, input and nav item.
- **Noto Sans JP** — all Japanese. Medium 28/40 for H3-scale Japanese lines.
- **M PLUS Rounded 1c** — playful microcopy and small labels only, 14/22.

Two type effects carry the brand: the Dela Gothic display stack (2–3 short lines, left
aligned, tight leading) and the wide-tracked uppercase eyebrow. There is no third.

### Layout

Mobile first, one thumb. 16px gutters on mobile, 40px desktop; sections 48px/96px tall;
content max 1120px. Everything sits on an 4px scale (`--sp-*`). Minimum touch target 44px
(`--touch-min`). Desktop is not a stretched phone: grids expand (1 → 2 → 3 columns), white
space grows, artwork gets room, and the interaction model stays identical. The floating nav
is the only fixed element — a pill 16px off the bottom on mobile, top-centre on desktop.
Horizontal swipe rails (categories, dishes, stories, vocabulary) always have a visible
non-swipe alternative.

### Backgrounds and pattern

Grounds are flat white, warm off-white, or `--sb-grey`. **No gradients as decoration** —
the only gradient in the system is a protection scrim under text on photography
(`linear-gradient(transparent, rgba(17,17,17,.55))`). The one graphic element is the
seigaiha-style **wave pattern**, used at **3–8% opacity** as a large background layer behind
the interface (`.sb-wave-bg`, `--pattern-opacity-bg: .05`), plus two supporting textures
from the sheet: chopstick lines and paper texture. Never pattern a glass card, never pattern
behind body copy, never tile every surface. A flat red circle (the *hinomaru* disc) is also
used as a compositional element behind food photography.

### Glass

Frosted glass marks *interactive* surfaces, not every box: nav bar, floating action pills,
reveal cards, sheets, badges over imagery. Recipe (`tokens/glass.css`): `rgba(255,255,255,.70)`
fill, `blur(18px) saturate(140%)`, 1px `rgba(255,255,255,.55)` border, `--shadow-nav`,
generous internal padding, pill or `--r-lg`+ corners. Dark variant `rgba(17,17,17,.62)` over
photography; red variant for an active state. Glass needs something behind it to be worth
using — over flat white it just looks grey, so put pattern, photography or the red disc
underneath.

### Radii

`6 / 10 / 14 / 20 / 28 / pill / circle`. Dish cards and inputs 14px, content modules and
sheets 20px, product sheets and hero panels 28px, all buttons and category pills fully
round, mascot and icon chips circular. Nothing is square-cornered.

### Shadows

Deliberately weak: `--shadow-1/2/3` are neutral-black at 5/7/10% and blur wide. Depth comes
from blur and hairline borders (`--border-hairline: rgba(17,17,17,.10)`), not shadow. One
exception — `--shadow-red` (`0 6px 18px rgba(225,6,6,.22)`) sits under a primary CTA only.
`--shadow-inset-press` gives pressed pills their dent. No coloured glows anywhere else.

### Cards

Three kinds, and that's it:

1. **Dish card** — white, `--r-md`, hairline border, `--shadow-1`, photo top, name/price/
   piece-count, one Add pill.
2. **Content module** — a wash ground (`--sb-red-050` or `--sb-avocado-050`), `--r-lg`, no
   border, bilingual title, one action. Riddle / Word of the Day / Your Collection are these.
3. **Glass card** — translucent, used for reveals and overlays.

Editorial panels (hero, story) are not cards: full-bleed, no border, no shadow.

### Motion

Fast, small, one overshoot at most (`tokens/motion.css`). 90ms press, 160ms hover, 240ms
pill slide and reveals, 420ms card→sheet expand. Default easing
`cubic-bezier(.22,.76,.28,1)`; the active-pill slide uses `--ease-pill` for a single soft
overshoot. **Hover** = colour deepens one step plus a 2px lift; opacity fades are for
imagery only, never for buttons. **Press** = `scale(.965)` plus the inset shadow — shrink,
never bounce. Nothing loops, pulses or glows on idle. `prefers-reduced-motion` collapses
every duration to 1ms and disables scale/lift, and the sushi loader becomes a static
progress state.

The **sushi loader** replaces spinners: a roll assembling (rice → nori → filling → roll), a
row of pieces filling one by one, or a piece rolling across a pill. It runs only as long as
the real action, with rotating microcopy. Never delay an action to show it.

### Photography

Three directions from the sheet, all warm, natural-light, shallow depth of field, no
filters, no grain: **food first** (real, rich, appetising, close), **process & people**
(hands, craft, care), **atmosphere** (warm, modern, authentic table scenes). Illustration
and art direction is separate: contemporary Iraqi artists (Baghdad architecture, saturated),
modern Japanese artists (muted street scenes, sumi-e), and collaboration pieces. Art is
credited in the UI, always.

### Cultural guardrails on imagery

From the sheet's own list: no random cherry blossoms, pagodas, geishas, samurai, or
decorative kanji used as texture. Japanese script appears only when it means something.

---

## ICONOGRAPHY

The brand ships a **custom illustrated icon set**: single-weight, red (`--sb-red`), a mix of
filled and outlined forms, each drawn as a small object rather than a generic glyph — a
nigiri piece for Menu, a game controller for Play, an open book for Learn, a torii gate for
Discover, a map pin for Locations, a person for Account, a gift box for Rewards, and the
mascot head for the brand/profile slot. They sit optically centred in a circular chip
(`--r-circle`) on `--sb-grey` or transparent, and read at 24–32px.

Those eight icons were extracted from the brand sheet to `assets/icons/icon-*.png`
(176×176, white keyed to transparency). **They are raster and low-resolution** — fine at
24–32px, soft above that. Ask the brand for the SVG originals.

- **No icon font** exists in the source, and none was added.
- **No CDN icon library** is used for the eight brand icons — substituting Lucide/Heroicons
  would flatten their illustrated character. For *generic UI chrome* the source doesn't
  cover (chevron, close, plus/minus, search magnifier, share, check, heart, bag), draw the
  glyph inline at 1.75px stroke, `currentColor`, 24px box, round caps — matching the
  outlined half of the brand set. The search magnifier and bag both appear in the sheet's UI
  elements row in exactly that style.
- **Unicode as icon:** only `→` (used on the sheet's Order Now and Explore buttons) and `✓`
  in confirmation labels. Nothing else.
- **Emoji as icon:** never. Emoji is copy, not iconography (see Content Fundamentals).
- **Audio button architecture** exists on Word-of-the-Day cards (a speaker glyph next to the
  Japanese script) for real pronunciation audio later; it is a real control, not decoration.

The **mascot** is iconography in its own right: a red circle, a smiling face under a
hachimaki-style band with the character 木/ホ, in four expressions —
`assets/mascot/mascot-{happy,thinking,wink,curious}.png`. Use one expression per moment:
happy on success, thinking on riddles, wink on easter eggs, curious in empty states.

---

## Index

**Root**
- `Sushi Baghdad App.html` — the publishable build: one self-contained file, all imagery and
  code inlined, no network needed. Compiled from `ui_kits/pwa/standalone.html`; re-run the
  bundler after editing any app source.
- `styles.css` — the single entry point consumers link. `@import` lines only.
- `readme.md` — this file.
- `SKILL.md` — Agent-Skills front matter for use outside this project.
- `thumbnail.html` — homepage tile.

**`tokens/`** — `fonts.css` (Google Fonts import), `colors.css`, `typography.css`,
`spacing.css`, `radius.css`, `elevation.css`, `motion.css`, `glass.css`, `pattern.css`,
`base.css` (element resets + `.sb-eyebrow` / `.sb-jp` / `.sb-ar` / `.sb-micro` / `.sb-rule`).

**`assets/`** — `logo/` (mark, lockup), `mascot/` (4 expressions), `icons/` (8 brand icons),
`patterns/` (wave, chopstick, paper), `imagery/` (food ×3, art ×3, chef portrait, Baghdad
arch, hero roll, collectible card).

**`templates/`**
- `pwa-mobile/` — "Mobile PWA" template: installable mobile shell (manifest, service worker,
  install prompt, offline banner, safe-area layout) composed from this system's components.

**`guidelines/`** — foundation specimen cards for the Design System tab (colour, type,
spacing, radius, elevation, glass, pattern, motion, logo, mascot, icons, imagery, voice).

**`components/`**
- `core/` — `Button`, `IconButton`, `Pill`, `Badge`, `GlassPanel`
- `forms/` — `Input`, `SearchField`, `QuantityStepper`, `Toggle`
- `food/` — `DishCard`, `PriceTag`, `SpiceLevel`, `DishTags`
- `culture/` — `ContentModule`, `RevealCard`, `WordCard`, `StoryCard`, `CollectibleTile`,
  `ArtistCredit`
- `feedback/` — `SushiLoader`, `ProgressTrack`, `StatRow`, `Mascot`, `EmptyState`
- `navigation/` — `NavBar`, `CategoryRail`, `SectionHeader`, `Sheet`

**`ui_kits/`**
- `app/` — mobile ordering app, 6 screens, interactive click-through (`index.html`)
- `site/` — responsive marketing site (`index.html`)
- `pwa/` — the app packaged as an installable PWA: manifest, service worker, app icons,
  install prompt, offline and update states, pull-to-refresh, safe-area insets
  (`index.html`)
- `ds-loader.js` — dev fallback that transpiles component sources in the browser when
  `_ds_bundle.js` has not been compiled yet

## Intentional additions

Everything in `components/` maps to something visible on the brand sheet or named in the
interaction brief. Three wrappers were added for consistency rather than being drawn in the
source, and are flagged here:

- `IconButton` — the sheet shows circular icon chips (bag, menu, audio) but not as a named
  component; this wraps them so the 44px target and press state are consistent.
- `PriceTag` — formats Iraqi dinar as `20K` / `20,000 IQD`, the format used in the brief's
  filters ("Under 20K").
- `StatRow` — the brief lists progress indicators (`Words learned: 7`) without a visual;
  this renders them in the sheet's label style.

## Asset caveats

- Every image was cut from the 1312×1199 brand sheet, then upscaled 2–3×. Sharp at small
  sizes; **not** production-ready for hero use. Vector logo, vector icons and full-resolution
  photography are the top thing to request.
- Fonts load from Google Fonts, which is where the sheet names them, so no substitution was
  made — but no licensed webfont binaries were supplied either.
- The compiler reports "Fonts: none" because the four families load through a Google Fonts
  `@import` rather than local `@font-face` binaries. Consumers still get them from
  `styles.css`.
- The wave pattern is used as the extracted raster tile; the seams are not perfectly
  seamless at very large tile sizes. A vector tile would fix it.
