module.exports = (app) => {
    chat = app.controllers.chat; 
    app.get('/chat', chat.index); 
}; 