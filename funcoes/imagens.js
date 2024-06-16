const state = require('./states');

function start() {

    if(state.retornar().relatorio === '' || state.retornar().mes === '' || state.retornar().ano === '') {
        return;
    }

    console.log(state.retornar());
    console.log('ola, imagens');

}

module.exports = start;