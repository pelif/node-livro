var http = require('http'); 
var url = require('url'); 

var server = http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type":"text/html"}); 
    let host = request.headers.host; 
    let html = url.parse(request.url); 
    // console.log(request.headers.host+"/"+html.href); return; 
    // console.log(html.hostname+":"+html.port+"/"+html.href); return; 
    for(var key in html.query) {
        response.write("<h3>" + key + ":" + html.query[key] + "</h3>"); 
    }
    response.end('https://google.com'); 
}); 

server.listen(3000, () => {
    console.log('Running Server ... '); 
}); 