(async function() {
    
    const robos = {
        input: require('./robos/input'),
        imagem: require('./robos/imagem'),
        relatorio: require('./robos/relatorio')
    };

    robos.input();
    await robos.imagem();
    await robos.relatorio();
})();

