module.exports = (io) => {    
    
    //Initialized a connection widh Socket.IO
    io.sockets.on('connection', (client) => {
        
        //recovery a Express Session
        var session = client.handshake.session; 
        
        client.on('send-server', (msg) => {
            msg = `<b> ${session.nome} : </b> ${msg} <br>`; 
            client.emit('send-client', msg); 
            client.broadcast.emit('send-client', msg); 
        }); 
    }); 
    
}; 