const withAuth = require ('../middleware/withAuth')
const withAuthAdmin = require ('../middleware/withAuthAdmin')
module.exports = (app, db) => {
    const AddressModel      = require("../models/AddressModel")(db)
    const UserModel         = require("../models/UserModel")(db)
    const userController    = require("../controllers/userController")(UserModel, AddressModel)

    //route to have the list of ALL users
    app.get('/api/users', withAuthAdmin, userController.getAllUsers)
    //route to have one user with his id
    app.get('/api/user/:id', withAuth, userController.getOneUserById)
    //route to save a new user
    app.post('/api/user/save', userController.saveOneUser)
    //route to log in
    app.post('/api/user/login', userController.loginOneUser)
    //route to edit one user by id
    app.put('/api/user/update', withAuth, userController.updateOneUser)
    //route to delete one user
    app.delete('/api/user/delete', withAuth, userController.deleteOneUser)
} 