module.exports = (app) => {
    var auth = require('./../middleware/auth'), 
        chat = app.controllers.chat; 
    app.get('/chat/:email', auth, chat.index); 
}; 