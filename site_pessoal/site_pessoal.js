var http = require('http'); 
var RenderFile = require('./RenderFile'); 

var server = http.createServer((request, response) => {
    let rend = new RenderFile('index.html', __dirname); 
    rend.renderer(response);     
}); 

server.listen(3000, () => {
    console.log('Server is running'); 
}); 
