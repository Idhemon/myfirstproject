const withAuthAdmin = require ('../middleware/withAuthAdmin')
const withAuth = require ('../middleware/withAuth')
module.exports = (app, db) => {
    const ExerciseModel = require("../models/ExerciseModel")(db)
    const exerciseController = require("../controllers/exerciseController")(ExerciseModel)
    
    //route to get all exercises from one program
    app.get('/api/exercises/:programId', withAuth, exerciseController.getExercisesByProgramId)
    //route to have one exercise with his id
    app.get('/api/exercise/:id', withAuth, exerciseController.getOneExerciseById)
    //route to save an exercise
    app.post('/api/exercise/save/:programId', withAuthAdmin, exerciseController.saveOneExercise)
    //route to edit one exercise by id
    app.put('/api/exercise/update/:exerciseId', withAuthAdmin,exerciseController.updateOneExercise)
    //route to delete one exercise
    app.delete('/api/exercise/delete/:id', withAuthAdmin,exerciseController.deleteOneExercise)
}