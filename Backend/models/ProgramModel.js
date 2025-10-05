module.exports = (_db)=>{
    db = _db
    return ProgramModel
}

class ProgramModel {
    
    static getOnlyAllPrograms(){
        
        return db.query(`SELECT *
                        FROM programs 
                        `)
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    static getAllPrograms(){
        
        return db.query(`SELECT programs.id, name, description, price, picture, alt, nameEx, descriptionEX, sets, repetitions, pictureEx, altEx, duration
                        FROM programs 
                        INNER JOIN exercises ON exercises.programs_id = programs.id`)
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    static getOneProgramById(id){
        
        return db.query(`SELECT *
                        FROM programs 
                        INNER JOIN exercises ON exercises.programs_id = programs.id
                        WHERE programs.id = ?`, [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    static saveOneProgram(req) {
        
        return db.query(`INSERT INTO programs (name, description, price, picture, alt) VALUES (?, ?, ?, ?, ?)`,
                [req.body.name, req.body.description, req.body.price, req.body.picture, req.body.alt]
                )
                .then((res) => {
                    return res.insertId
                })
                .catch((err) => {
                    return err
                })
    }
    
    static updateOneProgram(req, programId){
        
        return db.query(`UPDATE programs SET name = ?, description = ?, price = ?, picture = ?, alt = ? WHERE id = ?`, 
        [req.body.name, req.body.description, req.body.price, req.body.picture, req.body.alt, programId])
            .then((res) => {
                return res.insertId
            })
            .catch((err) => {
                return err
            })
    }
    
    static deleteOneProgram(id){
        
        return db.query(`DELETE 
                        FROM programs 
                        WHERE id = ?`, [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    static getPriceCommandById(id) {
        
        return db.query(`SELECT id, price
                        FROM programs
                        WHERE id = ?`, [id])
        .then((res) => {
            if (!res || res.length === 0) {
                
                return { code: 404, message: `Aucun programme trouvé avec l'ID: ${id}` }
            }
    
            return res
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération du programme:', err)
            return err
        })
    }
    
}