class ChatController {

    index (req, res) {
        let result = {
            email: req.params.email, 
            usuario: req.session.usuario
        }; 
        res.render('chat/index', result); 
    }
}

module.exports = (app) => {
    return new ChatController; 
};  