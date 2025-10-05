module.exports = (_db)=>{
    db = _db
    return ExerciseModel
}

class ExerciseModel {
    
    static getExercisesByProgramId(programId){
        
        return db.query(`SELECT *
                        FROM exercises
                        WHERE programs_id = ?
                        `, [programId])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    static getOneExerciseById(id){
        
        return db.query(`SELECT *
                        FROM exercises 
                        WHERE id = ?`, [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    static saveExercises(req, programId) {
        return db.query(`INSERT INTO exercises (programs_id, nameEx, descriptionEx, sets, repetitions, pictureEx, altEx, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [programId, req.body.nameEx, req.body.descriptionEx, req.body.sets, req.body.repetitions, req.body.pictureEx, req.body.altEx, req.body.duration]
                )
                .then((res) => {
                    return res
                })
                .catch((err) => {
                    return err
                })
    }
    
    static updateOneExercise(datas, exerciseId){
        const {nameEx, descriptionEx, sets, repetitions, pictureEx, altEx, duration} = datas
        return db.query(`UPDATE exercises SET nameEx = ?, descriptionEx = ?, sets = ?, repetitions = ?, pictureEx = ?, altEx = ?, duration = ? WHERE id = ?`, 
        [nameEx, descriptionEx, sets, repetitions, pictureEx, altEx, duration, exerciseId])
        
            .then((res) => {
                
                return res
            })
            .catch((err) => {
                console.error("Erreur lors de la mise à jour de l'exercice :", err)
                return err
            })
    }
    
    static deleteOneExercise(id){
        return db.query(`DELETE FROM exercises WHERE id = ?`, [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
}
