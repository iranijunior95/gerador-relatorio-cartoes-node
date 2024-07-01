const fs = require('fs');
const fsExtra = require('fs-extra');
const  { jsPDF } = require('jspdf');
const imageToBase64 = require('image-to-base64');  
const state = require('./state').getAll();

async function start() {
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

    async function gerarRelatorioArmazenarPdf() {
        const listaDeImagensRedimensionadas = retornaListaDeImagensRedimensionadas();

        if(listaDeImagensRedimensionadas.length === 0) {
            console.log('[relatorio] > nenhuma imagem redimensionada localizada...');
            return;
        }

        if(!fs.existsSync('./arquivos/relatorios')) {
            fs.mkdirSync('./arquivos/relatorios');
        }

        for(const imagem of listaDeImagensRedimensionadas) {
            await gerarRelatorioPdf(imagem);
        }

        if(fs.existsSync('./arquivos/redimensionadas')) {
            fsExtra.remove('./arquivos/redimensionadas')
                    .then(function() {
                        console.log('[relatorio] > pasta redimensionadas deletada...');
                    })
                    .catch(function(erro) {
                        console.log(`erro: ${erro}`);
                    });
        }
    }

    async function gerarRelatorioPdf(imagem) {
        const doc = new jsPDF({format: 'a4', orientation: '', unit: 'cm'});
        const centerWidth = doc.internal.pageSize.width / 2;
        const nomeRelatorio = `${imagem.split('.')[0]}`;

        doc.setFontSize(14);
        doc.addImage(await retornaImagemBase64('arquivos/logo_oficial_grupo_vicunha.png'), centerWidth - 2.5, 1, 5, 0);
        doc.text("Relatório Mensal de Cartões", centerWidth, 4, "center");
        doc.text(`- ${retornaNomeBandeiraCartao(nomeRelatorio)}`, 1, 6);
        doc.text(`- ${state.opcoesMeses.toLocaleUpperCase()} / ${state.opcaoAno}`, 1, 6.7);
        doc.text(`- ${retornaNomeCnpj(nomeRelatorio)}`, 1, 7.4);
        doc.addImage(await retornaImagemBase64(`./arquivos/redimensionadas/${imagem}`), centerWidth - 10, 8, 20, 0);
        doc.save(`./arquivos/relatorios/${retornaNomeBandeiraCartao(nomeRelatorio)} ${state.opcoesMeses.toLocaleUpperCase()} ${state.opcaoAno} ${retornaNomeCnpj(nomeRelatorio).slice(-7).replace('-', '')}.pdf`);

        console.log(`[relatorio] > ${retornaNomeBandeiraCartao(nomeRelatorio)} ${state.opcoesMeses.toLocaleUpperCase()} ${state.opcaoAno} ${retornaNomeCnpj(nomeRelatorio).slice(-7).replace('-', '')}.pdf gerado...`);
    }

    async function retornaImagemBase64(imagem) {
        try {
            return await imageToBase64(imagem);
        } catch (error) {
            console.log(`erro: ${error}`);
        }
    }

    function retornaNomeBandeiraCartao(nomeRelatorio) {
        const arrayNome = nomeRelatorio.split('_').splice(0, 3);

        if(arrayNome.length === 3 & arrayNome[2] === 'LOJA' || arrayNome.length === 3 & arrayNome[2] === 'RESTAURANTE') {
            arrayNome.pop();
        }else if(arrayNome.length === 2 & arrayNome[1] === 'LOJA' || arrayNome.length === 2 & arrayNome[1] === 'RESTAURANTE') {
            arrayNome.pop();
        }
        
        return arrayNome.join(' ');
    }

    function retornaNomeCnpj(nomeRelatorio) {
        const arrayNome = nomeRelatorio.split('_');
        let nomeCnpj = '';

        arrayNome.forEach(function(nome) {
            if(nome === 'LOJA') {
                nomeCnpj = 'ATACADÃO VICUNHA LTDA - 35.298.801/0001-60';
            }else if(nome === 'RESTAURANTE') {
                nomeCnpj = 'JORDANA M G C ALDATZ - 48.079.323/0001-49';
            }
        });

        return nomeCnpj;
    }
}

module.exports = start;