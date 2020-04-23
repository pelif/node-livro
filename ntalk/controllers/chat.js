class ChatController {

    index (req, res) {
        let result = {
            email: req.params.email,             
        }; 
        res.render('chat/index', result); 
    }
}

module.exports = (app) => {
    return new ChatController; 
};  