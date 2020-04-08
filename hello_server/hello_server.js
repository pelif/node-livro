var http = require('http') 

var asnwerRequest = (request, response) => {
    response.writeHead(200, {"Content-Type" : "text/html"})
    response.write("<h1>Hello Aline!</h1>")
    response.end()
}; 

var server = http.createServer(asnwerRequest) 
var serverOn = () => {
    console.log("Server is running ... ")
}; 

server.listen(3000, serverOn); 