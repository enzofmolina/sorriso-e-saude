(() => {
    const secao = document.getElementById("tratamentos");
    const modal = document.getElementById("tratamento-modal");

    if (!secao || !modal || typeof modal.showModal !== "function") return;

    const descricoes = {
    "clareamento": "Conheça as opções de clareamento e converse com a equipe sobre suas expectativas para o sorriso.",
    "lentes": "Um espaço para conversar sobre a aparência dos dentes e conhecer as possibilidades desse atendimento.",
    "ortodontia": "Conheça o atendimento ortodôntico e esclareça suas dúvidas sobre aparelhos e acompanhamento.",
    "implantes": "Converse com a equipe sobre a reposição de dentes e sobre as etapas de avaliação e planejamento.",
    "proteses": "Apresente suas necessidades e conheça o atendimento relacionado às próteses dentárias.",
    "odontopediatria": "Conheça o atendimento infantil e traga suas dúvidas sobre o cuidado com o sorriso das crianças.",
    "prevencao": "Converse sobre sua rotina de cuidados e conheça o acompanhamento preventivo da clínica.",
    "canal": "Esclareça suas dúvidas sobre o atendimento endodôntico e converse sobre sua necessidade de avaliação.",
    "harmonizacao": "Um atendimento para discutir suas expectativas e conhecer as possibilidades de avaliação individual."
};
    const titulo = document.getElementById("tratamento-modal-titulo");
    const imagem = document.getElementById("tratamento-modal-imagem");
    const descricao = document.getElementById("tratamento-modal-descricao");
    let botaoOrigem = null;
    let overflowAnterior = "";

    // Só mostra os botões quando a interação estiver disponível.
    secao.querySelectorAll("[data-tratamento]").forEach((botao) => {
        botao.hidden = false;
    });

    secao.addEventListener("click", (evento) => {
        const botao = evento.target.closest("[data-tratamento]");
        if (!botao || !secao.contains(botao) || modal.open) return;

        const texto = descricoes[botao.dataset.tratamento];
        if (!texto) return;

        const cartao = botao.closest(".cartao");
        const foto = cartao.querySelector("img");
        titulo.textContent = cartao.querySelector("h3").textContent;
        descricao.textContent = texto;
        imagem.src = foto.src;
        imagem.alt = foto.alt;

        botaoOrigem = botao;
        overflowAnterior = document.body.style.overflow;
        modal.showModal();
        document.body.style.overflow = "hidden";
        modal.scrollTop = 0;
    });

    modal.querySelector(".tratamento-modal-fechar").addEventListener("click", () => {
        modal.close();
    });

    modal.addEventListener("close", () => {
        document.body.style.overflow = overflowAnterior;
        botaoOrigem?.focus({ preventScroll: true });
    });

    const foraDaJanela = (evento) => {
        const area = modal.getBoundingClientRect();
        return evento.clientX < area.left || evento.clientX > area.right ||
            evento.clientY < area.top || evento.clientY > area.bottom;
    };
    let pressionouFundo = false;
    modal.addEventListener("pointerdown", (evento) => {
        pressionouFundo = evento.target === modal && foraDaJanela(evento);
    });
    modal.addEventListener("click", (evento) => {
        if (pressionouFundo && evento.target === modal && foraDaJanela(evento)) modal.close();
        pressionouFundo = false;
    });

    modal.querySelector(".tratamento-agendar").addEventListener("click", () => {
        
        botaoOrigem = null;
        modal.close();
        requestAnimationFrame(() => {
            document.querySelector("#contato a")?.focus({ preventScroll: true });
        });
    });
})();