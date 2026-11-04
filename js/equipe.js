// Carrossel da equipe
(() => {
    const faixa = document.querySelector('.equipe-faixa');
    if (!faixa) return;

    const secao = faixa.closest('.equipe-secao');
    const bolinhas = secao.querySelectorAll('.equipe-bolinha');
    const total = bolinhas.length;
    const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');

    function slideAtual() {
        return Math.round(faixa.scrollLeft / faixa.clientWidth);
    }

    function irPara(indice) {
        const alvo = (indice + total) % total;
        faixa.scrollTo({
            left: alvo * faixa.clientWidth,
            behavior: reduzirMovimento.matches ? 'auto' : 'smooth'
        });
    }

    function atualizarBolinhas() {
        const atual = slideAtual();
        bolinhas.forEach((bolinha, i) => {
            if (i === atual) {
                bolinha.setAttribute('aria-current', 'true');
            } else {
                bolinha.removeAttribute('aria-current');
            }
        });
    }

    secao.querySelector('.equipe-seta.anterior').addEventListener('click', () => irPara(slideAtual() - 1));
    secao.querySelector('.equipe-seta.proxima').addEventListener('click', () => irPara(slideAtual() + 1));
    bolinhas.forEach((bolinha, i) => bolinha.addEventListener('click', () => irPara(i)));

    faixa.addEventListener('scroll', atualizarBolinhas, { passive: true });
    window.addEventListener('resize', atualizarBolinhas);
    atualizarBolinhas();
})();