const readlineSync = require('readline-sync');
const sharp = require('sharp');
const fs = require('fs');
const fsExtra = require('fs-extra');

(function() {

    const dadosConteudo = {};

    console.log('==================== GERAR RELATORIO CARTÃO ====================');

    dadosConteudo.opcoesRelatorios = retornaOpcoesDeRelatorios();
    dadosConteudo.opcoesMeses = retornaOpcoesDeMeses();
    dadosConteudo.opcaoAno = retornaOpcaoDeAno();

    if(dadosConteudo.opcoesRelatorios === '' || dadosConteudo.opcoesMeses === '') {
        console.log('Erro na entrada de dados do usuario...');

        return;
    }

    redimensionarArmanezarImagens();

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

    function retornaListaDeImagensDisponiveis() {
        const opcaoRelatorio = dadosConteudo.opcoesRelatorios.includes(' ') ? dadosConteudo.opcoesRelatorios.replaceAll(' ', '_') : dadosConteudo.opcoesRelatorios;
        const listaDeCartoes = {
            cielo: ['CIELO_VISA_LOJA', 'CIELO_VISA_RESTAURANTE', 'CIELO_MASTER_LOJA', 'CIELO_MASTER_RESTAURANTE', 'CIELO_HIPER_LOJA', 'CIELO_HIPER_RESTAURANTE', 'CIELO_ELO_LOJA', 'CIELO_ELO_RESTAURANTE', 'CIELO_AMERICAN_LOJA', 'CIELO_AMERICAN_RESTAURANTE'],
            ben_visa_vale: ['BEN_VISA_VALE_LOJA', 'BEN_VISA_VALE_RESTAURANTE'], 
            vr_card: ['VR_CARD_LOJA', 'VR_CARD_RESTAURANTE'],
            alelo: ['ALELO_LOJA', 'ALELO_RESTAURANTE'],
            ticket: ['TICKET_LOJA', 'TICKET_RESTAURANTE'],
            greencard: ['GREENCARD_LOJA', 'GREENCARD_RESTAURANTE'],
            sodexo: ['SODEXO_LOJA', 'SODEXO_RESTAURANTE'], 
            up_brasil: ['UP_BRASIL_LOJA', 'UP_BRASIL_RESTAURANTE'],
            tricard: ['TRICARD_LOJA', 'TRICARD_RESTAURANTE'],
            agilli: ['AGILLI_LOJA', 'AGILLI_RESTAURANTE'],
            lecard: ['LECARD_LOJA', 'LECARD_RESTAURANTE']
        };
        const listaDeExtensoes = ['.jpeg', '.jpg', '.png'];
        const listaArquivosLocalizados = [];

        if(opcaoRelatorio === 'todos') {
            Object.keys(listaDeCartoes).forEach(function(cartao) {
                listaDeCartoes[cartao].forEach(function(elemento) {
                    listaDeExtensoes.forEach(function(extensao) {
                        if(fs.existsSync(`./arquivos/prints/${elemento+extensao}`)) {
                            listaArquivosLocalizados.push(elemento+extensao);
                            console.log(`[imagem] > Arquivo ${elemento+extensao} localizado.`);
                        }
                    });
                });
            });

            return listaArquivosLocalizados;
        }

        listaDeCartoes[opcaoRelatorio].forEach(function(elemento) {
            listaDeExtensoes.forEach(function(extensao) {
                if(fs.existsSync(`./arquivos/prints/${elemento+extensao}`)) {
                    listaArquivosLocalizados.push(elemento+extensao);
                    console.log(`[imagem] > Arquivo ${elemento+extensao} localizado.`);
                }
            });
        });

        return listaArquivosLocalizados;
    }

    function redimensionarArmanezarImagens() {
        const listaDeImagensDisponiveisParaRedimensionar = retornaListaDeImagensDisponiveis();

        if(listaDeImagensDisponiveisParaRedimensionar.length === 0) {
            console.log('[imagem] > Nenhum arquivo localizado.');
            return;
        }

        listaDeImagensDisponiveisParaRedimensionar.forEach(function(imagem) {
            if(!fs.existsSync('./arquivos/redimensionadas')) {
                fs.mkdirSync('./arquivos/redimensionadas');
            }

            const imagemRedimensionada = sharp(`./arquivos/prints/${imagem}`)
                                                    .clone()
                                                    .resize({width: 900})
                                                    .toFile(`./arquivos/redimensionadas/${imagem.split('.')[0]}_${dadosConteudo.opcoesMeses.toLocaleUpperCase()}_${dadosConteudo.opcaoAno}.png`);

            console.log(`[imagem] > ${imagem} redimensionando...`);
        });
    }

})();