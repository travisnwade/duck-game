document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const menu = document.getElementById('menu');
    let menuOpen = false;

    menuIcon.addEventListener('click', function() {
        if (menuOpen) {
            menu.classList.remove('open');
            menuIcon.src = 'assets/menu-open.png';
        } else {
            menu.classList.add('open');
            menuIcon.src = 'assets/menu-close.png';
        }
        menuOpen = !menuOpen;
    });
});
