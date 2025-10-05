const withAuth = require ('../middleware/withAuth')

module.exports=(app, db) => {
    const UserProgramModel = require("../models/UserProgramModel")(db)
    const userProgramController = require("../controllers/userProgramController")(UserProgramModel)
    
    //Add one owner of program
    app.post('/api/userProgram/add', withAuth, userProgramController.addUserProgram)
    
    //Check owned status
    app.get('/api/userProgram/owner', withAuth, userProgramController.getUserProgram)
}