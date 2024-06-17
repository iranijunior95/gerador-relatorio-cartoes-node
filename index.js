(async function() {
    const funcoes = {
        inputs: require('./funcoes/inputs'),
        imagens: require('./funcoes/imagens')
    };
    
    console.log('==================== GERAR RELATORIOS CARTÕES ====================');
    console.log('\n');

    console.log('Para o funcionamento correto do robo salve as seguintes especificações no nome dos arquivos:');
    console.log('\n');
    console.log('- Nome do arquivo identificando a operadora do cartão seguido do estabelecimento');
    console.log('Ex: cielo_master_loja / alelo_restaurante');
    console.log('\n');
    console.log('- Não use sinais nos nomes dos aquivos, e procure sempre usar caixa alta.')
    console.log('Ex: CIELO_VISA_LOJA / ALELO_RESTAURANTE');

    funcoes.inputs();
    await funcoes.imagens();
})();