const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

module.exports = (UserModel, AddressModel) => {
    //controller to get all users
    const getAllUsers = async(req,res) => {
        try {
            const users = await UserModel.getAllUsers()
            //❌️ if there is an error
            if(users.code){
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            } 
            //✅️ else access confirmed to the request
            else {
                res.json({status: 200, users})
            }
        }
        //❌️ if an error does not allow entry into "try"
        catch(err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        } 
    }
    
    
    //controller to get ONE user by id
    const getOneUserById = async(req,res) => {
        try {
             const user = await UserModel.getOneUserById(req.params.id)
            //❌️ if there is an error
            if(user.code){
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            } 
            //✅️ else access confirmed to the request
            else {
                res.json({status: 200, users: user})
            }
        }
        //❌️ if an error does not allow entry into "try"
        catch(err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        } 
        
    }
    
    //controller to register a new user
    const saveOneUser = async (req, res) => {
    try {
        // Check if a user with the email already exists
        const compar = await UserModel.getUserByEmail(req.body.email)
        //❌️ if there is an error
        if (compar.code) {
            res.json({ status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1" })
        } else {
            //🔴 If a user with the email exists
            if (compar.length > 0) {
                res.json({ status: 401, msg: "Cet email existe déjà !" })
            } else {
                // Save the new user
                const newUserId = await UserModel.saveOneUser(req)
                //❌️ If errors from saving the new user
                if(newUserId.code) {
                    res.json({ status: 500, msg: "Impossible d'ajouter le nouvel utilisateur" })
                }
                else {
                    // Save the address for the new user using the last id saved
                    const newAddress = await AddressModel.saveOneAddress(req, newUserId)
                     //❌️  If errors from saving the new address
                    if(newAddress.code) {
                        res.json({ status: 500, msg: "Problème avec l'adresse entrée, veuillez réessayer" })
                    } else {
                        //✅️ 
                        res.json({ status: 200, msg: "Utilisateur a bien été sauvegardé !" })
                        }
                    }
                }
            }
        } //❌️  
        catch (err) {
        res.json({ status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2" })
        }
    }

    
    //controller to log in one user
     const loginOneUser = async (req, res) => {
        try {
            // Check if a user with the email already exists
            const compar = await UserModel.getUserByEmail(req.body.email)
            //❌️ 
            if(compar.code){
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard 1."})
            } else {
                //❗️if no user exists for this email
                if(compar.length === 0){
                    res.json({status: 404, msg: "Utilisateur introuvable!"})
                } else {
                    //there is a user in the database for this email, so we compare the passwords
                    const identical = await bcrypt.compare(req.body.password, compar[0].password)
                    //if it's true, passwords are the same
                    if(identical){
                        //we create the payload (content that we will drag into token)
                        const payload = {id: compar[0].users_id, role: compar[0].roles}
                        //we create the token with the signature (secret)
                        const token = jwt.sign(payload, process.env.SECRET)
                        //creating an user object to send to the frontend along with the token to automatically log in the user with redux
                        const user = {
                            id          : compar[0].users_id,
                            firstname   : compar[0].firstname,
                            lastname    : compar[0].lastname,
                            phone       : compar[0].phone,
                            email       : compar[0].email,
                            number      : compar[0].number,
                            street      : compar[0].street,
                            zip         : compar[0].zip_code,
                            city        : compar[0].city,
                            role        : compar[0].roles
                            }
                            //✅️ 
                            res.json({status: 200, msg: "Connexion autorisée", token, user})
                        }
                    else {
                        //🔴 else passwords are differents
                        res.json({status: 404, msg: "Problème d'identification !"})
                    }
                }
            }
        } //❌️  
        catch(err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard 2."})
        }
    }
    
    //controller to update one user
    
    const updateOneUser = async(req,res)=> {
        
        
        try {
            const userId = req.id
            //❗️
            if (!userId) {
                return res.json({ status: 400, msg: "ID de l'utilisateur manquant dans la requête." })
            }
            
            const modifyUser = await UserModel.updateOneUser(req, userId)
            //❌️ 
            if(modifyUser.code){
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            } 
            else {
                const modifyAddress = await AddressModel.updateOneAddress(req, userId)
                //❌️ 
                if(modifyAddress.code) {
                    res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé au niveau de l'adresse. Veuillez réessayer plus tard!"})
                }
                else {
                const newUser = await UserModel.getOneUserById(userId)
                //❌️ 
                if(newUser.code){
                    res.json({status: 500, msg: "Oups il manque quelque chose...!"})
                } 
                else {
                    //❗️ 
                    if(newUser.length === 0){
                        res.json({status: 404, msg: "Utilisateur non trouvé!"})
                    } 
                    else {
                        //Return the updated user to update redux in the front
                        const retrieveUser = {
                            id          : newUser[0].user_id,
                            firstname   : newUser[0].firstname,
                            lastname    : newUser[0].lastname,
                            phone       : newUser[0].phone,
                            email       : newUser[0].email,
                            number      : newUser[0].number,
                            street      : newUser[0].street,
                            zip         : newUser[0].zip_code,
                            city        : newUser[0].city
                            
                            }
                        //✅️ 
                        res.json({status: 200, msg: "Utilisateur modifié!", user: retrieveUser})
                        }
                    }
                }
            }
        } //❌️ 
        catch(err) {
             console.error("Error updating user:", err)
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
        
    }
    
    
    //controller to delete one user
    const deleteOneUser = async (req, res) => {
        try {
            const userId = req.id
            //check if user exists
            const user = await UserModel.getOneUserById(userId)
            //❌️ 
            if(user.code){
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            } else {
                //delete the user
                const del = await UserModel.deleteOneUser(userId)
                //❌️ 
                if(del.code){
                    res.json({status: 500, msg: "Impossible de supprimer l'utilisateur"})
                } else {
                    //✅️ 
                    res.json({status: 200, msg: "Utilisateur supprimé!"})
                }
            }
        } //❌️  
        catch(err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
   }
    
    return {
        getAllUsers,
        getOneUserById,
        saveOneUser,
        loginOneUser,
        updateOneUser,
        deleteOneUser
    }
}
