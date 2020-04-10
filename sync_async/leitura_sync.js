var fs = require('fs'); 

var leituraSync = (arquivo) => {
    console.log("Fazendo leitura sincrona"); 
    var inicio = new Date().getTime();
    fs.readFileSync(arquivo, () => {}); 
    var fim = new Date().getTime();
    console.log("Bloqueio Sincrono: "+(fim - inicio)+ "ms"); 
}; 

module.exports = leituraSync; 