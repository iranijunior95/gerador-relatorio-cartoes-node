const dadosConfiguracao = { 
    relatorio: '',
    mes: '',
    ano: ''
};

function salvar(dados) {
    dadosConfiguracao.relatorio = dados.relatorio;
    dadosConfiguracao.mes = dados.mes;
    dadosConfiguracao.ano = dados.ano;
}

function retornar() {
    return dadosConfiguracao;
}

module.exports = {
    salvar,
    retornar
};