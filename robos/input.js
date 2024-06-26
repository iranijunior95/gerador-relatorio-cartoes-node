const readlineSync = require('readline-sync');
const state = require('./state');

function start() {
    const conteudo = {};

    conteudo.opcoesRelatorios = retornaOpcoesDeRelatorios();
    conteudo.opcoesMeses = retornaOpcoesDeMeses();
    conteudo.opcaoAno = retornaOpcaoDeAno();

    state.save(conteudo);

    function retornaOpcoesDeRelatorios() {
        const listaOpcoesRelatorios = ['todos', 'cielo', 'ben visa vale', 'vr card', 'alelo', 'ticket', 'greencard', 'sodexo', 'up brasil', 'tricard', 'agilli', 'lecard'];
        const opcoesDeRelatoriosIndex = readlineSync.keyInSelect(listaOpcoesRelatorios, 'Escolha o relatorio que dejesa gerar:');
        const opcoesDeRelatoriosText = listaOpcoesRelatorios[opcoesDeRelatoriosIndex];

        return opcoesDeRelatoriosText === undefined ? '' : opcoesDeRelatoriosText;
    }

    function retornaOpcoesDeMeses() {
        const listaOpcoesMeses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        const opcoesDeMesesIndex = readlineSync.keyInSelect(listaOpcoesMeses, 'Escolha o mes:');
        const opcoesDeMesesText = listaOpcoesMeses[opcoesDeMesesIndex];

        return opcoesDeMesesText === undefined ? '' : opcoesDeMesesText;
    }

    function retornaOpcaoDeAno() {
        const opcaoDeAno = readlineSync.question('Qual o ano do relatorio?');
        const anoAtual = new Date().getFullYear();

        return opcaoDeAno === '' ? anoAtual : opcaoDeAno;
    }
}

module.exports = start;