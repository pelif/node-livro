var http = require('http'); 
var url = require('url'); 
var Renderer = require('./Renderer');

var server = http.createServer((request, response) => { 
    let rend = new Renderer(request, response); 
    rend.renderer(); 
}); 

server.listen(3000, () => {
    console.log('Running Server ... '); 
}); 