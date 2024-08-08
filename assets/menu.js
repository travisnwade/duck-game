document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const menu = document.getElementById('menu');
    let menuOpen = false;

    menuIcon.addEventListener('click', function() {
        if (menuOpen) {
            menu.style.display = 'none';
            menuIcon.src = 'assets/menu-open.png';
        } else {
            menu.style.display = 'flex';
            menuIcon.src = 'assets/menu-close.png';
        }
        menuOpen = !menuOpen;
    });
});
