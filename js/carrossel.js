
const carrossel = document.querySelector('.carrossel');
const container = document.querySelector('.carrossel-container');
const indicadores = container.querySelectorAll('.indicador');
const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');


function irParaImagem(indice) {
    carrossel.scrollTo({
        left: indice * carrossel.clientWidth,
        behavior: reduzirMovimento.matches ? 'instant' : 'smooth'
    });
}

// data-slide
container.querySelectorAll('[data-slide]').forEach((botao) => {
    botao.addEventListener('click', () => {
        irParaImagem(Number(botao.dataset.slide));
    });
});

// desliza com o dedo no celular.
function atualizarIndicadores() {
    const indiceAtual = Math.round(carrossel.scrollLeft / carrossel.clientWidth);
    indicadores.forEach((indicador, indice) => {
        if (indice === indiceAtual) {
            indicador.setAttribute('aria-current', 'true');
        } else {
            indicador.removeAttribute('aria-current');
        }
    });
}

carrossel.addEventListener('scroll', atualizarIndicadores, { passive: true });
window.addEventListener('resize', atualizarIndicadores);
atualizarIndicadores();
