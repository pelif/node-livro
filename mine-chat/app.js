const KEY = 'mini.chat'; 
const SECRET = 'key.of.mini.chat'; 
var express = require('express')
,   load = require('express-load')
,   bodyParser = require('body-parser')
,   cookieParser = require('cookie-parser')   
,   expressSession = require('express-session')
,   app = express()
,   server = require('http').createServer(app)
,   io = require('socket.io').listen(server)
,   cookie = cookieParser(SECRET)
,   store = new expressSession.MemoryStore()
; 

io.use(function(socket, next) {
    var data = socket.request; 
    cookie(data, {}, function(err) {
        var sessionID = data.signedCookies[KEY]; 
        store.get(sessionID, function(err, session) {
            if (err || !session) {
                return next(new Error('Acesso negado!')); 
            } else {
                socket.handshake.session = session; 
                return next(); 
            }
        }); 
    }); 
}); 


app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs'); 
app.use(cookie); 
app.use(expressSession({
    secret: SECRET, 
    name: KEY, 
    resave: true, 
    saveUninitialized: true, 
    store: store
})); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 

//Share session between express on socket.io

load('models')
    .then('controllers')
    .then('routes')
    .into(app); 
load('sockets')
    .into(io);     

server.listen(3000, () => {
    console.log("Running server to mini-chat app"); 
}); 

module.exports = app; 

