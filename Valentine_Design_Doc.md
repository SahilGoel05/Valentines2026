# 💖 Valentine Website Design Document

## Project: Operation: Be My Valentine

------------------------------------------------------------------------

# 1. Project Overview

This project is an interactive, playful Valentine's Day website designed
to guide the user through a series of escalating "No" responses before
ultimately arriving at a celebratory "Yes" screen.

The experience is structured as a multi-phase interaction with
increasing absurdity and charm.

------------------------------------------------------------------------

# 2. Core Experience Flow

The website operates as a state machine with the following phases:

1.  Phase 1 -- Guilt Trip Counter (5 rejections)
2.  Phase 2 -- Solvable Custom Captcha
3.  Phase 3 -- Fake Loading Bar Trick
4.  Phase 4 -- Infinite System Error + Shrinking "No" / Growing "Yes"
5.  Final Phase -- Celebration Screen

------------------------------------------------------------------------

# 3. Global State Variables

-   `phase` (number)
-   `rejectionCount` (number)
-   `noScale` (number, default 1.0)
-   `yesScale` (number, default 1.0)
-   `captchaSolved` (boolean)

------------------------------------------------------------------------

# 4. Phase 1 -- Guilt Trip Counter

Each click of "No": - Increment `rejectionCount` - Display escalating
playful messages - Keep buttons normal size

### Message Progression Example

1.  "Are you suuuure? 🥺"
2.  "But I already started planning..."
3.  "I was gonna wear the nice outfit..."
4.  "I told people I had the best girlfriend..."
5.  "Okay wait. This feels illegal."

After 5 rejections → transition to Phase 2.

------------------------------------------------------------------------

# 5. Phase 2 -- Custom Captcha (Solvable)

Prompt: \> "To confirm you really want to say no, select all images that
represent our love."

-   6--9 images total
-   3 correct images (memories, hearts, meaningful symbols)
-   3+ decoy images (random/funny items)

If incorrect: \> "Hmm... that's suspicious 🤨 try again."

If correct: \> "Verifying emotional damage..."

Transition to Phase 3.

------------------------------------------------------------------------

# 6. Phase 3 -- Fake Loading Bar

Display: \> "Processing your response..."

Animated progress: 0% → 40% → 82% → 99% Pause dramatically.

Final message: \> "Just kidding. Try again."

Transition to Phase 4.

------------------------------------------------------------------------

# 7. Phase 4 -- Infinite System Error + Button Manipulation

Each click of "No":

1.  Show popup: ERROR 404: 'No' not found\
    Did you mean 'Yes'?

2.  After dismiss:

    -   Shrink "No" button by \~10%
    -   Grow "Yes" button by \~10%
    -   Increment `rejectionCount`
    -   Update counter display

This repeats until "Yes" is clicked.

------------------------------------------------------------------------

# 8. Persistent Rejection Counter

Always visible: \> Rejection Attempts: X 😔

The counter continues increasing across all phases.

------------------------------------------------------------------------

# 9. Final Phase -- Celebration Screen

Triggered when "Yes" is clicked.

Effects: - Confetti animation - Pink gradient background - Floating
hearts - Large celebratory text:

> "YAY!!! 💖\
> Best decision ever made.\
> Valentine secured."

Optional Enhancements: - Reveal date details - Animated envelope -
Hidden personal message - Screenshot prompt

------------------------------------------------------------------------

# 10. Visual Design Direction

## Color Palette

-   Blush pink
-   Soft cream
-   Warm pastel tones

## Fonts

-   Poppins
-   Fredoka
-   Quicksand
-   Pacifico (accent)

## UI Styling

-   Rounded buttons
-   Soft box shadows
-   Subtle hover scaling
-   Smooth transitions

------------------------------------------------------------------------

# 11. Technical Architecture Suggestion

Use a clean phase-based logic structure:

``` javascript
if (phase === 1) handleGuiltTrip();
if (phase === 2) showCaptcha();
if (phase === 3) showLoading();
if (phase === 4) systemErrorMode();
```

Each "No" click:

``` javascript
rejectionCount++;
updateCounter();
```

Transitions:

``` javascript
if (rejectionCount === 5 && phase === 1) phase = 2;
if (captchaSolved) phase = 3;
if (loadingFinished) phase = 4;
```

------------------------------------------------------------------------

# 12. Tone Guidelines

The experience should feel: - Playful - Charming - Lighthearted -
Clearly joking

Avoid making it feel manipulative or pressuring. The humor and absurdity
should be obvious.

------------------------------------------------------------------------

# 13. Future Enhancements

-   Sound effects (pop, error buzz, confetti burst)
-   Subtle screen shake on error
-   Progressive background changes
-   Heart particle effects

------------------------------------------------------------------------

# 💘 End of Design Document

Operation: Be My Valentine is officially over-engineered. Mission
status: Adorably unstoppable.
