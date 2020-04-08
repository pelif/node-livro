class RenderFile {
    
    constructor(file, path) {
        this.file = file;        
        this.path = path; 
    }

    renderer(response) {
        var fs = require('fs'); 
        fs.readFile(this.path + '/' + this.file, (err, html) => {
            response.writeHeader(200, {'Content-Type': 'text/html'}); 
            response.write(html); 
            response.end(); 
        }); 
    }
}

module.exports = RenderFile; 