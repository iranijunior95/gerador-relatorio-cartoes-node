const readlineSync = require('readline-sync');
const state = require('./states');

function start() {

    const listaOpcoesRelatorios = ['Gerar Todos', 'Gerar Individual'];
    const listaCartoes = ['cielo', 'ben visa vale', 'vr card', 'alelo', 'ticket', 'greencard', 'sodexo', 'up brasil', 'tricard', 'agilli', 'lecard'];
    const listaMeses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const dadosConfiguracao = { 
            relatorio: '',
            mes: '',
            ano: ''
    };

    const questao01 = readlineSync.keyInSelect(listaOpcoesRelatorios, 'Como deseja gerar seu realório?');

    dadosConfiguracao.relatorio = retornaOpcaoRelatorio(listaOpcoesRelatorios[questao01]);
    dadosConfiguracao.mes = retornaMes();
    dadosConfiguracao.ano = retornaAno();
    
    if(dadosConfiguracao.relatorio === '' || dadosConfiguracao.mes === '' || dadosConfiguracao.ano === '') {
        return;
    }

    state.salvar(dadosConfiguracao);

    function retornaOpcaoRelatorio(tipoRelatorio) {
        
        if(tipoRelatorio === 'Gerar Todos') {
            return 'todos';
        }

        if(tipoRelatorio === 'Gerar Individual') {
            const questao02 = readlineSync.keyInSelect(listaCartoes, 'Escolha a operadora do cartão:');
            return questao02 === -1 ? '' : listaCartoes[questao02];
        }

        return '';
    }

    function retornaMes() {

        if(dadosConfiguracao.relatorio === '') {
            dadosConfiguracao.relatorio = '';
            dadosConfiguracao.mes = '';
            dadosConfiguracao.ano = '';

            return '';
        }

        const questao03 = readlineSync.keyInSelect(listaMeses, 'Escolha o mês:');
        return questao03 === -1 ? '' : listaMeses[questao03];
    }

    function retornaAno() {
        if(dadosConfiguracao.relatorio === '' || dadosConfiguracao.mes === '') {
            dadosConfiguracao.relatorio = '';
            dadosConfiguracao.mes = '';
            dadosConfiguracao.ano = '';

            return '';
        }

        const anoAtual = new Date().getFullYear();

        const questao04 = readlineSync.question('Digite o ano: ');
        return questao04 === '' ? anoAtual : questao04;
    }
}

module.exports = start;