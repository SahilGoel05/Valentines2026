// === State ===
let phase = 1;
let rejectionCount = 0;

// === Phase 1: Guilt Trip Messages ===
const guiltMessages = [
    "Are you suuuure? 🥺",
    "But I already started planning...",
    "I was gonna wear the nice outfit...",
];

// === DOM References ===
const counterEl = document.getElementById('rejection-counter');
const subtitleEl = document.getElementById('subtitle');

// === Core Handlers ===
function handleYes() {
    phase = 5;
    showPhase('celebration');
    startConfetti();
    startFloatingHearts();
    // Hide the rejection counter
    counterEl.style.display = 'none';
    // Show rejection note
    document.getElementById('rejection-note').textContent =
        `Rejected me ${rejectionCount} time${rejectionCount !== 1 ? 's' : ''} tho????`;
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

    if (rejectionCount <= 3) {
        subtitleEl.textContent = guiltMessages[rejectionCount - 1];
    }

    if (rejectionCount === 3) {
        setTimeout(() => {
            phase = 2;
            showPhase('captcha');
        }, 1000);
    }
}

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

// === Utilities ===
function updateCounter() {
    counterEl.innerHTML = `Rejection Attempts: ${rejectionCount} <img src="images/rejection.jpg" alt="" class="counter-img">`;
    counterEl.style.display = '';
}

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

// === Phase 2: Captcha ===
const captchaImages = [
    { src: 'images/memory1.jpg', correct: true, label: 'Memory 1' },
    { src: 'images/memory2.jpg', correct: true, label: 'Memory 2' },
    { src: 'images/memory3.jpg', correct: true, label: 'Memory 3' },
    { src: 'images/decoy1.jpg', correct: false, label: 'Decoy 1' },
    { src: 'images/decoy2.jpg', correct: false, label: 'Decoy 2' },
    { src: 'images/decoy3.jpg', correct: false, label: 'Decoy 3' },
    { src: 'images/decoy4.jpg', correct: false, label: 'Decoy 4' },
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
        msgEl.textContent = 'Finally!!!!';
        msgEl.style.color = '#FF6B8A';
        setTimeout(() => {
            phase = 3;
            showPhase('loading');
            startLoadingBar();
        }, 2000);
    } else {
        // Wrong — shake and reset
        grid.classList.add('shake');
        msgEl.textContent = "Open your eyes dumbass. Try again.";
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
    showToast('Nice try. Finish the captcha first.');
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
        msg.textContent = 'Try again.';
    }, totalDelay + 2000);

    // Transition to Phase 4
    setTimeout(() => {
        phase = 4;
        subtitleEl.innerHTML = '<img id="hero-image" src="images/hero.jpg" alt="Us" class="hero-image">';
        showPhase('question');
    }, totalDelay + 4000);
}

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
