document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const menu = document.getElementById('menu');
    const body = document.body;
    let menuOpen = false;

    menuIcon.addEventListener('click', function() {
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menu.addEventListener('click', function(event) {
        const menuContent = document.querySelector('.menu-content');
        if (!menuContent.contains(event.target)) {
            closeMenu();
        }
    });

    function openMenu() {
        menu.classList.add('open');
        menuIcon.src = 'assets/images/menu-close.png';
        body.style.cursor = 'auto'; // Ensure normal cursor when menu is open
        menuOpen = true;
    }

    function closeMenu() {
        menu.classList.remove('open');
        menuIcon.src = 'assets/images/menu-open.png';
        body.style.cursor = 'auto'; // Ensure normal cursor when menu is closed
        menuOpen = false;
    }
});
