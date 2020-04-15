class ContatoController {

    index (req, res) {
        let usuario = {usuario: req.session.usuario};          
        res.render('contatos/index', usuario); 
    }
}

module.exports = (app) => {
    return new ContatoController; 
}; 