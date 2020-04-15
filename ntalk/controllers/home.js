class HomeController {

    constructor() { }

    /**
     * Index Page Login
     * @param {*} req 
     * @param {*} res 
     */
    index (req, res)  {
        res.render('home/index'); 
    }

    /**
     * Effect login in system
     * @param {*} req 
     * @param {*} res 
     */
    login (req, res) {                          
        if(req.body.email && req.body.nome) {            
            req.session.usuario = req.body; 
            res.redirect('/contatos'); 
        } else {
            res.redirect('/'); 
        }
    }

    /**
     * Effect logout in Ntalk system
     * @param {*} req 
     * @param {*} res 
     */
    logout (req, res) {
        req.session.destroy(); 
        res.redirect();
    }
}

module.exports = (app) => {
    return new HomeController(); 
};     


