class HomeController {

    //index of mine-chat
    index(req, res) {
        res.render('index'); 
    }   

    //Enter with name of user on chat
    enter(req, res) {        
        if(req.body.nome) {
            req.session.nome = req.body.nome;             
            res.redirect('/chat'); 
        } else {
            res.redirect('/'); 
        }
    }
}

module.exports = (app) => {
    return new HomeController; 
}; 