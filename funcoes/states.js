const dadosConfiguracao = { 
    relatorio: '',
    mes: '',
    ano: ''
};

function salvar(dados) {
    dadosConfiguracao.relatorio = dados.relatorio;
    dadosConfiguracao.mes = dados.mes;
    dadosConfiguracao.ano = dados.ano;

    console.log('==================== DADOS RELATORIO A SER GERADO ====================');
    console.table(dadosConfiguracao);
    console.log('\n');
}

function retornar() {
    return dadosConfiguracao;
}

module.exports = {
    salvar,
    retornar
};