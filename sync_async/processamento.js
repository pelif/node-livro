var http = require('http'); 
var fs = require('fs'); 
var leituraAsync = require('./leitura_async'); 
var leituraSync = require('./leitura_sync'); 
var arquivo = "./node.zip"; 
var stream = fs.createWriteStream(arquivo); 
var download = "http://nodejs.org/dist/v0.10.12/node-v0.10.12.tar.gz"; 

http.get(download, (res) => {
    console.log("Fazendo download do Node.js"); 
    res.on('data', (data) => {
        stream.write(data); 
    }); 
    res.on('end', () => {
        stream.end(); 
        console.log("Download Finalizado"); 
        leituraAsync(arquivo); 
        leituraSync(arquivo); 
    }); 
}); 