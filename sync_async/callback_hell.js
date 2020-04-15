var fs = require('fs'); 

fs.readdir(__dirname, (error, contents) => {
    if(error) {
        throw error; 
    }

    contents.forEach((content) => {
        var path = './' + content; 
        fs.stat(path, (error, stat) => {
            if(error) {
                throw error; 
            }
            if(stat.isFile()) {
                console.log('%s %d bytes', content, stat.size); 
            }
        }); 
    }); 
}); 