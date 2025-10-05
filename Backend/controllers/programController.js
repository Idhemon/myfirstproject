//To can delete local images
const fs = require('fs')
module.exports = (ProgramModel, ExerciseModel) => {
    
    
    //controller to get all programs only, without exercises for home
    const getOnlyAllPrograms = async (req, res) =>{
        try {
            const programs = await ProgramModel.getOnlyAllPrograms()
            //❌️ if there is an error
            if(programs.code){
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            } 
            //✅️ else access confirmed to the request
            else {
                res.json({status: 200, result: programs})
            }
        } 
        //❌️ if an error does not allow entry into "try"
        catch(err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    
    
    //controller to get all programs with exercises
    const getAllPrograms = async (req, res) =>{
        try {
            const programs = await ProgramModel.getAllPrograms()
            //❌️ if there is an error
            if(programs.code){
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            } 
            //✅️ else access confirmed to the request
            else {
                res.json({status: 200, result: programs})
            }
        } 
        //❌️ if an error does not allow entry into "try"
        catch(err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    
    
    //controller to get ONE program by id
    const getOneProgramById = async(req,res) => {
        try {
             const program = await ProgramModel.getOneProgramById(req.params.id)
            //❌️ if there is an error
            if(program.code){
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            } 
            //✅️ else access confirmed to the request
            else {
                res.json({status: 200, programs: program})
            }
        }
        //❌️ if an error does not allow entry into "try"
        catch(err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        } 
        
    }
    
    
    //controller to register a new program
    const saveOneProgram = async (req, res) => {
        try {
            // Save the new program
            const newProgramId = await ProgramModel.saveOneProgram(req)
            //❌️ If errors from saving the new user
            if(newProgramId.code) {
                res.json({ status: 500, msg: "Impossible d'ajouter le nouveau programme" })
                }
            //✅️    
            res.json({ status: 200, msg: "Le programme a bien été sauvegardé !" })
                        
                
        } 
        //❌️ 
        catch (err) {
            res.json({ status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2" })
        }
    }
    
    
    //controller to add a picture in the API
    const savePicture = async (req, res) =>{
        try {
            //❗️if no file has been sent via the front or this object has no properties
            if(!req.files || Object.keys(req.files).length === 0){
                //❌️ Error is returned
                res.json({status: 400, msg: "Impossible de récupérer l'image!"})
            } else {
                //Send the picture to file /public/images
                req.files.image.mv(`public/images/${req.files.image.name}`, (err) => {
                    //❌️ 
                    if(err){
                        res.json({status: 500, msg: "Impossible d'enregistrer l'image"})
                    } else {
                        //✅️picture saved and her name is returned to the front
                        res.json({status: 200, msg: "L'image a bien été enregistrée", url: req.files.image.name})
                    }
                })
            }
        } //❌️  
        catch(err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard."})
        }
    }
    
    //controller to update a program
    const updateOneProgram = async (req, res) => {
        try {
            
            //Retrieve the program to change
            const program = await ProgramModel.getOneProgramById(req.params.id)
            //❌️ 
            if(program.code){
                return res.status(500).json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            }
            //❗️
            if(program[0].picture !== "no-pict.webp"){
                try {
                    await fs.promises.unlink(`public/images/${program[0].picture}`)
                    
                }
                //❌️ 
                catch (err) {
                    if(err.code !== 'ENOENT'){
                        console.error("Impossible de supprimer l'image:", err)
                    }
                }
            }
            //Change the program
            const changeProgram = await ProgramModel.updateOneProgram(req, req.params.id)
            //❌️ 
            if(changeProgram.code){
                return res.status(500).json({status: 500, msg: "Impossible de modifier le programme"})
            }
            //✅️
            return res.status(200).json({status: 200, msg: "Le programme a bien été modifié"})
        } 
        //❌️ 
        catch(err) {
            console.error("Erreur lors de la mise à jour du programme:", err)
            return res.status(500).json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    
    
    //controller to delete one program
    const deleteOneProgram = async (req, res) => {
        try {
            //check if program exists
            const program = await ProgramModel.getOneProgramById(req.params.id)
            //❌️ 
            if(program.code){
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            } else {
                //delete the program
                const del = await ProgramModel.deleteOneProgram(req.params.id)
                //❌️ 
                if(del.code){
                    res.json({status: 500, msg: "Impossible de supprimer le programme"})
                } else {
                    //✅️
                    res.json({status: 200, msg: "Programme supprimé!"})
                }
            }
        } //❌️  
        catch(err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
   }
    
    return {
        getOnlyAllPrograms,
        getAllPrograms,
        getOneProgramById,
        saveOneProgram,
        savePicture,
        updateOneProgram,
        deleteOneProgram
    }
}