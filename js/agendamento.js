// Agendamento: somente o botão da Dra. Jane abre o WhatsApp da clínica com a mensagem pronta.
// Se o JavaScript falhar, o href original (#contato) continua funcionando.
const NUMERO_WHATSAPP = '5514999999999'; // trocar pelo número real (55 + DDD + número)
const MENSAGEM = 'Olá! Vim pelo site da Sorriso & Saúde e quero agendar uma consulta.';

const botaoAgendarDra = document.querySelector('.profissional-botao');

botaoAgendarDra.addEventListener('click', (evento) => {
    evento.preventDefault();
    const link = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(MENSAGEM)}`;
    window.open(link, '_blank', 'noopener');
});