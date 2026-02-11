# Valentine Website — Implementation Design

## File Structure

```
Valentines2026/
├── index.html          # Structure + Google Fonts links
├── style.css           # All styling
├── script.js           # All logic + state machine
├── images/             # Couple photos + decoys
│   ├── memory1.jpg
│   ├── memory2.jpg
│   ├── memory3.jpg
│   ├── decoy1.jpg
│   ├── decoy2.jpg
│   └── decoy3.jpg
└── docs/plans/         # This file
```

Single-page app — no routing, no reloads. JS swaps content by showing/hiding phase containers. No dependencies, no build step.

Fonts from Google Fonts: Poppins (body), Fredoka (headings), Pacifico (celebration accent).

Hosting: GitHub Pages from `main` branch root.

---

## State Machine

Two core variables: `phase` (1–5) and `rejectionCount` (global, never resets).

### Phase 1 — Guilt Trip (rejections 1–5)

- "Will you be my Valentine?" with Yes and No buttons, both normal-sized.
- Each No click increments `rejectionCount`, swaps subtitle through 5 messages:
  1. "Are you suuuure?"
  2. "But I already started planning..."
  3. "I was gonna wear the nice outfit..."
  4. "I told people I had the best girlfriend..."
  5. "Okay wait. This feels illegal."
- After 5th No, auto-transition to Phase 2.

### Phase 2 — Captcha

- "To confirm you really want to say no, select all images that represent our love."
- Grid of images — 3 real memories (correct), 3+ decoys. Tap to toggle selection.
- Submit: wrong = shake + "Hmm... that's suspicious" + reset. Correct = "Verifying emotional damage..." + 2s pause + transition to Phase 3.
- No button visible but disabled — clicking shows toast: "Nice try. Finish the captcha first."

### Phase 3 — Fake Loading Bar

- Full-screen. Progress: 0% -> 40% (1s) -> 82% (1.5s) -> 99% (2s) -> hang 2s -> "Just kidding. Try again."
- Auto-transitions to Phase 4 after short pause.

### Phase 4 — Error Popups + Button Manipulation

- Back to "Will you be my Valentine?" screen.
- Each No click: styled modal ("ERROR 404: 'No' not found. Did you mean 'Yes'?"). On dismiss: No shrinks 10%, Yes grows 10%.
- Repeats until Yes is clicked.

### Phase 5 — Celebration

- Confetti canvas animation, pink gradient background, floating hearts.
- "YAY!!! Best decision ever made. Valentine secured."

### Rejection Counter

Visible in corner across all phases, always updating: "Rejection Attempts: X"

---

## Visual Design

### Colors

- Background: soft cream `#FFF5F5`
- Primary pink: `#FF6B8A`
- Secondary rose: `#FF8FA3`
- Accent (hover): `#E8456B`
- Text: `#4A3040`

### Buttons

- Rounded (`border-radius: 25px`), generous padding.
- Yes: pink bg, white text. No: white bg, pink border/text.
- Soft box shadow, scale on hover (`1.05`), smooth transitions (`all 0.3s ease`).

### Typography

- Fredoka: main question heading
- Poppins: body text, buttons
- Pacifico: celebration "YAY!!!"

### Animations

- Phase transitions: fade out/in via CSS opacity + JS class toggling
- Captcha wrong answer: horizontal shake
- Loading bar: CSS width transition with easing
- Phase 4 modal: slide-in from top with bounce
- Phase 5 confetti: canvas rectangles with rotation and gravity

### Layout

Centered vertically and horizontally. Max-width ~500px. Mobile-friendly — she'll likely open on her phone.

---

## Phased Build Plan

Build and manually verify each phase before moving to the next:

1. **Phase 1 — Guilt Trip**: Base layout, question + buttons, message progression, rejection counter.
2. **Phase 2 — Captcha**: Image grid with placeholders, toggle, submit validation, transitions.
3. **Phase 3 — Fake Loading Bar**: Progress animation, timing, "Just kidding" reveal.
4. **Phase 4 — Error Popups**: Styled modal, No shrink / Yes grow, dismiss loop.
5. **Phase 5 — Celebration**: Confetti canvas, floating hearts, gradient, final text.
6. **Deploy**: Push to GitHub, enable Pages, swap placeholder images.
