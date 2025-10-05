module.exports = (UserModel) => {
    //route allowing the management of reconnection by token
    const verifToken = async (req, res) => {
        try {
            //❗️ 
            if(!req.id){
                return res.json({status: 500, msg: "ID de l'utilisateur manquant dans la requête"})
            }
            const authUser = await UserModel.getOneUserById(req.id)
            //❓️
            if(authUser.code){
                return res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            }
            if(authUser.length === 0){
                return res.json({status: 500, msg: "Utilisateur non trouvé"})
            }
            
            
            const user = {
                id:         authUser[0].user_id,
                firstname:  authUser[0].firstname,
                lastname:   authUser[0].lastname,
                phone:      authUser[0].phone,
                email:      authUser[0].email,
                number:     authUser[0].number,
                street:     authUser[0].street,
                zip:        authUser[0].zip_code,
                city:       authUser[0].city,
                role:       authUser[0].roles
            }
            //🟢
            res.json({status: 200, msg:"Accès autorisé", user})
            
        } catch(err) {
            //🔴
            console.error("Erreur de la vérification du Token:", err)
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
 
    return {
        verifToken
    }   
}