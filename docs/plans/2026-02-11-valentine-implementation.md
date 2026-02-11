# Valentine Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a multi-phase interactive Valentine's Day website that playfully escalates through guilt trips, a captcha, a fake loading bar, and shrinking/growing buttons before a celebration screen.

**Architecture:** Single-page app with phase-based state machine. All phases render inside one HTML file, JS swaps visibility. No frameworks, no build step.

**Tech Stack:** Plain HTML, CSS, JavaScript. Google Fonts (Poppins, Fredoka, Pacifico). GitHub Pages for hosting.

---

### Task 1: Scaffold Files + Phase 1 (Guilt Trip)

Create the three base files with full Phase 1 functionality: the question, Yes/No buttons, escalating messages on No clicks, rejection counter, and auto-transition to Phase 2 after 5 rejections.

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `script.js`

**Step 1: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Will You Be My Valentine?</title>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&family=Poppins:wght@400;600&family=Pacifico&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="rejection-counter">Rejection Attempts: 0 😔</div>

    <div class="container">
        <!-- Phase 1 & 4: Question Screen -->
        <div id="phase-question" class="phase active">
            <h1>Will you be my Valentine?</h1>
            <p id="subtitle">💖</p>
            <div class="buttons">
                <button id="btn-yes" onclick="handleYes()">Yes</button>
                <button id="btn-no" onclick="handleNo()">No</button>
            </div>
        </div>

        <!-- Phase 2: Captcha (added in Task 2) -->

        <!-- Phase 3: Loading (added in Task 3) -->

        <!-- Phase 4 Modal (added in Task 4) -->

        <!-- Phase 5: Celebration (added in Task 5) -->
    </div>

    <script src="script.js"></script>
</body>
</html>
```

**Step 2: Create `style.css`**

```css
/* === Reset & Base === */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: #FFF5F5;
    color: #4A3040;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

/* === Layout === */
.container {
    text-align: center;
    max-width: 500px;
    width: 90%;
    padding: 2rem;
}

/* === Phase visibility === */
.phase {
    display: none;
    opacity: 0;
    transition: opacity 0.4s ease;
}

.phase.active {
    display: block;
    opacity: 1;
}

/* === Typography === */
h1 {
    font-family: 'Fredoka', sans-serif;
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #4A3040;
}

h2 {
    font-family: 'Fredoka', sans-serif;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #4A3040;
}

#subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    min-height: 1.5em;
}

/* === Buttons === */
.buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

#btn-yes, #btn-no {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0.8rem 2.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid #FF6B8A;
}

#btn-yes {
    background-color: #FF6B8A;
    color: white;
    box-shadow: 0 4px 15px rgba(255, 107, 138, 0.3);
}

#btn-yes:hover {
    background-color: #E8456B;
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 107, 138, 0.4);
}

#btn-no {
    background-color: white;
    color: #FF6B8A;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

#btn-no:hover {
    background-color: #FFF0F3;
    transform: scale(1.05);
}

/* === Rejection Counter === */
#rejection-counter {
    position: fixed;
    top: 1rem;
    right: 1rem;
    font-family: 'Poppins', sans-serif;
    font-size: 0.85rem;
    color: #FF8FA3;
    background: white;
    padding: 0.4rem 0.8rem;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    z-index: 100;
}
```

**Step 3: Create `script.js`**

```javascript
// === State ===
let phase = 1;
let rejectionCount = 0;

// === Phase 1: Guilt Trip Messages ===
const guiltMessages = [
    "Are you suuuure? 🥺",
    "But I already started planning...",
    "I was gonna wear the nice outfit...",
    "I told people I had the best girlfriend...",
    "Okay wait. This feels illegal."
];

// === DOM References ===
const counterEl = document.getElementById('rejection-counter');
const subtitleEl = document.getElementById('subtitle');

// === Core Handlers ===
function handleYes() {
    showPhase('celebration');
}

function handleNo() {
    if (phase === 1) {
        handlePhase1No();
    } else if (phase === 4) {
        handlePhase4No();
    }
}

// === Phase 1 Logic ===
function handlePhase1No() {
    rejectionCount++;
    updateCounter();

    if (rejectionCount <= 5) {
        subtitleEl.textContent = guiltMessages[rejectionCount - 1];
    }

    if (rejectionCount === 5) {
        setTimeout(() => {
            phase = 2;
            showPhase('captcha');
        }, 1000);
    }
}

// === Phase 4 Logic (stub for now) ===
function handlePhase4No() {
    // Will be implemented in Task 4
}

// === Utilities ===
function updateCounter() {
    counterEl.textContent = `Rejection Attempts: ${rejectionCount} 😔`;
}

function showPhase(phaseName) {
    document.querySelectorAll('.phase').forEach(el => {
        el.classList.remove('active');
    });
    const target = document.getElementById(`phase-${phaseName}`);
    if (target) {
        target.classList.add('active');
    }
}
```

**Step 4: Open `index.html` in browser and verify**

- Page shows "Will you be my Valentine?" with Yes and No buttons
- Clicking No cycles through the 5 guilt messages
- Rejection counter in top-right updates on each No click
- After 5th No, nothing visible happens yet (Phase 2 not built) — that's expected
- Clicking Yes does nothing visible yet — that's expected
- Layout is centered, buttons look styled, fonts load

**Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: scaffold files + Phase 1 guilt trip"
```

---

### Task 2: Phase 2 (Custom Captcha)

Add the captcha screen with a 3x2 image grid using placeholder images, toggle selection, submit validation, and transition to Phase 3.

**Files:**
- Modify: `index.html` (add Phase 2 HTML)
- Modify: `style.css` (add captcha styles)
- Modify: `script.js` (add captcha logic)
- Create: `images/` directory with placeholder note

**Step 1: Add Phase 2 HTML to `index.html`**

Replace the `<!-- Phase 2: Captcha (added in Task 2) -->` comment in `index.html` with:

```html
        <!-- Phase 2: Captcha -->
        <div id="phase-captcha" class="phase">
            <h2>🤨 Security Verification</h2>
            <p class="captcha-prompt">To confirm you really want to say no, select all images that represent our love.</p>
            <div id="captcha-grid"></div>
            <p id="captcha-message"></p>
            <div class="buttons">
                <button id="btn-submit-captcha" onclick="submitCaptcha()">Submit</button>
                <button id="btn-no-captcha" onclick="captchaNo()">No</button>
            </div>
        </div>
```

**Step 2: Add captcha styles to `style.css`**

Append to end of `style.css`:

```css
/* === Phase 2: Captcha === */
.captcha-prompt {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    color: #4A3040;
}

#captcha-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-bottom: 1rem;
    max-width: 360px;
    margin-left: auto;
    margin-right: auto;
}

.captcha-item {
    aspect-ratio: 1;
    border-radius: 12px;
    border: 3px solid transparent;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s ease;
    background-color: #FFF0F3;
    display: flex;
    align-items: center;
    justify-content: center;
}

.captcha-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.captcha-item.selected {
    border-color: #FF6B8A;
    box-shadow: 0 0 12px rgba(255, 107, 138, 0.4);
    transform: scale(0.95);
}

.captcha-item:hover {
    transform: scale(1.03);
}

.captcha-item.selected:hover {
    transform: scale(0.95);
}

#captcha-message {
    font-size: 0.9rem;
    min-height: 1.5em;
    margin-bottom: 1rem;
    color: #E8456B;
}

#btn-submit-captcha {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.7rem 2rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid #FF6B8A;
    background-color: #FF6B8A;
    color: white;
    box-shadow: 0 4px 15px rgba(255, 107, 138, 0.3);
}

#btn-submit-captcha:hover {
    background-color: #E8456B;
    transform: scale(1.05);
}

#btn-no-captcha {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.7rem 2rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid #FF6B8A;
    background-color: white;
    color: #FF6B8A;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

/* Shake animation for wrong answer */
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-8px); }
    80% { transform: translateX(8px); }
}

.shake {
    animation: shake 0.4s ease;
}

/* Toast notification */
.toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: #4A3040;
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 200;
}

.toast.show {
    opacity: 1;
}
```

**Step 3: Add captcha logic to `script.js`**

Append to end of `script.js`:

```javascript
// === Phase 2: Captcha ===
const captchaImages = [
    { src: 'images/memory1.jpg', correct: true, label: 'Memory 1' },
    { src: 'images/memory2.jpg', correct: true, label: 'Memory 2' },
    { src: 'images/memory3.jpg', correct: true, label: 'Memory 3' },
    { src: 'images/decoy1.jpg', correct: false, label: 'Decoy 1' },
    { src: 'images/decoy2.jpg', correct: false, label: 'Decoy 2' },
    { src: 'images/decoy3.jpg', correct: false, label: 'Decoy 3' },
];

let selectedCaptcha = new Set();

function buildCaptchaGrid() {
    const grid = document.getElementById('captcha-grid');
    grid.innerHTML = '';
    selectedCaptcha.clear();

    // Shuffle images
    const shuffled = [...captchaImages].sort(() => Math.random() - 0.5);

    shuffled.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'captcha-item';
        item.dataset.index = index;
        item.dataset.correct = img.correct;

        // Use placeholder colored boxes since images aren't ready yet
        // When real images exist, this will show them
        const imgEl = document.createElement('img');
        imgEl.src = img.src;
        imgEl.alt = img.label;
        imgEl.onerror = function () {
            // Fallback: show label text if image doesn't load
            this.style.display = 'none';
            const fallback = document.createElement('span');
            fallback.textContent = img.label;
            fallback.style.fontSize = '0.75rem';
            fallback.style.padding = '0.5rem';
            fallback.style.textAlign = 'center';
            item.appendChild(fallback);
        };
        item.appendChild(imgEl);

        item.addEventListener('click', () => toggleCaptchaItem(item));
        grid.appendChild(item);
    });
}

function toggleCaptchaItem(item) {
    item.classList.toggle('selected');
    const idx = item.dataset.index;
    if (selectedCaptcha.has(idx)) {
        selectedCaptcha.delete(idx);
    } else {
        selectedCaptcha.add(idx);
    }
}

function submitCaptcha() {
    const grid = document.getElementById('captcha-grid');
    const items = grid.querySelectorAll('.captcha-item');
    const msgEl = document.getElementById('captcha-message');

    // Check if exactly the correct items are selected
    let allCorrectSelected = true;
    let anyWrongSelected = false;

    items.forEach(item => {
        const isCorrect = item.dataset.correct === 'true';
        const isSelected = item.classList.contains('selected');

        if (isCorrect && !isSelected) allCorrectSelected = false;
        if (!isCorrect && isSelected) anyWrongSelected = true;
    });

    if (allCorrectSelected && !anyWrongSelected) {
        // Correct!
        msgEl.textContent = 'Verifying emotional damage...';
        msgEl.style.color = '#FF6B8A';
        setTimeout(() => {
            phase = 3;
            showPhase('loading');
            startLoadingBar();
        }, 2000);
    } else {
        // Wrong — shake and reset
        grid.classList.add('shake');
        msgEl.textContent = "Hmm... that's suspicious 🤨 try again.";
        setTimeout(() => {
            grid.classList.remove('shake');
            // Reset selections
            items.forEach(item => item.classList.remove('selected'));
            selectedCaptcha.clear();
        }, 500);
    }
}

function captchaNo() {
    rejectionCount++;
    updateCounter();
    showToast('Nice try. Finish the captcha first. 😏');
}

function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}
```

**Step 4: Update `showPhase` in `script.js` to build captcha grid on transition**

Replace the existing `showPhase` function:

```javascript
function showPhase(phaseName) {
    document.querySelectorAll('.phase').forEach(el => {
        el.classList.remove('active');
    });

    if (phaseName === 'captcha') {
        buildCaptchaGrid();
    }

    const target = document.getElementById(`phase-${phaseName}`);
    if (target) {
        target.classList.add('active');
    }
}
```

**Step 5: Create images directory**

```bash
mkdir -p images
```

**Step 6: Open in browser and verify**

- Click No 5 times — after 5th, captcha screen appears
- 6 items in a 3x2 grid with fallback labels (images not loaded yet)
- Clicking items toggles selection (pink border)
- Wrong selection: grid shakes, "Hmm... that's suspicious" appears, selections reset
- Correct selection (all 3 memories): "Verifying emotional damage..." then nothing yet (Phase 3 not built)
- Clicking the captcha No button: counter increments, toast appears "Nice try. Finish the captcha first."

**Step 7: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: Phase 2 custom captcha with image grid"
```

---

### Task 3: Phase 3 (Fake Loading Bar)

Add the fake loading screen with animated progress bar that dramatically pauses at 99% then reveals "Just kidding."

**Files:**
- Modify: `index.html` (add Phase 3 HTML)
- Modify: `style.css` (add loading bar styles)
- Modify: `script.js` (add loading animation logic)

**Step 1: Add Phase 3 HTML to `index.html`**

Replace the `<!-- Phase 3: Loading (added in Task 3) -->` comment with:

```html
        <!-- Phase 3: Fake Loading -->
        <div id="phase-loading" class="phase">
            <h2 id="loading-title">Processing your response...</h2>
            <div class="progress-container">
                <div id="progress-bar"></div>
            </div>
            <p id="loading-percent">0%</p>
            <p id="loading-message"></p>
        </div>
```

**Step 2: Add loading bar styles to `style.css`**

Append to end of `style.css`:

```css
/* === Phase 3: Fake Loading Bar === */
#phase-loading {
    display: none;
    opacity: 0;
}

#phase-loading.active {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 1;
}

#loading-title {
    margin-bottom: 2rem;
}

.progress-container {
    width: 100%;
    max-width: 350px;
    height: 20px;
    background-color: #FFE0E6;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 0.5rem;
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #FF6B8A, #FF8FA3);
    border-radius: 10px;
    transition: width 0.3s ease;
}

#loading-percent {
    font-size: 1rem;
    font-weight: 600;
    color: #FF6B8A;
    margin-bottom: 1rem;
}

#loading-message {
    font-size: 1.1rem;
    color: #4A3040;
    min-height: 1.5em;
}
```

**Step 3: Add loading bar logic to `script.js`**

Append to end of `script.js`:

```javascript
// === Phase 3: Fake Loading Bar ===
function startLoadingBar() {
    const bar = document.getElementById('progress-bar');
    const percent = document.getElementById('loading-percent');
    const msg = document.getElementById('loading-message');
    const title = document.getElementById('loading-title');

    bar.style.width = '0%';
    percent.textContent = '0%';
    msg.textContent = '';
    title.textContent = 'Processing your response...';

    const steps = [
        { width: 40, delay: 1000, text: 'Analyzing feelings...' },
        { width: 82, delay: 1500, text: 'Consulting the heart committee...' },
        { width: 99, delay: 2000, text: 'Almost done...' },
    ];

    let totalDelay = 500; // initial pause

    steps.forEach(step => {
        setTimeout(() => {
            bar.style.width = step.width + '%';
            percent.textContent = step.width + '%';
            msg.textContent = step.text;
        }, totalDelay);
        totalDelay += step.delay;
    });

    // Dramatic pause at 99%
    setTimeout(() => {
        msg.textContent = '...';
    }, totalDelay);

    // "Just kidding" reveal
    setTimeout(() => {
        bar.style.width = '0%';
        percent.textContent = '💔';
        title.textContent = 'Just kidding.';
        msg.textContent = 'Try again. 😏';
    }, totalDelay + 2000);

    // Transition to Phase 4
    setTimeout(() => {
        phase = 4;
        subtitleEl.textContent = '💖';
        showPhase('question');
    }, totalDelay + 4000);
}
```

**Step 4: Open in browser and verify**

- Go through Phase 1 (5 No clicks) → Phase 2 (solve captcha correctly) → Phase 3 starts
- Loading bar fills: 0% → 40% → 82% → 99%
- Text updates at each step
- Dramatic pause at 99%
- "Just kidding. Try again." appears
- After a moment, returns to the question screen (Phase 4)
- Verify the timings feel right — adjust delays if needed

**Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: Phase 3 fake loading bar with dramatic pause"
```

---

### Task 4: Phase 4 (Error Popups + Button Manipulation)

Add the styled error modal and the shrinking No / growing Yes button logic.

**Files:**
- Modify: `index.html` (add modal HTML)
- Modify: `style.css` (add modal styles + button scaling)
- Modify: `script.js` (implement Phase 4 handler)

**Step 1: Add modal HTML to `index.html`**

Replace the `<!-- Phase 4 Modal (added in Task 4) -->` comment with:

```html
        <!-- Phase 4: Error Modal -->
        <div id="error-modal" class="modal-overlay">
            <div class="modal-box">
                <div class="modal-icon">⚠️</div>
                <h3>ERROR 404</h3>
                <p class="modal-error">'No' not found</p>
                <p class="modal-suggestion">Did you mean 'Yes'?</p>
                <button class="modal-dismiss" onclick="dismissModal()">OK</button>
            </div>
        </div>
```

**Step 2: Add modal styles to `style.css`**

Append to end of `style.css`:

```css
/* === Phase 4: Error Modal === */
.modal-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(74, 48, 64, 0.4);
    justify-content: center;
    align-items: center;
    z-index: 300;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal-overlay.show {
    display: flex;
    opacity: 1;
}

.modal-box {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    max-width: 320px;
    width: 85%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    animation: modalSlideIn 0.4s ease;
}

@keyframes modalSlideIn {
    0% {
        transform: translateY(-40px);
        opacity: 0;
    }
    60% {
        transform: translateY(5px);
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

.modal-icon {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.modal-box h3 {
    font-family: 'Fredoka', sans-serif;
    color: #E8456B;
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
}

.modal-error {
    font-size: 0.95rem;
    color: #4A3040;
    margin-bottom: 0.5rem;
}

.modal-suggestion {
    font-size: 1rem;
    font-weight: 600;
    color: #FF6B8A;
    margin-bottom: 1.5rem;
}

.modal-dismiss {
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 0.6rem 2rem;
    border-radius: 25px;
    border: none;
    background-color: #FF6B8A;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.modal-dismiss:hover {
    background-color: #E8456B;
    transform: scale(1.05);
}
```

**Step 3: Implement Phase 4 logic in `script.js`**

Replace the `handlePhase4No` stub function with:

```javascript
// === Phase 4: Error Modal + Button Scaling ===
let noScale = 1.0;
let yesScale = 1.0;

function handlePhase4No() {
    rejectionCount++;
    updateCounter();
    showErrorModal();
}

function showErrorModal() {
    const modal = document.getElementById('error-modal');
    modal.classList.add('show');
}

function dismissModal() {
    const modal = document.getElementById('error-modal');
    modal.classList.remove('show');

    // Shrink No, grow Yes
    noScale = Math.max(0.2, noScale - 0.1);
    yesScale += 0.1;

    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');

    btnNo.style.transform = `scale(${noScale})`;
    btnYes.style.transform = `scale(${yesScale})`;
}
```

**Step 4: Open in browser and verify**

- Go through Phases 1–3 to reach Phase 4
- Click No: styled modal slides in from top with "ERROR 404: 'No' not found. Did you mean 'Yes'?"
- Click OK to dismiss: No button shrinks, Yes button grows
- Repeat — No gets smaller, Yes gets larger each time
- Rejection counter keeps incrementing
- Eventually click Yes (Phase 5 not built yet so nothing visible — expected)

**Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: Phase 4 error modal with shrinking No / growing Yes"
```

---

### Task 5: Phase 5 (Celebration Screen)

Add the final celebration with confetti canvas animation, floating hearts, pink gradient, and victory text.

**Files:**
- Modify: `index.html` (add Phase 5 HTML)
- Modify: `style.css` (add celebration styles)
- Modify: `script.js` (add confetti animation + celebration trigger)

**Step 1: Add Phase 5 HTML to `index.html`**

Replace the `<!-- Phase 5: Celebration (added in Task 5) -->` comment with:

```html
        <!-- Phase 5: Celebration -->
        <div id="phase-celebration" class="phase">
            <canvas id="confetti-canvas"></canvas>
            <div class="celebration-content">
                <h1 class="celebration-title">YAY!!! 💖</h1>
                <p class="celebration-text">Best decision ever made.</p>
                <p class="celebration-text">Valentine secured.</p>
            </div>
            <div id="floating-hearts"></div>
        </div>
```

**Step 2: Add celebration styles to `style.css`**

Append to end of `style.css`:

```css
/* === Phase 5: Celebration === */
#phase-celebration {
    display: none;
    opacity: 0;
}

#phase-celebration.active {
    display: block;
    opacity: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #FFE0E6, #FF8FA3, #FF6B8A);
    z-index: 400;
    overflow: hidden;
}

#confetti-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.celebration-content {
    position: relative;
    z-index: 401;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
}

.celebration-title {
    font-family: 'Pacifico', cursive;
    font-size: 3.5rem;
    color: white;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    margin-bottom: 1rem;
    animation: celebrateBounce 0.8s ease;
}

.celebration-text {
    font-family: 'Poppins', sans-serif;
    font-size: 1.4rem;
    color: white;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 0.5rem;
    animation: celebrateFadeIn 1s ease forwards;
    opacity: 0;
}

.celebration-text:nth-child(2) {
    animation-delay: 0.5s;
}

.celebration-text:nth-child(3) {
    animation-delay: 1s;
}

@keyframes celebrateBounce {
    0% { transform: scale(0); opacity: 0; }
    60% { transform: scale(1.2); }
    100% { transform: scale(1); opacity: 1; }
}

@keyframes celebrateFadeIn {
    0% { opacity: 0; transform: translateY(15px); }
    100% { opacity: 1; transform: translateY(0); }
}

/* Floating hearts */
#floating-hearts {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 400;
    overflow: hidden;
}

.floating-heart {
    position: absolute;
    font-size: 1.5rem;
    animation: floatUp linear forwards;
    opacity: 0.8;
}

@keyframes floatUp {
    0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0.8;
    }
    100% {
        transform: translateY(-10vh) rotate(360deg);
        opacity: 0;
    }
}
```

**Step 3: Add celebration + confetti logic to `script.js`**

First, update `handleYes` to trigger celebration:

```javascript
function handleYes() {
    phase = 5;
    showPhase('celebration');
    startConfetti();
    startFloatingHearts();
    // Hide the rejection counter
    counterEl.style.display = 'none';
}
```

Then append the confetti and hearts code to end of `script.js`:

```javascript
// === Phase 5: Confetti ===
function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiColors = ['#FF6B8A', '#FF8FA3', '#FFB6C8', '#FFF', '#FFD700', '#E8456B'];
    const pieces = [];

    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 8,
            speedY: Math.random() * 3 + 2,
            speedX: (Math.random() - 0.5) * 2,
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;

            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// === Phase 5: Floating Hearts ===
function startFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    const hearts = ['💖', '💕', '💗', '❤️', '💘', '💝'];

    function spawnHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(heart);

        heart.addEventListener('animationend', () => heart.remove());
    }

    // Spawn hearts repeatedly
    setInterval(spawnHeart, 400);

    // Burst of hearts on start
    for (let i = 0; i < 10; i++) {
        setTimeout(spawnHeart, i * 100);
    }
}
```

**Step 4: Open in browser and verify the full flow**

- Phase 1: Click No 5 times — guilt messages cycle, counter updates
- Phase 2: Captcha appears — select correct items, submit, "Verifying emotional damage..."
- Phase 3: Loading bar fills to 99%, pauses, "Just kidding. Try again."
- Phase 4: Error modals on No, buttons scale, counter keeps going
- Click Yes at any point: full-screen pink gradient, confetti falls, "YAY!!!" bounces in, floating hearts rise, text fades in
- Rejection counter hides on celebration
- Resize browser — confetti canvas resizes

**Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: Phase 5 celebration with confetti and floating hearts"
```

---

### Task 6: Deploy to GitHub Pages

Push to GitHub and enable Pages.

**Files:** None modified — deployment only.

**Step 1: Create GitHub repo (if not already)**

```bash
gh repo create Valentines2026 --public --source=. --push
```

**Step 2: Enable GitHub Pages**

```bash
gh api repos/{owner}/Valentines2026/pages -X POST -f source.branch=main -f source.path=/
```

Or do it manually: go to repo Settings → Pages → Source: Deploy from branch → main → / (root) → Save.

**Step 3: Swap placeholder images**

Replace the files in `images/` with real photos:
- `memory1.jpg`, `memory2.jpg`, `memory3.jpg` — real couple photos
- `decoy1.jpg`, `decoy2.jpg`, `decoy3.jpg` — funny decoy images

```bash
git add images/
git commit -m "feat: add real photos for captcha"
git push
```

**Step 4: Verify live site**

- Visit `https://<username>.github.io/Valentines2026/`
- Walk through all 5 phases end to end
- Test on phone (she'll likely open it on mobile)
- Verify images load correctly in captcha

**Step 5: Final commit if any tweaks needed**

```bash
git add -A
git commit -m "fix: final tweaks for deployment"
git push
```
