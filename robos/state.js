const dadosConteudo = {};

function save(dados) {
    dadosConteudo.opcoesRelatorios = dados.opcoesRelatorios;
    dadosConteudo.opcoesMeses = dados.opcoesMeses;
    dadosConteudo.opcaoAno = dados.opcaoAno;
}

function getAll() {
    return dadosConteudo;
}

module.exports = {
    save,
    getAll
};