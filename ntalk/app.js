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
;

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookie); 
app.use(expressSession({
  secret: cfg.SECRET, 
  name: cfg.KEY, 
  resave: false, 
  saveUninitialized: false, 
  store: false
})); 
app.use(cookieParser('secret')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
// app.use(methodOverride('__method')); 
app.use('/public', express.static(path.join(__dirname, 'public'))); 

load('models')
  .then('controllers')
  .then('routes')
  .into(app); 

server.listen(3000, function() {
  console.log(`Server is running to Ntalk...`); 
}); 

module.exports = app;

