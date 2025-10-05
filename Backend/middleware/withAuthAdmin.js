const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()

const withAuthAdmin = (req, res, next) => {
    // Retrieving our token in the header of the AJAX HTTP request
    const token = req.headers['x-access-token'] //Bearer-token
    //❗️ If token not found 
    if(!token){
        //Error : user will not be able to access the protected route controller or will not be able to be reconnected
        res.json({status: 401, msg: "Erreur, token non trouvé"})
    } else {
        //else there is a token, we check its veracity using the verify function of the jsonwebtoken library
        jwt.verify(token, process.env.SECRET, (err, decoded) =>{
            //❌️ if the token is invalid
            if(err){
                res.json({status: 401, msg: "Erreur, le token n'est pas valide!"})
            } else {
                //🔴 
                if(decoded.role !== "admin"){
                    res.json({status: 401, msg: "Erreur, vous n'avez pas l'autorisation d'accéder à ce contenu"})
                } else {
                     //✅️ token is valid and the payload is decrypted in the decoded argument
                    req.user = decoded
                    
                    //we exit the function we authorize access to the controller of the route
                    next()
                }
            }
        })
    }
    
}

module.exports = withAuthAdmin