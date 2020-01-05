const { Contact } = require('../models')

class Controller {

    static showData(req, res, next) {
        Contact.findAll()
            .then((contact) => {
                res.status(200).json(contact)
            })
            .catch((err) => {
                res.status(500).json(err)
            });
    }

    static createGroup(req, res, next) {
        const { name, phone, quote } = req.body
        Contact.create({
            name: name,
            phone: phone,
            quote: quote
        })
            .then((contact) => {
                res.status(201).json(contact)
            }).catch((err) => {
                res.status(500).json(err)
            });
    }

    static updateData(req, res, next) {
        const { name, phone, quote } = req.body
        Contact.findByPk(req.params.id)
            .then((contact) => {
                if (!contact) res.status(404).json({ msg: 'contact not found' })
                Contact.update({
                    name: name,
                    phone: phone,
                    quote: quote
                }, {
                    where: { id: req.params.id }
                })
            })
            .then((contact) => {
                res.status(200).json(contact)
            }).catch((err) => {
                res.status(500).json(err)
            });
    }

    static deleteData(req, res, next) {
        let data;
        Contact.findByPk(req.params.id)
            .then((contact) => {
                if (!contact) res.status(404).json({ msg: 'contact not found' })
                else data = contact
                return Contact.destroy({
                    where: { id: req.params.id }
                })
            })
            .then(_ => {
                res.status(200).json(data)
            }).catch((err) => {
                res.status(500).json(err)
            });
    }

}

module.exports = Controller