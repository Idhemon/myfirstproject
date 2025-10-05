const withAuth = require ('../middleware/withAuth')

module.exports = (app, db) => {
    const UserModel = require("../models/UserModel")(db)
    const authController = require("../controllers/authController")(UserModel)
    
    //route allowing the management of reconnection by token
    app.get('/api/user/verifToken', withAuth, authController.verifToken)
}