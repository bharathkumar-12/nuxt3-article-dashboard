# Design System Specification: Editorial Glassmorphism

## 1. Overview & Creative North Star
**Creative North Star: "The Ethereal Observer"**

This design system moves away from the rigid, "boxed-in" nature of traditional web layouts. Instead, it treats the Nuxt 3 interface as a high-end digital lens—a sophisticated, multi-layered environment where content floats within a deep, atmospheric space. 

By leveraging intentional asymmetry and shifting tonal depths, we break the "template" look. We emphasize an editorial hierarchy where whitespace is a functional element, and glass surfaces provide a sense of futuristic tangibility. The goal is to make the reader feel they are interacting with a premium, cutting-edge publication rather than a standard blog.

---

## 2. Colors & Surface Logic
The palette is rooted in deep indigo and slate, providing a low-light environment that allows neon accents to guide the eye without overwhelming the senses.

### Surface Hierarchy & Nesting
To achieve a high-end feel, we abandon flat UI. Depth is created through **Tonal Layering**:
- **Base Layer:** `surface` (#0b1326). This is the infinite void.
- **Sectioning:** Use `surface_container_low` (#131b2e) for large structural areas.
- **Interactive Layers:** Use `surface_container_highest` (#2d3449) for cards or elements that need to pop.

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined by:
1.  **Background Shifts:** Placing a `surface_container_high` element on a `surface` background.
2.  **Tonal Transitions:** Using the `0.35rem` to `1rem` spacing scale to let the background "breath" between content blocks.

### The Glass & Gradient Rule
Floating elements (Modals, Navbars, Featured Cards) must utilize **Glassmorphism**:
- **Background:** `surface_variant` (#2d3449) at 60% opacity.
- **Effect:** `backdrop-filter: blur(12px)`.
- **Accent:** Use a subtle linear gradient for CTA backgrounds transitioning from `primary` (#c0c1ff) to `primary_container` (#4446d2) at a 135-degree angle.

---

## 3. Typography: The Editorial Voice
We use **Manrope** exclusively. Its geometric yet approachable structure provides the "tech-forward" personality required for a high-end Nuxt blog.

*   **Display Scale (The Hook):** Use `display-lg` (3.5rem) for hero titles. Apply a slight negative letter-spacing (-0.02em) to create a tight, professional editorial look.
*   **Headline Scale (The Narrative):** `headline-md` (1.75rem) should be used for article headers, utilizing `on_surface` (#dae2fd) to ensure maximum legibility against the dark background.
*   **Body Scale (The Substance):** `body-lg` (1rem) is our workhorse. Ensure a line-height of 1.6 to maintain a sophisticated, breathable reading experience.
*   **Label Scale (The Metadata):** Use `label-md` in `tertiary` (#2fd9f4) for tags or categories to provide that "neon accent" touchpoint.

---

## 4. Elevation & Depth
Depth in this system is a result of light physics, not drop-shadow presets.

*   **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` section. This creates a "recessed" look that feels integrated into the UI.
*   **Ambient Shadows:** For elevated elements (like a floating navigation bar), use a multi-layered shadow:
    *   `box-shadow: 0 10px 40px rgba(7, 0, 108, 0.15);` (using a tinted version of `on_primary_fixed`).
*   **The Ghost Border:** If a boundary is required for accessibility, use a `outline_variant` (#454652) at **15% opacity**. It should be felt, not seen.
*   **Edge Highlight:** For glass containers, apply a 1px top-border using `primary` (#c0c1ff) at 10% opacity to simulate light catching the top of a glass pane.

---

## 5. Components

### Buttons
*   **Primary:** A glass container with a `primary_container` fill. On hover, increase the `backdrop-blur` and shift the background to `primary`.
*   **Secondary:** No fill. Use a "Ghost Border" and `primary` text.
*   **Micro-interaction:** On click, a subtle `scale(0.98)` transition (200ms ease-out).

### Cards & Lists
*   **Cards:** Strictly no dividers. Separate content using `spacing-5` (1.7rem) or by nesting a `surface_container_highest` block within a `surface_container`.
*   **Hover State:** Upon hover, the card's backdrop opacity should increase by 10%, and the "Ghost Border" should brighten to 30% opacity.

### Navigation Bar (The Glass Header)
*   **Styling:** Positioned at the top, `surface` at 70% opacity with a heavy `backdrop-blur`. 
*   **Bottom Border:** Use a 1px `outline_variant` at 10% opacity to define the edge against scrolling content.

### Input Fields
*   **State:** Background should be `surface_container_lowest`. When focused, the "Ghost Border" transitions to a 1px `tertiary` (#2fd9f4) glow.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts. A 2-column grid where one column is 60% and the other is 40% creates a modern editorial feel.
*   **Do** use `tertiary` (#2fd9f4) sparingly—only for critical interaction points or high-level categorization.
*   **Do** implement smooth `fade-in-up` animations (duration: 600ms) for page transitions in Nuxt.

### Don’t:
*   **Don’t** use pure black (#000000) or pure white (#ffffff). Use the provided `surface` and `on_surface` tokens to maintain the deep indigo atmosphere.
*   **Don’t** use traditional "Drop Shadows" with high opacity. They break the glass illusion.
*   **Don’t** use standard 1px solid borders to separate list items. Use vertical space (`spacing-4`) to let the content sit naturally.
*   **Don’t** clutter the screen. If a section feels "busy," increase the spacing token by one level.