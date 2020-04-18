class ContatoController {

    /**
     * Home page of contacts
     * @param {*} req 
     * @param {*} res 
     */
    index (req, res) {
        let usuario = {
            usuario: req.session.usuario, 
            contatos: req.session.usuario.contatos
        };                        
        res.render('contatos/index', usuario); 
    }

    /**
     * Create contact on session 
     * @param {*} req 
     * @param {*} res 
     */
    create (req, res) {
        let contato = req.body.contato, 
            usuario = req.session.usuario; 
        usuario.contatos.push(contato); 
        res.redirect('/contatos'); 
    }

    /**
     * show a Contact 
     * @param {*} req 
     * @param {*} res 
     */
    show (req, res) {
        let id = req.params.id, 
            contato = req.session.usuario.contatos[id], 
            params = {contato: contato, id: id}; 
        res.render('contatos/show', params); 
    }

    /**
     * Edit a contact
     * @param {*} req 
     * @param {*} res 
     */
    edit (req, res) {
        let id = req.params.id, 
            usuario = req.session.usuario, 
            contato = usuario.contatos[id], 
            params = {
                usuario: usuario, 
                contato: contato, 
                id: id
            }; 
        res.render('contatos/edit', params); 
    }

    /**
     * UPdate data of contatct on session/db
     * @param {*} req 
     * @param {*} res 
     */
    update (req, res) {
        let contato = req.body.contato, 
            usuario = req.session.usuario; 
        usuario.contatos[req.params.id] = contato;
        res.redirect('/contatos'); 
    }

    /**
     * Destroy data by contatct of session/db
     * @param {*} req 
     * @param {*} res 
     */
    destroy (req, res) {
        let usuario = req.session.usuario, 
            id = req.params.id; 
        usuario.contatos.splice(id, 1); 
        res.redirect('/contatos'); 
    }
}

module.exports = (app) => {
    return new ContatoController; 
}; 