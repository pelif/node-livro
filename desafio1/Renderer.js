class Renderer {

    constructor(        
        request, 
        response) {        
        this.request = request; 
        this.response = response;         
        this.route; 
    }

    renderer() {
        let fs = require('fs');         
        this.catchRoute();                 
        this.setHeader();
        let file = __dirname + this.route + '.html'; 
        fs.exists(file, (exists) => {
            if(exists) {
                fs.readFile(file, (err, html) => {                
                    this.response.write(html);                    
                    this.response.end();                              
                }); 
            } else {
                this.response.write("<h3>Not Found</h3>");                          
                this.response.end();                              
            }            
        });         
    }    

    setHeader() {
        this.response.writeHead(200, {'Content-Type':'text/html'}); 
    }    

    catchRoute() {
        let url = require('url'); 
        let req = url.parse(this.request.url); 
        this.route = req.href; 
    }
}

module.exports = Renderer; 