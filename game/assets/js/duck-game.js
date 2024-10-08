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
const chirpSound = new Audio('assets/media/audio/chirp-chirp.mp3'); // Load the chirp sound
const countersDiv = document.querySelector('.counters');
const volumeControlDiv = document.querySelector('.volume-control');
const infoIcon = document.getElementById('infoIcon');
const modal = document.getElementById('modal');
const closeIcon = document.getElementById('closeIcon');
let eggCount = 0;
let birdCount = 0;
let mouseTimeout;
let wanderingInterval;

// Pause variables
let isPaused = false;
let wasPlayingBgMusic = false;
let wasPlayingBirdSound = false;

bgMusic.play();
birdSound.volume = 0.5; // Set bird sound to 50%

document.addEventListener('mousemove', (e) => {
    cursorDuck.style.left = `${Math.min(window.innerWidth - cursorDuck.offsetWidth, Math.max(0, e.pageX - cursorDuck.offsetWidth / 5))}px`;
    cursorDuck.style.top = `${Math.min(window.innerHeight - cursorDuck.offsetHeight, Math.max(0, e.pageY - cursorDuck.offsetHeight / 5))}px`;

    miniDucks.forEach((duck, index) => {
        setTimeout(() => {
            const duckLeft = e.pageX + (index + 1) * 60;
            const duckTop = e.pageY + (index + 1) * 60;
            duck.style.left = `${Math.min(window.innerWidth - duck.offsetWidth, Math.max(0, duckLeft - duck.offsetWidth / 5))}px`;
            duck.style.top = `${Math.min(window.innerHeight - duck.offsetHeight, Math.max(0, duckTop - duck.offsetHeight / 5))}px`;
        }, index * 100);
    });

    clearTimeout(mouseTimeout);
    clearInterval(wanderingInterval);
    mouseTimeout = setTimeout(startWandering, 3000);

    // Check if the cursor is within the volume control div
    const volumeControlRect = volumeControlDiv.getBoundingClientRect();
    if (
        e.pageX >= volumeControlRect.left &&
        e.pageX <= volumeControlRect.right &&
        e.pageY >= volumeControlRect.top &&
        e.pageY <= volumeControlRect.bottom
    ) {
        cursorDuck.style.display = 'none'; // Hide custom cursor
        document.body.style.cursor = 'auto'; // Show default cursor
    } else {
        cursorDuck.style.display = 'block'; // Show custom cursor
        document.body.style.cursor = 'none'; // Hide default cursor
    }
});

function startWandering() {
    wanderingInterval = setInterval(() => {
        miniDucks.forEach((duck) => {
            const randomX = Math.random() * 100 - 50; // Random movement within 50px
            const randomY = Math.random() * 100 - 50;
            const currentX = parseFloat(duck.style.left);
            const currentY = parseFloat(duck.style.top);

            let newX = currentX + randomX;
            let newY = currentY + randomY;

            if (newX < 0 || newX > window.innerWidth - duck.offsetWidth) {
                newX = Math.min(window.innerWidth - duck.offsetWidth, Math.max(0, newX));
                duck.animate([
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(-10px)' },
                    { transform: 'translateY(0)' }
                ], {
                    duration: 500,
                    easing: 'ease-out'
                });
            }

            if (newY < 0 || newY > window.innerHeight - duck.offsetHeight) {
                newY = Math.min(window.innerHeight - duck.offsetHeight, Math.max(0, newY));
                duck.animate([
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(-10px)' },
                    { transform: 'translateY(0)' }
                ], {
                    duration: 500,
                    easing: 'ease-out'
                });
            }

            duck.style.left = `${newX}px`;
            duck.style.top = `${newY}px`;
        });
    }, 3000);
}

function placeEgg() {
    const egg = document.createElement('div');
    egg.classList.add('egg');
    document.body.appendChild(egg);

    let randomX, randomY;
    let validPosition = false;
    const eggSize = 30; // Assuming the egg width and height are 30px

    while (!validPosition) {
        randomX = Math.random() * (window.innerWidth - eggSize);
        randomY = Math.random() * (window.innerHeight - eggSize);

        const eggRect = {
            left: randomX,
            right: randomX + eggSize,
            top: randomY,
            bottom: randomY + eggSize
        };

        const countersRect = countersDiv.getBoundingClientRect();
        const volumeControlRect = volumeControlDiv.getBoundingClientRect();

        if (!isOverlapping(eggRect, countersRect) && 
            !isOverlapping(eggRect, volumeControlRect) && 
            eggRect.bottom < volumeControlRect.top) {
            validPosition = true;
        }
    }

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

function isOverlapping(rect1, rect2) {
    return !(rect1.right < rect2.left ||
             rect1.left > rect2.right ||
             rect1.bottom < rect2.top ||
             rect1.top > rect2.bottom);
}

setTimeout(placeEgg, Math.random() * 12000 + 3000);
startWandering();

function moveBird() {
    const startPosition = Math.random() * window.innerHeight / 2;
    const direction = Math.random() > 0.5 ? 'leftToRight' : 'rightToLeft';

    bird.style.top = `${startPosition}px`;
    bird.style.display = 'block';

    const duration = Math.random() * 5000 + 5000; // Random duration between 5 and 10 seconds

    if (direction === 'leftToRight') {
        bird.style.left = '-100px';
        bird.style.transform = 'scaleX(1)'; // Ensure bird faces right

        bird.animate([
            { left: '-100px' },
            { left: `${window.innerWidth - 100}px` } // Prevent overflow
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
        bird.style.left = `${window.innerWidth - 100}px`; // Start just inside the viewport
        bird.style.transform = 'scaleX(-1)'; // Ensure bird faces left

        bird.animate([
            { left: `${window.innerWidth - 100}px` },
            { left: '-100px' }
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
    cursorDuck.style.left = `${Math.min(window.innerWidth - cursorDuck.offsetWidth, Math.max(0, pageX - cursorDuck.offsetWidth / 2))}px`;
    cursorDuck.style.top = `${Math.min(window.innerHeight - cursorDuck.offsetHeight, Math.max(0, pageY - cursorDuck.offsetHeight / 2))}px`;
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