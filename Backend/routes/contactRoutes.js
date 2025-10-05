const withAuthAdmin = require ('../middleware/withAuthAdmin')

module.exports = (app, db) => {
    const ContactModel = require("../models/ContactModel")(db)
    const contactController = require("../controllers/contactController")(ContactModel)
    
    //route to have the list of ALL contacts
    app.get('/api/contact/list', withAuthAdmin, contactController.getAllContacts)
    //route to have one contact with his id
    app.get('/api/contact/list/:id', withAuthAdmin, contactController.getOneContactById)
    //route to save a request
    app.post('/api/contact/send', contactController.sendOneRequest)
    //route to edit one request by id
    app.put('/api/contact/update/:id', withAuthAdmin, contactController.updateOneRequest)
    //route to delete one request
    app.delete('/api/contact/delete/:id', withAuthAdmin, contactController.deleteOneRequest)
}