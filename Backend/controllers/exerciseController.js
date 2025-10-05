//To can delete local images
const fs = require('fs')
module.exports = (ExerciseModel) => { 
    
    //controller to get ALL exercises for one program
    const getExercisesByProgramId = async (req,res) => {
        try {
            const programId = req.params.programId
        
            const exercises = await ExerciseModel.getExercisesByProgramId(programId)
             //❌️ if there is an error
            if (exercises.code) {
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            }
            //✅️ else access confirmed to the request
            else {
                res.json({status: 200, result: exercises})
            }
        }
        catch(err) {
            // ❌️ 
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    //controller to get ONE exercise by id
    const getOneExerciseById = async (req,res) => {
        try {
             const exercise = await ExerciseModel.getOneExerciseById(req.params.id)
            // ❌️ if there is an error
            if (exercise.code) {
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            } 
            //✅️ else access confirmed to the request
            else {
                res.json({status: 200, exercises: exercise})
            }
        }
        // ❌️ if an error does not allow entry into "try"
        catch(err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        } 
        
    }
    
    //controller to register a new exercise
    const saveOneExercise = async (req, res) => {
        try {
                const programId = req.params.programId

                // Save the exercise
                const newExercise = await ExerciseModel.saveExercises(req, programId)
                //❌️  If errors from saving the new exercises
                if(newExercise.code) {
                    return res.status(500).json({ status: 500, msg: "Problème avec l'entrée de l'exercice, veuillez réessayer" })
                    } 
                //✅️    
                return res.status(200).json({ status: 200, msg: "L'exercice a bien été sauvegardé !" })
                        
        }
            
        catch (err) {
            //❌️ 
            return res.status(500).json({ status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard." })
        }
    }
    
    
    //controller to update one exercise
    const updateOneExercise = async (req, res) => {
        try {
            
            const { nameEx, descriptionEx, sets, repetitions, pictureEx, altEx, duration } = req.body
            const exerciseId = req.params.exerciseId
            //❗️
            if(!nameEx || !descriptionEx || !sets || !repetitions || !duration) {
                return res.status(500).json({status: 500, msg: "Données manquantes pour la mise à jour"})
            }
            //Change the exercise
            const modifyExercise = await ExerciseModel.updateOneExercise({ 
                nameEx,
                descriptionEx,
                sets,
                repetitions,
                pictureEx,
                altEx,
                duration 
                
            }, exerciseId)
                //❌️ 
                if(modifyExercise.code) {
                    res.json({status: 500, msg: "Impossible de modifier l'exercice"})
                }
                //✅️ 
                res.json({status: 200, msg: "L'exercice a bien été modifié"})
                    
                
            
        } 
        // ❌️ 
        catch(err) {
            console.error("Erreur lors de la mise à jour de l'exercice :", err)
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    
    //controller to delete one exercise
    const deleteOneExercise = async (req, res) => {
        try {
            //check if exercise exists
            const exercise = await ExerciseModel.getOneExerciseById(req.params.id)
            //❌️ 
            if(exercise.code){
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            } else {
                //delete the exercise
                const del = await ExerciseModel.deleteOneExercise(req.params.id)
                //❌️ 
                if(del.code){
                    res.json({status: 500, msg: "Impossible de supprimer l'exercice"})
                } else {
                    //✅️ 
                    res.json({status: 200, msg: "Exercice supprimé!"})
                }
            }
        } //❌️  
        catch(err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
   }
    
    return {
        getExercisesByProgramId,
        getOneExerciseById,
        saveOneExercise,
        updateOneExercise,
        deleteOneExercise
    }
}