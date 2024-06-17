const state = require('./states');
const fs = require('fs');
const fsExtra = require('fs-extra');
const sharp = require('sharp');

const dadosConfiguracao = state.retornar();
const listaCartoes = {
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
const listaExtensoes = ['.jpeg', '.jpg', '.png'];

async function start() {

    if(dadosConfiguracao.relatorio === '' || dadosConfiguracao.mes === '' || dadosConfiguracao.ano === '') {
        return;
    }

    console.log('==================== PROCESSAMENTO DE IMAGENS ====================');

    const arquivosDisponiveisParaRedimensionar = verificaImagensNaPastaPrints();

    if(arquivosDisponiveisParaRedimensionar.length === 0) {
        console.log('Aviso: Nenhum arquivo nos padroẽs para ser processado!');
        return;
    }

    if(fs.existsSync('./arquivos/redimensionadas')) {
        try {
            await fsExtra.remove('./arquivos/redimensionadas');
        } catch (error) {
            console.log(`Erro ao Excluir Registros: ${error}`);
        }
    }

    arquivosDisponiveisParaRedimensionar.forEach(async function(imagens) {
        await redimensionarArmanezarImagens(imagens);
    });

    function verificaImagensNaPastaPrints() {
        const operadora = dadosConfiguracao.relatorio.includes(' ') ? dadosConfiguracao.relatorio.replaceAll(' ', '_') : dadosConfiguracao.relatorio;
        const arquivosLocalizados = [];

        if(operadora === 'todos') {
            const listaOperadoras = Object.keys(listaCartoes);
    
            listaOperadoras.forEach(function(operadoras) {
                listaCartoes[operadoras].forEach(function(elemento) {
                    listaExtensoes.forEach(function(extensao) {
                        if(fs.existsSync('./arquivos/prints/'+elemento+extensao)) {
                            arquivosLocalizados.push(elemento+extensao);
                            console.log(`Arquivo ${elemento+extensao} localizado...`);
                        }
                    });
                });
            }); 
        }else {
            listaCartoes[operadora].forEach(function(elemento) {
                listaExtensoes.forEach(function(extensao) {
                    if(fs.existsSync('./arquivos/prints/'+elemento+extensao)) {
                        arquivosLocalizados.push(elemento+extensao);
                        console.log(`Arquivo ${elemento+extensao} localizado...`);
                    }
                });
            });
        }

        return arquivosLocalizados;
    }

    async function redimensionarArmanezarImagens(imagens) {
        if(!fs.existsSync('./arquivos/redimensionadas')) {
            fs.mkdirSync('./arquivos/redimensionadas');
        }
    
        try {
            const imagemRedimencionada = await sharp(`./arquivos/prints/${imagens}`)
            .clone()
            .resize({width: 900})
            .toFile(`./arquivos/redimensionadas/${imagens.split('.')[0]}_${dadosConfiguracao.mes.toLocaleUpperCase()}_${dadosConfiguracao.ano}.png`);

            console.table(`Status processando imagem: ${imagemRedimencionada.size} | ${imagemRedimencionada.format} | ${imagemRedimencionada.premultiplied}`);
        } catch (error) {
           console.log(`Erro processar imagem: ${error}`); 
        }
    }
}

module.exports = start;