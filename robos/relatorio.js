const fs = require('fs');
const fsExtra = require('fs-extra');
const PDFDocument = require('pdfkit');
const state = require('./state').getAll();

function start() {
    if(state.opcoesRelatorios === '' || state.opcoesMeses === '') {
        return;
    }

    gerarRelatorioArmazenarPdf();

    function retornaListaDeImagensRedimensionadas() {
        if(!fs.existsSync('./arquivos/redimensionadas')) {
            return [];
        }

        return fs.readdirSync('./arquivos/redimensionadas');
    }

    function gerarRelatorioArmazenarPdf() {
        const listaDeImagensRedimensionadas = retornaListaDeImagensRedimensionadas();

        if(listaDeImagensRedimensionadas.length === 0) {
            console.log('[relatorio] > nenhuma imagem redimensionada localizada...');
            return;
        }

        if(!fs.existsSync('./arquivos/relatorios')) {
            fs.mkdirSync('./arquivos/relatorios');
        }

        for(const imagem of listaDeImagensRedimensionadas) {
            console.log(imagem);
        }

        if(fs.existsSync('./arquivos/redimensionadas')) {
            fsExtra.remove('./arquivos/redimensionadas')
                    .then(function() {
                        console.log('[relatorio] > pasta redimensionada deletada...');
                    })
                    .catch(function(erro) {
                        console.log(`erro: ${erro}`);
                    });
        }
    }
}

module.exports = start;