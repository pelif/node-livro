var express = require('express')
, cfg = require('./config.json')
, load = require('express-load')
, bodyParser = require('body-parser')
, cookieParser = require('cookie-parser')
, expressSession = require('express-session')
, app = express()
, server = require('http').Server(app)
, cookie = cookieParser(cfg.SECRET)
, path = require('path')
, methodOverride = require('method-override')
, error = require('./middleware/error')
, io = require('socket.io').listen(server)
, store = new expressSession.MemoryStore()
;

//new function
io.set(function(socket, next) {  
  var data = socket.request; 
  cookie(data, {}, (err) => {
    let sessionID = data.signedCookies[cfg.KEY];     
    store.get(sessionID, (err, session) => {
      console.log('Session client rquest: '+ session); 
      if (err || !session) {
        return next(new Error('Acesso Negado!')); 
      } else {        
        socket.handshake.session = session; 
        return next(); 
      }
    }); 
  }); 
}); 



//function of book
// io.set('authorization', (data, accept) => {  
//   cookie(data, {}, (err) => {
//     let sessionID = data.signedCookies[cfg.KEY];     
//     store.get(sessionID, (err, session) => {
//       if (err || !session) {
//         accept(null, false); 
//       } else {
//         data.session = session; 
//         accept(null, true); 
//       }
//     }); 
//   }); 
// }); 


// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookie); 
app.use(expressSession({
  secret: cfg.SECRET, 
  name: cfg.KEY, 
  resave: true, 
  saveUninitialized: true, 
  store: store
})); 
app.use(cookieParser('secret')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOverride()); 
app.use('/public', express.static(path.join(__dirname, 'public'))); 
// app.use(error.notFound); 
// app.use(error.serverError); 

load('models')
  .then('controllers')
  .then('routes')
  .into(app); 
load('sockets')  
  .into(io); 

server.listen(3000, function() {
  console.log(`Server is running to Ntalk...`); 
}); 

module.exports = app;

