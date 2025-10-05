module.exports = (_db) => {
    db = _db
    return AddressModel
}

class AddressModel {
    
    static saveOneAddress(req, lastUserId) {
        return db.query(`INSERT INTO addresses (users_id, number, street, zip_code, city) VALUES (?, ?, ?, ?, ?)`,
                [lastUserId, req.body.number, req.body.street, req.body.zip_code, req.body.city]
                )
                .then((res) => {
                    return res
                })
                .catch((err) => {
                    return err
                })
    }
    
    static updateOneAddress(req, lastUserId){
        return db.query(`UPDATE addresses SET number = ?, street = ?, zip_code = ?, city = ? WHERE users_id = ?`, 
        [req.body.number, req.body.street, req.body.zip_code, req.body.city, lastUserId])
        
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
    //if we just need to delete one address but keep the user 
    static deleteOneAddress(id){
        return db.query(`DELETE FROM addresses WHERE Id = ?`, [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
}