module.exports = (ContactModel) => {
    
    //controller to get the list of contact forms
    const getAllContacts = async (req,res) => {
        try {
            const list = await ContactModel.getAllContacts()
            //❓️
            if(list.code) {
                //❌
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            }
            else {
                //✅️ 
                res.json({status: 200, result: list })
            }
        }
        catch (err) {
            //❌️
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    
    //controller to get ONE contact form by id
    const getOneContactById = async (req,res) => {
        try {
            const contact = await ContactModel.getOneContactById(req.params.id)
            //❓️
            if (contact.code) {
                //❌
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            }
            else {
                //✅️ 
                res.json({status: 200, contacts: contact})
            }
        }
        catch (err) {
            //❌
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    
    //controller to send a request via form
    const sendOneRequest = async (req,res) => {
        try {
            const newRequest = await ContactModel.sendOneRequest(req)
            //❓️
            if(newRequest.code) {
                //❌
                res.json({status: 500, msg: "Impossible d'envoyer la requête"})
            }
            else {
                //✅️ 
                res.json({status: 200, msg: "Requête envoyée"})
            }
        }
        catch (err) {
            //❌
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard."})
        }
    }
    
    //controller to update the request (status)
    const updateOneRequest = async (req,res) => {
        try {
            const request = await ContactModel.getOneContactById(req.params.id)
            //❓️
            if (request.code) {
                //❌
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            }
            else {
                const change = await ContactModel.updateOneRequest(req, req.params.id)
                if(change.code) {
                    //❌
                    res.json({status: 500, msg: "Impossible de changer le status de la requête"})
                }
                else {
                    //✅️ 
                    res.json({status: 200, msg: "La requête a bien été modifiée"})
                }
            }
        }
        catch (err) {
            //❌
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
        
    }
    
    const deleteOneRequest = async (req,res) => {
        try {
            const contact = await ContactModel.getOneContactById(req.params.id)
            //❓️
            if (contact.code) {
                //❌
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            }
            else {
                const del = await ContactModel.deleteOneRequest(req.params.id)
                //❌
                if (del.code) {
                    res.json({status: 500, msg: "Impossible de supprimer cette requête !"})
                }
                else {
                    //✅️ 
                    res.json({status: 200, msg: "Requête supprimée !"})
                }
            }
        }
        catch (err) {
            //❌
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    
    return {
        getAllContacts,
        getOneContactById,
        sendOneRequest,
        updateOneRequest,
        deleteOneRequest
    }
}