document.addEventListener('DOMContentLoaded', function() {
    const countersDiv = document.getElementById('counters');
    const eggCounter = document.getElementById('eggCounter');
    const birdCounter = document.getElementById('birdCounter');

    let countersVisible = false;

    countersDiv.addEventListener('click', function() {
        toggleCounters();
    });

    eggCounter.addEventListener('click', function() {
        toggleCounters();
    });

    birdCounter.addEventListener('click', function() {
        toggleCounters();
    });

    function toggleCounters() {
        if (countersVisible) {
            eggCounter.style.display = 'none';
            birdCounter.style.display = 'none';
            countersDiv.textContent = 'Score';
        } else {
            eggCounter.style.display = 'block';
            birdCounter.style.display = 'block';
            countersDiv.textContent = '';
        }
        countersVisible = !countersVisible;
    }
});
