
const menuNavegacao = document.querySelector('.menu');

// Fecha ao clicar em um link do menu.
menuNavegacao.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', () => {
        menuNavegacao.removeAttribute('open');
    });
});

// Fecha ao clicar fora do menu.
document.addEventListener('click', (evento) => {
    if (!menuNavegacao.contains(evento.target)) {
        menuNavegacao.removeAttribute('open');
    }
});

// Fecha ao apertar a tecla Esc.
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
        menuNavegacao.removeAttribute('open');
    }
});