module.exports = (io) => {
    let crypto = require('crypto'), 
        md5 = crypto.createHash('md5'),
        sockets = io.sockets; 

    sockets.on('connection', (client) => {    
        
        var session = client.handshake.session; 
        var usuario = session.usuario;         
        
        //controle de usuários na sala
        client.on('join', (sala) => {
            if(sala) {
                sala = sala.replace('?', ''); 
            } else {
                let timestamp = new Date().toString();
                let md5 = crypto.createHash('md5'); 
                sala = md5.update(timestamp).digest('hex'); 
            }
            client.set('sala', sala); 
            client.join(sala); 
        });         

        //desconectando usuários da sala 
        client.on('disconnect', () => {
            client.on('sala', (erro, sala) => {
                client.leave(sala);             
            }); 
        }); 

        //controlando envio de mansagens       
        client.on('send-server', (data) => {            
            let msg = `<b> ${usuario.nome} : </b> ${data.msg} <br>`; 
            client.get('sala', (erro, msg) => {
                let datas = {email: usuario.email, sala: sala};                 
                client.broadcast.emit('new-message', datas); 
                sockets.in(sala).emit('send-client', msg); 
            });             
        }); 
        
    }); 
}; 