module.exports = (_db)=> {
    db = _db
    return ContactModel
}

class ContactModel {
    
    static getAllContacts() {
        
        return db.query(`SELECT *
                        FROM contacts
        `)
        .then((res) => {
            return res
        })
        .catch((err) => {
          return err  
        })
    }
   
    static getOneContactById(id) {
        return db.query(`SELECT *
                        FROM contacts
                        WHERE id = ?`, [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
          return err  
        })
    }
    
    static sendOneRequest(req) {
        return db.query(`INSERT INTO contacts(firstname, lastname, email, object, messages) VALUES (?, ? , ? , ? , ?)`, 
            [req.body.firstname, req.body.lastname, req.body.email, req.body.object, req.body.messages])
        .then((res) => {
            return res
        })
        .catch((err) => {
          return err  
        })
    }
    
    static updateOneRequest(req, contactId) {
        return db.query(`UPDATE contacts SET status = ? WHERE id= ?`,
            [req.body.status, contactId])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    static deleteOneRequest(id) {
        return db.query(`DELETE FROM contacts WHERE id = ?`, [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
}