document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');

    burgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });
}); 