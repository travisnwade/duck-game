document.addEventListener('DOMContentLoaded', function() {
    const menuOpenIcon = document.getElementById('menuOpenIcon');
    const menuCloseIcon = document.getElementById('menuCloseIcon');
    const menu = document.getElementById('menu');

    menuOpenIcon.addEventListener('click', function() {
        menu.style.display = 'flex';
    });

    menuCloseIcon.addEventListener('click', function() {
        menu.style.display = 'none';
    });
});
