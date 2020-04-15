var fs = require('fs'); 

var readDirectory = () => {
    fs.readdir(__dirname, (error, directory) => {
        if(error) return error; 
        directory.forEach((file) => {
            read(file); 
        }); 
    }); 
}; 

var read = (file) => {
    var path = './' + file; 
    fs.stat(path, (error, stat) => {
        if(error) return error; 
        if(stat.isFile()) {
            console.log('%s %d bytes', file, stat.size); 
        }
    }); 
}; 

readDirectory();