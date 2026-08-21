# Life in Japan — Design Direction

## Three Directions Considered

### Approach 1 — Paper Lantern Editorial
A quiet, tactile travel journal with rice-paper warmth, ink-blue typography, terracotta signals, and cinematic photography. The page should feel like a beautifully printed field note that happens to move.

Probability: 0.07

### Approach 2 — Neon Rail After Dark
A midnight city guide with electric signage, animated route lines, and luminous transit-inspired wayfinding. Energetic and urban, but intentionally held in reserve so the page does not default to a familiar cyber aesthetic.

Probability: 0.03

### Approach 3 — Minimal Shrine Index
A calm monochrome archive with strict typography, generous negative space, and tiny red registration marks. Museum-like and highly restrained, with motion kept to subtle fades.

Probability: 0.09

## Selected Approach — Paper Lantern Editorial

### Design Movement
Contemporary Japanese editorial design blended with independent travel publishing, analogue film photography, and the materiality of a hand-bound field journal.

### Core Principles
1. **Observe before explaining.** The page leads with atmosphere, then gives context in compact, confident fragments.
2. **Make movement feel physical.** Sections enter from alternating left and right as if pages are being pulled into focus.
3. **Use restraint as contrast.** Large quiet fields make the terracotta signal, image crops, and micro-interactions feel intentional.
4. **Keep the future visible.** Placeholder modules are designed as editorial frames, ready for real assets, embedded video, and quiz content later.

### Color Philosophy
Rice-paper cream is the page’s breathing room; ink blue is the dependable reading color; moss green introduces a grounded sense of place; terracotta red is reserved for wayfinding, active states, and small moments of warmth. The palette should feel collected from a train ticket, a shrine stamp, and a rainy street rather than generated from a gradient.

### Layout Paradigm
A vertical scroll journal with asymmetric chapter headers, offset media frames, and a narrow fixed chapter rail. The composition avoids a centered marketing stack: text sits on one side, imagery cuts across the other, and section labels behave like marginalia.

### Signature Elements
- A slim vertical chapter rail with a terracotta progress bead and numbered sections.
- Framed media cards with slightly imperfect paper shadows and small registration marks.
- A recurring brushline divider that appears between chapters and reacts subtly to scroll position.

### Interaction Philosophy
Interactions should clarify the page’s story, not compete with it. Buttons lift by a few pixels, media frames drift gently, and reveal animations use short, directional motion. Every placeholder says what will eventually live there so a future asset swap is obvious.

### Animation
Use scroll-triggered reveals with `opacity` and `transform` only, alternating from left and right. Stagger grouped content by 60ms. Let the hero’s ink wash float slowly, keep the progress bead responsive to reading position, and use a soft 180–280ms ease-out for buttons and hover states. Respect `prefers-reduced-motion` by removing drift and reveal offsets while retaining contrast and focus states.

### Typography System
Display: **Cormorant Garamond**, using italic and roman pairings for a literary headline. Body and interface: **Manrope**, with 500–700 weights for compact labels and navigation. Headline hierarchy should be oversized but not shouty; supporting copy stays at 16–19px with generous line height. Use all-caps micro-labels sparingly with wide tracking.

### Brand Essence
A living field guide to everyday Japan for curious first-time visitors and future residents, told through atmosphere, useful context, and room for personal stories. Personality: **observant, warm, quietly adventurous**.

### Brand Voice
Headlines sound like a note from someone who has just noticed something worth sharing. CTAs are direct and inviting, never salesy. Microcopy is specific, lightly poetic, and avoids generic tourism language.

Example headline: “Japan is not one story. Start with the one you can walk into.”

Example CTA: “Open the field guide →”

### Wordmark & Logo
Use the generated brush-mark symbol as the recurring brand stamp. Pair it with a custom-feeling stacked wordmark: “LIFE / IN JAPAN” in Cormorant Garamond with a fine terracotta rule, never a default logo lockup.

### Signature Brand Color
**Torii Terracotta — #C65A43.** It is warm without feeling loud, recognizable against cream and ink blue, and tied to the threshold motif that runs through the page.

## Content Notes From Voice Note

The first delivery should stay intentionally simple: a narrative landing page with paragraph placeholders, an embedded-video placeholder, image placeholders that can be swapped later, and a basic quiz teaser with one question and selectable options. Future iterations can add multiple question types, shuffled datasets, comments, and personal-story submissions.
