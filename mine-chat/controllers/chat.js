class ChatController {

    index (req, res) {              
        res.render('chat'); 
    }
}

module.exports = (app) => {
    return new ChatController; 
}; 