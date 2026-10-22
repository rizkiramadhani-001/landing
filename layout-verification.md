# Layout and motion repair, 2026-10-18

Direction: retain MUSH's green agricultural photography and technical readouts.
Energy 2 / Rhythm 2 / Motion 3.

## Decisions

- Landscape hero with viewport-aware height: keeps the introductory action visible on desktop.
- Full-width process frame: gives the image caption and action enough room; on phones the caption sits below the photo.
- Existing system typography and palette: preserves the project's identity and offline rendering.
- GSAP owns photo parallax and hero entrance; existing observers own content reveals. This avoids competing transforms on the same elements.
- Local GSAP and ScrollTrigger: animation works without a CDN connection, including local-file viewing.
- Sticky threshold section remains desktop-only: gives the three reference values a reading pause without pinning the mobile layout.

## Verified

- Build and numeric contract check pass; both edited scripts pass Node syntax checks.
- Browser console: zero errors.
- Responsive iframe viewports at 320, 390, 768 and 1440px: zero horizontal overflow.
- Desktop hero: 504px tall within a 631px viewport; process image retains full container width.
- Scroll changes the photo transform; sticky threshold content stays at top 0 across 100px of scroll.
- Drum switch: B-025 shows 39,4; switching back shows 41,2.
- Next reading inserts 10:52; error/retry and empty/restore update the expected states.
- All three thumbnails change the displayed photo source.
- Carousel next advances 276px; previous returns to 0. Process jump scrolls to its section.
- No broken loaded images or missing hash-anchor targets.

Reduced-motion branches and focus styles retained by inspection. Device-level reduced-motion emulation and screen-reader testing were not performed.
