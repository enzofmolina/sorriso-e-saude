// Busca os elementos do carrossel depois que o HTML foi carregado (defer).
const carrossel = document.querySelector('.carrossel');
const container = document.querySelector('.carrossel-container');
const indicadores = container.querySelectorAll('.indicador');
const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');

// Cada foto ocupa uma largura inteira do carrossel.
// scrollTo atua somente nessa faixa horizontal, sem mover a página.
function irParaImagem(indice) {
    carrossel.scrollTo({
        left: indice * carrossel.clientWidth,
        behavior: reduzirMovimento.matches ? 'instant' : 'smooth'
    });
}

// data-slide informa o destino de cada seta e de cada bolinha, começando em 0.
container.querySelectorAll('[data-slide]').forEach((botao) => {
    botao.addEventListener('click', () => {
        irParaImagem(Number(botao.dataset.slide));
    });
});

// A posição real também muda quando a pessoa desliza com o dedo no celular.
// Por isso, atualizamos as bolinhas ao rolar, e não apenas ao clicar.
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
