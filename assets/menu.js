document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const menu = document.getElementById('menu');
    const menuContent = document.querySelector('.menu-content');
    let menuOpen = false;

    menuIcon.addEventListener('click', function() {
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menu.addEventListener('click', function(event) {
        if (!menuContent.contains(event.target)) {
            closeMenu();
        }
    });

    function openMenu() {
        menu.classList.add('open');
        menuIcon.src = 'assets/menu-close.png';
        menuOpen = true;
    }

    function closeMenu() {
        menu.classList.remove('open');
        menuIcon.src = 'assets/menu-open.png';
        menuOpen = false;
    }
});
