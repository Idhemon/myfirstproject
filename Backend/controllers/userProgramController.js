module.exports =(UserProgramModel) => {
    
    
    const addUserProgram = async(req, res) => {
        try {
            const {userId, programId} = req.body
            
            const addOneUserProgram = await UserProgramModel.addUserProgram(userId, programId)
            //❌️ 
            if(addOneUserProgram.code) {
                res.json({status: 500, msg: "Problème lors de l'ajout d'un utilisateur possédant un nouveau programme"})
            }
            //✅️ 
            else {
                res.json({status: 200, msg: "Utilisateur ajouté avec succès lors de l'achat du programme!"})
            }
        }
        //❌️ 
        catch(err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    
    
    const getUserProgram = async(req, res) => {
        try {
            const {userId, programId} = req.query
            //❗️ 
            if (!userId || !programId) {
                return res.status(400).json({ status: 400, msg: "Les paramètres userId et programId sont requis." })
            }
            const isOwned = await UserProgramModel.getUserProgram(userId, programId)
            //❗️ 🔴 ️ 
            if(!isOwned || isOwned.owned === "false") {
                return res.json({status: 200, isOwned: {owned : "false"} })
            }
            //🟢 
            res.json({status: 200, isOwned: {owned : "true"} })
        }
        catch (err) {
            //❌️ 
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    
    return {
        addUserProgram,
        getUserProgram
    }
}