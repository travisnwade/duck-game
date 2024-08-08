document.addEventListener('DOMContentLoaded', function() {
    const rainContainer = document.getElementById('rainContainer');
    const rainSound = document.getElementById('rainSound');
    
    function createRain() {
        for (let i = 0; i < 100; i++) {
            const rainDrop = document.createElement('div');
            rainDrop.classList.add('rain-drop');
            rainDrop.style.left = `${Math.random() * 100}vw`;
            rainDrop.style.animationDuration = `${Math.random() * 1 + 1}s`;
            rainContainer.appendChild(rainDrop);

            setTimeout(() => {
                rainDrop.remove();
            }, 9000); // Remove rain drop after 9 seconds
        }
    }

    function startRain() {
        createRain();
        rainSound.currentTime = 0; // Reset the sound to the beginning
        rainSound.play();
        rainSound.volume = 0.7;

        setTimeout(() => {
            rainSound.pause();
        }, 9000); // Stop sound after 9 seconds
    }

    // Start the rain effect every 60 seconds
    startRain();
    setInterval(startRain, 60000);
});
