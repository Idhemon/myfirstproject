const withAuthAdmin = require ('../middleware/withAuthAdmin')
const withAuth = require ('../middleware/withAuth')

module.exports = (app, db) => {
    const ProgramModel = require("../models/ProgramModel")(db)
    const ExerciseModel = require("../models/ExerciseModel")(db)
    const programController = require("../controllers/programController")(ProgramModel, ExerciseModel)
    //route to have only programs presentation
    app.get('/api/onlyprograms', programController.getOnlyAllPrograms)
    //route to have the list of ALL programs with exercises
    app.get('/api/programs', withAuth, programController.getAllPrograms)
    //route to have one program with his id
    app.get('/api/program/:id', withAuth, programController.getOneProgramById)
    //route to save a program
    app.post('/api/program/save', withAuthAdmin, programController.saveOneProgram)
    //route to add a picture in the API
    app.post('/api/program/pict', withAuthAdmin, programController.savePicture)
    //route to edit one program by id
    app.put('/api/program/update/:id', withAuthAdmin,programController.updateOneProgram)
    //route to delete one program
    app.delete('/api/program/delete/:id', withAuthAdmin,programController.deleteOneProgram)
}