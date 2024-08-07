const cursorDuck = document.getElementById('cursorDuck');
const miniDucks = [
    document.getElementById('miniDuck1'),
    document.getElementById('miniDuck2'),
    document.getElementById('miniDuck3'),
    document.getElementById('miniDuck4'),
    document.getElementById('miniDuck5')
];
const eggCounter = document.getElementById('eggCounter');
const birdCounter = document.getElementById('birdCounter');
const popSound = document.getElementById('popSound');
const bgMusic = document.getElementById('bgMusic');
const bird = document.getElementById('bird');
const birdSound = document.getElementById('birdSound');
const chirpSound = new Audio('assets/chirp-chirp.mp3'); // Load the chirp sound
let eggCount = 0;
let birdCount = 0;
let mouseTimeout;
let wanderingInterval;

bgMusic.play();
birdSound.volume = 0.5; // Set bird sound to 50%

document.addEventListener('mousemove', (e) => {
    cursorDuck.style.left = `${e.pageX}px`;
    cursorDuck.style.top = `${e.pageY}px`;

    miniDucks.forEach((duck, index) => {
        setTimeout(() => {
            duck.style.left = `${e.pageX + (index + 1) * 60}px`;
            duck.style.top = `${e.pageY + (index + 1) * 60}px`;
        }, index * 100);
    });

    clearTimeout(mouseTimeout);
    clearInterval(wanderingInterval);
    mouseTimeout = setTimeout(startWandering, 3000);
});

function startWandering() {
    wanderingInterval = setInterval(() => {
        miniDucks.forEach((duck) => {
            const randomX = Math.random() * 100 - 50; // Random movement within 50px
            const randomY = Math.random() * 100 - 50;
            const currentX = parseFloat(duck.style.left);
            const currentY = parseFloat(duck.style.top);
            duck.style.left = `${currentX + randomX}px`;
            duck.style.top = `${currentY + randomY}px`;
        });
    }, 3000);
}

function placeEgg() {
    const egg = document.createElement('div');
    egg.classList.add('egg');
    document.body.appendChild(egg);

    const eggWidth = 30; // Width of the egg
    const eggHeight = 30; // Height of the egg
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Ensure the egg spawns within the visible area of the screen
    const randomX = Math.random() * (windowWidth - eggWidth);
    const randomY = Math.random() * (windowHeight - eggHeight);

    egg.style.left = `${randomX}px`;
    egg.style.top = `${randomY}px`;

    egg.addEventListener('mouseenter', () => {
        egg.remove();
        eggCount++;
        eggCounter.textContent = `Eggs: ${eggCount}`;
        popSound.currentTime = 0; // Rewind to the start
        popSound.play();
    });

    setTimeout(placeEgg, Math.random() * 12000 + 3000);
}

setTimeout(placeEgg, Math.random() * 12000 + 3000);
startWandering();

function moveBird() {
    const birdWidth = bird.offsetWidth;
    const birdHeight = bird.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Ensure the bird starts within the visible area of the screen
    const startPositionY = Math.random() * (windowHeight - birdHeight);
    const direction = Math.random() > 0.5 ? 'leftToRight' : 'rightToLeft';

    bird.style.top = `${startPositionY}px`;
    bird.style.display = 'block';

    const duration = Math.random() * 5000 + 5000; // Random duration between 5 and 10 seconds

    if (direction === 'leftToRight') {
        bird.style.left = `-${birdWidth}px`;
        bird.style.transform = 'scaleX(1)'; // Ensure bird faces right

        bird.animate([
            { left: `-${birdWidth}px` },
            { left: `${windowWidth + birdWidth}px` }
        ], {
            duration: duration,
            easing: 'linear',
            iterations: 1
        });

        setTimeout(() => birdSound.play(), 250);
        setTimeout(() => {
            bird.style.display = 'none';
            setTimeout(moveBird, Math.random() * 5000 + 15000); // Schedule next flight
        }, duration);
    } else {
        bird.style.left = `${windowWidth + birdWidth}px`;
        bird.style.transform = 'scaleX(-1)'; // Ensure bird faces left

        bird.animate([
            { left: `${windowWidth + birdWidth}px` },
            { left: `-${birdWidth}px` }
        ], {
            duration: duration,
            easing: 'linear',
            iterations: 1
        });

        setTimeout(() => birdSound.play(), 250);
        setTimeout(() => {
            bird.style.display = 'none';
            setTimeout(moveBird, Math.random() * 5000 + 15000); // Schedule next flight
        }, duration);
    }
}

setTimeout(moveBird, Math.random() * 5000 + 15000);

// Dragging functionality for mobile devices
let isDragging = false;

cursorDuck.addEventListener('touchstart', (e) => {
    isDragging = true;
    cursorDuck.style.position = 'absolute';
    moveAt(e.touches[0].pageX, e.touches[0].pageY);

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
});

function onTouchMove(e) {
    if (!isDragging) return;
    moveAt(e.touches[0].pageX, e.touches[0].pageY);
}

function onTouchEnd() {
    isDragging = false;
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
}

function moveAt(pageX, pageY) {
    cursorDuck.style.left = `${pageX - cursorDuck.offsetWidth / 2}px`;
    cursorDuck.style.top = `${pageY - cursorDuck.offsetHeight / 2}px`;
}

// Detect collision between bird and mouse
document.addEventListener('mousemove', () => {
    const birdRect = bird.getBoundingClientRect();
    const cursorDuckRect = cursorDuck.getBoundingClientRect();

    if (
        birdRect.left < cursorDuckRect.right &&
        birdRect.right > cursorDuckRect.left &&
        birdRect.top < cursorDuckRect.bottom &&
        birdRect.bottom > cursorDuckRect.top
    ) {
        bird.style.display = 'none';
        birdCount++;
        birdCounter.textContent = `Birds: ${birdCount}`;
        chirpSound.currentTime = 0;
        chirpSound.play();
    }
});
