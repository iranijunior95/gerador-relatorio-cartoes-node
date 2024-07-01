const sharp = require('sharp');
const fs = require('fs');
const state = require('./state').getAll();

async function start() {
    if(state.opcoesRelatorios === '' || state.opcoesMeses === '') {
        console.log('[input] > erro na entrada de dados do usuario...');

        return;
    }

    await redimensionarArmanezarImagens();

    function retornaListaDeImagensDisponiveis() {
        const opcaoRelatorio = state.opcoesRelatorios.includes(' ') ? state.opcoesRelatorios.replaceAll(' ', '_') : state.opcoesRelatorios;
        const listaArquivosLocalizados = fs.readdirSync('./arquivos/prints');
        const listaArquivosLocalizadosFiltrados = [];

        if(opcaoRelatorio === 'todos') {
            listaArquivosLocalizados.forEach(function(elemento) {
                console.log(`[imagem] > arquivo ${elemento} localizado...`);
            });

            return listaArquivosLocalizados;
        }

        listaArquivosLocalizados.forEach(function(elemento) {
            const elementoLocalizado = elemento.indexOf(opcaoRelatorio.toLocaleUpperCase());

            if(elementoLocalizado !== -1) {
                listaArquivosLocalizadosFiltrados.push(elemento);
                console.log(`[imagem] > arquivo ${elemento} localizado...`);
            }
        });

        return listaArquivosLocalizadosFiltrados;
    }

    async function redimensionarArmanezarImagens() {
        const listaDeImagensDisponiveisParaRedimensionar = retornaListaDeImagensDisponiveis();

        if(listaDeImagensDisponiveisParaRedimensionar.length === 0) {
            console.log('[imagem] > nenhuma imagem localizada...');
        }

        if(!fs.existsSync('./arquivos/redimensionadas')) {
            fs.mkdirSync('./arquivos/redimensionadas');
        }

        for(const imagem of listaDeImagensDisponiveisParaRedimensionar) {
            await redimensionarImagem(imagem);
        }
    }

    async function redimensionarImagem(imagem) {
        const nomeImagem = `${imagem.split('.')[0]}.png`;

        try{
            const imagemRedimensionada = await sharp(`./arquivos/prints/${imagem}`)
                                                .clone()
                                                .resize({width: 900})
                                                .toFile(`./arquivos/redimensionadas/${nomeImagem}`);
            
            console.log(`[imagem] > imagem ${nomeImagem} redimensionada...`);
        }catch(error) {
            console.log(`erro: ${error}`);
        }
    }
}

module.exports = start;