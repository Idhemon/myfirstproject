const bcrypt        = require("bcryptjs")
const saltRounds    = 10

module.exports = (_db) => {
    db = _db
    return UserModel
}

class UserModel {
    
    static getAllUsers(){
        
        return db.query(`SELECT firstname, lastname, phone, email, password, roles, created_at,                          last_connection, number, street, zip_code, city
                        FROM users INNER JOIN addresses ON addresses.users_id = users.id
                        ORDER BY created_at DESC LIMIT 50`)
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    static getOneUserById(id){
        
        return db.query( `SELECT users.id as user_id, users.firstname, users.lastname, users.phone, users.email, addresses.number, addresses.street, addresses.zip_code, addresses.city
                        FROM users
                        INNER JOIN addresses ON addresses.users_id = users.id
                        WHERE users.id = ?`,
            [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return { code: err.errno, message: err.sqlMessage }
        })
    }
    
    static getUserByEmail(email) {
        return db.query(`SELECT *
                        FROM users 
                        INNER JOIN addresses ON addresses.users_id = users.id
                        WHERE email = ?`, [email])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    static saveOneUser(req) {
        return bcrypt.hash(req.body.password, saltRounds)
            .then((hash) => {
                return db.query(`INSERT INTO users (firstname, lastname, phone, email, password) VALUES (?, ?, ?, ?, ?)`,
                    [req.body.firstname, req.body.lastname, req.body.phone, req.body.email, hash])
            })
            .then((res) => {
                return res.insertId
            })
            .catch((err) => {
                return err
            })
            
        .catch((err) => {
            return err
        })
    }

    
    static updateOneUser(req, userId){
        return db.query(`UPDATE users SET firstname = ?, lastname = ?, phone = ?, email = ? WHERE id = ?`, 
        [req.body.firstname, req.body.lastname, req.body.phone, req.body.email, userId])
        
            .then((res) => {
                return res.insertId
            })
            .catch((err) => {
                return err
            })
    }
    
    
    static deleteOneUser(id){
        return db.query(`DELETE FROM users WHERE id = ?`, [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
}