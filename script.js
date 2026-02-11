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
