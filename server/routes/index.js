const router = require('express').Router()
const ContactController = require('../controllers/contactC')

router.get('/', ContactController.showData)

router.post('/', ContactController.createContact)

router.put('/:id', ContactController.updateData)

router.delete('/:id', ContactController.deleteData)

module.exports = router