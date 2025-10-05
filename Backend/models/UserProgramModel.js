module.exports =(_db)=> {
    db = _db
    return UserProgramModel
}


class UserProgramModel {
    
    static getUserProgram(userId, programId) {
       
       return db.query(`SELECT owned FROM user_programs WHERE user_id = ? AND program_id = ?`, [userId, programId])
        .then((res) => {
            
            if(res.length === 0 || !res[0]) {

                return {owned: 'false'}
            }
            
            return res[0]
        })
        .catch((err) => {
            console.error('Erreur lors de la vérification de l\'état "possédé":', err)
            throw err
        })
    }
    
    
    
    static addUserProgram (userId, programId) {
        const query =`INSERT INTO user_programs (user_id, program_id, owned) VALUES (?, ?, 'true')`
        
        return db.query(query, [userId, programId])
        .then((res) => {
            
            return res
        })
        .catch((err) => {
            console.error('Erreur lors de l\'ajout de l\'utilisateur et du programme:', err)
            throw err
        })
    }
}